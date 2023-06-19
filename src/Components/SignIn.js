import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../Assets/Icons/todo.png"


import show from "../Assets/Icons/view.png";
import hide from "../Assets/Icons/hide.png";

export default function SignIn({ setSignIn }) {

    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showHidePassword, setShowHidePassword] = useState(false);


    let allUsers = [];
    const stringifiedUser = localStorage.getItem('user');
    if (stringifiedUser === "" || stringifiedUser === null) {
        localStorage.setItem('user', JSON.stringify([]));
        // navigate("/");
    } else {
        allUsers = JSON.parse(stringifiedUser);
        allUsers = [allUsers];
    }



    function signInUser() {
        console.log(allUsers);
        for (let u = 0; u < allUsers.length; u++) {
            if (userEmail === allUsers[u].userEmail && password === allUsers[u].password) {
                setSignIn(true);
                localStorage.setItem('userStatus', JSON.stringify(true));
                navigate('/home')
            }
        }

    }

    function toSignUp() {
        navigate("/signup")
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


                        <input type="email" className="long" placeholder="Email Address" onChange={(event) => setUserEmail(event.target.value)} />
                        <br />
                        <div className="myPassword">
                            <input type={showHidePassword ? "text" : "password"} className="long" placeholder={showHidePassword ? "Enter Password" : "* * * * * * * * * *"} onChange={(event) => setPassword(event.target.value)} />
                            <img
                                title={showHidePassword ? "Hide password" : "Show password"}
                                src={showHidePassword ? show : hide}
                                onClick={() => setShowHidePassword(prevState => !prevState)}

                                alt="Hide"
                            />
                        </div>

                        <br />
                        <br />
                        <button onClick={signInUser}>Sign In</button>

                        <br />
                        <br />
                        <h3>Don't have an account? <a onClick={toSignUp}>Sign Up</a></h3>
                    </div>

                </div>

                <div className="column" id={"bg"}></div>
            </div>

        </div>
    );
}