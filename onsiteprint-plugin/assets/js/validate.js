////////////////////////////////////////
/////// Return the Response
////////////////////////////////////////
function consoleDebug( debug, name, response ) {
    if ( debug == true ) console.log( name, response )
}



////////////////////////////////////////
/////// Return the Response
////////////////////////////////////////
function returnResponse( error, code, response ) {

    return {
        error : error,
        code : code,
        response : response
    }

}



////////////////////////////////////////
/////// Validate the Fetch Response
////////////////////////////////////////
function validateFetchResponse( validateRequest ) {

    let validateMessage = validateRequest.response
    let validateDetail = validateMessage.detail
    let validateErrorCode = validateRequest.code

    try {
        
        if ( validateMessage == '' ) throw 'Empty string!'

        if ( validateMessage == undefined ) throw 'Undefined string!'

        ///// If the Response is 'detail' or empty ).
        if ( validateDetail ) throw validateDetail

        return returnResponse( false, validateErrorCode, validateMessage )
    
    } catch( validateError ) {
        return returnResponse( true, validateErrorCode, validateError )
    }

}



////////////////////////////////////////
/////// Validate Form
////////////////////////////////////////
function validateForm( formElemnet ) {
    
    let validatedformResponse

    let validateErrorCode

    let formInputs = formElemnet.querySelectorAll( 'input[required]' )
    //console.log(formInputs)

    let validateErrorArray = []

    formInputs.forEach( formInput => {
        let inputId = formInput.getAttribute( 'id' )
        let inputType = formInput.getAttribute( 'type' )
        let inputValidation = document.querySelector( `#${ inputId }-validation` )   
        
        inputValidation.innerHTML = ''
        inputValidation.classList.remove( 'active' )

        try {
            ///// If the Input value is empty.
            if ( ! formInput.value ) {
                validateErrorCode = 400
                throw 'The input field is empty!'
            }
            validatedformResponse = returnResponse( false, 200, 'Validation is approved!' )
        } catch( validateError ) {
            inputValidation.classList.add( 'active' )
            inputValidation.insertAdjacentHTML( 'afterBegin', `<p>* ${ validateError }</p>` )
            validateErrorArray.push( { id : inputId, type : inputType, message : validateError } )
            validatedformResponse = returnResponse( true, validateErrorCode, validateErrorArray )
        }
    })

    return validatedformResponse
}



////////////////////////////////////////
/////// Validate Design Storage
////////////////////////////////////////
function validateDesignsStorage() {

    try {

        ///// Get Local Storages.
        let designsStorage = JSON.parse( localStorage.getItem( 'OP_PLUGIN_DATA_DESIGNS' ) )   
    
        ///// Create new Designs Storage if empty or undefined.
        if ( designsStorage == '' || designsStorage == undefined ) {
            return returnResponse( false, 204, { designs : [] } )
        } 
        
        if ( designsStorage ) return returnResponse( false, 200, designsStorage )

        throw 'Something went wrong with the Designs Storage validation!'
    
    } catch( validateError ) {
        return returnResponse( true, 400, validateError )
    }

}



////////////////////////////////////////
/////// Validate Booking Storage
////////////////////////////////////////
function validateBookingStorage() {

    try {

        ///// Get Local Storages.
        let bookingStorage = JSON.parse( localStorage.getItem( 'OP_PLUGIN_DATA_BOOKING' ) )   

        ///// Validate Booking Storage.
        if ( bookingStorage == '' || bookingStorage == undefined ) throw 'You are not loged in!'

        return returnResponse( false, 200, bookingStorage )

    } catch( validateError ) {
        return returnResponse( true, 400, validateError )
    }

}



////////////////////////////////////////
/////// Return Validation in Element
////////////////////////////////////////
function validationReturn( validationElement, message ) {

    validationElement.insertAdjacentHTML( 'afterbegin', `<div class="validation-error"><p>${ message }</p></div>` )

    validationElement.classList.add( 'active' )

}