# TrackPedia 🏁

A comprehensive motorsport trip-planning and circuit discovery platform built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Firebase (Auth & Firestore)**.

TrackPedia allows car and motorcycle enthusiasts to discover race tracks across North America, compare bundled track day and nearby lodging packages, coordinate group trips with real-time cost splitting, manage pre-track prep checklists, and save custom itineraries.

---

## ✨ Features

- **Circuit Discovery & Telemetry**: Explore 20+ premier North American road courses with track details (length, turn count, decibel limits, configuration maps, and surface types).
- **Interactive Geospatial Mapping**: Powered by Leaflet and OpenStreetMap with custom circuit markers, radius filtering, and location search.
- **Lodging & Accommodation Engine**: Curated nearby accommodations and live Overpass OSM geospatial querying to estimate weekend lodging costs.
- **Package Comparison & Custom Builder**: Multi-track comparison matrix factoring in track fees, hotel nights, transport, and equipment.
- **Group Trip Planning & Expense Splitter**: Coordinate group track days with member invitations, real-time shared voting on tracks/hotels, interactive expense logging, and automatic debt balance calculations.
- **Pre-Track Day Checklists**: Dedicated technical inspection checklists for cars and motorcycles covering fluid checks, brake pads, tire pressures, torque specs, and safety gear.
- **User Authentication & Cloud Persistence**: Integrated Firebase Auth and Cloud Firestore to persist saved itineraries, group trips, and user profiles across sessions.

---

## 🛠️ Tech Stack & Architecture

### **Frontend & UI**
- **React 19**: Modern component architecture leveraging hooks and functional components.
- **TypeScript**: Strict type definitions for tracks, accommodations, group planning, and telemetry.
- **Tailwind CSS v4**: High-performance, modern styling with accessible color contrast and responsive layouts.
- **Motion (`motion/react`)**: Physics-based UI animations, layout transitions, and interactive dialogs.
- **Lucide Icons**: Consistent iconography across motorsport telemetry, finance, and navigation components.
- **Leaflet & React-Leaflet**: Interactive OpenStreetMap visualization with custom circuit coordinates and popup details.
- **Date-fns & React-Datepicker**: Weekend duration scheduling and date calculations.

### **Backend & Cloud Services**
- **Firebase Firestore**: Real-time cloud document database for user profiles, saved itineraries, trip planning rooms, and expense splits.
- **Firebase Authentication**: Secure user management and session handling with demo guest fallback.
- **Vite & Node.js**: Fast ES module bundling, development proxy, and production build tooling.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Local Run

```bash
# 1. Clone the repository
git clone https://github.com/your-username/trackpedia.git
cd trackpedia

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
```

This compiles the static assets into the `dist/` directory ready for deployment.

---

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── CheckoutPage.tsx      # Booking invoice and package summary
│   │   ├── Navigation.tsx        # Responsive app navigation and mode switcher
│   │   ├── PlanningPage.tsx      # Group coordination, expense split, and voting
│   │   ├── SafeImage.tsx         # Resilient image loader with CDN fallbacks
│   │   └── UserProfile.tsx       # Profile management, vehicle specs, and saved trips
│   ├── constants.ts              # Track dataset, curated lodging, and default mock state
│   ├── types.ts                  # Global TypeScript interfaces and schemas
│   ├── App.tsx                   # Main application coordinator and view routing
│   └── main.tsx                  # Application entry point
├── firestore.rules               # Firestore security rules
├── metadata.json                 # Application metadata and capabilities
└── package.json                  # Dependencies and build scripts
```

---

## 🔒 Security & Privacy

- Client credentials and database interactions are governed by Firestore security rules (`firestore.rules`).
- External images and CDN resources enforce `referrerPolicy="no-referrer"` to ensure reliable cross-origin asset loading.
