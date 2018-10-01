import React, { Component } from 'react';
import '../../node_modules/react-vis/dist/style.css'
import { volumeDate } from './utils';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  DiscreteColorLegend,
  Hint,
} from 'react-vis';

export default class BarGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      useCanvas: false,
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
    const { useCanvas, value } = this.state;
    const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
    const { info } = this.props;
    const volumePoints = volumeDate(info);

    return (
      <div>
        <XYPlot xType="ordinal" stackBy="y" width={1000} height={300} margin={{left: 80}}>
          <DiscreteColorLegend
            style={{ position: 'absolute', left: '40px', top: '0px' }}
            orientation="horizontal"
            items={[
              {
                title: 'Stock',
                color: '#228B22',

              },
            ]}
          />
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <BarSeries
            cluster="2015"
            colorType="literal"
            data={volumePoints}
            onValueMouseOver={this.getValue}
            onValueMouseOut={this.removeValue}
          />
          {value ? (
            <Hint value={value}>
              <div className="rv-hint__content">{`Volume: ${value.y}`}</div>
            </Hint>
          ) : null}
        </XYPlot>
      </div>
    );
  }
}
