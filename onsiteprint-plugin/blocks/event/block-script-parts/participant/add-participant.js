/* ------------------------------------------------------------------------
 #  JS Part Name: Add Participant
 *  Adding the Participant to the Participant List in the Event Block.
 ?  Updated: 2025-05-23 - 04:59 (Y:m:d - H:i)
 ?  Info: Added Event Id to opAddParticipant() function.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Add the Participant to the Participant List

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../../assets/js/inc/basic.js'
import * as opModuleListeners from './participant-listeners.js'
import * as opModuleEvent from '../../../../assets/js/inc/event/event.js'

/* ------------------------------------------------------------------------
 #  2. Function: Add the Participant to the Participant List
--------------------------------------------------------------------------- */
export function opAddParticipant( debug, block, listElement, participant ) {

    try {

        ///// Get Function Name.
        var functionName = opAddParticipant.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Get the Participant Template Element.
        let participantTemplateElement = block.querySelector(`[id$="-participant-template"]`)
        let participantElement = participantTemplateElement.content.cloneNode(true)
        
        ///// Set the Elements in the Participant Template Element.
        participantElement.querySelector( 'article' ).setAttribute( 'id', `op-participant_${ participant.id }` )
        participantElement.querySelector( 'article' ).setAttribute( 'data-validation', ( participant.active == 1 ) ? 2 : 0 )
        participantElement.querySelector( 'article' ).setAttribute( 'data-op-arrival', participant.active )
        participantElement.querySelector( 'article' ).setAttribute( 'data-op-prints', participant.prints )
        participantElement.querySelector( '.op-col-line-1 .op-text' ).textContent = participant.line1
        participantElement.querySelector( '.op-col-line-2 .op-text' ).textContent = participant.line2
        participantElement.querySelector( '.op-col-line-3 .op-text' ).textContent = participant.line3
        participantElement.querySelector( '.op-col-line-4 .op-text' ).textContent = participant.line4
        participantElement.querySelector( '.op-col-line-5 .op-text' ).textContent = participant.line5
        participantElement.querySelector( '.op-col-amount-of-prints' ).textContent = participant.prints
        participantElement.querySelectorAll( '.op-col-arrival-time' ).forEach( timeElement => {
            timeElement.setAttribute( 'datetime', opTimeConverter( participant.time, 'full' ) )
            timeElement.querySelector( '.op-text' ).textContent =  opTimeConverter( participant.time, 'hour-min' )
        })

        ///// Set Participant Toggle Listener to the Participant Template Element.
        opModuleListeners.opParticipantToggleListener( debug, participantElement.querySelector( 'article' ), participant.id )

        ///// Get Event Id. 
        let eventId = block.getAttribute( 'data-event-id' )

        ///// Set Print Participant Listener to the Participant Print Button.
        opModuleListeners.opPrintParticipantListener( debug, participantElement.querySelector( 'button.op-participant-print' ), eventId, participant.id )

        ///// Add the Participant Element to the List Element.
        listElement.append( participantElement )

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