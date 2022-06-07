////////////////////////////////////////
/////// Get List from CSV with Semicolon
////////////////////////////////////////
async function getListFromCsvWithSemicolon(){

    ///// Get the form element.
    let formElemnet = document.forms['get-list-from-csv-with-semicolon']
    
    ///// Get data from the form element.
    let formData = new FormData( formElemnet )

    ///// The URL to the API.
    let url = `api/api-convert-csv-into-json_semicolon.php`
    
    console.log(formElemnet)

    ///// Request Options for fetch.
    let options = {
        ///// *GET, POST, PUT, DELETE, etc.
        method: 'POST',
        body: formData
    }


    ///// Request the data from the API.
    ///// fetchAPI( *url, options, 'blob', 'debug' ).
    let request = fetchAPI( url, options, 'text', 'debug' )
    //let request = fetch( url, options )

    ///// Wait for Response of the Request.
    let response = await request

    ///// Show the Response in Console Log.
    console.log(response)

    ///// Get the element for output.
    let container = document.querySelector( '#get-list-from-csv-with-semicolon .inner' )

    ///// Clear all elements in the element. 
	container.innerHTML = ''
    
    ///// Repeat for each element in the response. 
    for( var i = 0; i < response.length; i++ ){

        ///// Create new element.
        let element = `
            <article>
                <p><b>Name:</b> ${response[i].line_1}</p>
                <p><b>Title:</b> ${response[i].line_2}</p>
                <p><b>Company:</b> ${response[i].line_3}</p>
                <p><b>Nr:</b> ${response[i].line_4}</p>
            </article>
        `

        ///// Add element to the container. 
        container.insertAdjacentHTML( 'afterbegin', element )
    }

}



////////////////////////////////////////
/////// Get List from CSV with Comma
////////////////////////////////////////
async function getListFromCsvWithComma(){

    ///// Get the form element.
    let formElemnet = document.forms['get-list-from-csv-with-comma']
    
    ///// Get data from the form element.
    let formData = new FormData( formElemnet )

    ///// The URL to the API.
    let url = `api/api-convert-csv-into-json_comma.php`
    
    console.log(formElemnet)

    ///// Request Options for fetch.
    let options = {
        ///// *GET, POST, PUT, DELETE, etc.
        method: 'POST',
        body: formData
    }


    ///// Request the data from the API.
    ///// fetchAPI( *url, options, 'blob', 'debug' ).
    let request = fetchAPI( url, options, 'text', 'debug' )
    //let request = fetch( url, options )

    ///// Wait for Response of the Request.
    let response = await request

    ///// Show the Response in Console Log.
    console.log(response)

    ///// Get the element for output.
    let container = document.querySelector( '#get-list-from-csv-with-comma .inner' )

    ///// Clear all elements in the element. 
	container.innerHTML = ''
    
    ///// Repeat for each element in the response. 
    for( var i = 0; i < response.length; i++ ){

        ///// Create new element.
        let element = `
            <article>
                <p><b>Name:</b> ${response[i].line_1}</p>
                <p><b>Title:</b> ${response[i].line_2}</p>
                <p><b>Company:</b> ${response[i].line_3}</p>
                <p><b>Nr:</b> ${response[i].line_4}</p>
            </article>
        `

        ///// Add element to the container. 
        container.insertAdjacentHTML( 'afterbegin', element )
    }

}