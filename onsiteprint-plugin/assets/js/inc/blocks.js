/* ------------------------------------------------------------------------
 #  JS Part Name: Blocks
 *  Block functions included in the OnsitePrint Plugin.
 ?  Updated: 2024-05-23 - 23:50 (Y:m:d - H:i)
 ?  Info: Added Event Creation (1b).
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

    1. 	Blocks
        a.  Event
        b.  Event Creation
        c.  Template Creation
    
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
 >  1b. Block: Event Creation
------------------------------------------------------------ */
import { opEventCreationBlocks } from '../../../blocks/event-creation/block-script.js'
export { opEventCreationBlocks }

/* ---------------------------------------------------------
 >  1c. Block: Template Creation
------------------------------------------------------------ */
import { opTemplateCreationBlocks } from '../../../blocks/template-creation/block-script.js'
export { opTemplateCreationBlocks }

/* ------------------------------------------------------------------------
 #  2. Call all functions in Blocks
--------------------------------------------------------------------------- */
export function opCallAllFunctions( debug ) {
    
    ///// 1a. Block: Event
    opEventBlocks( debug )
    
    ///// 1b. Event Creation
    opEventCreationBlocks( debug )

    ///// 1c. Template Creation
    opTemplateCreationBlocks( debug )

}