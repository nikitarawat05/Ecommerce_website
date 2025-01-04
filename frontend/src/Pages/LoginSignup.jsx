import React from 'react'
import './CSS/LoginSignup.css' // Importing the CSS for styling the Login/Signup component
import { useState } from 'react'

const LoginSignup = () => {

  // State to toggle between 'Login' and 'Sign Up' modes
  const [state, setState] = useState("Login");

  // State to store form data for login/signup inputs (username, email, password)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  })

  // Handles changes in input fields and updates formData state accordingly
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }) // Using the spread operator to preserve other field values
  }

  // Function to handle login operation
  const login = async () => {
    console.log("login Function Executed", formData); // Log for debugging purposes
    let responseData;

    // Sending a POST request to the login endpoint with the form data
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data', // Specifies the data format
        'Content-Type': 'application/json', // Setting the content type as JSON
      },
      body: JSON.stringify(formData), // Sending the form data as JSON in the request body
    }).then((response) => response.json())
      .then((data) => responseData = data) // Storing the response in responseData

    // If login is successful, store the token in local storage and redirect to the home page
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token); // Storing the auth token
      window.location.replace("/"); // Redirect to home page
    } else {
      alert(responseData.errors) // Show error message if login fails
    }
  }

  // Function to handle sign-up operation
  const signup = async () => {
    console.log("signup Function Executed", formData); // Log for debugging purposes
    let responseData;

    // Sending a POST request to the signup endpoint with the form data
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data', // Specifies the data format
        'Content-Type': 'application/json', // Setting the content type as JSON
      },
      body: JSON.stringify(formData), // Sending the form data as JSON in the request body
    }).then((response) => response.json())
      .then((data) => responseData = data) // Storing the response in responseData

    // If signup is successful, store the token in local storage and redirect to the home page
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token); // Storing the auth token
      window.location.replace("/"); // Redirect to home page
    } else {
      alert(responseData.errors) 
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1> {/* Dynamically display 'Login' or 'Sign Up' based on the state */}
        <div className="loginsignup-fields">
          
          {}
          {state === "Sign Up" ? 
            <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder="Your name" /> 
            : <></> 
          }

          {}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
          
          {}
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
        </div>

        {/* Button to trigger login or sign up based on the state */}
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>

        {/* Toggling between Login and Sign Up modes */}
        {state === "Sign Up"
          ? <p className="loginsignup-login">Already have an account? <span onClick={() => { setState("Login") }}>Login Here</span></p>
          : <p className="loginsignup-login">Create an account? <span onClick={() => { setState("Sign Up") }}>Click Here</span></p>
        }

        {}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' /> 
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
