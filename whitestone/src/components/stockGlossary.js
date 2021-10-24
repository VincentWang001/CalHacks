import React, { Component } from 'react';
import styled from 'styled-components';

const StyledH1 = styled.h1`
    font-weight: bold;
    font-size: 50px;
    color: skyblue;
    font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;
    text-align: center;
`

const StyledP = styled.p`
    font-weight: bold;
    font-size: 25px;
    color: skyblue;
    font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;
    text-align: center;
`

const Warning = styled.h2`
    margin-top: 30px;
    font-weight: bold;
    color: #E46C6C;
    font-size: 20px;
    font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;
`

const Success = styled.h2`
    margin-top: 30px;
    font-weight: bold;
    color: #DDEEDD;
    font-size: 20px;
    font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;
`


class Glossary extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            dict: {
                "AMAZON": "AMZN",
                "APPLE": "APPL",
                "GAMESTOP": "GME",
                "GOOGLE": "GOOGL",
                "FACEBOOK": "FB",
                "MICROSOFT": "MSFT",
                "NETFLIX": "NFLX",
                "NVIDIA": "NVDA",
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
            name: e.target.value.toUpperCase()
        });
    }

    handleSubmit = e => {
        this.setState({
            isSubmitted: true
        })
        const name = this.state.name;
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
                                placeholder="ex: TESLA"
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
                    <Success>
                        {this.state.acronym}
                    </Success>
                }
                {this.state.validSubmission == -1 && 
                    <Warning>
                        The name you entered did not match any names in our database.
                    </Warning>
                }
            </div>
        )
    }
}

export default Glossary;