import React from 'react'
import ReactDOM from 'react-dom/client'
import FunctionalChat from './Chat'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/app" element={<FunctionalChat/>}/>
        </Routes>
      </Router>
    </div>
  </React.StrictMode>,
)
