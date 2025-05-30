/* ------------------------------------------------------------------------
 #  JS Part Name: Get Event
 *  Getting the Event from the Local Storage.
 ?  Updated: 2025-05-30 - 18:34 (Y:m:d - H:i)
 ?  Info: Added New Get Event Script with Function opGetEvent().
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Get Event from the Local Storage.

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../basic.js'

/* ------------------------------------------------------------------------
 #  2. Function: Get Event from the Local Storage.
--------------------------------------------------------------------------- */
export function opGetEvent( debug, eventId ) {

    try {

        ///// Get Function Name.
        var functionName = opGetEvent.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )


        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `The Event was Found!`, 
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