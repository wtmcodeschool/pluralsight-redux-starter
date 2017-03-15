import React from 'react';
import {observer , inject} from 'mobx-react';
import { Button, Glyphicon } from 'react-bootstrap';

class AdministrationTableRow extends React.Component {

   constructor() {
     super();

     this.handleAdminToggle = this.handleAdminToggle.bind(this);
     this.handleDeleteUser = this.handleDeleteUser.bind(this);
   }

   handleAdminToggle(){
     this.props.userStore.toggleAdmin(this.props.x._id);
   }

   handleDeleteUser(){
    this.props.userStore.deleteUser(this.props.x._id);
   }

   render() {
     return (
       <tr key={this.props.x._id}>
         <td>{this.props.x.name}</td>
         <td>{this.props.x.isadmin.toString()}</td>
         <td><Button onClick={this.handleAdminToggle} bsStyle="success" block><Glyphicon glyph="asterisk"/></Button></td>
         <td><Button onClick={this.handleDeleteUser} bsStyle="danger" block><Glyphicon glyph="remove-circle"/></Button></td>
       </tr>
     );
   }
}

AdministrationTableRow.propTypes = {
  userStore: React.PropTypes.object,
  x: React.PropTypes.object
};

export default inject('userStore')(observer(AdministrationTableRow));
