/* ------------------------------------------------------------------------
 #  JS Part Name: Setup List
 *  Block function included in the Event Block.
 ?  Updated: 2025-06-26 - 11:43 (Y:m:d - H:i)
 ?  Info: Added New Participant Loop with Fading (CSS Animation).
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
import { opAddParticipant } from './add-participant.js'

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

        ///// Get the Participant Container.
        let participantContainer = block.querySelector( '.op-participant-rows' )

        ///// Start the Console Log Group.
        if ( debug ) console.group( `Participants Added: ${ participantList.length }` )

        ///// For each Participant.
        for( var i = 0; i < participantList.length; i++ ) {
            
            ///// Create a Participant Element.
            const participantResponse = opAddParticipant( debug, eventId, participantContainer, [participantList[i]] )

            ///// Validate the Participant Response.
            if ( participantResponse.error !== false ) {
                
                ///// Console Log Group Value.
                if ( debug ) console.debug( 'DEBUG:', { 
                    message: `Something went wrong when adding a Participant!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } ) 

                ///// Break the for loop.
                break
                
            } 
            
            ///// If the first Participant is added.
            if ( i == 0 ) {
                
                ///// Fade Out the Skeleton and Fade In the Participant.
                participantContainer.querySelectorAll( '.op-participant_skeleton' ).forEach( skeleton => {
                    skeleton.classList.remove( 'op-fade-in' )
                    setTimeout( () => {
                        skeleton.classList.add( 'op-fade-out' )
                    }, 300 )
                    setTimeout( () => {
                        skeleton.classList.remove( 'op-active' )
                        participantContainer.querySelectorAll( '.op-participant' ).forEach( participant => {
                            participant.classList.add( 'op-fade-in' )
                        })
                    }, 600 )
                } )

            }

        }

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