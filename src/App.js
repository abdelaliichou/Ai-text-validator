import "./App.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged  } from 'firebase/auth';
import { auth } from './firebase';
import axios from 'axios';
import logoutIMG from './icons/logout.svg';
import logoIMG from './icons/HeReFanMi.png';
import lockIMG from './icons/lock.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from './userContext';


function App() {

  // Getting the user from context
  const { user, setUser } = useUser();


  console.log("Home page user => ",user);   // This should log the user object


  
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");  
  const [label, setLabel] = useState("");  
  const [source, setSrouce] = useState([]);  
  const [reference, setReference] = useState("");
  const [rating, setRating] = useState("0");
  const [ratingOpinion, setRatingOpinion] = useState("0");
  const [hoverRating, setHoverRating] = useState(null);
  const [hoverOpinion, setHoverOpinion] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    { id: 4, label: 'GPT3.5', imageUrl: lockIMG }
  );
  const [loading, setLoading] = useState(false);
  const [userScroll, setUserScroll] = useState(false);
  const [life, setLife] = useState(0);
  const [asked, setAsked] = useState(false);
  const navigate = useNavigate();

  const dropDownOptions = [
    { id: 1, label: 'BARD (PALM)', imageUrl: lockIMG },
    { id: 2, label: 'GEMINI', imageUrl: lockIMG },
    { id: 3, label: 'GPT4', imageUrl: lockIMG },
    { id: 4, label: 'GPT3.5', imageUrl: lockIMG },
    { id: 5, label: 'MISTRAL', imageUrl: lockIMG }
  ];

  const handleDropItemClick = (item) => {
    if(item.label === "GPT3.5"){
      setSelectedItem(item);
      console.log(item.label)
      setIsOpen(false);
      return ;
    }
  
    toast.error("This model hasn't been implemented yet !", {
      position: "top-center"
    });

  };
  
  const toggleDropdown = () => setIsOpen(!isOpen);

  // pass request and get response from my local backend server 
  const fetchData = async () => {
    try {
      setLoading(true); // Set loading state to true when starting the request
      const datum = {
        data : inputText,
        opinion : ratingOpinion
      }
      // const response = await axios.post('https://ai-text-validator-backend.onrender.com/medicalTalk', datum ,{
      const response = await axios.post('http://127.0.0.1:4000/medicalTalk', datum ,{
        onUploadProgress: progressEvent => {
          // Handle upload progress if needed
        },
        onDownloadProgress: progressEvent => {
          // Handle download progress if needed
        }
      });
      console.log(response.data.data);
      console.log(response.data.key);  
      console.log(response.data.label);
      console.log(response.data.source);    

      setResult(response.data.data);
      setLabel(response.data.label);
      setSrouce(response.data.source);
      setReference(response.data.key);

      // verifiying user number of essayes 

      console.log(response.data)

      if( response.data.data === "Please try to ask something related to to medical field... !" ){
        setLife(life + 1)
      } else {
        setLife(0)
      }

    } catch (error) {
      console.error(error);
    } finally
    {
      setLoading(false); // Set loading state to false when request is complete, to hide the progress bar
    }
  };

  // saving the user rating
  const saveRating = async () => {

    if(rating === "0"){
      toast.error("Please enter your rating about the model's response !", {
        position: "top-center"
      });
      return;
    }

    try {
      const datum = {
        rating : rating,
        reference : reference
      }
      // const response = await axios.post('https://ai-text-validator-backend.onrender.com/save', datum );
      const response = await axios.post('http://127.0.0.1:4000/save', datum );
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

  // saving the user opinion
  const handleOPINION = () => {

    if(asked === true) return;

    if(inputText === ""){
      toast.error("Please enter your prompt !", {
        position: "top-center"
      });
      return;
    }

    if(ratingOpinion === "0"){
      toast.error("Please enter your opinion rating about your prompt !", {
        position: "top-center"
      });
      return;
    }

    // showing alert message if opinion was not entered 
    toast.success("Opinion and prompt saved !", {
      position: "top-center"
    });

    // going top next page by seeting the variables after 5 seconds
    setTimeout(() => {
      setAsked(true)    
      // setInputText("")
    }, 2000);
  }
  
  // button on click 
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

    console.log("life : ",life)

    if (life === 3) {
      toast.error("You did 3 non medical questions, Please try later !", {
        position: "top-center"
      });
      // setLife(0)
      return;
    }

    await fetchData();
  }

  // a use effect method to change the text after writing
  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  // Handeling rating and opinion mouse events 
  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleOpinionClick = (value) => {
    setRatingOpinion(value);
  };

  const handleMouseEnter = (value) => {
    setHoverRating(value);
  };

  const handleMouseOpinionEnter = (value) => {
    setHoverOpinion(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleMouseOpinionLeave = () => {
    setHoverOpinion(null);
  };

  const handleEnterpress = (e) => {
    if (e.key === 'Enter') {
      // Call your function here
      if( asked === true ){
        handleAPI();
        return ;
      }

      if(ratingOpinion === "0"){
        toast.error("Please enter your opinion rating about your prompt !", {
          position: "top-center"
        });
      }
    }
  };

  // calling the handleOPINION function whenever the opinion changes 
  useEffect(() => {
    if (ratingOpinion !== "0")  {
      setTimeout(() => {

        console.log("opinion : ", ratingOpinion)
        handleOPINION()

      }, 500);  
    }
  }, [ratingOpinion]);

  // calling the saveRating function whenever the rating changes 
  useEffect(() => {
    if (rating !== "0")  {
      console.log("rating : ", rating)
      saveRating()
    }
  }, [rating]);

  // function to know if the user has scrolled all the way down to the bottom of the response
  useEffect(() => {

    const handleScroll = () => {

      const scrolledTo = window.scrollY + window.innerHeight;
      const isReachBottom = document.body.scrollHeight === scrolledTo ;
  
      if (isReachBottom && (userScroll === false)) {
        console.log("you scrolled until the bottom !");
        setUserScroll(true);
      }
    };
  
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
  
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [userScroll]);
 
  // logout
  const logout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        setUser(null);
        navigate("/login");
        console.log("Signed out successfully")
    }).catch((error) => {
    // An error happened.
    });
  }

  // check if the user is null, we logged him out directly
   // function to know if the user has scrolled all the way down to the bottom of the response
   useEffect(() => {
    if (user === null) {
      console.log("User is null so we logged you iut directy !");
      logout();
    }
  }, []);


  return (
 
    <>
     <button className="logout-button" onClick={logout}>
            Logout
            <img src={logoutIMG} alt="Google Logo" className="logout-icon" />
      </button>

      { asked === false ? (

        // means that the user hasn't entered his opinion yet, so we show to him the opinion page

        <div className="page-container">
         
          {/* this is the logo  */}
    
          <img className="logo" src={logoIMG} alt="Image" />

          <p className="header">
            Hello {user?.email}!
          </p>  

          {/*  this is the input section where we in write our information  */}
    
          <div className="input-section">
            <input
              type="text"
              className="text-input"
              placeholder="Write your health information here..."
              onKeyDown={handleEnterpress}
              value={inputText}
              onChange={handleTextChange}
            />
    
          
          {/* this is the rating place */}

          {(inputText !== "") && 
          <div className="opinion-page"> 
            <p className="rating-text">
            How much is the trustworthiness of the prompt you provided ?
            </p>
            <div className="rating-container">
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  className={value <= (hoverOpinion || ratingOpinion) ? "active" : ""}
                  onClick={() => handleOpinionClick(value)}
                  onMouseEnter={() => handleMouseOpinionEnter(value)}
                  onMouseLeave={handleMouseOpinionLeave}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </div>}
    
           {/*  this is the drop down section to select the AI model  */}
    
          <div className="dropdown">
            <div className="dropdown-header" onClick={toggleDropdown}>
              {selectedItem ? selectedItem.label : "GPT3.5"}
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

        </div>
    
          <ToastContainer />
    
        </div>

      ) : (
      
        // means that the user has entered his opinion, so we show to him the model page"
        
        <div className="page-container">

        {/* this is the logo  */}
  
        <img className="logo" src={logoIMG} alt="Image" />

        <p className="header">
            Hello {user.email}!
        </p>  
        
        {/*  this is the input section where we in write our information  */}
  
        <div className="input-section">
          <input
            type="text"
            className="text-input"
            placeholder="How i can help you today ?"
            onKeyDown={handleEnterpress}
            value={inputText}
            onChange={handleTextChange}
          />
  
        {/*  this is the drop down section to select the AI model  */}
  
          <div className="dropdown">
            <div className="dropdown-header" onClick={toggleDropdown}>
              {selectedItem ? selectedItem.label : "GPT3.5"}
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
  
        {loading ? ( 
          <div className="loading-indicator"></div> // Display loading indicator if loading state is true
        ) : (
          <></>
        )}
  
        {/* Display result, label, source, reference, etc. */}
  
  
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

      )}
    </> 
  );
}

export default App;
