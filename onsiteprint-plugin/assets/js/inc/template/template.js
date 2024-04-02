/* ------------------------------------------------------------------------
 #  The OnsitePrint (Template) Script 
 *  Check if multiple Blocks of the Template Creation is on page.
 ?  Updated: 2024-04-02 - 09:37 (Y:m:d - H:i)
 ?  Info: Added JS Line Approval to (Step 2).
---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */

/* ------------------------------------------------------------------------
 #  2. Functions to Template Script
--------------------------------------------------------------------------- */

/* ---------------------------------------------------------
 >  2a. Template Creation ( Step 2 ).
------------------------------------------------------------ */
export function lineApproval( debug, block, line ) {
    
    let fieldset4LayoutContainer = block.querySelector( '.op-fieldset-step-4 .op-form-layouts' )
    let radioInputs = fieldset4LayoutContainer.querySelectorAll( '.op-radio-input' )
    
    radioInputs.forEach( radioInput => {
        radioInput.querySelector( 'input[type="radio"]' ).checked = false
    })

    fieldset4LayoutContainer.setAttribute( 'data-layout-lines', line )

    opFormInputValidation()

}

/* ---------------------------------------------------------
 >  2b. Template Creation ( Step 3 ).
------------------------------------------------------------ */
export function imageApproval( debug, block, approval ) {
    
    let blockId = block.getAttribute( 'id' )
    let fieldset3Element = block.querySelector( '.op-fieldset-step-3' )
    let step = fieldset3Element.querySelector( '.op-fieldset__inner' )
    let imageInput = step.querySelector( `label[for="${ blockId }-image-file-input"]` )
    let fieldset4LayoutContainer = block.querySelector( '.op-fieldset-step-4 .op-form-layouts' )
    let radioInputs = fieldset4LayoutContainer.querySelectorAll( '.op-radio-input' )
    
    radioInputs.forEach( radioInput => {
        radioInput.querySelector( 'input[type="radio"]' ).checked = false
    })

    if ( ! approval ) {
        
        if ( imageInput ) imageInput.remove()

        fieldset4LayoutContainer.setAttribute( 'data-layout-image', 0 )
    
        opFormInputValidation()

    } else {
       
        let template = step.querySelector(`#${ blockId }-image-file-template`).content.cloneNode(true)
       
        opSetApprovalToStepInForm( debug, fieldset3Element, 'remove' )

        fieldset4LayoutContainer.setAttribute( 'data-layout-image', 1 )

        if ( ! imageInput ) step.append( template )       

    }

}