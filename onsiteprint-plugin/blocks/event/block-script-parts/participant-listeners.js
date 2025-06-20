/* ------------------------------------------------------------------------
 #  JS Part Name: Participant Listeners Script
 *  Functions Used in the Add Participant Scripts in the Event Block.
 ?  Updated: 2025-06-20 - 03:51 (Y:m:d - H:i)
 ?  Info: Added Update of the Event Information Block in the Print Participant Listener.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Participant Toggle Listener

    3. 	Function: Print Participant Listener

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../assets/js/inc/basic.js'
import { opPrintParticipant } from '../../../assets/js/inc/participant/print-participant.js'
import { opUpdateParticipant } from '../../../assets/js/inc/participant/update-participant.js'

/* ------------------------------------------------------------------------
 #  2. Function: Participant Toggle Listener
--------------------------------------------------------------------------- */
export function opParticipantToggleListener( debug, participant, participantId ) {

    try {
        
        ///// Get Function Name.
        var functionName = opParticipantToggleListener.name
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Set Participant Toggle Listener to the Participant Template Element.
        opModuleBasic.opListener( 'click', participant, async () => {

            ///// Start the Console Log Group.
            if ( debug ) console.group( `Participant with ID: op-participant_${ participantId }` )
                
            ///// Add Class when the Participant is Clicked on.
            opToggleActive( 'class', 'op-participant' )

            ///// Console Log Success if Debug.
            if ( debug ) console.log( 'SUCCESS:', { 
                message: `No errors were found in the Participant Toggle Listener!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            })

            ///// End the Console Log Group.
            if ( debug ) console.groupEnd()
            
        })

        ///// Console Log Success if Debug.
        if ( debug ) console.log( 'SUCCESS:', { 
            message: `The Participant Toggle Listener is Active!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        })

    } catch( errorResponse ) {

        ///// Create Error Details.
        let errorDetails = ( errorResponse.error == true ) ? errorResponse : opModuleBasic.opReturnResponse( false, 400, { 
            message: errorResponse.message,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Log Error Details in the Console.
        if ( debug ) console.error( 'ERROR:', errorDetails )

    } finally {

        ///// End the Console Log Group.
        if ( debug ) console.groupEnd()

    }

}

/* ------------------------------------------------------------------------
 #  3. Function: Print Participant Listener
--------------------------------------------------------------------------- */
export function opPrintParticipantListener( debug, printButton, eventId, participantId ) {

    try {
        
        ///// Get Function Name.
        var functionName = opPrintParticipantListener.name
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Set Print Participant Listener to the Participant Print Button.
        opModuleBasic.opListener( 'click', printButton, async ( event ) => {

            ///// Start the Console Log Group.
            if ( debug ) console.group( `Participant with ID: op-participant_${ participantId }` )

            ///// Stop Propagation from the Event Listener.
            event.stopPropagation()

            ///// Set the Participant Element.
            let participantElement = event.target.closest( 'article' )
            participantElement.classList.add( 'op-active' )
            participantElement.querySelector( 'button.op-participant-print' ).disabled = true
            participantElement.setAttribute( 'data-validation', '1' )
            
            try {

                ///// Print the Participant.
                const printParticipantResponse = await opPrintParticipant( debug, eventId, participantId )

                ///// Validate the Response from the Print the Participant.
                if ( printParticipantResponse.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
                    message: `Something went wrong Printing the Event!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )

                ///// Get the Participant.
                const participant = printParticipantResponse.response.details.participant

                ///// Update the Participant.
                const updateParticipantResponse = await opUpdateParticipant( debug, eventId, participant )

                ///// Validate the Response from the Update the Participant.
                if ( updateParticipantResponse.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
                    message: `Something went wrong Updating the Event!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )

                ///// Set Timeout to three seconds.
                setTimeout( () => {

                    ///// Set the Participant Element.
                    participantElement.querySelector( 'button.op-participant-print' ).disabled = false
                    participantElement.setAttribute( 'data-validation', '2' )
                    participantElement.setAttribute( 'data-op-arrival', participant.active )
                    participantElement.setAttribute( 'data-op-prints', participant.prints )
                    participantElement.querySelector( '.op-col-amount-of-prints' ).textContent = participant.prints
                    participantElement.querySelectorAll( '.op-col-arrival-time' ).forEach( timeElement => {
                        timeElement.setAttribute( 'datetime', opTimeConverter( participant.time, 'full' ) )
                        timeElement.querySelector( '.op-text' ).textContent =  opTimeConverter( participant.time, 'hour-min' )
                    } )

                    ////# NG - This function need to be changed, when a new (EventInformationBlock) is created.
                    ///// Update Event Information Blocks.
                    opEventInformationBlocks()

                }, 3000 )

                ///// Console Log Success if Debug.
                if ( debug ) console.log( 'SUCCESS:', { 
                    message: `No errors were found in the Print Participant Listener!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                })

            } catch( errorListenerResponse ) {

                ///// Set Timeout to three seconds.
                setTimeout( () => {
                    
                    ///// Set the Participant Element.
                    let dateNow = Date.now()
                    participantElement.querySelector( 'button.op-participant-print' ).disabled = false
                    participantElement.setAttribute( 'data-validation', '3' )    
                    participantElement.querySelectorAll( '.op-col-arrival-time' ).forEach( timeElement => {
                        timeElement.setAttribute( 'datetime', opTimeConverter( dateNow, 'full' ) )
                        timeElement.querySelector( '.op-text' ).textContent =  opTimeConverter( dateNow, 'hour-min' )
                    } )

                }, 3000 )

                ///// Log Error Details in the Console.
                if ( debug ) console.error( 'ERROR:', errorListenerResponse )

            }

            ///// End the Console Log Group.
            if ( debug ) console.groupEnd()
            
        })

        ///// Console Log Success if Debug.
        if ( debug ) console.log( 'SUCCESS:', { 
            message: `The Print Participant Listener is Active!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        })

    } catch( errorResponse ) {

        ///// Create Error Details.
        let errorDetails = ( errorResponse.error == true ) ? errorResponse : opModuleBasic.opReturnResponse( false, 400, { 
            message: errorResponse.message,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Log Error Details in the Console.
        if ( debug ) console.error( 'ERROR:', errorDetails )

    } finally {

        ///// End the Console Log Group.
        if ( debug ) console.groupEnd()

    }

}