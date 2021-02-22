import React, {Component} from 'react';
import './addService.css';
import {Button, Form, Row, Col} from 'react-bootstrap';
import firebase from './Firebase';
import history from './history';

export default class AddService extends Component {
    constructor(){
        super();
        this.ref = firebase.firestore().collection('available-services');
        this.state = {
            service_name : null,
            service_desc : null,
            service_cost : null
        };
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {service_name, service_desc, service_cost} = this.state; 
        this.ref.add({service_cost , service_desc , service_name }).then((docRef) => {
           this.setState({
                service_name : null,
                service_desc : null,
                service_cost : null 
            });
            alert("Service Added Successfully!");
            Location.reload();
        }).catch((error) => {
            console.log("Error in Adding Service!", error);
        });
    }



    render(){
        const {service_name, service_desc, service_cost} = this.state;
        return(<div>
            <div class="content">
                <h2><strong>Add New Service</strong></h2>
                <Form >
                <Row>
                    <Col sm="2"></Col>
                    <Col sm="8"><Form.Control type="text" placeholder="Service Name" name="service_name" onChange={this.onChange} value={service_name}/></Col>
                    <Col sm="2"></Col>
                </Row>
                <br />
                <Row>
                    <Col sm="2"></Col>
                    <Col sm="8"><Form.Control as="textarea" rows={3} placeholder="Service Description" name="service_desc" onChange={this.onChange} value={service_desc}/></Col>
                    <Col sm="2"></Col>
                </Row>
                <br />
                <Row>
                    <Col sm="2"></Col>
                    <Col sm="8"><Form.Control type="Number" placeholder="Service Cost" name="service_cost" onChange={this.onChange} value={service_cost}/></Col>
                    <Col sm="2"></Col>
                </Row>
                </Form>
                <Button variant="primary" type="submit" id="add-service-button" onClick={this.onSubmit}>
                    Add Service
                </Button>
            </div>
            
        </div>)
    }
}