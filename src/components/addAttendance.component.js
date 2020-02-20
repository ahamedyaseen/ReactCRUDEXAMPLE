import React, { Component } from "react";
import {Modal, Button} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";



export default class AddAttendance extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmployeeName = this.onChangeEmployeeName.bind(this);
    this.onChangeReportingPersonName = this.onChangeReportingPersonName.bind(
      this
    );
    this.onChangeEmployeeId = this.onChangeEmployeeId.bind(this);
    this.onChangeReportingPersonId = this.onChangeReportingPersonId.bind(this);
    this.onChangeAttendanceFromTime = this.onChangeAttendanceFromTime.bind(
      this
    );
    this.onChangeAttendanceToTime = this.onChangeAttendanceToTime.bind(this);
    this.onChangeReason = this.onChangeReason.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.close = this.close.bind(this);
    this.open= this.open.bind(this);
    this.state = {
      employee_name: "",
      employee_id: "",
      reporting_person_name: "",
      reporting_person_id: "",
      attendance_reason :"",
      fromDate: new Date(),
      toDate: new Date()
    };
  }

  onChangeEmployeeName(e) {
    this.setState({
      employee_name: e.target.value
    });
  }
  onChangeEmployeeId(e) {
    this.setState({
      employee_id: e.target.value
    });
  }
  onChangeReportingPersonName(e) {
    this.setState({
      reporting_person_name: e.target.value
    });
  }
  onChangeReportingPersonId(e) {
    this.setState({
      reporting_person_id: e.target.value
    });
  }
  onChangeAttendanceFromTime(e) {
    this.setState({
      attendance_from_time: e.target.value
    });
  }
  onChangeAttendanceToTime(e) {
    this.setState({
      attendance_to_time: e.target.value
    });
  }
  onChangeReason(e) {
    this.setState({
      attendance_reason: e.target.value
    });
  }
  onChangeFromTime(e) {
    this.setState({
        attendance_from_time: e
    });
  }
  onChangeToTime(e) {
    this.setState({
        attendance_to_time: e
    });
  }

  close() {
    this.setState({ showModal: false });
    window.location.reload();
  }

  open() {
    this.setState({ showModal: true });
  }

  formatDate(date){
    return  (("0" +date.getDate()).slice(-2)+"/"+
    ("0"+(date.getMonth()+1)).slice(-2)+"/"+
    ("0"+date.getFullYear()).slice(-2)+" "+
    ("0"+date.getHours()).slice(-2)+":"+
    ("0"+date.getMinutes()).slice(-2));
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(
      `The values are ${this.state.employee_name}, ${this.state.employee_id}, and ${this.state.reporting_person_name}, and ${this.state.attendance_from_time}, and ${this.state.attendance_to_time}`
    );
    let from_date = this.formatDate(this.state.attendance_from_time);
    let to_date =  this.formatDate(this.state.attendance_to_time);

    
    console.log(from_date)

    const obj = {
      employee_name: this.state.employee_name,
      employee_id: this.state.employee_id,
      reporting_person_name: this.state.reporting_person_name,
      reporting_person_id: this.state.reporting_person_id,
      attendance_from_time: from_date,
      attendance_to_time: to_date,
      approval_status: "Pending",
      reason: this.state.attendance_reason
    };
    console.log(obj);
    axios
      .post("http://127.0.0.1:5000/addAttendance", obj,{headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'}})
      .then(res => {
          console.log("res");
          if(res.status == 201){
              console.log("ahamed+++++");
              this.open()
              this.setState(
                  {
                    response_value :"Sucessfully placed  attendance request"
                  }
              );

          }
          else{
            this.setState(
                {
            response_value :"Please try again Later"
                });
          }

      }
      
      
      );
      
      

    this.setState({
        employee_name: "",
        employee_id: "",
        reporting_person_name: "",
        reporting_person_id: "",
        attendance_reason :"",
        fromDate: new Date(),
        toDate: new Date()
    });
  }
  state = {
    startDate: new Date(),
    showModal: false
  };

  handleFromChange = date => {
    this.setState({
      fromDate: date,
      attendance_from_time: date
    });
  };

  handleToChange = date => {
    this.setState({
      toDate: date,
      attendance_to_time: date
    });
  };

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Request Attendance Timings</h3>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>Employee Name: </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.onChangeEmployeeName}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Employee ID: </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.onChangeEmployeeId}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>Reporting Person: </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.onChangeReportingPersonName}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Reporting Person ID: </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.onChangeReportingPersonId}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label>Attendance From Date: </label>
                <div>
                  <DatePicker
                    className="form-control"
                    selected={this.state.fromDate}
                    onChange={this.handleFromChange}
                    showTimeSelect
                    timeFormat="hh:mm aa"
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="MMMM d, yyyy hh:mm aa"
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Attendance To Date: </label>
                <div>
                  <DatePicker
                    className="form-control"
                    selected={this.state.toDate}
                    onChange={this.handleToChange}
                    showTimeSelect
                    timeFormat="hh:mm aa"
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="MMMM d, yyyy hh:mm aa"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Reason: </label>
            <input
              type="text"
              className="form-control"
              onChange={this.onChangeReason}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Request Attendance"
              className="btn btn-primary"
            />
          </div>
        </form>
        
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header >
            <Modal.Title>Attendance Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{this.state.response_value}</p>
           
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>OK</Button>
          </Modal.Footer>
        </Modal>


      </div>
    );
  }
}


