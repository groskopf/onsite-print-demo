/* ------------------------------------------------------------------------
 #  The OnsitePrint (Template Creation) Block Script 
 *  Check if multiple Blocks of the Template Creation is on page.
 ?  Updated: 2024-13-04 - 20:25 (Y:m:d - H:i)
 ?  Info: Changed structure in JS block script + added scripts (block & form).
---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../assets/js/inc/basic.js'

/* ------------------------------------------------------------------------
#  2. Functions of Blocks
--------------------------------------------------------------------------- */
export function opTemplateCreationBlocks( debug ) {
    
    try {
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = true //false       
        if ( debug ) console.group( 'opTemplateCreationBlocks()' )

        ///// Create Variables.
        let blockName = 'Template Creation'

        ///// Get the elements.
        let blocks = document.querySelectorAll( 'section.op-block__template-creation' )

        ///// Debug to the Console Log.
        opModuleBasic.opConsoleDebug( debug, { 
            message: `${ blocks.length } quantity of the ${ blockName } Block was found!`,
            line: opModuleBasic.errorLine(),
            details: blocks 
        } )

        ///// If no Block was found.
        if ( ! blocks || blocks.length === 0 ) {
            
            ///// Return the Response.
            return opModuleBasic.opReturnResponse( false, 404, { 
                message: `Could not find any ${ blockName } Blocks!`, 
                line: opModuleBasic.errorLine()
            } )

        } else {
            
            ///// Get each Block.
            blocks.forEach( block => {


                ///// Get the Block ID.
                let blockId = block.getAttribute( 'id' )

                ///// Push Debug Details to the Debug.
                opModuleBasic.opConsoleDebug( debug, { 
                    message: `A Block with ID: ${ blockId }, was found!`,
                    line: opModuleBasic.errorLine(),
                    details: blocks
                } )


            })
        
        }

    } catch( errorDetails ) {

        ///// Log Error Details in the Console.
        console.error( 'ERROR:', errorDetails )
        
        ///// Return the Error Response.
        return opModuleBasic.opReturnResponse( true, 400, { 
            function: 'opTemplateCreationBlocks', 
            line: opModuleBasic.errorLine(), 
            details: errorDetails.message 
        } )

    } finally {

        ///// End the Console Log Group.
        if ( debug ) console.groupEnd();

    }
    
}