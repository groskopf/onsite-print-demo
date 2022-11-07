/* ------------------------------------------------------------------------

 *  Plugin Name: OnsitePrint Plugin
 *  Description: This is a JavaScript to the OnsitePrint Plugin.
 *  Author: Gerdes Group
 *  Author URI: https://www.clarify.nu/
 ?  Updated: 2022-11-07 - 16:20 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	0. 	List of upcoming tasks 
	1. 	Basic Functions
        a. 	Console Log the Debug
        b. 	Return Response as JSON
        c. 	Time Converter
        d. 	Add Event Listener
        e. 	Execute Function By Name
		f. 	Check if Function exist
		g. 	Toggle Active Class
    2. 	Validation Functions
        a. 	Validate Local Storage
        b. 	Validation of OnsitePrint Blocks
        c. 	Return Validation in Element
	3. 	FastAPI Functions
        a. 	Get FastAPI Info
	4. 	Local Storage Functions
        a. 	Bookings Storage
        b. 	Template Storage
            1. 	Get Template
        c. 	Events Storage
            1. 	Get Event List
            2. 	Get Participant
            3. 	Update Participant
	5. 	Print Functions
        a. 	Print Participant
	6. 	Functions to ACF Custom Blocks
		a. 	Block Functions
		c. 	Blocks:
            1. 	Log In/Out Button
            2. 	Toggle Button
            3. 	Booking Information
            4. 	Print Information
            5. 	Event Information
            6. 	Event Template Information
            7. 	Event Participant List
    7. 	Document is Ready Function

---------------------------------------------------------------------------
 &  0. List of upcoming tasks
---------------------------------------------------------------------------

    1. Login validation to Blocks

---------------------------------------------------------------------------
 #  1. Basic Functions
---------------------------------------------------------------------------
 >  1a. Console Log the Debug if true.
------------------------------------------------------------ */
function opConsoleDebug( debug, name, response ) {
    if ( debug == true ) console.log( name, response )
}

/* ---------------------------------------------------------
 >  1b. Return Response as JSON
------------------------------------------------------------ */
function opReturnResponse( error, code, response ) {
    return {
        error : error,
        code : code,
        response : response
    }
}

/* ---------------------------------------------------------
 >  1c. Time Converter
------------------------------------------------------------ */
function opTimeConverter( timestamp, display, language ){
    
    let time, year, months, month, monthName, date, hour, min, sec

    let currentDate = new Date( timestamp )

    if ( currentDate == 'Invalid Date' ) {
        return ''
    }

    if ( language == 'da') {
        months = ['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec']
    } else {
        months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    }

    year = currentDate.getFullYear()
    monthName = months[ currentDate.getMonth() ]
    month = months.indexOf( monthName ) + 1
    date = currentDate.getDate()
    hour = currentDate.getHours()
    min = currentDate.getMinutes()
    sec = currentDate.getSeconds()

    if ( min.toString().length == 1 ) min = `0${ min }` 
    if ( hour.toString().length == 1 ) hour = `0${ hour }`

    if ( display == 'hour-min' ) {
        time = `${hour}:${min}`
    } else if ( display == 'date-month-year' && language == 'da' ) {
        time = `${date}. ${monthName}. - ${year}`
    } else if ( display == 'full' && language == 'da' ) {
        time = `${date}. ${month} - ${year} (${hour}:${min}:${sec})`
    } else if ( display == 'full' ) {
        time = `${year}-${month}-${date} ${hour}:${min}`
    }

    return time

}

/* ---------------------------------------------------------
 >  1d. Add Event Listener
 *  Cross-browser implementation of element.addEventListener()
 *  Use: opListener( 'event name', element, function )
------------------------------------------------------------ */
function opListener( evnt, elem, func ) {
    if ( elem.addEventListener )  // W3C DOM
        elem.addEventListener( evnt, func, false )
    else if ( elem.attachEvent ) { // IE DOM
         var r = elem.attachEvent( 'on'+evnt, func )
         return r
    }
    else opConsoleDebug( true, 'opListener:', 'Something went wrong with the request!' )
}

/* ---------------------------------------------------------
 >  1e. Execute Function By Name (String)
------------------------------------------------------------ */
function opExecuteFunctionByName( functionName, context /*, args */ ) {
    
    var args = Array.prototype.slice.call( arguments, 2 )
    var namespaces = functionName.split( '.' )
    var func = namespaces.pop()

    for( var i = 0; i < namespaces.length; i++ ) {
        context = context[ namespaces[i] ]
    }

    return context[ func ].apply( context, args )

}

