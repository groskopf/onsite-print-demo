/* ------------------------------------------------------------------------
 #  JS Part Name: Modal - Print Participants
 *  Creating the Print Participants Content to the Modal in the Event Block.
 ?  Updated: 2026-21-05 - 22:25 (Y:m:d - H:i)
 ?  Info: Added Class Name to opModalToggleListener().
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Print Multiple Participants from the Print Participants Modal

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../../assets/js/inc/basic.js'

/* ------------------------------------------------------------------------
 #  2. Function: Modal - Print Participants
--------------------------------------------------------------------------- */
export function opModalPrintParticipants( debug, block, eventId ) {

    try {

        ///// Get Function Name.
        var functionName = opModalPrintParticipants.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )



        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `The Print Participants Modal was correctly Executed!`, 
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