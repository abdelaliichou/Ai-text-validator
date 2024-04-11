import "./App.css";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import imageSrc from './HeReFanMi.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  // declaration of all our variables

  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");  
  const [reference, setReference] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  // pass request and get response from my local backend server 

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:4000/loopTalk', { data: inputText });
      console.log(response.data.data);
      console.log(response.data.key);  
      setResult(response.data.data);
      setReference(response.data.key);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAPI = async () => {
    if(inputText === ""){
      toast.error("Please enter your prompt !", {
        position: "top-center"
      });
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

  return (
    
    <div className="page-container">

    <img className="logo" src={imageSrc} alt="Image" />
      
      {/*  this is the input section where we in write our information  */}

      <div className="input-section">
        <input
          type="text"
          className="text-input"
          placeholder="How i can help you today ?"
          value={inputText}
          onChange={handleTextChange}
        />

        <select className="drop" id="options" >
          <option value="">Select Model</option>
          <option value="option2">BARD ( PALM )</option>
          <option value="option1">GEMINI</option>
          <option value="option3">GPT4</option>
          <option value="option3">GPT3.5</option>
          <option value="option3">MISTRAL</option>
          
        </select>

        {/*  this is the button to click to check the infomation worth  */}
        
        <button className="analyze-button" onClick={handleAPI}>
          Check Reliability
        </button>
      </div>

      {/*  here is the logic of showing different componenets based on the "result" variable
      which is the response of our API */}

      {result === "trust_worthy" ? (
        <>

          {/* Modal for displaying the green alert message */}
          
          <div className="trust">
            Your infomration is TRUST WORTHY !
          </div>

          <div className="response-section">
            <p className="response-text">Your infomration is TRUST WORTHY</p>
            <p className="response-text">Text from the API</p>
            <p className="response-text">Link to the text from API </p>
          </div>

        </>
      ) : result === "doutable" ? (
        <>

          {/* Modal for displaying the orang alert message */}
          
          <div className="doutable">
            Your infomration is DOUTABLE !
          </div>

          <div className="response-section">
            <p className="response-text">Your infomration is DOUTABLE</p>
            <p className="response-text">Text from the API</p>
            <p className="response-text">Not supported reference </p>
          </div>

        </>
      ) : result === "Please try to ask something related to to medical field... !" ? (
        <>

          {/* Modal for displaying the red alert message */}
          
          <div className="wrong">
            Please try to ask something related to to medical field !
          </div>

        </>
      ) : result === "" ? (
        <>
          {/*  in this case, we havn't enter any info in the input text, so we show just a static text  */}
          <ToastContainer />
        </>
      ) : (
        <>

          {/* Modal for displaying the red alert message */}
          
          <div className="trust">
            Your information is related to medical field !
          </div>

          {/*  We show the result of the variable so we show it, and it's directly trust worthy because we traited it in the back-end */}

          <div className="response-section">
            <p className="response-text">
              {result}
            </p>
            <p className="response-text">
              {/* Text response from the LARGE LANGUAGE MODEL */}
            </p>
            <p className="response-text">
              {/* Link to the reference from the LARGE LANGUAGE MODEL */}
            </p>
          </div>
          
        </>
      )}
    </div>
  );
}

export default App;
