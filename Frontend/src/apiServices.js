import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api/v1";

const api = axios.create({
	baseURL: API_BASE_URL,
});

export const login = (email, password) =>
	api.post("/user/login", { email, password });

export const fetchUserProfile = (authToken) => {
	return api
		.post(
			"/user/profile",
			{},
			{
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			}
		)
		.then((response) => {
			console.log("User Profile Response:", response.data); // Log for debugging
			return response.data; // Return the entire data object
		});
};

export const updateUserProfile = (userData, token) => {
	return api.put("/user/profile", userData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};
