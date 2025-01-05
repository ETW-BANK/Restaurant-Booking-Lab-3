import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";


const Home = () => {
    const navigate = useNavigate();

    const handleBookingClick = () => {
        navigate("/booking");

     const [userInfo,SetUserInfo]=useState([])

     useEffect(()=>{

        const user=localStorage.getItem("user")
        fetch("https://localhost:7090/api/Account/home/"+user,{
            method:"GET",
            credentials:"include"
        }).then(response=>response.json()).then(data=>{
            SetUserInfo(data.UserInfo)
            console.log("User Info",data.UserInfo)
        }).catch(error=>{

            console.log("Error Home Page",error)
        })
     },[])
    };

    return (
      
       
        <div className="home-container">
            <div className="home-banner-container">
               
                <div className="home-text-section">

                    <h1 className="primary-heading">
                        Welcom to<br/> <span>Green Restaurant</span>
                        
                    </h1>
                    <button className="secondary-button" onClick={handleBookingClick}>
                        Book Yur Table Now <FiArrowRight />
                    </button>
                </div>
              
            </div>
        </div>
       
    );
};

export default Home;
