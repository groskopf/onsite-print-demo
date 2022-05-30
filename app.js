////////////////////////////////////////
/////// Fetch from FastAPI
////////////////////////////////////////
async function fetchAPI( url, options, output, debug ) {

    
    ///// Check for browser support of fetch in the window interface.
    if ( ! ( 'fetch' in window ) ) {
        console.log( 'Error: Fetch API not found, please upgrade your browser.' )
        return
    }
    
    ///// We can safely use fetch from now on.

    ///// Fetch from API.
    let request = await fetch( url, options )
        .then( response => {

            ///// If (Debug) parameter in the function is enabled.
            ///// Show the Response in Console Log.
            if ( debug ) {
                console.log( 'Response debug:', response )
            }

            ///// If (Output) parameter in the function is enabled.
            ///// Return the Data as a Blob else JSON.
            if ( output == 'blob' ) {
                return response.blob()
            } else {        
                return response.json()
            }

        })
        .catch( error => console.log( 'Error:', error ) )

    ///// Return the Data.
    return request
}



////////////////////////////////////////
/////// Get Images
////////////////////////////////////////
async function getImages() {

    ///// The URL to the API.
    var url = 'https://api.printerboks.dk/api/v1/images/'

    ///// Request Options for fetch.
    let options = {
        ///// *GET, POST, PUT, DELETE, etc.
        method: 'GET'
        //mode: 'no-cors', // no-cors, *cors, same-origin
        //method: 'POST' // TEST
    }

    ///// Request the data from the API.
    ///// fetchAPI( *url, options, 'blob', 'debug' )
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
        let detail = response.detail[0]
        
        ///// If loc array in the Detail array contains 'image'.
        if ( detail.loc.includes( 'image' ) ) {
            console.log( 'Message:', detail.msg )
        } else {
            console.log( 'Error:', response )
        }
        
        ///// End the function.
        return
    }

    ///// Clear all elements in element ( #get-images .inner ). 
	document.querySelector( '#get-images .inner' ).innerHTML = ''

    for( var i = 0; i < response.length; i++ ){

        let element = `
        <img src="https://api.printerboks.dk/api/v1/${response[i].filename}" width="100%" height="auto">
        `

        document.querySelector( '#get-images .inner' ).insertAdjacentHTML( 'afterbegin', element )
    }

}



////////////////////////////////////////
/////// Upload Image
////////////////////////////////////////
async function uploadImage() {

    ///// The URL to the API.
    var url = 'https://api.printerboks.dk/api/v1/images/'

    //var formdata = new FormData( querySelector( '#image-form' ) )
    var formdata = new FormData( document.forms['image-form'] )

    if ( document.forms['image-form']['image'].value == '' ) {
        console.log( 'Error: The input field is empty!' )
        
        ///// End the function.
        return
    }

    ///// Request Options for fetch.
    let options = {
        ///// *GET, POST, PUT, DELETE, etc.
        method: 'POST',
        body: formdata
    }

    ///// Request the data from the API.
    ///// fetchAPI( *url, options, 'blob', 'debug' )
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
        let detail = response.detail[0]
        
        ///// If loc array in the Detail array contains 'image'.
        if ( detail.loc.includes( 'image' ) ) {
            console.log( 'Message:', detail.msg )
        } else {
            console.log( 'Error:', response )
        }
        
        ///// End the function.
        return
    }
   
    ///// Clear elements
	document.querySelector( '#upload-image .inner' ).innerHTML = ''
    
    let element = `
    <img src="https://api.printerboks.dk/api/v1/${response.filename}" width="100%" height="auto">
    `

    document.querySelector( '#upload-image .inner' ).insertAdjacentHTML( 'afterbegin', element )

}



