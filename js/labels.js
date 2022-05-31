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