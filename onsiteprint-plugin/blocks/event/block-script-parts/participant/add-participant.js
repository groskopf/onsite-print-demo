/* ------------------------------------------------------------------------
 #  JS Part Name: Add Participant
 *  Adding the Participant to the Participant List in the Event Block.
 ?  Updated: 2025-04-14 - 03:54 (Y:m:d - H:i)
 ?  Info: Added new Add Participant Script.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Add the Participant to the Participant List

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../../assets/js/inc/basic.js'
import * as opModuleEvent from '../../../../assets/js/inc/event/event.js'

/* ------------------------------------------------------------------------
 #  2. Function: Add the Participant to the Participant List
 ?  NB: The function is under construction.
--------------------------------------------------------------------------- */
export function opAddParticipant( debug, block, listElement, participant, columnAmount ) {

    try {

        ///// Get Function Name.
        var functionName = opAddParticipant.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )







        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `The Participant was Added to the Participant List in the Event Block!`, 
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