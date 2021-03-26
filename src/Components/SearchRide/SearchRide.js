import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import map from '../../images/Map.png';
import FakeData from '../../FakeData/FakeData.json';
import peopleIcon from '../../images/peopleicon.png'
const SearchRide = () => {
    const { rideKey } = useParams();
    const [ride, setRide] = useState([]);
    const ridersData = FakeData;
    useEffect(() => {
        const searchedRide = (ridersData.filter(ride => { return ride.id === parseInt(rideKey) }));
        setRide(searchedRide[0]);
    }, [rideKey, ridersData])

    const { name, image, sit, cost } = ride;
    const handleSearch = () => {
        document.getElementById("searchForm").style.display = "none";
        document.getElementById("resultForm").style.display = "block";

    }
    const [destination, setDestination] = useState({
        from:"",
        to:""
    })
    const handleBlur = (e) => {
        if (e.target.name === "pickFrom") {
            const data = { ...destination };
            data.from = e.target.value;
            setDestination(data);
        }
        if (e.target.name === "pickTo") {
            const data = { ...destination };
            data.to = e.target.value;
            setDestination(data);
        }
    }
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4 col-sm-12">
                    <form id="searchForm" style={{ backgroundColor: "whitesmoke", borderRadius: "10px", padding: "20px" }}>
                        <label htmlFor="">Pick From</label> <br />
                        <input onBlur={handleBlur} className="w-100" type="text" name="pickFrom" id="pickFrom" /><br /><br />
                        <label htmlFor="">Pick To</label> <br />
                        <input onBlur={handleBlur} className="w-100" type="text" name="pickTo" id="pickTo" /> <br /><br />
                        <p onClick={handleSearch} style={{ width: "100%", fontSize: "25px", height: "40px", borderRadius: "5px", backgroundColor: "tomato", color: "white", textAlign: "center", cursor: "pointer" }}>
                            Search
                    </p>
                    </form>
                    <form id="resultForm" style={{ backgroundColor: "whitesmoke", borderRadius: "10px", padding: "20px", display: "none" }}>
                        <div style={{ backgroundColor: 'tomato', margin: '5px', color: 'white', padding: '10px', borderRadius: '10px' }}>
                            <h2>{destination.from}</h2>
                            <h2>{destination.to}</h2>
                        </div>
                        <div style={{ backgroundColor: "white", display: "flex", justifyItems: "center", justifyContent: "space-between", margin: '10px', padding: '10px', borderRadius: '10px' }}>
                            <img style={{ width: '50px' }} src={image} alt="" />
                            <h4>{name}</h4>
                            <h3><img style={{ width: '25px' }} src={peopleIcon} alt="" /> {sit}</h3>
                            <h3>${cost}</h3>
                        </div>
                        <div style={{ backgroundColor: "white", display: "flex", justifyItems: "center", justifyContent: "space-between", margin: '10px', padding: '10px', borderRadius: '10px' }}>
                            <img style={{ width: '50px' }} src={image} alt="" />
                            <h4>{name}</h4>
                            <h3><img style={{ width: '25px' }} src={peopleIcon} alt="" /> {sit}</h3>
                            <h3>${cost}</h3>
                        </div>
                        <div style={{ backgroundColor: "white", display: "flex", justifyItems: "center", justifyContent: "space-between", margin: '10px', padding: '10px', borderRadius: '10px' }}>
                            <img style={{ width: '50px' }} src={image} alt="" />
                            <h4>{name}</h4>
                            <h3><img style={{ width: '25px' }} src={peopleIcon} alt="" /> {sit}</h3>
                            <h3>${cost}</h3>
                        </div>
                    </form>
                </div>
                <div className="col-md-8 col-sm-12">
                    <img style={{ width: "100%" }} src={map} alt="" />
                </div>
            </div>
        </div>
    );
};

export default SearchRide;