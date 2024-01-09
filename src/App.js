// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from './Firebase/firebase.config';
import './App.css'
import { Avatar, Drawer, List, ListItem, ListItemText } from '@mui/material';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (result) => {
      if (result) {

        const { displayName, email, photoURL } = result
        setUserData({ displayName, email, photoURL })


        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }

    })

    return () => unsubscribe();
  }, [])


  const SignUpUsingGoogle = () => {

    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {

        const { displayName, email } = result.user;
        setUserData({ displayName, email })

        setIsLoggedIn(true)
        console.log(userData)
      }).catch((error) => {

        console.log({ error });

      });
  }

  const Logout = () => {
    signOut(auth).then(() => {
      setUserData({})
      setIsLoggedIn(false)
    }).catch((error) => {
      console.log({ error });
    });
  }
  return (
    <div className="App">

      {!isLoggedIn &&
        <button onClick={SignUpUsingGoogle} type="button" className="login-with-google-btn" >
          Sign in with Google
        </button>
      }

      {isLoggedIn &&
        <Router>
          <div className="App" style={{ display: 'flex' }}>


            <Drawer variant="permanent" anchor="left">
              <List>
                <ListItem button component={Link} to="/dashboard">
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button component={Link} to="/settings">
                  <ListItemText primary="Settings" />
                </ListItem>
              </List>
              <Avatar
                alt="Remy Sharp"
                src={userData.photoURL}
                sx={{ width: 56, height: 56, marginTop: 'auto', marginLeft:'auto',marginRight:'auto' }}
              />
              <button style={{marginBottom:'20px', marginTop:'20px'}} className="profile-card__button button--orange" onClick={Logout}>Log out</button>
            </Drawer>


            <div style={{ marginLeft: '240px', padding: '20px', flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Navigate replace to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />

              </Routes>
            </div>
          </div>
        </Router>
      }



    </div>
  );
}

export default App;
