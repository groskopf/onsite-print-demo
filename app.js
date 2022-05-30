////////////////////////////////////////
/////// Fetch from FastAPI
////////////////////////////////////////
async function fetchAPI( url, options ) {

    
    ///// Check for browser support of fetch in the window interface.
    if ( ! ( 'fetch' in window ) ) {
        console.log( 'Error: Fetch API not found, please upgrade your browser.' )
        return
    }
    
    ///// We can safely use fetch from now on.

    ///// Fetch from API.
    let request = await fetch( url, options )
        .then( response => response.text() )
        .then( JSON.parse )
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
        method: 'GET',
        //mode: 'no-cors', // no-cors, *cors, same-origin
        //method: 'POST' // TEST
    }

    ///// Request the data from the API.
    let request = fetchAPI( url, options )
    
    ///// Wait for Response of the Request.
    let response = await request

    ///// Show the Response in Console Log.
    //console.log(response);

    if ( response == '' || response == undefined ) {
        console.log( 'Error:', response )

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
	document.querySelector( '#get-images .inner' ).innerHTML = '';

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
    var url = 'https://api.printerboks.dk/api/v1/images'

    //var formdata = new FormData( querySelector( '#image-form' ) );
    var formdata = new FormData( document.forms['image-form'] );

    if ( document.forms['image-form']['image'].value == '' ) {
        console.log( 'Error: The input field is empty!' )
        
        ///// End the function.
        return
    }

    ///// Request Options for fetch.
    let options = {
        ///// *GET, POST, PUT, DELETE, etc.
        method: 'POST',
        body: formdata/* ,
        headers: {
            'Content-Type': 'application/json'
        } */
    }

    ///// Request the data from the API.
    let request = fetchAPI( url, options )
    
    ///// Wait for Response of the Request.
    let response = await request

    ///// If the Response is 'detail' or empty ).
    ///// Can be used in if statement instead ( Object.keys(response) == 'detail' ).
    if ( response.detail ) {

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
    } else if ( response == '' || response == 'undefined' ) {
        console.log( 'Error:', response )
        
        ///// End the function.
        return
    }
   
    ///// Clear elements
	document.querySelector( '#upload-image .inner' ).innerHTML = '';
    
    console.log( response.filename )

    let element = `
    <p>${response.filename}</p>
    `

    document.querySelector( '#upload-image .inner' ).insertAdjacentHTML( 'afterbegin', element )

}



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
    let request = fetchAPI( url, options )
    
    ///// Wait for Response of the Request.
    let response = await request

    ///// If the Response is 'detail' or empty ).
    ///// Can be used in if statement instead ( Object.keys(response) == 'detail' ).
    if ( response.detail ) {

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
    } else if ( response == '' || response == 'undefined' ) {
        console.log( 'Error:', response )

        ///// End the function.
        return
    }

    ///// Clear all elements in element ( #get-images .inner ). 
	document.querySelector( '#get-bookings .inner' ).innerHTML = '';

    console.log( response )

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





function get(url) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function() {
            // This is called even on 404 etc
            // so check the status
            if (req.status == 200) {
                // Resolve the promise with the response text
                resolve(req.response);
            }
            else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(Error(req.statusText));
            }
        };

        // Handle network errors
        req.onerror = function() {
            reject(Error("Network Error"));
        };

        // Make the request
        req.send();
    });
}
function letTry() {
    get('https://api.printerboks.dk/api/v1/upload/images1').then(function(response) {
        console.log("Success!", response);
    }, function(error) {
        console.error("Failed!", error);
    })
}