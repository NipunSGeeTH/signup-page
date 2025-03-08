import React, { Component } from 'react'

export default class Login extends Component {
constructor(props){
  super (props)
  this.state={
    email:"",
    password:"",
  };
  this.handleSubmit = this.handleSubmit.bind(this);
}
handleSubmit(e) {
  e.preventDefault();
  const { email, password } = this.state;
  console.log(email, password);

  fetch("http://localhost:3000/login-user", {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "userRegister");

      if (data.status === "ok") {
        alert("Login successful");
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("loggedIn", true);
        window.location.href = "./userDetails";
      } else if (data.error === "Incorrect password") {
        alert("Password is incorrect");
      } else if (data.error === "Email not found") {
        alert("Email does not exist");
      } else {
        alert("Login failed. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    });
}


  render() {
    return (
      <form onSubmit = {this.handleSubmit}>
        <h3>LogIn</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e)=>this.setState({email:e.target.value})}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e)=>this.setState({password:e.target.value})}
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="oo">password?</a>
        </p>
      </form>
    )
  }
}
