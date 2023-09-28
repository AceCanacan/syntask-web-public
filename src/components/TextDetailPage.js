import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/text_detail_page.css';

function TextDetailPage() {
  const { index } = useParams();
  const navigate = useNavigate();
  const texts = JSON.parse(localStorage.getItem('savedTexts')) || [];
  const text = texts[index] || ''; 
  
  const [isEditable, setIsEditable] = useState(false);
  const [editedText, setEditedText] = useState(text);
  
  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleSave = () => {
    const updatedTexts = [...texts];
    updatedTexts[index] = editedText;
    localStorage.setItem('savedTexts', JSON.stringify(updatedTexts));
    setIsEditable(false);
  };

  const handleDelete = () => {
    const userConfirmed = window.confirm("Are you sure you want to delete this text? This action cannot be undone.");
    if (userConfirmed) {
      const updatedTexts = texts.filter((_, i) => i !== parseInt(index));
      localStorage.setItem('savedTexts', JSON.stringify(updatedTexts));
      navigate('/'); // navigate to the home page after deletion
    }
  };
  return (
    <div className="text-detail-page-container">
      <div className="text-detail-container">
        <div className="text-detail-wrapper-box">
          <div className="text-detail-text-box" contentEditable={isEditable} suppressContentEditableWarning={true}>
            <h2>{editedText.title}</h2> {/* Render title */}
            <p>{editedText.content}</p> {/* Render content */}
          </div>
          <div className="text-detail-button-container">
            {
              isEditable ?
              <button className="text-detail-button text-detail-save-btn" onClick={handleSave}>Save</button> :
              <button className="text-detail-button text-detail-edit-btn" onClick={handleEdit}>Edit</button>
            }
            <button className="text-detail-button text-detail-delete-btn" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TextDetailPage;