/* ---------------------------------------------------------
 >  1f. Check if Function exist
 *  Execute the Function if execute is true
------------------------------------------------------------ */
function opCheckFunctionExist ( functionNames, execute ) {

    let response = [], error = false

    functionNames.forEach( functionName => {
        try {

            ///// Throw an error if not the 'functionName' is a function
            ///// Returns 'undefined' or 'function'
            if ( eval( 'typeof ' + functionName ) !== 'function' ) throw `The Function (${ functionName }) is not found!`

            ///// Execute the Function if execute is true
            if ( execute === true ) opExecuteFunctionByName( functionName, window, arguments )

        } catch ( errorMessage ) {
            response.push( { function : errorMessage } )
            error = true
        }
    })
    
    if ( error === true ) {
        return opReturnResponse( error, 404, response )
    } else {
        return opReturnResponse( error, 200, 'All Functions exist.' )
    }
}

/* ---------------------------------------------------------
 >  1g. Toggle Active Class
------------------------------------------------------------ */
function opToggleActive( element, closestElement ) {
    if ( element == 'class') {
        closestElement = `[class*="${ closestElement }"]`
    }

    event.target.closest( closestElement ).classList.toggle('op-active')
}

/* ------------------------------------------------------------------------
 #  2. Validation Functions 
---------------------------------------------------------------------------
 >  2a. Validate Local Storage
------------------------------------------------------------ */
function opValidateLocalStorage( localStorageName ) {

    try {

        ///// If the Storage Name is missing.
        if ( ! localStorageName ) {
            throw 'Missing Local Storage Name!'
        }
    
        const storageName = localStorageName.toUpperCase()

        ///// Get Local Storages.
        let storage = JSON.parse( localStorage.getItem( `OP_PLUGIN_DATA_${ storageName }` ) )
        
        ///// Validate Bookings Storage.
        if ( storage == '' || storage == undefined ) {
            ///// Create new Local Storage if empty or undefined.
            if ( localStorageName === 'BOOKINGS' ){
                return opReturnResponse( false, 204, { bookingList : [] } )
            } else if ( localStorageName === 'TEMPLATES' ){
                return opReturnResponse( false, 204, { templateList : [] } )   
            } else if ( localStorageName === 'EVENTS' ){
                return opReturnResponse( false, 204, { eventList : [] } )   
            }
        } else if ( storage ) return opReturnResponse( false, 200, storage )

        throw `Something went wrong with the Local Storage (${ storageName }) validation!`

    } catch( validateError ) {
        return opReturnResponse( true, 400, validateError )
    }

}

/* ---------------------------------------------------------
 >  2b. Validation of OnsitePrint Blocks.
------------------------------------------------------------ */
function opValidateBlock( block, blockName, message ) {
    block.setAttribute( 'data-block-disable', true )
    validationElement = block.querySelector('.block__inner')
    validationElement.innerHTML = ''
    validationElement.insertAdjacentHTML( 'afterbegin', `<p class="validation-error flex-col"><span class="label">${ blockName }</span><span class="text">${ message }</span></p>` )
}

/* ---------------------------------------------------------
 >  2c. Return Validation in Element
------------------------------------------------------------ */
function opValidationReturn( validationElement, message ) {

    validationElement.insertAdjacentHTML( 'afterbegin', `<div class="validation-error"><p>${ message }</p></div>` )

    validationElement.classList.add( 'op-active' )

}


/* ------------------------------------------------------------------------
 #  3. FastAPI Functions
---------------------------------------------------------------------------
 >  3a. Get FastAPI Info
------------------------------------------------------------ */
function opGetFastApiInfo( object ) {
    ///// List of FastAPI URL
    const fastApiUrl = [
        'https://api.printerboks.dk/api/v1/'
    ]

    ///// List of FastAPI Tokens
    const fastApiToken = [
        '123admin'
    ]

    if ( object === 'url' ) return fastApiUrl[ 0 ]
    if ( object === 'token' ) return fastApiToken[ 0 ]
}


/* ------------------------------------------------------------------------
 #  4. Local Storage Functions
---------------------------------------------------------------------------
 >  4a. Bookings Storage
------------------------------------------------------------ */

