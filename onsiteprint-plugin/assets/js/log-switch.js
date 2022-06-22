////////////////////////////////////////
/////// Log in with Booking Code
////////////////////////////////////////
async function loginWithBookingCode() {

    ///// Debug the function
    let debug = false // true or false 

    ///// Get the elements.
    let block = event.target.closest( 'section[id*="op-block"]' )
    let validationElement = block.querySelector( '.validation-info' )
    let formElement = block.querySelector('.login-form')
    
    ///// Clear the Validation Info Element. 
	validationElement.innerHTML = ''
    validationElement.classList.remove( 'active' )

    ///// Get booking-code (text) value form form.
    let bookingCode = formElement['booking-code'].value   

    ///// Validate Form Data.
    const formValidation = validateForm( formElement )
    consoleDebug( debug, 'formValidation:', formValidation )
    if ( formValidation.error !== false ) return validationReturn( validationElement, formValidation.response )
          
    ///// Get Upload new Image Response from FastAPI.
    const bookingValidation = await getBookingWithBookingCode( bookingCode, validationElement )
    consoleDebug( debug, 'bookingValidation:', bookingValidation )
    let bookingResponse = bookingValidation.response

    ///// Validate Designs Storage.
    const designsStorageValidation = validateDesignsStorage()
    consoleDebug( debug, 'designsStorageValidation:', designsStorageValidation )
    if ( designsStorageValidation.error !== false ) return validationReturn( validationElement, designsStorageValidation.response )
    let designsStorageResponse = designsStorageValidation.response    
    
    ///// Validate Events Storage.
    const eventsStorageValidation = validateEventsStorage()
    consoleDebug( debug, 'eventsStorageValidation:', eventsStorageValidation )
    if ( eventsStorageValidation.error !== false ) return validationReturn( validationElement, eventsStorageValidation.response )
    let eventsStorageResponse = eventsStorageValidation.response
    
    ///// Set Lacal Storage.
    localStorage.setItem( 'OP_PLUGIN_DATA_BOOKING', JSON.stringify( bookingResponse ) )
    localStorage.setItem( 'OP_PLUGIN_DATA_DESIGNS', JSON.stringify( designsStorageResponse ) )
    localStorage.setItem( 'OP_PLUGIN_DATA_EVENTS', JSON.stringify( eventsStorageResponse ) )


    //////////////////////////////////////////
    ///// #NG Below must be changed later.
    //////////////////////////////////////////


    window.location.reload()

}