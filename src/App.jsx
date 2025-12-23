import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Breathing from './pages/Breathing';
import Meditation from './pages/Meditation';
import Affirmations from './pages/Affirmations';
import Sounds from './pages/Sounds';
import Grounding from './pages/Grounding';
import Resources from './pages/Resources';

function App() {
  return (
    <AppProvider>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/breathing" element={<Breathing />} />
          <Route path="/meditation" element={<Meditation />} />
          <Route path="/affirmations" element={<Affirmations />} />
          <Route path="/sounds" element={<Sounds />} />
          <Route path="/grounding" element={<Grounding />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;