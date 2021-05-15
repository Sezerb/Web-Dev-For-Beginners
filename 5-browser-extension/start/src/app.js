const express = require('express');
const app = express();
const axios = require('axios');
const { ContextExclusionPlugin } = require('webpack');

//Serve public static files.
app.use(express.static('../dist'))

// Add headers
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,auth-token')

//     next();
// });

//Restful Routes
app.get("/api/v1/co2signal", function (req, res) {
    //console.log(req.get('auth-token'));
    console.log(req.query.countryCode);
    var region = req.query.countryCode;

    axios.get('https://api.co2signal.com/v1/latest', {
        params: {
            countryCode: region,
        },
        headers: {
            'auth-token': req.get('auth-token'),
        },
    })
        .then((response) => {
            //console.log(response);
            res.status(200).json(response.data);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ success: false });
        });
})


app.listen(3000, function (error) {
    if (error == true) {
        console.log("some error occured");
    } else {
        console.log("listening on localhost:3000");
    }
})