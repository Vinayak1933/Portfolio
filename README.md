# Portfolio by Vinayak

A futuristic, interactive personal portfolio website designed and engineered for **Vinayak**, a first-year Computer Science & Artificial Intelligence student at Rishihood University.

The website delivers a dark, immersive digital workspace aesthetic inspired by award-winning creative development portfolios, featuring an interactive Three.js 3D geometric centerpiece, smooth scroll reveal animations, and accessible semantic components.

---

## 🚀 Live Preview & Running Locally

The portfolio is built with pure, framework-free web standards (**HTML5**, **CSS3**, and **Vanilla JavaScript**). It requires no build steps, node modules, or bundlers.

### Option 1: VS Code Live Server (Recommended)
1. Open the `portfolio` folder in **Visual Studio Code**.
2. If not already installed, install the **Live Server** extension by Ritwick Dey from the VS Code Extensions Marketplace (`Ctrl+Shift+X` or `Cmd+Shift+X`).
3. Right-click on `index.html` in the file explorer and select **"Open with Live Server"**.
4. The website will automatically launch at `http://127.0.0.1:5500`.

### Option 2: Python Local HTTP Server
If you have Python installed, you can start a local server instantly from your terminal:
```bash
cd /Users/vinayak/Documents/portfolio
python3 -m http.server 8000
```
Then open [http://localhost:8000](http://localhost:8000) in any web browser.

### Option 3: Direct File Opening
You can double-click `index.html` to open it in your browser. (Note: Running via a local server as in Option 1 or 2 is recommended so the browser can load `resume.pdf` verification checks without CORS file protocol restrictions).

---

## 📁 File Structure

```
portfolio/
├── index.html                 # Semantic HTML5 markup, SEO meta tags, OpenGraph
├── style.css                  # Custom CSS3 styling, design tokens, animations, responsive layout
├── script.js                  # Vanilla JS logic, CONFIG object, Three.js scene, form handler
├── favicon.svg                # Custom geometric 'V' SVG favicon
├── README.md                  # Project documentation & setup instructions
├── assets/
│   ├── icons/                 # Crisp vector icons (Python, AI, Brain, Athletics, Socials, etc.)
│   │   ├── ai.svg
│   │   ├── athletics.svg
│   │   ├── brain.svg
│   │   ├── experimentation.svg
│   │   ├── github.svg
│   │   ├── hackathon.svg
│   │   ├── iit.svg
│   │   ├── instagram.svg
│   │   ├── linkedin.svg
│   │   ├── mail.svg
│   │   ├── medical-ai.svg
│   │   ├── problem-solving.svg
│   │   ├── python.svg
│   │   ├── university.svg
│   │   └── wellness.svg
│   └── images/                # High-fidelity abstract vector illustrations
│       ├── clinical-system.svg # Architecture schematic for featured project
│       └── neural-abstract.svg # Abstract cognitive thinking & curiosity graphic
└── resume.pdf                 # (Optional) Drop your resume PDF here to activate instant download
```

---

## ⚙️ Customization & Updating Details

All personal links, contacts, and document settings are consolidated in the `CONFIG` object at the top of [`script.js`](file:///Users/vinayak/Documents/portfolio/script.js#L20-L46):

```javascript
const CONFIG = {
  profile: {
    name: 'Vinayak',
    title: 'Computer Science & AI Student',
    university: 'Rishihood University',
    location: 'Sonipat, Haryana, India'
  },
  contact: {
    instagram: 'https://www.instagram.com/vinayak_k31/',
    email: '',          // Add your email (e.g. 'vinayak@example.com')
    github: '',         // Add your GitHub profile URL to activate the button
    linkedin: '',       // Add your LinkedIn profile URL to activate the button
    formEndpoint: ''    // Optional endpoint (e.g. Formspree / EmailJS)
  },
  resume: {
    filePath: 'resume.pdf'
  }
};
```

### Adding Your Resume
- Place your PDF file named `resume.pdf` into the root `portfolio/` directory.
- The website automatically checks for the existence of `resume.pdf`. When present, clicking the "Resume" button in the navigation or footer immediately opens/downloads your document.
- If `resume.pdf` is not yet uploaded, clicking the button presents a polished informational modal offering direct contact via Instagram.

### Adding GitHub & LinkedIn
- Simply paste your GitHub or LinkedIn URLs into `CONFIG.contact.github` and `CONFIG.contact.linkedin` in `script.js`.
- The channels will automatically appear in the Contact section with verified icons.

---

## 🎨 Design & Technical Highlights

1. **Restrained Futuristic Aesthetic**: Deep midnight tones (`#07090e`, `#0d111b`, `#121726`) accented with electric cyan (`#38bdf8`), muted violet (`#818cf8`), and teal (`#2dd4bf`).
2. **Interactive 3D Visual Centerpiece**:
   - Built with **Three.js** inside the hero visual viewport.
   - Features a multi-faceted icosahedron nucleus with glowing wireframe lattice, dual orbital torus rings, and an orbiting stardust particle constellation that gently tilts in response to cursor movement.
   - **Performance Optimized**: Uses `IntersectionObserver` to pause rendering when scrolled out of view; caps `devicePixelRatio` at 2; checks `prefers-reduced-motion`.
   - **Resilient Fallback**: Includes a pure CSS/SVG kinetic orbit animation that displays smoothly if WebGL is disabled or Three.js fails to load.
3. **Truthful & Authentic Content**:
   - Accurately highlights two months of software development experience at **IIT Mandi**.
   - Accurately highlights participation in **two hackathons**.
   - Reflects campus engagement with **Sannidhyam** (mental wellness club).
   - Features the **Clinical Appointment Assessment System** with an abstract architecture diagram rather than fabricated screenshots.
   - Distinctly presents personal strengths (Creative Thinking, Problem-Solving, Learning & Experimentation) and athletic discipline without arbitrary progress bars.
4. **Accessible & Responsive**:
   - Semantic HTML5 structure with ARIA landmark attributes, skip link, and keyboard focus states.
   - Fluid typography using `clamp()` and responsive layouts supporting desktop, laptop, tablet, and mobile screens down to 320px.
   - Reduced-motion media query support (`prefers-reduced-motion: reduce`).

---

## 📄 License
Created for Vinayak's personal portfolio. Free to customize and adapt.

