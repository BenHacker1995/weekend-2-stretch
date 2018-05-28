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
  console.log( 'JQ' );
  // $( '#1Button' ).on( 'click', Press1 );
  $(".input").click( appendInput );
    
} //end readyNow

function appendInput() {
  let number = $(this).data( 'number' );
    $("#input").val( function() {
        return this.value + number;
    });
  }

