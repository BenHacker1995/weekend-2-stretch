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
  $( '#clearButton' ).on( 'click', clearInputs );
  $( '.op' ).on( 'click', stopOps );
  $( '#eq' ).on( 'click', checkData );
} //end readyNow

function appendInput() {
  let number = $(this).data( 'number' );
  if ( $( '.op' ).prop( 'disabled' ) ){
    $( '#input').val( $( '#input' ).val() + ' ' + number );
  }
  else {
    $( '#input' ).val( $( '#input' ).val() + number );
  }
}

function checkData() {
  inputArr = $( '#input' ).val().split( ' ' );
  console.log( inputArr );
  
  if( inputArr.length < 3 ) {
    alert( 'Error: invalid input' );
  }
  else {
    sendData();
  }
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
  let opString = $( this ).val();
  $( '#input' ).val( $( '#input' ).val() + ' ' + opString );
  $( '.op' ).prop( 'disabled', true );
}

