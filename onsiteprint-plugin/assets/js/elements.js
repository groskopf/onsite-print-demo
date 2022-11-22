/* ------------------------------------------------------------------------

 *  Plugin Name: OnsitePrint Plugin
 *  Description: This is a JavaScript to the OnsitePrint Plugin.
 *  Author: Gerdes Group
 *  Author URI: https://www.clarify.nu/
 ?  Updated: 2022-11-22 - 15:27 (Y:m:d - H:i)

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
		g. 	Universal Search in Array / JSON / Object
		h. 	Toggle Active Class
        i.  Fetch from API (Async function)

    2. 	Validation Functions
        a. 	Fetch Response
        b. 	Local Storage
        c. 	OnsitePrint Blocks
        d. 	Return Validation in Element

	3. 	FastAPI Functions
        a. 	Get FastAPI Info
        b.  Fetch from FastAPI

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
 >  1g. Universal Search in Array / JSON / Object
------------------------------------------------------------ */
function opUniversalSearch( element, objectData = [], combinations = [] ) {
    // sniff out user input/search values and convert to lower-case
    const input = element.value.toLowerCase()

    // store the filtered results in : "const result"
    const result = objectData.filter( ( data ) => {
        // initialize a variable to store combos in : "let combinationQueries = ""
        let combinationQueries = ""

        // loop over the combo values paseed by users
        combinations.forEach( ( arg ) => {
            // first check if the current combo value exists in the object then ...
            // add them together
            combinationQueries +=
            data.hasOwnProperty( arg ) && data[ arg ].toLowerCase().trim() + " "
        })
        /*
            loop over current "Object keys" and return the first
            successful search match (".some()" at work here)
        */
        return Object.keys( data ).some( ( key ) => {
            /**
             * return first successful search query match but...
             * do not return if value is "undefined", "null", false, true,  and...
             * trim values to remove trailing whitespaces
             */
            return (
                ( data[ key ] !== undefined &&
                    data[ key ] !== null &&
                    /**
                     * activate/uncomment the feature/code below if you don't wanna filter by boolean values
                     * e.g isActive fields, or isActivated fields
                     */
                     data[key] !== false && data[key] == true &&
                    JSON.stringify( data[ key ] ).toLowerCase().trim().includes( input ) ) ||
                combinationQueries.trim().includes( input )
            )
        })
    })
    // function to recieve the result of the search query data
    return result
}

/* ---------------------------------------------------------
 >  1h. Toggle Active Class
------------------------------------------------------------ */
function opToggleActive( element, closestElement ) {
    if ( element == 'class') {
        closestElement = `[class*="${ closestElement }"]`
    }

    event.target.closest( closestElement ).classList.toggle('op-active')
}

/* ---------------------------------------------------------
 >  1i. Fetch from API (Async function)
------------------------------------------------------------ */
async function opFetchFromAPI( debug, url, options, output ) {

    ///// Check for browser support of fetch in the window interface.
    if ( ! ( 'fetch' in window ) ) {
        return opReturnResponse( true, 405, 'Your Browser does not support The Fetch Function, please upgrade your browser.' )
    }
    
    ///// Fetch from API.
    let request = await fetch( url, options )
        
    var error, code = request.status, message
    
    try {
        
        error = false

        if ( code >= 200 && code <= 299 ) {

            ///// Return the Data as a Blob or JSON.
            if ( output == 'blob' ) message = await request.blob()
            
            else if ( output == 'json' ) message = await request.json()
            
            else throw 'Missing Output parameter in function!'

        }
        
        else if ( code >= 400 && code <= 499 ) throw await request.json()
        
        else throw await request.text()
        
    } catch( errorMessage ) {
        error = true, message = errorMessage
    }

    if ( error !== false ) {
        opConsoleDebug( true, `Error FetchAPI:`, message )
    } else {
        opConsoleDebug( debug, `Debug FetchAPI:`, message )
        return opReturnResponse( error, code, message )
    }

}


