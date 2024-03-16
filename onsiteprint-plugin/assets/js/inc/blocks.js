/* ------------------------------------------------------------------------
 #  JS Part Name: Blocks
 *  Block functions included in the OnsitePrint Plugin.
 ?  Updated: 2024-03-07 - 20:46 (Y:m:d - H:i)
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

    1. 	Blocks
        a.  Event List
    
    2. 	Call all functions in Blocks

---------------------------------------------------------------------------
 #  1. Blocks
--------------------------------------------------------------------------- */

/* ---------------------------------------------------------
 >  1a. Block: Event
------------------------------------------------------------ */
import { opEventBlocks } from '../../../blocks/event/block-script.js'
export { opEventBlocks }

/* ---------------------------------------------------------
 >  1b. Block: Template Creation
------------------------------------------------------------ */
import { opTemplateCreationBlocks } from '../../../blocks/template-creation/block-script.js'
export { opTemplateCreationBlocks }

/* ------------------------------------------------------------------------
 #  2. Call all functions in Blocks
--------------------------------------------------------------------------- */
export function opCallAllFunctions( debug ) {
    ///// 1a. Block: Event
    opEventBlocks( debug )
    opTemplateCreationBlocks( debug )
}