
import high from "../Assets/Icons/High.png";
import medium from "../Assets/Icons/Medium.png";
import low from "../Assets/Icons/Low.png";
import overd from "../Assets/Icons/Overdue.png";
import done from "../Assets/Icons/Done.png";

export default function ViewByType(props) {
    let list = [];
    const stringifiedList = localStorage.getItem('lists');
    if (stringifiedList === "" || stringifiedList === null) {
        localStorage.setItem('lists', JSON.stringify([]));
        // navigate("/");
    } else {
        list = JSON.parse(stringifiedList);

    }
    var currentDate = new Date();
    var current_date = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate();
    var current_time = currentDate.getHours() + ":" + currentDate.getMinutes();

    var d1 = new Date(`${current_date}, ${current_time}`);

    const userMail = JSON.parse(localStorage.getItem('userEmail'));

    return (
        <div className="row" id={"myCards"}>

            {list.map((data, index) => {
                if (data.taskPriority === props.type && userMail === data.userEmail) {
                    console.log(data);
                    let d2 = new Date(`${data.taskDueDate}, ${data.taskDueTime}`)

                    return <div className="column" key={index} >
                        <div className="card">

                            <div className="row" id={"step1"}>
                                <div className="column" >
                                    {data.task}
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
                                    {d1 > d2 && data.taskPriority !== "Done" ? <div className="overdue">Overdue</div> : <div className=""></div>}


                                </div>
                                <div className="column" >
                                    <div className="square"></div>
                                    {d1 < d2 && data.taskPriority === "High" ? <div className="square"><img src={high} alt="High" width={50} /></div> : <div className="square"><img src={overd} alt="High" width={50} /></div>}
                                    {d1 < d2 && data.taskPriority === "Medium" ? <div className="square"><img src={medium} alt="High" width={50} /></div> : <div className=""></div>}
                                    {d1 < d2 && data.taskPriority === "Low" ? <div className="square"><img src={low} alt="High" width={50} /></div> : <div className=""></div>}
                                    {data.taskPriority === "Done" ? <div className="square"><img src={done} alt="High" width={50} /></div> : <div className=""></div>}
                                    {d1 < d2 && data.taskPriority === "Overdue" ? <div className="square"><img src={overd} alt="High" width={50} /></div> : <div className=""></div>}
                                </div>
                            </div>

                        </div>
                    </div>

                } return null
            })}
        </div>
    )

}