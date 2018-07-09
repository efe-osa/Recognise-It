import React, { Component } from "react"
import Particles from "react-particles-js"
import Clarifai from "clarifai"
import Navigation from "./components/Navigation/Navigation"
import Signin from "./components/Signin/Signin"
import Signup from "./components/Signup/Signup"
import Logo from "./components/Logo/Logo"
import Rank from "./components/Rank/Rank"
import LinkForm from "./components/LinkForm/LinkForm"
import FaceRecognition from "./components/FaceRecognition/FaceRecognition"
import "./App.css"

const app = new Clarifai.App({
    apiKey: 'fb8c869f19f041b6a3d5deb98e389e38'
})

const particlesOpt = {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
}
class App extends Component {
    constructor() {
        super()
        this.state = {
            input: "",
            imageUrl: "",
            box: {},
            route: 'Signin',
            isSignedIn: false,
            user: {
                id: '',
                name: "",
                email: "",
                entries: 0,
                joined: ""
            }
        }
    }


    loadUser = (data) => {
        this.setState({ user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined}
        })
    }
    calculateFaceLocation = (data) => {
        const clarifaiface = data.outputs[0].data.regions[0].region_info.bounding_box
        const image = document.getElementById('inputimage')
        const width = Number(image.width)
        const height = Number(image.height)
        return {
            leftCol: clarifaiface.left_col * width,
            topRow: clarifaiface.top_row * height,
            rightCol: width - (clarifaiface.right_col * width),
            bottomRow: height - (clarifaiface.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        this.setState({ box: box })
    }
    onInputChange = (e) => {
        this.setState({ input: e.target.value })
    }

    onSubmit = () => {
        this.setState({ imageUrl: this.state.input })

        app.models.predict(
            Clarifai.FACE_DETECT_MODEL,
            this.state.input)
        .then(res => {
            if (res) {
                fetch('http://localhost:3000/image', {
                    method: "put",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
                }).then(res => res.json())
                .then(count =>
                    this.setState(
                        Object.assign(this.state.user, {entries: count})
                    )
                )
            }
          this.displayFaceBox(this.calculateFaceLocation(res))
        }).catch(err => console.log(err))
    }

    onRouteChange = (route) => {
        if (route === "Signout") {
            this.setState({isSignedIn: false})
        } else if (route === "home") {
            this.setState({isSignedIn: true})
        }
        this.setState({route: route})
    }
    render() {
        const { box, imageUrl, route, isSignedIn, user } = this.state
                return (
            <div className="App">
                <Particles className='particles'
                    params={particlesOpt} />
                    <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
                {route === 'home' ? 
                        <div>
                        <Logo />
                        <Rank name={user.name} entries={user.entries}/>
                        <LinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
                        <FaceRecognition box={box} imageUrl={imageUrl} />
                    </div> : (
                        route === "Signin" ? 
                        <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> :
                        <Signup loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                        )}
            </div>
        )
    }
}

export default App
