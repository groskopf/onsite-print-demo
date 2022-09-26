////////////////////////////////////////
/////// Check [Search Event Participants] Blocks is on page
////////////////////////////////////////
function checkSearchEventParticipantsBlocks() {

    ///// Debug the function.
    let debug = false // true or false 

    let blocks = document.querySelectorAll( '.op-search-event-participants' )
    consoleDebug( debug, 'blocks:', blocks )

    if ( blocks ) {
        for( var i = 0; i < blocks.length; i++ ) {   

            ///// Get the elements.
            let blockId = blocks[i].getAttribute( 'id' )
            let filterRadioElement, filterElement = blocks[i].querySelector('.filter-radio-options')
            let strings = [ 'Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5' ]

            blocks[i].querySelector('.filter-option').innerText = strings[0]

            if ( strings ) {                  

                ///// For each Template in Storage.
                for( let i = 0; i < strings.length; i++ ) {
                    consoleDebug( debug, `string-${i}:`, strings[i] )

                    ///// Create Template radio element.
                    filterRadioElement = `                               
                        <label for="${ blockId }-line-${ i+1 }-input" class="filter-radio-input input-outer flex-wrap" onclick="searchFilterToggle('radio','line${ i+1 }')">
                            <input type="radio" id="${ blockId }-line-${ i+1 }-input" name="filter-option" value="line${ i+1 }">
                            <p>${ strings[i] }</p>
                        </label>
                    `

                    ///// Add element to the container.
                    filterElement.insertAdjacentHTML( 'beforeEnd', filterRadioElement )
                }

                searchFilterToggle( 'fucktion', 'line1', blocks[i] )
            }
        }
    }
}
listen( 'load', window, checkSearchEventParticipantsBlocks() )



////////////////////////////////////////
/////// Check if multible [Create new Event] Blocks is on page
////////////////////////////////////////
function checkCreateEventBlocks() {

    ///// Debug the function.
    let debug = false // true or false 

    let blocks = document.querySelectorAll( '.op-create-event' )
    consoleDebug( debug, 'blocks:', blocks )

    if ( blocks ) {
        for( var i = 0; i < blocks.length; i++ ) {   
            if ( i !== 0 ) {
                blocks[i].setAttribute( 'data-block-disable', true )
                blocks[i].innerHTML = '<div class="validation-info active"><div class="validation-error"><p>Block [Create new Event] is already used on this Page!</p></div></div>'               
            } else {
                let templateId = getUrlParameters().template

                if ( templateId ) {                  

                    const eventTemplates = openEventTemplates( blocks[i], templateId )
                    consoleDebug( debug, 'eventTemplates:', eventTemplates )

                    if ( eventTemplates.error == false ) {
                        let blockId = blocks[i].getAttribute( 'id' )
                        let radioInput = blocks[i].querySelector( `#${ blockId }-${ templateId }-input` )
                        
                        radioInput.checked = true
                        closeEventTemplates( templateId, blocks[i] )
                    } else {
                        closeEventTemplates( false, blocks[i] )
                    }


                }
            }
        }
    }
}
listen( 'load', window, checkCreateEventBlocks() )



////////////////////////////////////////
/////// Check if [Show List of Event URL's] Blocks is on page
////////////////////////////////////////
function checkShowListOfEventUrlsBlocks() {
    let blocks = document.querySelectorAll( '.op-show-list-of-event-urls' )
    //console.log(blocks)

    if ( blocks ) {
        for( var i = 0; i < blocks.length; i++ ) {
            showListOfEventUrls( blocks[i] )
        }
    }

}
listen( 'load', window, checkShowListOfEventUrlsBlocks() )



////////////////////////////////////////
/////// Check if [Show Event Participants] Blocks is on page
////////////////////////////////////////
function checkShowEventParticipantsBlocks() {
    let blocks = document.querySelectorAll( '.op-show-event-participants' )
    //console.log(blocks)

    if ( blocks ) {
        for( var i = 0; i < blocks.length; i++ ) {
            showEventParticipants( blocks[i] )
        }
    }

}
listen( 'load', window, checkShowEventParticipantsBlocks() )



