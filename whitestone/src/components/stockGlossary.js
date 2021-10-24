import React, { Component } from 'react';
import styled from 'styled-components';

const StyledH1 = styled.h1`
    font-weight: bold;
    font-size: 50px;
    color: white;
    font-family: "Times New Roman", Times, Serif;
`

const StyledP = styled.p`
    font-weight: bold;
    font-size: 25px;
    color: #D2B48C;
    font-family: "Times New Roman", Times, Serif;
`
class Glossary extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            dict: {
                "AMAZON": "AMZN",
                "GOOGLE": "GOOGL",
                "TESLA": "TSLA",
            },
            validSubmission: 0,
            name: '',
            acronym: '',
            isSubmitted: false
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    handleSubmit = e => {
        this.setState({
            isSubmitted: true
        })
        const name = this.state.name;
        //name = name.slice();
        console.log(name);
        //name = name.toUpperCase();
        var dict = this.state.dict;
        if (name in dict) {
            this.setState({
                acronym: dict[name],
                validSubmission: 1
            })
        } else {
            this.setState({
                validSubmission: -1
            })
        }

        //this.forceUpdateHandler();
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <StyledH1>Stock Glossary</StyledH1>
                <StyledP>Welcome to the Stock Glossary! Simply enter the name of the company you want and its acronym will be outputted below if it exists in our database!</StyledP>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                placeholder="ex: Tesla"
                                value={this.state.name}
                                onChange={this.onChangeName}
                            />
                        </div>
                        <p></p>
                        <p></p>
                        <div className="form-group">
                            <input type="submit"
                                value="Generate Acronym!"
                                className="btn btn-primary"
                                // onChange={this.onNameSubmit}
                            />
                        </div>
                    </form>
                </div>
                {this.state.validSubmission == 1 && 
                    <StyledP>
                        {this.state.acronym}
                    </StyledP>
                }
                {this.state.validSubmission == -1 && 
                    <StyledP>
                        The name you entered did not match any names in our database.
                    </StyledP>
                }
            </div>
        )
    }
}

export default Glossary;