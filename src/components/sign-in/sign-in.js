import React, {Component} from "react";
import "./sign-in.scss"
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import { signInWithGoogle } from "../../firebase";
import { auth} from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom";

class SignIn extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ""
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { email, password } = this.state

        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                console.log(user)
            }).catch((err) =>{
            console.log(`##########`,err)
        })
        this.setState({ email: "", password: ""})
    }

    onHandleChange = (event) => {
        const { value, name} = event.target;
        this.setState({[name]: value})
    }

    render() {
        return(
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" type="email" value={this.state.email} handleChange={this.onHandleChange} required label="email"/>
                    <FormInput name="password" type="password" value={this.state.password} handleChange={this.onHandleChange} required label="password"/>
                    <div className="buttons">
                        <CustomButton type="submit" value="Submit Form">Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} value="Submit Form" isGoogleSignIn={true}>Sign In with Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn