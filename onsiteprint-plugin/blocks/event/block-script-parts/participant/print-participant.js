/* ------------------------------------------------------------------------
 #  JS Part Name: Print Participant
 *  Printing the Participant from the Participant List in the Event Block.
 ?  Updated: 2025-05-23 - 03:37 (Y:m:d - H:i)
 ?  Info: Added new Print Participant Function.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Print the Participant from the Participant List

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../../assets/js/inc/basic.js'
import { opGetParticipant } from '../parts.js'

/* ------------------------------------------------------------------------
 #  2. Function: Print the Participant from the Participant List
--------------------------------------------------------------------------- */
export async function opPrintParticipant( debug, participantId ) {

    try {

        ///// Get Function Name.
        var functionName = opPrintParticipant.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )



        await opGetParticipant( debug, participantId )



        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `The Participant was Printed!`, 
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