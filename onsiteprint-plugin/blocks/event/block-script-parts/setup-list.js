/* ------------------------------------------------------------------------
 #  JS Part Name: Setup List
 *  Block functions included in the Parts Script in the Event Block.
 ?  Updated: 2025-06-03 - 02:28 (Y:m:d - H:i)
 ?  Info: Added new Get Event & Get Template Functions.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Setup of the Participant List in Event

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../assets/js/inc/basic.js'
import { opGetEvent } from '../../../assets/js/inc/event/event.js'
import { opGetTemplate } from '../../../assets/js/inc/template/template.js'
import { opAddParticipant } from './parts.js'

/* ------------------------------------------------------------------------
 #  2. Function: Setup of the Participant List in Event
 ?  NB: The function is under construction.
--------------------------------------------------------------------------- */
export function opSetupList( debug, block ) {

    try {
        
        ///// Get Function Name.
        var functionName = opSetupList.name
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )
   
        ///// Get Event ID.
        const eventId = block.getAttribute( 'data-event-id' )

        ///// Throw Error if the Event ID is missing.
        if ( ! eventId ) throw opModuleBasic.opReturnResponse( true, 404, { 
            message: `Missing the Event ID!`, 
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Get the Event. 
        const eventItem = opGetEvent( debug, eventId )

        ///// Validate the Response from the Get Event.
        if ( eventItem.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
            message: `Something went wrong getting the Event!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Get the Template. 
        const templateItem = opGetTemplate( debug, eventItem.response.details.eventTemplate )

        ///// Validate the Response from the Get Template.
        if ( templateItem.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
            message: `Something went wrong getting the Template!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Get the Amount of Columns.
        let columnAmount = templateItem.response.details.templateLayoutColumns.charAt(0)
        
        ///// Set the Amount of Columns to the Block.
        block.setAttribute( 'data-column-count', columnAmount )

        ///// Get Participant List.
        const participantList = eventItem.response.details.eventParticipants

        ///// Get the elements.
        let participantListElement = block.querySelector( '.op-participant-rows' )

        ///// Start the Console Log Group.
        if ( debug ) console.group( `Participants Added: ${ participantList.length }` )

        ///// For each Participant create Participant Element.
        participantList.forEach( participant => {
            opAddParticipant( debug, block, participantListElement, participant, columnAmount )
        })

        ///// End the Console Log Group.
        if ( debug ) console.groupEnd()

        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `The Setup of the Participant List was Created!`, 
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