/* ------------------------------------------------------------------------
 #  2. Validation Functions 
---------------------------------------------------------------------------
 >  2a. Validate Fetch Response
------------------------------------------------------------ */
function opValidateFetchResponse( debug, request ) {

    let error, code, message

    try {
        
        ///// If the Response is empty or undefined.
        if ( request.response == '' ) throw 'Empty string!'
        if ( request.response == undefined ) throw 'Undefined string!'

        ///// If the Response has detail.
        if ( request.response.detail ) throw request.response.detail

        error = request.error, code = request.code, message = request.response
    
    } catch( errorMessage ) {
        error = true, code = 400, message = errorMessage
    }

    if ( error !== false ) {
        opConsoleDebug( true, `Error Validate Response:`, message )
    } else {
        opConsoleDebug( debug, `Debug Validate Response:`, message )
        return opReturnResponse( error, code, message )
    }

}

/* ---------------------------------------------------------
 >  2b. Validate Local Storage
------------------------------------------------------------ */
function opValidateLocalStorage( debug, localStorageName ) {

    let error, code, message

    try {

        ///// If the Storage Name is missing.
        if ( ! localStorageName ) {
            throw 'Missing Local Storage Name!'
        }
    
        var storageName = localStorageName.toUpperCase()

        ///// Get Local Storages.
        let storage = JSON.parse( localStorage.getItem( `OP_PLUGIN_DATA_${ storageName }` ) )
        
        ///// Validate Local Storage.
        if ( storage ) {
            error = false, code = 200, message = storage
        } else if ( storage == '' || storage == undefined ) {
            if ( localStorageName === 'BOOKINGS' ){
                error = false, code = 204, message = { bookingList : [] }
            } else if ( localStorageName === 'TEMPLATES' ){
                error = false, code = 204, message = { templateList : [] }
            } else if ( localStorageName === 'EVENTS' ){
                error = false, code = 204, message = { eventList : [] }
            }
        } else {
            throw `Something went wrong with the Local Storage (${ storageName }) validation!`
        }

    } catch( errorMessage ) {
        error = true, code = 400, message = errorMessage
    }

    if ( error !== false ) {
        opConsoleDebug( true, `Local Storage (${ localStorageName }):`, message )
    } else {
        opConsoleDebug( debug, `Local Storage (${ localStorageName }):`, message )
        return opReturnResponse( error, code, message )
    }

}

/* ---------------------------------------------------------
 >  2c. Validate OnsitePrint Blocks
------------------------------------------------------------ */
function opValidateBlock( block, blockName, message ) {
    block.setAttribute( 'data-block-disable', true )
    validationElement = block.querySelector('.block__inner')
    validationElement.innerHTML = ''
    validationElement.insertAdjacentHTML( 'afterbegin', `<p class="validation-error flex-col"><span class="label">${ blockName }</span><span class="text">${ message }</span></p>` )
}

