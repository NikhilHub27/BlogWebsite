const express = require('express')
const articleRouter = require("./routes/articles")
const Article = require('./models/article')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const dotenv = require("dotenv")
const app = express()

dotenv.config();


const username = process.env.MONGODB_USERNAME;
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.cbtdo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
app.set("views", "./views")
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.get('/', async(req, res) => {
    const articles =await Article.find().sort({ createdAt:'desc'})
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(3000)