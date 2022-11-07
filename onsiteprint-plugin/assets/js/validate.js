////////////////////////////////////////
/////// Return the Response - #NG: Moved
////////////////////////////////////////
function consoleDebug( debug, name, response ) {
    if ( debug == true ) console.log( name, response )
}



////////////////////////////////////////
/////// Return the Response - #NG: Moved
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
function validateForm( formElement, debug ) {
    
    let validatedFormResponse, validateErrorCode

    let formInputs = formElement.querySelectorAll( 'input[required]' )
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
            validatedFormResponse = returnResponse( false, 200, 'Validation is approved!' )
        } catch( validateError ) {
            inputValidation.classList.add( 'active' )
            inputValidation.insertAdjacentHTML( 'afterBegin', `<p>* ${ validateError }</p>` )
            validateErrorArray.push( { id : inputId, type : inputType, message : validateError } )
            validatedFormResponse = returnResponse( true, validateErrorCode, validateErrorArray )
        }
    })

    return validatedFormResponse
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
/////// Validate Bookings Storage - #NG: Moved
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
/////// Validate Template Storage - #NG: Moved
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
/////// Validate Event Storage - #NG: Moved
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
            searchObject = object.filter( template => template[ perimeter ] == value )
    
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
/////// Universal Search in Array / JSON / Object
////////////////////////////////////////
function universalSearch( element, objectData = [], combinations = [] ) {
    // sniff out user input/search values and convert to lower-case
    const input = element.value.toLowerCase()

    // store the filtered results in : "const result"
    const result = objectData.filter( ( data ) => {
        // initialize a variable to store combos in : "let combinationQueries = ""
        let combinationQueries = ""

        // loop over the combo values paseed by users
        combinations.forEach( ( arg ) => {
            // first check if the current combo value exists in the object then ...
            // add them together
            combinationQueries +=
            data.hasOwnProperty( arg ) && data[ arg ].toLowerCase().trim() + " "
        })
        /*
            loop over current "Object keys" and return the first
            successful search match (".some()" at work here)
        */
        return Object.keys( data ).some( ( key ) => {
            /**
             * return first successful search query match but...
             * do not return if value is "undefined", "null", false, true,  and...
             * trim values to remove trailing whitespaces
             */
            return (
                ( data[ key ] !== undefined &&
                    data[ key ] !== null &&
                    /**
                     * activate/uncomment the feature/code below if you don't wanna filter by boolean values
                     * e.g isActive fields, or isActivated fields
                     */
                     data[key] !== false && data[key] == true &&
                    JSON.stringify( data[ key ] ).toLowerCase().trim().includes( input ) ) ||
                combinationQueries.trim().includes( input )
            )
        })
    })
    // function to recieve the result of the search query data
    return result
}



////////////////////////////////////////
/////// Return Validation in Element - #NG: Moved
////////////////////////////////////////
function validationReturn( validationElement, message ) {

    validationElement.insertAdjacentHTML( 'afterbegin', `<div class="validation-error"><p>${ message }</p></div>` )

    validationElement.classList.add( 'active' )

}