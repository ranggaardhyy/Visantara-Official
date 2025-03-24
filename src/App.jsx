import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Vote from "./pages/Vote";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Rules from "./pages/Rules";
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
                <Route path="/store" element={<Store />} />
                <Route path="/vote" element={<Vote />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/members" element={<Members />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/rules" element={<Rules />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;