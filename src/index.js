import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import RatingPage from './Rating'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
      <Route index element={<App />} />
      <Route path="*" element={<App />} />
      <Route path="/rating/:ref" element={<RatingPage />} />
    </Routes>      
    </Router>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
