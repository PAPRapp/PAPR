import React, { Component } from 'react';
import '../../node_modules/react-vis/dist/style.css'
import CandleStick from './CandleFunc';
import {
  XYPlot,
  XAxis,
  YAxis,
  FlexibleWidthXYPlot,
  FlexibleXYPlot,
  LineSeries,
  Hint,
} from 'react-vis';
import { monthlyQuad, dynamic, minPoint, maxPoint } from './utils';

export default class CandleChart extends Component {
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
    const candlePoints = monthlyQuad(info);
    const minMax = dynamic(info);
    const low = minPoint(minMax);
    const high = maxPoint(minMax);
    const { a } = low;
    const { b } = high;

    return (
      <div className="chart">
        <FlexibleWidthXYPlot
          animation
          yDomain={[a * .99, b]}
          height={400}
          width={1000}
          xType="ordinal"
        >
          <XAxis />
          <YAxis />
          <CandleStick
            colorType="literal"
            opacityType="literal"
            stroke="rgb(61, 67, 68)"
            data={candlePoints}
            onValueMouseOver={this.getValue}
            onValueMouseOut={this.removeValue}
          />
          {value ? (
            <Hint value={value}>
              <div className="rv-hint__content">
                {`High: ${value.yHigh} Open: ${value.yOpen} Close: ${
                  value.yClose
                } Low: ${value.yLow}`}
              </div>
            </Hint>
          ) : null}
        </FlexibleWidthXYPlot>
      </div>
    );
  }
}
