import { useNavigate } from "react-router-dom";

export default function NavBar() {

    const navigate = useNavigate();

    function toHome() {
        navigate("/home");
    }


    function toAdd() {
        navigate("/add");
    }

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

    return (
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
                                <button onClick={signOut}>Sign Out</button>
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
    )
}