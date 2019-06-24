import React from 'react';
import Nav from './components/Nav/nav'
import Logo  from './components/Logo/logo'
import './App.css';
import 'tachyons'

function App() {
  return (
    <div className="App">
    <Nav />
    <Logo />
    {/* <ImageForm /> */}
    {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
