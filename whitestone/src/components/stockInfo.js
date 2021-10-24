import React from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';

const StyledH1 = styled.h1`
    font-weight: bold;
    font-size: 50px;
    color: skyblue;
    font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;
    text-align: center;
`
const StyledH2 = styled.h2`
    font-weight: bold;
    font-size: 20px;
    font-family: "Times New Roman", Times, Serif;
    background-color: rgba(255,255,255,0.1);
    width: 35%;
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;
`

const Warning = styled.h2`
    font-weight: bold;
    color: #E46C6C;
    font-size: 20px;
    font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;
`

const PadTop = styled.p`
    padding-top: 50px;
`
const StyledP = styled.p`
    font-weight: normal;
    font-size: 20px;
    color: skyblue;
    font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;
`
    
const StyledButton = styled.input`
    font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;

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
    
    findLineByLeastSquares(values_x, values_y) {
        var leastSquaresXValues = [];
        var leastSquaresYValues = [];
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

        x = values_x[0];
        y = x * m + b;
        console.log("hello there", this.state.stockChartXValues);
        leastSquaresXValues.push(this.state.stockChartXValues[values_length - 1]);
        leastSquaresYValues.push(y);

        x = values_x[values_length - 1];
        y = x * m + b;

        //console.log("general kenobi", this.state.stockChartXValues);
        leastSquaresXValues.push(this.state.stockChartXValues[0]);
        leastSquaresYValues.push(y);
        this.setState({
            leastSquaresXValues: leastSquaresXValues,
            leastSquaresYValues: leastSquaresYValues
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
        let leastSquaresX= [];
        

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
                    var count = 0;
                    for (var key in data['Time Series (Daily)']) {
                        if (latestDateBool == true) {
                            latestDate = key;
                            latestPrice = data['Time Series (Daily)'][key]['4. close'];
                            console.log(latestPrice);
                            latestDateBool = false;
                        }
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(parseFloat(data['Time Series (Daily)'][key]['4. close']));
                        leastSquaresX.push(count);
                        count += 1;
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

                    //console.log("pls work:", stockChartXValuesFunction);
                    pointerToThis.findLineByLeastSquares(leastSquaresX, stockChartYValuesFunction.reverse());
                    stockChartYValuesFunction.reverse();

                }
            )
    }

    render() {
        return (
            // <StyledBody>
                <div>
                    <div>
                        <StyledH1>Stock Market</StyledH1>
                        <form onSubmit={this.onStockSubmit}>
                            <div className="form-group">
                                <StyledP>Enter the stock you want (in abbreviated caps) here!</StyledP>
                                <input type="text"
                                    className="form-control"
                                    placeholder="ex: TSLA"
                                    value={this.state.stock}
                                    onChange={this.onChangeStock}
                                />
                            </div>
                            <p></p>
                            <div className="form-group">
                                <StyledP>Enter your budget (in $) here! </StyledP>
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
                                <StyledButton type="submit"
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
                    <StyledH2 style={{ color: 'white' }}>Stock: {this.state.stateStock} <p></p>
                    Budget: ${this.state.stateBudget} <p></p>
                    Stock price (as of closing price on {this.state.latestDate}): ${this.state.price} <p></p>
                    With a budget of ${this.state.stateBudget}, you can buy {Math.floor(this.state.stateBudget * 100/ this.state.price)/100} stocks!</StyledH2>
                </div>}
                {this.state.validSubmission == 1 && <Plot
                    style={{
                        position: 'absolute', left: '65%', top: '78.5%',
                        transform: 'translate(-50%, -50%)'
                    }}
                    data={[
                        {
                            x: this.state.stockChartXValues,
                            y: this.state.stockChartYValues,
                            type: 'scatter',
                            name:'Market Summary',
                            mode: 'lines+markers',
                            marker: { color: 'red' },

                        },
                        {
                            x: this.state.leastSquaresXValues,
                            y: this.state.leastSquaresYValues,
                            type: 'scatter',
                            name:'Least Squares Approximation',
                            mode: 'lines+markers',
                            marker: { color: 'blue' },
                        }
                    ]}
                    layout={{ width: 750, height: 350, title: this.state.stateStock, 
                        showlegend: true, legend: {x: 0, y: -.5},  margin: {r: 30} }}
                />}
            </div>
        //    {/* </StyledBody> */}
        )
    }
}

export default Stock;