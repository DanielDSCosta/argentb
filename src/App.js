import { React, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Index } from "./pages/index";
import { Login } from "./pages/login";
import { Profile } from "./pages/profile";
import logo from "./assets/img/argentBankLogo.webp";
import { logout, setUsername } from "./stores/user.store"; 
import { getProfile } from "./services/users";

import { useSelector, useDispatch } from "react-redux";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username); // Get the username from the Redux store

  const handleSignOut = () => {
    // Dispatch the logout action
    dispatch(logout());
  };

  const token = useSelector((state) => state.user.token);
  const isLogginIn = !!token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await getProfile(token);
        if (req.body.userName) {
          dispatch(setUsername(req.body.userName)); // Dispatch the updateUsername action
        }
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération du profil :",
          error
        );
      }
    };

    // Assurez-vous que 'token' a une valeur avant d'appeler fetchData
    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <>
      <header>
        <nav class="main-nav">
          <a class="main-nav-logo" href="./">
            <img
              class="main-nav-logo-image"
              src={logo}
              alt="Argent Bank Logo"
            />
            <h1 class="sr-only">Argent Bank</h1>
          </a>
          {isLogginIn ? (
            <div>
              <a class="main-nav-item" href="/user">
                <i class="fa fa-user-circle"></i>
                {username}
              </a>
              <a class="main-nav-item" href="/" onClick={handleSignOut}>
                <i class="fa fa-sign-out"></i>
                Sign Out
              </a>
            </div>
          ) : (
            <div>
              <a class="main-nav-item" href="/sign-in">
                <i class="fa fa-user-circle"></i>
                Sign In
              </a>
            </div>
          )}
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p class="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
};

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/user" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
