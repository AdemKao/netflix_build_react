import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  console.log(user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      console.log("userAuth", userAuth);
      if (userAuth) {
        //  Logged In
        // console.log(userAuth);
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        //  Logged Out
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, []);

  return (
    <div className="app">
      {/* <Nav /> */}
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route path="/profile" element={<ProfileScreen />} />
            <Route exact path="/" element={<HomeScreen />} />
          </Routes>
        )}
        {/* <HomeScreen /> */}
      </Router>
    </div>
  );
}

export default App;
