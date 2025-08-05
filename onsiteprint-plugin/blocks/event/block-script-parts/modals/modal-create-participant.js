/* ------------------------------------------------------------------------
 #  JS Part Name: Modal - Create Participant
 *  Creating the Create Participant Content to the Modal in the Event Block.
 ?  Updated: 2025-08-04 - 04:31 (Y:m:d - H:i)
 ?  Info: Changed how the Modal Toggle Listener is used.
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
import { opColumnInputListener, opCreateParticipantListener, opDownloadCSVFileListener } from '../participant-listeners.js'
import { opModalClearForm } from '../modals/modal-clear-form.js'


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

        ///// Get the Create Participant Template Element.
        let modalTemplateElement = block.querySelector( `[id$="-create-participant-template"]` )
        let modalElement = modalTemplateElement.content.cloneNode(true)
        let modalHeader = modalElement.querySelector( '.op-header-content__inner' )
        let modalMain = modalElement.querySelector( '.op-modal-content__inner' )
        let formElement = modalMain.querySelector( '.op-form' )
        let columnInputElements = formElement.querySelectorAll( '.op-col-input input' )
        let addButton = block.querySelector( '.op-button-add' )
        let cancelButton = block.querySelector( '.op-button-cancel' )
        let saveButton = modalMain.querySelector( '.op-button-save' )

        ///// Set Modal Toggle Listener to the Add Participant Button.
        opModalToggleListener( debug, addButton, true, modalHeader, modalMain ) 

        ///// Set Modal Toggle Listener to the Modal Close Button.
        opModalToggleListener( debug, cancelButton, false )

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