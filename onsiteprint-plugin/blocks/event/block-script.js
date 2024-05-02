/* ------------------------------------------------------------------------
 #  The OnsitePrint (Event) Block Script 
 *  Check if multiple Blocks of the Event is on page.
 ?  Updated: 2023-04-11 - 17:30 (Y:m:d - H:i)
---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../assets/js/inc/basic.js'
import * as opModuleEvent from '../../assets/js/inc/event/event.js'

/* ------------------------------------------------------------------------
#  2. Functions of Blocks
--------------------------------------------------------------------------- */
export function opEventBlocks( debug ) {

    ///// Create Variables.
    let error, code, message, blockCount = 0

    try {

        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( ! debug ) debug = false

        ///// Get the elements.
        let blockName = 'Event'
        let blocks = document.querySelectorAll( 'section.op-block__event' )

        ///// Throw an Error if no Block was found.
        if ( ! blocks || blocks.length === 0 ) throw `Could not find any ${ blockName } Blocks!` 
        else {
            
            ///// Get each Block.
            blocks.forEach( block => {
                
                ///// Count the Blocks. 
                ++blockCount

                ///// Get Event ID.
                let eventId = block.getAttribute( 'data-event-id' )

                ///// Get the elements.
                let participantListElement = block.querySelector( '.op-participant-rows' )

                //----------- function
                ///// Validate Local Storage of Events.
                const eventsStorage = opGetLocalStorage( debug, 'Events' )

                ///// Get Event List. 
                const eventList = eventsStorage.response.eventList
                opConsoleDebug( debug, 'eventList:', eventList )

                ///// Validate Event List.
                if ( ! eventList || ! eventList[0] ) return opValidateBlock( block, blockName, 'No Events have been created yet!' )

                //----------- function
                ///// Filter Event Items.
                let eventItems = eventList.filter( event => event.eventCreationDate === Number( eventId ) )
                opConsoleDebug( debug, `event-${eventId}:`, eventItems )
                
                ///// Validate Event Item. 
                if ( ! eventItems[0] ) return opValidateBlock( block, blockName, 'No Event Information could be found to display!' )

                //----------- function
                ///// Get Event Participants. 
                let participants = eventItems[0].eventParticipants
                opConsoleDebug( debug, 'participants:', participants )

                //----------- function
                // #NG (2023-02-26) - New Code
                ///// Get Template Item.
                const templateItem = opGetTemplate( eventItems[0].eventTemplate )
                if ( templateItem.error !== false ) opConsoleDebug( true, 'templateItem:', 'Could not find the Template!' )
                opConsoleDebug( debug, 'templateItem:', templateItem )

                ///// Get the Amount of Columns.
                let columnAmount = templateItem.response.templateLayoutColumns.charAt(0)

                participantListElement.innerHTML = ''

                //----------- function
                ///// For each Participant create Participant Element.
                for( let i = 0; i < participants.length; ++i ) {

                    opAddEventParticipant( debug, block, participants[i], columnAmount ).then( response => {
                        opConsoleDebug( debug, 'Response:', response )
                        participantListElement.insertAdjacentHTML( 'afterbegin', response.element )
                    })

                }


                block.setAttribute( 'data-column-count', columnAmount )

                ///// Get All Column Elements in hte Search.
                let filterElements = block.querySelectorAll( '.op-filter-options .op-filter-input-label' )
                var filterNodes = Array.from( filterElements )
                filterNodes.shift()

                ///// Get All Column Elements in the Modal.
                let columnElements = block.querySelectorAll( '.op-modal .op-fieldset__inner .op-input-wrapper input' )
                
                opConsoleDebug( debug, 'columnElements:', 'There are too many Column Elements in relation to the Number of Columns in the Event!' )
                
                ///// Delete the Column Element if the Column Number is above the Amount of Columns.
                for( let i = 0; i < filterNodes.length; ++i ) {
                    if ( columnAmount < Number( i + 1 ) ) {
                        filterNodes[i].remove()
                        opConsoleDebug( debug, `filterElement-${ Number( i + 1 ) }:`, 'The Column Element is deleted!' )
                    }
                }
                
                ///// Delete the Column Element if the Column Number is above the Amount of Columns.
                for( let i = 0; i < columnElements.length; ++i ) {                   
                    if ( columnAmount < Number( i + 1 ) ) {
                        columnElements[i].closest( '.op-input-wrapper' ).remove()
                        opConsoleDebug( debug, `columnElement-${ Number( i + 1 ) }:`, 'The Column Element is deleted!' )
                    }
                }

                //-----------

                ///// Add Function to Modal Window. 
                opModuleBasic.opListener( 'click', block.querySelector( '.op-modal .op-button-save' ), function() {
                    opAddNewParticipantToEventList( debug, eventId )
                    //opModuleEvent.opAddNewParticipantToEvent( debug, eventId )
                } )

            })

            ///// Create Response.
            error = false, code = 200, message = `${ blockCount } quantity of the ${ blockName } Block was found!`
        
        }

    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, code = 400, message = errorMessage

        ///// Throw Error Response in the Console.
        //console.error( `opEventBlocks()`, opModuleBasic.opReturnResponse( error, code, errorMessage ) )

    } finally {

        ///// Return the Response to the Function.
        return opModuleBasic.opReturnResponse( error, code, message )

    }
    
}