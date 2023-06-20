import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import profile from "../Assets/Images/BG.png";
import high from "../Assets/Icons/High.png";
import medium from "../Assets/Icons/Medium.png";
import low from "../Assets/Icons/Low.png";
// import overd from "../Assets/Icons/Overdue.png";
import done from "../Assets/Icons/Done.png";
import close from "../Assets/Icons/cancel.png";

import NavBar from "./NavBar";
import Tasks from "./Tasks";

// import AddNewList from "./AddNewList";

export default function HomePage(props) {

    const navigate = useNavigate();

    const signedIn = localStorage.getItem("userStatus");
    const [userEmail, setUserEmail] = useState(JSON.parse(localStorage.getItem('userEmail')));
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

    let list = [];
    const stringifiedList = localStorage.getItem('lists');
    if (stringifiedList === "" || stringifiedList === null) {
        localStorage.setItem('lists', JSON.stringify([]));
        // navigate("/");
    } else {
        list = JSON.parse(stringifiedList);
    }


    let doneP = 0;
    let highP = 0;
    let medP = 0;
    let lowP = 0;

    for (let p = 0; p < list.length; p++) {
        if (list[p].taskPriority === "Done" && list[p].userEmail === userEmail) {
            doneP++;
        } else if (list[p].taskPriority === "High" && list[p].userEmail === userEmail) {
            highP++;
        } else
            if (list[p].taskPriority === "Medium" && list[p].userEmail === userEmail) {
                medP++;
            } else
                if (list[p].taskPriority === "Low" && list[p].userEmail === userEmail) {
                    lowP++;
                }
    }



    const [task, setTask] = useState('');
    const [taskDescipt, setTaskDescipt] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');

    const [taskDueTime, setTaskDueTime] = useState('');

    function addNewList() {
        //setUserEmail(allUsers[0].userEmail)

        console.log(allUsers[0].userEmail);
        // setEmpIdNumber(empIdNumber + 1);
        props.addNewList(task, taskDescipt, taskPriority, taskDueDate, taskDueTime, userEmail);
        document.getElementById("taskForm").reset();


    }

    //Open and close popup
    function openForm() {
        document.getElementById("popup").style.display = "block";

    }

    function closeForm() {
        document.getElementById("popup").style.display = "none";
        // window.location.reload();
    }
    
    return (
        <div className="home">
            <NavBar />


            <header>
                <div className="bgBlock"></div>

                <div className="profile">
                    <div className="user">
                        <div className="row">
                            <div className="column">
                                <img src={profile} alt="profile" />
                            </div>
                            <div className="column">
                                <h1>{allUsers[0].userFirstName + " " + allUsers[0].userLastName}</h1>

                            </div>
                            <div className="column" id={"columnLong"}>
                                <h2>{allUsers[0].userEmail}</h2>
                                <h3>{allUsers[0].userPosition}</h3>
                            </div>
                            <div className="column">
                                <table>
                                    <tbody>
                                        <tr className="prior">
                                            <td><img src={done} alt="Done" width={50} /></td>
                                            <td>{doneP}</td>

                                            <td className="spacing"><img src={high} alt="High" width={50} /></td>
                                            <td>{highP}</td>

                                            <td className="spacing"><img src={medium} alt="High" width={50} /></td>
                                            <td>{medP}</td>

                                            <td className="spacing"><img src={low} alt="High" width={50} /></td>
                                            <td>{lowP}</td>


                                        </tr>
                                    </tbody>
                                </table>
                                <button onClick={openForm}>Add a Task</button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className="wrap" id={"tasks"}>

                    <Tasks />
                </div>
            </main>


            <div id={"popup"}>
                <div className="mypopup">
                    <div className="box" id={"box"}>
                        <div className="box-content">
                            <div>
                                <img src={close} alt="close" onClick={closeForm} />
                            </div>
                            <h1>Add a task</h1>
                            <form id={"taskForm"}>
                                <br />
                                <label>Due Date & Time</label>
                                <br />
                                <input type="date" className="small" onChange={(event) => setTaskDueDate(event.target.value)} placeholder="dd-mm-yyyy"
                                    min="2023-06-01" max="2030-12-31" />
                                <input type="time" className="small" onChange={(event) => setTaskDueTime(event.target.value)} placeholder="dd-mm-yyyy" />
                                <br /><br />
                                <label>Task</label>
                                <br />
                                <input type="text" className="long" placeholder="Add a task" onChange={(event) => setTask(event.target.value)} />
                                <br />
                                <select className="long" onChange={(event) => setTaskPriority(event.target.value)}>
                                    <option hidden={true} >
                                        Select Task Priority
                                    </option>
                                    <option value={"High"}>High</option>
                                    <option value={"Medium"}>Medium</option>
                                    <option value={"Low"}>Low</option>


                                </select>
                                <br />
                                <textarea type="text" className="long" placeholder="Task description" rows="6" cols="50" onChange={(event) => setTaskDescipt(event.target.value)} />
                                <br />
                                <br />
                                <button onClick={addNewList}>Add Task</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

