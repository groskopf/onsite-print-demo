////////////////////////////////////////
/////// Fetch from FastAPI
////////////////////////////////////////
async function fetchAPI( url, options, output, debug ) {

    var code
    var err

    ///// Check for browser support of fetch in the window interface.
    if ( ! ( 'fetch' in window ) ) {
        return returnResponse( true, 405, 'Fetch API not found, please upgrade your browser.' )
    }
    
    ///// We can safely use fetch from now on.

    ///// Fetch from API.
    let request = await fetch( url, options )
        .then( response => {
            ///// Get Response Code
            code = response.status
            
            try { 
                err = false

                ///// If (Debug) parameter in the function is enabled.
                if ( debug == true ) {
                    err = 'debug'
                    throw response
                }

                if ( code >= 200 && code <= 299 ) {
                    ///// If (Output) parameter in the function is enabled.
                    ///// Return the Data as a Blob or JSON.
                    if ( output == 'blob' ) return response.blob()
                    else if ( output == 'json' ) return response.json()
                    else {
                        err = true
                        throw 'Missing Output parameter in function!'
                    }
                } else if ( code >= 400 && code <= 499 ) {
                    err = true
                    throw response.json()
                } else {
                    err = true
                    throw response
                }
            } catch( responseError ) {
                return responseError
            }

        })
        .catch( error => console.log( 'Error:', error ) )

    ///// Return the Data.
    return returnResponse( err, code, request )
}