////////////////////////////////////////
/////// Get Bookings
////////////////////////////////////////
async function getBookings() {

    ///// The URL to the API.
    var url = 'https://api.printerboks.dk/api/v1/bookings/'

    ///// Request Options for fetch.
    let options = {
        ///// *GET, POST, PUT, DELETE, etc.
        method: 'GET'
    }

    ///// Request the data from the API.
    ///// fetchAPI( *url, options, 'blob', 'debug' )
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

        for( var i = 0; i < detail.length; i++ ){

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

    ///// Clear all elements in element ( #get-bookings .inner ). 
	document.querySelector( '#get-bookings .inner' ).innerHTML = ''

    for( var i = 0; i < response.length; i++ ){

        let element = `
            <article>
                <p><b>Start Date:</b> ${response[i].start_date}</p>
                <p><b>End Date:</b> ${response[i].end_date}</p>
                <p><b>Printer:</b> ${response[i].printer_code}</p>
                <p><b>Product:</b> ${response[i].name_tag_type}</p>
                <p><b>Code:</b> ${response[i].code}</p>
            </article>
        `

        document.querySelector( '#get-bookings .inner' ).insertAdjacentHTML( 'afterbegin', element )
    }

}



////////////////////////////////////////
/////// Create Booking
////////////////////////////////////////
async function createBooking() {

    var formData = new FormData( document.forms['booking-form'] );

    var startDate = formData.get('start_date')
    var endDate = formData.get('end_date')
    var printerCode = formData.get('printer_code')
    var nameTagType = formData.get('name_tag_type')

    console.log('start_date:', startDate, 'end_date:', endDate, 'printer_code:', printerCode, 'name_tag_type:', nameTagType)

    ///// The URL to the API.
    var url = `https://api.printerboks.dk/api/v1/bookings/?start_date=${startDate}&end_date=${endDate}&printer_code=${printerCode}&name_tag_type=${nameTagType}`

    ///// Request Options for fetch.
    let options = {
        ///// *GET, POST, PUT, DELETE, etc.
        method: 'POST'
    }

    ///// Request the data from the API.
    ///// fetchAPI( *url, options, 'blob', 'debug' )
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

        for( var i = 0; i < detail.length; i++ ){

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

    ///// Clear all elements in element ( #get-booking .inner ). 
	document.querySelector( '#create-booking .inner' ).innerHTML = ''

    let element = `
        <article>
            <p><b>Start Date:</b> ${response.start_date}</p>
            <p><b>End Date:</b> ${response.end_date}</p>
            <p><b>Printer:</b> ${response.printer_code}</p>
            <p><b>Product:</b> ${response.name_tag_type}</p>
            <p><b>Code:</b> ${response.code}</p>
        </article>
    `

    document.querySelector( '#create-booking .inner' ).insertAdjacentHTML( 'afterbegin', element )
}



////////////////////////////////////////
/////// Get Booking with Code
////////////////////////////////////////
async function getBookingWithCode() {

    var bookingCode = document.forms['get-booking-with-code']['booking-code'].value
    
    if ( ! bookingCode ) {
        console.log( 'Error: The input field is empty!' )
        
        ///// End the function.
        return
    }
    
    ///// The URL to the API.
    var url = 'https://api.printerboks.dk/api/v1/bookings/'+bookingCode

    ///// Request Options for fetch.
    let options = {
        ///// *GET, POST, PUT, DELETE, etc.
        method: 'GET'
    }

    ///// Request the data from the API.
    ///// fetchAPI( *url, options, 'blob', 'debug' )
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

        for( var i = 0; i < detail.length; i++ ){

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

    ///// Clear all elements in element ( #get-booking-with-code .inner ). 
	document.querySelector( '#get-booking-with-code .inner' ).innerHTML = ''

    let element = `
        <article>
            <p><b>Start Date:</b> ${response.start_date}</p>
            <p><b>End Date:</b> ${response.end_date}</p>
            <p><b>Printer:</b> ${response.printer_code}</p>
            <p><b>Product:</b> ${response.name_tag_type}</p>
            <p><b>Code:</b> ${response.code}</p>
        </article>
    `

    document.querySelector( '#get-booking-with-code .inner' ).insertAdjacentHTML( 'afterbegin', element )

}



////////////////////////////////////////
/////// Update Booking with Code
////////////////////////////////////////
async function updateBookingWithCode() {

    var formData = new FormData( document.forms['update-booking-with-code'] )

    var bookingCode = formData.get('booking-code')
    var startDate = formData.get('start-date')
    var endDate = formData.get('end-date')
    var printerCode = formData.get('printer-code')
    var nameTagType = formData.get('name-tag-type')

    console.log('start_date:', startDate, 'end_date:', endDate, 'printer_code:', printerCode, 'name_tag_type:', nameTagType)

    ///// The URL to the API.
    var url = `https://api.printerboks.dk/api/v1/bookings/${bookingCode}?start_date=${startDate}&end_date=${endDate}&printer_code=${printerCode}&name_tag_type=${nameTagType}`

    ///// Request Options for fetch.
    let options = {
        ///// *GET, POST, PUT, DELETE, etc.
        method: 'PUT'
    }

    ///// Request the data from the API.
    ///// fetchAPI( *url, options, 'blob', 'debug' )
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

        for( var i = 0; i < detail.length; i++ ){

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

    ///// Clear all elements in element ( #update-booking-with-code .inner ). 
	document.querySelector( '#update-booking-with-code .inner' ).innerHTML = ''

    let element = `
        <article>
            <p><b>Start Date:</b> ${response.start_date}</p>
            <p><b>End Date:</b> ${response.end_date}</p>
            <p><b>Printer:</b> ${response.printer_code}</p>
            <p><b>Product:</b> ${response.name_tag_type}</p>
            <p><b>Code:</b> ${response.code}</p>
        </article>
    `

    document.querySelector( '#update-booking-with-code .inner' ).insertAdjacentHTML( 'afterbegin', element )
}



////////////////////////////////////////
/////// Delete Booking with Code
////////////////////////////////////////
async function deleteBookingWithCode() {

    var bookingCode = document.forms['delete-booking-with-code']['booking-code'].value
    
    if ( ! bookingCode ) {
        console.log( 'Error: The input field is empty!' )
        
        ///// End the function.
        return
    }
    
    ///// The URL to the API.
    var url = 'https://api.printerboks.dk/api/v1/bookings/'+bookingCode

    ///// Request Options for fetch.
    let options = {
        ///// *GET, POST, PUT, DELETE, etc.
        method: 'DELETE'
    }

    ///// Request the data from the API.
    ///// fetchAPI( *url, options, 'blob', 'debug' )
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

        for( var i = 0; i < detail.length; i++ ){

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

    ///// Clear all elements in element ( #delete-booking-with-code .inner ). 
	document.querySelector( '#delete-booking-with-code .inner' ).innerHTML = ''

    let element = `
        <article>
            <p><b>Start Date:</b> ${response.start_date}</p>
            <p><b>End Date:</b> ${response.end_date}</p>
            <p><b>Printer:</b> ${response.printer_code}</p>
            <p><b>Product:</b> ${response.name_tag_type}</p>
            <p><b>Code:</b> ${response.code}</p>
        </article>
    `

    document.querySelector( '#delete-booking-with-code .inner' ).insertAdjacentHTML( 'afterbegin', element )

}