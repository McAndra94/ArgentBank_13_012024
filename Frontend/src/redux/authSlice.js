import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	isAuthenticated: false,
	token: null,
	user: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		signIn: (state, action) => {
			state.isAuthenticated = true;
			state.token = action.payload.token;
			state.user = action.payload.user;
		},
		signOut: (state) => {
			state.isAuthenticated = false;
			state.token = null;
			state.user = null;
		},
		setUser: (state, action) => {
			state.user = action.payload;
			console.log("Updated state:", state.user);
		},
	},
});

export const { signIn, signOut, setUser } = authSlice.actions;

export default authSlice.reducer;

// Custom action
export const loginFailedAction = (errorMessage) => ({
	type: "LOGIN_FAILED",
	payload: errorMessage,
});

// Thunk actions for async (login & updateUserProfile)
export const login = (userData) => async (dispatch) => {
	try {
		const response = await axios.post("/api/v1/user/login", userData);
		const { token, user } = response.data;

		dispatch(signIn({ token, user }));
		localStorage.setItem("authToken", token);
	} catch (error) {
		console.error("Login failed:", error);
		dispatch(loginFailedAction(error.message));
	}
};

export const updateUserProfile =
	(updatedProfile) => async (dispatch, getState) => {
		try {
			const token = localStorage.getItem("authToken");
			const response = await axios.put(
				"http://localhost:3001/api/v1/user/profile",
				updatedProfile,
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			console.log("API Response:", response.data.body);
			dispatch(setUser(response.data.body));
			console.log("Dispatching setUser with:", response.data.body);
		} catch (error) {
			console.error("Error updating user profile:", error);
		}
	};
