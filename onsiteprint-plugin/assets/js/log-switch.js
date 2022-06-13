////////////////////////////////////////
/////// Cross-browser implementation of element.addEventListener()
////////////////////////////////////////
function listen( evnt, elem, func ) {
    if ( elem.addEventListener )  // W3C DOM
        elem.addEventListener( evnt, func, false )
    else if (elem.attachEvent) { // IE DOM
         var r = elem.attachEvent( "on"+evnt, func )
         return r
    }
    else window.alert( 'I\'m sorry Dave, I\'m afraid I can\'t do that.' )
}
// Use: listen( 'event name', elem, func )



////////////////////////////////////////
/////// Check if the user are Loged in
////////////////////////////////////////
function checkLogin() {
    
    const login = localStorage.getItem('OP_PLUGIN_DATA_BOOKING')
    
    ///// Show the Login info in Console Log.
    //console.log( login )

    ///// Get the element for output.
    let container = document.querySelector( '#login-info' )
    let content = container.querySelector( '.content' )

    ///// Clear all elements in the element. 
	content.innerHTML = ''

    if ( ! login ) {
        //console.log( 'Ohhh!!!' )
        container.setAttribute( 'data-loged-in', false )
        document.querySelector( '#login-with-booking-code' ).classList.add('active')
        document.querySelector( '#logout' ).classList.remove('active')
        ///// Add element to the content.
        content.insertAdjacentHTML( 'afterbegin', `<h2 class="info">Ohhh!! You are not loged in!</h2>` )
    } else {
        //console.log( 'Yeah!!!' )       
        container.setAttribute('data-loged-in', true )
        document.querySelector( '#login-with-booking-code' ).classList.remove('active')
        document.querySelector( '#logout' ).classList.add('active')
        ///// Add element to the content. 
        content.insertAdjacentHTML( 'afterbegin', `<h2 class="info">Yeah!!! You are loged in!</h2>` )
    }
    
}
listen( 'load', window, checkLogin() )



////////////////////////////////////////
/////// Log in with Booking Code
////////////////////////////////////////
async function loginWithBookingCode() {

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


    localStorage.setItem( 'OP_PLUGIN_DATA_BOOKING', JSON.stringify(response) )
    checkLogin()

}