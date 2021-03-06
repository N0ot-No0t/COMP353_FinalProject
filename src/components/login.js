import React, { Component } from "react";
import UserDataService from "../services/userService";


export default class Login extends Component {

    onChange = (e) => {
        /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
        this.setState({ [e.target.name]: e.target.value });
      }

    onSubmit = (e) => {
      e.preventDefault();
      // get our form data out of state
      // const { fName, lName, email, password } = this.state;
      
      this.setState({redirect: true});

      var data = {
          email: this.state.email,
          password: this.state.password,
          userID: null,
          firstName: null,
          lastName: null,
          isFrozen: 0,
          userType: null

      }
      var user;
      UserDataService.verifyUser(data.email, data.password)
          .then(response => {
            user = response.data;
            console.log(user);
            data = {
                email: user.email,
                password: user.password,
                userID: user.userID,
                firstName: user.firstName,
                lastName: user.lastName,
                isFrozen: user.isFrozen,
                userType: user.userType
            }
          })
          .catch(e => {
            console.log(e);
          });
          console.log(data);
        // var {usersArray} = this.state;

    }

    render() {

        // if (this.state.redirect) {
        //     if(data.userType == "employer")
        //      return <Redirect push to="/Employer" />;
        //   }

        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email" onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}