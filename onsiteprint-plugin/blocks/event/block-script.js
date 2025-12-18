/* ------------------------------------------------------------------------
 #  The OnsitePrint (Event) Block Script 
 *  Check if multiple Blocks of the Event is on page.
 ?  Updated: 2025-12-19 - 00:46 (Y:m:d - H:i)
 ?  Info: Added new Page Navigation.
 ?  NB: Changed Line Filter to Search Filter and relocated some code.
--------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../assets/js/inc/basic.js'
import { opGetEvent } from '../../assets/js/inc/event/event.js'
import { opGetTemplate } from '../../assets/js/inc/template/template.js'
import { opSetupHeader, opSetupFooter, opSetupList } from './block-script-parts/parts.js'
import { opSearchForParticipant } from './block-script-parts/search-for-participant.js'

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

                ///// Get Search Form Element.
                let formElement = block.querySelector( '.op-search-form' )

                ///// Get Search Query and Filter from the Search Form.
                const searchQuery = formElement[ 'op-search-input' ].value || ''
                const searchFilter = formElement[ 'op-filter-input' ].value || ''

                ///// Normalize search query and default fields
                const newQuery = String( searchQuery || '' ).toLowerCase().trim()
                let fields = []
                if ( searchFilter >= 1 && searchFilter <= columnAmount ) fields.push( `line${ searchFilter }` )
                else {
                    for ( let index = 1; index <= columnAmount; index++ ) {
                        fields.push( `line${ index }` )
                    }
                }

                ///// Setup the Event Header.
                const setupHeader = opSetupHeader( debug, block, eventId, fields.length )

                ///// Validate the Response from the Event Header.
                if ( setupHeader.error !== false ) throw setupHeader

                ///// Get Participant List.
                let participantList = eventItem.response.details.eventParticipants

                ///// Check if query is empty
                if ( newQuery !== '' ) {

                    ///// Search for Participant.
                    const searchParticipant = opSearchForParticipant( debug, participantList, newQuery, fields )

                    ///// Validate the Response from the Search for Participant.
                    if ( searchParticipant.error !== false ) throw searchParticipant

                    ///// Get the Search Results.
                    participantList = searchParticipant.response.details.results

                }

                ///// Get the Page Information and calculate paging.
                let pageNumber = Number( block.querySelector( '.op-page' ).getAttribute( 'data-page' ) )
                let pageSize = Number( block.querySelector( '.op-limit' ).getAttribute( 'data-limit' ) )
                if ( ! Number.isFinite( pageSize ) || pageSize <= 0 ) pageSize = 50

                const totalItems = participantList.length
                const totalPages = Math.max( 1, Math.ceil( totalItems / pageSize ) )

                ///// Clamp pageNumber into valid range
                pageNumber = Number.isFinite( pageNumber ) ? pageNumber : 1
                pageNumber = Math.min( Math.max( 1, pageNumber ), totalPages )

                ///// Compute slice indexes
                const startIndex = ( pageNumber - 1 ) * pageSize
                const endIndex = Math.min( startIndex + pageSize, totalItems )

                ///// Divide participantList into pages and pick current page items
                const pages = []
                for ( let i = 0; i < totalPages; i++ ) {
                    const s = i * pageSize
                    const e = Math.min( s + pageSize, totalItems )
                    pages.push( participantList.slice( s, e ) )
                }

                //// Get the Current Page Items.
                const currentPageItems = pages[ pageNumber - 1 ] || []

                ///// Console Log Success if Debug.
                if ( debug ) console.log( 'SUCCESS:', { 
                    message: `Successfully retrieved current page items.`,
                    line: opModuleBasic.errorLine(),
                    function: functionName,
                    details: {
                        currentPageItems: currentPageItems,
                        startIndex: startIndex,
                        endIndex: endIndex,
                        totalItems: totalItems, 
                        totalPages: totalPages
                    }
                } )

                ///// Setup the Event List with current page items.
                const setupList = opSetupList( debug, block, eventId, currentPageItems, startIndex, endIndex )

                ///// Validate the Response from the Event List.
                if ( setupList.error !== false ) throw setupList
                else if ( setupList.code === 204 ) {

                    ///// Fade Out the Skeleton and Fade In the Participant.
                    block.querySelectorAll( '.op-participant-list .op-participant_skeleton' ).forEach( skeleton => {
                        skeleton.classList.remove( 'op-fade-in' )
                        setTimeout( () => {
                            skeleton.classList.add( 'op-fade-out' )
                        }, 300 )
                        setTimeout( () => {
                            skeleton.classList.remove( 'op-active' )
                        }, 600 )
                    } )

                }

                ///// Setup the Event Footer (pass total item count for pagination display).
                const setupFooter = opSetupFooter( debug, block, startIndex, endIndex, totalItems, pageNumber, totalPages )

                ///// Validate the Response from the Event Footer.
                if ( setupFooter.error !== false ) throw setupFooter

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