/* ---------------------------------------------------------
 >  4b. Templates Storage
------------------------------------------------------------
 >  4b-1. Get Template
--------------------------------------------- */
function opGetTemplate( templateId ) {

    ///// Debug the function
    let debug = false // true or false 

    ///// Validate Local Storage of Templates.
    const templatesStorageValidation = opValidateLocalStorage( 'Templates' )
    opConsoleDebug( debug, 'templatesStorageValidation:', templatesStorageValidation )
    if ( templatesStorageValidation.error !== false ) return opConsoleDebug( debug, 'templatesStorageValidation:', templatesStorageValidation.response )

    ///// Get Template List. 
    const templateList = templatesStorageValidation.response.templateList
    opConsoleDebug( debug, 'templateList:', templateList )

    ///// Validate Template List.
    if ( ! templateList || ! templateList[0] ) return opReturnResponse( true, 400, 'No Templates have been created yet!' )

    ///// Filter Template Items.
    let templateItems = templateList.filter( templateItem => templateItem.templateCreationDate === Number( templateId ) )
    opConsoleDebug( debug, `templateItem-${templateId}:`, templateItems[0] )
    
    ///// Validate Template Item.
    if ( ! templateItems[0] ) {
        return opReturnResponse( true, 400, 'No Template was found!' )
    } else {
        return opReturnResponse( false, 200, templateItems[0] )
    }

}

/* ---------------------------------------------------------
 >  4c. Event Storage
------------------------------------------------------------
 >  4c-1. Get Event List
--------------------------------------------- */
function opGetEventList( eventListId ) {

    ///// Debug the function
    let debug = false // true or false 

    ///// Validate Local Storage of Events.
    const eventsStorageValidation = opValidateLocalStorage( 'Events' )
    opConsoleDebug( debug, 'eventsStorageValidation:', eventsStorageValidation )
    if ( eventsStorageValidation.error !== false ) return opConsoleDebug( debug, 'eventsStorageValidation:', eventsStorageValidation.response )

    ///// Get Event List. 
    const eventList = eventsStorageValidation.response.eventList
    opConsoleDebug( debug, 'eventList:', eventList )

    ///// Validate Event List.
    if ( ! eventList || ! eventList[0] ) return opReturnResponse( true, 400, 'No Events have been created yet!' )

    ///// Filter Event Items.
    let eventItems = eventList.filter( eventItem => eventItem.eventCreationDate === Number( eventListId ) )
    opConsoleDebug( debug, `eventItem-${eventListId}:`, eventItems[0] )
    
    ///// Validate Event Item.
    if ( ! eventItems[0] ) {
        return opReturnResponse( true, 400, 'No Event was found!' )
    } else {
        return opReturnResponse( false, 200, eventItems[0] )
    }

}

/* ------------------------------------------
 >  4c-2. Get Participant
--------------------------------------------- */
function opGetParticipant( eventListId, participantId ) {

    ///// Debug the function
    let debug = false // true or false

    ///// Get Event List. 
    const eventList = opGetEventList( eventListId )
    if ( eventList.error !== false ) return opConsoleDebug( debug, 'eventList:', eventList.response )

    ///// Get Participant List. 
    const participantList = eventList.response.eventParticipants
    opConsoleDebug( debug, 'participantList:', participantList )
    
    ///// Validate Participant List.
    if ( ! participantList || ! participantList[0] ) return opReturnResponse( true, 400, 'No Participants have been created yet!' )

    ///// Filter Participant Items.
    let participantItem = participantList.filter( participant => participant.id === participantId )
    opConsoleDebug( debug, `participantItem-${participantId}:`, participantItem[0] )
    
    ///// Validate Participant Item.
    if ( ! participantItem[0] ) {
        return opReturnResponse( true, 400, 'No Participant was found!' )
    } else {
        return opReturnResponse( false, 200, participantItem[0] )
    }

}

