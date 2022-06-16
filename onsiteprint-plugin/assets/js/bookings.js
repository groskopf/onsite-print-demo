////////////////////////////////////////
/////// Get Booking with Booking Code
////////////////////////////////////////
async function getBookingWithBookingCode() {
    ///// Debug the function
    let debug = false //true 

    ///// Get the element for output.
    let block = event.target.closest('.OP-block')
    let inputValidation = block.querySelector( '#booking-code-validation' )
    
    inputValidation.classList.remove( 'active' )
    inputValidation.innerHTML = ''

    ///// Get the form element.
    let formElemnet = block.querySelector('.get-booking-with-booking-code')
    
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

    ///// Get the element for output.
    let container = block.querySelector( '.inner' )

    ///// Clear all elements in the element. 
	container.innerHTML = ''

    ///// Create new element.
    let element = `
        <article>
            <p><b>Start Date:</b> ${response.start_date}</p>
            <p><b>End Date:</b> ${response.end_date}</p>
            <p><b>Name tag Type:</b> ${response.name_tag_type}</p>
            <p><b>Printer code:</b> ${response.printer_code}</p>
            <p><b>Booking code:</b> ${response.booking_code}</p>
        </article>
    `

    ///// Add element to the container. 
    container.insertAdjacentHTML( 'afterbegin', element )

    block.querySelector('.responses').classList.add('active')

}