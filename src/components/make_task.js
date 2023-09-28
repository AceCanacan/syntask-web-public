import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook from react-router-dom
import '../styles/make_task.css';


const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = "INSERT API KEY";

function MakeTask() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');

  
  const handleSubmission = async () => {
    setIsLoading(true); 
    try {
      const systemMessage = {
        role: 'system',
        content: `Given the information: "${inputText}", please convert it into a structured and comprehensive task list with sequential steps as follows:`
      };
      const response = await axios.post(
        API_URL,
        {
          model: 'gpt-3.5-turbo',
          messages: [systemMessage],
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const submittedTexts = JSON.parse(localStorage.getItem('submittedTexts')) || [];
      submittedTexts.push(inputText);
      localStorage.setItem('submittedTexts', JSON.stringify(submittedTexts));
      setOutputText(response.data.choices[0].message.content.trim());
    } catch (error) {
      console.error('Error response from OpenAI:', error.response?.data);
      setError('Error transforming text');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    const enteredTitle = window.prompt('Please enter a title:'); 
    if (enteredTitle !== null) { // Check if user pressed Cancel
        const savedTexts = JSON.parse(localStorage.getItem('savedTexts')) || [];
        savedTexts.push({ title: enteredTitle, content: outputText });
        localStorage.setItem('savedTexts', JSON.stringify(savedTexts));
        setInputText('');
        setOutputText('');
        navigate('/'); 
    }
};

  
  const handleConfirmSave = () => {
    const savedTexts = JSON.parse(localStorage.getItem('savedTexts')) || [];
    savedTexts.push({ title, content: outputText });
    localStorage.setItem('savedTexts', JSON.stringify(savedTexts));
    setShowModal(false); 
    setTitle('');
    setInputText('');
    setOutputText('');
    navigate('/'); 
  };

  return (
    <div className="task-container">
      
      <div className="left-box">
        <textarea
          className="input-area"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
        />
        <button 
          onClick={handleSubmission} 
          disabled={isLoading || !inputText.trim()} // Disable button if isLoading is true or inputText is empty
        >
          Submit
        </button>
      </div>
      <div className="right-box">
        {error ? (
          <p>{error}</p>
        ) : (
          <>
            <textarea
              className="output-area"
              value={outputText}
              onChange={(e) => setOutputText(e.target.value)}
              disabled={isLoading}
            />
            <button 
              className="save-btn" 
              disabled={isLoading || !outputText.trim()} // Disable button if isLoading is true or outputText is empty
              onClick={handleSave}
            >
              Save
            </button>
          </>
        )}
      </div>
      {showModal && (
        <div className="modal">
          <label htmlFor="title">Title: </label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <button onClick={handleConfirmSave}>Confirm</button>
          <button onClick={() => {setShowModal(false); setTitle(''); }}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default MakeTask;
