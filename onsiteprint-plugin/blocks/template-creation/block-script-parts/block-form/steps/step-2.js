/* ------------------------------------------------------------------------
 #  JS Part Name: Step 2 Script
 *  Functions included in the Block Form Script (Template Creation).
 ?  Updated: 2024-06-03 - 03:12 (Y:m:d - H:i)
 ?  Info: Added extra validation.
---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../../../assets/js/inc/basic.js'

/* ------------------------------------------------------------------------
 #  2. The Function of Step 2
--------------------------------------------------------------------------- */
export function opStep2( debug, block ) {
    
    try {
        
        ///// Get Function Name.
        var functionName = opStep2.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( functionName+'()' )

        ///// Check if the Block is defined.
        if ( ! block ) {
            
            ///// Return the Response.
            return opModuleBasic.opReturnResponse( false, 404, { 
                message: `Missing the Block Element!`, 
                line: opModuleBasic.errorLine(),
                function: functionName
            } )

        } else {
            
            ///// Get the elements in Step 2.
            let fieldset2Element = block.querySelector( '.op-fieldset-step-2' )
            let radioLinesInputs = fieldset2Element.querySelectorAll( `.op-form-radio-lines input` )
            
            ///// Throw Error if Radio Inputs is missing.
            if ( radioLinesInputs.length === 0 ) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Missing Radio Inputs in Step 2!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )

            ///// Get the elements in Step 4.
            let fieldset4Element = block.querySelector( '.op-fieldset-step-4' )
            let layoutContainer = fieldset4Element.querySelector( '.op-form-layouts' )
            let radioInputs = layoutContainer.querySelectorAll( '.op-radio-input' )

            ///// Throw Error if Radio Inputs is missing.
            if ( radioInputs.length === 0 ) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Missing Radio Inputs in Step 4!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )
            
            ///// Throw Error if Fieldset 2 or 4 is missing.
            if ( ! fieldset2Element || ! fieldset4Element ) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Missing one or more Fieldset Elements!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )

            ///// Set Event Listener for all Radio Inputs in Step 2.
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
        
        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `No errors were found in Step 2!`, 
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