/* ---------------------------------------------------------
 >  2d. Return Validation in Element
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

/* ---------------------------------------------------------
 >  3b. Fetch from FastAPI
------------------------------------------------------------ */
function opFetchFromFastAPI( debug, method, bodyInput, url, type ) {
    return new Promise( resolve => {

        ///// Request Options for fetch.
        ////* method (GET, POST, PUT, DELETE, etc.)
        let options = {
            method: method,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'access_token': opGetFastApiInfo( 'token' )
            },
            body: bodyInput
        }
        
        ///// Request the data from the API and Validate data after.
        ///// fetchAPI( *url, options, 'blob/json', debug ).
        opFetchFromAPI( debug, url, options, type ).then( response => {
            resolve( opValidateFetchResponse( debug, response ) )           
        })
        
    })
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

    ///// Get Local Storage of Templates.
    const templatesStorage = opValidateLocalStorage( debug, 'Templates' )

    ///// Get Template List.
    const templateList = templatesStorage.response.templateList
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
    const eventsStorage = opValidateLocalStorage( debug, 'Events' )

    ///// Get Event List.
    const eventList = eventsStorage.response.eventList
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
    const eventsStorage = opValidateLocalStorage( debug, 'Events' )

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
    
    //////////////////// #NG: Missing login validation
    ///// Validate Local Storage of Bookings.
    const bookingsStorage = opValidateLocalStorage( debug, 'Bookings' )
    
    //////////////////// #NG: Needs to be looked at again - Search.
    ///// Get Booking.
    const booking = bookingsStorage.response.bookingList[0].booking
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

    ///// Fetch from the FastAPI.
    opFetchFromFastAPI( debug, 'POST', bodyInput, url, 'json' ).then( fetchResponse => {
        opConsoleDebug( debug, 'fetchResponse:', fetchResponse )

        ///// If the Fetch Response has Code 201 (Created).
        if ( fetchResponse.code === 201 ) { 
       
            let participantPrints = ( participant.prints + 1 )
            let dateNow = Date.now()
    
            ///// Update Participant in Local Storage. 
            const participantUpdate = opUpdateParticipant( eventListId, participantId, participantPrints, dateNow )
            if ( participantUpdate.error !== false ) return opConsoleDebug( debug, 'participantUpdate:', participantUpdate.response )
            
            ///// Update Event Participant List Block. 
            let eventPrintActive = block.getAttribute( 'data-print-active' )
            participantElement.querySelector( 'footer .op-message .op-text' ).innerText = eventPrintActive
            participantElement.classList.add( 'op-print-active' )
            participantElement.setAttribute( 'data-op-arrival', '1' )
            participantElement.setAttribute( 'data-op-prints', participantPrints )
            participantElement.querySelector( 'header .op-col-amount-of-prints' ).innerText = participantPrints
            participantElement.querySelector( 'header .op-col-arrival-time' ).innerText = opTimeConverter( dateNow, 'hour-min' )
            participantElement.querySelector( 'footer .op-col-arrival-time .op-text' ).innerText = opTimeConverter( dateNow, 'hour-min' )
    
            setTimeout( function () {
                let eventPrintSuccess = block.getAttribute( 'data-print-success' )
                participantElement.querySelector( 'footer .op-message .op-text' ).innerText = eventPrintSuccess
                participantElement.classList.remove( 'op-print-active' )
                participantElement.classList.add( 'op-active' )
    
                ///// Update Event Information Blocks. 
                opEventInformationBlocks()
            }, 3000 );
            
            let windowUrl = `${ opGetFastApiInfo( 'url' ) + fetchResponse.response.filename }`
            opConsoleDebug( debug, 'windowUrl:', windowUrl )

        }
    
    })

    
    //////////////////// #NG: Below must be deleted later.    
    // If error:
    //participantElement.querySelector( 'footer .op-message .op-text' ).innerText = 'Error!!!'
    //let windowUrl = `${ opGetFastApiInfo( 'url' ) + request.response.filename }`
    //window.open(windowUrl, '_blank').focus()

}

/* ---------------------------------------------------------
 >  5a. Print All Participants
------------------------------------------------------------ */
function opPrintEventParticipants( eventListId ) {

    ///// Debug the function
    let debug = false // true or false 

    ///// Get the elements.
    let block = event.target.closest( 'section[id*="op-block_"]' )
    
    ///// Get Id's. 
    let blockId = block.getAttribute( 'id' ).substring(9)
    
    //////////////////// #NG: Missing login validation
    ///// Validate Local Storage of Bookings.
    const bookingsStorage = opValidateLocalStorage( debug, 'Bookings' )
    
    //////////////////// #NG: Needs to be looked at again - Search.
    ///// Get Booking.
    const booking = bookingsStorage.response.bookingList[0].booking
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
    const participantList = eventItem.eventParticipants
    let eventName = eventItem.eventName

    let pageTitle = `Event_${ eventName.replace(/ /g, '-') }`
    
    printWindow = window.open( '', 'PRINT', 'height=' + screen.height + ',width=' + screen.width )
    printWindow.document.write( `<html><head><title>${ pageTitle }</title><link rel="stylesheet" id="onsiteprint-plugin-styles-css" href="http://onsiteprint.dk/wp-content/plugins/onsiteprint-plugin/assets/css/onsiteprint-styles.css" media="all"></head>` )
    printWindow.document.write( '<body onafterprint="self.close()">' )

    let strings = [ 'Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5' ]
    
    let header = `<h3><b>Event:</b> ${ eventItem.eventName } | <b>OnsitePrint.dk</b></h3>`

    let colInfo = block.querySelector( '.op-participant-col-info' ).textContent
    let rowList = block.querySelectorAll( '.op-participant-rows article' )

    ///// Add element to the container.
    printWindow.document.write( `
        <table id="op-block class="pdf-container">
            <thead class="pdf-header">
                <tr><th class="pdf-header-cell">
                    <div class="header-info">${ header }${ colInfo }</div>
                </th></tr>
            </thead>
            <tfoot class="pdf-footer">
                <tr><td class="pdf-footer-cell">
                    <div class="footer-info">${ colInfo }</div>
                </td></tr>
            </tfoot>
            <tbody class="pdf-content">
        `
    )

    for(let i = 0; i< rowList.length; i++){
        printWindow.document.write( `<tr class="pdf-row"><td>${i+1}</td><td>${rowList[i].textContent}</td></tr>` );
    }

    printWindow.document.write( '</tbody></table></body></html>' );

    printWindow.print()
    printWindow.close()

    return false

}

