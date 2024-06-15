/* ------------------------------------------------------------------------
 #  JS Part Name: Step 4 Script
 *  Functions included in the Block Form Script (Event Creation).
 ?  Updated: 2024-06-15 - 15:23 (Y:m:d - H:i)
 ?  Info: Added Step 4 & opSaveNewEvent() to Steps Additions (Event Creation).
---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../../../assets/js/inc/basic.js'
import * as opModuleAdditions from './steps-additions.js'

/* ------------------------------------------------------------------------
 #  2. The Function of Step 4
--------------------------------------------------------------------------- */
export function opStep4( debug, block ) {

    try {
        
        ///// Get Function Name.
        var functionName = opStep4.name
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Check if the Block is defined.
        if ( ! block ) {
            
            ///// Return the Response.
            return opModuleBasic.opReturnResponse( false, 404, { 
                message: `Missing the Block Element!`, 
                line: opModuleBasic.errorLine(),
                function: functionName
            } )

        } else {

            ///// Get the the Elements.
            let formElement = block.querySelector( '.op-form-steps' )
            let saveButton = formElement.querySelector( '.op-button-save')

            ///// Throw Error if the Form is missing.
            if ( ! formElement ) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Missing the Form Elements!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )

            ///// Set Event Listener for the Input Element.
            opModuleBasic.opListener( 'click', saveButton, async () => {

                ///// Start the Console Log Group.
                if ( debug ) console.group( `Event Listener (Input): Input Element - Event Creation Block, ${ functionName }()` )

                ///// Disable the Save button.
                saveButton.disabled = true

                ///// Save the New Event.
                const saveEventValidation = await opModuleAdditions.opSaveNewEvent( debug, formElement )

                ///// Validate the Response from the Save Event Validation.
                if ( saveEventValidation.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
                    message: `Something went wrong when Adding the Grid Element!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )
                else {

                    ///// Get the Elements.
                    let modalElement = block.querySelector( '.op-modal')

                    ///// Activate the Modal Window.
                    modalElement.classList.add( 'op-active' )
                    
                    ///// Set URL in the Modal Window.
                    let eventUrl = modalElement.getAttribute( 'data-relocation-event' )
                    modalElement.querySelector( '.op-button-event' ).setAttribute( 'href', `${ eventUrl }?event=${ saveEventValidation.response.details }` )

                }

                ///// End the Console Log Group.
                if ( debug ) console.groupEnd()

            } )

        }

        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `No errors were found in Step 3!`, 
            line: opModuleBasic.errorLine(),
            function: functionName
        }, debug )

    } catch( errorResponse ) {

        ///// Create Error Details.
        let errorDetails = ( errorResponse.error == true ) ? errorResponse : opModuleBasic.opReturnResponse( false, 400, { 
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