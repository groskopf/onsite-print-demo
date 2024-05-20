/* ------------------------------------------------------------------------
 #  The OnsitePrint (Template Creation) Block Script 
 *  Check if multiple Blocks of the Template Creation is on page.
 ?  Updated: 2024-20-05 - 03:51 (Y:m:d - H:i)
 ?  Info: Changed structure in JS block script.
---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../assets/js/inc/basic.js'
import * as opModuleTemplate from '../../assets/js/inc/template/template.js'

/* ------------------------------------------------------------------------
 #  2. The Function of Template Creation Blocks
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

        ///// Check if some Blocks were found.
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
                if ( debug ) console.group( `Block with ID: ${ blockId }` )

                ///// Add Function to Image Approval (Step 2). 
                opModuleBasic.opListener( 'click', block.querySelector( `.op-fieldset-step-2 #${ blockId }-radio-input-1` ), () => opModuleTemplate.lineApproval( debug, block, '1L' ) )
                opModuleBasic.opListener( 'click', block.querySelector( `.op-fieldset-step-2 #${ blockId }-radio-input-2` ), () => opModuleTemplate.lineApproval( debug, block, '2L' ) )
                opModuleBasic.opListener( 'click', block.querySelector( `.op-fieldset-step-2 #${ blockId }-radio-input-3` ), () => opModuleTemplate.lineApproval( debug, block, '3L' ) )
                opModuleBasic.opListener( 'click', block.querySelector( `.op-fieldset-step-2 #${ blockId }-radio-input-4` ), () => opModuleTemplate.lineApproval( debug, block, '4L' ) )
                opModuleBasic.opListener( 'click', block.querySelector( `.op-fieldset-step-2 #${ blockId }-radio-input-5` ), () => opModuleTemplate.lineApproval( debug, block, '5L' ) )

                ///// Add Function to Image Approval (Step 3). 
                opModuleBasic.opListener( 'click', block.querySelector( `.op-fieldset-step-3 #${ blockId }-radio-image-1` ), () => opModuleTemplate.imageApproval( debug, block, false ) )
                opModuleBasic.opListener( 'click', block.querySelector( `.op-fieldset-step-3 #${ blockId }-radio-image-2` ), () => opModuleTemplate.imageApproval( debug, block, true ) )

                ///// Debug to the Console Log.
                opModuleBasic.opConsoleDebug( debug, { 
                    message: `No errors were found in the Block!`,
                    line: opModuleBasic.errorLine(),
                    details: block 
                } )

                ///// End the Console Log Group.
                if ( debug ) console.groupEnd();

            })
        
        }

    } catch( errorDetails ) {

        ///// Log Error Details in the Console.
        console.error( 'ERROR:', { 
            message: errorDetails.message,
            line: opModuleBasic.errorLine()
        } )
        
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