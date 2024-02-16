import { useState } from "react";
import { updateUserProfileApi } from "../apiServices";
import "../styles/EditName.css";

const EditNameForm = ({ user, onSave, onCancel }) => {
	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);

	const handleSave = () => {
		const token =
			localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
		console.log("token: ", token);
		updateUserProfileApi({ firstName, lastName }, token)
			.then((response) => {
				console.log("Success:", response.data);
				onSave({ firstName, lastName });
				console.log("firstName, lastName:", firstName, lastName);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<div className="editName">
			<div className="inputBox">
				<input
					type="text"
					placeholder={firstName}
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
				<input
					type="text"
					placeholder={lastName}
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
			</div>
			<div className="btnBox">
				<button onClick={handleSave}>Save</button>
				<button onClick={onCancel}>Cancel</button>
			</div>
		</div>
	);
};

export default EditNameForm;
