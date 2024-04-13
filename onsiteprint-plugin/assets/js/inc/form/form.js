/* ------------------------------------------------------------------------
 #  The OnsitePrint (Form) Script 
 *  Functions to Forms at the Site.
 ?  Updated: 2024-13-04 - 20:25 (Y:m:d - H:i)
 ?  Info: Changed structure in JS block script + added scripts (block & form).
---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../basic.js'

/* ------------------------------------------------------------------------
#  2. Functions of Blocks
--------------------------------------------------------------------------- */
export function updateForm( debug, block ) {

    try {

        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( debug !== true ) debug = false

                
                ///// Get the Block ID.
                let blockId = block.getAttribute( 'id' )

                const blockStorageResponse = opLocalStorage.getBlock( debug, blockId )

                ///// Validate the Response from the Shadow Block.
                if ( blockStorageResponse.code == 200 ) {

                    let shadowBlock = blockStorageResponse.response.details[0]
                    let shadowTime = shadowBlock.lastUpdated
                    let shadowForm = shadowBlock.details.form
                    let snackbar = block.querySelector( '.op-snackbar' )

                    snackbar.querySelector( '.op-snackbar-info b' ).textContent = opModuleBasic.opTimeConverter( shadowTime, 'date-month-year', 'da' )

                    ///// Remove Snackbar if Button is Clicked. 
                    opModuleBasic.opListener( 'click', snackbar.querySelector( '.op-new-template' ), function () {
                        snackbar.remove()
                    } )
                    
                    
                    

                    let buttons = block.querySelectorAll( '.op-form-process__inner button' )

                    if ( shadowForm[0].value !== "" ) {
                        let nameInput = block.querySelector( `#${ blockId }-name-input` )
                        nameInput.value = shadowForm[0].value
                        opFormInputValidation( debug, 'fieldset', nameInput )
                        opFormGoToStep( 'step-2', buttons[1] )
                    }

                    
                }

        ///// Push Debug Details to the Debug.
        debugInfo.push( { 
            message: `Block List`,
            line: opModuleBasic.errorLine(),
            details: blockList 
        } )        

        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `Block with ID: ${ blockID } was found!`, 
            line: opModuleBasic.errorLine(),
            details: block
        } )

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