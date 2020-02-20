import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import AddAttendance from './components/addAttendance.component'
import GetAttendance from './components/getAttendanceRequest.component'
import ApproveAttendance from './components/attendanceApproval.component'
class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
            <Link to={'/'} className="navbar-brand">Attendance Request Portal</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={'/addattendance'} className="nav-link">Request Attendance</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/approve_attendance'} className="nav-link">Approve Attendance</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/attendance_request'} className="nav-link">Attendance Request List</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Switch>
            <Route exact path='/addattendance' component ={AddAttendance} />
            <Route path='/attendance_request' component={ GetAttendance } />
            <Route path='/approve_attendance' component={ ApproveAttendance } />
            <Route path='/' component={ GetAttendance } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;