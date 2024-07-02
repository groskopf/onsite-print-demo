/* ------------------------------------------------------------------------
 #  JS Part Name: Step 4 Script
 *  Functions included in the Block Form Script (Event Creation).
 ?  Updated: 2024-07-02 - 21:45 (Y:m:d - H:i)
 ?  Info: Added Modal (See Print Example) to Step 3 (Event Creation).
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
                if ( debug ) console.group( `Event Listener (Click): Button Element - Event Creation Block, ${ functionName }()` )

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

                    ///// Get the Block ID.
                    let blockId = block.getAttribute( 'id' )

                    ///// Get the Template Elements.
                    let templateElement = block.querySelector(`.op-fieldset-step-4 #${ blockId }-modal-save-template`)
                    let template = templateElement.content.cloneNode(true)

                    ///// Check if the Modal Element it's Found.
                    if ( ! template ) console.error( 'ERROR:', { 
                        message: `The Modal Element was not found!`,
                        line: opModuleBasic.errorLine(),
                        function: functionName
                    } )
                    else {

                        ///// Get the Modal Elements.
                        let modalElement = block.querySelector( '.op-modal')
                        let modalInnerElement = modalElement.querySelector( '.op-modal__inner')
                        
                        ///// Clear the Modal Window.
                        modalInnerElement.innerHTML = ""

                        ///// Add the Template to the Modal Window.
                        modalInnerElement.append( template )

                        ///// Set URL in the Relocation Button.
                        let eventUrl = templateElement.getAttribute( 'data-relocation-event' )
                        modalElement.querySelector( '.op-button-event' ).setAttribute( 'href', `${ eventUrl }?event=${ saveEventValidation.response.details }` )

                        ///// Activate the Modal Window.
                        modalElement.classList.add( 'op-active' )

                    }

                }

                ///// End the Console Log Group.
                if ( debug ) console.groupEnd()

            } )

        }

        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `No errors were found in Step 4!`, 
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