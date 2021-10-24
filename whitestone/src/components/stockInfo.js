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

const PadTop = styled.p`
    padding-top: 50px;
`
const StyledP = styled.p`
    font-weight: normal;
    font-size: 20px;
    font-family: "Times New Roman", Times, Serif;
`

const StyledBody = styled.div`
  background: url('https://www.marketplace.org/wp-content/uploads/2021/10/stockmarket.jpg?fit=2800%2C1575');
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

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

                    // console.log(stockChartXValuesFunction);
                    pointerToThis.setState({
                        stockChartXValues: stockChartXValuesFunction,
                        stockChartYValues: stockChartYValuesFunction,
                        price: latestPrice,
                        stateBudget: budget,
                        stateStock: stock,
                        latestDate: latestDate
                    });
                }
            )
    }

    render() {
        return (
            <StyledBody>
                <div>
                    <div style={{ marginTop: 10 }}>
                        <StyledH1 style={{ color: 'white' }}>Stock Market</StyledH1>
                        <form onSubmit={this.onStockSubmit}>
                            <div className="form-group">
                                <label style={{ color: 'white' }}>Enter the stock you want (in abbreviated caps) here!</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="ex: TSLA"
                                    value={this.state.stock}
                                    onChange={this.onChangeStock}
                                />
                            </div>
                            <p></p>
                            <div className="form-group">
                                <label style={{ color: 'white' }}>Enter your budget (in $) here! </label>
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

                    {this.state.isSubmitted && <div>
                        <PadTop />
                        <StyledH2 style={{ color: 'white' }} className={PadTop}>Stock: {this.state.stateStock}</StyledH2>
                        <StyledH2 style={{ color: 'white' }} >Budget: ${this.state.stateBudget}</StyledH2>
                        <StyledH2 style={{ color: 'white' }} >Stock price (as of closing price on {this.state.latestDate}): ${this.state.price}</StyledH2>
                        <p style={{ color: 'white' }}>With a budget of ${this.state.stateBudget}, you could buy {Math.floor(this.state.stateBudget * 100 / this.state.price) / 100} stocks!</p>
                    </div>}
                    {this.state.isSubmitted && <Plot
                        style={{
                            position: 'absolute', left: '50%', top: '60%',
                            transform: 'translate(-50%, -50%)'
                        }}
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
            </StyledBody>
        )
    }
}

export default Stock;