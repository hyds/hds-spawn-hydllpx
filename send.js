    var send = require('aws-ses-send')

      , msg = {to:'sholto.maud@gmail.com', from:'no-reply@brian.io', subject:'solid email', body:'srs, nice stuff'}



    send(msg, function(err, response) {

        if(err) {

            console.error(err) 

        }

        else {

            console.log(response)

        }

    })