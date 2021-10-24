import React from 'react';
import Plot from 'react-plotly.js';
import StockFinder from './finance';
import styled from 'styled-components';

const StyledH1 = styled.h1`
    font-weight: bold;
    font-size: 50px;
    font-family: "Times New Roman", Times, Serif;
`
const StyledH2 = styled.h2`
    font-weight: bold;
    font-size: 20px;
    font-family: "Times New Roman", Times, Serif;
`

const Warning = styled.h2`
    font-weight: bold;
    color: #E46C6C;
    font-size: 20px;
    font-family: "Times New Roman", Times, Serif;
`

const PadTop = styled.p`
    padding-top: 50px;
`
const StyledP = styled.p`
    font-weight: normal;
    font-size: 20px;
    font-family: "Times New Roman", Times, Serif;
`

class Stock extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeStock = this.onChangeStock.bind(this);
        this.onChangeBudget = this.onChangeBudget.bind(this);
        this.onStockSubmit = this.onStockSubmit.bind(this);

        this.state = {
            stockChartXValues: [],
            stockChartYValues: [],
            stock: '',
            stateStock: '',
            price: '',
            budget: '',
            stateBudget: '',
            latestDate: '',
            validSubmission: 0,
            isSubmitted: false
        }
    }

    componentDidMount() {
        //this.fetchStock();
    }

    onChangeStock(e) {
        this.setState({
            stock: e.target.value
        });  
    }
    onChangeBudget(e) {
        this.setState({
            budget: e.target.value
        });     
    }

    onStockSubmit(e) {
        this.setState({
            isSubmitted: true
        })
        this.fetchStock(this.state.stock, this.state.budget);
        this.forceUpdateHandler();
        e.preventDefault();
    }

    forceUpdateHandler() {
        this.forceUpdate();
    }

    fetchStock(stock, budget) {
        const pointerToThis = this;
        console.log("pointerToThis: ", pointerToThis);
        const API_KEY = 'KRWWGZHCPVK2G29U';
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${this.state.stock}&outputsize=compact&apikey=${API_KEY}`;
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];
        
        fetch(API_Call)
            .then(
                function (response) {
                    return response.json();
                }
            )
            .then(
                function (data) {
                    console.log(data);
                    var latestDateBool = true;
                    var latestPrice = '';
                    var latestDate = '';
                    for (var key in data['Time Series (Daily)']) {
                        if (latestDateBool == true) {
                            latestDate = key;
                            latestPrice = data['Time Series (Daily)'][key]['4. close'];
                            console.log(latestPrice);
                            latestDateBool = false;
                        }
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['4. close']);
                    }
                    if (isNaN(budget) || latestDateBool == true) {
                        pointerToThis.setState({
                            validSubmission: -1
                        });
                        return;
                    }
                    // console.log(stockChartXValuesFunction);
                    pointerToThis.setState({
                        stockChartXValues: stockChartXValuesFunction,
                        stockChartYValues: stockChartYValuesFunction,
                        price: latestPrice,
                        stateBudget: budget,
                        stateStock: stock,
                        latestDate: latestDate,
                        validSubmission: 1
                    });
                }
            )
    }

    render() {
        return (
            <div>
                <div style={{ marginTop: 10 }}>
                <StyledH1>Stock Market</StyledH1>
                <form onSubmit={this.onStockSubmit}>
                    <div className="form-group">
                        <label>Enter the stock you want (in abbreviated caps) here!</label>
                        <input type="text"
                            className="form-control"
                            placeholder="ex: TSLA"
                            value={this.state.stock}
                            onChange={this.onChangeStock}
                        />
                    </div>
                    <p></p>
                    <div className="form-group">
                        <label>Enter your budget (in $) here! </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="ex: 2000"
                            value={this.state.budget}
                            onChange={this.onChangeBudget}
                        />
                    </div>
                    <p></p>
                    <div className="form-group">
                        <input type="submit" 
                            value="Generate Data!" 
                            className="btn btn-primary" 
                        />
                    </div>
                </form>
            </div>
                {this.state.validSubmission == -1 && <div>
                    <PadTop/>
                    <Warning>Your input had an incorrect format. Please check to see if 
                        your budget input is a number and your stock input is an existing stock (all caps abbreviated notation).</Warning>
                </div>}
                {this.state.validSubmission == 1 && <div>
                    <PadTop/>
                    <StyledH2>Stock: {this.state.stateStock}</StyledH2>
                    <StyledH2>Budget: ${this.state.stateBudget}</StyledH2>
                    <StyledH2>Stock price (as of closing price on {this.state.latestDate}): ${this.state.price}</StyledH2>
                    <p>With a budget of ${this.state.stateBudget}, you could buy {Math.floor(this.state.stateBudget * 100/ this.state.price)/100} stocks!</p>
                </div>}
                {this.state.validSubmission == 1 && <Plot
                    data={[
                        {
                            x: this.state.stockChartXValues,
                            y: this.state.stockChartYValues,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'red' },
                        }
                    ]}
                    layout={{ width: 720, height: 440, title: 'A Fancy Plot' }}
                />}
            </div>
        )
    }
}

export default Stock;