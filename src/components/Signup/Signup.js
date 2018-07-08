import React from "react"

class Signup extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            email : "",
            password: ""
        }
    }

    onNameSignup = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    onEmailSignup = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    onPasswordSignup = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    onSignupSubmit = () => {

        const {name, email, password } = this.state
        fetch("http://localhost:3000/Signup", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name,
                email,
                password
            })
        }).then(res=> res.json())
        .then(user => {
            if (user) {
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }
        })
    } 
    render () {
    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset 
                    id="sign_up" 
                    className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0 ">Sign Up</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" 
                            htmlFor="name">Name</label>
                            <input 
                            onChange = {this.onNameSignup}
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            name="name" 
                            id="name" />
                        </div>
                        <div className="mt3">
                            <label 
                            className="db fw6 lh-copy f6" 
                            htmlFor="email-address">Email</label>
                            <input 
                            onChange = {this.onEmailSignup}
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" name="email-address" id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                            onChange = {this.onPasswordSignup}
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" name="password" id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input 
                            onClick={this.onSignupSubmit}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                    </div>
                </div>
            </main>
        </article> )
    }
}

export default Signup 