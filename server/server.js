const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );

const port = 5000;
let answers = [];

app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

app.listen( port, () => {
    console.log( 'server up on port', port );
});

app.get( '/calculation', ( req, res ) => {
    console.log( 'in /calculation GET');
    res.send( answer );
})

let answer;
app.post( '/calculation', ( req, res ) => {
    console.log( 'in /calculation POST: ', req.body );
    answer = {
        num1: req.body.x,
        num2: req.body.y,
        op: req.body.operator,
        answer: req.body.answer
    }
    answer.num1 = parseInt( answer.num1 );
    answer.num2 = parseInt( answer.num2 );
    if ( answer.op === '+' ) {
        answer.answer = answer.num1 + answer.num2;
    }
    else if ( answer.op === '-' ) {
        answer.answer = answer.num1 - answer.num2;
    }
    else if ( answer.op === '*' ) {
        answer.answer = answer.num1 * answer.num2;
    }
    else {
        answer.answer = answer.num1 / answer.num2;
    }
    answers.push( answer );
    res.sendStatus( 200 );
});