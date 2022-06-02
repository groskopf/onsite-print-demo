////////////////////////////////////////
/////// Get all Images
////////////////////////////////////////
async function getAllImages() {

    ///// The URL to the API.
    var url = 'https://api.printerboks.dk/api/v1/images/'

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
    let container = document.querySelector( '#get-all-images .inner' )

    ///// Clear all elements in the element. 
	container.innerHTML = ''

    ///// Repeat for each element in the response. 
    for( var i = 0; i < response.length; i++ ){

        ///// Create new element.
        let element = `
            <article>
                <p>${response[i].filename.slice(7)}</p>
                <img src="https://api.printerboks.dk/api/v1/${response[i].filename}" width="100%" height="auto">
            </article>
        `

        ///// Add element to the container. 
        container.insertAdjacentHTML( 'afterbegin', element )
    }

}



////////////////////////////////////////
/////// Upload new Image
////////////////////////////////////////
async function uploadNewImage() {

    ///// The URL to the API.
    var url = 'https://api.printerboks.dk/api/v1/images/'
    
    ///// Get the form element.
    var formElemnet = document.forms['upload-new-image']
    
    ///// Get data from the form element.
    var formdata = new FormData( formElemnet )
    
    ///// If the image (file) value is empty.
    if ( formElemnet['image'].value == '' ) {
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
    let container = document.querySelector( '#upload-new-image .inner' )

    ///// Clear all elements in the element. 
	container.innerHTML = ''
    
    ///// Create new element.
    let element = `
        <article>
            <p>${response.filename.slice(7)}</p>
            <img src="https://api.printerboks.dk/api/v1/${response.filename}" width="100%" height="auto">
        </article>
    `

    ///// Add element to the container.
    container.insertAdjacentHTML( 'afterbegin', element )

}



////////////////////////////////////////
/////// Get Image with Filename
////////////////////////////////////////
async function getImageWithFilename() {

    ///// Get the form element.
    var formElemnet = document.forms['get-image-with-filename']

    ///// Get filename (text) value form form.
    var imageFileName = formElemnet['image-filename'].value
    
    ///// If the filename value is empty.
    if ( ! imageFileName ) {
        console.log( 'Error: The input field is empty!' )
        
        ///// End the function.
        return
    }

    ///// The URL to the API.
    var url = 'https://api.printerboks.dk/api/v1/images/'+imageFileName

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
    let container = document.querySelector( '#get-image-with-filename .inner' )

    ///// Clear all elements in the element. 
	container.innerHTML = ''
    
    ///// Create new element.
    let element = `
        <article>
            <p>${imageFileName}</p>
            <img src="${URL.createObjectURL(response)}" width="100%" height="auto">
        </article>
    `

    ///// Add element to the container.
    container.insertAdjacentHTML( 'afterbegin', element )

}



////////////////////////////////////////
/////// Delete Image with Filename
////////////////////////////////////////
async function deleteImageWithFilename() {

    ///// Get the form element.
    var formElemnet = document.forms['delete-image-with-filename']

    ///// Get filename (text) value form form.
    var imageFileName = formElemnet['image-filename'].value
    
    ///// If the filename value is empty.
    if ( ! imageFileName ) {
        console.log( 'Error: The input field is empty!' )
        
        ///// End the function.
        return
    }

    ///// The URL to the API.
    var url = 'https://api.printerboks.dk/api/v1/images/'+imageFileName

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
     
    ///// Get the element for output.
    let container = document.querySelector( '#delete-image-with-filename .inner' )

    ///// Clear all elements in the element. 
	container.innerHTML = ''
    
    ///// Create new element.   
    let element = `
        <article>
            <p><b>File:</b> (${response.filename}) was deleted.</p>
        </article>
    `

    ///// Add element to the container. 
    container.insertAdjacentHTML( 'afterbegin', element )

}