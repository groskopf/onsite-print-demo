////////////////////////////////////////
/////// Get Booking with Booking Code
////////////////////////////////////////
async function getBookingWithBookingCode( bookingCode, validationElement ) {
    ///// Debug the function
    let debug = false //true

    ///// The URL to the API.
    let url = `https://api.printerboks.dk/api/v1/bookings/${ bookingCode }`

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
    //console.log( fetchResponse )

    const fetchResponseValidation = validateFetchResponse( fetchResponse )
    //console.log( fetchResponseValidation )
       
    ///// If the Fetch Response has an Error.
    if ( fetchResponseValidation.error !== false ) return validationReturn( validationElement, fetchResponseValidation.response )

    ///// Return the validated response. 
    return fetchResponseValidation

}



////////////////////////////////////////
/////// Upload new Image
////////////////////////////////////////
async function uploadNewImage( formData, validationElement ) {

    ///// Debug the function
    let debug = false //true 

    ///// The URL to the API.
    var url = 'https://api.printerboks.dk/api/v1/images/'

    ///// Request Options for fetch.
    let options = {
        ///// *GET, POST, PUT, DELETE, etc.
        method: 'POST',
        body: formData
    }

    ///// Request the data from the API.
    ///// fetchAPI( *url, options, 'blob/json', debug ).
    let request = fetchAPI( url, options, 'json', debug )
    
    ///// Wait for Response of the Request.
    let fetchResponse = await request
    //console.log( fetchResponse )

    const fetchResponseValidation = validateFetchResponse( fetchResponse )
    //console.log( fetchResponseValidation )
       
    ///// If the Fetch Response has an Error.
    if ( fetchResponseValidation.error !== false ) return validationReturn( validationElement, fetchResponseValidation.response )

    ///// Return the validated response. 
    return fetchResponseValidation

}



////////////////////////////////////////
/////// Get Name Tag Type
////////////////////////////////////////
async function getNameTagType( nameTagType, validationElement ) {

    ///// Debug the function
    let debug = false //true 

    ///// The URL to the API.
    let url = 'https://api.printerboks.dk/api/v1/layouts/name_tags/'+nameTagType

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
    //console.log( fetchResponse )

    const fetchResponseValidation = validateFetchResponse( fetchResponse )
    //console.log( fetchResponseValidation )
           
    ///// If the Fetch Response has an Error.
    if ( fetchResponseValidation.error !== false ) return validationReturn( validationElement, fetchResponseValidation.response )

    ///// Return the validated response. 
    return fetchResponseValidation

}