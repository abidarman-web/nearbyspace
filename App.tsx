import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import ListYourSpace from './pages/ListYourSpace';
import SpaceDetails from './pages/SpaceDetails';
import { ReviewProvider } from './context/ReviewContext';
import { SpaceProvider } from './context/SpaceContext';

const App: React.FC = () => {
  return (
    <Router>
      <ReviewProvider>
        <SpaceProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/space/:id" element={<SpaceDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/list-your-space" element={<ListYourSpace />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Layout>
        </SpaceProvider>
      </ReviewProvider>
    </Router>
  );
};

export default App;