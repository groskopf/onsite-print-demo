/* ------------------------------------------------------------------------
 #  JS Part Name: Add Participant
 *  Adding the Participant to the Participant Container in the Event Block.
 ?  Updated: 2025-12-16 - 01:03 (Y:m:d - H:i)
 ?  Info: Changed "textContent" to "innerHTML" in the Participant lines.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Add the Participant to the Participant Container

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../assets/js/inc/basic.js'
import * as opModuleListeners from './participant-listeners.js'

/* ------------------------------------------------------------------------
 #  2. Function: Add the Participant to the Participant Container
--------------------------------------------------------------------------- */
export function opAddParticipant( debug, eventId, participantsContainer, participant ) {

    try {

        ///// Get Function Name.
        var functionName = opAddParticipant.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Validate the Participant.
        if ( participant?.id === undefined || participant?.id === '' ) throw opModuleBasic.opReturnResponse( true, 404, { 
            message: `Could not find any Participant!`, 
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Get the Participant Template Element.
        let participantTemplateElement = participantsContainer.querySelector(`[id$="-participant-template"]`)
        let participantElement = participantTemplateElement.content.cloneNode(true)
        
        ///// Set the Elements in the Participant Template Element.
        participantElement.querySelector( 'article' ).setAttribute( 'id', `op-participant_${ participant.id }` )
        participantElement.querySelector( 'article' ).setAttribute( 'data-validation', ( participant.active == 1 ) ? 2 : 0 )
        participantElement.querySelector( 'article' ).setAttribute( 'data-op-arrival', participant.active )
        participantElement.querySelector( 'article' ).setAttribute( 'data-op-prints', participant.prints )
        participantElement.querySelector( '.op-col-line-1 .op-text' ).innerHTML = participant.line1
        participantElement.querySelector( '.op-col-line-2 .op-text' ).innerHTML = participant.line2
        participantElement.querySelector( '.op-col-line-3 .op-text' ).innerHTML = participant.line3
        participantElement.querySelector( '.op-col-line-4 .op-text' ).innerHTML = participant.line4
        participantElement.querySelector( '.op-col-line-5 .op-text' ).innerHTML = participant.line5
        participantElement.querySelector( '.op-col-amount-of-prints' ).textContent = participant.prints
        participantElement.querySelectorAll( '.op-col-arrival-time' ).forEach( timeElement => {
            timeElement.setAttribute( 'datetime', opTimeConverter( participant.time, 'full' ) )
            timeElement.querySelector( '.op-text' ).textContent =  opTimeConverter( participant.time, 'hour-min' )
        })

        ///// Set Participant Toggle Listener to the Participant Template Element.
        opModuleListeners.opParticipantToggleListener( debug, participantElement.querySelector( 'article' ), participant.id )

        ///// Set Print Participant Listener to the Participant Print Button.
        opModuleListeners.opPrintParticipantListener( debug, participantElement.querySelector( 'button.op-participant-print' ), eventId, participant.id )

        ///// Get the Participant Rows Element and Add the Participant.
        let participantRows = participantsContainer.querySelector('.op-participant-rows')
        participantRows.append( participantElement )

        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `The Participant (${ participant.id }) was Added to the Participant Container in the Event Block!`, 
            line: opModuleBasic.errorLine(),
            function: functionName,
            details: participantRows.querySelector( `#op-participant_${ participant.id }` )
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