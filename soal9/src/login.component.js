import React, { Component,useState } from 'react'
export default class Login extends Component {
    // nextPath() {
    //     this.props.history.push("signup");
    //   }
    constructor(props){    
        
        super(props);
        this.state = {
            username: JSON.parse(localStorage.getItem('username')) ?? '',
            password:  '' ,
            state: JSON.parse(localStorage.getItem('username')) ? 'home':'login'
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChangeName(event) {
        this.setState({username: event.target.value});
    }
    
    handleChangePass(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        localStorage.setItem('username', JSON.stringify(this.state.username));
        event.preventDefault();
    }
    checkLogin(){
        console.log(this.state)
        this.setState({state: 'home'});
        localStorage.setItem('username', JSON.stringify(this.state.username));
    }
    
    LogOut(){
        console.log(this.state)
        localStorage.clear()
        this.setState({state: 'login'});
    }
  render() {
    if(this.state.state == 'login')
    return (
      <form>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={this.state.username}
            onChange={this.handleChangeName}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleChangePass}
            // value={pass}
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="button" onClick={() => this.checkLogin() } className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    )
    else 
    return (
        
      <form>
      <h3>Selamat Datang {this.state.username}</h3>
      <div className="d-grid">
        <button type="button" onClick={() => this.LogOut() } className="btn btn-primary">
          LogOut
        </button>
      </div>

    </form>
    )
  }
}

// import {withRouter} from 'react-router-dom';