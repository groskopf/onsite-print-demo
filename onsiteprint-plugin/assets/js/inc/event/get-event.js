/* ------------------------------------------------------------------------
 #  JS Part Name: Get Event
 *  Getting the Event from the Local Storage.
 ?  Updated: 2025-06-01 - 17:19 (Y:m:d - H:i)
 ?  Info: Added the Local Storage Data and the Filter of the Event List.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Get Event from the Local Storage.

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../basic.js'
import { opGetLocalStorageData } from '../api/get-local-storage-data.js'

/* ------------------------------------------------------------------------
 #  2. Function: Get Event from the Local Storage.
--------------------------------------------------------------------------- */
export function opGetEvent( debug, eventId ) {

    try {

        ///// Get Function Name.
        var functionName = opGetEvent.name

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

        ///// Get Event List.
        const eventList = localStorageData.response.details.eventList

        ///// Validate Event List.
        if ( ! eventList || ! eventList[0] ) throw opModuleBasic.opReturnResponse( true, 404, { 
            message: `No Events have been created yet!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Find the Event.
        let eventItem = eventList.filter( eventItem => eventItem.eventCreationDate === Number( eventId ) )

        ///// Validate Event Item.
        if ( ! eventItem[0] ) throw opModuleBasic.opReturnResponse( true, 404, { 
            message: `No Events was found!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `The Event was Found!`, 
            line: opModuleBasic.errorLine(),
            function: functionName,
            details: eventItem[0]
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