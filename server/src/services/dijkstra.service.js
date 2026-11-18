/**
 * Dijkstra / A* Routing Service for CampusVigation
 * Provides shortest path calculation, wheelchair-accessible path filtering,
 * step-by-step turn-by-turn navigation instructions, and alternative routes.
 */

// Earth radius in meters for haversine calculation
const EARTH_RADIUS = 6371000;

function toRad(degrees) {
  return (degrees * Math.PI) / 180;
}

function toDeg(radians) {
  return (radians * 180) / Math.PI;
}

/**
 * Calculate geodesic distance between two lat/lng coordinates in meters
 */
function calculateDistance(coord1, coord2) {
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLng = toRad(coord2.lng - coord1.lng);
  const lat1 = toRad(coord1.lat);
  const lat2 = toRad(coord2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(EARTH_RADIUS * c);
}

/**
 * Calculate bearing/direction between two coordinates in degrees (0 = North, 90 = East, 180 = South, 270 = West)
 */
function calculateBearing(start, end) {
  const startLat = toRad(start.lat);
  const startLng = toRad(start.lng);
  const endLat = toRad(end.lat);
  const endLng = toRad(end.lng);

  const dLng = endLng - startLng;
  const y = Math.sin(dLng) * Math.cos(endLat);
  const x =
    Math.cos(startLat) * Math.sin(endLat) -
    Math.sin(startLat) * Math.cos(endLat) * Math.cos(dLng);
  let brng = toDeg(Math.atan2(y, x));
  return (brng + 360) % 360;
}

/**
 * Convert bearing change into human-readable turn instruction
 */
function getTurnInstruction(bearingDiff) {
  // Normalize difference to -180 to +180
  let diff = ((bearingDiff + 180) % 360) - 180;
  if (Math.abs(diff) < 25) return 'Continue straight';
  if (diff > 25 && diff < 65) return 'Bear slight right';
  if (diff >= 65 && diff <= 120) return 'Turn right';
  if (diff > 120) return 'Sharp right';
  if (diff < -25 && diff > -65) return 'Bear slight left';
  if (diff <= -65 && diff >= -120) return 'Turn left';
  return 'Sharp left';
}

/**
 * Convert bearing to cardinal direction
 */
function getCardinalDirection(bearing) {
  const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
  const index = Math.round(bearing / 45) % 8;
  return directions[index];
}

class CampusRouter {
  constructor() {
    this.nodes = new Map(); // nodeId -> { name, lat, lng }
    this.adjacencyList = new Map(); // nodeId -> [{ neighborId, distance, accessibility, pathType, pathCoordinates }]
  }

  /**
   * Initialize graph from database paths
   */
  loadPaths(paths) {
    this.nodes.clear();
    this.adjacencyList.clear();

    paths.forEach((path) => {
      const u = path.startingPoint.nodeId || path.startingPoint.name;
      const v = path.endingPoint.nodeId || path.endingPoint.name;

      if (!this.nodes.has(u)) {
        this.nodes.set(u, {
          nodeId: u,
          name: path.startingPoint.name,
          lat: path.startingPoint.coordinates.lat,
          lng: path.startingPoint.coordinates.lng,
        });
      }

      if (!this.nodes.has(v)) {
        this.nodes.set(v, {
          nodeId: v,
          name: path.endingPoint.name,
          lat: path.endingPoint.coordinates.lat,
          lng: path.endingPoint.coordinates.lng,
        });
      }

      if (!this.adjacencyList.has(u)) this.adjacencyList.set(u, []);
      if (!this.adjacencyList.has(v)) this.adjacencyList.set(v, []);

      const distance = path.distance || calculateDistance(path.startingPoint.coordinates, path.endingPoint.coordinates);

      this.adjacencyList.get(u).push({
        neighborId: v,
        distance,
        accessibility: path.accessibility || { wheelchairAccessible: true, hasStairs: false },
        pathType: path.pathType || 'main_walkway',
        pathCoordinates: path.pathCoordinates || [path.startingPoint.coordinates, path.endingPoint.coordinates],
      });

      if (path.isBidirectional !== false) {
        // Reverse coordinates for return edge
        const revCoords = path.pathCoordinates ? [...path.pathCoordinates].reverse() : [path.endingPoint.coordinates, path.startingPoint.coordinates];
        this.adjacencyList.get(v).push({
          neighborId: u,
          distance,
          accessibility: path.accessibility || { wheelchairAccessible: true, hasStairs: false },
          pathType: path.pathType || 'main_walkway',
          pathCoordinates: revCoords,
        });
      }
    });
  }

  /**
   * Find nearest campus graph node to a given lat/lng
   */
  findNearestNode(coords) {
    let nearestNodeId = null;
    let minDistance = Infinity;

    for (const [nodeId, node] of this.nodes.entries()) {
      const dist = calculateDistance(coords, { lat: node.lat, lng: node.lng });
      if (dist < minDistance) {
        minDistance = dist;
        nearestNodeId = nodeId;
      }
    }

    return { nodeId: nearestNodeId, distance: minDistance, node: this.nodes.get(nearestNodeId) };
  }

  /**
   * Execute Dijkstra's Algorithm
   * @param {string} startNodeId
   * @param {string} endNodeId
   * @param {Object} options - { wheelchairOnly: boolean, penalizedEdges: Set<string> }
   */
  dijkstra(startNodeId, endNodeId, options = {}) {
    const { wheelchairOnly = false, penalizedEdges = new Set() } = options;

    if (!this.nodes.has(startNodeId) || !this.nodes.has(endNodeId)) {
      return null;
    }

    const distances = new Map();
    const previous = new Map();
    const edgeUsed = new Map();
    const unvisited = new Set(this.nodes.keys());

    for (const nodeId of this.nodes.keys()) {
      distances.set(nodeId, Infinity);
    }
    distances.set(startNodeId, 0);

    while (unvisited.size > 0) {
      // Find unvisited node with smallest distance
      let current = null;
      let lowestDist = Infinity;
      for (const nodeId of unvisited) {
        const d = distances.get(nodeId);
        if (d < lowestDist) {
          lowestDist = d;
          current = nodeId;
        }
      }

      if (current === null || lowestDist === Infinity) break;
      if (current === endNodeId) break;

      unvisited.delete(current);

      const neighbors = this.adjacencyList.get(current) || [];
      for (const edge of neighbors) {
        if (!unvisited.has(edge.neighborId)) continue;

        // Wheelchair filter
        if (wheelchairOnly) {
          if (edge.accessibility && (edge.accessibility.wheelchairAccessible === false || edge.accessibility.hasStairs === true)) {
            continue;
          }
          if (edge.pathType === 'stairs') {
            continue;
          }
        }

        let weight = edge.distance;
        // Edge penalty for alternative routes
        const edgeKey = `${current}->${edge.neighborId}`;
        if (penalizedEdges.has(edgeKey)) {
          weight *= 2.5; // heavily penalize to discover alternative path
        }

        const alt = distances.get(current) + weight;
        if (alt < distances.get(edge.neighborId)) {
          distances.set(edge.neighborId, alt);
          previous.set(edge.neighborId, current);
          edgeUsed.set(edge.neighborId, edge);
        }
      }
    }

    if (distances.get(endNodeId) === Infinity) {
      return null; // No path found
    }

    // Reconstruct path
    const pathNodes = [];
    const pathCoordinates = [];
    let edgeDetails = [];
    let curr = endNodeId;

    while (curr) {
      pathNodes.unshift(curr);
      const prev = previous.get(curr);
      if (prev) {
        const edge = edgeUsed.get(curr);
        edgeDetails.unshift(edge);
      }
      curr = prev;
    }

    // Flatten route coordinates
    for (let i = 0; i < edgeDetails.length; i++) {
      const coords = edgeDetails[i].pathCoordinates || [];
      if (i === 0) {
        pathCoordinates.push(...coords);
      } else {
        pathCoordinates.push(...coords.slice(1));
      }
    }

    // Fallback coordinates if edge didn't have detailed polyline
    if (pathCoordinates.length === 0) {
      pathNodes.forEach((id) => {
        const n = this.nodes.get(id);
        pathCoordinates.push({ lat: n.lat, lng: n.lng });
      });
    }

    // Calculate real distance without penalty
    let totalRealDistance = 0;
    edgeDetails.forEach((e) => {
      totalRealDistance += e.distance;
    });

    return {
      nodes: pathNodes,
      edgeDetails,
      coordinates: pathCoordinates,
      totalDistance: Math.round(totalRealDistance),
    };
  }

  /**
   * Generate step-by-step turn instructions
   */
  generateInstructions(route) {
    if (!route || route.nodes.length < 2) return [];

    const instructions = [];
    const nodes = route.nodes.map((id) => this.nodes.get(id));
    const edges = route.edgeDetails;

    // First instruction: Departure
    const firstBearing = calculateBearing(
      { lat: nodes[0].lat, lng: nodes[0].lng },
      { lat: nodes[1].lat, lng: nodes[1].lng }
    );
    const cardinalDir = getCardinalDirection(firstBearing);

    instructions.push({
      step: 1,
      instruction: `Start at ${nodes[0].name}. Head ${cardinalDir} toward ${nodes[1].name}.`,
      action: 'depart',
      distance: edges[0].distance,
      pathType: edges[0].pathType,
      coordinates: { lat: nodes[0].lat, lng: nodes[0].lng },
    });

    let currentBearing = firstBearing;

    for (let i = 1; i < nodes.length - 1; i++) {
      const prevNode = nodes[i - 1];
      const currNode = nodes[i];
      const nextNode = nodes[i + 1];
      const edge = edges[i];

      const nextBearing = calculateBearing(
        { lat: currNode.lat, lng: currNode.lng },
        { lat: nextNode.lat, lng: nextNode.lng }
      );

      const bearingDiff = nextBearing - currentBearing;
      const turnText = getTurnInstruction(bearingDiff);

      let accessibilityNote = '';
      if (edge.pathType === 'ramp') accessibilityNote = ' (Ramp path)';
      if (edge.accessibility?.hasStairs) accessibilityNote = ' (Contains stairs)';

      instructions.push({
        step: instructions.length + 1,
        instruction: `At ${currNode.name}, ${turnText.toLowerCase()} onto path toward ${nextNode.name}${accessibilityNote}.`,
        action: turnText.toLowerCase().includes('right') ? 'turn-right' : turnText.toLowerCase().includes('left') ? 'turn-left' : 'straight',
        distance: edge.distance,
        pathType: edge.pathType,
        coordinates: { lat: currNode.lat, lng: currNode.lng },
      });

      currentBearing = nextBearing;
    }

    // Final Arrival Instruction
    const lastNode = nodes[nodes.length - 1];
    instructions.push({
      step: instructions.length + 1,
      instruction: `Arrive at destination: ${lastNode.name}.`,
      action: 'arrive',
      distance: 0,
      pathType: 'destination',
      coordinates: { lat: lastNode.lat, lng: lastNode.lng },
    });

    return instructions;
  }

  /**
   * Find Primary Shortest Route + Alternative Route
   */
  calculateRoute(startCoords, endCoords, options = {}) {
    const { wheelchairOnly = false } = options;

    const startNearest = this.findNearestNode(startCoords);
    const endNearest = this.findNearestNode(endCoords);

    if (!startNearest.nodeId || !endNearest.nodeId) {
      throw new Error('Could not find nearby campus pathways for requested coordinates.');
    }

    if (startNearest.nodeId === endNearest.nodeId) {
      return {
        isSameLocation: true,
        primaryRoute: {
          distance: 0,
          walkingTimeMinutes: 1,
          coordinates: [startCoords, endCoords],
          instructions: [
            {
              step: 1,
              instruction: `You are already at or right next to ${endNearest.node.name}.`,
              action: 'arrive',
              distance: 0,
              pathType: 'destination',
              coordinates: endCoords,
            },
          ],
        },
        alternativeRoute: null,
      };
    }

    // 1. Calculate Primary Optimal Route
    const primaryResult = this.dijkstra(startNearest.nodeId, endNearest.nodeId, { wheelchairOnly });
    if (!primaryResult) {
      return null;
    }

    const primaryInstructions = this.generateInstructions(primaryResult);
    // Average walking speed: 1.2 m/s = 72 meters per minute
    const primaryTime = Math.max(1, Math.ceil(primaryResult.totalDistance / 72));

    // 2. Calculate Alternative Route by penalizing edges of the primary route
    const penalizedEdges = new Set();
    for (let i = 0; i < primaryResult.nodes.length - 1; i++) {
      const u = primaryResult.nodes[i];
      const v = primaryResult.nodes[i + 1];
      penalizedEdges.add(`${u}->${v}`);
      penalizedEdges.add(`${v}->${u}`);
    }

    const altResult = this.dijkstra(startNearest.nodeId, endNearest.nodeId, {
      wheelchairOnly,
      penalizedEdges,
    });

    let alternativeRoute = null;
    if (altResult && altResult.totalDistance !== primaryResult.totalDistance) {
      const altInstructions = this.generateInstructions(altResult);
      alternativeRoute = {
        distance: altResult.totalDistance,
        walkingTimeMinutes: Math.max(1, Math.ceil(altResult.totalDistance / 72)),
        coordinates: altResult.coordinates,
        instructions: altInstructions,
        nodes: altResult.nodes,
        label: 'Alternative Scenic/Perimeter Route',
      };
    }

    return {
      startNode: startNearest.node,
      endNode: endNearest.node,
      primaryRoute: {
        distance: primaryResult.totalDistance,
        walkingTimeMinutes: primaryTime,
        coordinates: primaryResult.coordinates,
        instructions: primaryInstructions,
        nodes: primaryResult.nodes,
        label: wheelchairOnly ? 'Wheelchair Accessible Shortest Route' : 'Shortest Walkway Route',
      },
      alternativeRoute,
      wheelchairOnly,
    };
  }
}

module.exports = new CampusRouter();
