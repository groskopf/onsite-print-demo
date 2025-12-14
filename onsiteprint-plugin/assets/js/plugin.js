/* ------------------------------------------------------------------------

 *  Plugin Name: OnsitePrint Plugin
 *  Description: This is the Main JavaScript Module to the OnsitePrint Plugin.
 *  Author: Gerdes Group
 *  Author URI: https://www.clarify.nu/
 ?  Updated: 2025-12-14 - 04:56 (Y:m:d - H:i)
 ?  Info: Changed the Debug Parameter.

---------------------------------------------------------------------------
#  TABLE OF CONTENTS:
---------------------------------------------------------------------------

    1. 	Basic Functions
    
    2. 	Functions of Blocks

    3. 	Call all functions in the Blocks Module

---------------------------------------------------------------------------
 #  1. Basic Functions
--------------------------------------------------------------------------- */
import * as opModuleBasic from './inc/basic.js'

/* ------------------------------------------------------------------------
#  2. Functions of Blocks
--------------------------------------------------------------------------- */
import * as opModuleBlocks from './inc/blocks.js'

/* ------------------------------------------------------------------------
 #  3. Call all functions in the Blocks Module
--------------------------------------------------------------------------- */
function opCalAllBlocks() {

    ///// Create Variables.
    let error, code, message

    try {

        ///// Set the Debug.
        ////* true or false
        let debug = true

        ///// Call all functions in the Blocks Module.
        opModuleBlocks.opCallAllFunctions( debug )

        ///// Create Response.
        error = false, code = 200, message = `All Blocks was called!`

    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, code = 400, message = errorMessage

        ///// Throw Error Response in the Console.
        console.error( `opCalAllBlocks()`, opModuleBasic.opReturnResponse( error, code, errorMessage ) )

    } finally {

        ///// Return the Response to the Function.
        return opModuleBasic.opReturnResponse( error, code, message )

    }

}

///// Call the function when the browser window is loaded.
opModuleBasic.opListener( 'load', window, opCalAllBlocks )