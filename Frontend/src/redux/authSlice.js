import { createSlice } from "@reduxjs/toolkit";
import { loginApi, updateUserProfileApi } from "../apiServices";

const initialState = {
	isAuthenticated: false,
	token: null,
	user: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		signIn(state, action) {
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

// Actions for async (login & updateUserProfile)
export const login = (userData) => async (dispatch) => {
	try {
		const response = await loginApi(userData.email, userData.password);
		const { token, user } = response.data;

		dispatch(signIn({ token, user }));
		// Token is stored here after a successful login
		localStorage.setItem("authToken", token) ||
			sessionStorage.getItem("authToken");
		console.log("authToken: ", token);
	} catch (error) {
		console.error("Login failed:", error);
		dispatch(loginFailedAction(error.message));
	}
};

export const updateUserProfile = (updatedProfile) => async (dispatch) => {
	try {
		const token =
			localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
		const response = await updateUserProfileApi(updatedProfile, token);
		console.log("updateUserProfileApi response:", response);
		dispatch(setUser(response.data.body));
	} catch (error) {
		console.error("Error updating user profile:", error);
	}
};