////////////////////////////////////////
/////// Block [Create new Event] - Open Templates option. 
////////////////////////////////////////
function openEventTemplates( block, templateId ) {

    ///// Debug the function.
    let debug = false // true or false 

    ///// Get the elements.
    if ( ! block ) {
        block = event.target.closest( 'section[id*="op-block"]' )
    }

    let validationElement = block.querySelector( '.validation-info' )
    consoleDebug( debug, 'block:', block )         
    let blockId = block.getAttribute( 'id' )
    let container = block.querySelector( '.event-templates-radio-option' )
    let optionInput = block.querySelector( '.event-template-option' )

    ///// Validate Templates Storage.
    const templatesStorageValidation = validateTemplatesStorage()
    consoleDebug( debug, 'templatesStorageValidation:', templatesStorageValidation )
    if ( templatesStorageValidation.error !== false ) return validationReturn( validationElement, templatesStorageValidation.response )
    let templateList = templatesStorageValidation.response.templateList
    
    ///// Get Template radio elements.
    const radioList = block.querySelectorAll( '.template-radio-input' )
    consoleDebug( debug, 'radioList:', radioList )

    ///// Set default to 'false'.
    let radioAndTemplate = false

    ///// For each Template in Storage.
    for( let i = 0; i < templateList.length; i++ ) {
        consoleDebug( debug, 'templateList-'+i+':', templateList[i] )

        if ( templateId == templateList[i].templateCreationDate ) {
            radioAndTemplate = true
        }

        ///// Create Template radio element.
        templateElement = `                               
            <label for="${ blockId }-${ templateList[i].templateCreationDate }-input" class="template-radio-input input-outer flex-wrap" onclick="closeEventTemplates(${ templateList[i].templateCreationDate })">
                <input type="radio" id="${ blockId }-${ templateList[i].templateCreationDate }-input" name="event-template" value="${ templateList[i].templateCreationDate }">
                <p>${ templateList[i].templateName }</p>
            </label>
        `

        ///// Set default to 'false'.
        let radioListInput = false

        ///// For each Template radio element.
        radioList.forEach( radioElement => {
            consoleDebug( debug, 'radioElement:', radioElement )           
            ///// Set to 'true' if Template radio element Id is the same as Template in Storage.
            if ( templateList[i].templateCreationDate == radioElement.querySelector( 'input' ).value ) {
                radioListInput = true
            }
        })

        ///// If the variable is 'false'.
        if ( radioListInput === false ){
            ///// Add element to the container.
            container.insertAdjacentHTML( 'beforeEnd', templateElement )
        }
    }

    ///// Add and remove classes to elements.
    optionInput.classList.remove('active')
    container.classList.add('active')

    if ( radioAndTemplate === true ) {
        return returnResponse( false, 200, 'Template Found.' )
    } else {
        return returnResponse( true, 400, 'Could not find Template.' )
    }
}



////////////////////////////////////////
/////// Block [Create new Event] - Close Templates option. 
////////////////////////////////////////
function closeEventTemplates( templateId, block ) {
    ///// Get the elements.
    if ( ! block ) {
        block = event.target.closest( 'section[id*="op-block"]' )
    }

    let optionInput = block.querySelector( '.event-template-option' )
    let container = block.querySelector( '.event-templates-radio-option' )
    
    if ( templateId != false ) {
        let blockId = block.getAttribute( 'id' )

        let radioElement = block.querySelector( `[for="${ blockId }-${ templateId }-input"]` )
        let radioText = radioElement.querySelector('p').textContent

        ///// Add text to element.
        optionInput.querySelector('.event-template-option-input').innerHTML = radioText
        
        ///// Add class to element.
        optionInput.classList.add('active')
    }
    
    ///// Remove class to element.
    container.classList.remove('active')
}



///// Variable used by the Grid
var eventGridElement