/* ------------------------------------------
 >  4c-3. Update Participant
--------------------------------------------- */
function opUpdateParticipant( eventListId, participantId, participantPrints, dateNow ) {

    ///// Debug the function
    let debug = false // true or false

    ///// Validate Local Storage of Events.
    const eventsStorage = opValidateLocalStorage( 'Events' )
    opConsoleDebug( debug, 'eventsStorage:', eventsStorage )
    if ( eventsStorage.error !== false ) return opConsoleDebug( debug, 'eventsStorage:', eventsStorage.response )

    ///// Get Event List.
    const eventList = eventsStorage.response.eventList
    opConsoleDebug( debug, 'eventList:', eventList )

    ///// Validate Event List.
    if ( ! eventList || ! eventList[0] ) return opReturnResponse( true, 400, 'No Events have been created yet!' )

    ///// Filter Event Items.
    let eventItems = eventList.filter( eventItem => eventItem.eventCreationDate === Number( eventListId ) )
    opConsoleDebug( debug, `eventItem-${eventListId}:`, eventItems[0] )
    
    ///// Get Participant List. 
    const participantList = eventItems[0].eventParticipants
    opConsoleDebug( debug, 'participantList:', participantList )
    
    ///// Validate Participant List.
    if ( ! participantList || ! participantList[0] ) return opReturnResponse( true, 400, 'No Participants have been created yet!' )   

    for( var i = 0; i < participantList.length; i++ ) {
        opConsoleDebug( debug, 'Participant:', participantList[i] )

        if ( participantList[i].id === participantId ) {
            participantList[i].active = 1
            participantList[i].prints = participantPrints
            participantList[i].time = dateNow
            opConsoleDebug( debug, `Participant-${ participantList[i].id }:`, 'Participant was updated!' )
        }
    }

    localStorage.setItem( 'OP_PLUGIN_DATA_EVENTS', JSON.stringify( eventsStorage.response ) )

    return opReturnResponse( false, 200, 'Participant was updated!' )

}


/* ------------------------------------------------------------------------
 #  5. Print Functions
---------------------------------------------------------------------------
 >  5a. Print Participant
------------------------------------------------------------ */
async function opPrintParticipant( participantId ) {

    ///// Debug the function
    let debug = false // true or false 

    ///// Get the elements.
    let block = event.target.closest( 'section[id*="op-block_"]' )
    let participantElement = block.querySelector( `.op-participant_${ participantId }` )
    
    ///// Get Id's. 
    let blockId = block.getAttribute( 'id' ).substring(9)
    let eventListId = block.getAttribute( 'data-event-id' )
    

    //////////////////// #NG: Needs to be looked at again - Search.
    ///// Validate Local Storage of Bookings.
    const bookingsStorageValidation = opValidateLocalStorage( 'Bookings' )
    opConsoleDebug( debug, 'bookingsStorageValidation:', bookingsStorageValidation )
    if ( bookingsStorageValidation.error !== false ) return opConsoleDebug( debug, 'bookingsStorageValidation:', bookingsStorageValidation.response )

    ///// Get Booking. 
    const booking = bookingsStorageValidation.response.bookingList[0].booking
    opConsoleDebug( debug, 'booking:', booking )


    //////////////////// #NG: Needs to be looked at again - Search.
    ///// Get Event List. 
    const eventList = opGetEventList( eventListId )
    if ( eventList.error !== false ) return opConsoleDebug( debug, 'eventList:', eventList.response )

    ///// Get Event Item. 
    const eventItem = eventList.response
    opConsoleDebug( debug, 'eventItem:', eventItem )


    //////////////////// #NG: Needs to be looked at again - Search.
    ///// Get Template Item. 
    const templateItem = opGetTemplate( eventItem.eventTemplate )
    if ( templateItem.error !== false ) return opConsoleDebug( debug, 'templateItem:', templateItem.response )

    ///// Get Template. 
    const template = templateItem.response
    opConsoleDebug( debug, 'template:', template )


    //////////////////// #NG: Needs to be looked at again - Search.
    ///// Get Participant Item. 
    const participantItem = opGetParticipant( eventListId, participantId )
    if ( participantItem.error !== false ) return opConsoleDebug( debug, 'participantItem:', participantItem.response )

    ///// Get Participant. 
    const participant = participantItem.response
    opConsoleDebug( debug, 'participant:', participant )
   
    ///// Create Variables.
    let bookingCode = booking.bookingId
    let layout = template.templateLayout
    let imageFilename = template.templateFilenameUploaded
    let string1 = participant.line1
    let string2 = participant.line2
    let string3 = participant.line3
    let string4 = participant.line4
    let string5 = participant.line5

    ///// The URL to the API.
    let  url = `${ opGetFastApiInfo( 'url' ) }name_tags/${ bookingCode }?layout=${ layout }`

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
    ////* GET, POST, PUT, DELETE, etc.
    let options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'access_token': opGetFastApiInfo( 'token' )
        },
        body: bodyInput
    }
    

    ///// Request the data from the API.
    ///// fetchAPI( *url, options, 'blob/json', debug ).
    let request = fetchAPI( url, options, 'json', debug )
    
    ///// Wait for Response of the Request.
    let fetchResponse = await request
    opConsoleDebug( debug, 'fetchResponse:', fetchResponse )

    const fetchResponseValidation = validateFetchResponse( fetchResponse )
    opConsoleDebug( debug, 'fetchResponseValidation:', fetchResponseValidation )

    ///// If the Fetch Response has an Error.
    if ( fetchResponseValidation.error !== false && validationElement ) return opConsoleDebug( debug, 'fetchResponseValidation:', fetchResponseValidation.response )

    ///// If the Fetch Response has Code 201 (Created).
    if ( fetchResponseValidation.code === 201 ) { 

        let eventPrintActive = block.getAttribute( 'data-print-active' )
        participantElement.querySelector( 'footer .op-message .op-text' ).innerText = eventPrintActive
        
        participantElement.classList.add( 'op-print-active' )

        let participantPrints = ( participant.prints + 1 )
        let dateNow = Date.now()

        ///// Update Participant. 
        const participantUpdate = opUpdateParticipant( eventListId, participantId, participantPrints, dateNow )
        if ( participantUpdate.error !== false ) return opConsoleDebug( debug, 'participantUpdate:', participantUpdate.response )
        
    
        participantElement.setAttribute( 'data-op-arrival', '1' )
        participantElement.setAttribute( 'data-op-prints', participantPrints )
        participantElement.querySelector( 'header .op-col-amount-of-prints' ).innerText = participantPrints
        participantElement.querySelector( 'header .op-col-arrival-time' ).innerText = opTimeConverter( dateNow, 'hour-min' )
        participantElement.querySelector( 'footer .op-col-arrival-time' ).innerText = opTimeConverter( dateNow, 'hour-min' )

        setTimeout( function () {
            let eventPrintSuccess = block.getAttribute( 'data-print-success' )
            participantElement.querySelector( 'footer .op-message .op-text' ).innerText = eventPrintSuccess
            participantElement.classList.remove( 'op-print-active' )
            participantElement.classList.add( 'op-active' )

            opEventInformationBlocks()
        }, 3000 );
        
    }
    
    
    //////////////////////////////////////////
    ///// #NG Below must be changed later.
    //////////////////////////////////////////
    
    // If error:
    //participantElement.querySelector( 'footer .op-message .op-text' ).innerText = 'Error!!!'

    let windowUrl = `${ opGetFastApiInfo( 'url' ) + fetchResponseValidation.response.filename }`
    //window.open(windowUrl, '_blank').focus()

}

