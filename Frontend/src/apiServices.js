// API created with baseURL pointing to backend API
import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api/v1";
const api = axios.create({ baseURL: API_BASE_URL });

// Login function with POST request to the ../login endpoint
// Authenticate the user
export const loginApi = (email, password) => {
	return api.post("/user/login", { email, password });
};

// fetchUserProfile function with POST request
// Retrieve the user's profile details
export const fetchUserProfile = async (token) => {
	return api.post(
		"/user/profile",
		{},
		{ headers: { Authorization: `Bearer ${token}` } }
	);
};

// updateUserProfile function with PUT request
// Updates the user's profile details
export const updateUserProfileApi = async (userData, token) => {
	return api.put("/user/profile", userData, {
		headers: { Authorization: `Bearer ${token}` },
	});
};
