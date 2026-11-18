/**
 * Comprehensive Dataset for VJTI Matunga Campus
 * Includes real coordinates, buildings, floor directories, facilities, and walkable pathways
 */

const locationsData = [
  {
    name: 'VJTI Main Building & Administrative Complex',
    category: 'administration',
    department: 'Central Administration',
    description: 'Historical heritage building housing Director’s Office, Dean Offices, Academic Section, Examination Section, and the central Quadrangle.',
    coordinates: { lat: 19.02250, lng: 72.85610 },
    buildingImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Wi-Fi', 'Wheelchair Ramp', 'Dean Office', 'Examination Cell', 'Restrooms', 'Drinking Water', 'ATM Counter'],
    openingHours: '09:00 AM - 05:30 PM (Mon-Sat)',
    accessibilityInformation: {
      wheelchairAccessible: true,
      hasElevator: false,
      hasRamp: true,
      notes: 'Ramped entrance at North Porch; ground-floor access to all major administrative desks.',
    },
    contactInfo: {
      phone: '+91 22 2419 8101',
      email: 'director@vjti.ac.in',
      office: 'Main Administrative Wing, Ground Floor',
    },
    floors: [
      {
        floorNumber: 0,
        floorName: 'Ground Floor',
        rooms: [
          { roomNumber: 'MB-001', name: 'Director Office', type: 'office', capacity: 20 },
          { roomNumber: 'MB-002', name: 'Registrar Office', type: 'office', capacity: 15 },
          { roomNumber: 'MB-003', name: 'Academic Section & Student Verifications', type: 'office', capacity: 35 },
          { roomNumber: 'MB-004', name: 'Accounts & Fees Desk', type: 'office', capacity: 25 },
          { roomNumber: 'MB-005', name: 'Central Examination Cell', type: 'office', capacity: 30 },
          { roomNumber: 'MB-006', name: 'Visitors Reception & Enquiries', type: 'office', capacity: 15 },
          { roomNumber: 'MB-WR1', name: 'Executive Restrooms', type: 'restroom', capacity: 10 },
        ],
      },
      {
        floorNumber: 1,
        floorName: 'First Floor',
        rooms: [
          { roomNumber: 'MB-101', name: 'Dean Academics Chamber', type: 'office', capacity: 15 },
          { roomNumber: 'MB-102', name: 'Dean Research & Consultancy', type: 'office', capacity: 15 },
          { roomNumber: 'MB-103', name: 'Board of Governors Conference Hall', type: 'seminar_hall', capacity: 60 },
          { roomNumber: 'MB-104', name: 'Faculty Common Lounge', type: 'office', capacity: 40 },
          { roomNumber: 'MB-105', name: 'Smart Lecture Theatre 1', type: 'classroom', capacity: 120 },
        ],
      },
      {
        floorNumber: 2,
        floorName: 'Second Floor',
        rooms: [
          { roomNumber: 'MB-201', name: 'Central Archive & Records Wing', type: 'utility', capacity: 15 },
          { roomNumber: 'MB-202', name: 'Institute Quality Assurance Cell (IQAC)', type: 'office', capacity: 20 },
          { roomNumber: 'MB-203', name: 'Alumni Association Office', type: 'office', capacity: 20 },
        ],
      },
    ],
    qrCodeKey: 'VJTI-MAIN-BLDG',
    isEmergencyPoint: false,
    viewsCount: 245,
  },
  {
    name: 'Department of Computer Engineering & IT',
    category: 'academic',
    department: 'Computer Engineering & Information Technology',
    description: 'Premier computing complex equipped with high-performance GPU clusters, AI/ML laboratories, Central Computing Facility (CCF), and smart seminar halls.',
    coordinates: { lat: 19.02280, lng: 72.85695 },
    buildingImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    facilities: ['High-speed Wi-Fi', 'Air Conditioned Labs', 'Smart Classrooms', 'Elevator', 'Wheelchair Ramp', 'GPU Supercluster', 'Restrooms'],
    openingHours: '08:00 AM - 08:00 PM (Mon-Sat)',
    accessibilityInformation: {
      wheelchairAccessible: true,
      hasElevator: true,
      hasRamp: true,
      notes: 'Elevator operates to all floors; wide doorways with tactile indicators.',
    },
    contactInfo: {
      phone: '+91 22 2419 8200',
      email: 'hod.comp@vjti.ac.in',
      office: 'CCF Block, 1st Floor',
    },
    floors: [
      {
        floorNumber: 0,
        floorName: 'Ground Floor',
        rooms: [
          { roomNumber: 'CC-001', name: 'Central Computing Facility (CCF)', type: 'lab', capacity: 150 },
          { roomNumber: 'CC-002', name: 'Systems & Networking Lab', type: 'lab', capacity: 50 },
          { roomNumber: 'CC-003', name: 'Campus Data Center & Server Room', type: 'utility', capacity: 10 },
          { roomNumber: 'CC-004', name: 'Restrooms & Water Cooler Bay', type: 'restroom', capacity: 8 },
        ],
      },
      {
        floorNumber: 1,
        floorName: 'First Floor',
        rooms: [
          { roomNumber: 'CC-101', name: 'Head of Department (Comp Engg)', type: 'office', capacity: 15 },
          { roomNumber: 'CC-102', name: 'Artificial Intelligence & Deep Learning Lab', type: 'lab', capacity: 60 },
          { roomNumber: 'CC-103', name: 'Software Engineering Laboratory', type: 'lab', capacity: 60 },
          { roomNumber: 'CC-104', name: 'Lecture Hall CC-104', type: 'classroom', capacity: 80 },
          { roomNumber: 'CC-105', name: 'Faculty Chambers (Professors)', type: 'office', capacity: 30 },
        ],
      },
      {
        floorNumber: 2,
        floorName: 'Second Floor',
        rooms: [
          { roomNumber: 'CC-201', name: 'Head of Department (IT)', type: 'office', capacity: 15 },
          { roomNumber: 'CC-202', name: 'Cybersecurity & Cloud Computing Lab', type: 'lab', capacity: 60 },
          { roomNumber: 'CC-203', name: 'M.Tech & PhD Research Lab', type: 'lab', capacity: 40 },
          { roomNumber: 'CC-204', name: 'Turing Seminar Auditorium', type: 'seminar_hall', capacity: 140 },
          { roomNumber: 'CC-205', name: 'Lecture Hall CC-205', type: 'classroom', capacity: 80 },
        ],
      },
    ],
    qrCodeKey: 'VJTI-COMP-IT',
    isEmergencyPoint: false,
    viewsCount: 389,
  },
  {
    name: 'Department of Electrical Engineering',
    category: 'academic',
    department: 'Electrical Engineering',
    description: 'Renowned department with specialized testing facilities including High Voltage Bay, Smart Grid simulator, and Microcontroller Labs.',
    coordinates: { lat: 19.02270, lng: 72.85565 },
    buildingImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    facilities: ['High Voltage Lab', 'Wi-Fi', 'Faculty Chambers', 'Drinking Water', 'Restrooms', 'Wheelchair Ramp'],
    openingHours: '08:30 AM - 06:00 PM',
    accessibilityInformation: {
      wheelchairAccessible: true,
      hasElevator: false,
      hasRamp: true,
      notes: 'Ground floor heavy machinery labs have ramp access.',
    },
    contactInfo: {
      phone: '+91 22 2419 8150',
      email: 'hod.elec@vjti.ac.in',
      office: 'Electrical Wing, Room EE-101',
    },
    floors: [
      {
        floorNumber: 0,
        floorName: 'Ground Floor',
        rooms: [
          { roomNumber: 'EE-001', name: 'High Voltage Testing Bay', type: 'lab', capacity: 50 },
          { roomNumber: 'EE-002', name: 'Electrical Machines & Drives Lab', type: 'lab', capacity: 60 },
          { roomNumber: 'EE-003', name: 'Department Office & Notice Bay', type: 'office', capacity: 20 },
        ],
      },
      {
        floorNumber: 1,
        floorName: 'First Floor',
        rooms: [
          { roomNumber: 'EE-101', name: 'HOD Electrical Cabin', type: 'office', capacity: 15 },
          { roomNumber: 'EE-102', name: 'Microprocessor & Embedded Systems Lab', type: 'lab', capacity: 50 },
          { roomNumber: 'EE-103', name: 'Power System Simulation Lab', type: 'lab', capacity: 45 },
          { roomNumber: 'EE-104', name: 'Lecture Hall EE-104', type: 'classroom', capacity: 90 },
        ],
      },
    ],
    qrCodeKey: 'VJTI-ELEC-DEPT',
    isEmergencyPoint: false,
    viewsCount: 167,
  },
  {
    name: 'Department of Mechanical Engineering & Workshops',
    category: 'academic',
    department: 'Mechanical Engineering',
    description: 'Expansive engineering wing featuring Fluid Power Labs, CNC Machine Center, Heat Transfer units, and hands-on fabrication workshops.',
    coordinates: { lat: 19.02165, lng: 72.85685 },
    buildingImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    facilities: ['CNC Machining Center', 'Robotics & Automation Lab', 'Workshop Bay', '3D Printing Studio', 'Wheelchair Ramp'],
    openingHours: '08:00 AM - 06:00 PM',
    accessibilityInformation: {
      wheelchairAccessible: true,
      hasElevator: false,
      hasRamp: true,
      notes: 'Spacious workshop bay with roll-in entrances.',
    },
    contactInfo: {
      phone: '+91 22 2419 8250',
      email: 'hod.mech@vjti.ac.in',
      office: 'Mechanical Complex, ME-102',
    },
    floors: [
      {
        floorNumber: 0,
        floorName: 'Ground Floor',
        rooms: [
          { roomNumber: 'ME-001', name: 'Central Machine Shop & CNC Lathes', type: 'lab', capacity: 80 },
          { roomNumber: 'ME-002', name: 'Welding & Fitting Section', type: 'lab', capacity: 50 },
          { roomNumber: 'ME-003', name: 'Fluid Mechanics & Hydraulic Machinery', type: 'lab', capacity: 60 },
          { roomNumber: 'ME-004', name: 'IC Engines & Automobile Lab', type: 'lab', capacity: 50 },
        ],
      },
      {
        floorNumber: 1,
        floorName: 'First Floor',
        rooms: [
          { roomNumber: 'ME-101', name: 'HOD Mechanical Cabin', type: 'office', capacity: 15 },
          { roomNumber: 'ME-102', name: 'CAD/CAM & FEA Simulation Lab', type: 'lab', capacity: 60 },
          { roomNumber: 'ME-103', name: 'Heat & Mass Transfer Lab', type: 'lab', capacity: 50 },
          { roomNumber: 'ME-104', name: 'Lecture Hall ME-104', type: 'classroom', capacity: 100 },
        ],
      },
    ],
    qrCodeKey: 'VJTI-MECH-DEPT',
    isEmergencyPoint: false,
    viewsCount: 210,
  },
  {
    name: 'Department of Civil & Environmental Engineering',
    category: 'academic',
    department: 'Civil Engineering',
    description: 'Premier civil facility with Heavy Structures Testing Bed, Soil Mechanics Lab, Environmental Pollution Monitoring, and Surveying Hub.',
    coordinates: { lat: 19.02195, lng: 72.85735 },
    buildingImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Heavy Testing Frame', 'Concrete Testing Lab', 'Soil Mechanics Lab', 'Survey Equipment Wing', 'Wi-Fi'],
    openingHours: '08:30 AM - 05:30 PM',
    accessibilityInformation: {
      wheelchairAccessible: true,
      hasElevator: false,
      hasRamp: true,
      notes: 'Ramped access to main testing hall.',
    },
    contactInfo: {
      phone: '+91 22 2419 8300',
      email: 'hod.civil@vjti.ac.in',
      office: 'Civil Building, CE-101',
    },
    floors: [
      {
        floorNumber: 0,
        floorName: 'Ground Floor',
        rooms: [
          { roomNumber: 'CE-001', name: 'Strength of Materials & Concrete Lab', type: 'lab', capacity: 60 },
          { roomNumber: 'CE-002', name: 'Geotechnical & Soil Mechanics Wing', type: 'lab', capacity: 50 },
          { roomNumber: 'CE-003', name: 'Surveying Instruments Depot', type: 'utility', capacity: 20 },
        ],
      },
      {
        floorNumber: 1,
        floorName: 'First Floor',
        rooms: [
          { roomNumber: 'CE-101', name: 'HOD Civil Office', type: 'office', capacity: 15 },
          { roomNumber: 'CE-102', name: 'Environmental Engineering Analysis Lab', type: 'lab', capacity: 45 },
          { roomNumber: 'CE-103', name: 'Structural Engineering Drawing Hall', type: 'classroom', capacity: 90 },
        ],
      },
    ],
    qrCodeKey: 'VJTI-CIVIL-DEPT',
    isEmergencyPoint: false,
    viewsCount: 142,
  },
  {
    name: 'Department of Textile Manufactures',
    category: 'academic',
    department: 'Textile Technology',
    description: 'Historical department established in 1887 with modern spinning machines, industrial weaving looms, and advanced fiber testing equipment.',
    coordinates: { lat: 19.02130, lng: 72.85635 },
    buildingImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Spinning Machinery', 'Weaving Shed', 'Textile Chemical Processing', 'Fabric Testing Lab', 'Wi-Fi'],
    openingHours: '08:30 AM - 05:30 PM',
    accessibilityInformation: {
      wheelchairAccessible: true,
      hasElevator: false,
      hasRamp: true,
      notes: 'Ground level workshops are fully step-free.',
    },
    contactInfo: {
      phone: '+91 22 2419 8350',
      email: 'hod.textile@vjti.ac.in',
      office: 'Textile Block, TT-01',
    },
    floors: [
      {
        floorNumber: 0,
        floorName: 'Ground Floor',
        rooms: [
          { roomNumber: 'TT-001', name: 'Pilot Spinning Mill & Carding Room', type: 'lab', capacity: 40 },
          { roomNumber: 'TT-002', name: 'Shuttleless Weaving Loom Shed', type: 'lab', capacity: 40 },
          { roomNumber: 'TT-003', name: 'Textile Wet Processing & Dyeing Lab', type: 'lab', capacity: 35 },
        ],
      },
      {
        floorNumber: 1,
        floorName: 'First Floor',
        rooms: [
          { roomNumber: 'TT-101', name: 'HOD Textile Office', type: 'office', capacity: 15 },
          { roomNumber: 'TT-102', name: 'Physical Testing of Fibers & Polymers', type: 'lab', capacity: 40 },
          { roomNumber: 'TT-103', name: 'Classroom TT-103', type: 'classroom', capacity: 70 },
        ],
      },
    ],
    qrCodeKey: 'VJTI-TEXTILE',
    isEmergencyPoint: false,
    viewsCount: 98,
  },
  {
    name: 'Central Library & Knowledge Resource Centre',
    category: 'library',
    department: 'Library Services',
    description: 'Three-story academic sanctuary housing over 110,000 engineering volumes, IEEE digital archives, air-conditioned study halls, and thesis reading pods.',
    coordinates: { lat: 19.02325, lng: 72.85660 },
    buildingImage: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Air Conditioned Reading Rooms', 'Digital E-Library', 'High-speed Wi-Fi', 'Elevator', 'Photocopy & Printing', 'Restrooms', 'Wheelchair Ramp'],
    openingHours: '08:00 AM - 10:00 PM (Mon-Sat), 10:00 AM - 05:00 PM (Sun)',
    accessibilityInformation: {
      wheelchairAccessible: true,
      hasElevator: true,
      hasRamp: true,
      notes: 'Ramp at main portico, elevator serving all reading tiers.',
    },
    contactInfo: {
      phone: '+91 22 2419 8140',
      email: 'librarian@vjti.ac.in',
      office: 'Library Ground Floor Circulation',
    },
    floors: [
      {
        floorNumber: 0,
        floorName: 'Ground Floor',
        rooms: [
          { roomNumber: 'LIB-001', name: 'Issue & Return Circulation Desk', type: 'office', capacity: 25 },
          { roomNumber: 'LIB-002', name: 'Current Periodicals & Daily Newspapers', type: 'classroom', capacity: 60 },
          { roomNumber: 'LIB-003', name: 'Photocopy, Scanning & Printing Corner', type: 'utility', capacity: 15 },
          { roomNumber: 'LIB-004', name: 'Book Drop & Property Counter', type: 'utility', capacity: 10 },
        ],
      },
      {
        floorNumber: 1,
        floorName: 'First Floor',
        rooms: [
          { roomNumber: 'LIB-101', name: 'Digital E-Library & Online Search Terminals', type: 'lab', capacity: 80 },
          { roomNumber: 'LIB-102', name: 'Stack Room A (Computer, IT, Electronics)', type: 'utility', capacity: 50 },
          { roomNumber: 'LIB-103', name: 'Silent Self-Study Hall 1', type: 'classroom', capacity: 120 },
        ],
      },
      {
        floorNumber: 2,
        floorName: 'Second Floor',
        rooms: [
          { roomNumber: 'LIB-201', name: 'Stack Room B (Mechanical, Civil, Production)', type: 'utility', capacity: 50 },
          { roomNumber: 'LIB-202', name: 'Rare Books & Historical Archive', type: 'utility', capacity: 20 },
          { roomNumber: 'LIB-203', name: 'PhD Research & Thesis Repository', type: 'classroom', capacity: 40 },
          { roomNumber: 'LIB-204', name: 'Silent Self-Study Hall 2', type: 'classroom', capacity: 120 },
        ],
      },
    ],
    qrCodeKey: 'VJTI-LIBRARY',
    isEmergencyPoint: false,
    viewsCount: 420,
  },
  {
    name: 'VJTI Central Canteen & Cafeteria',
    category: 'food',
    department: 'Hospitality & Dining',
    description: 'Vibrant student dining hub offering hot South Indian breakfast, nutritious lunch thalis, Chinese specials, fresh juices, and shaded outdoor seating.',
    coordinates: { lat: 19.02190, lng: 72.85530 },
    buildingImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Hot Meals', 'Snack Counters', 'Digital Payments (UPI)', 'Purified Water Cooler', 'Handwash Station', 'Restrooms', 'Outdoor Shaded Veranda'],
    openingHours: '07:30 AM - 08:30 PM (Daily)',
    accessibilityInformation: {
      wheelchairAccessible: true,
      hasElevator: false,
      hasRamp: true,
      notes: 'Ground level dining hall with ramped veranda entrance.',
    },
    contactInfo: {
      phone: '+91 22 2419 8180',
      email: 'canteen@vjti.ac.in',
      office: 'Canteen Management Desk',
    },
    floors: [
      {
        floorNumber: 0,
        floorName: 'Ground Floor',
        rooms: [
          { roomNumber: 'CAN-01', name: 'Main Student Dining Hall', type: 'utility', capacity: 200 },
          { roomNumber: 'CAN-02', name: 'Faculty Dining Section', type: 'utility', capacity: 40 },
          { roomNumber: 'CAN-03', name: 'Juice, Beverage & Snack Counter', type: 'utility', capacity: 30 },
          { roomNumber: 'CAN-04', name: 'Billing & Token Counter', type: 'office', capacity: 15 },
        ],
      },
    ],
    qrCodeKey: 'VJTI-CANTEEN',
    isEmergencyPoint: false,
    viewsCount: 512,
  },
  {
    name: 'Nescafe Coffee Kiosk & Quad Veranda',
    category: 'food',
    department: 'Campus Amenities',
    description: 'Iconic spot for ice coffees, hot brews, grilled sandwiches, and quick snacks right next to the historic corridors.',
    coordinates: { lat: 19.02240, lng: 72.85550 },
    buildingImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Espresso & Frappe Bar', 'Snack Window', 'UPI Payments', 'Stone Bench Seating'],
    openingHours: '08:30 AM - 07:00 PM (Mon-Sat)',
    accessibilityInformation: {
      wheelchairAccessible: true,
      hasElevator: false,
      hasRamp: true,
      notes: 'Paved courtyard level, easily reachable without steps.',
    },
    contactInfo: {
      phone: '+91 22 2419 8181',
      email: 'amenities@vjti.ac.in',
      office: 'Kiosk Operator',
    },
    floors: [
      {
        floorNumber: 0,
        floorName: 'Ground Level',
        rooms: [
          { roomNumber: 'NES-01', name: 'Beverage & Snack Preparation Counter', type: 'utility', capacity: 10 },
        ],
      },
    ],
    qrCodeKey: 'VJTI-NESCAFE',
    isEmergencyPoint: false,
    viewsCount: 310,
  },
  {
    name: 'Boys Hostel Complex (Blocks A, B, C, D & Mess)',
    category: 'accommodation',
    department: 'Hostel Administration',
    description: 'Residential campus for undergraduate and postgraduate men featuring hostel rooms, dedicated mess dining, study hall, TV room, and laundry facilities.',
    coordinates: { lat: 19.02070, lng: 72.85575 },
    buildingImage: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Mess Dining', 'High-Speed Wi-Fi', 'Study Room', 'Badminton Court', 'Water Purifier', 'Laundry Facilities', '24x7 Security'],
    openingHours: '24 Hours (Resident Access)',
    accessibilityInformation: {
      wheelchairAccessible: true,
      hasElevator: false,
      hasRamp: true,
      notes: 'Ground floor rooms specifically reserved for differently-abled students.',
    },
    contactInfo: {
      phone: '+91 22 2419 8400',
      email: 'warden.boys@vjti.ac.in',
      office: 'Hostel Block A Office',
    },
    floors: [
      {
        floorNumber: 0,
        floorName: 'Ground Floor',
        rooms: [
          { roomNumber: 'BH-001', name: 'Chief Warden Office & Security Station', type: 'office', capacity: 20 },
          { roomNumber: 'BH-002', name: 'Hostel Central Mess Dining Hall', type: 'utility', capacity: 180 },
          { roomNumber: 'BH-003', name: 'Recreation & Table Tennis Room', type: 'utility', capacity: 30 },
        ],
      },
      {
        floorNumber: 1,
        floorName: 'First Floor',
        rooms: [
          { roomNumber: 'BH-101', name: 'Student Resident Rooms 101-130', type: 'classroom', capacity: 60 },
          { roomNumber: 'BH-102', name: 'Quiet Study Hall', type: 'classroom', capacity: 40 },
        ],
      },
    ],
    qrCodeKey: 'VJTI-BOYS-HOSTEL',
    isEmergencyPoint: false,
    viewsCount: 280,
  },
  {
    name: 'Girls Hostel Complex',
    category: 'accommodation',
    department: 'Hostel Administration',
    description: 'Secure gated residential blocks for women with round-the-clock female security wardens, hygienic dining mess, courtyard, and self-study lounge.',
    coordinates: { lat: 19.02045, lng: 72.85670 },
    buildingImage: 'https://images.unsplash.com/photo-1596276020587-8044fe049813?auto=format&fit=crop&w=1200&q=80',
    facilities: ['In-house Dining Mess', '24x7 Security & CCTV', 'Wi-Fi', 'Common Lounge', 'First Aid Station', 'Solar Hot Water'],
    openingHours: '24 Hours (Gate entry regulations apply)',
    accessibilityInformation: {
      wheelchairAccessible: true,
      hasElevator: false,
      hasRamp: true,
      notes: 'Ramped gate entry and ground floor accommodation available.',
    },
    contactInfo: {
      phone: '+91 22 2419 8450',
      email: 'warden.girls@vjti.ac.in',
      office: 'Girls Hostel Security Office',
    },
    floors: [
      {
        floorNumber: 0,
        floorName: 'Ground Floor',
        rooms: [
          { roomNumber: 'GH-001', name: 'Rector Cabin & Checkpost', type: 'office', capacity: 15 },
          { roomNumber: 'GH-002', name: 'Girls Dining Mess & Kitchen', type: 'utility', capacity: 140 },
          { roomNumber: 'GH-003', name: 'Visitor Waiting Lounge', type: 'office', capacity: 25 },
        ],
      },
      {
        floorNumber: 1,
        floorName: 'First Floor',
        rooms: [
          { roomNumber: 'GH-101', name: 'Student Resident Rooms 201-225', type: 'classroom', capacity: 50 },
          { roomNumber: 'GH-102', name: 'Reading & Internet Lounge', type: 'classroom', capacity: 35 },
        ],
      },
    ],
    qrCodeKey: 'VJTI-GIRLS-HOSTEL',
    isEmergencyPoint: false,
    viewsCount: 195,
  },
  {
    name: 'VJTI Gymkhana & Cricket Pavilion Ground',
    category: 'recreation',
    department: 'Physical Education & Sports',
    description: 'Huge outdoor sports arena featuring a full-length cricket pitch, football turf, 400m running track, outdoor basketball court, and athletic gym.',
    coordinates: { lat: 19.02100, lng: 72.85740 },
    buildingImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Cricket Ground', 'Football Pitch', 'Basketball Court', 'Indoor Weight Training Gym', 'Pavilion Seating', 'Restrooms', 'Sports Gear Depot'],
    openingHours: '06:00 AM - 09:00 PM (Daily)',
    accessibilityInformation: {
      wheelchairAccessible: true,
      hasElevator: false,
      hasRamp: true,
      notes: 'Paved spectator pathway surrounds the ground.',
    },
    contactInfo: {
      phone: '+91 22 2419 8190',
      email: 'sports@vjti.ac.in',
      office: 'Gymkhana Pavilion Room 1',
    },
    floors: [
      {
        floorNumber: 0,
        floorName: 'Ground Level',
        rooms: [
          { roomNumber: 'GYM-01', name: 'Physical Director Office', type: 'office', capacity: 15 },
          { roomNumber: 'GYM-02', name: 'Fitness & Weight Training Gym', type: 'utility', capacity: 40 },
          { roomNumber: 'GYM-03', name: 'Changing Rooms & Lockers', type: 'restroom', capacity: 30 },
        ],
      },
    ],
    qrCodeKey: 'VJTI-GYMKHANA',
    isEmergencyPoint: false,
    viewsCount: 260,
  },
  {
    name: 'Student Activities Centre (SAC)',
    category: 'facility',
    department: 'Student Affairs',
    description: 'Creative hub for VJTI students. Home to Technovanza, Pratibimb cultural fest committee, AeroVJTI, Community Service cell, and robotics teams.',
    coordinates: { lat: 19.02210, lng: 72.85495 },
    buildingImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Club Rooms', 'Sound & Light Equipment', 'Rehearsal Stage', 'Maker Workspace', 'Wi-Fi'],
    openingHours: '08:00 AM - 10:00 PM',
    accessibilityInformation: {
      wheelchairAccessible: true,
      hasElevator: false,
      hasRamp: true,
      notes: 'Ground level workshop and stage access.',
    },
    contactInfo: {
      phone: '+91 22 2419 8175',
      email: 'sac@vjti.ac.in',
      office: 'SAC Central Office',
    },
    floors: [
      {
        floorNumber: 0,
        floorName: 'Ground Floor',
        rooms: [
          { roomNumber: 'SAC-01', name: 'Technovanza Tech Fest Secretariat', type: 'office', capacity: 30 },
          { roomNumber: 'SAC-02', name: 'Pratibimb Cultural Fest Room', type: 'office', capacity: 25 },
          { roomNumber: 'SAC-03', name: 'Drona Aviation & Robotics Bay', type: 'lab', capacity: 35 },
          { roomNumber: 'SAC-04', name: 'Music & Dance Practice Hall', type: 'seminar_hall', capacity: 50 },
        ],
      },
    ],
    qrCodeKey: 'VJTI-SAC',
    isEmergencyPoint: false,
    viewsCount: 220,
  },
  {
    name: 'VJTI Health Dispensary & Medical Centre',
    category: 'medical',
    department: 'Healthcare Services',
    description: 'On-campus medical clinic providing primary healthcare, physician consultation, emergency first aid, ambulance coordination, and student counseling.',
    coordinates: { lat: 19.02290, lng: 72.85530 },
    buildingImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Resident Doctor Consultation', 'Emergency First Aid', 'Oxygen Cylinders', 'Stretcher & Wheelchair Support', 'Free Generic Medicines', 'Ambulance Bay'],
    openingHours: '24 Hours Emergency Support (General OPD: 09:00 AM - 06:00 PM)',
    accessibilityInformation: {
      wheelchairAccessible: true,
      hasElevator: false,
      hasRamp: true,
      notes: 'Fully step-free ambulance entry, wheelchair accessible triage bays.',
    },
    contactInfo: {
      phone: '+91 22 2419 8112',
      email: 'health@vjti.ac.in',
      office: 'Medical Centre Dispensary',
    },
    floors: [
      {
        floorNumber: 0,
        floorName: 'Ground Floor',
        rooms: [
          { roomNumber: 'MED-01', name: 'Doctor Consultation Chamber', type: 'office', capacity: 10 },
          { roomNumber: 'MED-02', name: 'Emergency Triage & Observation Bed Unit', type: 'utility', capacity: 8 },
          { roomNumber: 'MED-03', name: 'Pharmacy & Medicine Dispensary', type: 'utility', capacity: 10 },
          { roomNumber: 'MED-04', name: 'Student Mental Health & Counselling Clinic', type: 'office', capacity: 8 },
        ],
      },
    ],
    qrCodeKey: 'VJTI-MEDICAL',
    isEmergencyPoint: true,
    viewsCount: 178,
  },
  {
    name: 'Main Campus Gate (Gate 1 - H.R. Mahajani Marg)',
    category: 'facility',
    department: 'Campus Security',
    description: 'Primary public gateway to VJTI campus with security checkpost, visitor registration booth, and institutional directory display.',
    coordinates: { lat: 19.02350, lng: 72.85600 },
    buildingImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    facilities: ['24x7 Security Checkpost', 'Campus Map Directory', 'Pedestrian Turnstiles', 'Wheelchair Ramp Access', 'Visitor Pass Desk'],
    openingHours: '24 Hours Open',
    accessibilityInformation: {
      wheelchairAccessible: true,
      hasElevator: false,
      hasRamp: true,
      notes: 'Wide step-free pedestrian gate alongside main vehicular entrance.',
    },
    contactInfo: {
      phone: '+91 22 2419 8111',
      email: 'security@vjti.ac.in',
      office: 'Security Cabin 1',
    },
    floors: [
      {
        floorNumber: 0,
        floorName: 'Ground Level',
        rooms: [
          { roomNumber: 'SEC-01', name: 'Main Security Booth & Visitor Log', type: 'office', capacity: 10 },
        ],
      },
    ],
    qrCodeKey: 'VJTI-GATE-1',
    isEmergencyPoint: true,
    viewsCount: 340,
  },
  {
    name: 'South Campus Gate (Gate 2 - Hostel & Sports Gate)',
    category: 'facility',
    department: 'Campus Security',
    description: 'Southern access point directly connecting VJTI hostel blocks and sports pavilion with Matunga East railway access lanes.',
    coordinates: { lat: 19.02025, lng: 72.85550 },
    buildingImage: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Security Checkpost', 'Boom Barrier', 'Pedestrian Walkway', 'Lighting'],
    openingHours: '05:30 AM - 11:00 PM',
    accessibilityInformation: {
      wheelchairAccessible: true,
      hasElevator: false,
      hasRamp: true,
      notes: 'Completely flat paved entrance for wheelchairs and vehicles.',
    },
    contactInfo: {
      phone: '+91 22 2419 8113',
      email: 'security@vjti.ac.in',
      office: 'Security Cabin 2',
    },
    floors: [
      {
        floorNumber: 0,
        floorName: 'Ground Level',
        rooms: [
          { roomNumber: 'SEC-02', name: 'South Security Cabin', type: 'office', capacity: 8 },
        ],
      },
    ],
    qrCodeKey: 'VJTI-GATE-2',
    isEmergencyPoint: true,
    viewsCount: 165,
  },
  {
    name: 'North Campus Visitor & Faculty Parking',
    category: 'parking',
    department: 'Campus Estates',
    description: 'Designated asphalt parking facility located near Gate 1 with shaded bays for faculty four-wheelers, EV charging points, and two-wheeler lots.',
    coordinates: { lat: 19.02330, lng: 72.85555 },
    buildingImage: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Two-Wheeler Bays', 'Faculty 4-Wheeler Parking', 'EV Fast Charger', 'CCTV Monitoring', 'Disabled Parking Spot'],
    openingHours: '24 Hours',
    accessibilityInformation: {
      wheelchairAccessible: true,
      hasElevator: false,
      hasRamp: true,
      notes: 'Designated extra-wide parking spot for mobility-impaired visitors.',
    },
    contactInfo: {
      phone: '+91 22 2419 8100',
      email: 'estates@vjti.ac.in',
      office: 'Estates Office',
    },
    floors: [
      {
        floorNumber: 0,
        floorName: 'Ground Level',
        rooms: [
          { roomNumber: 'PRK-01', name: 'Parking Warden Booth', type: 'office', capacity: 5 },
        ],
      },
    ],
    qrCodeKey: 'VJTI-PARKING-NORTH',
    isEmergencyPoint: false,
    viewsCount: 110,
  },
  {
    name: 'Hostel & Sports Ground Parking',
    category: 'parking',
    department: 'Campus Estates',
    description: 'Spacious two-wheeler and bicycle stands accommodating hostel residents and sports participants near the Gymkhana ground.',
    coordinates: { lat: 19.02090, lng: 72.85530 },
    buildingImage: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Bicycle Racks', 'Motorcycle Bays', 'Floodlights', 'Paved Surface'],
    openingHours: '24 Hours',
    accessibilityInformation: {
      wheelchairAccessible: true,
      hasElevator: false,
      hasRamp: true,
      notes: 'Flat paved lot.',
    },
    contactInfo: {
      phone: '+91 22 2419 8400',
      email: 'estates@vjti.ac.in',
      office: 'Hostel Office',
    },
    floors: [
      {
        floorNumber: 0,
        floorName: 'Ground Level',
        rooms: [
          { roomNumber: 'PRK-02', name: 'Hostel Parking Area', type: 'utility', capacity: 150 },
        ],
      },
    ],
    qrCodeKey: 'VJTI-PARKING-SOUTH',
    isEmergencyPoint: false,
    viewsCount: 88,
  },
  {
    name: 'VJTI Historic Quadrangle & Open Courtyard',
    category: 'recreation',
    department: 'Campus Estates',
    description: 'The iconic central courtyard enveloped by Gothic arches and stone corridors. The central social melting pot of VJTI since 1923.',
    coordinates: { lat: 19.02230, lng: 72.85620 },
    buildingImage: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Wi-Fi Coverage', 'Stone Benches', 'Manicured Lawns', 'Shaded Arcades', 'Drinking Water Cooler'],
    openingHours: '06:00 AM - 09:00 PM',
    accessibilityInformation: {
      wheelchairAccessible: true,
      hasElevator: false,
      hasRamp: true,
      notes: 'Corridors around the quadrangle feature step-free transition ramps.',
    },
    contactInfo: {
      phone: '+91 22 2419 8100',
      email: 'info@vjti.ac.in',
      office: 'Main Reception',
    },
    floors: [
      {
        floorNumber: 0,
        floorName: 'Courtyard Level',
        rooms: [
          { roomNumber: 'QUAD-01', name: 'Central Garden & Assembly Lawn', type: 'utility', capacity: 300 },
        ],
      },
    ],
    qrCodeKey: 'VJTI-QUADRANGLE',
    isEmergencyPoint: false,
    viewsCount: 395,
  },
  {
    name: 'Emergency Muster Station & Disaster Evacuation Point',
    category: 'medical',
    department: 'Campus Disaster Management Cell',
    description: 'Designated open-sky safety assembly ground for rapid evacuation during fire alarms, chemical lab incidents, or earthquake warnings.',
    coordinates: { lat: 19.02120, lng: 72.85700 },
    buildingImage: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=1200&q=80',
    facilities: ['Emergency Siren Speaker', 'First Aid Station Depot', 'Fire Hydrant Access Point', 'Wide Evacuation Perimeter'],
    openingHours: '24 Hours Available',
    accessibilityInformation: {
      wheelchairAccessible: true,
      hasElevator: false,
      hasRamp: true,
      notes: 'Unobstructed wide lawn and paved egress from all buildings.',
    },
    contactInfo: {
      phone: '+91 22 2419 8999',
      email: 'emergency@vjti.ac.in',
      office: 'Disaster Cell',
    },
    floors: [
      {
        floorNumber: 0,
        floorName: 'Ground Open Field',
        rooms: [
          { roomNumber: 'EVAC-01', name: 'Muster Assembly Area 1', type: 'utility', capacity: 1000 },
        ],
      },
    ],
    qrCodeKey: 'VJTI-EVAC-MUSTER',
    isEmergencyPoint: true,
    viewsCount: 154,
  },
];

