import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../Assets/Icons/todo.png"

export default function SignUp(props) {

    const navigate = useNavigate();

    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPosition, setPosition] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');


    function signUpF() {

        if (password === confPassword) {
            console.log(userFirstName, userLastName, userEmail, userPosition, password, confPassword);
            
            props.signUpF(userFirstName, userLastName, userEmail, userPosition, password, confPassword);
            //localStorage.setItem("user", JSON.stringify(user))
            window.alert("To see if you have signed up please sign in.")
            navigate("/")
        } else {
            window.alert("Passwords do not match!")
        }
    }

    function toSignIn() {
        navigate("/")
    }


    return (
        <div className="signup">

            <div className="row">
                <div className="column" id={"center"}>
                    <div className="nav">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="align-To-center">
                        <div className="signup-form">


                            <h1>Sign Up to Create an Account</h1>
                            <h3 className="gray">This is the first step to your list.</h3>

                            <br />

                            <input type="text" className="small" placeholder="First Name" onChange={(event) => setUserFirstName(event.target.value)} />
                            <input type="text" className="small" placeholder="Last Name" onChange={(event) => setUserLastName(event.target.value)} />
                            <br />
                            <input type="email" className="small" placeholder="Email Address" onChange={(event) => setUserEmail(event.target.value)} />
                           
                            <input type="text" className="small" placeholder="What do you do?" onChange={(event) => setPosition(event.target.value)} />
                            <br />
                            <input type="password" className="long" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                            <input type="password" className="long" placeholder="Confirm Password" onChange={(event) => setConfPassword(event.target.value)} />

                            <br />
                            <br />
                            <button onClick={signUpF}>Sign Up</button>

                            <br />
                            <br />
                            <h3>Already have an account? <a onClick={toSignIn}>Sign In</a></h3>
                        </div>
                    </div>

                </div>

                <div className="column" id={"bg"}></div>
            </div>

        </div>
    );
}