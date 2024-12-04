/* ------------------------------------------------------------------------
 #  JS Part Name: Step 3 Script
 *  Functions included in the Block Form Script (Event Creation).
 ?  Updated: 2024-12-04 - 06:00 (Y:m:d - H:i)
 ?  Info: Moved Event Listener (opGridInputListener) to Step Listeners.
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
           
            ///// Set Event Listener to the Grid Input Element.
            opModuleListeners.opGridInputListener( debug, block )

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