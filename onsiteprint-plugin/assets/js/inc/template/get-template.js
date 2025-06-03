/* ------------------------------------------------------------------------
 #  JS Part Name: Get Template
 *  Getting the Template from the Local Storage.
 ?  Updated: 2025-06-03 - 02:26 (Y:m:d - H:i)
 ?  Info: Removed Async & Await in Functions.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Get Template from the Local Storage.

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../basic.js'
import { opGetLocalStorageData } from '../api/get-local-storage-data.js'

/* ------------------------------------------------------------------------
 #  2. Function: Get Template from the Local Storage.
--------------------------------------------------------------------------- */
export function opGetTemplate( debug, templateId ) {

    try {

        ///// Get Function Name.
        var functionName = opGetTemplate.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Get Local Storage Data.
        const localStorageData = opGetLocalStorageData( debug, 'TEMPLATES' )
        
        ///// Validate the Response from the Local Storage Data.
        if ( localStorageData.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
            message: `Something went wrong getting the Local Storage Data!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Get Template List.
        const templateList = localStorageData.response.details.templateList

        ///// Validate Template List.
        if ( ! templateList || ! templateList[0] ) throw opModuleBasic.opReturnResponse( true, 404, { 
            message: `No Templates have been created yet!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Find the Template.
        let templateItem = templateList.filter( templateItem => templateItem.templateCreationDate === Number( templateId ) )

        ///// Validate Template Item.
        if ( ! templateItem[0] ) throw opModuleBasic.opReturnResponse( true, 404, { 
            message: `No Template was found!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `The Template was Found!`, 
            line: opModuleBasic.errorLine(),
            function: functionName,
            details: templateItem[0]
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