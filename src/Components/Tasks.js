import { useNavigate } from "react-router-dom";

import high from "../Assets/Icons/High.png";
import medium from "../Assets/Icons/Medium.png";
import low from "../Assets/Icons/Low.png";
import update from "../Assets/Icons/editing.png";
import trash from "../Assets/Icons/trash.png";
import { useState } from "react";

export default function Tasks() {
    const navigate = useNavigate();

    let list = [];
    let tasks = [];
    const stringifiedList = localStorage.getItem('lists');
    if (stringifiedList === "" || stringifiedList === null) {
        localStorage.setItem('lists', JSON.stringify([]));
        // navigate("/");
    } else {
        list = JSON.parse(stringifiedList);
        // list = [allUsers];
        // console.log(list);
    }

    //Delete from list
    function deleteTask(event, index) {

        list.splice(index, 1);
        localStorage.setItem('lists', JSON.stringify(list));

        window.location.reload(false);
    }
    //End of delete from list

    //Update step 1
    let task = [{}];
    function updateTask(event, data) {

        task = [data];
        localStorage.setItem("task", JSON.stringify(task));
        navigate("/update");
    }
    //End of update step 1

    //Search task, taskDescipt, taskPriority, taskDueDate, taskDueTime
    const [searchTask, setSearchTask] = useState('');
    const [myTask, setMyTask] = useState({
        task: '',
        taskDescipt: '',
        taskPriority: '',
        taskDueDate: '',
        taskDueTime: '',
    });

    function search() {

        for (let s = 0; s < list.length; s++) {

            if (searchTask === list[s].task) {
                setMyTask({
                    task: list[s].task,
                    taskDescipt: list[s].taskDescipt,
                    taskPriority: list[s].taskPriority,
                    taskDueDate: list[s].taskDueDate,
                    taskDueTime: list[s].taskDueTime,

                })

                document.getElementById("all").style.display = "none";
                document.getElementById("searched").style.display = "block";

            }
        }
    }
    function back() {
        document.getElementById("all").style.display = "block";
        document.getElementById("searched").style.display = "none";
    }
    //End of search

    return (
        <div className="displayTasks">
            <div id={"all"}>
                <div className="row" id={"filter"}>
                    <div className="column" id={"search"}>
                        <input type="text" placeholder="Search for task" onChange={(event) => setSearchTask(event.target.value)} />
                        <button onClick={search}>Search</button>
                        <br /><br />
                    </div>

                    <div className="column">

                        <img src={high} alt="high" width={40} /> <span>High</span>
                    </div>
                    <div className="column">
                        <img src={medium} alt="high" width={40} /> <span>Medium</span>
                    </div>
                    <div className="column">
                        <img src={low} alt="high" width={40} /> <span>Low</span>
                    </div>
                </div>

                <div className="row" id={"myCards"}>
                    {list.map((data, index) => (

                        <div className="column" key={index} >
                            <div className="card">

                                <div className="row" id={"step1"}>
                                    <div className="column" >
                                        {data.task}
                                    </div>

                                    <div className="column" id={"align-right"}>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>


                                                        <button onClick={event => updateTask(event, data)}>
                                                            <img src={update} alt="Update" width={30} />
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button onClick={event => deleteTask(event, index)}>
                                                            <img src={trash} alt="Delete" width={30} />
                                                        </button>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="row" id={"step2"}>
                                    <div className="column">
                                        <p>{data.taskDescipt}</p>
                                        <p>
                                            {data.taskPriority}
                                            <br />
                                            {data.taskDueTime} || {data.taskDueDate}
                                        </p>
                                    </div>
                                    <div className="column" >
                                        <div className="square"></div>
                                        {data.taskPriority === "High" ? <div className="square1"><img src={high} alt="High" width={50} /></div> : <div className=""></div>}
                                        {data.taskPriority === "Medium" ? <div className="square2"><img src={medium} alt="High" width={50} /></div> : <div className=""></div>}
                                        {data.taskPriority === "Low" ? <div className="square3"><img src={low} alt="High" width={50} /></div> : <div className=""></div>}
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div id={"searched"}>
                <div className="row" id={"myCards"}>


                    <div className="column" >
                        <div className="card">

                            <div className="row" id={"step1"}>
                                <div className="column" >
                                    {myTask.task}
                                </div>
                            </div>

                            <div className="row" id={"step2"}>
                                <div className="column">
                                    <p>{myTask.taskDescipt}</p>
                                    <p>
                                        {myTask.taskPriority}
                                        <br />
                                        {myTask.taskDueTime} || {myTask.taskDueDate}
                                    </p>
                                </div>
                                <div className="column" >
                                    <div className="square"></div>
                                    {myTask.taskPriority === "High" ? <div className="square1"><img src={high} alt="High" width={50} /></div> : <div className=""></div>}
                                    {myTask.taskPriority === "Medium" ? <div className="square2"><img src={medium} alt="High" width={50} /></div> : <div className=""></div>}
                                    {myTask.taskPriority === "Low" ? <div className="square3"><img src={low} alt="High" width={50} /></div> : <div className=""></div>}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <button onClick={back}>Back</button>
            </div>
        </div>
    );

}