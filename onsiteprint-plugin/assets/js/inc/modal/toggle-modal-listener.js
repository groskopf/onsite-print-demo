/* ------------------------------------------------------------------------
 #  JS Part Name: Toggle Modal Listener Script
 *  Functions Used to Open and Close the Modal Window.
 ?  Updated: 2025-07-08 - 20:14 (Y:m:d - H:i)
 ?  Info: Added new Script, Toggle Modal Listener.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Modal Toggle Listener

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../basic.js'

/* ------------------------------------------------------------------------
 #  2. Function: Modal Toggle Listener
--------------------------------------------------------------------------- */
export function opModalToggleListener( debug, button, state, header, content ) {

    try {

        ///// Get Function Name.
        var functionName = opModalToggleListener.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Set Modal Toggle Listener to the Button Element.
        opModuleBasic.opListener( 'click', button, async ( event ) => {

            ///// Start the Console Log Group.
            if ( debug ) console.group( `opModalToggleListener( ${ state } )` )

            ///// Get the Elements.
            let container = event.target.closest( '.wp-block-post-content' )
            let modalElement = container.querySelector( '.op-modal')
            let modalHeader = modalElement.querySelector( '.op-modal-header')
            let modalContent = modalElement.querySelector( '.op-modal-content')

            ///// If the State is True (Open) or False (Close).
            if ( state ) {

                ///// Check if the Header or the Content is missing.
                if ( ! header || ! content ){

                    ///// Add Error Class to the Modal.
                    modalElement.classList.add( 'op-error' )

                } else {

                    ///// Add the Header and the Content to the Modal.
                    modalHeader.querySelector( '.op-header-content').append( header )
                    modalContent.append( content )

                }

                ///// Open the Modal.
                container.classList.add( 'op-modal-active' )

            } else {

                ///// Remove the Header and the Content from the Modal.
                modalHeader.querySelector( '.op-header-content').innerHTML = ''
                modalContent.innerHTML = ''

                ///// Close the Modal.
                container.classList.remove( 'op-modal-active' )

            }

            ///// Console Log Success if Debug.
            if ( debug ) console.log( 'SUCCESS:', { 
                message: `No errors were found in the Modal Toggle Listener!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            })

            ///// End the Console Log Group.
            if ( debug ) console.groupEnd()

        })

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