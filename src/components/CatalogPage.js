import React, { useEffect, useState } from 'react';
import '../styles/catalog_page.css';// You can create a separate CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom

function CatalogPage() {
  const [savedTexts, setSavedTexts] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const texts = JSON.parse(localStorage.getItem('savedTexts')) || [];
    setSavedTexts(texts);
  }, []);

  const handleTextBoxClick = (index) => {
    navigate(`/text-detail/${index}`);
  };

  const handleNewTaskClick = () => {
    navigate('/make-task');
  };

  return (
    <div className="catalog-container">
      <div className="content-container">
        <div className="wrapper-box">
        {savedTexts.map((text, index) => (
  <div 
    className="text-box"
    key={index}
    onClick={() => handleTextBoxClick(index)}
  >
    <strong>{text.title}</strong> {/* Display title here */}
    <p>{text.content ? text.content.substring(0, 200) : 'No content available'}...</p>

  </div>
))}

        </div>
        <button className="new-task-btn" onClick={handleNewTaskClick}>New Task</button> {/* Handle click event and call navigate function */}
      </div>
    </div>
  );
}

export default CatalogPage;
