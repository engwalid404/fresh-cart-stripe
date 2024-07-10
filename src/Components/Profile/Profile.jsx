import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import welcome from '../../assets/images/welcome.jpg'
import { Link } from "react-router-dom";
import './profile.css';

const Profile = () => {
  const [name, setName] = useState(null);

  if (name === null) {
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <BallTriangle
        height={100}
        width={100} 
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        visible={true}
      />
    </div>;
  }
  useEffect(() => {
    const x = jwtDecode(localStorage.getItem("token"));
    // console.log("token data", x);
    setName(x.name);
  }, []);

  return <div className="container parent">
     <img src={welcome} alt="profile image" />
     <div className="profile">
      <h1>Welcome</h1>
    <h5><i className="fa fa-solid fa-star"></i> {name} <i className="fa fa-solid fa-star"></i></h5>
    <p>you can browse any product here</p>
    <Link style={{color:"white"}} to='/products'>Discover Products</Link>
    </div>
  </div>;
};

export default Profile; 
