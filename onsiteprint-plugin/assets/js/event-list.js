////////////////////////////////////////
/////// Log in with Booking Code
////////////////////////////////////////
async function createNewEventList() {
    ///// Debug the function
    let debug = false //true 

    ///// Get the form element.
    let formElemnet = document.forms['login-with-booking-code']
    
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
    ///// fetchAPI( *url, options, 'blob/json', debug ).
    let request = fetchAPI( url, options, 'json', debug )
    
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

    localStorage.setItem( 'OP_PLUGIN_DATA_BOOKING', JSON.stringify(response) )
    checkLogin()

    const designsStorage = localStorage.getItem('OP_PLUGIN_DATA_DESIGNS')
 
    if ( ! designsStorage ) {
        let designsArray = { 'designs' : [] }
        localStorage.setItem( 'OP_PLUGIN_DATA_DESIGNS', JSON.stringify(designsArray) )
    }

}