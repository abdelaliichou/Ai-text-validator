import "./App.css";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import imageSrc from './rating.svg'; // Import your image file


function App() {

  // declaration of all our variables

  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");  

  // pass request and get response from my local backend server 

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:4000/g', { data: inputText });
      console.log(response.data);  
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAPI = async () => {
    await fetchData();
  }

  // this is just a static function to test the different stats of our responses after clicking the button
  const handleTestSubmit = async () => {
    switch (result) {
      case "":
        setResult("trust_worthy");
        break;
      case "trust_worthy":
        setResult("doutable");
        break;
      case "doutable":
        setResult("fake");
        break;
      case "fake":
        setResult("");
        break;
      default:
        setResult("");
    }
  };

  // a use effect method to change the text after writing
  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className="page-container">
      <h1 className="page-heading">Check your health related information...</h1>
      {/*  this is the input section where we in write our information  */}
      <div className="input-section">
        <input
          type="text"
          className="text-input"
          placeholder="Waiting..."
          value={inputText}
          onChange={handleTextChange}
        />

        <select className="drop" id="options" >
           <option value="">Select an AI-Model</option>
           <option value="option2">BARD ( PALM )</option>
           <option value="option1">GEMINI</option>
           <option value="option3">GPT4</option>
           <option value="option3">GPT3.5</option>
           <option value="option3">MISTRAL</option>
           
        </select>

        {/*  this is the button to click to check the infomation worth  */}
        <button className="analyze-button" onClick={handleAPI}>
          Analyze
        </button>
      </div>

      {/*  here is the logic of showing different componenets based on the "result" variable
      which is the response of our API */}

      {result === "trust_worthy" ? (
        <>
          {/*  in this case, we show the green button with the trust worthy info from the API  */}

          <div className="response-section">
            <p className="response-text">Your infomration is TRUST WORTHY</p>
            <p className="response-text">Text from the API</p>
            <p className="response-text">Link to the text from API </p>
          </div>

          {/*  thos are our buttons, the green is on */}

          <div className="result-section">
            <div className="result-image good"></div>
            <div className="result-image test"></div>
            <div className="result-image test"></div>
          </div>
        </>
      ) : result === "doutable" ? (
        <>
          {/*  in this case, we show the yellow button with the doutable info from the API  */}

          <div className="response-section">
            <p className="response-text">Your infomration is DOUTABLE</p>
            <p className="response-text">Text from the API</p>
            <p className="response-text">Not supported reference </p>
          </div>

          {/*  thos are our buttons, the yellow is on */}

          <div className="result-section">
            <div className="result-image test"></div>
            <div className="result-image normal"></div>
            <div className="result-image test"></div>
          </div>
        </>
      ) : result === "Please try to ask something related to to medical field... !" ? (
        <>
          {/*  in this case, we show the red button with the fake info from the API  */}

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
          {/*  thos are our buttons, the red is on */}

          <div className="result-section">
            <div className="result-image test"></div>
            <div className="result-image test"></div>
            <div className="result-image bad"></div>
          </div>
        </>
      ) : result === "" ? (
        <>
          {/*  in this case, we havn't enter any info in the input text, so we show just a static text  */}

          <div className="response-section">
            <p className="response-text">How can i help you today ?</p>
          </div>
          
          <div className="result-section">
            <div className="result-image test"></div>
            <div className="result-image test"></div>
            <div className="result-image test"></div>
          </div>
        </>
      ) : (
        <>
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

          {/*  Rating button  */}

          <button className="rating-button" onClick={handleAPI}>
          Rate this answer trust level
          <img src={imageSrc} alt="Image" />
          </button>

          {/* thos are our buttons, they are all gray in gray color because we didn't enter any text to verify*/}

          <div className="result-section">
            <div className="result-image good"></div>
            <div className="result-image test"></div>
            <div className="result-image test"></div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
