import React, { Component } from "react";
import axios from 'axios';
import TableRow from './TableRow';

export default class GetAttendanceRequest extends Component {

    constructor(props){
        super(props);
        this.state = { attendanceRequest:[]}
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:5000/getAttendance')
          .then(response => {
              console.log(response.data)
            this.setState({ attendanceRequest: response.data });
          })
          .catch(function (error) {
            console.log(error);
          })
      }

      tabRow(){
        return this.state.attendanceRequest.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        });
      }
  render() {
    return (
        <div>
          <h3 align="center">Your Attendance Request List</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>EMP ID</th>
                <th>EMPLOYEE NAME</th>
                <th>REPORTING PERSON</th>
                <th>FROM</th>
                <th>TO</th>
                <th>APPROVAL STATUS</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
        
    );
  }
}
