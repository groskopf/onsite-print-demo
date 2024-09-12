/* ------------------------------------------------------------------------
 #  JS Part Name: Step 2 Script
 *  Functions included in the Block Form Script (Event Creation).
 ?  Updated: 2024-09-12 - 13:51:m:d - H:i)
 ?  Info: Added Field Update to the Approval Display in Step 4.
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
            
            ///// Get the elements in Step 2.
            let fieldset2Element = block.querySelector( '.op-fieldset-step-2' )
            let eventnameInput = fieldset2Element.querySelector( '.op-input-field input' )

            ///// Get the elements in Step 4.
            let fieldset4Element = block.querySelector( '.op-fieldset-step-4' )
            let eventnameField = fieldset4Element.querySelector( '.op-approval-field-eventname p' )
            
            ///// Throw Error if Fieldset 2 or 4 is missing.
            if ( ! fieldset2Element || ! fieldset4Element ) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Missing one or more Fieldset Elements!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )

            ///// Set Event Listener for the Input Element.
            opModuleBasic.opListener( 'input', eventnameInput, async () => {

                ///// Start the Console Log Group.
                if ( debug ) console.group( `Event Listener (Click): Input Element - Event Creation Block, ${ functionName }()` )
                
                ///// Update Field in Step 4.
                eventnameField.innerHTML = eventnameInput.value

                ///// Console Log Group Value.
                if ( debug ) console.debug( 'DEBUG:', { 'Input Value': eventnameInput.value } )

                ///// End the Console Log Group.
                if ( debug ) console.groupEnd()

            } )

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