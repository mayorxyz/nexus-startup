# nexus-startup

Premium Dark Mode Landing Page — A modern, interactive landing page built with React and modern web technologies.

## 📋 Project Overview

Nexus Startup is a sophisticated landing page designed with a premium dark mode aesthetic. It combines sleek UI design with interactive elements and smooth animations to create an engaging user experience.

**Live Demo:** [https://nexus-startup-pi.vercel.app](https://nexus-startup-pi.vercel.app)

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/mayorxyz/nexus-startup.git
cd nexus-startup

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Type Checking

```bash
npm run typecheck
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **React 18.2** | UI component framework |
| **TypeScript 5.7** | Type safety and development experience |
| **Vite 6.3** | Lightning-fast build tool and dev server |
| **Tailwind CSS 4.1** | Utility-first CSS styling |
| **Framer Motion 11** | Smooth animations and transitions |
| **React Router 6.8** | Client-side routing |
| **Supabase 2.98** | Backend & authentication |
| **Recharts 2.10** | Data visualization & charts |
| **dnd-kit** | Drag-and-drop functionality |
| **Lucide React** | Icon library |
| **Lenis 1.3** | Smooth scrolling |
| **Canvas Confetti** | Celebratory animations |

---

## 📁 Project Structure

```
nexus-startup/
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/          # Page components
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── public/             # Static assets
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── vite.config.ts      # Vite build configuration
└── README.md           # This file
```

---

## ✨ Key Features

- **Dark Mode Design** — Premium, eye-friendly dark aesthetic
- **Interactive Animations** — Smooth transitions powered by Framer Motion
- **Responsive Design** — Mobile-first approach with Tailwind CSS
- **Smooth Scrolling** — Enhanced UX with Lenis scrolling
- **Drag & Drop** — Interactive UI elements with dnd-kit
- **Data Visualization** — Charts and graphs with Recharts
- **Type Safety** — Full TypeScript support
- **Fast Development** — Vite for instant HMR (Hot Module Replacement)
- **Backend Integration** — Supabase for auth and data management

---

## 📦 Available Scripts

```bash
npm run dev        # Start development server with hot reload
npm run build      # Build for production
npm run typecheck  # Run TypeScript type checking
```

---

## 🔌 Key Dependencies Explained

### Framer Motion
Handles all animations and transitions. Used for entrance effects, hover states, and interactive elements.

### dnd-kit
Provides drag-and-drop functionality for interactive components. Includes core, sortable, and utilities packages.

### Supabase
Backend-as-a-Service for:
- User authentication
- Database operations
- Real-time data sync (if needed)

### Recharts
Renders interactive charts and data visualizations in a React-friendly way.

### Tailwind CSS + Vite Plugin
Utility-first CSS framework with Vite integration for optimized builds.

---

## 🌐 Deployment

This project is configured for deployment on **Vercel**:

```bash
# Build generates a .vercel directory
npm run build

# Deploy with Vercel CLI
vercel deploy
```

Or connect your GitHub repository to Vercel for automatic deployments.

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

---

## 📝 Development Tips

- **Hot Module Replacement:** Changes to files are instantly reflected in the browser
- **Component Reusability:** Keep components modular and composable
- **TypeScript:** Leverage type safety for better development experience
- **Tailwind Utilities:** Use Tailwind classes for consistent styling
- **Git Workflow:** Use feature branches and pull requests for changes

---

## 🎯 Next Steps

1. Customize branding and colors in `tailwind.config.js`
2. Add your pages in the `src/pages/` directory
3. Create reusable components in `src/components/`
4. Connect Supabase for backend functionality
5. Deploy to Vercel or your preferred hosting

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👤 Author

**mayorxyz** — [GitHub Profile](https://github.com/mayorxyz)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Last Updated:** September 7, 2026
