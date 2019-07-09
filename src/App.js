import React, { Component } from 'react'
import Clarifai from 'clarifai'
import Nav from './components/Nav/nav'
import Logo  from './components/Logo/logo'
import ImageForm  from './components/ImageForm/ImageForm'
import Rank from './components/Rank/Rank'
import Signin from './components/SignIn/signin'
import Register from './components/Register/Register'
import FaceRecognition from './components/FaceRecognition/Face'
import './App.css';
import 'tachyons'
import Particles from 'react-particles-js'


const app = new Clarifai.App({
  apiKey: 'a9e966e7d89d4219adbd6e8866e72147'
});

const particleParams = {
  particles: {
    number: {
      value: 110,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component{
  state = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width,height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottonRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box)
  this.setState({box:box})
  }

  onInputChange = (e) => {
    this.setState({
      input: e.target.value
    })
    } 

  onSubmit = (e) => {
    this.setState({
      imageUrl: this.state.input
    })
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input,{ language: 'en' })
    .then(res => this.displayFaceBox(this.calculateFaceLocation(res)))
    .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({
        isSignedIn: false
      })
    } else if (route === 'home')
    this.setState({
      route: route,
      isSignedIn: true
    })
    this.setState({
      route:route
    })
  }

  render() {
  const { isSignedIn, imageUrl, box, route} = this.state
  return (
    <div className="App">
    <Particles className='particles' params={particleParams} />
    <Nav isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
    { route === 'home' 
        ? <div>
          <Logo />
          <Rank />
          <ImageForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </div>
        : ( route === 'signin'
          ? <Signin onRouteChange={this.onRouteChange} /> 
          : <Register onRouteChange={this.onRouteChange} /> 
        )
    }
    </div>
  );
  }
}

export default App;