////////////////////////////////////////
/////// Create Grid From CSV  
////////////////////////////////////////
async function createGridFromCsv() {

    ///// Debug the function
    let debug = false // true or false 

    ///// Get the elements.
    let block = event.target.closest( 'section[id*="op-block"]' )
    let validationElement = block.querySelector( '.validation-info' )
    let formElement = block.querySelector( '.event-form' )

    ///// Clear the Validation Info Element. 
	validationElement.innerHTML = ''
    validationElement.classList.remove( 'active' )

    ///// Validate Bookings Storage.
    const bookingsStorageValidation = validateBookingsStorage()
    consoleDebug( debug, 'bookingsStorageValidation:', bookingsStorageValidation )
    if ( bookingsStorageValidation.error !== false ) return validationReturn( validationElement, bookingsStorageValidation.response )

    let blockId = block.getAttribute( 'id' )
    let csvInput = formElement['csv-file'].value  

    ///// End function if CSV input is Empty.
    if ( ! csvInput ) return consoleDebug( debug, 'csvFile:', 'Input is Empty!' )

    ///// Get data from the form element.
    let formData = new FormData( formElement )

    ///// Get Upload new Image Response from FastAPI.
    const jsonValidation = await convertCsvIntoJson( formData, validationElement )
    consoleDebug( debug, 'jsonValidation:', jsonValidation )
    let jsonResponse = jsonValidation.response
    
    ///// Add the class active to the grid element.
    block.querySelector( '.responses' ).classList.add('active')

    ///// Create new Grid Element.
    eventGridElement = new DataGridXL( `${ blockId }-event-grid`, {
        data: jsonResponse,
        /* colHeaderLabelFunction: function(index, id, field, title, labels){
            // use id as column label
            return String("Column #"+id);
        } */
    })
    
}



////////////////////////////////////////
/////// Save Grid as CSV
////////////////////////////////////////
function saveAsCsv() {
    eventGridElement.downloadDataAsCSV()
}



////////////////////////////////////////
/////// Create new Event
////////////////////////////////////////
async function createNewEvent() {

    ///// Debug the function
    let debug = false // true or false 

    ///// Get the elements.
    let block = event.target.closest( 'section[id*="op-block"]' )
    let validationElement = block.querySelector( '.validation-info' )
    let formElement = block.querySelector( '.event-form' )
    
    const jsonFormGrid = JSON.stringify( eventGridElement.getData() )

    ///// Get data from the form element.
    let formData = new FormData()

    ///// Add JSON from Grid to Form Element
    formData.append( 'json-from-grid', jsonFormGrid )

    ///// Validate Bookings Storage.
    const bookingsStorageValidation = validateBookingsStorage()
    consoleDebug( debug, 'bookingsStorageValidation:', bookingsStorageValidation )
    if ( bookingsStorageValidation.error !== false ) return validationReturn( validationElement, bookingsStorageValidation.response )

    ///// Validate Templates Storage.
    const templatesStorageValidation = validateTemplatesStorage()
    consoleDebug( debug, 'templatesStorageValidation:', templatesStorageValidation )
    if ( templatesStorageValidation.error !== false ) return validationReturn( validationElement, templatesStorageValidation.response )

    ///// Validate Events Storage.
    const eventsStorageValidation = validateEventsStorage()
    consoleDebug( debug, 'eventsStorageValidation:', eventsStorageValidation )
    if ( eventsStorageValidation.error !== false ) return validationReturn( validationElement, eventsStorageValidation.response )
    let eventsStorageResponse = eventsStorageValidation.response

    ///// Validate Form Data.
    const formValidation = validateForm( formElement, debug )
    consoleDebug( debug, 'formValidation:', formValidation )
    if ( formValidation.error !== false ) return validationReturn( validationElement, formValidation.response )

    ///// Get Upload new Image Response from FastAPI.
    const jsonValidation = await convertGridDataIntoJson( formData, validationElement )
    consoleDebug( debug, 'jsonValidation:', jsonValidation )
    let jsonResponse = jsonValidation.response
    
    ///// Create Date variable.
    let creationDate = Date.now()

    ///// Define new Event Item variable.
    let eventItem = { 
        eventCreationDate : creationDate, 
        eventName : formElement[ 'event-name' ].value, 
        eventTemplate : formElement[ 'event-template' ].value,
        eventParticipants : jsonResponse
    }
    
    ///// Push Event Item variable into Event List in Lacal Storage.
    eventsStorageResponse.eventList.push( eventItem )
    consoleDebug( debug, 'eventsStorageResponse:', eventsStorageResponse )
    
    ///// Set EVENTS in Lacal Storage.
    localStorage.setItem( 'OP_PLUGIN_DATA_EVENTS', JSON.stringify( eventsStorageResponse ) )
    

    //////////////////////////////////////////
    ///// #NG Below must be changed later.
    //////////////////////////////////////////


    window.location.replace(`event/?event=${ creationDate }`)

}



