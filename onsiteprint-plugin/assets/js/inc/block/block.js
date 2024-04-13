/* ------------------------------------------------------------------------
 #  The OnsitePrint (Block) Script 
 *  Functions to Blocks at the Site.
 ?  Updated: 2024-13-04 - 20:25 (Y:m:d - H:i)
 ?  Info: Changed structure in JS block script + added scripts (block & form).
---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../basic.js'
import * as opModuleForm from '../form/form.js'

/* ------------------------------------------------------------------------
 #  2. Functions
--------------------------------------------------------------------------- */
export function updateBlock( debug, block ) {

    try {

        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( debug !== true ) debug = false
       
        ///// Create Variables.
        var debugInfo = []

        ///// Get the Block ID.
        let blockId = block.getAttribute( 'id' )
        
        ///// Check if the Block contains a Form.
        let form = block.querySelector( `#${ blockId }__form` )
        if ( block.contains( form ) ) {

            ///// Update Form.
            //opModuleForm.updateForm( debug, block, form )

            ///// Push Debug Details to the Debug.
            debugInfo.push( { 
                message: `Block(${ blockId }) contains a Form.`,
                line: opModuleBasic.errorLine(),
                details: form 
            } )

        }

        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `The Block with ID: ${ blockId }, was Updated!`, 
            line: opModuleBasic.errorLine(),
            details: block
        } )

    } catch( errorDetails ) {

        ///// Log Error Details in the Console.
        console.error( 'ERROR:', errorDetails )
        
        ///// Return the Error Response.
        return opModuleBasic.opReturnResponse( true, 400, { 
            function: 'updateBlock', 
            line: opModuleBasic.errorLine(), 
            details: errorDetails.message 
        } )

    } finally {
        
        ///// Log Debug Details in the Console.
        if ( debug == true ) console.debug( 'updateBlock:', debugInfo )       

    }
    
}