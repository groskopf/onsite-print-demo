/* ------------------------------------------------------------------------
 #  JS Part Name: Step Listeners Script
 *  Functions Used in Step Scripts (Event Creation).
 ?  Updated: 2024-12-13 - 03:51 (Y:m:d - H:i)
 ?  Info: Moved the line containing the Dropdown Template Element to opGridInputListener() from needToBeChanged().
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Grid Input Listener

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../../../assets/js/inc/basic.js'
import * as opModuleAdditions from './steps-additions.js'

/* ------------------------------------------------------------------------
 #  2. Function: Grid Input Listener
--------------------------------------------------------------------------- */
export function opGridInputListener( debug, block ) {

    try {
        
        ///// Get Function Name.
        var functionName = opGridInputListener.name
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Get the Fieldset Element in Step 3.
        let fieldset3Element = block.querySelector( '.op-fieldset-step-3' )
        
        ///// Throw Error if Fieldset is Missing in Step 3.
        if ( ! fieldset3Element ) throw opModuleBasic.opReturnResponse( true, 404, { 
            message: `Missing Fieldset Element in Step 3!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Get the Grid Input Element.
        let gridInput = fieldset3Element.querySelector( '.op-input-grid input' )

        ///// Set Event Listener to the Grid Input Element.
        opModuleBasic.opListener( 'input', gridInput, async () => {

            ///// Start the Console Log Group.
            if ( debug ) console.group( `${ functionName }()` )

            ///// Get Grid Elements in Step 3.
            let gridContainer = fieldset3Element.querySelector( '.op-grid-wrapper' )

            ///// Get the Fieldset Element in Step 4.
            let fieldset4Element = block.querySelector( '.op-fieldset-step-4' )
            
            ///// Throw Error if Fieldset is missing in Step 4.
            if ( ! fieldset4Element ) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Missing Fieldset Element in Step 4!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )

            ///// Get the Approval Filename Field.
            let filenameField = fieldset4Element.querySelector( '.op-approval-field-filename p' )

            ///// Check if the CSV file is Uploaded in thw Input Field.
            if ( gridInput.value ) {

                ///// Get Grid Elements in Step 3.
                let gridContainer = fieldset3Element.querySelector( '.op-grid-wrapper' )

                ///// Set add Grid to Element in Step 3.
                const gridValidation = await opModuleAdditions.opAddGridToElement( debug, gridContainer )

                ///// Validate the Response from the Grid Validation.
                if ( gridValidation.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
                    message: `Something went wrong when Adding the Grid Element!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )

                ///// Get the Block ID.
                let blockId = block.getAttribute( 'id' )

                ///// Get the Dropdown Template Element.
                let template = gridContainer.querySelector(`#${ blockId }-button-dropdown-template`).content.cloneNode(true)

                ///// Check if the Dropdown Template Element it's Found.
                if ( ! template ) console.error( 'ERROR:', { 
                    message: `The Button Dropdown Element was not found!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )
                else {

                    ///// Get the Template Container Element.
                    let templateContainer = gridContainer.querySelector(`.dgxl-exampleButton`)

                    ///// Add the Dropdown Template Element to the Template Container.
                    templateContainer.append( template )


                    //// #NG: needToBeChanged() should be built in here instead of a function! 

                    ///// Update Field in Step 4.
                    let gridInputResponse = await needToBeChanged( debug, block, gridContainer, templateContainer )
                    
                    //// #NG: Snackbar message here if Error!

                    ///// Console Log Group Value.
                    if ( debug ) console.debug( 'DEBUG:', { 'Input Value': gridInputResponse } )

                    //// #2024-12-04 --------------------------


                }

                ///// Show the Grid Element in Step 3.
                gridContainer.classList.add( 'op-grid-active' )

                ///// Update Field in Step 4.
                filenameField.innerHTML = gridInput.files[0].name

            } else {

                ///// Remove the Grid Element in Step 3.
                gridContainer.classList.remove( 'op-grid-active' )
                gridContainer.querySelector( '[id*="-form-grid"]' ).innerHTML = ''
    
                ///// Update Field in Step 4.
                filenameField.innerHTML = "Loading..."
    
            }

            ///// Get the Validation from the Form.
            const formValidation = await opFormInputValidation( false, 'fieldset', fieldset3Element )

            ///// Validate the Response from the Form Validation.
            if ( formValidation.error !== false ) console.warn( 'WARNING:', formValidation )
            else {
                ///// Log Success in the Console when Debugging.
                if ( debug ) console.log( 'SUCCESS:', { 
                    message: `No errors were found in the Grid Input Listener!`,
                    line: opModuleBasic.errorLine(),
                    details: gridInput
                })
            }

            ///// End the Console Log Group.
            if ( debug ) console.groupEnd()
            
        })

        ///// Console Log Success if Debug.
        if ( debug ) console.log( 'SUCCESS:', { 
            message: `The Event Listener is Active!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        })

    } catch( errorResponse ) {

        ///// Create Error Details.
        let errorDetails = ( errorResponse.error == true ) ? errorResponse : opModuleBasic.opReturnResponse( false, 400, { 
            message: errorResponse.message,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Log Error Details in the Console.
        if ( debug ) console.error( 'ERROR:', errorDetails )

    } finally {

        ///// End the Console Log Group.
        if ( debug ) console.groupEnd()

    }

}


export async function needToBeChanged( debug, block, gridContainer, templateContainer ) {

    try {
        
        ///// Get Function Name.
        var functionName = opGridInputListener.name
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `Event Listener (Input): Grid Input Element - Event Creation Block, ${ functionName }()` )

        ///// Get the Block ID.
        let blockId = block.getAttribute( 'id' )
            
        ///// Set Event Listener for the Button Layout Element.
        opModuleBasic.opListener( 'click', templateContainer.querySelector('.op-button-layout'), async () => {

            ///// Start the Console Log Group.
            if ( debug ) console.group( `Event Listener (Click): Button Element - Event Creation Block, ${ functionName }()` )

            ///// Get the Template Elements.
            let templateElement = gridContainer.querySelector(`#${ blockId }-modal-layout-template`)
            let modalTemplate = templateElement.content.cloneNode(true)

            ///// Check if the Modal Element it's Found.
            if ( ! modalTemplate ) console.error( 'ERROR:', { 
                message: `The Modal Element was not found!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )
            else {

                ///// Get the Modal Elements.
                let modalElement = block.querySelector( '.op-modal')
                let modalInnerElement = modalElement.querySelector( '.op-modal__inner')
                
                ///// Clear the Modal Window.
                modalInnerElement.innerHTML = ""

                ///// Add the Template to the Modal Window.
                modalInnerElement.append( modalTemplate )

                ///// Activate the Modal Window.
                modalElement.classList.add( 'op-active' )

                ///// Console Log Success if Debug.
                if ( debug ) console.log( 'SUCCESS:', { 
                    message: `The Modal Element is Active!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                })

            }

            ///// End the Console Log Group.
            if ( debug ) console.groupEnd()

        })

        ///// Set Event Listener for the Button Example Element.
        opModuleBasic.opListener( 'click', templateContainer.querySelector('.op-button-example'), async () => {

            ///// Start the Console Log Group.
            if ( debug ) console.group( `Event Listener (Click): Button Element - Event Creation Block, ${ functionName }()` )

            ///// Get the elements in Step 1.
            let fieldset1Element = block.querySelector( '.op-fieldset-step-1' )
            let templateId = fieldset1Element.querySelector( `.op-form-radio-inputs .op-radio-input input:checked` ).value

            if ( ! templateId ) throw opModuleBasic.opReturnResponse( true, 400, { 
                message: `Missing the Template Id!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )

            ///// Create Print Example and get the Filename.
            const filenameResponse = await opModuleAdditions.createPrintExample( debug, templateId )

            ///// Validate the Filename Response.
            if ( filenameResponse.error !== false ) console.warn( 'WARNING:', 'Could not Create Print Example!' )
            else {

                ///// Get Print Example Filename.
                let filename = filenameResponse.response.details.filename

                ///// Get Print Example PDF.
                const pdfFileResponse = await opModuleAdditions.getPrintExample( debug, filename )
                
                ///// Get Print Example URL.
                let url = URL.createObjectURL( pdfFileResponse.response.details )

                ///// Get the Template Elements.
                let templateElement = gridContainer.querySelector(`#${ blockId }-modal-example-template`)
                let modalTemplate = templateElement.content.cloneNode(true)

                ///// Check if the Modal Element it's Found.
                if ( ! modalTemplate ) console.error( 'ERROR:', { 
                    message: `The Modal Element was not found!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )
                else {

                    ///// Get the Modal Elements.
                    let modalElement = block.querySelector( '.op-modal')
                    let modalInnerElement = modalElement.querySelector( '.op-modal__inner')
                    
                    ///// Clear the Modal Window.
                    modalInnerElement.innerHTML = ""

                    ///// Add the Template to the Modal Window.
                    modalInnerElement.append( modalTemplate )

                    modalElement.querySelector( 'iframe' ).setAttribute( 'src', url )

                    ///// Activate the Modal Window.
                    modalElement.classList.add( 'op-active' )
                    
                    ///// Console Log Success if Debug.
                    if ( debug ) console.log( 'SUCCESS:', { 
                        message: `The Modal Element is Active!`,
                        line: opModuleBasic.errorLine(),
                        function: functionName
                    })    

                }
            }

            ///// End the Console Log Group.
            if ( debug ) console.groupEnd()

        })


    } catch( errorResponse ) {

        ///// Create Error Details.
        let errorDetails = ( errorResponse.error == true ) ? errorResponse : opModuleBasic.opReturnResponse( false, 400, { 
            message: errorResponse.message,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Log Error Details in the Console.
        if ( debug ) console.error( 'ERROR:', errorDetails )

        ///// Return the Error Response.
        return errorDetails

    } finally {

        ///// End the Console Log Group.
        if ( debug ) console.groupEnd()

    }

}