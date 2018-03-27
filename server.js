const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.')
        };
    })
    next();
})

app.use((req, res, next) => {
    res.render('maintaince.hbs', {
        maintenance: 'Site under maintenance come back later'
    })
})

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'My Home Page',
        currentYear: new Date().getFullYear(),
        title: 'Home',
        welcomeMessage: 'Welcome to my personal site.'
    });
 });
 

app.get('/about', (req, res) => {
   res.render('about.hbs', {
       pageTitle: 'About page',
       currentYear: new Date().getFullYear(),
       welcomeMessage: 'Some message about us.'
   });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});