import "./App.css";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logoIMG from './HeReFanMi.png';
import lockIMG from './lock.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  // declaration of all our variables

  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");  
  const [label, setLabel] = useState("");  
  const [source, setSrouce] = useState([]);  
  const [reference, setReference] = useState("");
  const [rating, setRating] = useState("0");
  const [hoverRating, setHoverRating] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const dropDownOptions = [
    { id: 1, label: 'BARD (PALM)', imageUrl: lockIMG },
    { id: 2, label: 'GEMINI', imageUrl: lockIMG },
    { id: 3, label: 'GPT4', imageUrl: lockIMG },
    { id: 4, label: 'GPT3.5', imageUrl: lockIMG },
    { id: 5, label: 'MISTRAL', imageUrl: lockIMG }
  ];
  const handleDropItemClick = (item) => {
    setSelectedItem(item);
    console.log(item.label)
    setIsOpen(false);
  };
  const toggleDropdown = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  // pass request and get response from my local backend server 

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:4000/medicalTalk', { data: inputText });
      console.log(response.data.data);
      console.log(response.data.key);  
      console.log(response.data.label);
      console.log(response.data.source);    

      setResult(response.data.data);
      setLabel(response.data.label);
      setSrouce(response.data.source);
      setReference(response.data.key);

    } catch (error) {
      console.error(error);
    }
  };

  const saveRating = async () => {
    try {
      const datum = {
        rating : rating,
        reference : reference
      }
      const response = await axios.post('http://localhost:4000/save', datum
      );
      console.log(response.data);

      // showing alert message if setting the rating was good 
      if(response.data === "SUCCESS"){
        toast.success("Rating saved !", {
          position: "top-center"
        });
      }
    } catch (error) {
      console.error(error);
    }
};

  const handleAPI = async () => {
    if(inputText === ""){
      toast.error("Please enter your prompt !", {
        position: "top-center"
      });
      setResult("")
      setSrouce([])
      setReference("")
      setLabel("")
      return;
    }
    await fetchData();
  }

  // navigating to the next page 
  const nextPage = () => {
    navigate("/rating/"+reference);
  };

  // a use effect method to change the text after writing
  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  // Handeling rating mouse events 
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
    
    <div className="page-container">

      {/* this is the logo  */}

      <img className="logo" src={logoIMG} alt="Image" />
      
      {/*  this is the input section where we in write our information  */}

      <div className="input-section">
        <input
          type="text"
          className="text-input"
          placeholder="How i can help you today ?"
          value={inputText}
          onChange={handleTextChange}
        />

        <div className="dropdown">
          <div className="dropdown-header" onClick={toggleDropdown}>
            {selectedItem ? selectedItem.label : "Select Model"}
            <span className="caret"></span>
          </div>
          {isOpen && (
            <ul className="dropdown-menu">
              {dropDownOptions.map(option => (
                <li key={option.id} onClick={() => handleDropItemClick(option)}>
                  {selectedItem.label === option.label ? 
                  // means that we selected this option, so we dont show the lock image
                  (
                    <>
                      {/* <img src={option.imageUrl} alt={option.label} /> */}
                      {option.label}
                    </>
                  ): 
                  // means that we havn't select this option, so we show the lock image
                  (
                    <>
                      <img src={option.imageUrl} alt={option.label} />
                      {option.label}
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/*  this is the button to click to check the infomation worth  */}
        
        <button className="analyze-button" onClick={handleAPI}>
          Check Reliability
        </button>
      </div>

      {/*  here is the logic of showing different componenets based on the "result" variable
      which is the response of our API */}

      {label === "trustworthy" ? (
        <>

        <ToastContainer />


        {/* Modal for displaying the green alert message */}

        <div className="trust">
          Your information is trust worthy !
        </div>

        <div className="response-section">
          <p className="response-text">
            {result}
          </p>
          <p className="response-text">
            Reference : <br/> <a>{source}</a>
          </p>
        </div>

        {/* this is the rating place */}

        <div className="rating-page"> 
          <p className="rating-text">
            How much you trust our Model's generated response ?
          </p>
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
          <button className="rating-button" onClick={saveRating}>
                Save opinion
          </button>    
        </div>

        </>
      ) : label === "doubtful" ? (
        <>

        <ToastContainer />


        {/* Modal for yellow the red alert message */}

        <div className="doutable">
          Your information is doutable !
        </div>

        {/*  We show the result of the variable so we show it, and it's directly trust worthy because we traited it in the back-end */}

        <div className="response-section">
          <p className="response-text">
            {result}
          </p>
        </div>

        {/* this is the rating place */}

        <div className="rating-page"> 
          <p className="rating-text">
            How much you trust our Model's generated response ?
          </p>
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
          <button className="rating-button" onClick={saveRating}>
                Save opinion
          </button>    
        </div>

        </>
      ) : label === "fake" ? (
        <>

        <ToastContainer />


        {/* Modal for displaying the red alert message */}

        <div className="wrong">
          Your information is fake !
        </div>

        {/*  We show the result of the variable so we show it, and it's directly trust worthy because we traited it in the back-end */}

        <div className="response-section">
          <p className="response-text">
            {result}
          </p>
          <p className="response-text">
            Link to the reference : {source}
          </p>
        </div>

        {/* this is the rating place */}

        <div className="rating-page"> 
          <p className="rating-text">
            How much you trust our Model's generated response ?
          </p>
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
          <button className="rating-button" onClick={saveRating}>
                Save opinion
          </button>    
        </div>

        </>
      ) : result === "Please try to ask something related to to medical field... !" ? (
        <>

          <ToastContainer />

          {/* Modal for displaying the red alert message */}
          
          <div className="wrong">
            Please try to ask something related to to medical field !
          </div>

        </>
      ) : (
        <>
          {/*  in this case, we havn't enter any info in the input text, so we show just a static text  */} 
          <ToastContainer />
        </>
      )
      }

    </div>
  );
}

export default App;
