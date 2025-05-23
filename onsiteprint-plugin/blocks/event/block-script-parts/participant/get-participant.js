/* ------------------------------------------------------------------------
 #  JS Part Name: Get Participant
 *  Getting the Participant from the Participant List in the Event Block.
 ?  Updated: 2025-05-23 - 04:59 (Y:m:d - H:i)
 ?  Info: Added Event Id to opGetParticipant() function.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Get the Participant from the Participant List

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../../assets/js/inc/basic.js'
import { opGetBookingFromSession } from '../../../../assets/js/inc/booking/get-booking-from-session.js'

/* ------------------------------------------------------------------------
 #  2. Function: Get the Participant from the Participant List
--------------------------------------------------------------------------- */
export async function opGetParticipant( debug, eventId, participantId ) {

    try {

        ///// Get Function Name.
        var functionName = opGetParticipant.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )



        ///// Get the Booking from Session.
        await opGetBookingFromSession( debug )



        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `The Participant was Found!`, 
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