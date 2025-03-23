import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Store from "./pages/Store";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/admin/AdminDashboard";

// ⬇️ Import halaman Terms, Privacy, Members, Cookies
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Members from "./pages/Members";
import Cookies from "./pages/Cookies";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/store" element={<Store />} />
                <Route path="/admin" element={<AdminDashboard />} />

                {/* ⬇️ Route tambahan untuk halaman Terms, Privacy, Members, Cookies */}
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/members" element={<Members />} />
                <Route path="/cookies" element={<Cookies />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;