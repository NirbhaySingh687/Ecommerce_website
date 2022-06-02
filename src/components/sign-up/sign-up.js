import React, {Component} from "react";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import { auth, createUserProfileDocument} from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth"
import "./sign-up.scss"

class SignUp extends Component{
    constructor(props) {
        super(props);
        this.state= {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmitForm = async (event) => {
        event.preventDefault()
        const { displayName, email, password, confirmPassword } = this.state
        if(password !== confirmPassword){
            alert("Password don't match")
            return
        }
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await createUserProfileDocument(user, { displayName })
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        } catch (err) {
            console.log(err)
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state
        return(
            <div className="sign-up">
                <h2 className="title">I Do not have a account</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmitForm}>
                    <FormInput type="text" name="displayName" value={displayName} onChange={this.handleChange} label="Display Name" required />
                    <FormInput type="email" name="email" value={email} onChange={this.handleChange} label="Email" required />
                    <FormInput type="password" name="password" value={password} onChange={this.handleChange} label="Password" required />
                    <FormInput type="password" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} label="Confirm Password" required />

                    <CustomButton type="submit">SignUp</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp