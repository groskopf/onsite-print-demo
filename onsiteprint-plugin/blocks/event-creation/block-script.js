/* ------------------------------------------------------------------------
 #  The OnsitePrint (Event Creation) Block Script 
 *  Check if multiple Blocks of the Event Creation is on page.
 ?  Updated: 2024-06-04 - 05:33 (Y:m:d - H:i)
 ?  Info: Changed structure in JS block script (Event Creation Block) + added new files, comments and validation.
---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../assets/js/inc/basic.js'
import * as opModuleBlockForm from './block-script-parts/block-form/block-form.js'

/* ------------------------------------------------------------------------
 #  2. The Function of Event Creation Blocks
--------------------------------------------------------------------------- */
export function opEventCreationBlocks( debug ) {

    try {
        
        ///// Get Function Name.
        var functionName = opEventCreationBlocks.name
    
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = true       
        if ( debug ) console.group( `${ functionName }()` )

        ///// Create Variables.
        let blockName = 'Event Creation'

        ///// Get the elements.
        let blocks = document.querySelectorAll( 'section.op-block__event-creation' )

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
                line: opModuleBasic.errorLine(),
                function: functionName
            } )

        } else {
            
            ///// Get each Block.
            blocks.forEach( block => {

                ///// Start the Console Log Group.
                if ( debug ) console.group( `Block with ID: ${ block.getAttribute( 'id' ) }` )

                ///// Run the Step 1 Function.
                const step1 = opModuleBlockForm.opStep1( debug, block )

                ///// Validate the Response from the Approval.
                if ( step1.error !== false ) throw step1

                ///// Run the Step 3 Function.
                const step3 = opModuleBlockForm.opStep3( debug, block )

                ///// Validate the Response from the Approval.
                if ( step3.error !== false ) throw step3

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
            message: `No errors were found in the ${ blockName } Function!`, 
            line: opModuleBasic.errorLine()
        }, debug )        

    } catch( errorResponse ) {

        ///// Create Error Details.
        let errorDetails = ( errorResponse.error == true ) ? errorResponse : opModuleBasic.opReturnResponse( false, 400, { 
            message: errorResponse.message,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Log Error Details in the Console.
        if ( debug ) console.error( 'ERROR:', { 
            function: functionName,
            message: `Something went wrong in the function!`, 
            details: errorDetails
        } )

        ///// Return the Error Response.
        return opModuleBasic.opReturnResponse( true, 400, { 
            function: functionName,
            message: `Something went wrong in the function!`, 
            details: errorDetails
        } )

    } finally {

        ///// End the Console Log Group.
        if ( debug ) console.groupEnd()

    }
    
}