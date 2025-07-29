/* ------------------------------------------------------------------------
 #  JS Part Name: Modal - Create Participant
 *  Creating the Create Participant Content to the Modal in the Event Block.
 ?  Updated: 2025-07-29 - 03:56 (Y:m:d - H:i)
 ?  Info: Added new Script and Function with the content from setup-header.js.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Add the Participant to the Participant Container

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../../assets/js/inc/basic.js'
import { opColumnInputListener, opCreateParticipantListener } from '../participant-listeners.js'

/* ------------------------------------------------------------------------
 #  2. Function: Modal - Create Participant
--------------------------------------------------------------------------- */
export function opModalCreateParticipant( debug, block ) {

    try {

        ///// Get Function Name.
        var functionName = opModalCreateParticipant.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Get the Create Participant Template Element.
        let modalTemplateElement = block.querySelector( `[id$="-create-participant-template"]` )
        let modalElement = modalTemplateElement.content.cloneNode(true)
        let modalHeader = modalElement.querySelector( '.op-header-content__inner' )
        let modalContent = modalElement.querySelector( '.op-modal-content__inner' )
        let formElement = modalContent.querySelector( '.op-form' )
        let columnInputElements = formElement.querySelectorAll( '.op-col-input input' )
        let saveButton = modalContent.querySelector( '.op-button-save' )

        ///// Set Column Input Listener to All of the Column Input Elements in the Modal Form.
        columnInputElements.forEach( inputElement => {
            opColumnInputListener( debug, block, inputElement, saveButton )
        })

        ///// Set Create Participant Listener to the Modal Form Button.
        opCreateParticipantListener( debug, block, saveButton, eventId, formElement )

        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `The Participant () was Added to the Participant Container in the Event Block!`, 
            line: opModuleBasic.errorLine(),
            function: functionName,
            details: {
                header: modalHeader,
                content: modalContent
            }
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