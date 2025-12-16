/* ------------------------------------------------------------------------
 #  The OnsitePrint (Event) Block Script 
 *  Check if multiple Blocks of the Event is on page.
 ?  Updated: 2025-12-16 - 03:13 (Y:m:d - H:i)
 ?  Info: Added new Page Navigation.
 ?  NB: The Script wil replace the Old Script.
--------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../assets/js/inc/basic.js'
import { opGetEvent } from '../../assets/js/inc/event/event.js'
import { opGetTemplate } from '../../assets/js/inc/template/template.js'
import { opSetupHeader, opSetupFooter, opSetupList } from './block-script-parts/parts.js'

/* ------------------------------------------------------------------------
 #  2. The Function of Event Creation Blocks
 ?  NB: The function is under construction.
--------------------------------------------------------------------------- */
export function opEventBlocks( debug ) {

    try {
        
        ///// Get Function Name.
        var functionName = opEventBlocks.name
    
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false       
        if ( debug ) console.group( `${ functionName }()` )

        ///// Create Variables.
        let blockName = 'Event'
    
        ///// Get the elements.
        let blocks = document.querySelectorAll( 'section.op-block__event' )

        ///// Debug to the Console Log.
        opModuleBasic.opConsoleDebug( debug, { 
            message: `${ blocks.length } quantity of the ${ blockName } Block was found!`,
            line: opModuleBasic.errorLine(),
            details: blocks 
        } )

        ///// Check if some Blocks were found.
        if ( ! blocks || blocks.length === 0 ) {
            
            ///// Return the Response.
            return opModuleBasic.opReturnResponse( false, 404, { 
                message: `Could not find any ${ blockName } Blocks!`, 
                line: opModuleBasic.errorLine(),
                function: functionName
            } )

        } else {
            
            ///// Get each Block.
            blocks.forEach( block => {

                ///// Start the Console Log Group.
                if ( debug ) console.group( `Block with ID: ${ block.getAttribute( 'id' ) }` )

                ///// Get Event ID.
                const eventId = block.getAttribute( 'data-event-id' )

                ///// Throw Error if the Event ID is missing.
                if ( ! eventId ) throw opModuleBasic.opReturnResponse( true, 404, { 
                    message: `Missing the Event ID!`, 
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )

                ///// Get the Event. 
                const eventItem = opGetEvent( debug, eventId )

                ///// Validate the Response from the Get Event.
                if ( eventItem.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
                    message: `Something went wrong getting the Event!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )

                ///// Get the Template. 
                const templateItem = opGetTemplate( debug, eventItem.response.details.eventTemplate )

                ///// Validate the Response from the Get Template.
                if ( templateItem.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
                    message: `Something went wrong getting the Template!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )

                ///// Get the Amount of Columns.
                let columnAmount = templateItem.response.details.templateLayoutColumns.charAt(0)
                
                ///// Set the Amount of Columns to the Block.
                block.setAttribute( 'data-column-count', columnAmount )

                ///// Setup the Event Header.
                const setupHeader = opSetupHeader( debug, block, eventId, columnAmount )

                ///// Validate the Response from the Event Header.
                if ( setupHeader.error !== false ) throw setupHeader

                ///// Get Participant List.
                const participantList = eventItem.response.details.eventParticipants
                
                ///// Get the Page Information.
                let pageNumber = Number( block.querySelector( '.op-page' ).getAttribute( 'data-page' ) )
                let pageSize = Number( block.querySelector( '.op-limit' ).getAttribute( 'data-limit' ) )
                let startIndex = ( pageNumber - 1 ) * pageSize
                let endIndex = startIndex + pageSize

                ///// Setup the Event Footer.
                const setupFooter = opSetupFooter( debug, block, startIndex, endIndex, participantList.length )

                ///// Validate the Response from the Event Footer.
                if ( setupFooter.error !== false ) throw setupFooter

                console.log( 'startIndex:', startIndex, 'endIndex:', endIndex )

                ///// Setup the Event List.
                const setupList = opSetupList( debug, block, eventId, participantList, startIndex, endIndex )

                ///// Validate the Response from the Event List.
                if ( setupList.error !== false ) throw setupList
                



                ///// Debug to the Console Log.
                opModuleBasic.opConsoleDebug( debug, { 
                    message: `No errors were found in the Block!`,
                    line: opModuleBasic.errorLine(),
                    details: block 
                } )

                ///// End the Console Log Group.
                if ( debug ) console.groupEnd()

            })

        }

        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `No errors were found in the ${ blockName } Function!`, 
            line: opModuleBasic.errorLine()
        }, debug )

    } catch( errorResponse ) {

        ///// Create Error Details.
        let errorDetails = ( errorResponse.error == true ) ? errorResponse : opModuleBasic.opReturnResponse( false, 400, { 
            message: errorResponse.message,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Log Error Details in the Console.
        if ( debug ) console.error( 'ERROR:', { 
            function: functionName,
            message: `Something went wrong in the function!`, 
            details: errorDetails
        } )

        ///// Return the Error Response.
        return opModuleBasic.opReturnResponse( true, 400, { 
            function: functionName,
            message: `Something went wrong in the function!`, 
            details: errorDetails
        } )

    } finally {

        ///// End the Console Log Group.
        if ( debug ) console.groupEnd()

    }
    
}