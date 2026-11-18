# 🗺️ CampusVigation
### Smart Campus Navigation & Pedestrian Assistance System
**Veermata Jijabai Technological Institute (VJTI), Matunga, Mumbai**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📌 Executive Summary

**CampusVigation** is a modern, responsive full-stack campus navigation and spatial guidance platform designed for students, faculty, staff, and visitors navigating university campuses. Tested and configured with the real campus coordinates, architectural heritage buildings, and walkway paths of **Veermata Jijabai Technological Institute (VJTI)** in Matunga, Mumbai.

Unlike conventional navigation applications that route pedestrians across inaccessible building walls or car-centric roads, CampusVigation utilizes a dedicated **geodesic Dijkstra shortest-path graph engine** mapped specifically across walkable campus footpaths, corridors, covered verandas, and wheelchair ramps.

---

## 🌟 Key Capabilities & Features

### 1. Interactive Campus Map (Leaflet.js + OpenStreetMap)
- Complete interactive spatial map centered on VJTI campus (`19.0223° N, 72.8562° E`).
- **Category-coded custom pins**: Academic blocks, Laboratories, Central Library, Cafeterias, Administrative offices, Hostels, Parking, and Sports Grounds.
- **Pulsing GPS radar marker** displaying real-time user location or toggling the simulated VJTI Quadrangle GPS for desktop evaluations.
- **Electric cyan glowing polyline route animations** and alternative routes with dashed overlays.
- Dynamic campus walkway network overlay displaying verified pedestrian graph edges.

### 2. Smart Real-Time Search & Autocomplete
- Multi-attribute real-time search:
  - By **Building Name** (e.g. *Central Library*, *Main Building*, *Textile Department*)
  - By **Department** (e.g. *Computer Engineering & IT*, *Mechanical*, *Electrical*)
  - By **Room Number** (e.g. *MB-001*, *CC-001*, *CCF*, *L-101*)
  - By **Facilities** (e.g. *Wi-Fi*, *Elevator*, *Restrooms*, *Drinking Water*, *ATM*)
  - By **Category Filter** (*Academic*, *Dining*, *Hostels*, *Admin*, *Recreation*, *Medical*)
- Voice search using the **Web Speech Recognition API** (`webkitSpeechRecognition`).

### 3. Smart Graph-Based Navigation (Dijkstra's Algorithm)
- Geodesic distance routing utilizing the **Haversine formula** and directed adjacency graph.
- Calculates accurate walking distance (in meters) and estimated walking time (minutes at 1.2 m/s).
- **Alternative routes**: Computes secondary paths with edge penalty weights.
- **Turn-by-turn guidance**: Dynamic heading calculation calculating bearings and turn instructions (*"Turn left onto path toward Department of Electrical Engineering"*).
- **Voice Guidance**: Hands-free text-to-speech navigation utilizing **Web Speech Synthesis**.

### 4. Accessibility & Inclusive Design (Wheelchair Mode)
- **Step-Free / Ramp-Only Routing**: Filters out pathways with stairs, steep terrain, or unpaved paths.
- Building accessibility badges displaying wheelchair ramps, wide door clearances, and elevator access.

### 5. Multi-Floor Indoor Directories
- Interactive floor selector (Ground Floor, 1st Floor, 2nd Floor, etc.) for academic complexes.
- Room listings with room numbers, capacities, and room types (*Labs*, *Offices*, *Classrooms*, *Seminar Halls*).

### 6. Entrance QR Code Plaque Navigation
- Simulates scanning physical QR code plaques installed at building entrances (*VJTI-MAIN-BLDG*, *VJTI-COMP-IT*, *VJTI-LIBRARY*, *VJTI-CANTEEN*, etc.).
- Instantly detects origin location and triggers optimal shortest-path navigation.

### 7. Nearby Facilities Discovery (Within 400m)
- Dynamically calculates the closest cafeteria, drinking water dispenser, washroom, medical dispensary, and parking relative to the user's current GPS coordinates or selected landmark.

### 8. 1-Click SOS Emergency Navigation
- Instant routing to the **Campus Health Dispensary & Medical Center**, **Main Gate Security Post**, or **Disaster Evacuation Muster Points** with emergency telephone hotlines.

