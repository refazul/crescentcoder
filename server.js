const express = require('express')
const app = express()
const port = 8001

app.use(express.static('public'))
app.set('view engine', 'pug')
app.set('views', './views')

app.get('*', function (req, res) {
    res.render('home', { title: 'Home', message: 'Home' })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

