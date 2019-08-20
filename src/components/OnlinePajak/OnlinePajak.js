import React, {Component} from 'react';
import LogoOnlinePajak from './../../images/logo.png';
import {Container, Form, Button, Input, FormGroup, Row, Col} from 'reactstrap';

class OnlinePajak extends Component{

    state = {
        income : null,
        relief: null,
        annualTaxableIncome : null,
        tax : null,
    }

    incomeChange = (e) =>{
        e.preventDefault();
        this.setState({
            income: e.target.value
        })
    };

    reliefChange = (e) =>{
        e.preventDefault();
        console.log('Relief: ', e.target.value);
        this.setState({
            relief: e.target.value
        })
    }

    incomeSubmit = (e) =>{
        e.preventDefault();
        let annualTaxIncome = null;
        
        let annualTaxableIncome = ((this.state.income*12)-this.state.relief);
        this.setState({
            annualTaxableIncome : annualTaxableIncome
        });

        if (annualTaxableIncome > 500000000 ){
            annualTaxIncome = (50000000 * 0.05 ) + (200000000 * 0.15) + (250000000 * 0.25) + ((annualTaxableIncome-500000000) * 0.3);
            this.setState({
                tax: annualTaxIncome
            });
        } else if (annualTaxableIncome > 250000000 && annualTaxableIncome <= 500000000){
            annualTaxIncome = (50000000 * 0.05) + (200000000 * 0.15) + ((annualTaxableIncome-250000000)* 0.25);
            this.setState({
                tax: annualTaxIncome
            })
        } else if (annualTaxableIncome > 50000000 && annualTaxableIncome <= 250000000){
            annualTaxIncome = (50000000 * 0.05) + ((annualTaxableIncome - 50000000)* 0.15);
            this.setState({
                tax: annualTaxIncome
            });
        } else if (annualTaxableIncome > 0 && annualTaxableIncome <= 50000000){
            annualTaxIncome = ((annualTaxableIncome - 0)*0.05);
            this.setState({
                tax: annualTaxIncome
            });
        };
    };

    render(){
        return(
             <Container className="App">
                <img src={LogoOnlinePajak} alt="logo"></img>
                <h3 className="mb-4">Input your data</h3>
                <Form className="form" onSubmit={this.incomeSubmit} className="mb-3">
                <Col>
                    <FormGroup>
                        <Input onChange={this.incomeChange} type="number" id="income" className="text-center" placeholder="monthly salary"/>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <select onChange={this.reliefChange} className="text-center">
                            <option>Select One</option>
                            <option value="54000000">Single</option>
                            <option value="58500000">Married with 0 dependant</option>
                            <option value="63000000">Married with 1 dependant</option>
                            <option value="67500000">Married with 2 dependant</option>
                            <option value="72000000">Married with 3 dependant</option>
                        </select>
                    </FormGroup>
                </Col>
                <Button type="submit">Submit</Button>
                </Form>

                {/* <h2>Relief = {this.state.relief}</h2> */}
                {/* <h2>Monthly Income = {this.state.income}</h2> */}
                <p className="lead text-muted">Annual Taxable Income :</p> <h1 className="text-success">{this.state.annualTaxableIncome}</h1>
                <p className="lead text-muted">Annual Income Tax : </p> <h1 className="text-success">{this.state.tax}</h1>
            </Container>
        );
    }
}

export default OnlinePajak;
