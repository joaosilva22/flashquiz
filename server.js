const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 8000;

app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://public:password@ds119568.mlab.com:19568/flashquiz');

let Question = mongoose.model('Question', {
    question: String,
    correct: String,
    wrong: [String]
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/question', (req, res) => {
    Question.count().exec((err, count) => {
	let random = Math.floor(Math.random() * count);
	Question.findOne().skip(random).exec((err, result) => res.json(result));
    });
});

app.post('/api/question', (req, res) => {
    Question.create({
	question: req.body.question,
	correct: req.body.correct,
	wrong: [req.body.wrong1, req.body.wrond2, req.body.wrong3]
    }, (err) => console.log(err));
});

app.get('/', (req, res) => res.sendFile('/index.html'));

app.listen(8000);
console.log(`Server listening on port ${port}`);
