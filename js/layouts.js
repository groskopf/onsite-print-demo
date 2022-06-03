////////////////////////////////////////
/////// Get all Name Tag Types
////////////////////////////////////////
async function getAllNameTagTypes() {
   
    ///// The URL to the API.
    let url = 'https://api.printerboks.dk/api/v1/layouts/name_tags'

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
    let container = document.querySelector( '#get-all-name-tag-types .inner' )

    ///// Clear all elements in the element. 
	container.innerHTML = ''

    ///// Repeat for each element in the response. 
    for( let i = 0; i < response.length; i++ ){
        
        ///// All layouts in the Element. 
        let elementLayouts = response[i].layouts

        ///// Variable to contain layouts. 
        var layouts = ''
        
        ///// Repeat for each layout in the element. 
        for( let l = 0; l < elementLayouts.length; l++ ){

            ///// Add a layout to the variable. 
            layouts += elementLayouts[l]
            
            ///// Add a separator to the variable if there are more layouts. 
            if ( l != elementLayouts.length-1 ) {
                layouts += ', '
            }
        }

        ///// Create new element.
        let element = `
            <article>
                <p><b>Name Tag Type:</b> ${response[i].name_tag_type}</p>
                <p><b>Layouts:</b> ${layouts}</p>
            </article>
        `

        ///// Add element to the container. 
        container.insertAdjacentHTML( 'afterbegin', element )
    }

}



////////////////////////////////////////
/////// Get all Sheet Types
////////////////////////////////////////
async function getAllSheetTypes() {
   
    ///// The URL to the API.
    let url = 'https://api.printerboks.dk/api/v1/layouts/sheets'

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
    let container = document.querySelector( '#get-all-sheet-types .inner' )

    ///// Clear all elements in the element. 
	container.innerHTML = ''

    ///// Repeat for each element in the response. 
    for( let i = 0; i < response.length; i++ ){
        
        ///// All layouts in the Element. 
        let elementLayouts = response[i].layouts

        ///// Variable to contain layouts. 
        var layouts = ''
        
        ///// Repeat for each layout in the element. 
        for( let l = 0; l < elementLayouts.length; l++ ){

            ///// Add a layout to the variable. 
            layouts += elementLayouts[l]
            
            ///// Add a separator to the variable if there are more layouts. 
            if ( l != elementLayouts.length-1 ) {
                layouts += ', '
            }
        }

        ///// Create new element.
        let element = `
            <article>
                <p><b>Sheet Type:</b> ${response[i].sheet_type}</p>
                <p><b>Layouts:</b> ${layouts}</p>
            </article>
        `

        ///// Add element to the container. 
        container.insertAdjacentHTML( 'afterbegin', element )
    }

}



////////////////////////////////////////
/////// Get Name Tag Type
////////////////////////////////////////
async function getNameTagType() {

    ///// Get the form element.
    let formElemnet = document.forms['get-name-tag-type']
    
    ///// Get Name Tag Type (select/option) value form form.
    let nameTagType = formElemnet['name-tag-type'].value

    ///// The URL to the API.
    let url = 'https://api.printerboks.dk/api/v1/layouts/name_tags/'+nameTagType

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
    let container = document.querySelector( '#get-name-tag-type .inner' )

    ///// Clear all elements in the element. 
	container.innerHTML = ''

    ///// All layouts in the Element. 
    let elementLayouts = response.layouts

    ///// Variable to contain layouts. 
    var layouts = ''
    
    ///// Repeat for each layout in the element. 
    for( let l = 0; l < elementLayouts.length; l++ ){

        ///// Add a layout to the variable. 
        layouts += elementLayouts[l]
        
        ///// Add a separator to the variable if there are more layouts. 
        if ( l != elementLayouts.length-1 ) {
            layouts += ', '
        }
    }

    ///// Create new element.
    let element = `
        <article>
            <p><b>Name Tag Type:</b> ${response.name_tag_type}</p>
            <p><b>Layouts:</b> ${layouts}</p>
        </article>
    `

    ///// Add element to the container. 
    container.insertAdjacentHTML( 'afterbegin', element )

}



////////////////////////////////////////
/////// Get Sheet Type
////////////////////////////////////////
async function getSheetType() {

    ///// Get the form element.
    let formElemnet = document.forms['get-sheet-type']
    
    ///// Get Name Tag Type (select/option) value form form.
    let sheetType = formElemnet['sheet-type'].value

    ///// The URL to the API.
    let url = 'https://api.printerboks.dk/api/v1/layouts/sheets/'+sheetType

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
    let container = document.querySelector( '#get-sheet-type .inner' )

    ///// Clear all elements in the element. 
	container.innerHTML = ''

    ///// All layouts in the Element. 
    let elementLayouts = response.layouts

    ///// Variable to contain layouts. 
    var layouts = ''
    
    ///// Repeat for each layout in the element. 
    for( let l = 0; l < elementLayouts.length; l++ ){

        ///// Add a layout to the variable. 
        layouts += elementLayouts[l]
        
        ///// Add a separator to the variable if there are more layouts. 
        if ( l != elementLayouts.length-1 ) {
            layouts += ', '
        }
    }

    ///// Create new element.
    let element = `
        <article>
            <p><b>Sheet Type:</b> ${response.sheet_type}</p>
            <p><b>Layouts:</b> ${layouts}</p>
        </article>
    `

    ///// Add element to the container. 
    container.insertAdjacentHTML( 'afterbegin', element )

}