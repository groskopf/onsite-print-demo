/* ------------------------------------------------------------------------
 #  JS Part Name: Setup Footer
 *  Block function included in the Event Block.
 ?  Updated: 2025-12-18 - 01:02 (Y:m:d - H:i)
 ?  Info: Added if no Participants were found message.

---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Setup the Footer of the Event

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../assets/js/inc/basic.js'
import * as opModuleListeners from '../../../assets/js/inc/listeners.js'

/* ------------------------------------------------------------------------
 #  2. Function: Setup the Footer of the Event
 ?  NB: The function is under construction.
--------------------------------------------------------------------------- */
export function opSetupFooter(debug, block, startIndex, endIndex, totalParticipants, currentPage, totalPages ) {

    try {
        
        ///// Get Function Name.
        var functionName = opSetupFooter.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Get the Limit Elements.
        let opLimitContainer = block.querySelector( '.op-limit-filter' )
        let dropdownButton = opLimitContainer.querySelector( '.op-button-limit-filter' )

        ///// Set Toggle Class Listener to the Limit Filter Dropdown Button.
        opModuleListeners.opToggleClassListener( debug, dropdownButton, 'op-limit-filter' )

        ///// Set Redirect Listener to each Limit Option.
        opLimitContainer.querySelectorAll('.op-limit-input-label').forEach( optionElement => {

            ///// Get the Option Value.
            let optionValue = optionElement.querySelector( '[name="op-limit-input"]' ).value

            ///// Create the New URL with the new Limit Parameter.
            let urlParams = new URLSearchParams( window.location.search )
            urlParams.set( 'pg', '1' )
            urlParams.set( 'limit', optionValue )
            let newUrl = window.location.pathname + '?' + urlParams.toString()

            ///// Set the Redirect Listener.
            opModuleListeners.opRedirectListener( debug, optionElement, newUrl )

        } )


        ///// Get the Index Element and Update it's Content.
        let indexElement = block.querySelector('.op-participant-index')

        ///// If there are No Participants.
        if ( totalParticipants === 0 ) {

            ///// Update the Index Content if there are no Participants.
            indexElement.querySelector( '.op-index-empty' ).classList.add( 'op-active' )

        } else {

            ///// Update the Index Content.
            indexElement.querySelector( '.op-index-start' ).textContent = Number( startIndex + 1 )
            indexElement.querySelector( '.op-index-end' ).textContent = Number( endIndex )
            indexElement.querySelector( '.op-index-amount' ).textContent = Number( totalParticipants )
            indexElement.querySelector( '.op-index-text' ).classList.add( 'op-active' )

            ///// Setup the Previous Page Button.
            if ( currentPage !== 1 ) {
                let previousPageButton = block.querySelector( '.op-button-page-previous' )
                previousPageButton.classList.remove( 'op-disabled' )
                previousPageButton.removeAttribute( 'disabled' )
                let urlParams = new URLSearchParams( window.location.search )
                urlParams.set( 'pg', String( currentPage - 1 ) )
                let newUrl = window.location.pathname + '?' + urlParams.toString()
                opModuleListeners.opRedirectListener( debug, previousPageButton, newUrl )
            }

            ///// Setup the Next Page Button.
            if ( currentPage !== totalPages ) {
                let nextPageButton = block.querySelector( '.op-button-page-next' )
                nextPageButton.classList.remove( 'op-disabled' )
                nextPageButton.removeAttribute( 'disabled' )
                let urlParams = new URLSearchParams( window.location.search )
                urlParams.set( 'pg', String( currentPage + 1 ) )
                let newUrl = window.location.pathname + '?' + urlParams.toString()
                opModuleListeners.opRedirectListener( debug, nextPageButton, newUrl )
            }

        }

        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `The Setup of the Footer was correctly Executed!`, 
            line: opModuleBasic.errorLine(),
            function: functionName
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