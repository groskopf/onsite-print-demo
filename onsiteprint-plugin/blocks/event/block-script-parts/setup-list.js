/* ------------------------------------------------------------------------
 #  JS Part Name: Setup List
 *  Block function included in the Event Block.
 ?  Updated: 2025-12-18 - 01:08 (Y:m:d - H:i)
 ?  Info: Changed throw error to return response.
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

        ///// Validate the Participant List.
        if ( participantList.length === 0 ) return opModuleBasic.opReturnResponse( false, 204, { 
            message: `No Participants found!`, 
            line: opModuleBasic.errorLine(),
            function: functionName
        }, debug )

        ///// Get the Participants Container.
        let participantsContainer = block.querySelector( '.op-participant-list' )

        ///// Start the Console Log Group.
        if ( debug ) console.group( `Participants Added: ${ participantList.length }` )

        ///// For each Participant.
        for (let i = 0; i < participantList.length; i++ ) {

            ///// Create a Participant Element.
            const participantResponse = opAddParticipant( debug, eventId, participantsContainer, participantList[i] )

            ///// Validate the Participant Response.
            if ( participantResponse.error !== false ) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Something went wrong when adding a Participant!`, 
                line: opModuleBasic.errorLine(),
                function: functionName
            } )

            if ( i === 0 ) {

                ///// Fade Out the Skeleton and Fade In the Participant.
                participantsContainer.querySelectorAll( '.op-participant_skeleton' ).forEach( skeleton => {
                    skeleton.classList.remove( 'op-fade-in' )
                    setTimeout( () => {
                        skeleton.classList.add( 'op-fade-out' )
                    }, 300 )
                    setTimeout( () => {
                        skeleton.classList.remove( 'op-active' )
                    }, 600 )
                } )

                ///// Console Log Success if Debug.
                if ( debug ) console.log( 'SUCCESS:', { 
                    message: `First Participant Added, removing skeletons...`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )
    
            }

            setTimeout(() => {
                participantResponse.response.details.classList.add( 'op-fade-in' )
            }, 600)

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