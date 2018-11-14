const expressjwt = require('express-jwt');

module.exports = expressjwt({
    secret : 'secrettoken',
    getToken: function (req) {
        if(req.headers && req.headers['token']){
            return req.headers['token']
        } else {
            return null
        }
    }
});