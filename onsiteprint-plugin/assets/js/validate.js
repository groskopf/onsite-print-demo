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
    let validateErrorCode = validateRequest.code

    try {
        
        if ( validateMessage == '' ) throw 'Empty string!'

        if ( validateMessage == undefined ) throw 'Undefined string!'

        ///// If the Response is 'detail' or empty ).
        if ( validateMessage.detail ) throw validateMessage.detail

        return returnResponse( false, validateErrorCode, validateMessage )
    
    } catch( validateError ) {
        return returnResponse( true, validateErrorCode, validateError )
    }

}



////////////////////////////////////////
/////// Validate Form
////////////////////////////////////////
function validateForm( formElemnet, debug ) {
    
    let validatedformResponse, validateErrorCode

    let formInputs = formElemnet.querySelectorAll( 'input[required]' )
    consoleDebug( debug, 'formInputs:', formInputs )

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
/////// Validate Login
////////////////////////////////////////
function validateLogin( bookingCode ) {

    ///// Debug the function
    let debug = false // true or false 

    ///// Validate Bookings Storage.
    const bookingsStorageValidation = validateBookingsStorage()
    consoleDebug( debug, 'bookingsStorageValidation:', bookingsStorageValidation )
    if ( bookingsStorageValidation.error !== false ) return validationReturn( validationElement, bookingsStorageValidation.response )
    let bookingsStorageResponse = bookingsStorageValidation.response

    ///// Get Booking List.
    let bookingList = bookingsStorageResponse.bookingList
    consoleDebug( debug, 'bookingList:', bookingList )

    ///// Validate Booking List.
    if ( bookingList == '' || bookingList == undefined ) return returnResponse( false, 204, bookingsStorageResponse )

    ///// Get Booking. 
    let booking = bookingList.filter( bookingList => bookingList.booking.bookingId === bookingCode )
    consoleDebug( debug, 'booking:', booking )

    ///// Validate Booking. 
    if ( booking == '' || booking == undefined ) return returnResponse( false, 204, bookingsStorageResponse )

    ///// Validate Booking Id. 
    if ( bookingCode !== booking[0].booking.bookingId ) return returnResponse( false, 204, bookingsStorageResponse )

    ///// Return Booking Storage Response. 
    return returnResponse( false, 302, bookingsStorageResponse )

}



////////////////////////////////////////
/////// Validate Bookings Storage
////////////////////////////////////////
function validateBookingsStorage() {

    try {

        ///// Get Local Storages.
        let bookingsStorage = JSON.parse( localStorage.getItem( 'OP_PLUGIN_DATA_BOOKINGS' ) )   

        ///// Validate Bookings Storage.
        ///// Create new Bookings Storage if empty or undefined.
        if ( bookingsStorage == '' || bookingsStorage == undefined ) {
            return returnResponse( false, 204, { bookingList : [] } )
        } 

        if ( bookingsStorage ) return returnResponse( false, 200, bookingsStorage )

        throw 'Something went wrong with the Bookings Storage validation!'

    } catch( validateError ) {
        return returnResponse( true, 400, validateError )
    }

}



////////////////////////////////////////
/////// Validate Template Storage
////////////////////////////////////////
function validateTemplatesStorage() {

    try {

        ///// Get Local Storages.
        let templatesStorage = JSON.parse( localStorage.getItem( 'OP_PLUGIN_DATA_TEMPLATES' ) )   
    
        ///// Create new Templates Storage if empty or undefined.
        if ( templatesStorage == '' || templatesStorage == undefined ) {
            return returnResponse( false, 204, { templateList : [] } )
        } 
        
        if ( templatesStorage ) return returnResponse( false, 200, templatesStorage )

        throw 'Something went wrong with the Templates Storage validation!'
    
    } catch( validateError ) {
        return returnResponse( true, 400, validateError )
    }

}



////////////////////////////////////////
/////// Validate Event Storage
////////////////////////////////////////
function validateEventsStorage() {

    try {

        ///// Get Local Storages.
        let eventsStorage = JSON.parse( localStorage.getItem( 'OP_PLUGIN_DATA_EVENTS' ) )   
    
        ///// Create new Events Storage if empty or undefined.
        if ( eventsStorage == '' || eventsStorage == undefined ) {
            return returnResponse( false, 204, { eventList : [] } )
        } 
        
        if ( eventsStorage ) return returnResponse( false, 200, eventsStorage )

        throw 'Something went wrong with the Events Storage validation!'
    
    } catch( validateError ) {
        return returnResponse( true, 400, validateError )
    }

}



////////////////////////////////////////
/////// Search in Array / JSON / Object
////////////////////////////////////////
function searchInObject( object, perimeter, value ) {

    try {

        ///// If the function Perimeters are missing.
        if ( ! object || ! perimeter || ! value ) {
            throw 'Missing function Perimeters!'
        }
        
        let list, 
            searchElement, 
            searchObject = object.filter( template => template[ perimeter ] === value )
    
        ///// If Search are empty or undefined.
        if ( searchObject == '' || searchObject == undefined ) {
            throw 'Could not find anything!'
        }
        
        ///// If Search are a list.
        if ( searchObject.length === 1 ) {
            list = false
            searchElement = searchObject[0]
        } else {
            list = true
            searchElement = searchObject
        }

        return returnResponse( false, 200, searchElement = { list: list, search: searchElement } )
    
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