/* ------------------------------------------------------------------------
 #  6. Functions to ACF Custom Blocks
---------------------------------------------------------------------------
 >  6a. Block Functions
------------------------------------------------------------ */

/* ---------------------------------------------------------
 >  6b. Block Validation Functions
------------------------------------------------------------ */

/* ---------------------------------------------------------
 >  6c. Blocks
------------------------------------------------------------
 >  6c-1. Log In/Out Button
--------------------------------------------- */
function opButtonLoginout( relocate, log ) {
    

    // #NG: Missing login validation


    if( ! log ) localStorage.removeItem('OP_PLUGIN_DATA_BOOKINGS')
    relocate = ! relocate ? window.location.origin : relocate
    window.location.href = relocate
}

/* ------------------------------------------
 >  6c-2. Toggle Button
--------------------------------------------- */
function opButtonToggle() {

    let blockElement = event.target.closest( 'section[id*="op-block"]' )
    let buttonElement = blockElement.querySelector('.button-toggle')
    let placementElement
    let placement = buttonElement.getAttribute( 'data-target' )
    let ariaExpanded = buttonElement.getAttribute( 'aria-expanded' )
    let bodyClass = 'showing-button-toggle-modal'

    function opPlacementElementParent() {
        placementElement = blockElement.parentElement
    }
    
   if ( placement === 'sibling-before' ) {
        placementElement = blockElement.previousElementSibling
        if ( ! placementElement ) {
            opPlacementElementParent()
        }
    } else if ( placement === 'sibling-after' ) {
        placementElement = blockElement.nextElementSibling
        if ( ! placementElement ) {
            opPlacementElementParent()
        }
    } else {
        opPlacementElementParent()
    }

    if ( ariaExpanded === 'false' ) {
        document.body.classList.add( bodyClass )
        buttonElement.setAttribute( 'aria-expanded', true )
        placementElement.setAttribute( 'data-button-toggle-active', true )
    } else {
        document.body.classList.remove( bodyClass )
        buttonElement.setAttribute( 'aria-expanded', false )
        placementElement.setAttribute( 'data-button-toggle-active', false )
    }

}

