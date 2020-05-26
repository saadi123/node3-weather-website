const request = require('request');

const forecast = (latitude, longitude, callback) => {
        const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude +
                     '&lon='+longitude + '&appid=24e6152caa255a3c194e8721310b176f';
                    
        request({url, json: true}, (error,{body}) => {
                if (error) {
                    callback('Unable to connect to the weather app' + url, undefined);
                } else if (body.error) {
                    callback('Can\'t find data', undefined);
                } else {
                    callback(undefined, 'It is currently ' + body.main.temp + ' degrees out ');
                }
            })

    };
    
module.exports = forecast;