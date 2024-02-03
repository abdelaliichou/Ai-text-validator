import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");

  // this function is the one who's responsible for getting the response from the API
  const handleSubmit = async () => {
    const response = await fetch("API_MODULE", {
      
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: inputText }),
    });

    const data = await response.json();
    setResult(data);
  };

  // this is just a static function to test the different stats of our responses after clicking the button
  const handleSubmitTest = async () => {
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

        {/*  this is the button to click to check the infomation worth  */}

        <button className="analyze-button" onClick={handleSubmitTest}>
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
      ) : result === "fake" ? (
        <>
          {/*  in this case, we show the red button with the fake info from the API  */}

          <div className="response-section">
            <p className="response-text">Your infomration is FAKE</p>
            <p className="response-text">Link to the text from API</p>
          </div>

          {/*  thos are our buttons, the red is on */}

          <div className="result-section">
            <div className="result-image test"></div>
            <div className="result-image test"></div>
            <div className="result-image bad"></div>
          </div>
        </>
      ) : (
        <>
          {/*  in this case, we havn't enter any info in the input text, so we show just a static text  */}

          <div className="response-section">
            <p className="response-text">
              The opinion of the LARGE LANGUAGE MODEL
            </p>
            <p className="response-text">
              Text response from the LARGE LANGUAGE MODEL
            </p>
            <p className="response-text">
              Link to the reference from the LARGE LANGUAGE MODEL
            </p>
          </div>

          {/* thos are our buttons, they are all gray in gray color because we didn't enter any text to verify*/}

          <div className="result-section">
            <div className="result-image test"></div>
            <div className="result-image test"></div>
            <div className="result-image test"></div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
