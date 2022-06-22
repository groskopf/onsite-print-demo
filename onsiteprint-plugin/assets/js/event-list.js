////////////////////////////////////////
/////// Check if multible [Create Event List] Blocks
////////////////////////////////////////
function checkCreateEventListBlock() {
    let blocks = document.querySelectorAll( '.op-create-event-list' )
    //console.log(blocks)

    for( var i = 0; i < blocks.length; i++ ){   
        if ( i !== 0 ) {
            blocks[i].setAttribute( 'data-block-disable', true )
            blocks[i].innerHTML = '<div class="validation-info active"><div class="validation-error"><p>Block [Create Event List] is already used on this page!</p></div></div>'
        }
    }
}
listen( 'load', window, checkCreateEventListBlock() )



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
/////// Log in with Booking Code
////////////////////////////////////////
function saveAsCsv() {
    eventListGridElement.downloadDataAsCSV()
}



////////////////////////////////////////
/////// Log in with Booking Code
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
    const formValidation = validateForm( formElement )
    consoleDebug( debug, 'formValidation:', formValidation )
    if ( formValidation.error !== false ) return validationReturn( validationElement, formValidation.response )

    ///// Get Upload new Image Response from FastAPI.
    const jsonValidation = await convertGridDataIntoJson( formData, validationElement )
    consoleDebug( debug, 'jsonValidation:', jsonValidation )
    let jsonResponse = jsonValidation.response
    
    ///// Define new Design variable.
    let eventList = { 'creationDate' : Date.now(), 'event-name' : formElement[ 'event-name' ].value, 'event-list' : jsonResponse }
    
    ///// Push Design variable to Designs.
    eventsStorageResponse['event-lists'].push( eventList )
    consoleDebug( debug, 'eventsStorageResponse:', eventsStorageResponse )
    
    ///// Overwite Designs in Lacal Storage.
    localStorage.setItem( 'OP_PLUGIN_DATA_EVENTS', JSON.stringify( eventsStorageResponse ) )

}