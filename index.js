var express = require('express');

var Gpio = require('onoff').Gpio,
status = {status: gpios = [
pin_2 = new Gpio(2,'out'),
pin_3 = new Gpio(3,'out'),
pin_4 = new Gpio(4,'out'),
pin_5 = new Gpio(5,'out'),
pin_6 = new Gpio(6,'out'),
pin_7 = new Gpio(7,'out'),
pin_8 = new Gpio(8,'out'),
pin_9 = new Gpio(9,'out'),
pin_10 = new Gpio(10,'out'),
pin_11 = new Gpio(11,'out'),
pin_12 = new Gpio(12,'out'),
pin_13 = new Gpio(13,'out'),
pin_14 = new Gpio(14,'out'),
pin_15 = new Gpio(15,'out'),
pin_16 = new Gpio(16,'out'),
pin_17 = new Gpio(17,'out'),
pin_18 = new Gpio(18,'out'),
pin_19 = new Gpio(19,'out'),
pin_20 = new Gpio(20,'out'),
pin_21 = new Gpio(21,'out'),
pin_22 = new Gpio(22,'out'),
pin_23 = new Gpio(23,'out'),
pin_24 = new Gpio(24,'out'),
pin_25 = new Gpio(25,'out'),
pin_26 = new Gpio(26,'out'),
pin_27 = new Gpio(27,'out')]};

var getStatus = function(){
    return { gpios:
        [{pin: '2',status: pin_2.readSync()},
        {pin: '3',status: pin_3.readSync()},
        {pin: '4',status: pin_4.readSync()},
        {pin: '5',status: pin_5.readSync()},
        {pin: '6',status: pin_6.readSync()},
        {pin: '7',status: pin_7.readSync()},
        {pin: '8',status: pin_8.readSync()},
        {pin: '9',status: pin_9.readSync()},
        {pin: '10',status: pin_10.readSync()},
        {pin: '11',status: pin_11.readSync()},
        {pin: '12',status: pin_12.readSync()},
        {pin: '13',status: pin_13.readSync()},
        {pin: '14',status: pin_14.readSync()},
        {pin: '15',status: pin_15.readSync()},
        {pin: '16',status: pin_16.readSync()},
        {pin: '17',status: pin_17.readSync()},
        {pin: '18',status: pin_18.readSync()},
        {pin: '19',status: pin_19.readSync()},
        {pin: '20',status: pin_20.readSync()},
        {pin: '21',status: pin_21.readSync()},
        {pin: '22',status: pin_22.readSync()},
        {pin: '23',status: pin_23.readSync()},
        {pin: '24',status: pin_24.readSync()},
        {pin: '25',status: pin_25.readSync()},
        {pin: '26',status: pin_26.readSync()},
        {pin: '27',status: pin_27.readSync()}]
    };
}



var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.post('/changeGpio',function(req,res){
    var request = req.body;

    if(request.pin){
        if(request.pin >27 || request.pin<2 || !isNumber(request.pin)){
            res.send({error:'Pin value '+request.pin+' not found for this device'});
        }else{
            if(request.value != 0 && request.value!= 1){
                res.send({error:'Pin value must be 0 or 1'});
            }else{
                console.log(request.value);
                eval("pin_"+request.pin).write(parseInt(request.value),function(err){
                    if(err){
                        res.send({error: err});
                    }else{
                        res.send(getStatus());
                    }
                });
            }
        }

    }else{
        res.send({error: 'Pin value not found'});
    }

});

app.listen(8080, function(){
    console.log('Our express app server is listening on 8080');
});

function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 