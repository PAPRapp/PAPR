import React from 'react'
import {connect} from 'react-redux'

class News extends React.Component {
  render() {
    return (
      <div id="news">
        <div id="news-heading">
          <b>Headline</b>
          <b
            style={{
              color: 'white',
              textAlign: 'center',
              paddingRight: '10px'
            }}
          >
            Sentiment
          </b>
        </div>
        {this.props.news.news.map((article, i) => {
          const sentimentColor =
            article.sentiment === 'POSITIVE'
              ? '#1EC851'
              : article.sentiment === 'NEGATIVE' ? ' #9a1f11' : '#656a6dcc'
          return (
            <div key={i} className="article">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={article.url}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {article.headline}
              </a>
              <a
                style={{
                  backgroundColor: sentimentColor,
                  display: 'flex',
                  fontSize: '10px',
                  width: '100px',
                  textAlign: 'center',
                  padding: '5px',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {article.sentiment}
              </a>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    news: state.chart.news
  }
}

export default connect(mapStateToProps)(News)
