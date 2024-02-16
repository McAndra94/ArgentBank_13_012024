import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "../redux/authSlice";
import logo from "../images/argentBankLogo.png";

function NavBar() {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const user = useSelector((state) => state.auth.user);
	console.log("user: ", user);
	const dispatch = useDispatch();
	const handleSignOut = () => {
		localStorage.clear();
		dispatch(signOut());
	};

	return (
		<header>
			<nav className="main-nav">
				<Link to="/" className="main-nav-logo">
					<img
						className="main-nav-logo-image"
						src={logo}
						alt="Argent Bank Logo"
					/>
					<h1 className="sr-only">Argent Bank</h1>
				</Link>
				<div>
					{!isAuthenticated ? (
						<Link to="/login" className="main-nav-item">
							<i className="fa fa-user-circle"></i>
							Sign In
						</Link>
					) : (
						<>
							<Link to="/profile" className="main-nav-item">
								<i className="fa fa-user-circle"></i>
								{user?.firstName || "User"}
							</Link>

							<Link to="/" onClick={handleSignOut} className="main-nav-item">
								<i className="fa fa-sign-out"></i> Sign Out
							</Link>
						</>
					)}
				</div>
			</nav>
		</header>
	);
}

export default NavBar;
