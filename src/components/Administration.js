import React from 'react';
import {observer , inject} from 'mobx-react';
import {Jumbotron, Well, Table, Button, Glyphicon} from 'react-bootstrap';
import AdministrationTableRow from './AdministrationTableRow';

class Administration extends React.Component {

   constructor() {
     super();

     this.createAdministrationComponenet = this.createAdministrationComponenet.bind(this);
     this.createTableRows = this.createTableRows.bind(this);
    }

   createTableRows(){
     this.props.userStore.fetchUsers();
     let userNames = this.props.userStore.userlist.map(function(x){
       return(<AdministrationTableRow key={x._id} x={x}/>);
     }, this);

     return userNames;
   }

   createAdministrationComponenet(){
     let tableRows = this.createTableRows();
     if(this.props.userStore.isadmin){
       return(
         <Well>
           <h1>Administration </h1>
           <Table striped bordered condensed hover>
             <thead>
               <tr>
                 <th>Username</th>
                 <th>Is Admin?</th>
                 <th>Toggle Admin</th>
                 <th>Delete User</th>
               </tr>
             </thead>
             <tbody>
                {tableRows}
             </tbody>
           </Table>
         </Well>
       );
     }else{
       return(
         <Well>
           <h1>You Must Be Admin To Access... How did you get here?</h1>
         </Well>
       );
     }
   }

   render() {
     let administrationComponent = this.createAdministrationComponenet();

     return (
       <Jumbotron className="col-md-12">
        {administrationComponent}
       </Jumbotron>
     );
   }
}

Administration.propTypes = {
  userStore: React.PropTypes.object,
  imageStore: React.PropTypes.object
};

export default inject('imageStore', "userStore")(observer(Administration));
