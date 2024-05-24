/* ------------------------------------------------------------------------
 #  JS Part Name: Step 1 Script
 *  Functions included in the Block Form Script (Event Creation).
 ?  Updated: 2024-05-24 - 00:07 (Y:m:d - H:i)
 ?  Info: Changed structure in JS block script + added new files, comments and validation.
---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../../../assets/js/inc/basic.js'

/* ------------------------------------------------------------------------
 #  2. The Function of Step 1
--------------------------------------------------------------------------- */
export function opStep1( debug, block ) {
    
    try {
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( 'opStep1()' )

        ///// Check if the Block is defined.
        if ( ! block ) {
            
            ///// Return the Response.
            return opModuleBasic.opReturnResponse( false, 404, { 
                message: `Missing the Block Element!`, 
                line: opModuleBasic.errorLine()
            } )

        } else {
            
            ///// Get the elements in Step 1.
            let fieldset1Element = block.querySelector( '.op-fieldset-step-1' )
            let radioLinesInputs = fieldset1Element.querySelectorAll( `.op-form-radio-lines input` )

            console.log(radioLinesInputs)
            ///// Throw Error if Fieldset 1 or 4 is missing.
            if ( radioLinesInputs.length === 0 ) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Missing All!`,
                line: opModuleBasic.errorLine()
            } )

            ///// Get the elements in Step 4.
            let fieldset4Element = block.querySelector( '.op-fieldset-step-4' )
            let layoutContainer = fieldset4Element.querySelector( '.op-form-layouts' )
            let radioInputs = layoutContainer.querySelectorAll( '.op-radio-input' )

            ///// Throw Error if Fieldset 1 or 4 is missing.
            if ( ! fieldset1Element || ! fieldset4Element ) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Missing one or more Fieldset Elements!`,
                line: opModuleBasic.errorLine()
            } )

            ///// Set Event Listener for all Radio Inputs in Step 1.
            for( let i = 0; i < radioLinesInputs.length; ++i ) {
                opModuleBasic.opListener( 'click', radioLinesInputs[i], async () => {

                    ///// Remove Approval for Step 4.
                    const removeApproval = opSetApprovalToStepInForm( debug, fieldset4Element, 'remove' )

                    ///// Validate the Response from the Approval.
                    if ( removeApproval.error !== false ) throw removeApproval.response

                    ///// Uncheck all Inputs in Step 4.
                    radioInputs.forEach( radioInput => {
                        radioInput.querySelector( 'input[type="radio"]' ).checked = false
                    })

                    ///// Set the Amount of Selected Lines in Step 4.
                    layoutContainer.setAttribute( 'data-layout-lines', `${ i+1 }L` )

                    ///// Validate the Form.
                    const formValidation = await opFormInputValidation( debug, 'fieldset', radioLinesInputs[i] )

                    ///// Validate the Response from Form.
                    if ( formValidation.error !== false ) throw formValidation.response

                } )
            }
        }


/* 

        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( ! debug ) debug = false
        if ( ! number ) throw `Missing the Number of Grid Columns in the Function Parameters!`
        if ( ! formElement ) formElement = event.target.closest( '.op-form-steps' )

        ///// Get the Elements.
        let gridContainer = formElement.querySelector( '.op-grid-wrapper' )

        ///// Set the Number of Grid Columns to the Grid Container Element.
        gridContainer.setAttribute( 'data-grid-cols', number )

        ///// Create/throw Response.
        error = false, code = 200, message = 'The Number of Grid Columns was added to the Grid Element!'



 */










        
        ///// Debug to the Console Log.
        opModuleBasic.opConsoleDebug( debug, {
            message: `No errors were found in Step 1!`,
            line: opModuleBasic.errorLine()
        } )

        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `No errors were found in Step 1!`, 
            line: opModuleBasic.errorLine()
        } )

    } catch( errorDetails ) {

        ///// Log Error Details in the Console.
        console.error( 'ERROR:', { 
            function: 'opStep1',
            message: `Something went wrong in the function!`, 
            details: errorDetails
        } )

        ///// Return the Error Response.
        return opModuleBasic.opReturnResponse( true, 400, { 
            function: 'opStep1',
            message: `Something went wrong in the function!`, 
            details: errorDetails
        } )

    } finally {

        ///// End the Console Log Group.
        if ( debug ) console.groupEnd()

    }

}