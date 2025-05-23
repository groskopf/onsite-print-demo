/* ------------------------------------------------------------------------
 #  JS Part Name: Get Booking from Session
 *  Getting the Booking from Session.
 ?  Updated: 2025-05-23 - 03:48 (Y:m:d - H:i)
 ?  Info: Added new Function, opGetBookingFromSession().
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Get the Booking from Session

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../basic.js'
import * as opModuleFastAPI from '../fastapi/fastapi.js'

/* ------------------------------------------------------------------------
 #  2. Function: Get Booking from Session
--------------------------------------------------------------------------- */
export async function opGetBookingFromSession( debug ) {

    try {

        ///// Get Function Name.
        var functionName = opGetBookingFromSession.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )



        ///// The URL to the API.
        const url = `${ opGetCurrentScriptPath() }/../api/api-get-session.php`

        ///// Fetch from Local PHP file.
        const getBookingResponse = await opModuleFastAPI.opGetApiData( debug, 'GET', '', url, 'json' )
        
        if ( getBookingResponse.error !== false ) throw getBookingResponse.response

        ///// Get Booking Item.
        const bookingItem = getBookingResponse.response.details.session
        opConsoleDebug( debug, 'bookingItem:', bookingItem )



        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `The Booking was Found!`, 
            line: opModuleBasic.errorLine(),
            function: functionName
        }, debug )

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