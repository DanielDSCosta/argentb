import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../services/users";

//TEST
export default function UserHeader() {
  const dispatch = useDispatch();

  const { firstName } = useSelector((state) => state.userProfile);
  const { lastName } = useSelector((state) => state.userProfile);
  const { token } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.userLogin);

  const [newFirstname, setNewFirstname] = useState();
  const [newLastname, setNewLastname] = useState();

  const [editButton, setEditButton] = useState("");

  const editNameButton = (e) => {
    e.preventDefault();
    setEditButton((current) => !current);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile(token, newFirstname, newLastname));
    if ({ success }) {
      setEditButton((current) => !current);
    }
  };

  return (
    <>
      {!editButton ? (
        <div className="header">
          <h1>
            Welcome back
            <br />
            {firstName + " " + lastName} !
          </h1>
          <button onClick={editNameButton} className="edit-button">
            Edit Name
          </button>
        </div>
      ) : (
        <div className="header">
          <h1>Welcome back</h1>
          <form className="editNameContent" onSubmit={submitHandler}>
            <div className="editNameInputs">
              <input
                type="text"
                placeholder={firstName}
                onChange={(e) => setNewFirstname(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder={lastName}
                onChange={(e) => setNewLastname(e.target.value)}
                required
              />
            </div>
            <div className="editNameButtons">
              <button className="save-button" type="submit">
                Save
              </button>
              <button className="cancel-button" onClick={editNameButton}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

const ACCOUNTS = [
  {
    title: "Argent Bank Checking (x8349)",
    amount: "$2,082.79",
    description: "Available Balance",
  },
  {
    title: "Argent Bank Savings (x6712)",
    amount: "$10,928.42",
    description: "Available Balance",
  },
  {
    title: "Argent Bank Credit Card (x8349)",
    amount: "$184.30",
    description: "Available Balance",
  },
];

export const ProfileHeader = () => (
  <header className="header">
    <h1>
      Welcome back
      <br />
      Tony Jarvis!
    </h1>
    <button className="edit-button" type="Click" onClick={EditUser}>
      Edit Name
    </button>
  </header>
);

export const EditUser = () => (
  <header class="header">
    <h1>Welcome back</h1>
    <form class="editNameContent">
      <div class="editNameInputs">
        <input type="text" placeholder="Tony" required="" />
        <input type="text" placeholder="Stark" required="" />
      </div>
      <div class="editNameButtons">
        <button class="save-button" type="submit">
          Save
        </button>
        <button class="cancel-button" onClick={Profile}>
          Cancel
        </button>
      </div>
    </form>
  </header>
);

export const Account = ({ title, amount, description }) => {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
};

export const Accounts = () => {
  return (
    <>
      <h2 className="sr-only">Accounts</h2>
      {ACCOUNTS.map((account) => (
        <Account key={account.title} {...account} />
      ))}
    </>
  );
};

export const Profile = () => {
  return (
    <>
      <main class="main bg-dark bg-padding">
        <ProfileHeader />
        <Accounts />
      </main>
    </>
  );
};
