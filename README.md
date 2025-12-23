# 🧘 MindfulMoment - Mental Health & Relaxation App

A professional, feature-rich web application designed to support mental health and wellbeing through various relaxation techniques, meditation, and crisis resources.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## ✨ Features

### 🌓 **Theme Support**
- Light and Dark mode toggle
- Smooth theme transitions
- Persistent theme preference

### 🌍 **Multi-Language Support**
- English
- French (Français)
- Kinyarwanda
- Easy to add more languages

### 🧘‍♀️ **Core Functionality**

#### 1. **Home Page**
- Mood check-in with emoji selection
- Personalized recommendations based on mood
- Direct links to suggested resources

#### 2. **Breathing Exercises**
- Multiple breathing techniques (Box Breathing, 4-7-8, Energizing)
- Visual breathing guide with animated circle
- Adjustable duration and patterns

#### 3. **Guided Meditation**
- 4 timed sessions (5, 10, 15, 20 minutes)
- **Voice guidance** during meditation (Text-to-Speech)
- **Background instrumental music** for longer sessions
- **Completion alarm** with sound notification
- Progress visualization with circular timer
- Pause/Resume functionality

#### 4. **Daily Affirmations**
- 40+ positive affirmations across 4 categories
- Auto-play mode
- Random affirmation generator
- Category-based filtering

#### 5. **Calming Sounds**
- 12 ambient sound options
- Volume control
- Loop functionality
- Visual playback indicator

#### 6. **Grounding Techniques**
- 3 interactive exercises
- Step-by-step guidance
- Progress tracking
- Completion feedback

#### 7. **Crisis Resources**
- 24/7 helpline numbers
- International resources
- Warning signs information
- Support group links

## 🚀 Getting Started

### Prerequisites

```bash
Node.js >= 16.x
npm or yarn
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/mindful-moment.git
cd mindful-moment
```

2. **Install dependencies**
```bash
npm install
```

3. **Install required packages**
```bash
npm install react-router-dom lucide-react
```

4. **Configure Tailwind CSS**

Create `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Create `postcss.config.js`:
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

5. **Add audio files** (Required for full functionality)

Create the following directory structure and add your audio files:

```
public/
└── audio/
    ├── sounds/
    │   ├── rain.mp3
    │   ├── ocean.mp3
    │   ├── wind.mp3
    │   ├── night.mp3
    │   ├── fire.mp3
    │   ├── stream.mp3
    │   ├── meditation.mp3
    │   ├── birds.mp3
    │   ├── forest.mp3
    │   ├── cafe.mp3
    │   ├── thunder.mp3
    │   └── whitenoise.mp3
    ├── meditation-background.mp3
    ├── meditation-complete.mp3
    ├── quick-calm.mp3
    ├── deep-peace.mp3
    ├── full-restoration.mp3
    └── extended-tranquility.mp3
```

**Where to get audio files:**
- [Freesound.org](https://freesound.org/) - Free sound effects and loops
- [YouTube Audio Library](https://www.youtube.com/audiolibrary) - Royalty-free music
- [Incompetech](https://incompetech.com/) - Royalty-free music
- [Pixabay Sounds](https://pixabay.com/sound-effects/) - Free sound effects

6. **Run development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
mindful-moment/
├── public/
│   ├── audio/              # Audio files directory
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx      # Navigation with theme/language toggle
│   │   ├── Footer.jsx      # Footer component
│   │   └── Card.jsx        # Reusable card component
│   ├── context/
│   │   └── AppContext.jsx  # Global state management
│   ├── pages/
│   │   ├── Home.jsx        # Landing page with mood tracker
│   │   ├── Breathing.jsx   # Breathing exercises
│   │   ├── Meditation.jsx  # Guided meditation with voice
│   │   ├── Affirmations.jsx# Daily affirmations
│   │   ├── Sounds.jsx      # Ambient sounds player
│   │   ├── Grounding.jsx   # Grounding techniques
│   │   └── Resources.jsx   # Crisis resources
│   ├── utils/
│   │   └── translations.js # Multi-language support
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # App entry point
│   └── index.css           # Global styles & theme variables
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Customization

### Adding a New Language

1. Open `src/utils/translations.js`
2. Add a new language object:

```javascript
export const translations = {
  // ... existing languages
  es: {
    home: 'Inicio',
    breathing: 'Respiración',
    // ... add all keys
  }
};
```

3. Update the language selector in `Navbar.jsx`:

```javascript
const languages = [
  // ... existing languages
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];
```

### Changing Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --primary: #6366f1;     /* Change primary color */
  --secondary: #8b5cf6;   /* Change secondary color */
  /* ... other variables */
}
```

### Adding New Sounds

1. Add audio file to `public/audio/sounds/`
2. Update `sounds` array in `src/pages/Sounds.jsx`:

```javascript
const sounds = [
  // ... existing sounds
  {
    id: 'newsound',
    name: 'New Sound',
    icon: IconName,
    color: '#color',
    description: 'Description',
    audioFile: '/audio/sounds/newsound.mp3'
  }
];
```

## 🔧 Build & Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to [netlify.com](https://netlify.com)

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/mindful-moment"
}
```

3. Deploy:
```bash
npm run deploy
```

## 🔒 Privacy & Security

- **No data collection**: All interactions are session-based
- **No cookies**: No tracking or analytics
- **No user accounts**: No registration required
- **No external API calls**: Works completely offline (except for voice synthesis)
- **LocalStorage use**: Only for theme and language preferences

## 🌟 Key Technical Features

### Voice Guidance System
- Uses Web Speech API for text-to-speech
- Multi-language support
- Timed guidance during meditation
- Adjustable speech rate and volume

### Alarm System
- Audio notification on meditation completion
- Browser notification support (with permission)
- Visual completion feedback

### Theme System
- CSS variables for dynamic theming
- Smooth transitions between themes
- Persistent user preference

### Audio Management
- Multiple simultaneous audio tracks
- Volume control system
- Loop functionality
- Graceful error handling

## 📱 Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

**Note**: Voice guidance requires browser support for Web Speech API (works best in Chrome/Edge)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Design inspired by modern mental health apps
- Crisis resources from national mental health organizations

## 📞 Support & Resources

### Crisis Helplines
- **US**: 988 (Suicide & Crisis Lifeline)
- **US**: Text "HELLO" to 741741 (Crisis Text Line)
- **International**: Visit [findahelpline.com](https://findahelpline.com)

### Mental Health Resources
- [NAMI](https://www.nami.org) - National Alliance on Mental Illness
- [Mental Health America](https://www.mhanational.org)
- [SAMHSA](https://www.samhsa.gov) - Substance Abuse and Mental Health Services Administration

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with 💜 for mental health and wellbeing**