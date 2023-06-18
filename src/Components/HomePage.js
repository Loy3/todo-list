import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import profile from "../Assets/Images/BG.png";
import high from "../Assets/Icons/High.png";
import medium from "../Assets/Icons/Medium.png";
import low from "../Assets/Icons/Low.png";
import NavBar from "./NavBar";
import AddNewList from "./AddNewList";

export default function HomePage(props) {

    const navigate = useNavigate();

    const signedIn = localStorage.getItem("userStatus");
    let userStat = false;

    useEffect(() => {
        if (signedIn === '' || signedIn === null) {
            localStorage.setItem('userStatus', JSON.stringify(false))
        } else {
            userStat = JSON.parse(signedIn);
        }

        if (userStat === false) {
            navigate("/");
        }
    }, [signedIn, userStat])



    let allUsers = [];
    const stringifiedUser = localStorage.getItem('user');
    if (stringifiedUser === "" || stringifiedUser === null) {
        localStorage.setItem('user', JSON.stringify([]));
        // navigate("/");
    } else {
        allUsers = JSON.parse(stringifiedUser);
        allUsers = [allUsers];
    }



    const [task, setTask] = useState('');
    const [taskDescipt, setTaskDescipt] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');
    const [userEmail, setUserEmail] = useState('');


    function addNewList() {
        setUserEmail(allUsers[0].userEmail)

        console.log(allUsers[0].userEmail);
        // setEmpIdNumber(empIdNumber + 1);
        props.addNewList(task, taskDescipt, taskPriority, taskDueDate, allUsers[0].userEmail);

    }

    //Open and close popup
    function openForm() {
        document.getElementById("popup").style.display = "block";

    }

    function closeForm() {
        document.getElementById("popup").style.display = "none";
        // window.location.reload();
    }
    //end of open and close popup




    return (
        <div className="home">
            <NavBar />


            <header>
                <div className="bgBlock"></div>

                <div className="profile">
                    <div className="card">
                        <img src={profile} alt="profile" />
                        <br /><br />
                        <h1>{allUsers[0].userFirstName + " " + allUsers[0].userLastName}</h1>
                        <h2>{allUsers[0].userEmail}</h2>
                        <br /><br /><br />
                        <h3>{allUsers[0].userPosition}</h3>
                        <table>
                            <tbody>
                                <tr className="prior">
                                    <td><img src={high} alt="High" width={50} /></td>
                                    <td>85</td>
                                </tr>
                                <tr className="prior">
                                    <td><img src={medium} alt="High" width={50} /></td>
                                    <td>85</td>
                                </tr>
                                <tr className="prior">
                                    <td><img src={low} alt="High" width={50} /></td>
                                    <td>85</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </header>

            <div className="row">
                <div className="column">

                </div>
                <div className="column">

                </div>
            </div>
            <button onClick={openForm}>Open Form</button>
            <div id={"popup"} onClick={closeForm}>
                <div className="mypopup">
                    <div className="box" id={"box"}>
                        <label>Task</label>
                        <br />
                        <input type="text" className="long" placeholder="Add a task" onChange={(event) => setTask(event.target.value)} />
                        <br />
                        <label>Task Priority</label>
                        <br />
                        <select className="long" onChange={(event) => setTaskPriority(event.target.value)}>
                            <option hidden={true} >
                                Select Priority
                            </option>
                            <option value={"High"}>High</option>
                            <option value={"Medium"}>Medium</option>
                            <option value={"Low"}>Low</option>


                        </select>
                        <br />
                        <label>Task Description</label>
                        <br />
                        <textarea type="text" className="long" placeholder="Task description" rows="4" cols="50" onChange={(event) => setTaskDescipt(event.target.value)} />
                        <br />
                        <label>Due Date</label>
                        <br />
                        <input type="date" className="long" placeholder="dd/mm/yyyy" onChange={(event) => setTaskDueDate(event.target.value)} />

                        <br />
                        <br />
                        <button onClick={addNewList}>Add Task</button>

                    </div>
                </div>
            </div>
        </div>
    )
}