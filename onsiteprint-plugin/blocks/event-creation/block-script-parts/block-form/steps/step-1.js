/* ------------------------------------------------------------------------
 #  JS Part Name: Step 1 Script
 *  Functions included in the Block Form Script (Event Creation).
 ?  Updated: 2024-06-04 - 05:32 (Y:m:d - H:i)
 ?  Info: Changed structure in JS block script (Event Creation Block) + added new files, comments and validation.
---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../../../assets/js/inc/basic.js'
import * as opModuleAdditions from './steps-additions.js'

/* ------------------------------------------------------------------------
 #  2. The Function of Step 1
--------------------------------------------------------------------------- */
export function opStep1( debug, block ) {
    
    try {

        ///// Get Function Name.
        var functionName = opStep1.name
        
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
            
            ///// Get the elements in Step 1 and Step 3.
            let fieldset1Element = block.querySelector( '.op-fieldset-step-1' )
            let templatesContainer = fieldset1Element.querySelector( `.op-form-radio-inputs` )
            let fieldset3Element = block.querySelector( '.op-fieldset-step-3' )

            ///// Throw Error if Fieldset 1 or 3 is missing.
            if ( ! fieldset1Element || ! fieldset3Element ) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Missing one or more Fieldset Elements!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )

            ///// Add new Templates to the Container Element.
            const addTemplatesToElement = opAddCreatedTemplatesToElement( false, block, templatesContainer )

            ///// Validate the Response from the Adding Templates Function.
            if ( addTemplatesToElement.error !== false ) throw addTemplatesToElement
            else {

                ///// Get the Radio Inputs of the added Templates.
                let radioInputs = templatesContainer.querySelectorAll( '.op-radio-input' )

                ///// Throw Error if Radio Inputs is missing.
                if ( radioInputs.length === 0 ) throw opModuleBasic.opReturnResponse( true, 404, { 
                    message: `Missing Radio Inputs in Step 1!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )

                ///// Debug to the Console Log.
                opModuleBasic.opConsoleDebug( debug, { 
                    message: `${ radioInputs.length } quantity of the Templates was found!`,
                    line: opModuleBasic.errorLine(),
                    details: radioInputs 
                } )

                ///// Get the Template ID from the URL Parameter.
                const templateId = opGetUrlParameters().template

                ///// Set the Template ID Error to True.
                var templateIdError = true

                /////  Run through all Radio Inputs.
                radioInputs.forEach( async radioInput => {

                    ///// Get the Input Element of the Template.
                    let inputElement = radioInput.querySelector( 'input' )
                    
                    ///// Check if the Input Element matches the Template ID.
                    if ( inputElement.value == templateId ) {
                        
                        ///// Set the Template ID Error to False.
                        templateIdError = false

                        ///// Add Checked to the Template.
                        inputElement.checked = true
                        radioInput.classList.add( 'op-radio-input-checked' )

                        ///// Set the Number of Columns in Step 3.
                        const columnValidation = opModuleAdditions.opSetColumnNumber( debug, inputElement.value, fieldset3Element )

                        ///// Validate the Response from the Column Validation.
                        if ( columnValidation.error !== false ) console.warn( 'WARNING:', columnValidation )
                        else {
                     
                            ///// Validate the Form.
                            const formValidation = await opFormInputValidation( debug, 'fieldset', fieldset1Element )

                            ///// Validate the Response from the Form.
                            if ( formValidation.error !== false ) console.warn( 'WARNING:', columnValidation )

                        }

                    }
                    
                    ///// Set Event Listener for the Input Element.
                    opModuleBasic.opListener( 'click', inputElement, async () => {

                        ///// Start the Console Log Group.
                        if ( debug ) console.group( `Event Listener (Click): Input Element - Event Creation Block, ${ functionName }()` )
                        
                        ///// Set the Number of Columns in Step 3.
                        const columnValidation = opModuleAdditions.opSetColumnNumber( debug, inputElement.value, fieldset3Element )

                        ///// Validate the Response from Column Validation.
                        if ( columnValidation.error !== false ) throw columnValidation

                        ///// Validate the Form.
                        const eventFormValidation = await opFormInputValidation( debug, 'fieldset', fieldset1Element )

                        ///// Validate the Response from the Form.
                        if ( eventFormValidation.error !== false ) throw eventFormValidation

                        ///// End the Console Log Group.
                        if ( debug ) console.groupEnd()

                    } )

                } )

                ///// Warn if something is wrong with the Template ID.
                if ( templateId && templateIdError == true ) console.warn( 'WARNING:', 'Something is wrong with the Template ID!' )

            }

        }

        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `No errors were found in Step 1!`, 
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