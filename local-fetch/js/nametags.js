////////////////////////////////////////
/////// Create new Name Tag
////////////////////////////////////////
async function createNewNameTag() {

    ///// Get the form element.
    let formElemnet = document.forms['create-new-name-tag']
    
    ///// Get data from the form element.
    let formData = new FormData( formElemnet )
    
    ///// Get Layout (select/option) value form form.
    let layout = formData.get('layout')

    ///// Get Image Filename (text) value form form.
    let imageFilename = formData.get('image-filename')
    
    ///// Get QR-code (text) value form form.
    let qrCode = formData.get('qr-code')

    ///// Get Booking Code (text) value form form.
    let bookingCode = formData.get('booking-code')

    ///// Show the Form data in Console Log.
    //console.log('layout:', layout, 'imageName:', imageFilename, 'qr_code:', qrCode, 'booking_code:', bookingCode )

    ///// The URL to the API.
    let  url = `https://api.printerboks.dk/api/v1/name_tags/?booking_code=${bookingCode}&layout=${layout}`
    
    ///// The Body Input to Request Options.
    let bodyInput = JSON.stringify(
        {
        "line_1": "string",
        "line_2": "string",
        "line_3": "string",
        "line_4": "string",
        "line_5": "string",
        "image_name": imageFilename,
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
    let container = document.querySelector( '#create-new-name-tag .inner' )

    ///// Clear all elements in the element. 
	container.innerHTML = ''

    ///// Create new element.
    let element = `
        <article>
            <p><b>Filename:</b> ${response.filename}</p>
            <iframe src="https://api.printerboks.dk/api/v1/${response.filename}" width="100%" height="400">
        </article>
    `
    
    ///// Add element to the container. 
    container.insertAdjacentHTML( 'afterbegin', element )

}



////////////////////////////////////////
/////// Get all Name Tags in Printer Queue
////////////////////////////////////////
async function getAllNameTagsInPrinterQueue() {

    ///// Get the form element.
    let formElemnet = document.forms['get-all-name-tags-in-printer-queue']
    
    ///// Get Printer Code (select/option) value form form.
    let printerCode = formElemnet['printer-code'].value
   
    ///// The URL to the API.
    let url = 'https://api.printerboks.dk/api/v1/name_tags/'+printerCode

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
    let container = document.querySelector( '#get-all-name-tags-in-printer-queue .inner' )

    ///// Clear all elements in the element. 
	container.innerHTML = ''

    ///// Repeat for each element in the response. 
    for( let i = 0; i < response.length; i++ ){

        ///// Create new element.
        let element = `
            <article>
                <p><b>Queue nr. ${i+1}:</b> ${response[i].filename}</p>
            </article>
        `

        ///// Add element to the container. 
        container.insertAdjacentHTML( 'afterbegin', element )
    }
}



////////////////////////////////////////
/////// Delete all Name Tags in Printer Queue
////////////////////////////////////////
async function deleteAllNameTagsInPrinterQueue() {

    ///// Get the form element.
    let formElemnet = document.forms['delete-all-name-tags-in-printer-queue']
    
    ///// Get Printer Code (select/option) value form form.
    let printerCode = formElemnet['printer-code'].value
   
    ///// The URL to the API.
    let url = 'https://api.printerboks.dk/api/v1/name_tags/'+printerCode

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
    let container = document.querySelector( '#delete-all-name-tags-in-printer-queue .inner' )

    ///// Clear all elements in the element. 
	container.innerHTML = ''

    ///// Repeat for each element in the response. 
    for( let i = 0; i < response.length; i++ ){

        ///// Create new element.
        let element = `
            <article>
                <p><b>File:</b> ${response[i].filename} was deleted.</p>
            </article>
        `

        ///// Add element to the container. 
        container.insertAdjacentHTML( 'afterbegin', element )
    }
}



////////////////////////////////////////
/////// Get Name Tag with Filename
////////////////////////////////////////
async function getNameTagWithFilename() {

    ///// Get the form element.
    let formElemnet = document.forms['get-name-tag-with-filename']
    
    ///// Get Printer Code (select/option) value form form.
    let printerCode = formElemnet['printer-code'].value
    
    ///// Get Filename (text) value form form.
    let filename = formElemnet['filename'].value
    
    ///// The URL to the API.
    let url = `https://api.printerboks.dk/api/v1/name_tags/${printerCode}/${filename}`

    ///// Request Options for fetch.
    let options = {
        ///// *GET, POST, PUT, DELETE, etc.
        method: 'GET'
    }

    ///// Request the data from the API.
    ///// fetchAPI( *url, options, 'blob', 'debug' ).
    let request = fetchAPI( url, options, 'blob' )
    
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
    let container = document.querySelector( '#get-name-tag-with-filename .inner' )

    ///// Clear all elements in the element. 
	container.innerHTML = ''

    ///// Create new element.
    let element = `
        <article>
            <p><b>Filename:</b> ${filename}</p>
            <iframe src="${URL.createObjectURL(response)}" width="100%" height="400">
        </article>
    `

    ///// Add element to the container. 
    container.insertAdjacentHTML( 'afterbegin', element )

}



////////////////////////////////////////
/////// Delete Name Tag with Filename
////////////////////////////////////////
async function deleteNameTagWithFilename() {

    ///// Get the form element.
    let formElemnet = document.forms['delete-name-tag-with-filename']
    
    ///// Get Printer Code (select/option) value form form.
    let printerCode = formElemnet['printer-code'].value
    
    ///// Get Filename (text) value form form.
    let filename = formElemnet['filename'].value
    
    ///// The URL to the API.
    let url = `https://api.printerboks.dk/api/v1/name_tags/${printerCode}/${filename}`

    ///// Request Options for fetch.
    let options = {
        ///// *GET, POST, PUT, DELETE, etc.
        method: 'DELETE'
    }

    ///// Request the data from the API.
    ///// fetchAPI( *url, options, 'blob', 'debug' ).
    let request = fetchAPI( url, options, 'blob' )
    
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
    let container = document.querySelector( '#delete-name-tag-with-filename .inner' )

    ///// Clear all elements in the element. 
	container.innerHTML = ''

    ///// Create new element.
    let element = `
        <article>
            <p><b>File:</b> ${filename} was deleted.</p>
        </article>
    `

    ///// Add element to the container. 
    container.insertAdjacentHTML( 'afterbegin', element )

}