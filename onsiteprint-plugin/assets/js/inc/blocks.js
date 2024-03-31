/* ------------------------------------------------------------------------
 #  JS Part Name: Blocks
 *  Block functions included in the OnsitePrint Plugin.
 ?  Updated: 2024-03-31 - 03:45 (Y:m:d - H:i)
 ?  Info: Added Template Creation (1b).
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

    1. 	Blocks
        a.  Event
        a.  Template Creation
    
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
    
    ///// 1b. Template Creation
    opTemplateCreationBlocks( debug )

}