### 9. User Roles & Authentication
- **Student**: Personalized bookmarks, class search, nearby amenities, step-by-step directions.
- **Faculty / Staff**: Office and seminar navigation, department-to-department routes.
- **Administrator**: Comprehensive admin console for managing buildings, coordinates, paths, user privileges, and analytics.
- **1-Click Demo Login Switchers** for instant testing without manual credential entry.

### 10. Administrator Dashboard & Analytics
- Live KPI cards: Total locations, total paths, registered accounts, accessibility percentages.
- **Locations CRUD**: Create, read, update, delete campus buildings with coordinates, facilities, and floor directory.
- **Paths CRUD**: Add or delete walkable walkway edges with distance and accessibility flags.
- **User Management**: Promote or modify roles (*student*, *faculty*, *admin*) or delete accounts.
- **Analytics & Search Insights**: Most visited buildings, category distributions, recent searches log.

---

## 🧠 Human-Computer Interaction (HCI) Principles

| HCI Principle | CampusVigation Implementation |
|---|---|
| **1. Visibility of System Status** | Real-time GPS radar pulse, routing loading spinners, distance/time counters, and step-by-step turn trackers. |
| **2. Match Between System & Real World** | Real VJTI buildings, actual building photography, familiar icons, and compass cardinal directions (North, South, East, West). |
| **3. User Control & Freedom** | Clear-route button, start/destination swap button, modal dismiss triggers, and search reset buttons. |
| **4. Consistency & Standards** | Consistent color palette (Navy Blue `#0A192F`, Electric Blue `#2563EB`, Cyan `#06B6D4`), Lucide icons, and standard mobile-first UI patterns. |
| **5. Error Prevention** | Suggestions dropdown prevents mistyped destinations; disabled routing states prevent empty calculations; wheelchair warnings trigger if steps are present. |
| **6. Recognition Rather than Recall** | Category filter chips, recent search feed, favorite places bookmarks, and simulated QR plaque selectors. |
| **7. Flexibility & Efficiency** | 1-click demo logins, voice search shortcuts, quick "Navigate Here" buttons from map popups. |
| **8. Accessibility & Inclusive Design** | High-contrast dark mode, keyboard navigation support, wheelchair step-free routing toggle, and audio voice instructions. |

---

## 🏗️ Technology Stack

### Frontend
- **React.js 18** & **Vite** (Fast HMR development and production bundling)
- **Tailwind CSS** (Utility-first responsive SaaS design system)
- **Leaflet.js** & **React Leaflet** (OpenStreetMap tile rendering and vector layers)
- **Framer Motion** (Smooth transitions and micro-interactions)
- **Lucide React** (Modern, clear iconography)
- **HTML5 Web Speech API** (Speech Recognition & Speech Synthesis)

### Backend
- **Node.js** & **Express.js** (High-throughput REST API)
- **MongoDB** & **Mongoose** (Document database with geospatial indexing)
- **JWT (JSON Web Tokens)** & **bcryptjs** (Stateless authentication & password hashing)
- **Morgan** & **CORS** (Development logging & cross-origin support)

---

## 🗄️ Database Collections Schema

1. **`User`**:
   - `name`: String
   - `email`: String (Unique)
   - `password`: String (Hashed with bcrypt)
   - `role`: `'student' | 'faculty' | 'admin'`
   - `department`: String
   - `favorites`: `[ObjectId -> Location]`

2. **`Location`**:
   - `name`: String
   - `category`: `'academic' | 'food' | 'library' | 'administration' | 'accommodation' | 'recreation' | 'medical' | 'parking'`
   - `department`: String
   - `description`: String
   - `coordinates`: `{ lat: Number, lng: Number }`
   - `buildingImage`: String (URL)
   - `facilities`: `[String]`
   - `openingHours`: String
   - `accessibilityInformation`: `{ wheelchairAccessible: Boolean, hasElevator: Boolean, hasRamp: Boolean }`
   - `floors`: `[{ floorNumber, floorName, rooms: [{ roomNumber, name, type, capacity }] }]`
   - `qrCodeKey`: String (e.g. `VJTI-COMP-IT`)
   - `viewsCount`: Number

