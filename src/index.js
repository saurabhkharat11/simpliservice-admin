import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav } from 'react-bootstrap';
import {Router, Route, Switch} from 'react-router-dom';
import AdminHomeLogin from './adminLogin.js';
import AdminHome from './adminHome';
import history from './history';
import AddService from './addService';
import BookedServices from './bookedServices'

export default class NavbarB extends React.Component{
  constructor(){
    super();
    this.state = {
      firstname : undefined,
      lastname : undefined,
      isLoggedIn : false
     }
  }

  componentDidMount(){
    const f_name = sessionStorage.getItem("firstname");
    const l_name = sessionStorage.getItem("lastname");
    if(f_name !== null && l_name !== null)
    {
      this.setState({
      firstname: f_name,
      lastname : l_name,
      isLoggedIn : true
    });
    }
  }

  userLogout = (e) => {
    sessionStorage.clear();
    history.push("/");
  }

  activate = (e) => {


  }

  render(){
    return(<div>
      <Router history={history}>
       {this.state.isLoggedIn && <Navbar variant="dark" expand="lg" className = "fixed-top" style={{backgroundColor:"black",borderBottom : "2px solid black"}}>
              <Navbar.Brand href="/" style={{color:'white',fontFamily: 'Libre Franklin, sansSerif',fontWeight:'bold',marginRight:'40px',paddingBottom:'9px'}}>SimpliService Admin</Navbar.Brand>
                  <Nav className="mr-auto"></Nav>
                  <Nav className="justify-content-end">
                      <Navbar.Text className = "nav-element">
                        Signed in as: <a href="#login">{`${this.state.firstname} ${this.state.lastname}`}</a>
                      </Navbar.Text>
                      <Nav.Item>
                        <Nav.Link href="/" style={{fontFamily: 'Libre Franklin, sansSerif', color:'white', fontWeight:'550'}} onClick = {this.userLogout}>Logout</Nav.Link>
                      </Nav.Item>
                  </Nav>
          </Navbar>}

          {this.state.isLoggedIn && <div className="sidebar">
              <a name="add_service" href="/addService">Add Service</a>
              <a name="modify_service" href="/modifyService">Modify Service</a>
              <a name="booked_service" href="/bookedservices">Booked Services</a>
              <a name="search_service" href="#about">Search Service</a>
          </div>}

          <div>
            <Switch>
                <Route exact path="/" component={AdminHomeLogin} />
                <Route path="/adminHome" component={AdminHome} />
                <Route exact path="/addService" component={AddService} />
                <Route path="/bookedServices" component={BookedServices} />
            </Switch>
          </div>
          </Router>
    </div>)
  }

} 
ReactDOM.render(
  <React.StrictMode>
    <NavbarB/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
