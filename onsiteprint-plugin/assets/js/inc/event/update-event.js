/* ------------------------------------------------------------------------
 #  JS Part Name: Update Event
 *  Updating the Event in the Local Storage.
 ?  Updated: 2025-06-18 - 05:01 (Y:m:d - H:i)
 ?  Info: Added new Update Event Script with Function.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

    1. 	Import Functions from Scripts

    2. 	Function: Update the Event in the Local Storage.

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../basic.js'
import { opGetLocalStorageData } from '../api/get-local-storage-data.js'

/* ------------------------------------------------------------------------
 #  2. Function: Update the Event in the Local Storage.
--------------------------------------------------------------------------- */
export async function opUpdateEvent( debug, updatedEvent ) {

    try {

        ///// Get Function Name.
        var functionName = opUpdateEvent.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Get Local Storage Data.
        const localStorageData = opGetLocalStorageData( debug, 'EVENTS' )
        
        ///// Validate the Response from the Local Storage Data.
        if ( localStorageData.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
            message: `Something went wrong getting the Local Storage Data!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Get the Events in the Local Storage Response.
        const eventStorage = localStorageData.response.details

        ///// Find Event in the Event Storage.
        const eventIndex = eventStorage.eventList.findIndex( eventItem => eventItem.eventCreationDate == updatedEvent.eventCreationDate )

        ///// Validate the Response from the Event Index.
        if ( eventIndex === -1 ) throw opModuleBasic.opReturnResponse( true, 404, { 
            message: `Could not find the Event in the Local Storage!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Set Updated Local Storage.
        const updatedLocalStorage = { ...eventStorage }

        ///// Set Updated Events.
        const updatedEvents = [ ...eventStorage.eventList ]

        ///// Set the New Event Data into the Updated Events.
        updatedEvents[ eventIndex ] = updatedEvent

        ///// Set the New Events into the Updated Local Storage.
        updatedLocalStorage.eventList = updatedEvents

        ///// Update the Local Storage with the New Updated Local Storage.
        localStorage.setItem( 'OP_PLUGIN_DATA_EVENTS', JSON.stringify( updatedLocalStorage ) )

        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `The Event was Updated!`, 
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