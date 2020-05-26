const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const partialsPathFooter = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
hbs.registerPartials(partialsPathFooter);

app.use(express.static(publicDirectory));

app.get('', (req, res)=>{
        res.render('index', {
                title: 'Weather app',
                name: 'Saad'
            });
    });

app.get('/about', (req, res) => {
        res.render('about', {
                title: 'About page',
                name: 'Saad'
            })
    });

app.get('/help', (req, res) => {
        res.render('help', {
                helpText: 'This is some help text',
                title: 'Help Page',
                name: 'Saad'
            });
    });

app.get('/weather', (req, res) => {
        if (!req.query.address) {
                return res.send({
                        error: 'Please provide address'
                    });
        }
        
        geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
                if (error) {
                    return res.send({error});
                }
                
                forecast(latitude, longitude, (error, forecastData) => {
                        if (error) {
                            return res.send({error});
                        }
                        
                        res.send({
                                forecast: forecastData,
                                location,
                                address: req.query.address
                            })
                    });
            })
        
        /*res.send({
                forecast: 'It is snowing',
                location: 'Philadelphia',
                address: req.query.address
            });*/
    });


app.get('/products', (req, res) => {
        if (!req.query.search) {
                return res.send({
                        Error: 'You must provide search term'
                    });
        }
        res.send({
                products: []
            });
    });

app.get('/help/*', (req, res) => {
        res.render('404', {
                errorMessage: 'Sorry, help article not found'
            });
    });

app.get('*', (req, res) => {
        res.render('404', {
                errorMessage: 'Sorry, page not found'
            });
    });

app.listen(3000, () => {
        console.log('Server is up on port 3000');
    });