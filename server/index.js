require('dotenv').config()

const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const { PORT } = process.env

app
  .prepare()
  .then(() => {
    const server = express()

    server.use(
      [
        '/apple-app-site-association',
        '/.well-known/apple-app-site-association',
      ],
      (req, res) => {
        res.json({
          applinks: {
            apps: [],
            details: [
              {
                appID: 'A8XZ5C62P6.com.hk01.news-app',
                paths: ['*'],
              },
              {
                appID: 'B9FCC7VU7J.com.hk01.news-app.prd',
                paths: ['*'],
              },
              {
                appID: 'B9FCC7VU7J.com.hk01.news-app.stg',
                paths: ['*'],
              },
            ],
          },
        })
      }
    )

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(PORT, '0.0.0.0', err => {
      if (err) throw err
      console.log(`> Ready on http://0.0.0.0:${PORT}`)
    })
  })
  .catch(ex => {
    console.log(ex.stack)
    process.exit(1)
  })
