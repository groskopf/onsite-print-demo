/* ------------------------------------------------------------------------
 #  JS Part Name: Create Event
 *  Functions used for Events.
 ?  Updated: 2025-05-30 - 18:22 (Y:m:d - H:i)
 ?  Info: Changed Script Name to Create Event.
 #  NB: This function are not used yet!!
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Create Event

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../basic.js'

/* ------------------------------------------------------------------------
 #  2. Function: Create Event
--------------------------------------------------------------------------- */
export async function opCreateEvent( debug, formElement, jsonFormGrid ) {

    try {

        ///// Get Function Name.
        var functionName = opCreateEvent.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Throw Error if the Variables is missing.
        if ( ! formElement ) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Missing the Form Element!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )
        else if ( ! jsonFormGrid ) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Missing the JSON Grid List!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )
        else {

            ///// Return the Response.
            return opModuleBasic.opReturnResponse( false, 200, { 
                message: `The Event was Created!`, 
                line: opModuleBasic.errorLine(),
                function: functionName,
                details: details
            }, debug )

        }

    } catch( errorResponse ) {

        ///// Create Error Details.
        let errorDetails = ( errorResponse.error == true ) ? errorResponse : opModuleBasic.opReturnResponse( false, 400, { 
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