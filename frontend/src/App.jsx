import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./features/Navbar";
import Home from "./pages/Home";
import Packages from "./components/RecommendedPackages";
import AllPackages from "./pages/AllPackages";
import PackageDetails from "./pages/PackageDetails";
import Services from "./components/Services";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./features/Footer";


function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/all-packages" element={<AllPackages />} />
        <Route path="/packages/:slug" element={<PackageDetails />} />
        <Route path="/services" element={<Services />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
