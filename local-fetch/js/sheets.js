////////////////////////////////////////
/////// Get All Sheets
////////////////////////////////////////
async function getAllSheets() {

    ///// The URL to the API.
    let url = 'https://api.printerboks.dk/api/v1/sheets/'

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

    ///// Get the element for output.
    let container = document.querySelector( '#get-all-sheets .inner' )

    ///// Clear all elements in the element. 
	container.innerHTML = ''

    ///// Repeat for each element in the response. 
    for( let i = 0; i < response.length; i++ ){
        
        ///// Create new element.
        let element = `
            <article>
                <p><b>Filename:</b> ${response[i].filename.slice(7)}</p>
                <iframe src="https://api.printerboks.dk/api/v1/${response[i].filename}" width="100%" height="400">
            </article>
        `

        ///// Add element to the container. 
        container.insertAdjacentHTML( 'afterbegin', element )
    }

}



////////////////////////////////////////
/////// Create new Sheet
////////////////////////////////////////
async function createNewSheet() {

    ///// Get the form element.
    let formElemnet = document.forms['create-new-sheet']
    
    ///// Get data from the form element.
    let formData = new FormData( formElemnet )
    
    ///// Get Sheet Type (select/option) value form form.
    let sheetType = formData.get('sheet-type')
    
    ///// Get Layout (select/option) value form form.
    let layout = formData.get('layout')
    
    ///// Get Image Filename (text) value form form.
    let imageFilename = formData.get('image-filename')
    
    ///// Get QR-Code (text) value form form.
    let qrCode = formData.get('qr-code')

    ///// Show the Form data in Console Log.
    //console.log('sheet_type:', sheetType, 'layout:', layout, 'imageName:', imageFilename, 'qr_code:', qrCode)
   
    ///// The URL to the API.
    let url = `https://api.printerboks.dk/api/v1/sheets/?sheet_type=${sheetType}&layout=${layout}`
    
    ///// The Body Input to Request Options.
    let bodyInput = JSON.stringify([
        {
        "line_1": "string",
        "line_2": "string",
        "line_3": "string",
        "line_4": "string",
        "line_5": "string",
        "imageName": imageFilename,
        "qr_code": qrCode
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
    let container = document.querySelector( '#create-new-sheet .inner' )

    ///// Clear all elements in the element. 
	container.innerHTML = ''

    ///// Create new element.
    let element = `
        <article>
            <p><b>Filename:</b> ${response.filename.slice(7)}</p>
            <iframe src="https://api.printerboks.dk/api/v1/${response.filename}" width="100%" height="400">
        </article>
    `

    ///// Add element to the container. 
    container.insertAdjacentHTML( 'afterbegin', element )

}



////////////////////////////////////////
/////// Get Sheet with Filename
////////////////////////////////////////
async function getSheetWithFilename() {

    ///// Get the form element.
    let formElemnet = document.forms['get-sheet-with-filename']
    
    ///// Get booking-code (text) value form form.
    let filename = formElemnet['filename'].value
    
    ///// If the booking-code (text) value is empty.
    if ( ! filename ) {
        console.log( 'Error: The input field is empty!' )
        
        ///// End the function.
        return
    }

    ///// The URL to the API.
    let url = `https://api.printerboks.dk/api/v1/sheets/${filename}`
    
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
    let container = document.querySelector( '#get-sheet-with-filename .inner' )

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
/////// Delete Sheet with Filename
////////////////////////////////////////
async function deleteSheetWithFilename() {

    ///// Get the form element.
    let formElemnet = document.forms['delete-sheet-with-filename']
    
    ///// Get booking-code (text) value form form.
    let filename = formElemnet['filename'].value
    
    ///// If the booking-code (text) value is empty.
    if ( ! filename ) {
        console.log( 'Error: The input field is empty!' )
        
        ///// End the function.
        return
    }

    ///// The URL to the API.
    let url = `https://api.printerboks.dk/api/v1/sheets/${filename}`
    
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
    let container = document.querySelector( '#delete-sheet-with-filename .inner' )

    ///// Clear all elements in the element. 
	container.innerHTML = ''

    ///// Create new element.
    let element = `
        <article>
            <p><b>File:</b> ${response.filename.slice(7)} was deleted.</p>
        </article>
    `

    ///// Add element to the container. 
    container.insertAdjacentHTML( 'afterbegin', element )

}