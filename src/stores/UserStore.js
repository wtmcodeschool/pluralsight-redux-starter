import { extendObservable } from 'mobx';

export default class UserStore {
  constructor() {
    extendObservable(this, {
      username: "",
      token: "",
      isadmin: false,
      isloggedin: false,
      _idObject: null,
      userlist: []
    });
    this.saveNewUser = this.saveNewUser.bind(this);
    this.authenticateUser = this.authenticateUser.bind(this);
    this.logUserOut = this.logUserOut.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.toggleAdmin = this.toggleAdmin.bind(this);
  }

  toggleAdmin(userid){
    fetch('/users'+userid, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(result => result.json());
  }

  deleteUser(userid){
    fetch('/users'+userid, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(result => result.json());
  }

  fetchUsers(){
    fetch(`/users`)
    .then(result => result.json())
    .then(data => {this.userlist = data;});
  }

  logUserOut(){
    this.token = "";
    this.username = "";
    this.isloggedin = false;
    this.isadmin = false;
    this._id = "";
  }

  saveNewUser(user){
    fetch('/newuser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user.name,
        password: user.password
      })
    }).then(result => result.json()).then(res => {this.username = res.name;});
  }

  authenticateUser(user) {
    // console.log(name + " " + password);
    fetch('/authenticate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user.name,
        password: user.password
      })
    })
    .then(result => result.json())
    .then( res => {
      if(res.token){
        this.token = res.token;
        this.username = user.name;
        this.isloggedin = true;
        this.isadmin = res.isadmin;
        this._id = res._id;
      }else{
        this.isloggedin = false;
        this.name = "";
      }
    });
  }

}
