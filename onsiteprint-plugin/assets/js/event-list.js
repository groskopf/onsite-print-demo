////////////////////////////////////////
/////// Check if multible [Create Event List] Blocks is on page
////////////////////////////////////////
function checkCreateEventListBlock() {
    let blocks = document.querySelectorAll( '.op-create-event-list' )
    //console.log(blocks)

    if ( blocks ) {
        for( var i = 0; i < blocks.length; i++ ) {   
            if ( i !== 0 ) {
                blocks[i].setAttribute( 'data-block-disable', true )
                blocks[i].innerHTML = '<div class="validation-info active"><div class="validation-error"><p>Block [Create Event List] is already used on this Page!</p></div></div>'
            }
        }
    }
}
listen( 'load', window, checkCreateEventListBlock() )



////////////////////////////////////////
/////// Check if [Get Event Lists urls] Blocks is on page
////////////////////////////////////////
function checkEventListsUrls() {
    let blocks = document.querySelectorAll( '.op-get-event-lists-urls' )
    //console.log(blocks)

    if ( blocks ) {
        for( var i = 0; i < blocks.length; i++ ) {
            getEventListsUrls( blocks[i] )
        }
    }

}
listen( 'load', window, checkEventListsUrls() )



////////////////////////////////////////
/////// Check if Event List is in Local Storage
////////////////////////////////////////
function checkEventList() {
    let blocks = document.querySelectorAll( '.op-show-event-list-single' )
    //console.log(blocks)

    if ( blocks ) {
        for( var i = 0; i < blocks.length; i++ ) {
            showEventList( blocks[i] )
        }
    }

}
listen( 'load', window, checkEventList() )



///// Variable used by the Grid
var eventListGridElement



