# TrackPedia 🏁

A full-stack track day aggregator and trip planning platform built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Firebase (Auth & Firestore)**.

TrackPedia allows motorsport enthusiasts (cars and motorcycles) to discover race tracks across North America, compare bundled track day and nearby lodging packages, coordinate group trips with cost splitting, manage pre-track prep checklists, and save custom itineraries.

---

## 🚀 Live Demo & Repository Setup

### 1. Exporting & Forking from Google AI Studio
- In Google AI Studio Build, click the **Settings / Menu** icon in the top navigation.
- Select **Export to GitHub** (to push directly to your personal GitHub account) or **Download ZIP** (to extract and push locally).
- Create a new public repository on GitHub (e.g. `yourusername/trackpedia`) and link your code.

### 2. Local Development Setup

```bash
# 1. Clone your repository
git clone https://github.com/your-username/trackpedia.git
cd trackpedia

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Core**: React 19, TypeScript, Vite
- **Styling & Motion**: Tailwind CSS v4, Motion (`motion/react`), Lucide Icons
- **Mapping & GIS**: Leaflet, React-Leaflet (interactive OpenStreetMap integration with custom track coordinate markers)
- **Backend & Persistence**: Firebase Authentication (Email/Password & Social Auth), Cloud Firestore (user profiles, group trips, checklist state)
- **Date & State Management**: `date-fns`, `react-datepicker`, React Context API

---

## 📦 Deployment Options

### Option A: Vercel (Recommended for SPA)
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and import the repository.
3. Build Settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

### Option B: Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Set public directory to 'dist' and configure as single-page app
npm run build
firebase deploy --only hosting
```

### Option C: Netlify
1. Connect GitHub repo on [Netlify](https://netlify.com).
2. Set build command: `npm run build` and publish directory: `dist`.
3. Add a `_redirects` file in `public/` containing: `/*    /index.html   200`.

---

## 💼 Portfolio & Resume Highlights (For New Grad Showcase)

Here are sample resume bullets and talking points highlighting technical depth:

- **Full-Stack Application Architecture**: Built a responsive single-page motorsport aggregator and trip planner supporting multi-state search, lodging package comparison, and group planning.
- **Geospatial & Interactive Visualizations**: Integrated Leaflet GIS mapping with custom map pins and reactive coordinate bounds to visualize track locations and nearest accommodations across 20+ national racing circuits.
- **Real-Time Cloud Persistence**: Implemented Firebase Authentication and Firestore real-time listeners for group itinerary synchronization, dynamic cost-split calculations, and packing checklists.
- **Modern Performance & UI Craft**: Styled with Tailwind CSS v4 and animated using Motion for fluid modal dialogs and seamless view transitions.
