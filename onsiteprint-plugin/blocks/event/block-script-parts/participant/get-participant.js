/* ------------------------------------------------------------------------
 #  JS Part Name: Get Participant
 *  Getting the Participant from the Participant List in the Event Block.
 ?  Updated: 2025-06-01 - 17:49 (Y:m:d - H:i)
 ?  Info: Added the Get Event and the Filter of the Participant List.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Get the Participant from the Participant List

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../../assets/js/inc/basic.js'
import { opGetEvent } from '../../../../assets/js/inc/event/event.js'

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

        ///// Get the Event. 
        const eventItem = await opGetEvent( debug, eventId )

        ///// Validate the Response from the Get Event.
        if ( eventItem.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
            message: `Something went wrong getting the Event!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Get Participant List.
        const participantList = eventItem.response.details.eventParticipants

        ///// Validate Participant List.
        if ( ! participantList || ! participantList[0] ) throw opModuleBasic.opReturnResponse( true, 404, { 
            message: `No Participant have been created yet!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Find the Participant.
        let participantItem = participantList.filter( participantItem => participantItem.id === participantId )

        ///// Validate Participant Item.
        if ( ! participantItem[0] ) throw opModuleBasic.opReturnResponse( true, 404, { 
            message: `No Participant was found!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `The Participant was Found!`, 
            line: opModuleBasic.errorLine(),
            function: functionName,
            details: participantItem[0]
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