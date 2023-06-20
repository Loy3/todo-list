import { useNavigate } from "react-router-dom";
import close from "../Assets/Icons/cancel.png";

export default function NavBar() {

    const navigate = useNavigate();

   /* function toHome() {
        navigate("/home");
    }


    function toAdd() {
        navigate("/add");
    }*/

    function signOut() {
        localStorage.setItem('userStatus', JSON.stringify(false));
        localStorage.setItem('user', JSON.stringify(""));
        localStorage.setItem('userEmail', JSON.stringify(""));


        navigate("/");
        window.location.reload();
    }

    let allUsers = [];
    const stringifiedUser = localStorage.getItem('user');
    if (stringifiedUser === "" || stringifiedUser === null) {
        localStorage.setItem('user', JSON.stringify([]));
        // navigate("/");
    } else {
        allUsers = JSON.parse(stringifiedUser);
        allUsers = [allUsers];
    }

    //Open and close popup
    function openForm2() {
        document.getElementById("popup2").style.display = "block";

    }

    function closeForm2() {
        document.getElementById("popup2").style.display = "none";
        // window.location.reload();
    }
    //end of open and close popup

    return (<>
        <nav>
            <div className='nav-wrap'>

                <div className="topnav" id="myTopnav">
                    <div className="row">
                        <div className='column1'>
                            <div className="topnav-left">
                                <h1 id={"logo"}>Hello {allUsers[0].userFirstName}</h1>
                            </div>
                        </div>
                        <div className='column3'>
                            <div className="topnav-right">
                                <button onClick={openForm2}>Sign Out</button>
                            </div>
                        </div>
                        {/* <div className='column2'>
                            <div className="topnav-center" id="topnav-center" align="center">
                                <a href='' onClick={toHome}>Home</a>
                                <a href='' onClick={toAdd}>Add a to-do</a>
                            </div>
                        </div> */}

                    </div>
                </div>
            </div>
        </nav >

        <div id={"popup2"}>
            <div className="mypopup">
                <div className="box" id={"box"}>
                    <div>
                        <img src={close} alt="close" onClick={closeForm2} />
                    </div>
                    <h1>
                        Sign Out
                    </h1>
                    <p>
                        Click on the button bellow to sign out!
                    </p>
                    <button onClick={signOut}> Sign Out</button>
                </div>
            </div>
        </div>

    </>
    );
}