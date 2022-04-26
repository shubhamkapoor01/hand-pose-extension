import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import Model from './Model';

function App() {
  const [videoState, setVideoState] = useState('default');
  const userVideo = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        userVideo.srcObject = stream;
      })
  }, []);

  return (
    <div className="app">
      <div className="app-title">
        { videoState }
      </div>
      <Model 
        streamRef = {userVideo}
        setVideoState = {(state) => setVideoState(state)}
      />
    </div>
  );
}

export default App;
