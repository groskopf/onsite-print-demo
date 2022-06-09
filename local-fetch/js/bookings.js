////////////////////////////////////////
/////// Get all Bookings
////////////////////////////////////////
async function getAllBookings() {

    ///// The URL to the API.
    let url = 'https://api.printerboks.dk/api/v1/bookings/'

    ///// Request Options for fetch.
    let options = {
        ///// *GET, POST, PUT, DELETE, etc.
        method: 'GET'
    }

    ///// Request the data from the API.
    ///// fetchAPI( *url, options, 'blob', 'debug' ).
    let request = fetchAPI( url, options )
    
    ///// Wait for Response of the Request.
    let response = await request

    ///// Show the Response in Console Log.
    //console.log(response)

    ///// If the Response is empty or undefined.
    if ( response == '' || response == undefined ) {
        console.log( 'Error: The Response is empty or undefined.' )

        ///// End the function.
        return
    }

    ///// If the Response is 'detail' or empty ).
    ///// Can be used in if statement instead ( Object.keys(response) == 'detail' ).
    else if ( response.detail ) {

        ///// Get the Detail array.
        let detail = response.detail

        for( let i = 0; i < detail.length; i++ ){

            ///// If loc array in the Detail array contains 'image'.
            if ( detail[i].loc[1] ) {
                console.log( 'Message:', detail[i].loc[1], detail[i].msg )
            } else {
                console.log( 'Error:', response )
            }
       
        }
        
        ///// End the function.
        return
    }

    ///// Get the element for output.
    let container = document.querySelector( '#get-all-bookings .inner' )

    ///// Clear all elements in the element. 
	container.innerHTML = ''

    ///// Repeat for each element in the response. 
    for( let i = 0; i < response.length; i++ ){

        ///// Create new element.
        let element = `
            <article>
                <p><b>Start Date:</b> ${response[i].start_date}</p>
                <p><b>End Date:</b> ${response[i].end_date}</p>
                <p><b>Name tag Type:</b> ${response[i].name_tag_type}</p>
                <p><b>Printer code:</b> ${response[i].printer_code}</p>
                <p><b>Booking code:</b> ${response[i].booking_code}</p>
            </article>
        `

        ///// Add element to the container. 
        container.insertAdjacentHTML( 'afterbegin', element )
    }

}



////////////////////////////////////////
/////// Create new Booking
////////////////////////////////////////
async function createNewBooking() {

    ///// Get the form element.
    let formElemnet = document.forms['create-new-booking']
    
    ///// Get data from the form element.
    let formData = new FormData( formElemnet )
    
    ///// Get Start Date (date) value form form.
    let startDate = formData.get('start_date')
    
    ///// Get End Date (date) value form form.
    let endDate = formData.get('end_date')

    ///// Get Printer code (select/option) value form form.
    let printerCode = formData.get('printer_code')

    ///// Get Tag name Type (select/option) value form form.
    let nameTagType = formData.get('name_tag_type')

    ///// Show the Form data in Console Log.
    //console.log('start_date:', startDate, 'end_date:', endDate, 'printer_code:', printerCode, 'name_tag_type:', nameTagType)

    ///// The URL to the API.
    let url = `https://api.printerboks.dk/api/v1/bookings/?start_date=${startDate}&end_date=${endDate}&printer_code=${printerCode}&name_tag_type=${nameTagType}`

    ///// Request Options for fetch.
    let options = {
        ///// *GET, POST, PUT, DELETE, etc.
        method: 'POST'
    }

    ///// Request the data from the API.
    ///// fetchAPI( *url, options, 'blob', 'debug' ).
    let request = fetchAPI( url, options )
    
    ///// Wait for Response of the Request.
    let response = await request

    ///// Show the Response in Console Log.
    console.log(response)

    ///// If the Response is empty or undefined.
    if ( response == '' || response == undefined ) {
        console.log( 'Error: The Response is empty or undefined.' )

        ///// End the function.
        return
    }

    ///// If the Response is 'detail' or empty ).
    ///// Can be used in if statement instead ( Object.keys(response) == 'detail' ).
    else if ( response.detail ) {

        ///// Get the Detail array.
        let detail = response.detail

        for( let i = 0; i < detail.length; i++ ){

            ///// If loc array in the Detail array contains 'image'.
            if ( detail[i].loc[1] ) {
                console.log( 'Message:', detail[i].loc[1], detail[i].msg )
            } else {
                console.log( 'Error:', response )
            }
        
        }
        
        ///// End the function.
        return
    }

    ///// Get the element for output.
    let container = document.querySelector( '#create-new-booking .inner' )

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
    
}



