const router = require('express').Router()
const Sentiment = require('sentiment')
const axios = require('axios')
module.exports = router

router.get('/:ticker', async (req, res, next) => {
  const {ticker} = req.params
  try {
    let aggregateText = ''
    const {data} = await axios.get(
      `https://api.iextrading.com/1.0/stock/${ticker}/news/last/10`
    )
    const sentimentAnalyzer = new Sentiment()
    const news = data.map(article => {
      const {headline, summary} = article
      aggregateText +=
        summary !== 'No summary available.' ? summary + ' ' : headline + ' '
      const {comparative} =
        summary !== 'No summary available.'
          ? sentimentAnalyzer.analyze(summary)
          : sentimentAnalyzer.analyze(headline)
      let sentiment
      if (comparative > 0) {
        sentiment = 'POSITIVE'
      } else if (comparative < 0) {
        sentiment = 'NEGATIVE'
      } else {
        sentiment = 'NEUTRAL'
      }
      article.sentiment = sentiment
      return article
    })
    const {positive, negative} = sentimentAnalyzer.analyze(aggregateText)
    const paprScore = positive.length - negative.length
    const payload = {
      news,
      paprScore
    }
    res.json(payload)
  } catch (err) {
    console.error(err)
  }
})
