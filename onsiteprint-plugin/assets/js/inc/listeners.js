/* ------------------------------------------------------------------------
 #  JS Part Name: Listeners Script
 *  Functions with Event Listeners to the OnsitePrint Plugin.
 ?  Updated: 2025-08-07 - 02:52 (Y:m:d - H:i)
 ?  Info: Added new Script and Function, Listeners Script.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Dropdown Toggle Listener

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from './basic.js'

/* ------------------------------------------------------------------------
 #  2. Function: Dropdown Toggle Listener
--------------------------------------------------------------------------- */
export function opDropdownToggleListener( debug, button ) {

    try {

        ///// Get Function Name.
        var functionName = opDropdownToggleListener.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Set Dropdown Toggle Listener to the Dropdown Button.
        opModuleBasic.opListener( 'click', button, async ( event ) => {

            ///// Start the Console Log Group.
            if ( debug ) console.group( `opDropdownToggleListener()` )

            ///// Stop Propagation from the Event Listener.
            event.stopPropagation()
            
            ///// Toggle Class on the Dropdown Menu Element.
            event.target.closest( '.op-dropdown-menu' ).classList.toggle( 'op-active' )

            ///// Console Log Success if Debug.
            if ( debug ) console.log( 'SUCCESS:', { 
                message: `No errors were found in the Dropdown Toggle Listener!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )

            ///// End the Console Log Group.
            if ( debug ) console.groupEnd()

        } )

        ///// Console Log Success if Debug.
        if ( debug ) console.log( 'SUCCESS:', { 
            message: `The Dropdown Toggle Listener is Active!`,
            line: opModuleBasic.errorLine(),
            function: functionName
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