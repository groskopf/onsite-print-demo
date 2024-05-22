/* ------------------------------------------------------------------------
 #  The OnsitePrint (Template Creation) Block Script 
 *  Check if multiple Blocks of the Template Creation is on page.
 ?  Updated: 2024-05-22 - 21:37 (Y:m:d - H:i)
 ?  Info: Changed structure in JS block script + added new files, comments and validation.
---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../assets/js/inc/basic.js'
import * as opModuleBlockForm from './block-script-parts/block-form/block-form.js'

/* ------------------------------------------------------------------------
 #  2. The Function of Template Creation Blocks
--------------------------------------------------------------------------- */
export function opTemplateCreationBlocks( debug ) {
    
    try {
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false       
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

                ///// Run the Step 2 Function.
                const step2 = opModuleBlockForm.opStep2( debug, block )

                ///// Validate the Response from the Approval.
                if ( step2.error !== false ) throw step2.response

                ///// Run the Step 3 Function.
                const step3 = opModuleBlockForm.opStep3( debug, block )

                ///// Validate the Response from the Approval.
                if ( step3.error !== false ) throw step3.response

                ///// Debug to the Console Log.
                opModuleBasic.opConsoleDebug( debug, { 
                    message: `No errors were found in the Block!`,
                    line: opModuleBasic.errorLine(),
                    details: block 
                } )

                ///// End the Console Log Group.
                if ( debug ) console.groupEnd()

            })

        }

        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `No errors were found in the Template Creation Function!`, 
            line: opModuleBasic.errorLine()
        } )        

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
        if ( debug ) console.groupEnd()

    }
    
}