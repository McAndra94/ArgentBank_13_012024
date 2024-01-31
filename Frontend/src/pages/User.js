import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../redux/authSlice";
import EditName from "../components/EditName";

function User() {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const user = useSelector((state) => state.auth.user);
	console.log("User in User.js:", user);
	const dispatch = useDispatch();
	const [editing, setEditing] = useState(false);

	const handleEditClick = () => {
		setEditing(true);
	};

	const handleSaveName = (firstName, lastName) => {
		console.log("Saving new name:", firstName, lastName);
		dispatch(updateUserProfile(firstName, lastName));
		setEditing(false);
	};

	const handleCancelEdit = () => {
		setEditing(false);
	};
	return (
		<main className="main bg-dark">
			<div className="header">
				<h1>
					Welcome back
					<br />
					{isAuthenticated ? (
						<>
							{editing ? (
								<EditName
									user={user}
									onSave={handleSaveName}
									onCancel={handleCancelEdit}
								/>
							) : (
								<>
									{`${user.firstName} ${user.lastName}`}
									<div>
										<button className="edit-button" onClick={handleEditClick}>
											Edit Name
										</button>
									</div>
								</>
							)}
						</>
					) : (
						"Guest"
					)}
				</h1>
			</div>
			<h2 className="sr-only">Accounts</h2>
			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Checking (x8349)</h3>
					<p className="account-amount">$2,082.79</p>
					<p className="account-amount-description">Available Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button">View transactions</button>
				</div>
			</section>
			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Savings (x6712)</h3>
					<p className="account-amount">$10,928.42</p>
					<p className="account-amount-description">Available Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button">View transactions</button>
				</div>
			</section>
			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
					<p className="account-amount">$184.30</p>
					<p className="account-amount-description">Current Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button">View transactions</button>
				</div>
			</section>
		</main>
	);
}

export default User;
