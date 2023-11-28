import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Index } from "./pages/index";
import { Login } from "./pages/login";
import { Profile } from "./pages/profile";
import logo from "./components/img/argentBankLogo.png";

import { useSelector } from "react-redux";
import session from "redux-persist/lib/storage/session";

function Session() {
  const token = useSelector((state) => state.user.token);
  localStorage.removeItem(token);
}

const Layout = ({ children }) => {
  const token = useSelector((state) => state.user.token);

  const isLogginIn = !!token;

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
                Tony
              </a>
              <a
                class="main-nav-item"
                href="/"
                onClick={localStorage.removeItem(token)}
              >
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
