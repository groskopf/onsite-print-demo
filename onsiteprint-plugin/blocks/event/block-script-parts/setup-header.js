/* ------------------------------------------------------------------------
 #  JS Part Name: Setup Header
 *  Block function included in the Event Block.
 ?  Updated: 2025-07-03 - 01:18 (Y:m:d - H:i)
 ?  Info: Added new Setup Header Script with Function.

---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Setup the Header of the Event

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../assets/js/inc/basic.js'

/* ------------------------------------------------------------------------
 #  2. Function: Setup the Header of the Event
 ?  NB: The function is under construction.
--------------------------------------------------------------------------- */
export function opSetupHeader( debug, block ) {

    try {
        
        ///// Get Function Name.
        var functionName = opSetupHeader.name
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )
   
            console.log('Header Works!!')

        ///// End the Console Log Group.
        if ( debug ) console.groupEnd()

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