////////////////////////////////////////
/////// Create Grid From CSV  
////////////////////////////////////////
async function createGridFromCsv() {

    ///// Debug the function
    let debug = false // true or false 

    ///// Get the elements.
    let block = event.target.closest( 'section[id*="op-block"]' )
    let validationElement = block.querySelector( '.validation-info' )
    let formElement = block.querySelector( '.event-list-form' )

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

    eventListGridElement = new DataGridXL( `${ blockId }-event-list-grid`, {
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
    eventListGridElement.downloadDataAsCSV()
}



////////////////////////////////////////
/////// Create new Event List
////////////////////////////////////////
async function createNewEventList() {

    ///// Debug the function
    let debug = false // true or false 

    ///// Get the elements.
    let block = event.target.closest( 'section[id*="op-block"]' )
    let validationElement = block.querySelector( '.validation-info' )
    let formElement = block.querySelector( '.event-list-form' )
    
    const jsonFormGrid = JSON.stringify( eventListGridElement.getData() )

    ///// Get data from the form element.
    let formData = new FormData()

    formData.append( 'json-from-grid', jsonFormGrid )
    //gridInput.value = JSON.stringify(jsonFormGrid)

    ///// Validate Bookings Storage.
    const bookingsStorageValidation = validateBookingsStorage()
    consoleDebug( debug, 'bookingsStorageValidation:', bookingsStorageValidation )
    if ( bookingsStorageValidation.error !== false ) return validationReturn( validationElement, bookingsStorageValidation.response )
    let bookingsStorageResponse = bookingsStorageValidation.response

    ///// Validate Templates Storage.
    const templatesStorageValidation = validateTemplatesStorage()
    consoleDebug( debug, 'templatesStorageValidation:', templatesStorageValidation )
    if ( templatesStorageValidation.error !== false ) return validationReturn( validationElement, templatesStorageValidation.response )
    let templatesStorageResponse = templatesStorageValidation.response    

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


    window.location.replace(`?event-list=${ creationDate }`)

}



////////////////////////////////////////
/////// Get URL list of Event Lists 
////////////////////////////////////////
async function getEventListsUrls( block ) {

    ///// Debug the function
    let debug = false // true or false 

    ///// Get the elements.
    let validationElement = block.querySelector( '.validation-info' )
    let eventListId = block.getAttribute( 'data-event-list' )
    let blockContent = block.querySelector( '.content' )

    ///// Validate Bookings Storage.
    const bookingsStorageValidation = validateBookingsStorage()
    consoleDebug( debug, 'bookingsStorageValidation:', bookingsStorageValidation )
    if ( bookingsStorageValidation.error !== false ) return validateEventList( `Block [Show Event List] - ${ bookingsStorageValidation.response }` )

    ///// Validation Event List function. 
    function validateEventList( message ) {
        validationElement.innerHTML = ''
        block.querySelector('.op-block__inner').remove()
        block.setAttribute( 'data-block-disable', true )
        validationReturn( validationElement, message )
    }
    
    ///// Get Events Storage. 
    let eventStorage = JSON.parse( localStorage.getItem( 'OP_PLUGIN_DATA_EVENTS' ) )   
    
    ///// Validate Event List. 
    if ( eventListId == false || ! eventStorage || ! eventStorage.eventList ) return validateEventList( 'Block [Show Event List] - This Page has no Event Lists to Show!' )
    
    ///// Get Events Lists. 
    let eventList = eventStorage.eventList
    consoleDebug( debug, 'eventList:', eventList )
            
    ///// Validate JSON Event List from Storage. 
    if ( ! eventList[0] ) return validateEventList( 'Block [Show Event List] - This Page could not find any Event Lists!' )

    ///// Create Event List Item for each element in the array. 
    for( var i = 0; i < eventList.length; i++ ) {
    
        eventElement = `
            <article>
                <p><b>Event Name:</b> ${ eventList[i].eventName }</p>
                <a href="?event-list=${ eventList[i].eventCreationDate }"><b>URL:</b> ?event-list=${ eventList[i].eventCreationDate }</a>
            </article>
        `

        ///// Add element to the container. 
        blockContent.querySelector('.response').insertAdjacentHTML( 'afterbegin', eventElement )

    }

}



////////////////////////////////////////
/////// Show Event List
////////////////////////////////////////
async function showEventList( block ) {

    ///// Debug the function
    let debug = false // true or false 

    ///// Get the elements.
    let validationElement = block.querySelector( '.validation-info' )
    let eventListId = block.getAttribute( 'data-event-list' )
    let blockContent = block.querySelector( '.content' )

    ///// Validate Bookings Storage.
    const bookingsStorageValidation = validateBookingsStorage()
    consoleDebug( debug, 'bookingsStorageValidation:', bookingsStorageValidation )
    if ( bookingsStorageValidation.error !== false ) return validateEventList( `Block [Show Event List] - ${ bookingsStorageValidation.response }` )

    ///// Validation Event List function. 
    function validateEventList( message ) {
        validationElement.innerHTML = ''
        block.querySelector('.op-block__inner').remove()
        block.setAttribute( 'data-block-disable', true )
        validationReturn( validationElement, message )
    }
    
    ///// Get Events Storage. 
    let eventStorage = JSON.parse( localStorage.getItem( 'OP_PLUGIN_DATA_EVENTS' ) )   
    
    ///// Validate Event List. 
    if ( eventListId == false || ! eventStorage || ! eventStorage.eventList ) return validateEventList( 'Block [Show Event List] - This Page has no Event Lists to Show!' )
    
    ///// Get Events Lists. 
    let eventList = eventStorage.eventList
    consoleDebug( debug, 'eventList:', eventList )
    
    ///// Get Events Lists JSON. 
    let eventListJson = eventList.filter( eventList => eventList.eventCreationDate === Number( eventListId ) )
    consoleDebug( debug, eventListId+':', eventListJson )
    
    ///// Validate JSON Event List from Storage. 
    if ( ! eventListJson[0] ) return validateEventList( 'Block [Show Event List] - This Page could not find and show the Event List!' )
    
    ///// Add element to the container.
    blockContent.insertAdjacentHTML( 'afterbegin', `<h3><b>Event:</b> ${ eventListJson[0].eventName } - ${ eventListJson[0].eventCreationDate }</h3>` )
    
    ///// Get JSON Event List array. 
    let eventParticipants = eventListJson[0].eventParticipants
    consoleDebug( debug, 'eventParticipants:', eventParticipants )
    
    ///// Create variables. 
    let eventId, eventline1, eventline2, eventline3, eventline4, eventline5, eventPrints, eventTime, eventActive, eventElement
    
    ///// Create Event List Item for each element in the array. 
    for( var i = 0; i < eventParticipants.length; i++ ) {

        eventId = eventParticipants[i].id
        eventline1 = eventParticipants[i].line1
        eventline2 = eventParticipants[i].line2
        eventline3 = eventParticipants[i].line3
        eventline4 = eventParticipants[i].line4
        eventline5 = eventParticipants[i].line5
        eventPrints = eventParticipants[i].prints
        eventTime = eventParticipants[i].time
        eventActive = eventParticipants[i].active
        
        eventElement = `
            <artikle id="op-item-${ eventId }" class="op-event-list-item" data-op-arrival="${ eventActive }" data-op-prints="${ eventPrints }">
                <header>
                    <figure>
                        <span class="icon"></span>
                    </figure>
                    <div class="arrival-time">
                        <p>${ eventTime }</p>
                    </div>
                    <div class="list-info">
                        <p class="line-1">${ eventline1 }</p>
                        <p class="line-2">${ eventline2 }</p>
                        <p class="line-3">${ eventline3 }</p>
                        <p class="line-4">${ eventline4 }</p>
                    </div>
                    <figure>
                        <button class="print-button">Print</button>
                        <figcaption class="amount-of-print">${ eventPrints }</figcaption>
                    </figure>
                </header>
                <footer>
                    <p class="message"></p>
                    <p class="arrival-time">${ eventTime }</p>
                </footer>
            </artikle>
        `

        ///// Add element to the container. 
        blockContent.querySelector('.inner').insertAdjacentHTML( 'afterbegin', eventElement )

    }

}