import createServer from './server.js'

createServer().then(({ app, isTest, isProd }) => {
  if (!isTest) {
    const port = isProd ? 8080 : 8080
    app.listen(port, () => {
      console.log(`service started, port: ${port}`)
    })
  }
})
