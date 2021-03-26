import { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router";
import { userContext } from "../../App";
import fbIcon from '../../images/fbicon.png';
import googleIcon from '../../images/googleIcon.png'
import './Login.css'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./Firebase.config";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const Login = () => {
  const [newUser, setNewUser] = useState(false)
  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    photo: '',
    email: ''

  })
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(result => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: '',
          error: '',
          success: false
        }

        setUser(signedOutUser);
      })
      .catch(err => {
        console.log(err.message);
      })
  }
  const handleBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === "email") {
      const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
      isFormValid = isEmailValid;
    }
    if (e.target.name === "password") {
      const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(e.target.value);
      isFormValid = isPasswordValid;
    }
    if (isFormValid) {
      const newUser = { ...user };
      newUser[e.target.name] = e.target.value;
      setUser(newUser);
    }
  }

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUser(user.name);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          const newUserInfo = { ...user };
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          newUserInfo.isSignedIn = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          const newUserInfo = { ...user };
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    e.preventDefault();
  }
console.log(loggedInUser);
  const updateUser = (name) => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    })
      .then(function () {
        console.log("Updated name successfully")
      })
      .catch(function (error) {
        console.log(error)
      });
  }
  const handleFbSignIn = () => {
    firebase.auth().signInWithPopup(fbProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        var errorMessage = error.message;
        
        console.log(errorMessage);
      });
  }
  return (
    <div className="container">

      <div>
        {
          newUser ?
            <form className="submitForm">
              <h4>Create an account</h4>
              <input type="text" name="name" id="" onBlur={handleBlur} placeholder="Name" required />
              <br />
              <br />
              <input type="text" name="email" id="" onBlur={handleBlur} placeholder="Username or email" required />
              <br />
              <br />
              <input type="password" name="password" id="" onBlur={handleBlur} placeholder="Your password" required />
              <br />
              <br />
              <input type="password" name="setPassword" id="" onBlur={handleBlur} placeholder="Confirm password" required />
              <br />
              <br />
              <input className="buttonStyle" type="submit" onClick={handleSubmit} value="Create an account" />
              <br />
              <br />
              <label htmlFor="oldUser">Already have an account? <a style={{ color: 'red' }} onClick={() => setNewUser(!newUser)}>Login</a></label>
              <p style={{ color: 'red' }}>{user.error}</p>
              {
          user.success &&
          <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'login'} Successfully!</p>
        }
            </form>
            :
            <form className="submitForm">
              <h4>Login</h4>
              <input type="text" name="email" id="" onBlur={handleBlur} placeholder="Your email" required />
              <br />
              <br />
              <input type="password" name="password" id="" onBlur={handleBlur} placeholder="Your password" required />
              <br />
              <br />
              <input className="buttonStyle" type="submit" onClick={handleSubmit} value="Login" />
              <br />
              <br />
              <label htmlFor="newUser">Are you new? <a style={{ color: 'red' }} onClick={() => setNewUser(!newUser)}>Create account</a></label>
              <p style={{ color: 'red' }}>{user.error}</p>
            </form>
        }
      </div>
      <div className="otherLogin">
        <br />
        {
          user.isSignedIn ? <button class="loginButton" onClick={handleSignOut}>Sign out</button> : <button class="loginButton" onClick={handleSignIn}><img src={googleIcon} alt="" /> Continue with Google</button>
        }
        <br />
        <br />
        <button class="loginButton" onClick={handleFbSignIn}><img src={fbIcon} alt="" /> Continue with Facebook</button>
      </div>
    </div>
  );
}

export default Login;