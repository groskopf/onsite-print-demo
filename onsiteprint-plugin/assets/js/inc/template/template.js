/* ------------------------------------------------------------------------
 #  The OnsitePrint (Template) Script 
 *  Check if multiple Blocks of the Template Creation is on page.
 ?  Updated: 2024-03-31 - 05:27 (Y:m:d - H:i)
 ?  Info: Added Image Approval (Step 3).
---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */

/* ------------------------------------------------------------------------
 #  2. Functions to Template Script
--------------------------------------------------------------------------- */

/* ---------------------------------------------------------
 >  2a. Template Creation (Step 3).
------------------------------------------------------------ */
export function imageApproval( debug, block, approval ) {
    
    let blockId = block.getAttribute( 'id' )
    let fieldsetElement = block.querySelector( '.op-fieldset-step-3' )
    let step = fieldsetElement.querySelector( '.op-fieldset__inner' )
    let imageInput = step.querySelector( `label[for="${ blockId }-image-file-input"]` )
    
    if ( ! approval ) {
        
        if ( imageInput ) imageInput.remove()

        opFormInputValidation()

    } else {
       
        let template = step.querySelector(`#${ blockId }-image-file-template`).content.cloneNode(true)
       
        opSetApprovalToStepInForm( debug, fieldsetElement, 'remove' )

        if ( ! imageInput ) step.append(template)

    }
}