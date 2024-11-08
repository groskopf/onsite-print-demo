/* ------------------------------------------------------------------------
 #  JS Part Name: Step 3 Script
 *  Functions included in the Block Form Script (Event Creation).
 ?  Updated: 2024-11-08 - 05:24 (Y:m:d - H:i)
 ?  Info: Moved Function | Step 3.
---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../../../assets/js/inc/basic.js'
import * as opModuleListeners from './steps-listeners.js'

/* ------------------------------------------------------------------------
 #  2. The Function of Step 3
--------------------------------------------------------------------------- */
export function opStep3( debug, block ) {

    try {

        ///// Get Function Name.
        var functionName = opStep3.name

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
           
            ///// Get the Fieldset Element in Step 3.
            let fieldset3Element = block.querySelector( '.op-fieldset-step-3' )
            
            ///// Throw Error if Fieldset is Missing in Step 3.
            if ( ! fieldset3Element ) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Missing Fieldset Element in Step 3!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )

            ///// Get the Grid Input Element.
            let gridInput = fieldset3Element.querySelector( '.op-input-grid input' )

            ///// Set Event Listener to the Grid Input Element.
            opModuleBasic.opListener( 'input', gridInput, async () => {

                ///// Start the Console Log Group.
                if ( debug ) console.group( `Event Listener (Input): Grid Input Element - Event Creation Block, ${ functionName }()` )

                ///// Update Field in Step 4.
                let gridInputResponse = await opModuleListeners.opGridInputListener( debug, block, fieldset3Element, gridInput )

                ///// Console Log Group Value.
                if ( debug ) console.debug( 'DEBUG:', { 'Input Value': gridInputResponse } )

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