////////////////////////////////////////
/////// Show List of Event URL's
////////////////////////////////////////
async function showListOfEventUrls( block ) {

    ///// Debug the function
    let debug = false // true or false

    ///// Get the elements.
    let validationElement = block.querySelector( '.validation-info' )
    let eventListId = block.getAttribute( 'data-event-id' )
    let blockContent = block.querySelector( '.op-block__wrapper' )

    ///// Validation Event List function. 
    function validateEventList( message ) {
        validationElement.innerHTML = ''
        block.querySelector('.op-block__inner').remove()
        block.setAttribute( 'data-block-disable', true )
        validationReturn( validationElement, message )
    }
    
    ///// Validate Bookings Storage.
    const bookingsStorageValidation = validateBookingsStorage()
    consoleDebug( debug, 'bookingsStorageValidation:', bookingsStorageValidation )
    if ( bookingsStorageValidation.error !== false ) return validateEventList( `Block [Show List of Event URL's] - ${ bookingsStorageValidation.response }` )

    ///// Get Events Storage. 
    let eventStorage = JSON.parse( localStorage.getItem( 'OP_PLUGIN_DATA_EVENTS' ) )   
    
    ///// Validate Event List. 
    if ( eventListId == false || ! eventStorage || ! eventStorage.eventList ) return validateEventList( `Block [Show List of Event URL's] - This Page has no Event ULR's to Show!` )
    
    ///// Get Event List. 
    let eventList = eventStorage.eventList
    consoleDebug( debug, 'eventList:', eventList )
            
    ///// Validate JSON Event List from Storage. 
    if ( ! eventList[0] ) return validateEventList( `Block [Show List of Event URL's] - This Page could not find any Event ULR's!` )

    ///// For each Event create URL Element.
    for( var i = 0; i < eventList.length; i++ ) {
    
        urlElement = `
            <article id="event-url-item-${ eventList[i].eventCreationDate }">
                <a href="event/?event=${ eventList[i].eventCreationDate }">
                    <span><b>Event Name:</b> ${ eventList[i].eventName }</span>
                </a>
            </article>
        `

        ///// Add element to the container. 
        blockContent.insertAdjacentHTML( 'afterbegin', urlElement )

    }

}



