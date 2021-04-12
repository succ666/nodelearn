const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const Article = require('./db.js').Article
const read = require('node-readability');

const app = express()
app.use( 
    '/css/bootstrap.css', 
    express.static('node_modules/bootstrap/dist/css/bootstrap.css') 
);

app.use(cors())

//支持编码为 JSON的请求消息体
app.use(bodyParser.json());
//支持编码为表单的请求消息体    
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const articles = [{ title: 'Example' }];

app.set('port', process.env.PORT || 8000);

app.get('/articles', (req, res, next) => {
    Article.all((err, articles) => {
        if (err) return next(err);
        res.format({
            html: ()=>{
                res.render('articles.ejs',{articles:articles});
            },
            json: ()=>{
                res.send(articles);
            }
        })
    });
});

app.post('/articles', (req, res, next) => {
    const url = req.body.url;
    read(url, (err, result) => {
        if (err || !result) res.status(500).send('Error downloading article');
        Article.create(
            { title: result.title, content: result.content },
            (err, article) => {
                if (err) return next(err);
                res.send('OK');
            }
        );
    });
});

app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    Article.find(id, (err, article) => {
        if (err) return next(err);
        // res.render('articles',article);
        res.format({
            html: ()=>{
                res.render('article.ejs',{article:article});
            },
            json: ()=>{
                res.send(articles);
            }
        })
    });
})

app.delete('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    Article.delete(id, (err) => {
        if (err) return next(err);
        res.send({ message: 'Deleted' });
    });
})

app.listen(app.get('port'), () => {
    console.log('App started on port', app.get('port'));
});

module.exports = app;