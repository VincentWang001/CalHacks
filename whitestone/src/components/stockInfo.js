import React from 'react';
import Plot from 'react-plotly.js';

class Stock extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeStock = this.onChangeStock.bind(this);
        this.onStockSubmit = this.onStockSubmit.bind(this);

        this.state = {
            stockChartXValues: [],
            stockChartYValues: [],
            stock: 'TSLA',
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
        console.log(this.state.stock)
        console.log('TSLA' == this.state.stock)
    }

    onStockSubmit() {
        this.setState({
            isSubmitted: true
        })

    }

    fetchStock() {
        if (this.state.isSubmitted) {
            const pointerToThis = this;
            console.log(pointerToThis);
            const API_KEY = 'KRWWGZHCPVK2G29U';
            let StockSymbol = 'TSLA';
            console.log(StockSymbol == this.state.stock)
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

                        for (var key in data['Time Series (Daily)']) {
                            stockChartXValuesFunction.push(key);
                            stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
                        }

                        // console.log(stockChartXValuesFunction);
                        pointerToThis.setState({
                            stockChartXValues: stockChartXValuesFunction,
                            stockChartYValues: stockChartYValuesFunction
                        });
                    }
                )
        }
    }

    render() {
        return (
            <div>
                <h1>Stock Market</h1>
                <input type="text"
                    value={this.state.stock}
                    onChange={this.onChangeStock}
                />
                <input type="submit" value="Submit" onSubmit={this.onSubmitStock} />
                <p>{this.state.stock}</p>
                <Plot
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
                />
            </div>
        )
    }
}

export default Stock;