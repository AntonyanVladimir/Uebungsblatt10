const http = require('http');
const express = require('express');

var app = express();

app.listen(5000, ()=>{console.log('Listening on Port 5000...')});

// app.get('/add/:op1/:op2', (req, res)=>{
//     let operand1 = parseInt(req.params.op1);
//     let operand2 = parseInt(req.params.op2);
//     let ergebnis = operand1+operand2;
     
//     res.status(400).send(ergebnis.toString());
// })
// app.get('/sub/:op1/:op2', (req, res)=>{
//     let operand1 = parseInt(req.params.op1);
//     let operand2 = parseInt(req.params.op2);
//     let ergebnis = operand1-operand2;
     
//     res.status(400).send(ergebnis.toString());
// })

// app.get('/mul/:op1/:op2', (req, res)=>{
//     let operand1 = parseInt(req.params.op1);
//     let operand2 = parseInt(req.params.op2);
//     let ergebnis = operand1*operand2;
     
//     res.status(400).send(ergebnis.toString());
// })

// app.get('/div/:op1/:op2', (req, res)=>{
//     let operand1 = parseInt(req.params.op1);
//     let operand2 = parseInt(req.params.op2);
//     let ergebnis = operand1/operand2;
     
//     res.status(400).send(ergebnis.toString());
// })

app.get('/:opr/:op1/:op2', (req, res)=>{
    let operand1 = parseInt(req.params.op1);
    let operand2 = parseInt(req.params.op2);
    var erg;
    switch(req.params.opr){
        case 'add': erg = operand1+operand2; break;
        case 'sub': erg = operand1-operand2; break;
        case 'mul': erg = operand1*operand2; break;
        case 'div': erg = operand1/operand2; break;
        default:erg = 404;
    }
     
    res.status(400).send(erg.toString());
})
