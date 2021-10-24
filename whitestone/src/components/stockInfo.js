import React from 'react';
import Plot from 'react-plotly.js';
import StockFinder from './finance';
import styled from 'styled-components';

const StyledH1 = styled.h1`
    font-weight: bold;
    font-size: 50px;
    font-family: "Times New Roman", Times, Serif;
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
            leastSquaresXValues: [],
            leastSquaresYValues: [],
            stock: '',
            price: '',
            budget: '',
            latestDate: '',
            isSubmitted: false
        }
    }

    componentDidMount() {
        this.fetchStock();
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

    findLineByLeastSquares(values_x, values_y) {
        var sum_x = 0;
        var sum_y = 0;
        var sum_xy = 0;
        var sum_xx = 0;
        var count = 0;
    
        /*
         * We'll use those variables for faster read/write access.
         */
        var x = 0;
        var y = 0;
        var values_length = values_x.length;
    
        if (values_length != values_y.length) {
            throw new Error('The parameters values_x and values_y need to have same size!');
        }
    
        /*
         * Nothing to do.
         */
        if (values_length === 0) {
            return [ [], [] ];
        }
    
        /*
         * Calculate the sum for each of the parts necessary.
         */
        for (var v = 0; v < values_length; v++) {
            x = values_x[v];
            y = values_y[v];
            sum_x += x;
            sum_y += y;
            sum_xx += x*x;
            sum_xy += x*y;
            count++;
        }
    
        /*
         * Calculate m and b for the formular:
         * y = x * m + b
         */
        var m = (count*sum_xy - sum_x*sum_y) / (count*sum_xx - sum_x*sum_x);
        var b = (sum_y/count) - (m*sum_x)/count;
    
        /*
         * We will make the x and y result line now
         */
        var result_values_x = [];
        var result_values_y = [];
    
        for (var v = 0; v < values_length; v++) {
            x = values_x[v];
            y = x * m + b;
            this.state.leastSquaresXValues.push(x);
            this.state.leastSquaresYValues.push(y);
        }
    }

    onStockSubmit(e) {
        this.setState({
            isSubmitted: true
        })
        this.fetchStock();
        this.forceUpdateHandler();
        e.preventDefault()
    }

    forceUpdateHandler() {
        this.forceUpdate();
    }

    fetchStock() {
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

                    this.findLineByLeastSquares(this.state.stockChartXValues, this.state.stockChartYValues);

                    // console.log(stockChartXValuesFunction);
                    pointerToThis.setState({
                        stockChartXValues: stockChartXValuesFunction,
                        stockChartYValues: stockChartYValuesFunction,
                        price: latestPrice,
                        latestDate: latestDate
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
                            value={this.state.stock}
                            onChange={this.onChangeStock}
                        />
                    </div>
                    <p></p>
                    <div className="form-group">
                        <label>Enter your budget here! </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.budget}
                            onChange={this.onChangeBudget}
                        />
                    </div>
                    <p></p>
                    <div className="form-group">
                        <input type="submit" 
                            //value="Generate Data!" 
                            value="Submit"
                            className="btn btn-primary"
                            //onClick={this.onStockSubmit.bind(this)} 
                        />
                    </div>
                </form>
            </div>

                {/* <StyledH1>Stock Market</StyledH1>
                <StyledP>Enter the stock you want (in abbreviated caps) here!</StyledP>
                <input type="text"
                    value={this.state.stock}
                    onChange={this.onChangeStock}
                />
                <input type="submit" value="Submit" onClick={this.onStockSubmit.bind(this)} /> */}
                {this.state.isSubmitted && <div>
                    <p>Stock price (as of closing price on {this.state.latestDate}): ${this.state.price}</p>
                </div>}
                {this.state.isSubmitted && <Plot
                    data={[
                        {
                            x: this.state.leastSquaresXValues,
                            y: this.state.leastSquaresYValues,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'red' },
                        }
                    ]}
                    layout={{ width: 720, height: 440, title: 'A Fancy Plot' }}
                />}
                {this.state.isSubmitted && <Plot
                    data={[
                        {
                            x: this.state.leastSquaresXValues,
                            y: this.state.leastSquaresYValues,
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