////////////////////////////////////////
/////// Show Event Participants
////////////////////////////////////////
async function showEventParticipants( block ) {

    ///// Debug the function
    let debug = false // true or false

    ///// Get the elements.
    let validationElement = block.querySelector( '.validation-info' )
    let eventListId = block.getAttribute( 'data-event-id' )
    let blockContent = block.querySelector( '.op-block__wrapper' )

    ///// Validation Event List function. 
    function validateEventList( message ) {
        validationElement.innerHTML = ''
        block.querySelector('.op-block__inner').remove()
        block.setAttribute( 'data-block-disable', true )
        validationReturn( validationElement, message )
    }
    
    ///// Validate Bookings Storage.
    const bookingsStorageValidation = validateBookingsStorage()
    consoleDebug( debug, 'bookingsStorageValidation:', bookingsStorageValidation )
    if ( bookingsStorageValidation.error !== false ) return validateEventList( `Block [Show Event Participants] - ${ bookingsStorageValidation.response }` )

    ///// Get Events Storage. 
    let eventStorage = JSON.parse( localStorage.getItem( 'OP_PLUGIN_DATA_EVENTS' ) )   
    
    ///// Validate Event List. 
    if ( eventListId == false || ! eventStorage || ! eventStorage.eventList ) return validateEventList( 'Block [Show Event Participants] - This Page has no Event to Show!' )
    
    ///// Get Event List. 
    let eventList = eventStorage.eventList
    consoleDebug( debug, 'eventList:', eventList )
    
    ///// Get Event Item. 
    let eventItem = eventList.filter( eventList => eventList.eventCreationDate === Number( eventListId ) )
    consoleDebug( debug, eventListId+':', eventItem )
    
    ///// Validate Event Item from Storage. 
    if ( ! eventItem[0] ) return validateEventList( 'Block [Show Event Participants] - This Page could not find any Event to Show!' )
    
    ///// Add element to the container.
    /*blockContent.insertAdjacentHTML( 'afterbegin', `<h3><b>Event:</b> ${ eventItem[0].eventName } - ${ eventItem[0].eventCreationDate } | <b>Template:</b> ${ eventItem[0].eventTemplate }</h3>` )*/

    ///// Get Participants. 
    let eventParticipants = eventItem[0].eventParticipants
    consoleDebug( debug, 'eventParticipants:', eventParticipants )
    
    ///// Create Participant variables. 
    let participantId, participantline1, participantline2, participantline3, participantline4, participantline5, participantPrints, participantTime, participantActive, participantElement
    
    ///// For each Participant create Participant Element. 
    for( var i = 0; i < eventParticipants.length; i++ ) {

        participantId = eventParticipants[i].id
        participantline1 = eventParticipants[i].line1
        participantline2 = eventParticipants[i].line2
        participantline3 = eventParticipants[i].line3
        participantline4 = eventParticipants[i].line4
        participantline5 = eventParticipants[i].line5
        participantPrints = eventParticipants[i].prints
        participantTime = timeConverter( eventParticipants[i].time, 'time' )
        participantActive = eventParticipants[i].active
        
        participantElement = `
            <article id="op-item-${ participantId }" class="op-event-item" data-op-arrival="${ participantActive }" data-op-prints="${ participantPrints }">
                <header class="participant-content">
                    <div>
                        <span class="icon"></span>
                    </div>
                    <div class="time">
                        <p class="arrival-time">${ participantTime }</p>
                    </div>
                    <div class="list-info">
                        <p class="line-1">${ participantline1 }</p>
                        <p class="line-2">${ participantline2 }</p>
                        <p class="line-3">${ participantline3 }</p>
                        <p class="line-4">${ participantline4 }</p>
                        <p class="line-5">${ participantline5 }</p>
                    </div>
                    <div class="print">
                        <button class="print-button op-button op-button-solid" onclick="printParticipant('${ participantId }'); return false">Print</button>
                        <figcaption class="amount-of-print">${ participantPrints }</figcaption>
                    </div>
                </header>
                <footer>
                    <p class="message"></p>
                    <p class="arrival-time">${ participantTime }</p>
                </footer>
            </article>
        `

        ///// Add element to the container. 
        blockContent.insertAdjacentHTML( 'afterbegin', participantElement )

    }

}



