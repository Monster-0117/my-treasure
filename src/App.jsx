import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Logon from './pages/logon'
import Home from './pages/Home'
import StudentList from './pages/StudentList'

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/logon" element={<Logon></Logon>}></Route>
          <Route path="/studentList" element={<StudentList></StudentList>}></Route>

        </Routes>
      </Router>
    </div>
  )
}