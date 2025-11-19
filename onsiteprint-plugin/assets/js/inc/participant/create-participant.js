/* ------------------------------------------------------------------------
 #  JS Part Name: Create Participant
 *  Creating the Participant in the Local Storage.
 ?  Updated: 2025-07-27 - 01:24 (Y:m:d - H:i)
 ?  Info: Added new Create Participant Script with Function.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

    1. 	Import Functions from Scripts

    2. 	Function: Create the Participant in the Local Storage.

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../basic.js'
import { opGetEvent } from '../event/get-event.js'
import { opUpdateEvent } from '../event/update-event.js'

/* ------------------------------------------------------------------------
 #  2. Function: Create the Participant in the Local Storage.
--------------------------------------------------------------------------- */
export async function opCreateParticipant( debug, eventId, participant ) {

    try {

        ///// Get Function Name.
        var functionName = opCreateParticipant.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Get the Event. 
        const eventResponse = await opGetEvent( debug, eventId )

        ///// Validate the Response from the Get Event.
        if ( eventResponse.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
            message: `Something went wrong getting the Event!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Get Event Item.
        const eventItem = eventResponse.response.details

        ///// Set Updated Event.
        const updatedEvent = { ...eventItem }

        ///// Set Updated Participants.
        const updatedParticipants = [ ...eventItem.eventParticipants ]

        ///// Add the New Participant Data into the Updated Participants.
        updatedParticipants.push( participant )

        ///// Set the New Participants into the Updated Event.
        updatedEvent.eventParticipants = updatedParticipants

        ///// Update the Event in Local Storage.
        const updatedEventResponse = await opUpdateEvent( debug, updatedEvent )

        ///// Validate the Response from the Update Event.
        if ( updatedEventResponse.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
            message: `Something went wrong Updating the Event!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `The Participant was Created!`, 
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