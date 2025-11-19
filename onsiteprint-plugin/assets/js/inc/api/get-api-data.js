/* ------------------------------------------------------------------------
 #  JS Part Name: Get API Data
 *  Getting the Data from the API.
 ?  Updated: 2025-06-06 - 03:03 (Y:m:d - H:i)
 ?  Info: Changed the Approved Response.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Get API Data

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../basic.js'

/* ------------------------------------------------------------------------
 #  2. Function: Get API Data
--------------------------------------------------------------------------- */
export async function opGetApiData( debug, method, bodyInput, url, output, contentType ) {

    try {
        
        ///// Get Function Name.
        var functionName = opGetApiData.name
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Throw Error if the Variables is missing.
        if ( ! ( 'fetch' in window ) ) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `The Browser does not support The Fetch Function!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )
        else if (  ! method || ! url || ! output ) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Missing the Method, URL or the Output Parameter!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )
        else {

            ///// Request Options for fetch.
            ////* method (GET, POST, PUT, DELETE, etc.)
            let options = {
                method: method,
                headers: {
                    accept: 'application/json',
                    'access_token': 'aGNhb2kzOG5jbzNu'
                }
            }
            
            ///// Add Content Type to Options.
            if ( contentType !== 'form' ) {
                options.headers = { ...options.headers, 'Content-Type': 'application/json' }
            }

            ///// Add Body to Options.
            if ( bodyInput ) {
                options = { ...options, 'body': bodyInput }
            }

            ///// Get the Response from the API via Fetch.
            const fetchResponse = await fetch( url, options )

            ///// Get the Fetch Status.
            let code = fetchResponse.status
            let details

            ///// Validate the Fetch Response with the Status Code.
            if ( code >= 200 && code <= 299 ) {

                ///// Return the Data as a Blob, JSON or Text.
                if ( output == 'blob' ) details = await fetchResponse.blob()
                else if ( output == 'json' ) details = await fetchResponse.json()
                else details = await fetchResponse.text()

                ///// Return the Response.
                return opModuleBasic.opReturnResponse( false, code, { 
                    message: `The API Data was Received!`, 
                    line: opModuleBasic.errorLine(),
                    function: functionName,
                    details: details
                }, debug )

            } else if ( code >= 400 && code <= 499 ) throw opModuleBasic.opReturnResponse( true, code, { 
                message: `Something went wrong getting the API Data!`,
                line: opModuleBasic.errorLine(),
                function: functionName,
                details: await fetchResponse.json()
            } )
            else throw opModuleBasic.opReturnResponse( true, code, { 
                message: `Something went wrong getting the API Data!`,
                line: opModuleBasic.errorLine(),
                function: functionName,
                details: await fetchResponse.text()
            } )
        
        }

    } catch( errorResponse ) {

        ///// Create Error Details.
        let errorDetails = ( errorResponse.error == true ) ? errorResponse : opModuleBasic.opReturnResponse( true, 400, { 
            message: errorResponse.message,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Log Error Details in the Console.
        if ( debug ) console.error( 'ERROR:', errorDetails )

        ///// Return the Error Response.
        return errorDetails

    } finally {

        ///// End the Console Log Group.
        if ( debug ) console.groupEnd()

    }

}