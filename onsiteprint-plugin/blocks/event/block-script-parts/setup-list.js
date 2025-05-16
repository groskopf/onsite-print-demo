/* ------------------------------------------------------------------------
 #  JS Part Name: Setup List
 *  Block functions included in the Parts Script in the Event Block.
 ?  Updated: 2025-04-14 - 03:55 (Y:m:d - H:i)
 ?  Info: Added new Lines in the Function (opSetupList).
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Setup of the Participant List in Event

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../assets/js/inc/basic.js'
import { opAddParticipant } from './parts.js'

import * as opModuleEvent from '../../../assets/js/inc/event/event.js'

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
        //// #NG: Function (opGetEventList) needs to be moved and created as new. 
        const eventItem = opGetEventList( eventId )

        ///// Validate the Event List Response.
        if ( eventItem.error !== false ) throw eventItem

        ///// Get the Participant List.
        const participantList = eventItem.response.eventParticipants

        ///// Get the Event Template.
        //// #NG: Function (opGetTemplate) needs to be moved and created as new. 
        const templateResponse = opGetTemplate( eventItem.response.eventTemplate )

        ///// Validate the Event Template Response.
        if ( templateResponse.error !== false ) throw templateResponse

        ///// Get the Amount of Columns.
        let columnAmount = templateResponse.response.templateLayoutColumns.charAt(0)
        
        ///// Set the Amount of Columns to the Block.
        block.setAttribute( 'data-column-count', columnAmount )

        ///// Get the elements.
        let participantListElement = block.querySelector( '.op-participant-rows' )

        ///// For each Participant create Participant Element.
        participantList.forEach( participant => {
            opAddParticipant( debug, block, participantListElement, participant, columnAmount )
        })



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