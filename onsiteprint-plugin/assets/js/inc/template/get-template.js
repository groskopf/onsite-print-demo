/* ------------------------------------------------------------------------
 #  JS Part Name: Get Template
 *  Getting the Template from the Local Storage.
 ?  Updated: 2025-06-01 - 18:31 (Y:m:d - H:i)
 ?  Info: Added new Get Template Script with new Function, opGetTemplate().
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Get Template from the Local Storage.

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../basic.js'

/* ------------------------------------------------------------------------
 #  2. Function: Get Template from the Local Storage.
--------------------------------------------------------------------------- */
export async function opGetTemplate( debug, templateId ) {

    try {

        ///// Get Function Name.
        var functionName = opGetTemplate.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

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