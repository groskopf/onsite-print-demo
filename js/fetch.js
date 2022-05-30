////////////////////////////////////////
/////// Fetch from FastAPI
////////////////////////////////////////
async function fetchAPI( url, options, output, debug ) {

    
    ///// Check for browser support of fetch in the window interface.
    if ( ! ( 'fetch' in window ) ) {
        console.log( 'Error: Fetch API not found, please upgrade your browser.' )
        return
    }
    
    ///// We can safely use fetch from now on.

    ///// Fetch from API.
    let request = await fetch( url, options )
        .then( response => {

            ///// If (Debug) parameter in the function is enabled.
            ///// Show the Response in Console Log.
            if ( debug ) {
                console.log( 'Response debug:', response )
            }

            ///// If (Output) parameter in the function is enabled.
            ///// Return the Data as a Blob else JSON.
            if ( output == 'blob' ) {
                return response.blob()
            } else {        
                return response.json()
            }

        })
        .catch( error => console.log( 'Error:', error ) )

    ///// Return the Data.
    return request
}