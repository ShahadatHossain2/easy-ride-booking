import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import SearchRide from './Components/SearchRide/SearchRide';
export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser , setLoggedInUser]}>
    <div className="App">
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/home">         
               <Home></Home>
          </Route>
          <Route path="/login">         
               <Login></Login>
          </Route>
          <PrivateRoute path="/ride/:rideKey">
            <SearchRide></SearchRide>
          </PrivateRoute>
          <Route exact path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </div>
    </userContext.Provider>
  );
}

export default App;
