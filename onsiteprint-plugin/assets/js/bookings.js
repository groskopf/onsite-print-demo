////////////////////////////////////////
/////// Show Booking
////////////////////////////////////////
async function showBooking() {
    ///// Debug the function
    let debug = false //true 

    ///// Get the element for output.
    let block = event.target.closest('section[id*="op-block"]')
    let validationElement = block.querySelector( '.validation-info' )
    let formElement = block.querySelector('.get-booking-form')
        
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

    ///// Get the element for output.
    let container = block.querySelector( '.inner' )

    ///// Clear all elements in the element. 
	container.innerHTML = ''

    ///// Create new element.
    let element = `
        <article>
            <p><b>Start Date:</b> ${ bookingResponse.start_date }</p>
            <p><b>End Date:</b> ${ bookingResponse.end_date }</p>
            <p><b>Name tag Type:</b> ${ bookingResponse.name_tag_type }</p>
            <p><b>Printer code:</b> ${ bookingResponse.printer_code }</p>
            <p><b>Booking code:</b> ${ bookingResponse.booking_code }</p>
        </article>
    `

    ///// Add element to the container. 
    container.insertAdjacentHTML( 'afterbegin', element )

    block.querySelector('.responses').classList.add('active')

}