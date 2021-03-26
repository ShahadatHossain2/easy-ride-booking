import React from 'react';
import { Link } from 'react-router-dom';
import './Riders.css'

const Riders = (props) => {
    console.log(props.ride)
    const {name, image, id} = props.ride;
    return (
        <div className="col-md-3 col-sm-12">
            <Link to={"/ride/"+id}>
            <div className="riderStyle bg-light rounded">
            <img className="imageStyle" src={image} alt=""/>
            <h4>{name}</h4>
            </div>
            </Link>
        </div>
    );
};

export default Riders;