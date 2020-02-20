import React, { Component } from "react";
import axios from "axios";
import {Dropdown,ButtonGroup,Button, DropdownButton} from "react-bootstrap";

//import { FontAwesomeIcon } from "font-awesome";


class TableRow extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.approve = this.approve.bind(this);
    this.notApprove = this.notApprove.bind(this);
  }
  delete() {
    axios
      .get("http://127.0.0.1:5000/deleteRequest?id=" + this.props.obj._id)
      .then(console.log("Deleted"))
      .catch(err => console.log(err));
  }
  approve(){
    axios
    .get("http://127.0.0.1:5000/approve?id=" + this.props.obj._id+"&approve=yes")
    .then(console.log("approved"))
    .catch(err => console.log(err));
    window.location.reload();
  }
  notApprove(){
    axios
    .get("http://127.0.0.1:5000/approve?id=" + this.props.obj._id+"&approve=no")
    .then(console.log("not approved"))
    .catch(err => console.log(err));
    window.location.reload();
  }
  render() {
    return (
      <tr>
        <td>{this.props.obj.employee_id}</td>
        <td>{this.props.obj.employee_name}</td>
        <td>{this.props.obj.reason}</td>
        <td>{this.props.obj.reporting_person_name}</td>
        <td>
            {this.props.obj.attendance_from_time}
          </td>
          <td>
            {this.props.obj.attendance_to_time}
          </td>
        <td>
        <Dropdown as={ButtonGroup}>
  <Button variant="success" onClick={this.approve}>Approve</Button>

  <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-2" onClick={this.notApprove}><i  class="fa fa-check"/>Not Approve</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
        </td>
        {/* <td>
          <button onClick={this.delete} className="btn btn-danger">
            Delete
          </button>
        </td> */}
      </tr>
    );
  }
}

export default TableRow;
