////////////////////////////////////////
/////// Create Nameplate
////////////////////////////////////////
async function createNameplate() {

    var formData = new FormData( document.forms['create-nameplate'] );

    var bookingCode = formData.get('booking-code')
    var imageFilename = formData.get('image-filename')
    var qrCode = formData.get('qr-code')
    var layout = formData.get('layout')

    console.log('imageName:', imageFilename, 'booking_code:', bookingCode, 'qr_code:', qrCode, 'layout:', layout)
    
    ///// The URL to the API.
    var url = `https://api.printerboks.dk/api/v1/printers/?booking_code=${bookingCode}&layout=${layout}`
    
    ///// The Body Input to Request Options.
    var bodyInput = JSON.stringify(
        {
        "line_1": "string",
        "line_2": "string",
        "line_3": "string",
        "line_4": "string",
        "line_5": "string",
        "imageName": imageFilename,
        "qr_code": qrCode
        }
    )

    ///// Request Options for fetch.
    let options = {
        ///// *GET, POST, PUT, DELETE, etc.
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: bodyInput
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

    ///// Clear all elements in element ( #create-nameplate .inner ). 
	document.querySelector( '#create-nameplate .inner' ).innerHTML = ''

    let element = `
    <article>
        <p><b>Filename:</b> ${response.filename}</p>
        <iframe src="https://api.printerboks.dk/api/v1/${response.filename}" width="100%" height="400">
    </article>
    `

    document.querySelector( '#create-nameplate .inner' ).insertAdjacentHTML( 'afterbegin', element )
}