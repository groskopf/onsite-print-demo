////////////////////////////////////////
/////// Log in with Booking Code
////////////////////////////////////////
async function loginWithBookingCode() {
    ///// Debug the function
    let debug = false //true 

    ///// Get the element for output.
    let block = event.target.closest('section[id*="op-block"]')
    let blockId = block.getAttribute('id')
    let formElemnet = block.querySelector('.login-form')
    
    let inputValidation = block.querySelector( `#${blockId}-booking-code-validation` )   
    inputValidation.classList.remove( 'active' )
    inputValidation.innerHTML = ''
    
    ///// Get booking-code (text) value form form.
    let bookingCode = formElemnet['booking-code'].value   

    ///// If the booking-code (text) value is empty.
    if ( ! bookingCode ) {
        inputValidation.classList.add( 'active' )
        inputValidation.insertAdjacentHTML( 'afterBegin', '<p>* The input field is empty!</p>' )
        return
    }
      
    ///// The URL to the API.
    let url = 'https://api.printerboks.dk/api/v1/bookings/'+bookingCode

    ///// Request Options for fetch.
    let options = {
        ///// *GET, POST, PUT, DELETE, etc.
        method: 'GET'
    }

    ///// Request the data from the API.
    ///// fetchAPI( *url, options, 'blob/json', debug ).
    let request = fetchAPI( url, options, 'json', debug )
    
    ///// Wait for Response of the Request.
    let fetchResponse = await request
    //console.log(fetchResponse)
    
    let validateResponse = validateFetchResponse( fetchResponse )
    console.log(validateResponse)
    
    const response = validateResponse.response

    if ( validateResponse.error == true ) {
        inputValidation.classList.add( 'active' )
        inputValidation.insertAdjacentHTML( 'afterBegin', '<p>* '+response+'</p>' )
        return
    }

    localStorage.setItem( 'OP_PLUGIN_DATA_BOOKING', JSON.stringify(response) )

    const designsStorage = localStorage.getItem('OP_PLUGIN_DATA_DESIGNS')
 
    if ( ! designsStorage ) {
        let designsArray = { 'designs' : [] }
        localStorage.setItem( 'OP_PLUGIN_DATA_DESIGNS', JSON.stringify(designsArray) )
    }

    window.location.reload()

}