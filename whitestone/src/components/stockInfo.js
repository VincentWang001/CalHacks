import React from 'react';
import Plot from 'react-plotly.js';

class Stock extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeStock = this.onChangeStock.bind(this);

        this.state = {
            stockChartXValues: [],
            stockChartYValues: [],
            stock: ''
        }
    }



    onChangeStock(e) {
        this.setState({
            stock: e.target.value
        });
    }



    render() {
        return (
            <div>
                <h1>Stock Market</h1>
                <input type="text"
                    value={this.state.stock}
                    onChange={this.onChangeStock}
                />
                <p>{this.state.stock}</p>

            </div>
        )
    }
}

export default Stock;