////////////////////////////////////////
/////// Get Image
////////////////////////////////////////
async function getImage() {

    var imageFileName = document.forms['get-image-form']['image-file-name'].value

    if ( ! imageFileName ) {
        console.log( 'Error: The input field is empty!' )
        
        ///// End the function.
        return
    }

    ///// The URL to the API.
    var url = 'https://api.printerboks.dk/api/v1/images/'+imageFileName
    //console.log(url);

    ///// Request Options for fetch.
    let options = {
        ///// *GET, POST, PUT, DELETE, etc.
        method: 'GET'
    }

    ///// Request the data from the API.
    ///// fetchAPI( *url, options, 'blob', 'debug' )
    let request = fetchAPI( url, options, 'blob' )
    
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
        let detail = response.detail[0]
        
        ///// If loc array in the Detail array contains 'image'.
        if ( detail.loc.includes( 'image' ) ) {
            console.log( 'Message:', detail.msg )
        } else {
            console.log( 'Error:', response )
        }
        
        ///// End the function.
        return
    }
   
    ///// Clear elements
	document.querySelector( '#get-image .inner' ).innerHTML = ''
    
    let element = `
    <img src="${URL.createObjectURL(response)}" width="100%" height="auto">
    `

    document.querySelector( '#get-image .inner' ).insertAdjacentHTML( 'afterbegin', element )

}



////////////////////////////////////////
/////// Delete Image
////////////////////////////////////////
async function deleteImage() {

    var imageFileName = document.forms['delete-image-form']['image-file-name'].value

    if ( ! imageFileName ) {
        console.log( 'Error: The input field is empty!' )
        
        ///// End the function.
        return
    }

    ///// The URL to the API.
    var url = 'https://api.printerboks.dk/api/v1/images/'+imageFileName
    //console.log(url);

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
        let detail = response.detail[0]
        
        ///// If loc array in the Detail array contains 'image'.
        if ( detail.loc.includes( 'image' ) ) {
            console.log( 'Message:', detail.msg )
        } else {
            console.log( 'Error:', response )
        }
        
        ///// End the function.
        return
    }
   
    ///// Clear elements
	document.querySelector( '#delete-image .inner' ).innerHTML = ''
    
    let element = `<p>File: (${response.filename}) was deleted.</p>`

    document.querySelector( '#delete-image .inner' ).insertAdjacentHTML( 'afterbegin', element )

}



///////////////////////////////////////////////////////////////////

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
        //method: 'POST' // TEST
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
        let detail = response.detail[0]
        
        ///// If loc array in the Detail array contains 'image'.
        if ( detail.loc.includes( 'image' ) ) {
            console.log( 'Message:', detail.msg )
        } else {
            console.log( 'Error:', response )
        }
        
        ///// End the function.
        return
    }

    ///// Clear all elements in element ( #get-images .inner ). 
	document.querySelector( '#get-bookings .inner' ).innerHTML = '';

    for( var i = 0; i < response.length; i++ ){

        let element = `
        <p><b>Start Date:</b> ${response[i].start_date}</p>
        <p><b>End Date:</b> ${response[i].end_date}</p>
        <p><b>Printer:</b> ${response[i].printer_code}</p>
        <p><b>Product:</b> ${response[i].name_tag_type}</p>
        <p><b>Code:</b> ${response[i].code}</p>
        <hr>
        `

        document.querySelector( '#get-bookings .inner' ).insertAdjacentHTML( 'afterbegin', element )
    }

}



////////////////////////////////////////
/////// Create Booking
////////////////////////////////////////
async function createBooking() {
	// Clear elements
	document.querySelector("#create-booking .inner").innerHTML = "";

    var formData = new FormData(document.querySelector('#booking-form'));

    var startDate = formData.get('start_date')
    var endDate = formData.get('end_date')
    var printerCode = formData.get('printer_code')
    var nameTagType = formData.get('name_tag_type')

    console.log('start_date:', startDate, 'end_date:', endDate, 'printer_code:', printerCode, 'name_tag_type:', nameTagType)

    //return

    var requestOptions = {
        method: 'POST',
    }

    let getImagesRequest = await fetch(`https://api.printerboks.dk/api/v1/bookings/?start_date=${startDate}&end_date=${endDate}&printer_code=${printerCode}&name_tag_type=${nameTagType}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('Error:', error))
}