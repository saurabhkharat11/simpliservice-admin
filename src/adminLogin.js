import firebase from './Firebase';
import './adminLogin.css';
import React from 'react';
import {Container, Form, InputGroup, FormControl, Button} from 'react-bootstrap';
import history from './history';
import NavbarB from './index';
import ReactDOM from 'react-dom';


export default class AdminHomeLogin extends React.Component {
    constructor(){
        super();
        this.ref = firebase.firestore().collection('registered-admins');
        this.state = {
            email : null ,
            password : null,
            docId : null
        };
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onLogin = (e) => {
        e.preventDefault();
        let admin_regData = undefined;
        const {email, password} = this.state;
        this.ref.where("email","==",email).where("password","==",password).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                admin_regData = doc.data();
                console.log(admin_regData);
            });
                if(admin_regData.email === email && admin_regData.password === password)
                {
                    alert("Login Successfull");
                    sessionStorage.setItem("firstname",admin_regData.firstname);
                    sessionStorage.setItem("lastname",admin_regData.lastname);
                    ReactDOM.render(<NavbarB />,document.getElementById("root"));
                    history.push("/adminHome");
                }
                else
                {
                    alert("INCORRECT CREDENTIALS!!");
                }
            
        });


    }
    

    render(){
        const {email, password} = this.state;
        return(<div>
            <Container id="main-container">
                <h3><strong>SimpliService</strong> Admin</h3>
                <Form onSubmit = {this.onLogin}>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">📧</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="E-mail"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name = "email"
                        value = {email}
                        onChange = {this.onChange}
                    />
                </InputGroup>

                <InputGroup className="mb-3" >
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon2">🔒</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl type="password"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        name = "password"
                        value = {password}
                        onChange = {this.onChange}
                    />
                </InputGroup>


                <Button variant="primary" type="submit" id="login-button" onClick={this.onLogin}>
                    Login
                </Button>
                <hr />
                <a href="/">Register as Admin</a>
            </Form>
            </Container>

            

        </div>);
    }
}