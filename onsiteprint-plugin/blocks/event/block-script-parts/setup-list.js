/* ------------------------------------------------------------------------
 #  JS Part Name: Setup List
 *  Block functions included in the Parts Script in the Event Block.
 ?  Updated: 2025-04-13 - 04:33 (Y:m:d - H:i)
 ?  Info: Added new Setup List Script.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Setup List

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../assets/js/inc/basic.js'
import * as opModuleEvent from '../../assets/js/inc/event/event.js'

/* ------------------------------------------------------------------------
 #  2. Function: Setup List
 ?  NB: The function is under construction.
--------------------------------------------------------------------------- */
export function opSetupList( debug, block ) {

    try {
        
        ///// Get Function Name.
        var functionName = opSetColumnNumber.name
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Throw Error if the Variables is missing.
        if ( ! templateId || ! fieldset) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Missing the Template ID or the Fieldset Element!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )
        else {

            ///// Get Event ID.
            const eventId = block.getAttribute( 'data-event-id' )

            ///// Validate the Response from the Approval.
            if ( eventId !== false ) throw opModuleBasic.opReturnResponse( false, 404, { 
                message: `Missing the Event ID!`, 
                line: opModuleBasic.errorLine(),
                function: functionName
            } )

        }

        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `The Column Number was set to ${ columnAmount }!`, 
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