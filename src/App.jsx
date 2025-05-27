import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/general/Home";
import Store from "./pages/store/Store";
import Vote from "./pages/community/Vote";
import NotFound from "./pages/general/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Rules from "./pages/general/Rules";
import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";
import Stafflist from "./pages/community/Stafflist";
import Cookies from "./pages/legal/Cookies";
import MainLayout from "./components/layout/MainLayout";

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <MainLayout>
                            <Home />
                        </MainLayout>
                    }
                />
                <Route
                    path="/store"
                    element={
                        <MainLayout>
                            <Store />
                        </MainLayout>
                    }
                />
                <Route
                    path="/vote"
                    element={
                        <MainLayout>
                            <Vote />
                        </MainLayout>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <MainLayout>
                            <AdminDashboard />
                        </MainLayout>
                    }
                />
                <Route
                    path="/terms"
                    element={
                        <MainLayout>
                            <Terms />
                        </MainLayout>
                    }
                />
                <Route
                    path="/privacy"
                    element={
                        <MainLayout>
                            <Privacy />
                        </MainLayout>
                    }
                />
                <Route
                    path="/staff"
                    element={
                        <MainLayout>
                            <Stafflist />
                        </MainLayout>
                    }
                />
                <Route
                    path="/cookies"
                    element={
                        <MainLayout>
                            <Cookies />
                        </MainLayout>
                    }
                />
                <Route
                    path="/rules"
                    element={
                        <MainLayout>
                            <Rules />
                        </MainLayout>
                    }
                />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
