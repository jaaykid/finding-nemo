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

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {

  state = initialState

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
  this.setState({box:box})
  }

  onInputChange = (e) => {
    this.setState({
      input: e.target.value
    })
    } 

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => {
        if (response) {
          fetch('http://localhost:4000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({
        initialState
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
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          <ImageForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </div>
        : ( route === 'signin'
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
        )
    }
    </div>
  );
  }
}

export default App;
