import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

export default function AddNewList(props) {

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

    return (
        <div className="addList">
            <NavBar />
            <header>
                <div className="bgBlock"></div>
            </header>
            
            <div className="wrap">
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
    );
}