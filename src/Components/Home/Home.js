import React, { useEffect, useState } from 'react';
import FakeData from '../../FakeData/FakeData.json';
import Riders from '../Riders/Riders';
import './Home.css'

const Home = () => {
    const [ride, setRide] = useState([]);
    
    useEffect(()=>{
        setRide(FakeData);
    },[]);
    return (
        <div className = "homeStyle">
            <div className="container p-5">
            <div style={{marginTop:"150px"}} className = "row">
            {
                ride.map(ride => <Riders ride={ride}></Riders>)
            }
            </div>
            </div>
        </div>
    );
};

export default Home;