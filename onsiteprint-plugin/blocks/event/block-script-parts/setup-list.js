/* ------------------------------------------------------------------------
 #  JS Part Name: Setup List
 *  Block function included in the Event Block.
 ?  Updated: 2025-07-08 - 21:02 (Y:m:d - H:i)
 ?  Info: Removed Lines and Added the Lines to the Block Script.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Setup of the Participant List in Event

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../assets/js/inc/basic.js'
import { opAddParticipant } from './add-participant.js'

/* ------------------------------------------------------------------------
 #  2. Function: Setup of the Participant List in Event
 ?  NB: The function is under construction.
--------------------------------------------------------------------------- */
export function opSetupList( debug, block, eventId, participantList ) {

    try {
        
        ///// Get Function Name.
        var functionName = opSetupList.name
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

            
        //// #NG: Need to Validate the Length of the Participant List


        ///// Get the Participant Container.
        let participantContainer = block.querySelector( '.op-participant-rows' )

        ///// Start the Console Log Group.
        if ( debug ) console.group( `Participants Added: ${ participantList.length }` )

        ///// For each Participant.
        for( var i = 0; i < participantList.length; i++ ) {

            ///// Create a Participant Element.
            const participantResponse = opAddParticipant( debug, eventId, participantContainer, participantList[i] )

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