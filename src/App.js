import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import HomePage from './Components/HomePage';
import { useEffect, useState } from 'react';
import UpdateTask from './Components/UpdateTask';
import ViewByType from './Components/ViewByType';

function App() {
  const signedIn = localStorage.getItem("userStatus");
  let userStat = false;
  if (signedIn === '' || signedIn === null) {
    localStorage.setItem('userStatus', JSON.stringify(false))
  } else {
    userStat = JSON.parse(signedIn);

  }

  const [isSignedIn, setSignIn] = useState(userStat);

  let lists = [];
  const stringifiedlist = localStorage.getItem('lists');
  if (stringifiedlist === "" || stringifiedlist === null) {
    localStorage.clear();
    localStorage.setItem('lists', JSON.stringify([]));
  } else {
    lists = JSON.parse(stringifiedlist);
  }
  

  let users = "";
  const stringifiedUser = localStorage.getItem('users');
  if (stringifiedUser === "" || stringifiedUser === null) {
    localStorage.setItem('users', JSON.stringify([]));
  } else {
    users = JSON.parse(stringifiedUser);
  }



  const [newList, setList] = useState(lists);

  const list = (task, taskDescipt, taskPriority, taskDueDate, taskDueTime, userEmail) => {
    setList((newList) => [...newList, { task: task, taskDescipt: taskDescipt, taskPriority: taskPriority, taskDueDate: taskDueDate, taskDueTime: taskDueTime, userEmail: userEmail }]);
    console.log(newList);
  }
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(newList))
  }, [newList])


  const [newUsers, setUser] = useState(users);
  const nUser = (userFirstName, userLastName, userEmail, userPosition, password) => {
    setUser((newUsers) => [...newUsers, { userFirstName: userFirstName, userLastName: userLastName, userEmail: userEmail, userPosition: userPosition, password: password }]);
    console.log(newUsers);
  }
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(newUsers))
  }, [newUsers])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isSignedIn ? <HomePage addNewList={list} /> : <SignIn setSignIn={setSignIn} />} />
        <Route path='/signup' element={<SignUp signUpF={nUser} />} />
        <Route path='/home' element={isSignedIn ? <HomePage addNewList={list} /> : <Navigate to="/" />} />
        {/* <Route path='/home' element={<HomePage addNewList={list}/>} /> */}
        <Route path='/update' element={isSignedIn ? <UpdateTask /> : <Navigate to="/" />} />
        <Route path='/view' element={isSignedIn ? <ViewByType /> : <Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
