# Gaurav | Mechanical Engineering Portfolio Website 🚀

A modern, responsive, high-performance personal portfolio website designed specifically for **Gaurav**, a 19-year-old first-year **B.Tech Mechanical Engineering student at JECRC University, Jaipur, Rajasthan (Batch 2026–2030)**.

Built with a **premium engineering & technology theme**: dark navy background, electric cyan and blue accents, crisp typography, blueprint technical schematics, smooth animations, and clean responsive layouts.

---

## 🌟 Key Features

1. **Engineering & Tech Aesthetic:**
   - Dark Navy palette (`#050b18` to `#112048`) with vibrant cyan (`#00f2fe`) and engineering blue accents.
   - Interactive Canvas background with floating kinematic nodes and mouse-proximity connections.
   - Dynamic typewriter ticker highlighting engineering interests and student status.
   - Precision SVG technical illustrations for CAD gear trains, mechatronics, solar thermal collectors, and lathe workshop machining.

2. **Full Section Coverage:**
   - **Hero / Home:** Name, B.Tech course, JECRC University, Batch 2026–2030, dynamic tagline, primary action CTAs, and quick status chips.
   - **About Me:** Interest in mechanical engineering, hands-on learning, digital CAD integration, teamwork, and quick profile facts.
   - **Education:** B.Tech Mechanical Engineering at JECRC University (2026–2030, 1st Year), Class XII from Times Public School, Hanumangarh (2025, 58%), and Class X from R.B.D.A.V. National Public School, Bathinda (2023, 81.4%).
   - **Skills:** Mechanical engineering fundamentals, CAD/computing tools (AutoCAD, SolidWorks, Python, Arduino), basketball athleticism, and strategic video gaming capabilities.
   - **Projects:** Featured Personal Engineering Portfolio Website project, plus clearly labelled, structured editable placeholders for future CAD, robotics, and manufacturing projects.
   - **Certifications & Achievements:** Authentic placeholders for NPTEL/SWAYAM, CAD software credentials, university workshops, and tech competitions.
   - **Interests & Career Goals:** Core focus areas (Automotive/EVs, Robotics, Solar Thermal, Additive Manufacturing) and a 4-year undergraduate growth roadmap.
   - **Contact:** Interactive email contact form, copy-to-clipboard email button, campus location, and social links.
   - **GitHub & LinkedIn:** Prominent buttons with editable links throughout the navigation, hero, contact, and footer.

3. **Interactive "Edit Hints" Assistant:**
   - Click the **✏️ Edit Hints** button in the header bar to immediately highlight all customizable fields with an amber dashed outline and badge.

4. **100% Zero-Dependency & Standalone:**
   - No build tools, Node.js, or complex setups required.
   - Works immediately by double-clicking `index.html`.

---

## 📁 File Structure

```
Gaurav Sehra-Portfolio/
├── index.html                     # Main website layout with semantic HTML5 sections
├── css/
│   └── styles.css                 # Dark navy theme, glassmorphism, responsive styles
├── js/
│   └── main.js                    # Interactive features, typewriter, modal data, canvas nodes
├── assets/
│   └── images/
│       ├── engineer-avatar.svg            # Custom vector engineer avatar
│       ├── project-cad-mechanism.svg      # CAD kinematic mechanism schematic
│       ├── project-robotics.svg           # Autonomous robot mechatronics schematic
│       ├── project-solar-thermal.svg      # Solar thermal collector schematic
│       └── project-lathe-workshop.svg     # Workshop lathe machined shaft schematic
└── README.md                      # Customization and deployment guide
```

---

## 🛠️ How to Customize Your Portfolio

### 1. Update Your Contact Details & Social Links
Open `index.html` in VS Code or any text editor and search for `editable-placeholder` or:
- **Email:** Replace `gaurav.sehra.mecheng@example.com` with your genuine email address.
- **GitHub:** Replace `https://github.com/your-username` with your real profile link.
- **LinkedIn:** Replace `https://linkedin.com/in/your-profile` with your real profile link.
- Also update the top config object in `js/main.js`:
  ```javascript
  const PORTFOLIO_CONFIG = {
    name: "Gaurav Sehra",
    university: "JECRC University, Jaipur, Rajasthan",
    email: "your.real.email@gmail.com",
    linkedin: "https://linkedin.com/in/your-actual-profile",
    github: "https://github.com/your-actual-username",
    location: "Jaipur, Rajasthan, India"
  };
  ```

### 2. Update School Names & Marks in Education Section
In `index.html` under `<section id="education">`:
- Replace `[Your High School Name, e.g., Kendriya Vidyalaya / St. Xavier's / DAV School, Jaipur]` with your actual 12th school name.
- Replace `[Year, e.g., 2024] • Percentage: [XX%]` with your passing year and percentage.
- Update the Class X school placeholder similarly.

### 3. Replace Sample Projects with Your Actual Work
- When you complete a university project or workshop model, replace the project titles, descriptions, and links in `index.html`.
- To update the details in the popup modal, open `js/main.js` and edit the entries inside `PROJECT_DATA`.

### 4. Add Real Certificates
In `index.html` under `<section id="certifications">`:
- Update certificate titles (e.g., NPTEL, Coursera, Autodesk, SolidWorks, or JECRC Workshop certificates), dates, and credential IDs as you earn them.

---

## 🌐 Free Hosting & Deployment

### Option A: GitHub Pages (Recommended)
1. Create a free GitHub account at [github.com](https://github.com).
2. Create a new repository named `gaurav-portfolio` (or `<your-username>.github.io`).
3. Upload all files from this folder (`index.html`, `css/`, `js/`, `assets/`).
4. Go to **Settings > Pages > Branch**, select `main` (or `master`), and click **Save**.
5. Your portfolio will be live at `https://<your-username>.github.io/gaurav-portfolio`!

### Option B: Netlify (Drag & Drop)
1. Go to [netlify.com](https://www.netlify.com).
2. Sign in and drag this entire `Gaurav Sehra-Portfolio` folder into the Netlify dashboard.
3. Your website will be live in 10 seconds with a free custom SSL link.

---

## 📱 Browser Compatibility
- Tested and verified on modern desktop and mobile browsers (Chrome, Edge, Safari, Firefox, Opera).
- Fully responsive across mobile screens (320px+), tablets, and high-resolution displays.
