import React, {Component} from 'react';
import './App.css';
import {Button, Form, FormGroup, Input, Card, Col} from 'reactstrap';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: ""
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

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
            [name]: value
    });
};

  render() {
    return (
      <div style= {{padding: "2%"}}>
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
          <Input value={this.state.firstname} onChange={this.handleInputChange} name = "firstname" type = "firstname" placeholder="First Name"/>
        </FormGroup>
        <FormGroup>
          <Input value={this.state.lastname} onChange={this.handleInputChange} name = "lastname" type = "lastname" placeholder="Last Name"/>
        </FormGroup>
        <FormGroup>
          <Input value={this.state.email} onChange={this.handleInputChange} name = "email" type = "email" placeholder="Email"/>
        </FormGroup>
        <FormGroup>
          <Input value={this.state.password} onChange={this.handleInputChange} name ="password" type = "password" placeholder="Password"/>
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
