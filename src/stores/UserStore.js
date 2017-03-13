import { extendObservable } from 'mobx';

export default class UserStore {
  constructor() {
    extendObservable(this, {
      username: "",
      token: "",
      isadmin: false,
      isloggedin: false,
      _idObject: null
    });
    this.saveNewUser = this.saveNewUser.bind(this);
    this.authenticateUser = this.authenticateUser.bind(this);
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
