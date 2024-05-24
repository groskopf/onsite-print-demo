/* ------------------------------------------------------------------------
 #  JS Part Name: Step 3 Script
 *  Functions included in the Block Form Script (Template Creation).
 ?  Updated: 2024-05-22 - 21:37 (Y:m:d - H:i)
 ?  Info: Changed structure in JS block script + added new files, comments and validation.
---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../../../assets/js/inc/basic.js'

/* ------------------------------------------------------------------------
 #  2. The Function of Step 3
--------------------------------------------------------------------------- */
export function opStep3( debug, block ) {

    try {
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( 'opStep3()' )

        ///// Check if the Block is defined.
        if ( ! block ) {
            
            ///// Return the Response.
            return opModuleBasic.opReturnResponse( false, 404, { 
                message: `Missing the Block Element!`, 
                line: opModuleBasic.errorLine()
            } )

        } else {

            ///// Get the Block ID.
            let blockId = block.getAttribute( 'id' )

            ///// Get the elements in Step 3.
            let fieldset3Element = block.querySelector( '.op-fieldset-step-3' )
            let fieldset3Inner = fieldset3Element.querySelector( '.op-fieldset__inner' )
            let radioLinesInputs = fieldset3Element.querySelectorAll( `.op-form-radio-lines input` )

            ///// Get the elements in Step 4.
            let fieldset4Element = block.querySelector( '.op-fieldset-step-4' )
            let layoutContainer = fieldset4Element.querySelector( '.op-form-layouts' )
            let radioInputs = layoutContainer.querySelectorAll( '.op-radio-input' )

            ///// Throw Error if Fieldset 3 or 4 is missing.
            if ( ! fieldset3Element || ! fieldset4Element ) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Missing one or more Fieldset Elements!`,
                line: opModuleBasic.errorLine()
            } )

            ///// Set Event Listener for all Radio Inputs in Step 3.
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

                    ///// Get the Image Input Element.
                    let imageInput = fieldset3Inner.querySelector( `label[for="${ blockId }-image-file-input"]` )
                
                    ///// Check if the Input Element has the Value of (no or yes).
                    if ( radioLinesInputs[i].value == 'no' ) {

                        ///// Remove the Image Input Element if it's Found.
                        if ( imageInput ) imageInput.remove()
                
                        ///// Set the Selected Image Option in Step 4.
                        layoutContainer.setAttribute( 'data-layout-image', 0 )
                    
                        ///// Validate the Form.
                        const formValidation = await opFormInputValidation( debug, 'fieldset', radioLinesInputs[i] )

                        ///// Validate the Response from Form.
                        if ( formValidation.error !== false ) throw formValidation.response
                
                    } else {
                                       
                        ///// Remove Approval for Step 3.
                        const removeApproval = opSetApprovalToStepInForm( debug, fieldset3Element, 'remove' )

                        ///// Validate the Response from the Approval.
                        if ( removeApproval.error !== false ) throw removeApproval.response
                
                        ///// Set the Selected Image Option in Step 4.
                        layoutContainer.setAttribute( 'data-layout-image', 1 )

                        ///// Get the Template Element.
                        let template = fieldset3Inner.querySelector(`#${ blockId }-image-file-template`).content.cloneNode(true)

                        ///// Throw Error if the Template Element is missing.
                        if ( ! template ) throw opModuleBasic.opReturnResponse( true, 404, { 
                            message: `Missing the Template Element!`, 
                            line: opModuleBasic.errorLine()
                        } )

                        ///// Add the Image Input Element if it's not Found.
                        if ( ! imageInput ) fieldset3Inner.append( template )       
                
                    }
                
                } )
            }            
        }

        ///// Debug to the Console Log.
        opModuleBasic.opConsoleDebug( debug, {
            message: `No errors were found in Step 3!`,
            line: opModuleBasic.errorLine()
        } )

        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `No errors were found in Step 3!`, 
            line: opModuleBasic.errorLine()
        } )

    } catch( errorDetails ) {

        ///// Log Error Details in the Console.
        console.error( 'ERROR:', { 
            function: 'opStep3',
            line: opModuleBasic.errorLine(),
            details: errorDetails.message
        } )
        
        ///// Return the Error Response.
        return opModuleBasic.opReturnResponse( true, 400, { 
            function: 'opStep3', 
            line: opModuleBasic.errorLine(), 
            details: errorDetails.message 
        } )

    } finally {

        ///// End the Console Log Group.
        if ( debug ) console.groupEnd()

    }

}