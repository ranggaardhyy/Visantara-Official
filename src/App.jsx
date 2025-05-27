import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/general/Home";
import Store from "./pages/store/Store";
import Vote from "./pages/community/Vote";
import NotFound from "./pages/general/NotFound";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Rules from "./pages/general/Rules";
import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";
import Stafflist from "./pages/community/Stafflist";
import Cookies from "./pages/legal/Cookies";

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
                <Route path="/staff" element={<Stafflist />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/rules" element={<Rules />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;