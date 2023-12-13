import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, getProfile } from "../services/users";
import { setUsername } from "../stores/user.store";

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

export const ProfileHeader = () => {
  const dispatch = useDispatch();
  const [isEditUsernameFormOpen, setIsEditUsernameOpen] = useState(false);
  const username = useSelector((state) => state.user.username); // Get the username from the Redux store
  const usernameInputRef = useRef();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();

  const token = useSelector((state) => state.user.token);

  const handleEdit = () => {
    flushSync(() => {
      setIsEditUsernameOpen(true);
    });
    usernameInputRef.current.select();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(data.entries());

    try {
      const response = await updateProfile(formValues.username, token);

      dispatch(setUsername(formValues.username)); // Dispatch the setUsername action
      setIsEditUsernameOpen(false);
    } catch (e) {
      // handle errors
    }
  };

  useEffect(() => {
    getProfile(token).then((req) => {
      if (!req.body.userName) return null;

      setUsername(req.body.userName);
      setFirstname(req.body.firstName);
      setLastname(req.body.lastName);
    });
  }, []);

  return (
    <header className="header">
      {isEditUsernameFormOpen ? (
        <form
          className="input-wrapper input-changement"
          novalidate
          onSubmit={handleSubmit}
        >
          <h1>Edit user info:</h1>

          <label htmlFor="userName">User name:</label>
          <input
            ref={usernameInputRef}
            name="username"
            placeholder="Enter an username"
            defaultValue={username}
          />
          <label htmlFor="firstName">First name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder={firstname}
            disabled
          />
          <label htmlFor="lastName">Last name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder={lastname}
            disabled
          />
          <br />
          <div className="editbutton">
            <button type="submit" className="edit-button">
              Confirmer
            </button>
            <button className="edit-button" type="Click" onClick={handleEdit}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <h1>
          Welcome back
          <br />
          {firstname} {lastname}
          <br />
          <button className="edit-button" type="Click" onClick={handleEdit}>
            Edit UserName
          </button>
        </h1>
      )}
    </header>
  );
};

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
