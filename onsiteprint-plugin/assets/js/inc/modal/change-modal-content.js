/* ------------------------------------------------------------------------
 #  JS Part Name: Change Modal Content Script
 *  Functions Used to Open and Close the Modal Window.
 ?  Updated: 2025-08-04 - 03:48 (Y:m:d - H:i)
 ?  Info: Added new Script, Change Modal Content.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Change Modal Content

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../basic.js'

/* ------------------------------------------------------------------------
 #  2. Function: Change Modal Content
--------------------------------------------------------------------------- */
export function opChangeModalContent( debug, modalElement, state, header, main ) {

    try {

        ///// Get Function Name.
        var functionName = opChangeModalContent.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Get the Elements.
        let container = modalElement.closest( '.wp-block-post-content' )
        let modalHeader = modalElement.querySelector( '.op-header-content')
        let modalMain = modalElement.querySelector( '.op-modal-content')

        ///// If the State is True (Open) or False (Close).
        if ( state ) {

            ///// Check if the Header or the Main is missing.
            if ( ! header || ! main ){

                ///// Add Error Class to the Modal.
                modalElement.classList.add( 'op-error' )

                ///// Open the Modal.
                container.classList.add( 'op-modal-active' )

                ///// Throw Error if the Header or the Main is missing.
                throw opModuleBasic.opReturnResponse( true, 404, { 
                    message: `Could not find the Header or the Main!`, 
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )

            } else {

                ///// Add the Header and the Main to the Modal.
                modalHeader.append( header )
                modalMain.append( main )

                ///// Open the Modal.
                container.classList.add( 'op-modal-active' )
            }

        } else {

            ///// Remove the Header and the Main from the Modal.
            modalHeader.innerHTML = ''
            modalMain.innerHTML = ''

            ///// Close the Modal by removing Classes.
            container.classList.remove( 'op-modal-active' )
            modalElement.classList.remove( 'op-error' )

        }

        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `The Modal Content was Changed!`,
            line: opModuleBasic.errorLine(),
            function: functionName,
            details: {
                element: modalElement,
                state: state
            }
        }, debug )

    } catch( errorResponse ) {

        ///// Create Error Details.
        let errorDetails = ( errorResponse.error == true ) ? errorResponse : opModuleBasic.opReturnResponse( true, 400, { 
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