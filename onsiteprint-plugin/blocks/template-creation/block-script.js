/* ------------------------------------------------------------------------
 #  The OnsitePrint (Template Creation) Block Script 
 *  Check if multiple Blocks of the Template Creation is on page.
 ?  Updated: 2024-03-04 - 00:47 (Y:m:d - H:i)
 ?  Info: Changed class name.
---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../assets/js/inc/basic.js'
import * as opLocalStorage from '../../assets/js/inc/local-storage/local-storage.js'

/* ------------------------------------------------------------------------
#  2. Functions of Blocks
--------------------------------------------------------------------------- */
export function opTemplateCreationBlocks( debug ) {
    
    try {

        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( debug !== true ) debug = false

        ///// Create Variables.
        var debugInfo = []

        ///// Get the elements.
        let blockName = 'Template Creation'
        let blocks = document.querySelectorAll( 'section.op-block__template-creation' )

        ///// Push Debug Details to the Debug.
        debugInfo.push( { 
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

                const shadowBlock = opLocalStorage.getBlock( debug, blockId )

                console.log(shadowBlock)

                ///// Validate the Response from the Shadow Block.
                if ( shadowBlock.code == 200 ) {
                    
                    let form = shadowBlock.response.details[0].details.form
                    let buttons = block.querySelectorAll( '.op-form-process__inner button' )

                    if ( form[0].value !== "" ) {
                        let nameInput = block.querySelector( `#${ blockId }-name-input` )
                        nameInput.value = form[0].value
                        opFormInputValidation( debug, 'fieldset', nameInput )
                        opFormGoToStep( 'step-2', buttons[1] )
                    }

                    
                }
                
                
                
                /* ///// Add Function to Modal Window. 
                opModuleBasic.opListener( 'click', block.querySelector( '.op-modal .op-button-save' ), function() {
                    opAddNewParticipantToEventList( debug, eventId )
                    //opModuleEvent.opAddNewParticipantToEvent( debug, eventId )
                } ) */


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
        
        ///// Log Debug Details in the Console.
        if ( debug == true ) console.debug( 'DEBUG:', debugInfo )       

    }
    
}