/**
 * Realistic Walkable Path Network for VJTI Matunga Campus
 * Connecting all buildings, intersections, gates, and facilities
 */
const campusPathsData = [
  // 1. Gate 1 to North Entrance Junction
  {
    startingPoint: { name: 'Main Campus Gate (Gate 1)', nodeId: 'gate_1', coordinates: { lat: 19.02350, lng: 72.85600 } },
    endingPoint: { name: 'North Entrance Junction', nodeId: 'junc_north_entry', coordinates: { lat: 19.02320, lng: 72.85600 } },
    distance: 33,
    pathCoordinates: [
      { lat: 19.02350, lng: 72.85600 },
      { lat: 19.02335, lng: 72.85600 },
      { lat: 19.02320, lng: 72.85600 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'paved' },
    pathType: 'main_walkway',
    isBidirectional: true,
  },
  // 2. North Entrance Junction to North Parking
  {
    startingPoint: { name: 'North Entrance Junction', nodeId: 'junc_north_entry', coordinates: { lat: 19.02320, lng: 72.85600 } },
    endingPoint: { name: 'North Campus Visitor & Faculty Parking', nodeId: 'north_parking', coordinates: { lat: 19.02330, lng: 72.85555 } },
    distance: 48,
    pathCoordinates: [
      { lat: 19.02320, lng: 72.85600 },
      { lat: 19.02325, lng: 72.85575 },
      { lat: 19.02330, lng: 72.85555 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'asphalt' },
    pathType: 'paved_road',
    isBidirectional: true,
  },
  // 3. North Entrance Junction to Library Crossway
  {
    startingPoint: { name: 'North Entrance Junction', nodeId: 'junc_north_entry', coordinates: { lat: 19.02320, lng: 72.85600 } },
    endingPoint: { name: 'Library Walkway Crossway', nodeId: 'junc_library', coordinates: { lat: 19.02315, lng: 72.85645 } },
    distance: 48,
    pathCoordinates: [
      { lat: 19.02320, lng: 72.85600 },
      { lat: 19.02318, lng: 72.85625 },
      { lat: 19.02315, lng: 72.85645 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'paved' },
    pathType: 'main_walkway',
    isBidirectional: true,
  },
  // 4. Library Crossway to Central Library Entrance
  {
    startingPoint: { name: 'Library Walkway Crossway', nodeId: 'junc_library', coordinates: { lat: 19.02315, lng: 72.85645 } },
    endingPoint: { name: 'Central Library & Knowledge Resource Centre', nodeId: 'central_library', coordinates: { lat: 19.02325, lng: 72.85660 } },
    distance: 20,
    pathCoordinates: [
      { lat: 19.02315, lng: 72.85645 },
      { lat: 19.02325, lng: 72.85660 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'tiles' },
    pathType: 'ramp',
    isBidirectional: true,
  },
  // 5. Library Crossway to Computer & IT Building
  {
    startingPoint: { name: 'Library Walkway Crossway', nodeId: 'junc_library', coordinates: { lat: 19.02315, lng: 72.85645 } },
    endingPoint: { name: 'Department of Computer Engineering & IT', nodeId: 'comp_it_dept', coordinates: { lat: 19.02280, lng: 72.85695 } },
    distance: 65,
    pathCoordinates: [
      { lat: 19.02315, lng: 72.85645 },
      { lat: 19.02300, lng: 72.85675 },
      { lat: 19.02280, lng: 72.85695 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'paved' },
    pathType: 'main_walkway',
    isBidirectional: true,
  },
  // 6. North Entrance Junction to Main Building North Porch
  {
    startingPoint: { name: 'North Entrance Junction', nodeId: 'junc_north_entry', coordinates: { lat: 19.02320, lng: 72.85600 } },
    endingPoint: { name: 'Main Building North Porch', nodeId: 'main_bldg_north', coordinates: { lat: 19.02275, lng: 72.85605 } },
    distance: 50,
    pathCoordinates: [
      { lat: 19.02320, lng: 72.85600 },
      { lat: 19.02295, lng: 72.85602 },
      { lat: 19.02275, lng: 72.85605 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'paved' },
    pathType: 'main_walkway',
    isBidirectional: true,
  },
  // 7. North Parking to Health Dispensary / Medical Centre
  {
    startingPoint: { name: 'North Campus Visitor & Faculty Parking', nodeId: 'north_parking', coordinates: { lat: 19.02330, lng: 72.85555 } },
    endingPoint: { name: 'VJTI Health Dispensary & Medical Centre', nodeId: 'medical_centre', coordinates: { lat: 19.02290, lng: 72.85530 } },
    distance: 52,
    pathCoordinates: [
      { lat: 19.02330, lng: 72.85555 },
      { lat: 19.02310, lng: 72.85545 },
      { lat: 19.02290, lng: 72.85530 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'paved' },
    pathType: 'main_walkway',
    isBidirectional: true,
  },
  // 8. Main Building North Porch to Electrical Engineering
  {
    startingPoint: { name: 'Main Building North Porch', nodeId: 'main_bldg_north', coordinates: { lat: 19.02275, lng: 72.85605 } },
    endingPoint: { name: 'Department of Electrical Engineering', nodeId: 'electrical_dept', coordinates: { lat: 19.02270, lng: 72.85565 } },
    distance: 42,
    pathCoordinates: [
      { lat: 19.02275, lng: 72.85605 },
      { lat: 19.02272, lng: 72.85585 },
      { lat: 19.02270, lng: 72.85565 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'tiles' },
    pathType: 'corridor',
    isBidirectional: true,
  },
  // 9. Main Building North Porch to VJTI Quadrangle
  {
    startingPoint: { name: 'Main Building North Porch', nodeId: 'main_bldg_north', coordinates: { lat: 19.02275, lng: 72.85605 } },
    endingPoint: { name: 'VJTI Historic Quadrangle & Open Courtyard', nodeId: 'quadrangle', coordinates: { lat: 19.02230, lng: 72.85620 } },
    distance: 53,
    pathCoordinates: [
      { lat: 19.02275, lng: 72.85605 },
      { lat: 19.02250, lng: 72.85610 },
      { lat: 19.02230, lng: 72.85620 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'tiles' },
    pathType: 'corridor',
    isBidirectional: true,
  },
  // 10. Electrical Dept to Nescafe Kiosk
  {
    startingPoint: { name: 'Department of Electrical Engineering', nodeId: 'electrical_dept', coordinates: { lat: 19.02270, lng: 72.85565 } },
    endingPoint: { name: 'Nescafe Coffee Kiosk & Quad Veranda', nodeId: 'nescafe_kiosk', coordinates: { lat: 19.02240, lng: 72.85550 } },
    distance: 36,
    pathCoordinates: [
      { lat: 19.02270, lng: 72.85565 },
      { lat: 19.02255, lng: 72.85558 },
      { lat: 19.02240, lng: 72.85550 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'paved' },
    pathType: 'main_walkway',
    isBidirectional: true,
  },
  // 11. Medical Centre to Nescafe Kiosk
  {
    startingPoint: { name: 'VJTI Health Dispensary & Medical Centre', nodeId: 'medical_centre', coordinates: { lat: 19.02290, lng: 72.85530 } },
    endingPoint: { name: 'Nescafe Coffee Kiosk & Quad Veranda', nodeId: 'nescafe_kiosk', coordinates: { lat: 19.02240, lng: 72.85550 } },
    distance: 58,
    pathCoordinates: [
      { lat: 19.02290, lng: 72.85530 },
      { lat: 19.02265, lng: 72.85540 },
      { lat: 19.02240, lng: 72.85550 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'paved' },
    pathType: 'main_walkway',
    isBidirectional: true,
  },
  // 12. Nescafe Kiosk to VJTI Central Canteen
  {
    startingPoint: { name: 'Nescafe Coffee Kiosk & Quad Veranda', nodeId: 'nescafe_kiosk', coordinates: { lat: 19.02240, lng: 72.85550 } },
    endingPoint: { name: 'VJTI Central Canteen & Cafeteria', nodeId: 'central_canteen', coordinates: { lat: 19.02190, lng: 72.85530 } },
    distance: 59,
    pathCoordinates: [
      { lat: 19.02240, lng: 72.85550 },
      { lat: 19.02215, lng: 72.85540 },
      { lat: 19.02190, lng: 72.85530 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'paved' },
    pathType: 'main_walkway',
    isBidirectional: true,
  },
  // 13. Central Canteen to Student Activities Centre (SAC)
  {
    startingPoint: { name: 'VJTI Central Canteen & Cafeteria', nodeId: 'central_canteen', coordinates: { lat: 19.02190, lng: 72.85530 } },
    endingPoint: { name: 'Student Activities Centre (SAC)', nodeId: 'sac_hub', coordinates: { lat: 19.02210, lng: 72.85495 } },
    distance: 43,
    pathCoordinates: [
      { lat: 19.02190, lng: 72.85530 },
      { lat: 19.02200, lng: 72.85510 },
      { lat: 19.02210, lng: 72.85495 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'paved' },
    pathType: 'main_walkway',
    isBidirectional: true,
  },
  // 14. VJTI Quadrangle to Computer & IT Department (Direct Corridor)
  {
    startingPoint: { name: 'VJTI Historic Quadrangle & Open Courtyard', nodeId: 'quadrangle', coordinates: { lat: 19.02230, lng: 72.85620 } },
    endingPoint: { name: 'Department of Computer Engineering & IT', nodeId: 'comp_it_dept', coordinates: { lat: 19.02280, lng: 72.85695 } },
    distance: 96,
    pathCoordinates: [
      { lat: 19.02230, lng: 72.85620 },
      { lat: 19.02250, lng: 72.85655 },
      { lat: 19.02280, lng: 72.85695 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'tiles' },
    pathType: 'corridor',
    isBidirectional: true,
  },
  // 15. Computer & IT to Mechanical Dept Junction
  {
    startingPoint: { name: 'Department of Computer Engineering & IT', nodeId: 'comp_it_dept', coordinates: { lat: 19.02280, lng: 72.85695 } },
    endingPoint: { name: 'East Academic Walkway Junction', nodeId: 'junc_east_academic', coordinates: { lat: 19.02220, lng: 72.85700 } },
    distance: 67,
    pathCoordinates: [
      { lat: 19.02280, lng: 72.85695 },
      { lat: 19.02250, lng: 72.85698 },
      { lat: 19.02220, lng: 72.85700 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'paved' },
    pathType: 'main_walkway',
    isBidirectional: true,
  },
  // 16. East Academic Walkway to Civil Engineering
  {
    startingPoint: { name: 'East Academic Walkway Junction', nodeId: 'junc_east_academic', coordinates: { lat: 19.02220, lng: 72.85700 } },
    endingPoint: { name: 'Department of Civil & Environmental Engineering', nodeId: 'civil_dept', coordinates: { lat: 19.02195, lng: 72.85735 } },
    distance: 46,
    pathCoordinates: [
      { lat: 19.02220, lng: 72.85700 },
      { lat: 19.02205, lng: 72.85718 },
      { lat: 19.02195, lng: 72.85735 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'paved' },
    pathType: 'main_walkway',
    isBidirectional: true,
  },
  // 17. East Academic Walkway to Mechanical Engineering
  {
    startingPoint: { name: 'East Academic Walkway Junction', nodeId: 'junc_east_academic', coordinates: { lat: 19.02220, lng: 72.85700 } },
    endingPoint: { name: 'Department of Mechanical Engineering & Workshops', nodeId: 'mech_dept', coordinates: { lat: 19.02165, lng: 72.85685 } },
    distance: 63,
    pathCoordinates: [
      { lat: 19.02220, lng: 72.85700 },
      { lat: 19.02190, lng: 72.85692 },
      { lat: 19.02165, lng: 72.85685 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'paved' },
    pathType: 'main_walkway',
    isBidirectional: true,
  },
  // 18. VJTI Quadrangle to South Academic Crossway
  {
    startingPoint: { name: 'VJTI Historic Quadrangle & Open Courtyard', nodeId: 'quadrangle', coordinates: { lat: 19.02230, lng: 72.85620 } },
    endingPoint: { name: 'South Academic Crossway', nodeId: 'junc_south_academic', coordinates: { lat: 19.02155, lng: 72.85620 } },
    distance: 83,
    pathCoordinates: [
      { lat: 19.02230, lng: 72.85620 },
      { lat: 19.02190, lng: 72.85618 },
      { lat: 19.02155, lng: 72.85620 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'paved' },
    pathType: 'main_walkway',
    isBidirectional: true,
  },
  // 19. South Academic Crossway to Textile Dept
  {
    startingPoint: { name: 'South Academic Crossway', nodeId: 'junc_south_academic', coordinates: { lat: 19.02155, lng: 72.85620 } },
    endingPoint: { name: 'Department of Textile Manufactures', nodeId: 'textile_dept', coordinates: { lat: 19.02130, lng: 72.85635 } },
    distance: 32,
    pathCoordinates: [
      { lat: 19.02155, lng: 72.85620 },
      { lat: 19.02142, lng: 72.85628 },
      { lat: 19.02130, lng: 72.85635 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'paved' },
    pathType: 'main_walkway',
    isBidirectional: true,
  },
  // 20. South Academic Crossway to Mechanical Dept
  {
    startingPoint: { name: 'South Academic Crossway', nodeId: 'junc_south_academic', coordinates: { lat: 19.02155, lng: 72.85620 } },
    endingPoint: { name: 'Department of Mechanical Engineering & Workshops', nodeId: 'mech_dept', coordinates: { lat: 19.02165, lng: 72.85685 } },
    distance: 69,
    pathCoordinates: [
      { lat: 19.02155, lng: 72.85620 },
      { lat: 19.02160, lng: 72.85650 },
      { lat: 19.02165, lng: 72.85685 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'paved' },
    pathType: 'main_walkway',
    isBidirectional: true,
  },
  // 21. South Academic Crossway to Central Canteen
  {
    startingPoint: { name: 'South Academic Crossway', nodeId: 'junc_south_academic', coordinates: { lat: 19.02155, lng: 72.85620 } },
    endingPoint: { name: 'VJTI Central Canteen & Cafeteria', nodeId: 'central_canteen', coordinates: { lat: 19.02190, lng: 72.85530 } },
    distance: 102,
    pathCoordinates: [
      { lat: 19.02155, lng: 72.85620 },
      { lat: 19.02170, lng: 72.85575 },
      { lat: 19.02190, lng: 72.85530 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'paved' },
    pathType: 'main_walkway',
    isBidirectional: true,
  },
  // 22. Civil Engineering to Gymkhana Sports Ground
  {
    startingPoint: { name: 'Department of Civil & Environmental Engineering', nodeId: 'civil_dept', coordinates: { lat: 19.02195, lng: 72.85735 } },
    endingPoint: { name: 'VJTI Gymkhana & Cricket Pavilion Ground', nodeId: 'gymkhana_ground', coordinates: { lat: 19.02100, lng: 72.85740 } },
    distance: 106,
    pathCoordinates: [
      { lat: 19.02195, lng: 72.85735 },
      { lat: 19.02150, lng: 72.85738 },
      { lat: 19.02100, lng: 72.85740 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'paved' },
    pathType: 'main_walkway',
    isBidirectional: true,
  },
  // 23. Gymkhana to Emergency Muster Station
  {
    startingPoint: { name: 'VJTI Gymkhana & Cricket Pavilion Ground', nodeId: 'gymkhana_ground', coordinates: { lat: 19.02100, lng: 72.85740 } },
    endingPoint: { name: 'Emergency Muster Station & Disaster Evacuation Point', nodeId: 'muster_station', coordinates: { lat: 19.02120, lng: 72.85700 } },
    distance: 48,
    pathCoordinates: [
      { lat: 19.02100, lng: 72.85740 },
      { lat: 19.02110, lng: 72.85720 },
      { lat: 19.02120, lng: 72.85700 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'paved' },
    pathType: 'main_walkway',
    isBidirectional: true,
  },
  // 24. Textile Dept to Emergency Muster Station
  {
    startingPoint: { name: 'Department of Textile Manufactures', nodeId: 'textile_dept', coordinates: { lat: 19.02130, lng: 72.85635 } },
    endingPoint: { name: 'Emergency Muster Station & Disaster Evacuation Point', nodeId: 'muster_station', coordinates: { lat: 19.02120, lng: 72.85700 } },
    distance: 69,
    pathCoordinates: [
      { lat: 19.02130, lng: 72.85635 },
      { lat: 19.02125, lng: 72.85670 },
      { lat: 19.02120, lng: 72.85700 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'paved' },
    pathType: 'main_walkway',
    isBidirectional: true,
  },
  // 25. South Academic Crossway to Boys Hostel Junction
  {
    startingPoint: { name: 'South Academic Crossway', nodeId: 'junc_south_academic', coordinates: { lat: 19.02155, lng: 72.85620 } },
    endingPoint: { name: 'Hostel Quad Crossway', nodeId: 'junc_hostels', coordinates: { lat: 19.02085, lng: 72.85600 } },
    distance: 81,
    pathCoordinates: [
      { lat: 19.02155, lng: 72.85620 },
      { lat: 19.02120, lng: 72.85610 },
      { lat: 19.02085, lng: 72.85600 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'paved' },
    pathType: 'main_walkway',
    isBidirectional: true,
  },
  // 26. Hostel Crossway to Boys Hostel Complex
  {
    startingPoint: { name: 'Hostel Quad Crossway', nodeId: 'junc_hostels', coordinates: { lat: 19.02085, lng: 72.85600 } },
    endingPoint: { name: 'Boys Hostel Complex (Blocks A, B, C, D & Mess)', nodeId: 'boys_hostel', coordinates: { lat: 19.02070, lng: 72.85575 } },
    distance: 31,
    pathCoordinates: [
      { lat: 19.02085, lng: 72.85600 },
      { lat: 19.02070, lng: 72.85575 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'paved' },
    pathType: 'main_walkway',
    isBidirectional: true,
  },
  // 27. Hostel Crossway to Girls Hostel Complex
  {
    startingPoint: { name: 'Hostel Quad Crossway', nodeId: 'junc_hostels', coordinates: { lat: 19.02085, lng: 72.85600 } },
    endingPoint: { name: 'Girls Hostel Complex', nodeId: 'girls_hostel', coordinates: { lat: 19.02045, lng: 72.85670 } },
    distance: 86,
    pathCoordinates: [
      { lat: 19.02085, lng: 72.85600 },
      { lat: 19.02065, lng: 72.85635 },
      { lat: 19.02045, lng: 72.85670 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'paved' },
    pathType: 'main_walkway',
    isBidirectional: true,
  },
  // 28. Boys Hostel to Hostel Parking
  {
    startingPoint: { name: 'Boys Hostel Complex (Blocks A, B, C, D & Mess)', nodeId: 'boys_hostel', coordinates: { lat: 19.02070, lng: 72.85575 } },
    endingPoint: { name: 'Hostel & Sports Ground Parking', nodeId: 'south_parking', coordinates: { lat: 19.02090, lng: 72.85530 } },
    distance: 52,
    pathCoordinates: [
      { lat: 19.02070, lng: 72.85575 },
      { lat: 19.02080, lng: 72.85550 },
      { lat: 19.02090, lng: 72.85530 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'paved' },
    pathType: 'paved_road',
    isBidirectional: true,
  },
  // 29. Boys Hostel to Gate 2 (Hostel Gate)
  {
    startingPoint: { name: 'Boys Hostel Complex (Blocks A, B, C, D & Mess)', nodeId: 'boys_hostel', coordinates: { lat: 19.02070, lng: 72.85575 } },
    endingPoint: { name: 'South Campus Gate (Gate 2 - Hostel & Sports Gate)', nodeId: 'gate_2', coordinates: { lat: 19.02025, lng: 72.85550 } },
    distance: 56,
    pathCoordinates: [
      { lat: 19.02070, lng: 72.85575 },
      { lat: 19.02045, lng: 72.85560 },
      { lat: 19.02025, lng: 72.85550 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'paved' },
    pathType: 'main_walkway',
    isBidirectional: true,
  },
  // 30. Girls Hostel to Gymkhana Ground
  {
    startingPoint: { name: 'Girls Hostel Complex', nodeId: 'girls_hostel', coordinates: { lat: 19.02045, lng: 72.85670 } },
    endingPoint: { name: 'VJTI Gymkhana & Cricket Pavilion Ground', nodeId: 'gymkhana_ground', coordinates: { lat: 19.02100, lng: 72.85740 } },
    distance: 97,
    pathCoordinates: [
      { lat: 19.02045, lng: 72.85670 },
      { lat: 19.02075, lng: 72.85705 },
      { lat: 19.02100, lng: 72.85740 },
    ],
    accessibility: { wheelchairAccessible: true, hasStairs: false, surfaceType: 'paved' },
    pathType: 'main_walkway',
    isBidirectional: true,
  },
  // 31. Alternative Scenic Garden Path: Quadrangle to SAC via Heritage Garden (Has small decorative steps)
  {
    startingPoint: { name: 'VJTI Historic Quadrangle & Open Courtyard', nodeId: 'quadrangle', coordinates: { lat: 19.02230, lng: 72.85620 } },
    endingPoint: { name: 'Student Activities Centre (SAC)', nodeId: 'sac_hub', coordinates: { lat: 19.02210, lng: 72.85495 } },
    distance: 133,
    pathCoordinates: [
      { lat: 19.02230, lng: 72.85620 },
      { lat: 19.02220, lng: 72.85570 },
      { lat: 19.02210, lng: 72.85520 },
      { lat: 19.02210, lng: 72.85495 },
    ],
    accessibility: { wheelchairAccessible: false, hasStairs: true, surfaceType: 'steps' },
    pathType: 'garden_path',
    isBidirectional: true,
  },
];

module.exports = {
  locationsData,
  campusPathsData,
};
