import React, { Component } from 'react';
import axios from 'axios';

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        axios.get('http://127.0.0.1:5000/deleteRequest?id='+this.props.obj._id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
    }
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.employee_id}
          </td>
          <td>
            {this.props.obj.employee_name}
          </td>
          <td>
            {this.props.obj.reporting_person_name}
          </td>
          <td>
            {this.props.obj.attendance_from_time}
          </td>
          <td>
            {this.props.obj.attendance_to_time}
          </td>
          <td>
            {this.props.obj.approval_status}
          </td>
          
          {/* <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td> */}
        </tr>
    );
  }
}

export default TableRow;