////////////////////////////////////////
/////// Search Event Participants
////////////////////////////////////////
async function searchEventParticipants() {

    ///// Debug the function
    let debug = false // true or false
    
    ///// Get the elements.
    let block = event.target.closest( 'section[id*="op-block"]' )
    let blockId = block.getAttribute( 'id' )
    let validationElement = block.querySelector( '.validation-info' )
    let showEventBlock, showEventBlocks = document.querySelectorAll( '.op-show-event-participants' )
    consoleDebug( debug, 'showEventBlocks:', showEventBlocks )

    ///// Clear the Validation Info Element. 
	validationElement.innerHTML = ''
    validationElement.classList.remove( 'active' )
  
    if ( showEventBlocks.length == 0 ) {
        return validationReturn( validationElement, 'There are no block!' )
    } else {
        for( var i = 0; i < showEventBlocks.length; i++ ) {   
            showEventBlock = showEventBlocks[i]
            consoleDebug( debug, 'showEventBlock:', showEventBlocks[i] )
            
            let formElement = block.querySelector( '.search-form' )
            let searchInput = formElement['search-input']
            let filterInput = formElement['filter-option'].value
            let eventListId = showEventBlock.getAttribute( 'data-event-id' )
            let blockContent = showEventBlock.querySelector( '.op-block__wrapper' )

            ///// Clear the Block Content Element. 
            blockContent.innerHTML = ''

            ///// Get Events Storage.
            let eventStorage = JSON.parse( localStorage.getItem( 'OP_PLUGIN_DATA_EVENTS' ) )   
            
            ///// Validate Event List. 
            if ( eventListId == false || ! eventStorage || ! eventStorage.eventList ) return validationReturn( validationElement, 'Block [Show Event Participants] - This Page has no Event to Show!' )
            
            ///// Get Event List. 
            let eventList = eventStorage.eventList
            consoleDebug( debug, 'eventList:', eventList )

            ///// Search in Event List.
            const eventSearch = searchInObject( eventList, 'eventCreationDate', Number( eventListId ) )
            consoleDebug( debug, 'eventSearch:', eventSearch )
            if ( eventSearch.error !== false ) return validationReturn( validationElement, eventSearch.response )
            let eventItem = eventSearch.response.search
            
            ///// Validate Event Item from Storage. 
            if ( ! eventItem ) return validationReturn( validationElement, 'Block [Show Event Participants] - This Page could not find any Event to Show!' )
            
            ///// Add element to the container.
            /*blockContent.insertAdjacentHTML( 'afterbegin', `<h3><b>Event:</b> ${ eventItem.eventName } - ${ eventItem.eventCreationDate } | <b>Template:</b> ${ eventItem.eventTemplate }</h3><div class="inner"></div>` ) */
            
            ///// Get Participant List. 
            let participantList = eventItem.eventParticipants
            consoleDebug( debug, 'participantList:', participantList )

            const eventParticipants = universalSearch( searchInput, participantList, [filterInput] )
            consoleDebug( debug, 'search:', eventParticipants )
            
            ///// Create Participant variables.
            let participantId, participantline1, participantline2, participantline3, participantline4, participantline5, participantPrints, participantTime, participantActive, participantElement
            
            ///// For each Participant create Participant Element. 
            for( var i = 0; i < eventParticipants.length; i++ ) {

                participantId = eventParticipants[i].id
                participantline1 = eventParticipants[i].line1
                participantline2 = eventParticipants[i].line2
                participantline3 = eventParticipants[i].line3
                participantline4 = eventParticipants[i].line4
                participantline5 = eventParticipants[i].line5
                participantPrints = eventParticipants[i].prints
                participantTime = timeConverter( eventParticipants[i].time, 'time' )
                participantActive = eventParticipants[i].active
                
                participantElement = `
                    <article id="op-item-${ participantId }" class="op-event-item" data-op-arrival="${ participantActive }" data-op-prints="${ participantPrints }">
                        <header class="participant-content">
                            <div>
                                <span class="icon"></span>
                            </div>
                            <div class="time">
                                <p class="arrival-time">${ participantTime }</p>
                            </div>
                            <div class="list-info">
                                <p class="line-1">${ participantline1 }</p>
                                <p class="line-2">${ participantline2 }</p>
                                <p class="line-3">${ participantline3 }</p>
                                <p class="line-4">${ participantline4 }</p>
                                <p class="line-5">${ participantline5 }</p>
                            </div>
                            <div class="print">
                                <button class="print-button op-button op-button-solid" onclick="printParticipant('${ participantId }'); return false">Print</button>
                                <figcaption class="amount-of-print">${ participantPrints }</figcaption>
                            </div>
                        </header>
                        <footer>
                            <p class="message"></p>
                            <p class="arrival-time">${ participantTime }</p>
                        </footer>
                    </article>
                `

                ///// Add element to the container. 
                blockContent.insertAdjacentHTML( 'afterbegin', participantElement )

            }

        }
    }
}



////////////////////////////////////////
/////// Toggle [Search Event Participants] Block filter element
////////////////////////////////////////
function searchFilterToggle( type, radioId, block ) {

    ///// Get the elements.
    if ( ! block ) {
        block = event.target.closest( 'section[id*="op-block"]' )
    }

    let filterElement = block.querySelector('.filter-radio-options')
    
    if ( type != false ) {
        let blockId = block.getAttribute( 'id' )
        let filterRadio = block.querySelector(`#${ blockId }-line-${ radioId.charAt(4) }-input`)

        if ( type != 'radio' && radioId === 'line1' ) return filterRadio.checked = true

        filterRadio.checked = true
        block.querySelector('.filter-option').innerText = filterRadio.value

        ///// Add and remove classes to elements.
        filterElement.classList.remove('active')

    } else {
        ///// Add and remove classes to elements.
        filterElement.classList.add('active')
    }

}