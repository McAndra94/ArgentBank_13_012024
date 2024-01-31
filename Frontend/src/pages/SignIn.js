import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/authSlice";
import { login, fetchUserProfile } from "../apiServices";

function SignIn() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSignIn = async () => {
		console.log("Sign In clicked");

		try {
			const response = await login(username, password);
			console.log("Full response: ", response);
			console.log("Response data:", response.data);
			const authToken = response.data.body?.token;

			if (authToken && authToken.split(".").length === 3) {
				localStorage.setItem("authToken", authToken); // Store token

				const userResponse = await fetchUserProfile(authToken);
				const userProfile = userResponse.body;

				dispatch(signIn({ token: authToken, user: userProfile }));
				navigate("/profile");
			} else {
				console.error("Token format is incorrect or token is missing.");
			}
		} catch (error) {
			console.error("Login error", error);
		}
	};

	return (
		<main className="main bg-dark">
			<section className="sign-in-content">
				<i className="fa fa-user-circle sign-in-icon"></i>
				<h1>Sign In</h1>
				<form>
					<div className="input-wrapper">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="input-wrapper">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							autoComplete="current-password"
						/>
					</div>
					<div className="input-remember">
						<input type="checkbox" id="remember-me" />
						<label htmlFor="remember-me">Remember me</label>
					</div>

					<button
						type="button"
						onClick={handleSignIn}
						className="sign-in-button">
						Sign In
					</button>
				</form>
			</section>
		</main>
	);
}

export default SignIn;
