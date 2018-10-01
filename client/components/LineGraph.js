import React, { Component } from 'react';
import '../../node_modules/react-vis/dist/style.css'
import { graphInfo, graphStock } from './utils';
import {
  XYPlot,
  LineMarkSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  Hint,
} from 'react-vis';

export default class LineGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
    };
    this.getValue = this.getValue.bind(this);
    this.removeValue = this.removeValue.bind(this);
  }

  getValue(value) {
    this.setState({
      value,
    });
  }

  removeValue() {
    this.setState({
      value: null,
    });
  }

  render() {
    const { value } = this.state;
    const { info } = this.props;
    const dataPoints = graphStock(info);
    return dataPoints ? (
      <XYPlot width={1000} height={300} xType="ordinal">
        {/* <VerticalGridLines />
        <HorizontalGridLines /> */}
        <XAxis tickeLabelAngle={-70}/>
        <YAxis />
        <LineMarkSeries
          style={{
            strokeWidth: '2px',
          }}
          lineStyle={{ stroke: '#228B22' }}
          markStyle={{ stroke: 'none' }}
          data={dataPoints}
          onValueMouseOver={this.getValue}
          onValueMouseOut={this.removeValue}
          size={0}
        />
        {value ? (
          <Hint
            value={value}
            style={{
              fontSize: 20,
              text: {
                display: 'none',
              },
              value: {
                color: 'green',
              },
            }}
          >
            <div className="rv-hint__content">{`${value.x} $${value.y}`}</div>
          </Hint>
        ) : null}
      </XYPlot>
    ) : (
      <div>Loading</div>
    );
  }
}
