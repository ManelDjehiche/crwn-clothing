import React from "react";
import "./sign-up.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      console.log("the state:: ", this.state);
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log("this is you, I know .. ", user);
      await createUserProfileDocument(user, { displayName });
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/invalid-email") alert("Error: Email address has bad format, retry again");
      else if (error.code === "auth/weak-password") alert("Error: Password should be at least 6 characters");
      else if (error.code === "auth/email-already-in-use") alert("Error: This Email is already in use, try another");
      else console.log(error);
    }
  };

  render() {
    return (
      <div className="sign-up">
        <h2>I do not have an account</h2>
        <span>Sign up with your email and password</span>

        <FormInput
          handleChange={this.handleChange}
          name="displayName"
          type="text"
          label="Display Name"
          value={this.state.displayName}
          required
        />
        <FormInput
          handleChange={this.handleChange}
          name="email"
          type="email"
          label="Email"
          value={this.state.email}
          required
        />
        <FormInput
          handleChange={this.handleChange}
          name="password"
          type="password"
          label="Password"
          value={this.state.password}
          required
        />
        <FormInput
          handleChange={this.handleChange}
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          value={this.state.confirmPassword}
          required
        />

        <div className="buttons">
          <CustomButton type="submit" onClick={this.handleSubmit}>
            SIGN UP
          </CustomButton>
        </div>
      </div>
    );
  }
}

export default SignUp;
