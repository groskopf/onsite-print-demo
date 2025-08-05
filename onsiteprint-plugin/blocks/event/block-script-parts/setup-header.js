/* ------------------------------------------------------------------------
 #  JS Part Name: Setup Header
 *  Block function included in the Event Block.
 ?  Updated: 2025-08-04 - 04:31 (Y:m:d - H:i)
 ?  Info: Changed how the Modal Toggle Listener is used.

---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Setup the Header of the Event

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../assets/js/inc/basic.js'
import { opModalCreateParticipant } from './modals/modal-create-participant.js'
import * as opModuleParticipantListeners from './participant-listeners.js'

/* ------------------------------------------------------------------------
 #  2. Function: Setup the Header of the Event
 ?  NB: The function is under construction.
--------------------------------------------------------------------------- */
export function opSetupHeader( debug, block, eventId, columnAmount ) {

    try {
        
        ///// Get Function Name.
        var functionName = opSetupHeader.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Add Create Participant Modal.
        opModalCreateParticipant( debug, block, eventId )
            
        ///// Get the Button Elements.
        let csvButton = block.querySelector( '.op-button-csv' )

        ///// Set Modal Toggle Listener to the CSV Download Button.
        //opModalToggleListener( debug, csvButton, true, opModuleParticipantListeners.opDownloadCSVFileListener( debug, block, csvButton, eventId ) )

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