/* ------------------------------------------------------------------------
 #  6. Functions to ACF Custom Blocks
---------------------------------------------------------------------------
 >  6a. Block Functions
------------------------------------------------------------
 >  6a-1. Add Event Participant to Block
--------------------------------------------- */
function opAddEventParticipant( debug, block, participant ) {

    ///// Get the elements.
    let eventPrintSuccess = block.getAttribute( 'data-print-success' )
    let eventPrintButton = block.getAttribute( 'data-print-button' )

    ///// Debug the function.
    opConsoleDebug( debug, 'participant:', participant )
    opConsoleDebug( debug, 'eventPrintSuccess:', eventPrintSuccess )

    //////////////////// #NG: Missing Layout Information.

    ///// Create Participant variables.
    let participantId, participantline1, participantline2, participantline3, participantline4, participantline5, participantPrints, participantTimeFull, participantTimeHour, participantActive, participantElement

    participantId = participant.id
    participantline1 = participant.line1
    participantline2 = participant.line2
    participantline3 = participant.line3
    participantline4 = participant.line4
    participantline5 = participant.line5
    participantPrints = participant.prints
    participantTimeFull = opTimeConverter( participant.time, 'full' )
    participantTimeHour = opTimeConverter( participant.time, 'hour-min' )
    participantActive = participant.active
    
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
                        <span class="op-text">${ participantline2 }</span>
                    </p>
                    <p class="op-col-line-3">
                        <span class="op-label">3</span>
                        <span class="op-text">${ participantline3 }</span>
                    </p>
                </div>
                <time class="op-col-arrival-time" datetime="${ participantTimeFull }">${ participantTimeHour }</time>
                <div class="op-col-print-info">
                    <button class="op-participant-print op-button op-button-size-medium op-button-style-solid" data-color="primary-90" data-icon="print" data-icon-position="left" onclick="opPrintParticipant('${participantId}'); return false"><span class="op-icon" role="img" aria-label="Printer Icon"></span><span class="op-button-title">${ eventPrintButton }</span></button>
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

    return new Promise( resolve => {
        resolve( { element: participantElement } )
    })

}

