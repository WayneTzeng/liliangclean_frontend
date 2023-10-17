import createServer from './server.js'

createServer().then(({ app, isTest, isPrd }) => {
  if (!isTest) {
    const port = isPrd ? 5110 : 5100
    app.listen(port, () => {
      console.log(`service started, port: ${port}`)
    })
  }
})
