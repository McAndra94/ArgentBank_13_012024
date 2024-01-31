import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import User from "./pages/User";
import NotFound from "./pages/NotFound";

const AppRoutes = () => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/home" element={<Home />} />
			<Route path="/login" element={<SignIn />} />
			<Route
				path="/profile"
				element={isAuthenticated ? <User /> : <Navigate to="/login" />}
			/>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default AppRoutes;