/* ------------------------------------------
 >   >  6a-2. Add Search Filter to the Event Participants List block
--------------------------------------------- */
function opAddSearchFilter( debug, block, templateId ) {

    let error, code, message

    try {

        ///// Get the elements.
        let filterElement = block.querySelector( '.op-filter-options' )

        ///// Get Template Item.
        const templateItem = opGetTemplate( templateId )
        if ( templateItem.error !== false ) return opConsoleDebug( debug, 'templateItem:', templateItem.response )

        ///// Get Template Layout.
        const templateLayout = templateItem.response.templateLayout
        opConsoleDebug( debug, 'templateLayout:', templateLayout )

        let numberOfLines = templateLayout.charAt(7)
        let lineNames = [ 'Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5' ]
        let blockId = block.getAttribute( 'id' )

        for ( let i = 0; i < numberOfLines; i++ ) {
            opConsoleDebug( debug, `Column ${i+1}:`, lineNames[i] )

            ///// Create Radio Element.
            let filterRadioElement = `                             
                <label for="${ blockId }__filter-input-${ i+1 }" class="op-filter-input-label" onclick="opToggleSearchFilter('${ i+1 }')">
                    <input type="radio" id="${ blockId }__filter-input-${ i+1 }" name="op-filter-input" value="${ i+1 }">
                    <span class="op-check"></span>
                    <span class="op-text">${ lineNames[i] }</span>
                </label>
            `

            ///// Add element to the container.
            filterElement.insertAdjacentHTML( 'beforeEnd', filterRadioElement )

        }

        error = false, code = 200, message = 'Search Filter was added.'
        
    } catch( errorMessage ) {
        error = true, code = 400, message = errorMessage
    }

    if ( error !== false ) {
        opConsoleDebug( true, `Error Validate Response:`, message )
    } else {
        opConsoleDebug( debug, `Debug Validate Response:`, message )
        return opReturnResponse( error, code, message )
    }

}

/* ------------------------------------------
 >   >  6a-2. Toggle Filter Search of Event Participants
--------------------------------------------- */
function opToggleSearchFilter( filterId ) {

    ///// Get the elements.
    let block = event.target.closest( 'section[id*="op-block"]' )
    let blockId = block.getAttribute( 'id' )
    let filterInputText = block.querySelector( `[for="${ blockId }__filter-input-${ filterId }"] .op-text` ).innerText

    block.querySelector( '.op-filter-label .op-button-title' ).innerText = filterInputText
    block.querySelector( '[name="op-filter-button"]').checked = false

    opSearchEventParticipants()

}

/* ------------------------------------------
 >   >  6a-3. Search after Event Participants
--------------------------------------------- */
function opSearchEventParticipants() {

    ///// Debug the function
    let debug = false // true or false

    ///// Get the elements.
    let block = event.target.closest( 'section[id*="op-block"]' )
    opConsoleDebug( debug, 'block:', block )

    let formElement = block.querySelector( '.op-search-form' )

    let searchInput = formElement['op-search-input']
    opConsoleDebug( debug, 'searchInput:', searchInput.value )

    let filterInput = formElement['op-filter-input'].value == 0 ? [ 'line1', 'line2', 'line3','line4', 'line5' ] : [ `line${formElement['op-filter-input'].value}` ]
    opConsoleDebug( debug, 'filterInput:', filterInput )
    


    

    ///// Get Event Id. 
    let eventListId = block.getAttribute( 'data-event-id' )

    ///// Get the elements.
    let participantListElement = block.querySelector( '.op-participant-rows' )

    
    //////////////////// #NG: Missing login validation


    ///// Validate Local Storage of Events.
    const eventsStorage = opValidateLocalStorage( debug, 'Events' )

    ///// Get Event List. 
    const eventList = eventsStorage.response.eventList
    opConsoleDebug( debug, 'eventList:', eventList )

    ///// Validate Event List.
    if ( ! eventList || ! eventList[0] ) return opValidateBlock( block, blockName, 'No Events have been created yet!' )
    
    ///// Filter Event Items.
    let eventItems = eventList.filter( event => event.eventCreationDate === Number( eventListId ) )
    opConsoleDebug( debug, eventListId+':', eventItems )
    
    ///// Validate Event Item. 
    if ( ! eventItems[0] ) return opValidateBlock( block, blockName, 'No Event Information could be found to display!' )

    ///// Get Event Participants. 
    let participantList = eventItems[0].eventParticipants

    const participants = opUniversalSearch( searchInput, participantList , filterInput )
    opConsoleDebug( debug, 'search:', participants )
    
    participantListElement.innerHTML = ''
    
    ///// For each Participant create Participant Element.
    for( let i = 0; i < participants.length; ++i ) {

        opAddEventParticipant( debug, block, participants[i] ).then( response => {
            opConsoleDebug( debug, 'Response:', response )
            participantListElement.insertAdjacentHTML( 'afterbegin', response.element )
        })

    }

}

