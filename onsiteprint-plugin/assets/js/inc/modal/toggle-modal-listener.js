/* ------------------------------------------------------------------------
 #  JS Part Name: Toggle Modal Listener Script
 *  Functions Used to Open and Close the Modal Window.
 ?  Updated: 2025-07-29 - 03:29 (Y:m:d - H:i)
 ?  Info: Added new Modal Function.
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
export function opModalToggleListener( debug, button, state, modalFunction ) {

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

            try {

                ///// Check if there is a Modal Function.
                if ( modalFunction ) {

                    ///// Get the Modal Response.
                    const modalResponse = await modalFunction

                    ///// Validate the Modal Response.
                    if ( modalResponse.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
                        message: `Something went wrong when in the Modal Function!`,
                        line: opModuleBasic.errorLine(),
                        function: functionName,
                        modalFunction: modalResponse.response.function
                    } )

                    ///// Check the State.
                    if ( state ) {

                        ///// Get the Modal Header and Content.
                        let header = modalResponse.response.details.header
                        let content = modalResponse.response.details.content

                        ///// Check if the Modal Header or Content is missing.
                        if ( ! header || ! content ) throw opModuleBasic.opReturnResponse( true, 404, { 
                            message: `Could not find the Modal Header or Content!`,
                            line: opModuleBasic.errorLine(),
                            function: functionName
                        } )

                        ///// Add the Header and the Content to the Modal.
                        modalHeader.querySelector( '.op-header-content').append( header )
                        modalContent.append( content )

                    }

                }

                ///// Check the State.
                if ( state ) {

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
                } )

            } catch( errorListenerResponse ) {

                ///// Add Error Class to the Modal.
                modalElement.classList.add( 'op-error' )

                ///// Open the Modal.
                container.classList.add( 'op-modal-active' )

                ///// Log Error Details in the Console.
                if ( debug ) console.error( 'ERROR:', errorListenerResponse )

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
        } )

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