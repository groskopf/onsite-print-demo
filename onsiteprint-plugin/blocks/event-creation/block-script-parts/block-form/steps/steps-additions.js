/* ------------------------------------------------------------------------
 #  JS Part Name: Set Column Number Script
 *  Functions included in the Block Form Script (Event Creation).
 ?  Updated: 2024-06-04 - 05:33 (Y:m:d - H:i)
 ?  Info: Changed structure in JS block script (Event Creation Block) + added new files, comments and validation.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	The Function: Set Column Number

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../../../assets/js/inc/basic.js'

/* ------------------------------------------------------------------------
 #  2. The Function of Set Column Number
--------------------------------------------------------------------------- */
export function opSetColumnNumber( debug, templateId, fieldset ) {

    try {
        
        ///// Get Function Name.
        var functionName = opSetColumnNumber.name
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Throw Error if the Variables is missing.
        if (  ! templateId || ! fieldset) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Missing the Template ID or the Fieldset Element!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )
        else {

            ///// Get the Elements.
            let gridContainer = fieldset.querySelector( '.op-grid-wrapper' )

            ///// Get Template Item.
            const templateItem = opGetTemplate( templateId )

            ///// Validate the Response from the Get Template Function.
            if ( templateItem.error !== false ) throw templateItem

            ///// Get the Amount of Columns.
            var columnAmount = templateItem.response.templateLayoutColumns.charAt(0)
            
            ///// Set the Number of Grid Columns to the Grid Container Element.
            gridContainer.setAttribute( 'data-grid-cols', columnAmount )

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