/* ---------------------------------------------------------
 >  6b. Block Validation Functions
------------------------------------------------------------ */

/* ---------------------------------------------------------
 >  6c. Blocks
------------------------------------------------------------
 >  6c-1. Log In/Out Button
--------------------------------------------- */
function opButtonLoginout( relocate, log ) {
    

    //////////////////// #NG: Missing login validation


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

            //////////////////// #NG: Missing login validation
            ///// Validate Local Storage of Bookings.
            const bookingsStorage = opValidateLocalStorage( debug, 'Bookings' )

            //////////////////// #NG: Needs to be looked at again - Search.
            const bookingInformation = bookingsStorage.response.bookingList[0].booking

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

            //////////////////// #NG: Missing login validation
            ///// Validate Local Storage of Bookings.
            const bookingsStorage = opValidateLocalStorage( debug, 'Bookings' )

            //////////////////// #NG: Needs to be looked at again - Search.
            const bookingInformation = bookingsStorage.response.bookingList[0].booking

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


            //////////////////// #NG: Missing login validation


            ///// Validate Local Storage of Events.
            const eventsStorage = opValidateLocalStorage( debug, 'Events' )

            ///// Get Event List. 
            const eventList = eventsStorage.response.eventList
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


            //////////////////// #NG: Missing login validation


            ///// Validate Local Storage of Events.
            const eventsStorage = opValidateLocalStorage( debug, 'Events' )

            ///// Get Event List. 
            const eventList = eventsStorage.response.eventList
            opConsoleDebug( debug, 'eventList:', eventList )

            ///// Validate Event List. 
            if ( ! eventList || ! eventList[0] ) return opValidateBlock( block, blockName, 'No Events have been created yet!' )
            
            ///// Filter Event Items. 
            let eventItems = eventList.filter( event => event.eventCreationDate === Number( eventListId ) )
            opConsoleDebug( debug, eventListId+':', eventItems )
            
            ///// Validate Event Item. 
            if ( ! eventItems[0] ) return opValidateBlock( block, blockName, 'No Event Template Information could be found to display!' )


            ///// Get Template Item. 
            const templateItem = opGetTemplate( eventItems[0].eventTemplate )
            if ( templateItem.error !== false ) return opConsoleDebug( debug, 'templateItem:', templateItem.response )

            ///// Get Template. 
            const template = templateItem.response
            opConsoleDebug( debug, 'template:', template )

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
        

            //////////////////// #NG: Missing login validation


            ///// Validate Local Storage of Events.
            const eventsStorage = opValidateLocalStorage( debug, 'Events' )

            ///// Get Event List. 
            const eventList = eventsStorage.response.eventList
            opConsoleDebug( debug, 'eventList:', eventList )

            ///// Validate Event List.
            if ( ! eventList || ! eventList[0] ) return opValidateBlock( block, blockName, 'No Events have been created yet!' )
            
            ///// Filter Event Items.
            let eventItems = eventList.filter( event => event.eventCreationDate === Number( eventListId ) )
            opConsoleDebug( debug, `event-${eventListId}:`, eventItems )
            
            ///// Validate Event Item. 
            if ( ! eventItems[0] ) return opValidateBlock( block, blockName, 'No Event Information could be found to display!' )

            ///// Add Search Filter to the Event Participants List block. 
            const searchFilter = opAddSearchFilter( debug, block, eventItems[0].eventTemplate )
            opConsoleDebug( debug, 'searchFilter:', searchFilter )

            ///// Get Event Participants. 
            let participants = eventItems[0].eventParticipants
            opConsoleDebug( debug, 'participants:', participants )
           
            participantListElement.innerHTML = ''

            ///// For each Participant create Participant Element.
            for( let i = 0; i < participants.length; ++i ) {

                opAddEventParticipant( debug, block, participants[i] ).then( response => {
                    opConsoleDebug( debug, 'Response:', response )
                    participantListElement.insertAdjacentHTML( 'afterbegin', response.element )
                })

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