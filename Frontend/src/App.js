import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
	return (
		<div className="App">
			<Router>
				<NavBar />
				<AppRoutes />
				<Footer />
			</Router>
		</div>
	);
}

export default App;
