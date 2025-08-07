/* ------------------------------------------------------------------------
 #  JS Part Name: Modal - Create Participant
 *  Creating the Create Participant Content to the Modal in the Event Block.
 ?  Updated: 2025-08-07 - 04:18 (Y:m:d - H:i)
 ?  Info: Changed the Query Selector to the Add Button.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Add the Participant to the Participant Container

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../../assets/js/inc/basic.js'
import { opModalToggleListener } from '../../../../assets/js/inc/modal/toggle-modal-listener.js'
import { opColumnInputListener, opCreateParticipantListener } from '../participant-listeners.js'
import { opModalClearFormListener } from './modal-clear-form-listener.js'

/* ------------------------------------------------------------------------
 #  2. Function: Modal - Create Participant
--------------------------------------------------------------------------- */
export function opModalCreateParticipant( debug, block, eventId ) {

    try {

        ///// Get Function Name.
        var functionName = opModalCreateParticipant.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Get the Create Participant Template Elements.
        let modalTemplateElement = block.querySelector( `[id$="-create-participant-template"]` )
        let modal = modalTemplateElement.content.cloneNode(true)
        let modalHeader = modal.querySelector( '.op-header-content__inner' )
        let modalMain = modal.querySelector( '.op-modal-content__inner' )
        let formElement = modalMain.querySelector( '.op-form' )
        let columnInputElements = formElement.querySelectorAll( '.op-col-input input' )
        let saveButton = modal.querySelector( '.op-button-save' )
        let cancelButton = modal.querySelector( '.op-cancel_create-participant' )

        ///// Get the Modal Elements.
        let addButton = block.querySelector( '.op-button[name="add-participant"]' )
        let modalElement = block.querySelector( '.op-modal' )

        ///// Set Modal Toggle Listener to the Add Participant Button.
        opModalToggleListener( debug, addButton, true, modalHeader, modalMain ) 

        ///// Set Modal Clear Form Listener to the Modal Close Button.
        opModalClearFormListener( debug, modalElement, cancelButton )

        ///// Set Column Input Listener to All of the Column Input Elements in the Modal Form.
        columnInputElements.forEach( inputElement => {
            opColumnInputListener( debug, block, inputElement, saveButton )
        })

        ///// Set Create Participant Listener to the Modal Form Button.
        opCreateParticipantListener( debug, block, saveButton, eventId, formElement )

        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `The Create Participant Modal was correctly Executed!`, 
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