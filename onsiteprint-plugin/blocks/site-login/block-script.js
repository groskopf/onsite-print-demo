
console.log('It works with scripts in block.json!', 'site-login')

/* ------------------------------------------------------------------------
#  Template Creation Block Script
?  Updated: 2022-12-26 - 16:43 (Y:m:d - H:i)
--------------------------------------------------------------------------- */

/* ------------------------------------------
 >   >  6a-7. Go To Step in Form 
--------------------------------------------- */
/* function opFormGoToStep( newStep ) {

    ///// Get the elements.
    let block = event.target.closest( 'section[id*="op-block"]' )
    let form = block.querySelector( '.op-form-steps' )
    let allSteps = form.getAttribute( 'data-form-steps' )
    let currentStep = form.getAttribute( 'data-form-step' ) 

    if ( newStep.includes( 'step-') ) {
        newStep = newStep.slice(5)
    } else if ( newStep == 'next' ) {
        newStep = ++currentStep
    } else if ( newStep == 'back' ) {
        newStep = currentStep-1
    }

    if ( newStep >= 1 && newStep <= allSteps ) {

        let slide = newStep - 1
    
        let fieldset = form.querySelectorAll( 'fieldset' )
        let processButtons = form.querySelectorAll( '.op-form-process__inner button' )
        
        for( let i = 0; i < processButtons.length; ++i ) {
            processButtons[i].blur()

            if ( i !== slide ) {
                processButtons[i].setAttribute( 'data-color', 'secondary-20' )                
            } else {
                processButtons[i].setAttribute( 'data-color', 'secondary-60' )
            }        
        }

        for( let i = 0; i < fieldset.length; ++i ) {
            fieldset[i].style.opacity = '0'
            
            if ( i == slide ) {
                fieldset[i].style.left = `${ 0 }%`
                fieldset[i].style.opacity = '1'
                fieldset[i].focus()
            } else if ( i <= slide ) {
                fieldset[i].style.left = `${ -100 }%`
            } else if ( i >= slide ) {
                fieldset[i].style.left = `${ 100 }%`
            }           
        }

        form.setAttribute( 'data-form-step', newStep )
    
        if ( newStep == allSteps ) {
            form.setAttribute( 'data-form-step-last', true )
        } else {
            form.setAttribute( 'data-form-step-last', false )
        }
        
    }
}
 */