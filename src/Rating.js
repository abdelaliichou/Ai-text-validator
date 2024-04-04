import "./Rating.css";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import imageSrc from './X.png';


const RatingPage = () => {

  const [rating, setRating] = useState("0");
  const [hoverRating, setHoverRating] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  // Getting the params
  const {ref} = useParams();  

  // saving the rating in the database 
  const fetchData = async () => {
    try {
      const datum = {
        rating : rating,
        reference : ref
      }
      const response = await axios.post('http://localhost:4000/save', datum
      );
      console.log(response.data);

      // showing alert message if setting the rating was good 
      if(response.data === "SUCCESS"){
        setShowAlert(true);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleAPI = async () => {
    await fetchData();
  }

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleMouseEnter = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  return (
    <div className="rating-page"> 
      <img src={imageSrc} alt="Image" className="backHome" onClick={()=>{ navigate("/") }}/>
      <h1>How much you trust our Model's generated response ?</h1>
      <div className="rating-container">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={value <= (hoverRating || rating) ? "active" : ""}
            onClick={() => handleRatingClick(value)}
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={handleMouseLeave}
          >
            &#9733;
          </span>
        ))}
      </div>
      <p>{rating} stars</p>
      <button className="rating-button2" onClick={handleAPI}>
            Save opinion
      </button>
      {/* Modal for displaying the alert message */}
      {showAlert && (
        <div className="alert">
          <span className="closebtn" onClick={()=> {setShowAlert(false)}}>&times;</span>
          Your rating has been saved successfully!
        </div>
      )}
    </div>
  );
};

export default RatingPage;