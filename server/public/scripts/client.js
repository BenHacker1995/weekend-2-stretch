class Calculation{
  constructor( xIn, yIn, operatorIn ){
    this.x = xIn;
    this.y = yIn;
    this.operator = operatorIn;
  } //end constructor
} // end class

let inputArr = [];
let inputVal = $( '#input' );
let output = [];

$( document ).ready( readyNow );

function readyNow(){
  inputArr = [];
  inputVal.val( '' );
  $( '#input' ).prop( 'readonly', true );
  // $( '#1Button' ).on( 'click', Press1 );
  $( '.input' ).on( 'click', appendInput );
  $( '.op' ).on( 'click', stopOps );
  $( '#eq' ).on( 'click', sendData );
} //end readyNow

function appendInput() {
  let number = $(this).data( 'number' );
  $( '#input' ).val( function() {
      return this.value + number;
  });
}

function clearInputs() {
  $( '#input' ).val( '' );
  $( '.op' ).prop( 'disabled', false );
}

function getAnswer() {
  $.ajax({
    method: 'GET',
    url: '/calculation'
  }).then( function( response ) {
    let history = $( '#history' );
    let output = $( '#answer' );
    output.empty();
    output.append( response.answer );
    history.append( `<li>${ response.num1 } ${ response.op } ${ response.num2 }</li>`);
  });
}

let outputObject;
let num1;
let num2;
let op;
function sendData() {
  $( 'history' ).append( `<li>${ $( '#input' ).val() }</li>`);
  inputArr = $( '#input' ).val().split( ' ' );
  num1 = inputArr[0];
  num2 = inputArr[2];
  op = inputArr[1];
  let outputObject = new Calculation( num1, num2, op );
  $.ajax({
    method: 'POST',
    url: '/calculation',
    data: outputObject
  }).then( function( response ) {
    getAnswer();
  });
  clearInputs();
}

function stopOps() {
  let opString = ' ' + $( this ).val() + ' ';
  $( '#input' ).val( $( '#input' ).val() + opString );
  $( '.op' ).prop( 'disabled', true );
}

