/* ------------------------------------------------------------------------
 #  JS Part Name: Modal - Clear Form Listener
 *  Creating the Create Participant Content to the Modal in the Event Block.
 ?  Updated: 2025-08-06 - 04:15 (Y:m:d - H:i)
 ?  Info: Added new Script and Function, Modal - Clear Form Listener.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Add the Participant to the Participant Container

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../../assets/js/inc/basic.js'
import { opChangeModalContent } from '../../../../assets/js/inc/modal/change-modal-content.js'

/* ------------------------------------------------------------------------
 #  2. Function: Modal - Clear Form Listener
--------------------------------------------------------------------------- */
export function opModalClearFormListener( debug, modalElement, button ) {

    try {
        
        ///// Get Function Name.
        var functionName = opModalClearFormListener.name
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Set Modal Clear Form Listener to the Button Element.
        opModuleBasic.opListener( 'click', button, async () => {

            ///// Start the Console Log Group.
            if ( debug ) console.group( `opModalClearFormListener()` )

            ///// Clear the Form Values and the Validation.
            let inputElements = modalElement.querySelectorAll( '.op-form-content input' )
            modalElement.removeAttribute( 'data-validation' )
            modalElement.querySelector( '.op-form-content textarea' ).value = ''
            inputElements.forEach( inputElement => {
                inputElement.value = ''
            } )

            ///// Add "disabled" to the Create Participant Button.
            modalElement.querySelector( '.op-button-save' ).disabled = true

            ///// Get Response from the Modal Content.
            const modalContentResponse = opChangeModalContent( debug, modalElement, false )

            ///// Validate the Response from the Modal Content.
            if ( modalContentResponse.error !== false ) {

                ///// Console Log if Debug.
                if ( debug ) console.error( 'ERROR:', { 
                    message: `Something went wrong when changing the Modal Content!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName,
                    details: {
                        element: button,
                        state: false
                    }
                } )

            } else {

                ///// Console Log if Debug.
                if ( debug ) console.log( 'SUCCESS:', { 
                    message: `No errors were found in the Modal Clear Form Listener!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName,
                    details: {
                        element: button,
                        state: false
                    }
                } )

            }

            ///// End the Console Log Group.
            if ( debug ) console.groupEnd()

        } )

        ///// Console Log Success if Debug.
        if ( debug ) console.log( 'SUCCESS:', { 
            message: `The Modal Clear Form Listener is Active!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

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