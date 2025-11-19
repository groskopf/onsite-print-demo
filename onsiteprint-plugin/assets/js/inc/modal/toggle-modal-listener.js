/* ------------------------------------------------------------------------
 #  JS Part Name: Toggle Modal Listener Script
 *  Functions Used to Open and Close the Modal Window.
 ?  Updated: 2025-08-07 - 05:06 (Y:m:d - H:i)
 ?  Info: Added Modal ID.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Modal Toggle Listener

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../basic.js'
import { opChangeModalContent } from './change-modal-content.js'

/* ------------------------------------------------------------------------
 #  2. Function: Modal Toggle Listener
--------------------------------------------------------------------------- */
export function opModalToggleListener( debug, button, state, header, main, id ) {

    try {

        ///// Get Function Name.
        var functionName = opModalToggleListener.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Set Modal Toggle Listener to the Button Element.
        opModuleBasic.opListener( 'click', button, async () => {

            ///// Start the Console Log Group.
            if ( debug ) console.group( `opModalToggleListener( ${ state } )` )

            ///// Get the Modal Element.
            let modal = button.closest( '[class*="op-block"]' ).querySelector( '.op-modal')

            ///// Get Response from the Modal Content.
            const modalContentResponse = opChangeModalContent( debug, modal, state, header, main, id )

            ///// Validate the Response from the Modal Content.
            if ( modalContentResponse.error !== false ) {

                ///// Add Error Class to the Modal.
                modal.classList.add( 'op-error' )

                ///// Open the Modal.
                modal.closest( '.wp-block-post-content' ).classList.add( 'op-modal-active' )

                ///// Console Log if Debug.
                if ( debug ) console.error( 'ERROR:', { 
                    message: `Something went wrong when changing the Modal Content!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName,
                    details: {
                        element: button,
                        state: state
                    }
                } )

            } else {

                ///// Console Log if Debug.
                if ( debug ) console.log( 'SUCCESS:', { 
                    message: `No errors were found in the Modal Toggle Listener!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName,
                    details: {
                        element: button,
                        state: state
                    }
                } )
            }

            ///// End the Console Log Group.
            if ( debug ) console.groupEnd()

        } )

        ///// Console Log Success if Debug.
        if ( debug ) console.log( 'SUCCESS:', { 
            message: `The Modal Toggle Listener is Active!`,
            line: opModuleBasic.errorLine(),
            function: functionName,
            details: {
                element: button,
                state: state
            }
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