/* ---------------------------------------------------------
 >  6c-3. Booking Information
 *  Check if multiple (Booking Information) Blocks is on page
------------------------------------------------------------ */
function opBookingInformationBlocks() {

    ///// Debug the function
    let debug = false // true or false 

    ///// Get the elements.
    let blocks = document.querySelectorAll( '.op-booking-information' )
    opConsoleDebug( debug, 'blocks:', blocks )

    ///// Get each Block.
    if ( blocks ) {
        blocks.forEach( block => {


            // #NG: Missing login validation

            
            let blockId = block.getAttribute( 'id' )
            //let container = block.querySelector( `#${ blockId }-radio-input` )

            ///// Validate Local Storage of Bookings.
            const bookingsStorageValidation = opValidateLocalStorage( 'Bookings' )
            opConsoleDebug( debug, 'bookingsStorageValidation:', bookingsStorageValidation )
            if ( bookingsStorageValidation.error !== false ) return opValidationReturn( validationElement, bookingsStorageValidation.response )

            const bookingInformation = bookingsStorageValidation.response.bookingList[0].booking

            let bookingStartDate = opTimeConverter( bookingInformation.bookingStartDate, 'date-month-year', 'da' )
            let bookingEndDate = opTimeConverter( bookingInformation.bookingEndDate, 'date-month-year', 'da' )

            let bookingStartDateFull = opTimeConverter( bookingInformation.bookingStartDate, 'full' )
            let bookingEndDateFull = opTimeConverter( bookingInformation.bookingEndDate, 'full' )

            block.querySelector('.booking-code .text').innerHTML = bookingInformation.bookingId
            block.querySelector('.booking-start-date .text').innerHTML = bookingStartDate
            block.querySelector('.booking-end-date .text').innerHTML = bookingEndDate
            block.querySelector('.booking-start-date .text').setAttribute('datetime', bookingStartDateFull)
            block.querySelector('.booking-end-date .text').setAttribute('datetime', bookingEndDateFull)

        })
    }
}

/* ---------------------------------------------------------
 >  6c-4. Printer Information
 *  Check if multiple (Printer Information) Blocks is on page
------------------------------------------------------------ */
function opPrinterInformationBlocks() {

    ///// Debug the function
    let debug = false // true or false 

    ///// Get the elements.
    let blocks = document.querySelectorAll( '.op-printer-information' )
    opConsoleDebug( debug, 'blocks:', blocks )

    ///// Get each Block.
    if ( blocks ) {
        blocks.forEach( block => {


            // #NG: Missing login validation

            
            let blockId = block.getAttribute( 'id' )
            //let container = block.querySelector( `#${ blockId }-radio-input` )

            ///// Validate Local Storage of Bookings.
            const bookingsStorageValidation = opValidateLocalStorage( 'Bookings' )
            opConsoleDebug( debug, 'bookingsStorageValidation:', bookingsStorageValidation )
            if ( bookingsStorageValidation.error !== false ) return opValidationReturn( validationElement, bookingsStorageValidation.response )

            const bookingInformation = bookingsStorageValidation.response.bookingList[0].booking

            block.querySelector('.printer-id .text').innerHTML = bookingInformation.printerId

        })
    }
}

/* ---------------------------------------------------------
 >  6c-5. Event Information
 *  Check if multiple (Event Information) Blocks is on page
------------------------------------------------------------ */
function opEventInformationBlocks() {

    ///// Debug the function
    let debug = false // true or false 

    ///// Get the elements.
    let blockName = 'Event Information'
    let blocks = document.querySelectorAll( '.op-event-information' )
    opConsoleDebug( debug, 'blocks:', blocks )

    ///// Get each Block.
    if ( blocks ) {
        blocks.forEach( block => {
            
            ///// Get Event Id. 
            let eventListId = block.getAttribute( 'data-event-id' )


            // #NG: Missing login validation


            ///// Validate Local Storage of Events.
            const eventsStorageValidation = opValidateLocalStorage( 'Events' )
            opConsoleDebug( debug, 'eventsStorageValidation:', eventsStorageValidation )
            if ( eventsStorageValidation.error !== false ) return opValidateBlock( block, blockName, eventsStorageValidation.response )

            ///// Get Event List. 
            const eventList = eventsStorageValidation.response.eventList
            opConsoleDebug( debug, 'eventList:', eventList )

            ///// Validate Event List. 
            if ( ! eventList || ! eventList[0] ) return opValidateBlock( block, blockName, 'No Events have been created yet!' )
            
            ///// Filter Event Items. 
            let eventItems = eventList.filter( event => event.eventCreationDate === Number( eventListId ) )
            opConsoleDebug( debug, eventListId+':', eventItems )
            
            ///// Validate Event Item. 
            if ( ! eventItems[0] ) return opValidateBlock( block, blockName, 'No Event Information could be found to display!' )
        
            ///// Get Event Participants. 
            let participants = eventItems[0].eventParticipants

            ///// Filter Event Participants.
            let participantItems = participants.filter( participant => participant.active === 1 )
            opConsoleDebug( debug, 'participantItems', participantItems )

            ///// Add to Elements.
            block.querySelector('.event-name .text').innerHTML = eventItems[0].eventName
            block.querySelector('.event-participants-total .text').innerHTML = participants.length
            block.querySelector('.event-participants-registered .text').innerHTML = participantItems.length

        })
    }
}

