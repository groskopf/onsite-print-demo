////////////////////////////////////////
/////// Get Nameplate Type Layouts
////////////////////////////////////////
async function getNameplateTypeLayouts() {
   
    ///// The URL to the API.
    var url = 'https://api.printerboks.dk/api/v1/layouts/name_tags'

    ///// Request Options for fetch.
    let options = {
        ///// *GET, POST, PUT, DELETE, etc.
        method: 'GET'
    }

    ///// Request the data from the API.
    ///// fetchAPI( *url, options, 'blob', 'debug' )
    let request = fetchAPI( url, options )
    
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

    ///// Clear all elements in element ( #get-nameplate-type-layouts .inner ). 
	document.querySelector( '#get-nameplate-type-layouts .inner' ).innerHTML = ''

    for( var i = 0; i < response.length; i++ ){
        var layouts = response[i].layouts
        var layout = ''
        
        for( var l = 0; l < layouts.length; l++ ){
            layout += layouts[l]
            if ( l != layouts.length-1 ) {
                layout += ', '
            }
        }

        let element = `
        <p><b>Nameplate Type:</b> ${response[i].name_tag_type}</p>
        <p><b>Layouts:</b> ${layout}</p>
        <hr>
        `

        document.querySelector( '#get-nameplate-type-layouts .inner' ).insertAdjacentHTML( 'afterbegin', element )
    }
}



////////////////////////////////////////
/////// Get Label Type Layouts
////////////////////////////////////////
async function getLabelTypeLayouts() {
   
    ///// The URL to the API.
    var url = 'https://api.printerboks.dk/api/v1/layouts/name_tags_sheets'

    ///// Request Options for fetch.
    let options = {
        ///// *GET, POST, PUT, DELETE, etc.
        method: 'GET'
    }

    ///// Request the data from the API.
    ///// fetchAPI( *url, options, 'blob', 'debug' )
    let request = fetchAPI( url, options )
    
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

    ///// Clear all elements in element ( #get-label-type-layouts .inner ). 
	document.querySelector( '#get-label-type-layouts .inner' ).innerHTML = ''

    for( var i = 0; i < response.length; i++ ){
        var layouts = response[i].layouts
        var layout = ''
        
        for( var l = 0; l < layouts.length; l++ ){
            layout += layouts[l]
            if ( l != layouts.length-1 ) {
                layout += ', '
            }
        }

        let element = `
        <p><b>Label Type:</b> ${response[i].name_tag_sheet_type}</p>
        <p><b>Layouts:</b> ${layout}</p>
        <hr>
        `

        document.querySelector( '#get-label-type-layouts .inner' ).insertAdjacentHTML( 'afterbegin', element )
    }
}
