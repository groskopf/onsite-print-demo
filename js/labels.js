////////////////////////////////////////
/////// Get Labels
////////////////////////////////////////
async function getLabels() {

    ///// The URL to the API.
    var url = 'https://api.printerboks.dk/api/v1/labels/'

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

    ///// Clear all elements in element ( #get-labels .inner ). 
	document.querySelector( '#get-labels .inner' ).innerHTML = ''

    for( var i = 0; i < response.length; i++ ){

        let element = `
        <article>
            <p><b>Filename:</b> ${response[i].filename.slice(7)}</p>
            <iframe src="https://api.printerboks.dk/api/v1/${response[i].filename}" width="100%" height="400">
        </article>
        `

        document.querySelector( '#get-labels .inner' ).insertAdjacentHTML( 'afterbegin', element )
    }

}



////////////////////////////////////////
/////// Create Label
////////////////////////////////////////
async function createLabel() {

    var formData = new FormData( document.forms['create-label'] );

    var imageFilename = formData.get('image-filename')
    var bookingCode = formData.get('booking-code')
    var sheetType = formData.get('sheet-type')
    var layout = formData.get('layout')

    //console.log('imageName:', imageFilename, 'qr_code:', bookingCode, 'name_tag_sheet_type:', sheetType, 'layout:', layout)
    
    ///// The URL to the API.
    var url = `https://api.printerboks.dk/api/v1/labels/?name_tag_sheet_type=${sheetType}&layout=${layout}`
    
    ///// The Body Input to Request Options.
    var bodyInput = JSON.stringify([
        {
        "line_1": "string",
        "line_2": "string",
        "line_3": "string",
        "line_4": "string",
        "line_5": "string",
        "imageName": imageFilename,
        "qr_code": bookingCode
        }
    ]);

    ///// Request Options for fetch.
    let options = {
        ///// *GET, POST, PUT, DELETE, etc.
        method: 'POST',
        headers: {
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

    ///// Clear all elements in element ( #create-label .inner ). 
	document.querySelector( '#create-label .inner' ).innerHTML = ''

    let element = `
    <article>
        <p><b>Filename:</b> ${response.filename.slice(7)}</p>
        <iframe src="https://api.printerboks.dk/api/v1/${response.filename}" width="100%" height="400">
    </article>
    `

    document.querySelector( '#create-label .inner' ).insertAdjacentHTML( 'afterbegin', element )
}



////////////////////////////////////////
/////// Get Label with Filename
////////////////////////////////////////
async function getLabelWithFilename() {

    var filename = document.forms['get-label-with-filename']['filename'].value
    
    if ( ! filename ) {
        console.log( 'Error: The input field is empty!' )
        
        ///// End the function.
        return
    }
    ///// The URL to the API.
    var url = `https://api.printerboks.dk/api/v1/labels/${filename}`
    
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

    ///// Clear all elements in element ( #get-label .inner ). 
	document.querySelector( '#get-label-with-filename .inner' ).innerHTML = ''

    let element = `
    <article>
        <p><b>Filename:</b> ${filename}</p>
        <iframe src="${URL.createObjectURL(response)}" width="100%" height="400">
    </article>
    `

    document.querySelector( '#get-label-with-filename .inner' ).insertAdjacentHTML( 'afterbegin', element )
}