/* ---------------------------------------------------------
 >  6c-6. Event Template Information
 *  Check if multiple (Event Template Information) Blocks is on page
------------------------------------------------------------ */
function opEventTemplateInformationBlocks() {

    ///// Debug the function
    let debug = false // true or false 

    ///// Get the elements.
    let blockName = 'Event Template Information'
    let blocks = document.querySelectorAll( '.op-event-template-information' )
    opConsoleDebug( debug, 'blocks:', blocks )

    ///// Get each Block.
    if ( blocks ) {
        blocks.forEach( block => {
            
            ///// Get Event Id. 
            let eventListId = block.getAttribute( 'data-event-id' )


            // #NG: Missing login validation


            ///// Validate Local Storage of Events.
            const eventsStorageValidation = opValidateLocalStorage( 'Events' )
            opConsoleDebug( debug, 'eventsStorageValidation:', eventsStorageValidation )
            if ( eventsStorageValidation.error !== false ) return opValidateBlock( block, blockName, eventsStorageValidation.response )

            ///// Get Event List. 
            const eventList = eventsStorageValidation.response.eventList
            opConsoleDebug( debug, 'eventList:', eventList )

            ///// Validate Event List. 
            if ( ! eventList || ! eventList[0] ) return opValidateBlock( block, blockName, 'No Events have been created yet!' )
            
            ///// Filter Event Items. 
            let eventItems = eventList.filter( event => event.eventCreationDate === Number( eventListId ) )
            opConsoleDebug( true, eventListId+':', eventItems )
            
            ///// Validate Event Item. 
            if ( ! eventItems[0] ) return opValidateBlock( block, blockName, 'No Event Template Information could be found to display!' )


            ///// Get Template Item. 
            const templateItem = opGetTemplate( eventItems[0].eventTemplate )
            if ( templateItem.error !== false ) return opConsoleDebug( debug, 'templateItem:', templateItem.response )

            ///// Get Template. 
            const template = templateItem.response
            opConsoleDebug( true, 'template:', template )

            ///// Add to Elements.
            block.querySelector('.op-template-name .op-text').innerHTML = template.templateName
            block.querySelector('.op-template-layout .op-text').innerHTML = template.templateLayout
            block.querySelector('.op-template-logo .op-text').innerHTML = template.templateFilenameOriginal
        })
    }
}

