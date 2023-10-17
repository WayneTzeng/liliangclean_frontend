import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const resolve = (p) =>
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), p)

const createServer = async (isTest = false) => {
  const isPrd = process.env.NODE_ENV === 'production'
  const app = express()

  // configure vite service
  let vite
  if (isPrd) {
    app.use(require('compression')())
    app.use(
      require('serve-static')(resolve('./dist/client'), {
        index: false,
      })
    )
  } else {
    vite = await require('vite').createServer({
      server: {
        middlewareMode: true,
      },
      appType: 'custom',
    })
    app.use(vite.middlewares)
  }

  // static resource mapping in prod env
  const manifest = isPrd
    ? fs.readFileSync(resolve('./dist/client/ssr-manifest.json'), 'utf-8')
    : {}

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
    const axios = require('axios')

    try {
      // get html template and rendering functions for different env
      let template, render
      if (isPrd) {
        template = fs.readFileSync(resolve('./dist/client/index.html'), 'utf-8')
        render = (await import('./dist/server/entry-server.js')).render
      } else {
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.js')).render
      }
      const [appHtml, customMeta, preloadLinks, piniaState] = await render(
        url,
        manifest,
        axios
      )

      // replace processed resources
      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--custom-meta-->`, customMeta)
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(`<!--pinia-state-->`, piniaState)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (error) {
      vite?.ssrFixStacktrace(error)
      next()
    }
  })

  return { app, isTest, isPrd }
}

export default createServer
