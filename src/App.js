import React from 'react';
import Nav from './components/Nav/nav'
import Logo  from './components/Logo/logo'
import ImageForm  from './components/ImageForm/ImageForm'
// import Rank from ','
// import Logo  from './components/Logo/logo'
import './App.css';
import 'tachyons'

function App() {
  return (
    <div className="App">
    <Nav />
    <Logo />
    {/* <Rank /> */}
    <ImageForm />
    {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