/* ---------------------------------------------------------
 >  6c-7. Event Participant List
 *  Check if multiple (Event Participant List) Blocks is on page
------------------------------------------------------------ */
function opEventParticipantListBlocks() {

    ///// Debug the function
    let debug = false // true or false 

    ///// Get the elements.
    let blockName = 'Event Participant List'
    let blocks = document.querySelectorAll( '.op-event-participant-list' )
    opConsoleDebug( debug, 'blocks:', blocks )

    ///// Get each Block.
    if ( blocks ) {
        blocks.forEach( block => {
            
            ///// Get Event Id. 
            let eventListId = block.getAttribute( 'data-event-id' )

            ///// Get the elements.
            let participantListElement = block.querySelector( '.op-participant-rows' )


            // #NG: Missing login validation


            ///// Validate Local Storage of Events.
            const eventsStorageValidation = opValidateLocalStorage( 'Events' )
            opConsoleDebug( debug, 'eventsStorageValidation:', eventsStorageValidation )
            if ( eventsStorageValidation.error !== false ) return opValidateBlock( block, blockName, eventsStorageValidation.response )

            ///// Get Event List. 
            const eventList = eventsStorageValidation.response.eventList
            opConsoleDebug( debug, 'eventList:', eventList )

            ///// Validate Event List.
            if ( ! eventList || ! eventList[0] ) return opValidateBlock( block, blockName, 'No Events have been created yet!' )
            
            ///// Filter Event Items.
            let eventItems = eventList.filter( event => event.eventCreationDate === Number( eventListId ) )
            opConsoleDebug( debug, eventListId+':', eventItems )
            
            ///// Validate Event Item. 
            if ( ! eventItems[0] ) return opValidateBlock( block, blockName, 'No Event Information could be found to display!' )
        
            ///// Get Event Participants. 
            let participants = eventItems[0].eventParticipants

            //opConsoleDebug( true, 'participants:', participants )
           
            participantListElement.innerHTML = ''
            let eventPrintSuccess = block.getAttribute( 'data-print-success' )

            ///// Create Participant variables. 
            let participantId, participantline1, participantline2, participantline3, participantline4, participantline5, participantPrints, participantTimeFull, participantTimeHour, participantActive, participantElement
            
            ///// For each Participant create Participant Element. 
            for( var i = 0; i < participants.length; i++ ) {

                participantId = participants[i].id
                participantline1 = participants[i].line1
                participantline2 = participants[i].line2
                participantline3 = participants[i].line3
                participantline4 = participants[i].line4
                participantline5 = participants[i].line5
                participantPrints = participants[i].prints
                participantTimeFull = opTimeConverter( participants[i].time, 'full' )
                participantTimeHour = opTimeConverter( participants[i].time, 'hour-min' )
                participantActive = participants[i].active
                
                participantElement = `
                    <article class="op-participant_${ participantId }" data-op-arrival="${ participantActive }" data-op-prints="${ participantPrints }" onclick="opToggleActive( 'class', 'op-participant_' )">
                        <header>
                            <p class="op-col-icon" data-icon="user">
                                <span class="op-icon" role="img" aria-label="User Icon"></span>
                            </p>
                            <div class="op-col-lines">
                                <p class="op-col-line-1">
                                    <span class="op-label">1</span>
                                    <span class="op-text">${ participantline1 }</span>
                                </p>
                                <p class="op-col-line-2">
                                    <span class="op-label">2</span>
                                    <span class="op-text">${ participantline3 }</span>
                                </p>
                                <p class="op-col-line-3">
                                    <span class="op-label">3</span>
                                    <span class="op-text">${ participantline2 }</span>
                                </p>
                            </div>
                            <time class="op-col-arrival-time" datetime="${ participantTimeFull }">${ participantTimeHour }</time>
                            <div class="op-col-print-info">
                                <button class="op-participant-print op-button op-button-size-medium op-button-style-solid" data-color="primary-90" data-icon="print" data-icon-position="left" onclick="opPrintParticipant('${participantId}'); return false"><span class="op-icon" role="img" aria-label="Printer Icon"></span><span class="op-button-title">Print</span></button>
                                <p class="op-col-amount-of-prints">${ participantPrints }</p>
                            </div>
                        </header>
                        <footer>
                            <p class="op-message" data-icon="user">
                                <span class="op-icon" role="img" aria-label="User Icon"></span>
                                <span class="op-text">${ eventPrintSuccess }</span>
                            </p>
                            <time class="op-col-arrival-time" datetime="${ participantTimeFull }" data-icon="clock">
                                <span class="op-icon" role="img" aria-label="Clock Icon"></span>
                                <span class="op-text">${ participantTimeHour }</span>
                            </time>
                        </footer>
                    </article>
                `

                ///// Add element to the container. 
                participantListElement.insertAdjacentHTML( 'afterbegin', participantElement )

            }

        })
    }
}




/* ------------------------------------------------------------------------
 #  7. Document is Ready
--------------------------------------------------------------------------- */
function opDocumentReady() {

    ///// Debug the function
    let debug = false // true or false

    try {

        ///// List of Function Names to be executed
        const functionNames = [
            'opBookingInformationBlocks',
            'opPrinterInformationBlocks',
            'opEventInformationBlocks',
            'opEventTemplateInformationBlocks',
            'opEventParticipantListBlocks'
        ]

        ///// Check if the Functions exist and execute
        const functionValidation = opCheckFunctionExist ( functionNames, true )
        if ( functionValidation.error !== false ) throw functionValidation       

    } catch ( error ) {
        opConsoleDebug( debug, 'opDocumentReady:', error )
    }
}
opListener( 'load', window, opDocumentReady )