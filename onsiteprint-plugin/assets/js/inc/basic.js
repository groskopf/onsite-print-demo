/* ------------------------------------------------------------------------
 >  JS Part Name: Basic
 *  Basic functions to the OnsitePrint Plugin.
 ?  Updated: 2024-06-03 - 03:12 (Y:m:d - H:i)
 ?  Info: Added extra validation.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

    1. 	Console Log the Debug if true
    2. 	Return Response as JSON
    3. 	Time Converter
    4. 	Add Event Listener
    5. 	Universal Search in Array / JSON / Object
    6. 	Toggle Active Class
    7.  Fetch Data from API (Async function)
    8.  Retrieve GET parameters URL
    9.  Get Current Script
    10. Get Current Script Path
    11. Get Error Line in file

---------------------------------------------------------------------------
 #  1. Console Log the Debug if true
------------------------------------------------------------ */
export function opConsoleDebug( debug, response ) {
    if ( debug ) console.debug( 'DEBUG:', response )
}

/* ---------------------------------------------------------
 #  2. Return Response as JSON
------------------------------------------------------------ */
export function opReturnResponse( error, code, response, debug ) {
    ///// Debug to the Console Log.
    if ( debug ) console.debug( 'DEBUG:', response )
    return {
        error : error,
        code : code,
        response : response
    }
}

/* ---------------------------------------------------------
 #  3. Time Converter
------------------------------------------------------------ */
export function opTimeConverter( timestamp, display, language ){
    
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
        time = `${date}. ${monthName}. ${year} - ${hour}:${min}:${sec}`
    } else if ( display == 'full' ) {
        time = `${year}-${month}-${date} ${hour}:${min}:${sec}`
    }

    return time

}

/* ---------------------------------------------------------
 #  4. Add Event Listener
 *  Cross-browser implementation of element.addEventListener()
 *  Use: opListener( 'event name', element, function )
------------------------------------------------------------ */
export function opListener( evnt, elem, func ) {
    if ( elem.addEventListener )  // W3C DOM
        elem.addEventListener( evnt, func, false )
    else if ( elem.attachEvent ) { // IE DOM
         var r = elem.attachEvent( 'on'+evnt, func )
         return r
    }
    else opConsoleDebug( true, 'opListener:', 'Something went wrong with the request!' )
}

/* ---------------------------------------------------------
 #  5. Universal Search in Array / JSON / Object
------------------------------------------------------------ */
export function opUniversalSearch( element, objectData = [], combinations = [] ) {
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
 #  6. Toggle Active Class
------------------------------------------------------------ */
export function opToggleActive( type, closestElement, toggleClassName ) {
    if ( type == 'class') {
        closestElement = `[class*="${ closestElement }"]`
    }
    
    if ( ! toggleClassName ) toggleClassName = 'op-active'

    if ( type == 'block') {
        let blockElement = event.target.closest( 'section[id*="op-block"]' )
        blockElement.querySelector( `.${ closestElement }` ).classList.toggle( toggleClassName )
    } else {
        event.target.closest( closestElement ).classList.toggle( toggleClassName )
    }
}

/* ---------------------------------------------------------
 #  7. Fetch Data from API (Async function)
------------------------------------------------------------ */
export async function opFetchDataFromApi( debug, url, options, output ) {

    ///// Create Variables.
    let error, code, message

    try {

        ///// Set the Parameter If the Debug is not defined.
        if ( ! debug ) debug = false

        ///// Check for browser support of fetch in the window interface.
        if ( ! ( 'fetch' in window ) ) {
            throw 'Your Browser does not support The Fetch Function, please upgrade your browser.'
        }

        ///// Validate the Function Parameters.
        else if ( ! url ) throw `Missing the URL link in the Function Parameters!`
        else if ( ! output ) throw `Missing the Output in the Function Parameters!`
        else {

            ///// Get the Response from the API via Fetch.
            const fetchResponse = await fetch( url, options )
                       
            ///// Console Log if the Debug parameter is 'true'.
            opConsoleDebug( debug, `fetchResponse:`, fetchResponse )

            ///// Create Approved Response.
            code = fetchResponse.status, error = false
            
            ///// Validate the Fetch Response with the Status Code.
            if ( code >= 200 && code <= 299 ) {

                ///// Return the Data as a Blob or JSON.
                if ( output == 'blob' ) message = await fetchResponse.blob()
                else if ( output == 'json' ) message = await fetchResponse.json()
                else throw 'Could not find the Output Type!'

            } else if ( code >= 400 && code <= 499 ) throw await fetchResponse.json()
            else throw await fetchResponse.text()

        }
        
    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, message = errorMessage
        if ( ! code ) code = 400
        
        ///// Throw Error Response in the Console.
        console.error( 'opFetchDataFromApi()', opReturnResponse( error, code, errorMessage ) )
        
    } finally {
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
    }

}

/* ---------------------------------------------------------
 #  8. Retrieve GET parameters URL
------------------------------------------------------------ */
export function opGetUrlParameters() {

    function transformToAssocArray( prmstr ) {
        let params = {}
        let prmarr = prmstr.split('&')
        for ( let i = 0; i < prmarr.length; i++) {
            let tmparr = prmarr[i].split('=')
            params[tmparr[0]] = tmparr[1]
        }
        return params
    }

    let prmstr = window.location.search.substr(1)
    return prmstr != null && prmstr != '' ? transformToAssocArray( prmstr ) : {}
}

/* ---------------------------------------------------------
 #  9. Get Current Script
------------------------------------------------------------ */
export function opGetCurrentScript() {
    if ( document.currentScript ) {
        return document.currentScript.src
    } else {
        //var scripts = document.getElementsByTagName('script')
        //return scripts[scripts.length - 1].src
        return document.getElementById('onsiteprint-elements-js').src
    }
}

/* ---------------------------------------------------------
 #  10. Get Current Script Path
------------------------------------------------------------ */
export function opGetCurrentScriptPath() {
    var script = opGetCurrentScript()
    var path = script.substring(0, script.lastIndexOf('/'))
    return path
}

/* ---------------------------------------------------------
 #  11. Get Error Line in file
------------------------------------------------------------ */
export function errorLine() {
    var e = new Error();
    if (!e.stack) try {
        // IE requires the Error to actually be throw or else the Error's 'stack'
        // property is undefined.
        throw e;
    } catch (e) {
        if (!e.stack) {
            return 0; // IE < 10, likely
        }
    }
    var stack = e.stack.toString().split(/\r\n|\n/);
    // We want our caller's frame. It's index into |stack| depends on the
    // browser and browser version, so we need to search for the second frame:
    var frameRE = /:(\d+):(?:\d+)[^\d]*$/;
    do {
        var frame = stack.shift();
    } while (!frameRE.exec(frame) && stack.length);
    return frameRE.exec(stack.shift())[1];
  }
