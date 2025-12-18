/* ------------------------------------------------------------------------
 #  JS Part Name: Setup Header
 *  Block function included in the Event Block.
 ?  Updated: 2025-09-18 - 05:02 (Y:m:d - H:i)
 ?  Info: Added new Search Filter Dropdown.

---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Setup the Header of the Event

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../assets/js/inc/basic.js'
import * as opModuleListeners from '../../../assets/js/inc/listeners.js'
import { opModalToggleListener } from '../../../assets/js/inc/modal/toggle-modal-listener.js'
import { opModalCreateParticipant } from './modals/modal-create-participant.js'

/* ------------------------------------------------------------------------
 #  2. Function: Setup the Header of the Event
 ?  NB: The function is under construction.
--------------------------------------------------------------------------- */
export function opSetupHeader( debug, block, eventId ) {

    try {
        
        ///// Get Function Name.
        var functionName = opSetupHeader.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Get the Search Elements.
        let opSearchContainer = block.querySelector( '.op-search-filter' )
        let filterButton = opSearchContainer.querySelector( '.op-button-search-filter' )

        ///// Set Toggle Class Listener to the Search Filter Dropdown Button.
        opModuleListeners.opToggleClassListener( debug, filterButton, 'op-search-filter__inner' )

        ///// Set Redirect Listener to each Limit Option.
        opSearchContainer.querySelectorAll( '.op-filter-input-label' ).forEach( optionElement => {

            ///// Get the Option Value.
            let optionValue = optionElement.querySelector( '[name="op-filter-input"]' ).value

            ///// Create the New URL with the new Filter Parameter.
            let urlParams = new URLSearchParams( window.location.search )
            urlParams.set( 'filter', optionValue )
            let newUrl = window.location.pathname + '?' + urlParams.toString()

            ///// Set the Redirect Listener.
            opModuleListeners.opRedirectListener( debug, optionElement, newUrl )

        } )

        ///// Get the Button Elements.
        let dropdownButton = block.querySelector( '.op-button-shortcuts' )
        let cancelButton = block.querySelector( '.op-cancel_error' )
        let downloadButton = block.querySelector( '.op-button[name="download"]' )

        ///// Set Toggle Class Listener to the Dropdown Button.
        opModuleListeners.opToggleClassListener( debug, dropdownButton, 'op-dropdown-menu' )

        ///// Set Modal Toggle Listener to the Cancel Error Button.
        opModalToggleListener( debug, cancelButton, false )

        ///// Add Create Participant Modal.
        opModalCreateParticipant( debug, block, eventId )



        let modalTemplateElement = block.querySelector( `[id$="-download-files-template"]` )
        let modal = modalTemplateElement.content.cloneNode(true)
        let modalHeader = modal.querySelector( '.op-header-content__inner' )
        let modalMain = modal.querySelector( '.op-modal-content__inner' )
        let modalId = modalTemplateElement.getAttribute( 'id' ).replace("op-block", "op-modal").slice(0, -9)
        let closeButton = modal.querySelector( '.op-cancel_download-files' )

        ///// Set Modal Toggle Listener to the Close Button.
        opModalToggleListener( debug, closeButton, false )

        ///// Set Modal Toggle Listener to the Download Button.
        opModalToggleListener( debug, downloadButton, true, modalHeader, modalMain, modalId )


    
        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `The Setup of the Header was correctly Executed!`, 
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