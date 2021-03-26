import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    return (
        <div style={{backgroundColor: "deepskyblue"}}>
            <div className="container">
            <div className="d-flex justify-content-md-between align-items-center row">
                <div className="col-md-7 col-sm-12"><h3>Easy Ride Booking</h3></div>
                <div className="col-md-5 col-sm-12 d-flex justify-content-md-between justify-content-sm-around">
                    <Link to="/home"><b style={{color:"black"}}>Home</b></Link>
                    <Link><b style={{color:"black"}}>Destination</b></Link>
                    <Link><b style={{color:"black"}}>Blog</b></Link>
                    <Link><b style={{color:"black"}}>Contact</b></Link>
                    {
                        loggedInUser.isSignedIn ?<b>{loggedInUser.name}</b> : <Link style={{borderRadius:"5px", border: "none", backgroundColor:"tomato", color:"white",width: "50px", textAlign:"center"}} to="/login">Login</Link>
                    }
                </div>
            </div>
            </div>
        </div>
    );
};

export default Header;