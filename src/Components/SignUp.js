import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../Assets/Icons/todo.png"

export default function SignUp() {

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
            const user = {
                userFirstName: userFirstName,
                userLastName: userLastName,
                userEmail: userEmail,
                userPosition: userPosition,
                password: password
            }
            localStorage.setItem("user", JSON.stringify(user))
        } else {
            console.log("What");
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
                    <div className="signup-form">


                        <h1>Sign Up to Create an Account</h1>
                        <h3 className="gray">This is the first step to your list.</h3>

                        <br />

                        <input type="text" className="small" placeholder="First Name" onChange={(event) => setUserFirstName(event.target.value)} />
                        <input type="text" className="small" placeholder="Last Name" onChange={(event) => setUserLastName(event.target.value)} />
                        <br />
                        <input type="email" className="small" placeholder="Email Address" onChange={(event) => setUserEmail(event.target.value)} />
                        {/* <select onChange={(event) => setPosition(event.target.value)}>
                                <option hidden={true} >
                                    Select Category
                                </option>
                                <option value={"Back-End Developer"}>Back-End Developer</option>
                                <option value={"Business Analyst"}>Business Analyst</option>
                                <option value={"Front-End Developer"}>Front-End Developer</option>
                                <option value={"Full-Stack Developer"}>Full-Stack Developer</option>
                                <option value={"Scrum Master"}>Scrum Master</option>
                                <option value={"Team Leader"}>Team Leader</option>
                                <option value={"Tester"}>Tester</option>

                            </select> */}

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

                <div className="column" id={"bg"}></div>
            </div>

        </div>
    );
}