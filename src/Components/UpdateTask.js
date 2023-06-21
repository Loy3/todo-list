import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import back from "../Assets/Icons/previous.png";

export default function UpdateTask() {
    const navigate = useNavigate();

    const stringifiedTask = localStorage.getItem('task');
    let displayTask = JSON.parse(stringifiedTask);

    const [taskId, setId] = useState(0);


    let list = "";

    if (displayTask === null || displayTask === "" || displayTask === undefined) {
        navigate("/home");
    }

    const stringifiedList = localStorage.getItem('lists');
    list = JSON.parse(stringifiedList);

    // if (stringifiedList === "" || stringifiedList === null) {
    //     localStorage.setItem('lists', JSON.stringify([]));
    // } else {
    //     list = JSON.parse(stringifiedEmp);
    // }

    useEffect(() => {
        for (let l = 0; l < list.length; l++) {
            if (displayTask[0].task === list[l].task) {
                setId(l);
            }
        }
    }, [displayTask, list, taskId])


    const [upTask, setUpTask] = useState({
        task: displayTask[0].task,
        taskDescipt: displayTask[0].taskDescipt,
        taskPriority: displayTask[0].taskPriority,
        taskDueDate: displayTask[0].taskDueDate,
        taskDueTime: displayTask[0].taskDueTime,
        userEmail: displayTask[0].userEmail,
    });


    function updateTask() {
        list[taskId].task = upTask.task;
        list[taskId].taskDescipt = upTask.taskDescipt;
        list[taskId].taskPriority = upTask.taskPriority;
        list[taskId].taskDueDate = upTask.taskDueDate;
        list[taskId].taskDueTime = upTask.taskDueTime;
        list[taskId].userEmail = upTask.userEmail;

        console.log(list[taskId]);
        localStorage.setItem('lists', JSON.stringify(list));
        localStorage.setItem("task", JSON.stringify([]))
        navigate("/home")
    }

    function cancelUp() {
        localStorage.setItem("task", JSON.stringify([]))
        navigate("/home")
        
    }


    const handleChange = (e) =>
        setUpTask(prevState => ({ ...prevState, [e.target.name]: e.target.value }),
            console.log(upTask))

    return (
        <div className="update">
            {displayTask.map((data, index) => (
                <div className="row" key={index}>
                    <div className="column">
                        <div className="return">
                            <img src={back} alt="return" onClick={cancelUp} />
                        </div>
                        <div className="task">

                            <div className="myForm">
                                <h1>Update the
                                    <br />{data.task} task</h1>


                                <form id={"taskForm"}>
                                    <br />
                                    <label>Due Date & Time</label>
                                    <br />
                                    <input type="date" className="small" name="taskDueDate" onChange={handleChange} placeholder={`Task: ${data.taskDueDate}`}
                                        min="2023-06-01" max="2030-12-31" />
                                    <input type="time" className="small" name="taskDueTime" onChange={handleChange}placeholder={`Task: ${data.taskDueTime}`} />
                                    <br />

                                    <input type="text" className="long" name="task" placeholder={`Task: ${data.task}`} onChange={handleChange} />
                                    <br />
                                    <select className="long" name="taskPriority" onChange={handleChange}>
                                        <option hidden={true} >
                                        {`Current Priority: ${data.taskPriority}`}
                                        </option>
                                        <option value={"High"}>High</option>
                                        <option value={"Medium"}>Medium</option>
                                        <option value={"Low"}>Low</option>
                                        <option value={"Done"}>Done</option>
                                    </select>
                                    <br />
                                    <textarea type="text" className="long" name="taskDescipt" placeholder="Task description" rows="6" cols="50" onChange={handleChange} />
                                    <br />
                                    <br />
                                    <button onClick={updateTask}>Update Task</button>
                                </form>
                            </div>


                        </div>
                    </div>
                    <div className="column" id={"bG"}>
                        <div className="bgBlock"></div>
                        <div className="bgText">
                            <h1>{data.task}</h1>
                            <p>
                                {data.taskDueDate} || {data.taskDueTime}
                                <br />
                                Priority: {data.taskPriority}
                                <br /><br />
                                {data.taskDescipt}
                            </p>
                            <br />
                            <button onClick={cancelUp}>Canceel Update</button>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}