////////////////////////////////////////
/////// Get Booking with Booking Code
////////////////////////////////////////
async function getBookingWithBookingCode() {

    ///// Get the form element.
    let formElemnet = document.forms['get-booking-with-booking-code']
    
    ///// Get booking-code (text) value form form.
    let bookingCode = formElemnet['booking-code'].value
    
    ///// If the booking-code (text) value is empty.
    if ( ! bookingCode ) {
        console.log( 'Error: The input field is empty!' )
        
        ///// End the function.
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
    ///// fetchAPI( *url, options, 'blob', 'debug' ).
    let request = fetchAPI( url, options )
    
    ///// Wait for Response of the Request.
    let response = await request

    ///// Show the Response in Console Log.
    //console.log(response);

    ///// If the Response is empty or undefined.
    if ( response == '' || response == undefined ) {
        console.log( 'Error: The Response is empty or undefined.' )

        ///// End the function.
        return
    }

    ///// If the Response is 'detail' or empty ).
    ///// Can be used in if statement instead ( Object.keys(response) == 'detail' ).
    else if ( response.detail ) {

        ///// Get the Detail array.
        let detail = response.detail

        for( let i = 0; i < detail.length; i++ ){

            ///// If loc array in the Detail array contains 'image'.
            if ( detail[i].loc[1] ) {
                console.log( 'Message:', detail[i].loc[1], detail[i].msg )
            } else {
                console.log( 'Error:', response )
            }
       
        }
        
        ///// End the function.
        return
    }

    ///// Get the element for output.
    let container = document.querySelector( '#get-booking-with-booking-code .inner' )

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

}



////////////////////////////////////////
/////// Update Booking with Booking Code
////////////////////////////////////////
async function updateBookingWithBookingCode() {

    ///// Get the form element.
    let formElemnet = document.forms['update-booking-with-booking-code']
    
    ///// Get data from the form element.
    let formData = new FormData( formElemnet )
    
    ///// Get Start Date (date) value form form.
    let startDate = formData.get('start_date')
    
    ///// Get End Date (date) value form form.
    let endDate = formData.get('end_date')

    ///// Get Printer code (select/option) value form form.
    let printerCode = formData.get('printer_code')

    ///// Get Tag name Type (select/option) value form form.
    let nameTagType = formData.get('name_tag_type')

    ///// Get booking-code (text) value form form.
    let bookingCode = formData.get('booking-code')

    ///// Show the Form data in Console Log.
    //console.log('start_date:', startDate, 'end_date:', endDate, 'printer_code:', printerCode, 'name_tag_type:', nameTagType, 'booking_code:', bookingCode)

    ///// The URL to the API.
    let url = `https://api.printerboks.dk/api/v1/bookings/${bookingCode}?start_date=${startDate}&end_date=${endDate}&printer_code=${printerCode}&name_tag_type=${nameTagType}`

    ///// Request Options for fetch.
    let options = {
        ///// *GET, POST, PUT, DELETE, etc.
        method: 'PUT'
    }

    ///// Request the data from the API.
    ///// fetchAPI( *url, options, 'blob', 'debug' ).
    let request = fetchAPI( url, options )
    
    ///// Wait for Response of the Request.
    let response = await request

    ///// Show the Response in Console Log.
    console.log(response);

    ///// If the Response is empty or undefined.
    if ( response == '' || response == undefined ) {
        console.log( 'Error: The Response is empty or undefined.' )

        ///// End the function.
        return
    }

    ///// If the Response is 'detail' or empty ).
    ///// Can be used in if statement instead ( Object.keys(response) == 'detail' ).
    else if ( response.detail ) {

        ///// Get the Detail array.
        let detail = response.detail

        for( let i = 0; i < detail.length; i++ ){

            ///// If loc array in the Detail array contains 'image'.
            if ( detail[i].loc[1] ) {
                console.log( 'Message:', detail[i].loc[1], detail[i].msg )
            } else {
                console.log( 'Error:', response )
            }
       
        }
        
        ///// End the function.
        return
    }

    ///// Get the element for output.
    let container = document.querySelector( '#update-booking-with-booking-code .inner' )

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

}



////////////////////////////////////////
/////// Delete Booking with Booking Code
////////////////////////////////////////
async function deleteBookingWithBookingCode() {

    ///// Get the form element.
    let formElemnet = document.forms['delete-booking-with-booking-code']
    
    ///// Get booking-code (text) value form form.
    let bookingCode = formElemnet['booking-code'].value
    
    ///// If the booking-code (text) value is empty.
    if ( ! bookingCode ) {
        console.log( 'Error: The input field is empty!' )
        
        ///// End the function.
        return
    }
   
    ///// The URL to the API.
    let url = 'https://api.printerboks.dk/api/v1/bookings/'+bookingCode

    ///// Request Options for fetch.
    let options = {
        ///// *GET, POST, PUT, DELETE, etc.
        method: 'DELETE'
    }

    ///// Request the data from the API.
    ///// fetchAPI( *url, options, 'blob', 'debug' ).
    let request = fetchAPI( url, options )
    
    ///// Wait for Response of the Request.
    let response = await request

    ///// Show the Response in Console Log.
    //console.log(response)

    ///// If the Response is empty or undefined.
    if ( response == '' || response == undefined ) {
        console.log( 'Error: The Response is empty or undefined.' )

        ///// End the function.
        return
    }

    ///// If the Response is 'detail' or empty ).
    ///// Can be used in if statement instead ( Object.keys(response) == 'detail' ).
    else if ( response.detail ) {

        ///// Get the Detail array.
        let detail = response.detail

        for( let i = 0; i < detail.length; i++ ){

            ///// If loc array in the Detail array contains 'image'.
            if ( detail[i].loc[1] ) {
                console.log( 'Message:', detail[i].loc[1], detail[i].msg )
            } else {
                console.log( 'Error:', response )
            }
       
        }
        
        ///// End the function.
        return
    }

    ///// Get the element for output.
    let container = document.querySelector( '#delete-booking-with-booking-code .inner' )

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

}