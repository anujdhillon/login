import React, {Component} from 'react';
import './App.css';
import {Button, Form, FormGroup, Input, Card, Col, FormFeedback} from 'reactstrap';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import logo from './logo.png'
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      touched: {
        firstname: false,
        lastname: false,
        password: false,
        email: false
    }
    };
    this.submit = this.submit.bind(this)   
  }
fbclick = () =>{

}

  responseFacebook = (response) => {
    console.log(response)
    alert("Signed up with the name "+response.name);
}

  responseGoogle = (response) => {
    console.log(response)
    alert("Signed up with the name "+response.profileObj.name);
  }

  async submit() {
    const url = 'https://reqres.in/api/register';
    const response = await fetch(url,{
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    });
    const data = await response.json();
    console.log(data);
    alert("User: "+this.state.firstname+" "+this.state.lastname+" registered.\n"+"ID: "+data.id+"\nToken: "+data.token)
  }  

  validate(firstname, lastname, password, email) {
    const errors = {
        firstname: '',
        lastname: '',
        telnum: '',
        email: ''
    };

    if (this.state.touched.firstname && firstname.length < 3)
        errors.firstname = 'First Name should be >= 3 characters';
    else if (this.state.touched.firstname && firstname.length > 10)
        errors.firstname = 'First Name should be <= 10 characters';

    if (this.state.touched.lastname && lastname.length < 3)
        errors.lastname = 'Last Name should be >= 3 characters';
    else if (this.state.touched.lastname && lastname.length > 10)
        errors.lastname = 'Last Name should be <= 10 characters';

    if (this.state.touched.password && password.length <8)
        errors.password = 'Password should be at least 8 characters long';

    if(this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)
        errors.email = 'Email should contain a @';

    return errors;
}

handleBlur = (field) => (evt) => {
  this.setState({
      touched: { ...this.state.touched, [field]: true }
  });
}

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
            [name]: value
    });
};

  render() {
    const errors = this.validate(this.state.firstname, this.state.lastname, this.state.password, this.state.email);
    return (
      <div style= {{padding: "2%"}}>
      <img className="brandlogo" src = {logo} alt="Insert Company Logo" width = "150" height= "40"/>  
      <Col lg={{ size: 6, offset: 3 }} md = {{ size: 8, offset: 2 }}>
      <Card>
      <div style= {{width: "75%",margin:"auto"}}>
      <Form>
        <div style = {{textAlign:"center", margin:"auto"}}>
          <h6 style = {{fontVariant: "small-caps", paddingBottom:"10px"}}>SIGN UP</h6>
          <h2>Create your account</h2>
          <p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel ipsum nec ligula dictum maximus.</p>
        </div>
        <FacebookLogin
    appId="908794199936564"
    autoLoad={true}
    fields="name,email"
    callback={this.responseFacebook}
    cssClass="btn btn-light fb-btn"
    icon="icon-fb"
    textButton ="Sign up using Facebook"
  />
  <GoogleLogin
    clientId = "986126981752-bqk4k0imv3a3dta7isfsegethe0npdmo.apps.googleusercontent.com"
    render={renderProps => (
      <button onClick={renderProps.onClick} className="btn btn-light google-btn" ><i class = "icon-google"></i>Sign up using Google</button>
    )}
    buttonText = "Sign up using Google"
    onSuccess = {this.responseGoogle}
    onFailure = {this.responseGoogle}
    cookiePolicy={'single_host_origin'}
    
  />
        <div className="divider">
          <span>or</span>
        </div>
        <FormGroup>
          <Input value={this.state.firstname} onChange={this.handleInputChange} valid = {errors.firstname === ''} invalid = {errors.firstname !== ''} onBlur = {this.handleBlur('firstname')} name = "firstname" type = "firstname" placeholder="First Name"/>
          <FormFeedback>{errors.firstname}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input value={this.state.lastname} onChange={this.handleInputChange} valid = {errors.lastname === ''} invalid = {errors.lastname !== ''} onBlur = {this.handleBlur('lastname')} name = "lastname" type = "lastname" placeholder="Last Name"/>
          <FormFeedback>{errors.lastname}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input value={this.state.email} onChange={this.handleInputChange} valid = {errors.email === ''} invalid = {errors.email !== ''} onBlur = {this.handleBlur('email')} name = "email" type = "email" placeholder="Email"/>
          <FormFeedback>{errors.email}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input value={this.state.password} onChange={this.handleInputChange} valid = {errors.password === ''} invalid = {errors.password !== ''} onBlur = {this.handleBlur('password')} name ="password" type = "password" placeholder="Password"/>
          <FormFeedback>{errors.password}</FormFeedback>
        </FormGroup>
      </Form>
      <div style={{textAlign:"center"}}>
      <span>By clicking Sign Up, you agree to our</span> <span style= {{color:"lightskyblue"}}>Terms of Use </span><span>and our </span><span style= {{color:"lightskyblue"}}>Privacy Policy</span>
      </div>
      <Button onClick={ () => this.submit()} type="submit" style = {{fontVariant: "small-caps",margin:"30px 0", borderColor:"#4CB4E4", backgroundColor:"#4CB4E4"}} className = "btn-block">sign up</Button>
      </div>
      </Card>
      </Col>
      </div>
    );
  }
}

export default App;