3. **`CampusPath`**:
   - `startingPoint`: `{ name, nodeId, coordinates: { lat, lng } }`
   - `endingPoint`: `{ name, nodeId, coordinates: { lat, lng } }`
   - `distance`: Number (meters)
   - `pathCoordinates`: `[{ lat, lng }]`
   - `accessibility`: `{ wheelchairAccessible: Boolean, hasStairs: Boolean, surfaceType: String }`
   - `pathType`: `'main_walkway' | 'paved_road' | 'corridor' | 'garden_path' | 'stairs'`
   - `isBidirectional`: Boolean

4. **`SearchHistory`**:
   - `userId`: `ObjectId -> User` (optional)
   - `searchedLocation`: String
   - `timestamp`: Date

---

## 🚀 Installation & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Running locally or MongoDB Atlas connection URI)

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/CampusVigation.git
cd CampusVigation
```

---

### Step 2: Configure Environment Variables

Create `.env` in the root and in `server/`:

```env
# server/.env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/campusvigation
JWT_SECRET=supersecretcampusvigationjwtkey2025
NODE_ENV=development
```

Create `.env` in `client/`:
```env
# client/.env
VITE_API_URL=/api
```

---

### Step 3: Backend Setup & Seed Database

```bash
cd server
npm install

# Seed the database with VJTI campus locations, 31+ paths, and demo accounts
npm run seed

# Start the server
npm run dev
# Server will run on http://localhost:5000
```

---

### Step 4: Frontend Setup

Open a new terminal window:
```bash
cd client
npm install

# Start Vite development server
npm run dev
# Frontend runs on http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Default Demo Accounts

For immediate evaluation, click any of the **1-Click Demo Login** buttons on the login modal or use these credentials:

| Role | Email | Password | Pre-seeded Access |
|---|---|---|---|
| **Student** | `student@vjti.ac.in` | `password123` | Classrooms, Bookmarks, Directions, Nearby Amenities |
| **Faculty** | `faculty@vjti.ac.in` | `password123` | Department Navigation, Staff Offices, Bookmarks |
| **Administrator** | `admin@vjti.ac.in` | `password123` | Full Admin Console, Building CRUD, Paths, Users, Analytics |

---

## 📡 REST API Endpoints Reference

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Create student, faculty, or admin account.
- `POST /api/auth/login` - Authenticate user & receive JWT token.
- `GET /api/auth/me` - Get authenticated profile & bookmarks.
- `GET /api/auth/users` - List all users *(Admin only)*.
- `PUT /api/auth/users/:id/role` - Update user role *(Admin only)*.
- `DELETE /api/auth/users/:id` - Remove user *(Admin only)*.

### Locations (`/api/locations`)
- `GET /api/locations` - Query locations with search, category & accessibility filters.
- `GET /api/locations/:id` - Get location details by ID.
- `GET /api/locations/nearby` - Get nearby facilities within specified radius.
- `GET /api/locations/qr/:qrKey` - Resolve location by building QR code.
- `POST /api/locations` - Add new campus building *(Admin only)*.
- `PUT /api/locations/:id` - Update building details *(Admin only)*.
- `DELETE /api/locations/:id` - Delete campus building *(Admin only)*.

### Navigation & Routing (`/api/navigation`)
- `POST /api/navigation/route` - Calculate shortest Dijkstra route & alternative path.
- `POST /api/navigation/emergency` - Fast emergency routing to nearest medical or security post.

### Campus Paths (`/api/paths`)
- `GET /api/paths` - Retrieve all walkable graph edges.
- `POST /api/paths` - Add walkway path edge *(Admin only)*.
- `DELETE /api/paths/:id` - Delete walkway path edge *(Admin only)*.

### Favorites (`/api/favorites`)
- `GET /api/favorites` - Get user's saved locations.
- `POST /api/favorites/:id` - Toggle bookmark for a location.

### Analytics (`/api/analytics`)
- `GET /api/analytics/dashboard` - Get KPI metrics, top search destinations, category breakdown *(Admin only)*.

---

## 📄 License
This project is open-source and available under the **MIT License**.
