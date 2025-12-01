import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Pricing from './pages/Pricing';
import Trade from './pages/Trade'; // <-- import page Trade
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Header />

        <main className="pt-28">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/trade" element={<Trade />} /> {/* <-- route Trade */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
