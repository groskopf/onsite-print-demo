/* ------------------------------------------------------------------------
 #  JS Part Name: Get Local Storage Data
 *  Getting the Data from the Local Storage.
 ?  Updated: 2025-06-01 - 17:18 (Y:m:d - H:i)
 ?  Info: Added New Get Local Storage Data Script with Function opGetLocalStorageData().
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Get Local Storage Data

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../basic.js'

/* ------------------------------------------------------------------------
 #  2. Function: Get Local Storage Data
--------------------------------------------------------------------------- */
export function opGetLocalStorageData( debug, localStorageName ) {

    try {

        ///// Get Function Name.
        var functionName = opGetLocalStorageData.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// If the Storage Name is missing.
        if ( ! localStorageName ) throw opModuleBasic.opReturnResponse( false, 400, { 
            message: `Missing Local Storage Name!`, 
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Convert Local Storages Name to UpperCase.
        const storageName = localStorageName.toUpperCase()

        ///// Get Local Storages.
        const storage = JSON.parse( localStorage.getItem( `OP_PLUGIN_DATA_${ storageName }` ) )
        
        ///// Validate Local Storage.
        if ( storage == '' || storage == undefined ) {
            
            if ( storageName === 'BOOKINGS' ) storage = { bookingList : [] }
            else if ( storageName === 'TEMPLATES' ) storage = { templateList : [] }
            else if ( storageName === 'EVENTS' ) storage = { eventList : [] }
            else throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Could not find any Local Storage Named: ${ localStorageName }!`, 
                line: opModuleBasic.errorLine(),
                function: functionName
            } )

            ///// Return the Response.
            return opModuleBasic.opReturnResponse( false, 204, { 
                message: `The Local Storage (${storageName}) was Created!`, 
                line: opModuleBasic.errorLine(),
                function: functionName,
                details: storage
            }, debug )

        }

        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `The Local Storage (${storageName}) was Found!`, 
            line: opModuleBasic.errorLine(),
            function: functionName,
            details: storage
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