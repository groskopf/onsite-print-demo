////////////////////////////////////////
/////// Print Participant
////////////////////////////////////////
async function printParticipant( participantId ) {

    ///// Debug the function
    let debug = false // true or false 

    ///// Get the elements.
    let block = event.target.closest( 'section[id*="op-block"]' )
    let validationElement = block.querySelector( '.validation-info' )
    let eventListId = block.getAttribute( 'data-event-id' )
    let participantBlock = block.querySelector( `#op-item-${ participantId }` )

    consoleDebug( debug, 'participantId:', participantId )

    ///// Validate Bookings Storage.
    const bookingsStorageValidation = validateBookingsStorage()
    consoleDebug( debug, 'bookingsStorageValidation:', bookingsStorageValidation )
    if ( bookingsStorageValidation.error !== false ) return validationReturn( validationElement, bookingsStorageValidation.response )
    let bookingsStorageResponse = bookingsStorageValidation.response.bookingList[0]

    ///// Get Events Storage. 
    let eventStorage = JSON.parse( localStorage.getItem( 'OP_PLUGIN_DATA_EVENTS' ) )   

    ///// Validate Event List. 
    if ( eventListId == false || ! eventStorage || ! eventStorage.eventList ) return validationReturn( validationElement, 'Block [Show Event Participants] - Could no find any Events!' )
    
    ///// Get Event List. 
    let eventList = eventStorage.eventList
    consoleDebug( debug, 'eventList:', eventList )
    
    ///// Search in Event List. 
    const eventSearch = searchInObject( eventList, 'eventCreationDate', Number( eventListId ) )
    consoleDebug( debug, 'eventSearch:', eventSearch )
    if ( eventSearch.error !== false ) return validationReturn( validationElement, eventSearch.response )
    let eventItem = eventSearch.response.search

    ///// Get Templates Storage. 
    let templatesStorage = JSON.parse( localStorage.getItem( 'OP_PLUGIN_DATA_TEMPLATES' ) )   

    ///// Validate Variables.
    if ( ! templatesStorage || ! templatesStorage.templateList || ! eventItem.eventTemplate ) return validationReturn( validationElement, 'Block [Show Event Participants] - Could no find any Templates!' )

    ///// Get Event List. 
    let templateList = templatesStorage.templateList
    consoleDebug( debug, 'templateList:', templateList )

    ///// Search in Template List.
    const templateSearch = searchInObject( templateList, 'templateCreationDate', Number( eventItem.eventTemplate ) )
    consoleDebug( debug, 'templateSearch:', templateSearch )
    if ( templateSearch.error !== false ) return validationReturn( validationElement, templateSearch.response )
    let template = templateSearch.response.search
        
    ///// Get Participant List. 
    let participantList = eventItem.eventParticipants
    consoleDebug( debug, 'participantList:', participantList )

    ///// Search in Participant List.
    const participantSearch = searchInObject( participantList, 'id', participantId )
    consoleDebug( debug, 'participantSearch:', participantSearch )
    if ( participantSearch.error !== false ) return validationReturn( validationElement, participantSearch.response )
    let participant = participantSearch.response.search

    ///// Create Variables.
    let bookingCode = bookingsStorageResponse.booking.bookingId
    let layout = template.templateLayout
    let imageFilename = template.templateFilename
    let string1 = participant.line1
    let string2 = participant.line2
    let string3 = participant.line3
    let string4 = participant.line4
    let string5 = participant.line5

    ///// The URL to the API.
    let  url = `https://api.printerboks.dk/api/v1/name_tags/?booking_code=${ bookingCode }&layout=${ layout }`

    ///// The Body Input to Request Options.
    let bodyInput = JSON.stringify(
        {
        "line_1": string1,
        "line_2": string2,
        "line_3": string3,
        "line_4": string4,
        "line_5": string5,
        "image_name": imageFilename,
        "qr_code": "string"
        }
    )

    ///// Request Options for fetch.
    let options = {
        ///// *GET, POST, PUT, DELETE, etc.
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: bodyInput
    }

    ///// Request the data from the API.
    ///// fetchAPI( *url, options, 'blob/json', debug ).
    let request = fetchAPI( url, options, 'json', debug )
    
    ///// Wait for Response of the Request.
    let fetchResponse = await request
    consoleDebug( debug, 'fetchResponse:', fetchResponse )

    const fetchResponseValidation = validateFetchResponse( fetchResponse )
    consoleDebug( debug, 'fetchResponseValidation:', fetchResponseValidation )

    ///// If the Fetch Response has an Error.
    if ( fetchResponseValidation.error !== false && validationElement ) return validationReturn( validationElement, fetchResponseValidation.response )

    ///// If the Fetch Response has Code 201 (Created).
    if ( fetchResponseValidation.code === 201 ) { 

        let participantPrints
        let dateNow = Date.now()

        for( var i = 0; i < participantList.length; i++ ) {
            consoleDebug( debug, 'Participant:', participantList[i] )

            if ( participantList[i].id === participantId ) {
                consoleDebug( debug, `${ participantList[i].id }:`, 'Participant was updated!' )
                participantPrints = ( participantList[i].prints + 1 )
                participantList[i].active = 1
                participantList[i].prints = participantPrints
                participantList[i].time = dateNow
            }
        }

        participantBlock.setAttribute( 'data-op-arrival', '1' )
        participantBlock.setAttribute( 'data-op-prints', participantPrints )
        participantBlock.querySelector( 'header .amount-of-print' ).innerText = participantPrints
        participantBlock.querySelector( 'header .arrival-time' ).innerText = timeConverter( dateNow, 'time' )
        participantBlock.querySelector( 'footer .arrival-time' ).innerText = timeConverter( dateNow, 'time' )
    
        localStorage.setItem( 'OP_PLUGIN_DATA_EVENTS', JSON.stringify( eventStorage ) )

    }


    //////////////////////////////////////////
    ///// #NG Below must be changed later.
    //////////////////////////////////////////


    let windowUrl = `https://api.printerboks.dk/api/v1/${ fetchResponseValidation.response.filename }`
    window.open(windowUrl, '_blank').focus()

}