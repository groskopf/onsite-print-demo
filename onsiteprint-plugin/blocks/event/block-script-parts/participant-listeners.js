/* ------------------------------------------------------------------------
 #  JS Part Name: Participant Listeners Script
 *  Functions Used in the Add Participant Scripts in the Event Block.
 ?  Updated: 2025-07-28 - 01:51 (Y:m:d - H:i)
 ?  Info: Changed the Import of the Participant and Added the Create Participant Listener.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Participant Toggle Listener

    3. 	Function: Print Participant Listener

    4.  Function: Create Participant Listener

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../assets/js/inc/basic.js'
import * as opModuleParticipant from '../../../assets/js/inc/participant/participant.js'
import { opAddParticipant } from './add-participant.js'

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
                const printParticipantResponse = await opModuleParticipant.opPrintParticipant( debug, eventId, participantId )

                ///// Validate the Response from the Print the Participant.
                if ( printParticipantResponse.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
                    message: `Something went wrong Printing the Event!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )

                ///// Get the Participant.
                const participant = printParticipantResponse.response.details.participant

                ///// Update the Participant.
                const updateParticipantResponse = await opModuleParticipant.opUpdateParticipant( debug, eventId, participant )

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
                        timeElement.setAttribute( 'datetime', opModuleBasic.opTimeConverter( participant.time, 'full' ) )
                        timeElement.querySelector( '.op-text' ).textContent =  opModuleBasic.opTimeConverter( participant.time, 'hour-min' )
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
                        timeElement.setAttribute( 'datetime', opModuleBasic.opTimeConverter( dateNow, 'full' ) )
                        timeElement.querySelector( '.op-text' ).textContent =  opModuleBasic.opTimeConverter( dateNow, 'hour-min' )
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

/* ------------------------------------------------------------------------
 #  4. Function: Create Participant Listener
--------------------------------------------------------------------------- */
export function opCreateParticipantListener( debug, block, button, eventId, formElement ) {

    try {
        
        ///// Get Function Name.
        var functionName = opCreateParticipantListener.name
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Set Create Participant Listener to the Button Element.
        opModuleBasic.opListener( 'click', button, async () => {

            ///// Start the Console Log Group.
            if ( debug ) console.group( `opCreateParticipantListener()` )

            try {

                ///// Check if the String is Empty (Return: True or False).
                const isEmpty = string => ! string || ! string.trim().length
                
                ///// Define the Participant Data variables.
                let id = 'np' + Date.now()
                let column1 = isEmpty( formElement[ 'column-1' ].value ) ? '' : formElement[ 'column-1' ].value
                let column2 = isEmpty( formElement[ 'column-2' ].value ) ? '' : formElement[ 'column-2' ].value
                let column3 = isEmpty( formElement[ 'column-3' ].value ) ? '' : formElement[ 'column-3' ].value
                let column4 = isEmpty( formElement[ 'column-4' ].value ) ? '' : formElement[ 'column-4' ].value
                let column5 = isEmpty( formElement[ 'column-5' ].value ) ? '' : formElement[ 'column-5' ].value
                let note = isEmpty( formElement[ 'note' ].value ) ? '' : formElement[ 'note' ].value
                
                ///// If all the Columns are Empty throw an error.
                if ( ( column1 == '' ) && ( column2 == '' ) && ( column3 == '' ) && ( column4 == '' ) && ( column5 == '' ) ) throw opModuleBasic.opReturnResponse( true, 404, { 
                    message: `At least one Column must be Filled!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )

                ///// Define new Participant variable.
                let participant = {
                    id : id,
                    line1 : column1,
                    line2 : column2,
                    line3 : column3,
                    line4 : column4,
                    line5 : column5,
                    note : note,
                    time : '',
                    active : 0,
                    prints : 0
                }

                ///// Create the Participant.
                const createParticipantResponse = await opModuleParticipant.opCreateParticipant( debug, eventId, participant )

                ///// Validate the Response from the Create the Participant.
                if ( createParticipantResponse.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
                    message: `Something went wrong Creating the Event!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )
               
                ///// Close the Modal.
                block.closest( '.wp-block-post-content' ).classList.remove( 'op-modal-active' )
                
                ///// Remove the Validation from the Form.
                let inputElements = formElement.querySelectorAll( 'input' )
                block.querySelector( '.op-modal' ).removeAttribute( 'data-validation' )
                block.querySelector( '.op-modal textarea' ).value = ''
                inputElements.forEach( inputElement => {
                    inputElement.value = ''
                } )

                ///// Get the Participant Container.
                let participantContainer = block.querySelector( '.op-participant-rows' )

                ///// Create a Participant Element.
                const participantResponse = opAddParticipant( debug, eventId, participantContainer, participant )

                ///// Validate the Participant Response.
                if ( participantResponse.error !== false ) {

                    ///// Console Log Group Value.
                    if ( debug ) console.debug( 'DEBUG:', { 
                        message: `Something went wrong when adding a Participant!`,
                        line: opModuleBasic.errorLine(),
                        function: functionName
                    } )

                } else {

                    ///// Scroll and Fade In the Participant after Timeout.
                    setTimeout( () => {
                        participantResponse.response.details.classList.add( 'op-fade-in' )
                        participantContainer.scrollIntoView( false )

                        ////# NG - This function need to be changed, when a new (EventInformationBlock) is created.
                        ///// Update Event Information Blocks.
                        opEventInformationBlocks()

                    }, 500 )

                }

                ///// Console Log Success if Debug.
                if ( debug ) console.log( 'SUCCESS:', { 
                    message: `No errors were found in the Create Participant Listener!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                })

            } catch( errorListenerResponse ) {

                ///// Add the Validation to the Modal.
                if ( errorListenerResponse.code == 404 ) {
                    block.querySelector( '.op-modal' ).setAttribute( 'data-validation', '2' )
                } else {
                    block.querySelector( '.op-modal' ).classList.add( 'op-error' )
                }

                ///// Log Error Details in the Console.
                if ( debug ) console.error( 'ERROR:', errorListenerResponse )

            }

            ///// End the Console Log Group.
            if ( debug ) console.groupEnd()

        })

        ///// Console Log Success if Debug.
        if ( debug ) console.log( 'SUCCESS:', { 
            message: `The Create Participant Listener is Active!`,
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