/* ------------------------------------------------------------------------
 #  JS Part Name: Setup Header
 *  Block function included in the Event Block.
 ?  Updated: 2025-12-19 - 04:24 (Y:m:d - H:i)
 ?  Info: !dded new Search for Participant Listener.
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
import { opParticipantSearchListener } from './participant-listeners.js'

/* ------------------------------------------------------------------------
 #  2. Function: Setup the Header of the Event
 ?  NB: The function is under construction.
--------------------------------------------------------------------------- */
export function opSetupHeader( debug, block, eventId, fieldsAmount ) {

    try {
        
        ///// Get Function Name.
        var functionName = opSetupHeader.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Get the Search Elements.
        let opSearchContainer = block.querySelector( '.op-search-form' )
        let submitButton = opSearchContainer.querySelector( '.op-button-submit-search' )
        let clearButton = opSearchContainer.querySelector( '.op-button-clear-search' )
        let opFilterInputLabels = opSearchContainer.querySelectorAll( '.op-filter-input-label' )
        let filterButton = opSearchContainer.querySelector( '.op-button-search-filter' )

        ///// Set the Redirect Listener to the Search Button.
        opParticipantSearchListener( debug, submitButton, opSearchContainer.querySelector( '[name="op-search-input"]' ) )

        ///// Create the New URL for the Clear Search Button.
        let clearUrlParams = new URLSearchParams( window.location.search )
        clearUrlParams.delete( 'query' )
        let newClearUrl = window.location.pathname + '?' + clearUrlParams.toString()

        ///// Set the Redirect Listener to the Clear Search Button.
        opModuleListeners.opRedirectListener( debug, clearButton, newClearUrl )

        ///// Set Toggle Class Listener to the Search Filter Dropdown Button.
        opModuleListeners.opToggleClassListener( debug, filterButton, 'op-search-filter__inner' )

        ///// Set the First Filter Option (all) as Checked if there are more than 1 Field.
        if ( fieldsAmount > 1 ) {
            for ( let i = 0; i < opFilterInputLabels.length; i++ ) {

                ///// Get the Filter Input Element.
                let filterInput = opFilterInputLabels[i].querySelector( '[name="op-filter-input"]' )

                ///// Set the First Filter Option as Checked.
                if ( i === 0 ) {
                    filterInput.checked = true
                } else {
                    filterInput.checked = false
                    filterInput.removeAttribute( 'checked' )
                }

            }
        }

        ///// Set Redirect Listener to each Filter Option.
        opFilterInputLabels.forEach( optionElement => {

            ///// Get the Filter Input Elements.
            let filterInput = optionElement.querySelector( '[name="op-filter-input"]' )
            let filterText = optionElement.querySelector( '.op-text' ).innerText

            ///// Change the Filter Button Title.
            if ( filterInput.checked ) {
                filterButton.querySelector( '.op-button-title' ).innerText = filterText
            }

            ///// Get the Option Value.
            let optionValue = filterInput.value

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

        ///// Get the Modal Template Element and Create the Modal.
        let modalTemplateElement = block.querySelector( `[id$="-download-files-template"]` )
        let modal = modalTemplateElement.content.cloneNode(true)
        let modalHeader = modal.querySelector( '.op-header-content__inner' )
        let modalMain = modal.querySelector( '.op-modal-content__inner' )
        let modalId = modalTemplateElement.getAttribute( 'id' ).replace( 'op-block', 'op-modal' ).slice( 0, -9 )
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