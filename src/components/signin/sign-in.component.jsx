import React from "react";
import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    if(email === '' || password ===''){
      if(email === '') alert("Email is empty !")
      else if( password === '') alert(" password is empty !")
      return;
    }
    
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (error) {
      if (error.code === "auth/invalid-email") alert("Error: Email address has bad format, retry again");
      else if (error.code === "auth/user-not-found") alert("User not found");
      else if (error.code === "auth/wrong-password") alert("Wrong pasword, try again ...");
      else console.log(error);
    }
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form>
          <FormInput
            name="email"
            type="email"
            label="Email"
            value={this.state.email}
            handleChange={this.handleChange}
            required
          />

          <FormInput
            name="password"
            type="password"
            label="Password"
            value={this.state.password}
            handleChange={this.handleChange}
            required
          />
          <div className="buttons">
            <CustomButton type="submit" onClick={this.handleSubmit}>
              {" "}
              Sign in
            </CustomButton>

            <CustomButton
              type="button"
              isGoogleSignIn
              onClick={signInWithGoogle}
            >
              {" "}
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
