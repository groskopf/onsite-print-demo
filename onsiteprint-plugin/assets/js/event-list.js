////////////////////////////////////////
/////// Check if multible [Create Event List] Blocks
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
/////// Check if Event List is in Local Storage
////////////////////////////////////////
function checkEventListUrls() {
    let blocks = document.querySelectorAll( '.op-get-event-list-urls' )
    //console.log(blocks)

    if ( blocks ) {
        for( var i = 0; i < blocks.length; i++ ) {
            getEventLists( blocks[i] )
        }
    }

}
listen( 'load', window, checkEventListUrls() )



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

    ///// Validate Booking Storage.
    const bookingStorageValidation = validateBookingStorage()
    consoleDebug( debug, 'bookingStorageValidation:', bookingStorageValidation )
    if ( bookingStorageValidation.error !== false ) return validationReturn( validationElement, bookingStorageValidation.response )

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

    ///// Validate Booking Storage.
    const bookingStorageValidation = validateBookingStorage()
    consoleDebug( debug, 'bookingStorageValidation:', bookingStorageValidation )
    if ( bookingStorageValidation.error !== false ) return validationReturn( validationElement, bookingStorageValidation.response )
    let bookingStorageResponse = bookingStorageValidation.response

    ///// Validate Designs Storage.
    const designsStorageValidation = validateDesignsStorage()
    consoleDebug( debug, 'designsStorageValidation:', designsStorageValidation )
    if ( designsStorageValidation.error !== false ) return validationReturn( validationElement, designsStorageValidation.response )
    let designsStorageResponse = designsStorageValidation.response

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

    ///// Define new Design variable.
    let eventList = { 'creationDate' : creationDate, 'eventName' : formElement[ 'event-name' ].value, 'eventList' : jsonResponse }
    
    ///// Push Design variable to Designs.
    eventsStorageResponse.eventLists.push( eventList )
    consoleDebug( debug, 'eventsStorageResponse:', eventsStorageResponse )
    
    ///// Overwite Designs in Lacal Storage.
    localStorage.setItem( 'OP_PLUGIN_DATA_EVENTS', JSON.stringify( eventsStorageResponse ) )
    
    ///// Overwite Designs in Lacal Storage.
    window.location.replace(`?event-list=${ creationDate }`)

}



////////////////////////////////////////
/////// Get Event Lists 
////////////////////////////////////////
async function getEventLists( block ) {

    ///// Debug the function
    let debug = false // true or false 

    ///// Get the elements.
    let validationElement = block.querySelector( '.validation-info' )
    let eventListId = block.getAttribute( 'data-event-list' )
    let blockContent = block.querySelector( '.content' )

    ///// Validate Booking Storage.
    const bookingStorageValidation = validateBookingStorage()
    consoleDebug( debug, 'bookingStorageValidation:', bookingStorageValidation )
    if ( bookingStorageValidation.error !== false ) return validateEventList( `Block [Show Event List] - ${ bookingStorageValidation.response }` )

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
    if ( eventListId == false || ! eventStorage || ! eventStorage.eventLists ) return validateEventList( 'Block [Show Event List] - This Page has no Event Lists to Show!' )
    
    ///// Get Events Lists. 
    let eventLists = eventStorage.eventLists
    consoleDebug( debug, 'eventLists:', eventLists )
            
    ///// Validate JSON Event List from Storage. 
    if ( ! eventLists[0] ) return validateEventList( 'Block [Show Event List] - This Page could not find any Event Lists!' )

    ///// Create Event List Item for each element in the array. 
    for( var i = 0; i < eventLists.length; i++ ) {
    
        eventElement = `
            <article>
                <p><b>Event Name:</b> ${ eventLists[i].eventName }</p>
                <a href="?event-list=${ eventLists[i].creationDate }"><b>URL:</b> ?event-list=${ eventLists[i].creationDate }</a>
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

    ///// Validate Booking Storage.
    const bookingStorageValidation = validateBookingStorage()
    consoleDebug( debug, 'bookingStorageValidation:', bookingStorageValidation )
    if ( bookingStorageValidation.error !== false ) return validateEventList( `Block [Show Event List] - ${ bookingStorageValidation.response }` )

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
    if ( eventListId == false || ! eventStorage || ! eventStorage.eventLists ) return validateEventList( 'Block [Show Event List] - This Page has no Event Lists to Show!' )
    
    ///// Get Events Lists. 
    let eventLists = eventStorage.eventLists
    consoleDebug( debug, 'eventLists:', eventLists )
    
    ///// Get Events Lists JSON. 
    let eventListJson = eventLists.filter( eventList => eventList.creationDate === Number( eventListId ) )
    consoleDebug( debug, eventListId+':', eventListJson )
    
    ///// Validate JSON Event List from Storage. 
    if ( ! eventListJson[0] ) return validateEventList( 'Block [Show Event List] - This Page could not find and show the Event List!' )
    
    ///// Add element to the container.
    blockContent.insertAdjacentHTML( 'afterbegin', `<h3><b>Event:</b> ${ eventListJson[0].eventName } - ${ eventListJson[0].creationDate }</h3>` )
    
    ///// Get JSON Event List array. 
    let eventListArray = eventListJson[0].eventList
    consoleDebug( debug, 'eventList:', eventListArray )
    
    ///// Create variables. 
    let eventId, eventline1, eventline2, eventline3, eventline4, eventline5, eventPrints, eventTime, eventActive, eventElement
    
    ///// Create Event List Item for each element in the array. 
    for( var i = 0; i < eventListArray.length; i++ ) {

        eventId = eventListArray[i].id
        eventline1 = eventListArray[i].line1
        eventline2 = eventListArray[i].line2
        eventline3 = eventListArray[i].line3
        eventline4 = eventListArray[i].line4
        eventline5 = eventListArray[i].line5
        eventPrints = eventListArray[i].prints
        eventTime = eventListArray[i].time
        eventActive = eventListArray[i].active
        
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