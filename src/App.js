import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import HomePage from './Components/HomePage';
import { useEffect, useState } from 'react';

function App() {
  const signedIn = localStorage.getItem("userStatus");
  let userStat = false;
  if (signedIn === '' || signedIn === null) {
    localStorage.setItem('userStatus', JSON.stringify(false))
  } else {
    userStat = JSON.parse(signedIn);

  }

  const [isSignedIn, setSignIn] = useState(userStat);
  const status = localStorage.getItem("user");
  console.log(isSignedIn);
  // const userStatus = () => {
  //   setSignIn((isSignedIn) => [isSignedIn]);
  //   console.log(isSignedIn);

  // }
  // useEffect(() => {
  //   setSignIn(true)
  // }, [isSignedIn])

  let lists = "";
  const stringifiedlist = localStorage.getItem('lists');
  if (stringifiedlist === "" || stringifiedlist === null) {
    localStorage.setItem('lists', JSON.stringify([]));
  } else {
    lists = JSON.parse(stringifiedlist);
  }


  const [newList, setList] = useState(lists);

  const list = (task, taskDescipt, taskPriority, taskDueDate, userEmail) => {
    setList((newList) => [...newList, { task: task, taskDescipt: taskDescipt, taskPriority: taskPriority, taskDueDate: taskDueDate, userEmail: userEmail }]);
    console.log(newList);

  }
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(newList))
  }, [newList])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isSignedIn ? <HomePage addNewList={list} /> : <SignIn setSignIn={setSignIn} />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<HomePage addNewList={list}/>} />
{/* <Route path='/home' element={<HomePage addNewList={list}/>} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
