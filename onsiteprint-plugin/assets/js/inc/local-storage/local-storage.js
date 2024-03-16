/* ------------------------------------------------------------------------
 #  The OnsitePrint (Local Storage) Script 
 *  Functions to the Local Storage in the Browser.
 ?  Updated: 2024-03-04 - 03:01 (Y:m:d - H:i)
 ?  Info: Changed class name.
---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../basic.js'

/* ------------------------------------------------------------------------
#  2. Functions of Blocks
--------------------------------------------------------------------------- */
export function getBlock( debug, blockID ) {

    try {

        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( debug !== true ) debug = false

        ///// Create Variables.
        var debugInfo = []

        ///// Get Local Storage of Blocks.
        const blockStorage = opGetLocalStorage( debug, 'Blocks' )

        ///// Get the Block List from the Local Storage of Blocks.
        const blockList = blockStorage.response.blockList

        ///// Push Debug Details to the Debug.
        debugInfo.push( { 
            message: `Block List`,
            line: opModuleBasic.errorLine(),
            details: blockList 
        } )        

        ///// Validate the Block List.
        if ( ! blockList || ! blockList[0] ) {
            
            return opModuleBasic.opReturnResponse( false, 404, { 
                message: 'No Storage of Blocks have been created yet!', 
                line: opModuleBasic.errorLine()
            } )

        }

        ///// Get the Block with ID.
        let block = blockList.filter( block => block.blockID == blockID )

        ///// Push Debug Details to the Debug.
        debugInfo.push( { 
            message: `Block with ID: ${ blockID }`,
            line: opModuleBasic.errorLine(),
            details: block 
        } )

        ///// Validate the Block.
        if ( ! block ) {
            
            return opModuleBasic.opReturnResponse( false, 404, { 
                message: 'No Block have been found!', 
                line: opModuleBasic.errorLine()
            } )

        } else {

            return opModuleBasic.opReturnResponse( false, 200, { 
                message: `Block with ID: ${ blockID } was found!`, 
                line: opModuleBasic.errorLine(),
                details: block
            } )
            
        }
        
    } catch( errorDetails ) {

        ///// Log Error Details in the Console.
        console.error( 'ERROR:', errorDetails )
        
        ///// Return the Error Response.
        return opModuleBasic.opReturnResponse( true, 400, { 
            function: 'getBlock', 
            line: opModuleBasic.errorLine(), 
            details: errorDetails.message 
        } )

    } finally {
        
        ///// Log Debug Details in the Console.
        if ( debug == true ) console.debug( 'getBlock:', debugInfo )       

    }
    
}