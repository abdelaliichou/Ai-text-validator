import "./Home.css";
import React, { useState, useEffect, useRef } from "react";
import logoIMG from './icons/HomeIMG.svg';
import fackIMG from './icons/fake.png';
import missinformationIMG from './icons/misinformation.png';
import techIMG from './icons/tech.png';
import tech2IMG from './icons/technologie.jpg';
import socialIMG from './icons/social.jpg';
import aiIMG from './icons/ai.png';
import leftIMG from './icons/leftArrow.svg';
import rightIMG from './icons/rightArrow.svg';
import FeatureIMG1 from './icons/security.jpg'
import FeatureIMG2 from './icons/ux.jpg'
import FeatureIMG3 from './icons/medical.jpg'
import NavBar from "./components/Navbar";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {


  const members = [
    { name: 'Aladine Chetouani', job: 'Research investigator', disciption: "Professor Aladine Chetouani from the University of Orleans' Prisme Laboratory, France.", img : missinformationIMG },
    { name: 'Alessandro Bruno', job: 'Head Coordinator', disciption: "The team is under the coordination of Alessandro Bruno, a Tenure-Track Assistant Professor at the IULM University, Milan, Italy.", img : missinformationIMG },
    { name: 'Pier-Luigie Mazzeo', job: 'Research investigator', disciption: "Research Pier-Luigie Mazzeo from CNR (Italian Research Council) ISASI (Institute of Applied Science and Intelligent Systems) in Italy", img : missinformationIMG },
    { name: 'Mohamed Amine KERKOURI', job: 'AI Researcher, Web-Dev, Team Lead', disciption: "Mohamed Amine KERKOURI conducts research on human visual perception and attention modeling using deep learning approaches.", img : missinformationIMG },
    { name: 'Marouane Tliba', job: 'Communication, Team Lead', disciption: "Marouane Tliba conducts research about improving the representational ability of neural networks for 3D content perceptual assessment.", img : missinformationIMG },
    { name: 'Abderrahmene Hamdi', job: 'AI/LLMs Intern', disciption: "CS student (ESI) | Machine Learning | Deep learning", img : missinformationIMG },
    { name: 'Walid Taib', job: 'AI, Data pipline Intern', disciption: "Research intern, Junior Data Scientist, and Final Student at the Higher National School of Telecommunication and ICT", img : missinformationIMG },
    { name: 'Abdelali ichou', job: 'Web dev, UI/UX intern', disciption: "Computer science student at Orleans university | Native mobile developer | Web developer", img : missinformationIMG }
  ];

  const navRef = useRef(null);

  const Memberscroll = (scrollOffset) => {
    navRef.current.scrollLeft += scrollOffset;
  };

  // declaration of all our variables
  const navigate = useNavigate();

  const handleEnterpress = (e) => {
    if (e.key === 'Enter') {

    }
  };

  useEffect(()=>{
    nextPage();
  }, [])

  const nextPage = () => {
  //  navigate(`/home`)
  }
 

  return (

    <div className="page-container3">

      <ToastContainer />

      <NavBar/>

      <div className="welcomHeader">

        <div className="welcomHeader2">

          <p className="welcomText">
            Health-care <br/> Related Fake News <br/> Metigation 
          </p>

          <p className="welcomText2">
            HeReFaNMI, an innovative platform dedicated to the detection and 
            the combat of the false health information spreading in the field
            of public health using a large language model developed by our team. 
            This project is funded by the NGI initiative Search (Next Generation Internet Discovery and Search), 
            which supports the development of trusted open source search and
            discovery tools.
          </p>

          <div className="column">
            
            <button className="register-button" onClick={ ()=> {}}>
                See Features
            </button>

            <button className="signin-button" onClick={ ()=> {}}>
                Pricing 
            </button>

          </div>

        </div>

        <img className="welcomIMG" src={logoIMG} alt="Image" />

      </div>

      <div className="content">

        <div className="margin"/>
        <div className="margin"/>

        <p className="welcomText">
          What we do?
        </p>

        <p className="contentText2">
          Our primary aim is to develop an automated tool that empowers every internet user to discern between information <br/> supported by scientific evidence and that which is not. We strive to enable individuals to distinguish <br/> truth from falsehood, fostering a more informed and accurate understanding of the world.
        </p>

        <div className="margin"/>

        <div className="welcomHeader">

          <div className="card2">

            <img className="card2IMG" src={socialIMG} alt="Image" />

            <div className="card2Discription">

              <p className="Card2Title">
                Social goals
              </p>

              <p className="Card2Text">
                Combat the propagation of fake news within health-related information.
              </p>

              <p className="Card2Text">
                Restore trustworthiness to the internet community.
              </p>
              
              <p className="Card2Text">
              Safeguard individuals against misinformation while promoting the dissemination of accurate health information.
              </p>

            </div>

          </div>

          <div className="space4"/>

          <div className="card2">

            <img className="card2IMG" src={tech2IMG} alt="Image" />

            <div className="card2Discription">

              <p className="Card2Title">
                Technological goals
              </p>

              <p className="Card2Text">
                Develop an autonomous system equipped with continual learning capabilities.
              </p>

              <p className="Card2Text">
                Leverage cutting-edge ML algorithms to provide individuals with an automated and reliable solution.
              </p>

              <p className="Card2Text">
                Harness the power of technology to enhance overall societal well-being and improve public health outcomes.
              </p>

            </div>

          </div>

        </div>

        <div className="welcomHeader">

          <div className="welcomHeader2">

            <p className="contentText">
              Fake News
            </p>

            <p className="welcomText2">
              Combat the propagation of fake news and misinformation within health-related information, ensuring that accurate and reliable data reaches the public. This involves identifying and correcting false claims, promoting verified sources, and educating individuals on how to discern trustworthy health information from misleading or deceptive content. By doing so, we aim to protect public health, enhance the quality of healthcare decisions, and foster a well-informed community.
            </p>

          </div>

          <div className="space2"/>

          <img className="contentIMG" src={fackIMG} alt="Image" />

          <div className="space3"/>

        </div>

        <div className="welcomHeader">

          <div className="space3"/>

          <img className="contentIMG" src={missinformationIMG} alt="Image" />

          <div className="space2"/>

          <div className="welcomHeader2">

            <p className="contentText">
              Misinformation
            </p>

            <p className="welcomText2">
              Ensure the protection of individuals from the spread of misinformation by implementing rigorous measures to verify and correct false claims. At the same time, actively promote the dissemination of accurate and reliable health information to the public, fostering an informed and health-conscious community. By prioritizing both aspects, we aim to create a balanced environment where truth prevails and individuals can make well-informed decisions about their health and well-being.
            </p>

          </div>

        </div>

        <div className="welcomHeader">

          <div className="welcomHeader2">

            <p className="contentText">
              Latest Tech 
            </p>

            <p className="welcomText2">
             Leverage cutting-edge machine learning algorithms to provide individuals with an automated and reliable solution. These advanced algorithms analyze vast amounts of  data to deliver precise and insightful predictions, optimizing various aspects of decision-making processes. By automating complex tasks, users can benefit from increased efficiency, reduced error rates, and a deeper understanding of patterns and trends that were previously difficult to discern. This innovative approach empowers individuals to make data-driven decisions with confidence, ensuring accuracy and reliability in their endeavors.
            </p>

          </div>

          <div className="space2"/>

          <img className="contentIMG" src={techIMG} alt="Image" />

          <div className="space3"/>

        </div>

        <div className="welcomHeader">

          <div className="space3"/>

          <img className="contentIMG" src={aiIMG} alt="Image" />

          <div className="space2"/>

          <div className="welcomHeader2">

            <p className="contentText">
              AI & Society
            </p>

            <p className="welcomText2">
             Harness the transformative power of cutting-edge technology to significantly enhance overall societal well-being. By leveraging advanced tools and innovative solutions, we can improve public health outcomes, making healthcare more accessible, efficient, and effective. This approach ensures that communities thrive through better disease prevention, quicker diagnostics, personalized treatments, and improved healthcare delivery systems. The integration of technology in public health not only addresses current health challenges but also proactively prepares us for future health crises, ultimately leading to a healthier, more resilient society.
            </p>

          </div>

        </div>

        <div className="margin"/>

        <p className="welcomText">
          Meet our team
        </p>

        <p className="contentText2">
          Our team consists of doctors, professors, researchers, and interns. Each
          member brings valuable expertise,<br/> working together to develop and deliver
          this tool. We are committed to excellence and continually <br/>  strive to provide
          high-quality resources and solutions for the community.
        </p>

        <div className="margin"/>

        <div className="members" ref={navRef}>

          {
            members.map((member, index) => (

              <div key={index} className="MemberCard">

                <div className="MemberCardRow">

                  <img className="MemberCardIMG" src={member.img} alt="Image" />

                  <div className="MemberCardColumn">

                    <p className="MemberCardTitle"> {member.name} </p>

                    <p className="MemberCardText"> {member.job} </p>

                  </div>                  
                  
                </div>

                <div className="MemberCardDiscription">

                  <p className="MemberCardText"> {member.disciption} </p>

                </div>

              </div>

            ))
          }

        </div>

        <div className="column">

          <img className="arrow" onClick={() => Memberscroll(-400)} src={leftIMG} alt="Image" />

          <img className="arrow" onClick={() => Memberscroll(+400)} src={rightIMG} alt="Image" />

        </div>

        <div className="margin"/>

        <p className="welcomText">
          Platforme features
        </p>

        <p className="contentText2">
          The main objective is to allow users to verify the veracity of
          medical information in real time <br/>while guaranteeing an experience
          secure and intuitive user.
        </p>

        <div className="column">

          <div className="card">

            <img className="cardIMG" src={FeatureIMG1} alt="Image" />

            <div className="cardDiscription">

              <p className="CardTitle">
                Google Firebase
              </p>

              <p className="CardText">
                Ensuring secure user auth and personal data by using Firebase, a secure solution provided by Google.
              </p>

            </div>

          </div>

          <div className="card">

            <img className="cardIMG" src={FeatureIMG2} alt="Image" />

            <div className="cardDiscription">

              <p className="CardTitle">
                Optimized UX
              </p>

              <p className="CardText">
                Offer an intuitive, responsive and centralized user interface, developed in React.js which makes it so easy to use 
              </p>
            </div>

          </div>

          <div className="card">

            <img className="cardIMG" src={FeatureIMG3} alt="Image" />

            <div className="cardDiscription">

              <p className="CardTitle">
                Medical Verification 
              </p>

              <p className="CardText">
                Allow users to submit medical information and
                receive detailed assessments of their reliability, based on AI  
              </p>

            </div>

          </div>
         
        </div>

        <div className="margin2"/>

        <p className="welcomText">
          FAQ
        </p>

        <p className="contentText2">
          collection of common inquiries and their corresponding answers, typically curated
          to address the most prevalent or recurring  concerns <br/> and queries posed by users to
          provide and facilitate understanding and resolve doubts without the need for direct assistance.
        </p>

        <div className="margin"/>

        <div className="welcomHeader2">

          <p className="Card2Title">
           Why was HeReFaNMi created?
          </p>

          <p className="FAQText">
            HeReFaNMi was created in response to the critical challenge of misinformation, particularly highlighted during the COVID-19 pandemic. The widespread dissemination of inaccurate health information has eroded public trust in official guidelines and posed significant obstacles to public health efforts. HeReFaNMi aims to address these issues by providing reliable and accurate health information.          
          </p>

        </div>

        <div className="margin2"/>

        <div className="welcomHeader2">

          <p className="Card2Title">
            How does HeReFaNMi work?
          </p>

          <p className="FAQText">
            HeReFaNMi uses cutting-edge AI &  LLM algorithms to monitor, detect, and combat fake news in health-related information. The system is designed to automatically identify and flag inaccurate information provided by users, helping individuals access reliable health information quickly and efficiently.
          </p>

        </div>

        <div className="margin2"/>

        <div className="welcomHeader2">

          <p className="Card2Title">
            How does HeReFaNMi benefit the public?
          </p>

          <p className="FAQText">
            HeReFaNMi enhances societal well-being by ensuring that accurate health information is readily available and easily accessible. By combating misinformation, the project helps maintain public trust in scientific research and official health guidelines, ultimately improving public health outcomes.
          </p>

        </div>

        <div className="margin2"/>

        <div className="welcomHeader2">

          <p className="Card2Title">
           How can organizations partner with HeReFaNMi?
          </p>

          <p className="FAQText">
            Organizations interested in partnering with HeReFaNMi can contact the project team through the official email. Partnerships can involve data sharing, collaborative research, and joint initiatives to combat health-related misinformation.
            HeReFaNMi  is a product oriented research project, the team appriciates any contribution you can add to the project. 
          </p>

        </div>

        <div className="margin"/>

        {/* fooooooooooooooooooooooottter */}

      </div>

    </div>
    
  );
}

export default Home;
