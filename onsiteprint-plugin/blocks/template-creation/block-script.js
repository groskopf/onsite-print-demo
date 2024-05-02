/* ------------------------------------------------------------------------
 #  The OnsitePrint (Template Creation) Block Script 
 *  Check if multiple Blocks of the Template Creation is on page.
 ?  Updated: 2024-04-13 - 21:25 (Y:m:d - H:i)
 ?  Info: Changed atr[data-layout-lines].
---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../assets/js/inc/basic.js'
import * as opModuleTemplate from '../../assets/js/inc/template/template.js'

/* ------------------------------------------------------------------------
#  2. Functions of Blocks
--------------------------------------------------------------------------- */
export function opTemplateCreationBlocks( debug ) {

    ///// Create Variables.
    let error, code, message, blockCount = 0

    try {

        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( ! debug ) debug = false

        ///// Get the elements.
        let blockName = 'Template Creation'
        let blocks = document.querySelectorAll( 'section.op-block__template-creation' )

        ///// Throw an Error if no Block was found.
        if ( ! blocks || blocks.length === 0 ) throw `Could not find any ${ blockName } Blocks!` 
        else {
            
            ///// Get each Block.
            blocks.forEach( async block => {
                
                ///// Count the Blocks. 
                ++blockCount

                ///// Get the elements.
                let blockId = block.getAttribute( 'id' )
                opConsoleDebug( debug, 'blockId:', blockId )

                ///// Get Booking Item.
                const bookingItem = opGetBookingFromSession( debug )
                opConsoleDebug( debug, 'bookingItem:', bookingItem )


                ///// Add Function to Image Approval (Step 2). 
                opModuleBasic.opListener( 'click', block.querySelector( `.op-fieldset-step-2 #${ blockId }-radio-input-1` ), () => opModuleTemplate.lineApproval( debug, block, '1L' ) )
                opModuleBasic.opListener( 'click', block.querySelector( `.op-fieldset-step-2 #${ blockId }-radio-input-2` ), () => opModuleTemplate.lineApproval( debug, block, '2L' ) )
                opModuleBasic.opListener( 'click', block.querySelector( `.op-fieldset-step-2 #${ blockId }-radio-input-3` ), () => opModuleTemplate.lineApproval( debug, block, '3L' ) )
                opModuleBasic.opListener( 'click', block.querySelector( `.op-fieldset-step-2 #${ blockId }-radio-input-4` ), () => opModuleTemplate.lineApproval( debug, block, '4L' ) )
                opModuleBasic.opListener( 'click', block.querySelector( `.op-fieldset-step-2 #${ blockId }-radio-input-5` ), () => opModuleTemplate.lineApproval( debug, block, '5L' ) )

                ///// Add Function to Image Approval (Step 3). 
                opModuleBasic.opListener( 'click', block.querySelector( `.op-fieldset-step-3 #${ blockId }-radio-image-1` ), () => opModuleTemplate.imageApproval( debug, block, false ) )
                opModuleBasic.opListener( 'click', block.querySelector( `.op-fieldset-step-3 #${ blockId }-radio-image-2` ), () => opModuleTemplate.imageApproval( debug, block, true ) )

            })

            ///// Create Response.
            error = false, code = 200, message = `${ blockCount } quantity of the ${ blockName } Block was found!`
        
        }

    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, code = 400, message = errorMessage

        ///// Throw Error Response in the Console.
        //console.error( `opEventBlocks()`, opModuleBasic.opReturnResponse( error, code, errorMessage ) )

    } finally {

        ///// Return the Response to the Function.
        return opModuleBasic.opReturnResponse( error, code, message )

    }
    
}