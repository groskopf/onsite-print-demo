/* ------------------------------------------------------------------------
 #  JS Part Name: Listeners Script
 *  Functions with Event Listeners to the OnsitePrint Plugin.
 ?  Updated: 2025-12-16 - 01:40 (Y:m:d - H:i)
 ?  Info: Added Redirect Listener Functions.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Toggle Class Listener

    3. 	Function: Redirect Listener

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from './basic.js'

/* ------------------------------------------------------------------------
 #  2. Function: Toggle Class Listener
--------------------------------------------------------------------------- */
export function opToggleClassListener( debug, button, toggleElement, toggleElementType, toggleName ) {

    try {

        ///// Get Function Name.
        var functionName = opToggleClassListener.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Set Dropdown Toggle Listener to the Dropdown Button.
        opModuleBasic.opListener( 'click', button, async ( event ) => {

            ///// Start the Console Log Group.
            if ( debug ) console.group( `opToggleClassListener()` )

            ///// Stop Propagation from the Event Listener.
            event.stopPropagation()

            ///// Set the Toggle Class.
            if ( ! toggleName ) toggleName = 'op-active'

            ///// Set the Target Element.
            let targetElement
            if ( ! toggleElement ) targetElement = event.target.closest( 'section[id*="op-block"]' )
            else if ( typeof toggleElement === 'string' ) {
                if ( toggleElementType == 'id' ) {
                    targetElement = event.target.closest( `[id*="${ toggleElement }"]` )
                } else {
                    targetElement = event.target.closest( `[class*="${ toggleElement }"]` )
                }
            } else {
                targetElement = toggleElement
            }

            ///// Toggle Class on Target Element.
            targetElement.classList.toggle( toggleName )

            ///// Console Log Success if Debug.
            if ( debug ) console.log( 'SUCCESS:', { 
                message: `No errors were found in the Toggle Class Listener!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )

            ///// End the Console Log Group.
            if ( debug ) console.groupEnd()

        } )

        ///// Console Log Success if Debug.
        if ( debug ) console.log( 'SUCCESS:', { 
            message: `The Dropdown Toggle Class Listener is Active!`,
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

/* ------------------------------------------------------------------------
 #  3. Function: Redirect Listener
--------------------------------------------------------------------------- */
export function opRedirectListener( debug, button, newUrl ) {

    try {

        ///// Get Function Name.
        var functionName = opRedirectListener.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Set Dropdown Toggle Listener to the Dropdown Button.
        opModuleBasic.opListener( 'click', button, async ( event ) => {

            ///// Start the Console Log Group.
            if ( debug ) console.group( `opRedirectListener()` )

            ///// Stop Propagation from the Event Listener.
            event.stopPropagation()

            ///// Redirect to the New URL.
            window.location.href = newUrl

            ///// Console Log Success if Debug.
            if ( debug ) console.log( 'SUCCESS:', { 
                message: `No errors were found in the Redirect Listener!`,
                line: opModuleBasic.errorLine(),
                function: functionName,
                details: {
                    button: button,
                    url: newUrl
                }
            } )

            ///// End the Console Log Group.
            if ( debug ) console.groupEnd()

        } )

        ///// Console Log Success if Debug.
        if ( debug ) console.log( 'SUCCESS:', { 
            message: `The Dropdown Redirect Listener is Active!`,
            line: opModuleBasic.errorLine(),
            function: functionName,
            details: { 
                button: button, 
                url: newUrl
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