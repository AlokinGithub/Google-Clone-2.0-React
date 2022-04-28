import React, { useState } from 'react';
import { recognition } from '../../api/VoiceSearchAPI';
import Header from './Header';

import './Home.css';
import VoiceSearchBox from './VoiceSearchBox';

const Home = ({ setSearch }) => {
  //controlling form
  const [term, setTerm] = useState('');

  //voice search
  const [isVoiceSearch, setIsVoiceSearch] = useState(false);
  //voice text
  const [voiceText, setVoiceText] = useState('');

  // clear term by clicking on cross
  const clearTerm = () => {
    setTerm('');
  };

  // submit form

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      /^[a-zA-Z0-9].*/.test(term) ||
      /^[a-zA-Z0-9]+[" "]/.test(term) ||
      /^[" "]+[a-zA-Z0-9]/.test(term)
    ) {
      setSearch(term.trim());
    }
  };

  // handle search
  const handleSearch = () => {
    if (
      /^[a-zA-Z0-9].*/.test(term) ||
      /^[a-zA-Z0-9]+[" "]/.test(term) ||
      /^[" "]+[a-zA-Z0-9]/.test(term)
    ) {
      setSearch(term.trim());
    }
  };

  // clear voice search
  const clearVoiceSearch = () => {
    setIsVoiceSearch(false);
    recognition.stop();
  };
  // open voice search
  const openVoiceSearch = () => {
    setIsVoiceSearch(true);
    recognition.start();
    recognition.onresult = (event) => {
      var current = event.resultIndex;
      var transcript = event.results[current][0].transcript;
      setVoiceText(voiceText + transcript);
      setTerm(voiceText + transcript);
      setSearch(voiceText + transcript);
    };
  };

  return (
    <>
      {isVoiceSearch ? (
        <VoiceSearchBox
          voiceText={voiceText}
          clearVoiceSearch={clearVoiceSearch}
          openVoiceSearch={openVoiceSearch}
        />
      ) : null}
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-12 home-screen align-items-center justify-content-center">
            <img
              src="data:image/png;base64,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"
              alt="Google Logo"
            />
            <div className="search-box col-md-7 border d-flex py-2 justify-content-between align-items-center">
              <i className="fa fa-search"></i>
              <form className="form-search" onSubmit={(e) => handleSubmit(e)}>
                <input
                  type="text"
                  name="term"
                  id="term"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                />
              </form>
              {term ? (
                <i className="fa fa-close" onClick={() => clearTerm()}></i>
              ) : (
                ''
              )}
              <i
                className="fa fa-microphone"
                onClick={() => openVoiceSearch()}></i>
            </div>
            <div className="buttons col-md-4 ml-5 mt-4 align-items-center justify-content-center">
              <input
                type="button"
                
                color='black'
                className="btn btn-light mx-1"
                value="Google 2.0"
                onClick={() => handleSearch()}
                
              />
              <input
                type="button"
                className="btn btn-light"
                value="I am Feeling Lucky"
              />  
         
            </div>
         
          </div>
          
        </div>
       
      </div>
     

    </>
  );
};

export default Home;
