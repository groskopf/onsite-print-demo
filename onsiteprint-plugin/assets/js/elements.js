/* ------------------------------------------------------------------------

 *  Plugin Name: OnsitePrint Plugin
 *  Description: This is a JavaScript to the OnsitePrint Plugin.
 *  Author: Gerdes Group
 *  Author URI: https://www.clarify.nu/
 ?  Updated: 2024-03-31 - 01:57 (Y:m:d - H:i)
 ?  Info: opValidateContainerInputs(): Added Validation if an Input Element is Required and Changed the Array with Errors.

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
        e. 	Validation of Form
        f. 	Validation of Input in Form

	3. 	FastAPI Functions
        a. 	Get FastAPI Info
        b.  Fetch from FastAPI

	4. 	Local Storage Functions
        a. 	Get a Local Storage
        b. 	Bookings Storage
            1. 	Get Layouts with Booking Code
        c. 	Template Storage
            1. 	Get Template
            2. 	Create Template
        d. 	Events Storage
            1. 	Get Event List
            2. 	Get Participant
            3. 	Update Participant

	5. 	Print Functions
        a. 	Print Participant

	6. 	Functions to ACF Custom Blocks
		a. 	Block Functions
            1. 	Add Event Participant to Block
            2. 	Add Search Filter to the Event Participants List block
            3. 	Toggle Filter Search of Event Participants
            4. 	Search after Event Participants
            5. 	Clear Search
            6. 	Relocate to Page from Modal Window
            7. 	Go To Step in Form
		c. 	Blocks:
            1. 	Log In/Out Button
            2. 	Toggle Button
            3. 	Booking Information
            4. 	Print Information
            5. 	Event Information
            6. 	Event Template Information
            7. 	Event Participant List
            8. 	Template Creation

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



//// #NG - Need to be looked at again
var eventGridElement



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
        time = `${date}. ${monthName}. ${year} - ${hour}:${min}:${sec}`
    } else if ( display == 'full' ) {
        time = `${year}-${month}-${date} ${hour}:${min}:${sec}`
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
function opToggleActive( type, closestElement, toggleClassName ) {
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
 >  1i. Fetch Data from API (Async function)
------------------------------------------------------------ */
async function opFetchDataFromApi( debug, url, options, output ) {

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
 >  1j. Retrieve GET parameters URL
------------------------------------------------------------ */
function opGetUrlParameters() {

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
 >  1k. Get Current Script
------------------------------------------------------------ */
function opGetCurrentScript() {
    if ( document.currentScript ) {
        return document.currentScript.src
    } else {
        //var scripts = document.getElementsByTagName('script')
        //return scripts[scripts.length - 1].src
        return document.getElementById('onsiteprint-elements-js').src
    }
}

/* ---------------------------------------------------------
 >  1l. Get Current Script Path
------------------------------------------------------------ */
function opGetCurrentScriptPath() {
    var script = opGetCurrentScript()
    var path = script.substring(0, script.lastIndexOf('/'))
    return path
}


/* ------------------------------------------------------------------------
 #  2. Validation Functions 
---------------------------------------------------------------------------
 >  2a. Validate API Response
------------------------------------------------------------ */
function opValidateApiResponse( debug, request ) {

    ///// Create Variables.
    let error, code, message

    try {

        ///// Set the Parameter If the Debug is not defined.
        if ( ! debug ) debug = false

        ///// Validate the Function Parameters.
        if ( ! request ) throw `Missing the Request in the Function Parameters!`
        if ( request.response == '' ) throw 'The Request is an Empty string!'
        if ( request.response == undefined ) throw 'The Request is an Undefined string!'
        else {

            ///// Console Log if the Debug parameter is 'true'.
            opConsoleDebug( debug, `Validate API Response Request:`, request )

            ///// Create Approved Response.
            error = request.error, code = request.code, message = request.response

            ///// If the Response has detail.
            if ( request.response.detail ) throw 'The API Response has an Error!'
                    
        }
        
    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, message = errorMessage
        if ( ! code ) code = 400
        
        ///// Throw Error Response in the Console.
        console.error( 'opValidateApiResponse()', opReturnResponse( error, code, errorMessage ) )
        
    } finally {
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
    }

}

/* ---------------------------------------------------------
 >  2b. Validate Local Storage
------------------------------------------------------------ */
function opValidateLocalStorage( debug, storage, storageName ) {

    ///// Create Variables.
    let error, code, message

    try {

        ///// Validate Local Storage.
        if ( storage ) {
            error = false, code = 200, message = storage
        } else if ( storage == '' || storage == undefined ) {
            ///// #NG (2023-02-26) - Bookings are removed!
            if ( storageName === 'BOOKINGS' ){
                error = false, code = 204, message = { bookingList : [] }
            } else if ( storageName === 'TEMPLATES' ){
                error = false, code = 204, message = { templateList : [] }
            } else if ( storageName === 'EVENTS' ){
                error = false, code = 204, message = { eventList : [] }
            }
        } else {
            throw `Something went wrong with the Local Storage (${ storageName }) validation!`
        }

    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, code = 400, message = errorMessage

    }

    ///// Console Log if the Debug parameter is 'true'.
    opConsoleDebug( debug, `Validating of Local Storage:`, message )
    
    ///// Return the Response to the Function.
    return opReturnResponse( error, code, message )

}

/* ---------------------------------------------------------
 >  2c. Validate OnsitePrint Blocks
------------------------------------------------------------ */
function opValidateBlock( block, blockName, message ) {
    // #NG - Need to be automatic added (For each Language), maybe in a separate Local Storage.
    block.setAttribute( 'data-block-disable', true )
    validationElement = block.querySelector('.block__inner')
    validationElement.innerHTML = ''
    validationElement.insertAdjacentHTML( 'afterbegin', `<p class="validation-error flex-col"><span class="label">${ blockName }</span><span class="text">${ message }</span></p>` )
}

/* ---------------------------------------------------------
 >  2d. Adding Validation to the Elements
------------------------------------------------------------ */
function opAddValidationToElements( debug, container, elements, type ) {

    ///// Create Variables.
    let error, code, message
    
    try {

        ///// Set the Parameter If the Debug is not defined.
        if ( ! debug ) debug = false

        ///// Validate the Function Parameters.
        if ( ! container ) throw `Missing the Container Element in the Function Parameters!`
        else if ( ! elements ) throw `Missing the Elements in the Function Parameters!`
        else if ( ! type ) throw `Missing the Type in the Function Parameters!`
        else {

            ///// Add an Error for each Element.
            elements.forEach( element => {
                
                ///// Console Log if the Debug parameter is 'true'.
                opConsoleDebug( debug, 'Error Element:', element, )
                
                ///// Get Element Information.
                let inputId = element.id
                    
                ///// Get the elements.
                let inputElement = container.querySelector( `#${ inputId }` )
                let inputElementWrapper = inputElement.closest( '.op-input-wrapper' )
                
                // #NG - Need to be automatic added (For each Language), maybe in a separate Local Storage.
                //let inputMessage = element.message
                //let validationElement = inputElementWrapper.querySelector( '.op-input-validation .op-message' )
                
                ///// Set Attribute to Element.
                ////* 0 = default, 1 = approved, 2 = error.
                if ( type == 'error' ) {
                    inputElementWrapper.setAttribute( 'data-validation', '2' )
                } else if ( type == 'approve' ) {
                    inputElementWrapper.setAttribute( 'data-validation', '1' )
                } else {
                    inputElementWrapper.setAttribute( 'data-validation', '0' )
                }

            } )

            ///// Create Approved Response.
            error = false, code = 200, message = `The Validation was Added to the Elements!`
       
        }

    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, code = 400, message = errorMessage

    } finally {

        ///// Console Log if the Debug parameter is 'true'.
        opConsoleDebug( debug, `opAddValidationToElements():`, message )
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
    }

}

/* ---------------------------------------------------------
 >  2e. Validation of Container Inputs
------------------------------------------------------------ */
function opValidateContainerInputs( debug, container ) {
    
    ///// Create Variables.
    let error, code, message, arrayOfInputs = []

    try {

        ///// Set the Parameter If the Debug is not defined.
        if ( ! debug ) debug = false

        ///// Validate the Function Parameters.
        if ( ! container ) throw `Missing the Container Element in the Function Parameters!`
        else {
           
            ///// Get All Input Elements.
            let containerInputs = container.querySelectorAll( 'input[id*="op-block"]' )
            
            ///// Validate the Inputs in the Container.
            if ( ! containerInputs || containerInputs == 0 ) throw `Could not find any Inputs in the Container!`

            ///// Console Log if the Debug parameter is 'true'.
            opConsoleDebug( debug, 'Container Inputs:', containerInputs )

            ///// Add an Error for each Element.
            for( let i = 0; i < containerInputs.length; ++i ) {

                ///// Get Input Attributes.
                let inputId = containerInputs[i].getAttribute( 'id' )
                let inputType = containerInputs[i].getAttribute( 'type' )
                let inputName = containerInputs[i].getAttribute( 'name' )
                let inputRequired = containerInputs[i].required

                ///// Create Variables.
                let inputError = false, inputMessage = 'The input field is approved!'
                
                ///// Validate if the Input Element is Required.
                if ( inputRequired ) {
                
                    ///// Validate the Input Element.
                    if ( inputType == 'radio' && ! containerInputs[i].checked ) {
                        inputError = true , inputMessage = 'One of the Radio Buttons must be checked!'
                    } else if ( inputType == 'checkbox' && ! containerInputs[i].checked ) {
                        inputError = true , inputMessage = 'The Checkbox must be checked!'
                    } else if ( ! containerInputs[i].value || containerInputs[i].value.trim().length == 0 ) {
                        inputError = true , inputMessage = 'The input field is empty!'
                    } else if ( inputType == 'file' ) {

                        const fileValid = [ ...containerInputs[i].files ].every( file => {
                            if ( ! containerInputs[i].accept ) {
                            return true
                            }
                            return containerInputs[i].accept.replace( /\s/g, '' ).split( ',' ).filter( accept => {
                            return new RegExp( accept.replace( '*', '.\*' ) ).test( file.type )
                            } ).length > 0
                        } )

                        if ( fileValid !== true ) {
                            inputError = true , inputMessage = 'The File type is not valid!'
                        }                  

                    }
                    
                }

                ///// Push the Input into the Array of Inputs.
                arrayOfInputs.push( { error : inputError, id : inputId, type : inputType, name : inputName, message : inputMessage } )

            }
           
            ///// Create Variables.
            let inputsWithApproval = arrayOfInputs.filter( input => input.error == false )
            let inputsWithErrors = arrayOfInputs.filter( input => input.error == true && ! inputsWithApproval.some( approvalInput => approvalInput.name === input.name ) )

            /* console.table( arrayOfInputs )
            console.table( inputsWithApproval )
            console.table( inputsWithErrors ) */

            ///// Adding Error Validation to the Inputs.
            if ( Array.isArray( inputsWithErrors ) && inputsWithErrors.length !== 0 ) {
                
                let addErrorToElements = opAddValidationToElements( debug, container, inputsWithErrors, 'error' )
                
                if ( addErrorToElements.error !== false ) opConsoleDebug( debug, `opValidateContainerInputs(error):`, addErrorToElements.response )
                
            }
            
            ///// Adding Approval Validation to the Inputs.
            if ( Array.isArray( inputsWithApproval ) && inputsWithApproval.length !== 0 ) {

                let addApprovalToElements = opAddValidationToElements( debug, container, inputsWithApproval, 'approve' )

                if ( addApprovalToElements.error !== false ) opConsoleDebug( debug, `opValidateContainerInputs(approve):`, addApprovalToElements.response )

            }

            ///// Create Approved or Rejected Response.
            if ( Array.isArray( inputsWithErrors ) && inputsWithErrors.length === 0 ) {
                error = false, code = 200, message = `All Elements are Approved!`
            } else throw `One or more Elements has an Error!`
            
        }

    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, code = 400, message = errorMessage

    } finally {

        ///// Console Log if the Debug parameter is 'true'.
        opConsoleDebug( debug, `opValidateContainerInputs():`, message )
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
    }

}

/* ---------------------------------------------------------
 >  2f. Setting the Approval to the Buttons in the Form Element.
------------------------------------------------------------ */
function opSetApprovalToButtonsInForm( debug, fieldsetElement, type ) {
        
    ///// Create Variables.
    let error, code, message

    try {

        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( ! debug ) debug = false
        if ( ! fieldsetElement ) throw `Missing the Fieldset Container Element!`
        if ( ! type ) throw `Missing the Type in the Function Parameters!`

        ///// Get the elements.
        let formElement = fieldsetElement.closest( '.op-form-steps' )
        let fieldsetElements = formElement.querySelectorAll( 'fieldset[class*="op-fieldset-step"]' )
        let processButtons = formElement.querySelectorAll( '.op-form-process__inner button' )
        let directionButtons = formElement.querySelectorAll( '.op-form-directions button' )
        
        ///// Disabled or Enabled the Next Step Button.
        if ( type == 'remove' ) {

            ///// Disabled the Next Step Button.
            ////* Back = 0, Next = 1, Submit = 2
            directionButtons[1].disabled = true
            
        } else if ( type == 'add' ) {
            
            ///// Enabled the Next Step Button.
            ////* Back = 0, Next = 1, Submit = 2
            directionButtons[1].disabled = false

        }
        
        ///// Create Variables.
        let flow = true, flowCount = 0
        
        ///// Count Validated Fieldset Elements.
        for( let i = 0; i < fieldsetElements.length; ++i ) {
            if ( fieldsetElements[i].getAttribute( 'data-fieldset-validation' ) == 1 ) {
                ++flowCount
            } else break
        }
        
        ///// Set Count to element.
        formElement.querySelector( '.op-form-process' ).setAttribute( 'data-steps-validated', flowCount )
        
        ///// Validate Buttons for each Fieldset Element.      
        for( let i = 0; i < fieldsetElements.length; ++i ) {

            let fieldsetValidation = fieldsetElements[i].getAttribute( 'data-fieldset-validation' )
            
            ///// Set flow to true if Fieldset is validated.
            if ( fieldsetValidation == 1 && flow != false ) {
                flow = true
            } else {
                flow = false
            }

            ///// Disabled or Enabled the Submit Form Button.
            if ( type == 'add' && flow == true && flowCount == fieldsetElements.length ) {

                ///// Enabled the Submit Form Button.
                ////* Back = 0, Next = 1, Submit = 2
                directionButtons[2].disabled = false
                break

            } else {

                ///// Disabled the Submit Form Button.
                ////* Back = 0, Next = 1, Submit = 2
                directionButtons[2].disabled = true

            }

            ///// Disabled or Enabled the Process Buttons.
            if (  type == 'add' && flow == true ) {
                processButtons[ Number(i) + 1 ].disabled = false
            } else if ( flow == false && ( Number(i) + 1 ) !== fieldsetElements.length ) {
                processButtons[ Number(i) + 1 ].disabled = true
            }


        }
        
        ///// Create Approved Response.
        error = false, code = 200, message = `The Approval was Set to the Button Elements in the Form Element!`

    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, code = 400, message = errorMessage

    } finally {

        ///// Console Log if the Debug parameter is 'true'.
        opConsoleDebug( debug, `opSetApprovalToButtonsInForm():`, message )
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )

    }

}

/* ---------------------------------------------------------
 >  2f. Setting the Approval to the Step (Fieldset) Element in the Form Element.
------------------------------------------------------------ */
function opSetApprovalToStepInForm( debug, fieldsetElement, type ) {
        
    ///// Create Variables.
    let error, code, message

    try {

        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( ! debug ) debug = false
        if ( ! fieldsetElement ) throw `Missing the Fieldset Container Element!`
        if ( ! type ) throw `Missing the Type in the Function Parameters!`

        ///// Remove or Add Approved Validation.
        if ( type == 'remove' ) {
        
            ///// Remove Approved Validation from the Fieldset Element.
            ////* Rejected = 0, Approved = 1
            fieldsetElement.setAttribute( 'data-fieldset-validation', '0' )

        } else if ( type == 'add' ) {
            
            ///// Adding Approved Validation to the Fieldset Element.
            ////* Rejected = 0, Approved = 1
            fieldsetElement.setAttribute( 'data-fieldset-validation', '1' )

        }

        ///// Set Approval to the Buttons in the Form Element.
        const setButtonsApprovalResponse = opSetApprovalToButtonsInForm( debug, fieldsetElement, type )
        
        ///// Create/throw Response.
        if ( setButtonsApprovalResponse.error !== false ) throw setButtonsApprovalResponse.response
        else error = false, code = 200, message = `The Approval was Set to the Step (Fieldset) Element in the Form Element!`

    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, code = 400, message = errorMessage

    } finally {

        ///// Console Log if the Debug parameter is 'true'.
        opConsoleDebug( debug, `opSetApprovalToStepInForm( ${type} ):`, message )
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )

    }

}

/* ---------------------------------------------------------
 >  1m. Add Grid Columns to the Grid Element
------------------------------------------------------------ */
function opSetGridCols( debug, number, formElement ) {

    ///// Create Variables.
    let error, code, message

    try {

        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( ! debug ) debug = false
        if ( ! number ) throw `Missing the Number of Grid Columns in the Function Parameters!`
        if ( ! formElement ) formElement = event.target.closest( '.op-form-steps' )

        ///// Get the Elements.
        let gridContainer = formElement.querySelector( '.op-grid-wrapper' )

        ///// Set the Number of Grid Columns to the Grid Container Element.
        gridContainer.setAttribute( 'data-grid-cols', number )

        ///// Create/throw Response.
        error = false, code = 200, message = 'The Number of Grid Columns was added to the Grid Element!'

    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, code = 400, message = errorMessage

    } finally {

        ///// Console Log if the Debug parameter is 'true'.
        opConsoleDebug( debug, `opSetGridCols( ${number} ):`, message )
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
    }

}

/* ---------------------------------------------------------
 >  1m. Add Grid From CSV to the Form Element
------------------------------------------------------------ */
async function opSetGridContainer( debug, inputElement, type ) {
    
    ///// Create Variables.
    let error, code, message

    try {

        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( ! debug ) debug = false
        ////* 'input', 'fieldset', 'form'
        if ( ! inputElement ) throw `Missing the Grid Element!`
        if ( ! type ) throw `Missing the Type in the Function Parameters!`

        ///// Get the Elements.
        let formElement = inputElement.closest( '.op-form-steps' )
        let fieldsetElement = inputElement.closest( 'fieldset[class*="op-fieldset-step"]' )
        let gridContainer = fieldsetElement.querySelector( '.op-grid-wrapper' )
        let gridElement = gridContainer.querySelector( '[id*="-form-grid"]' )

        ///// Remove or Add Grid Element.
        if ( type == 'remove' ) {
        
            ///// Remove the Grid Element.
            gridContainer.classList.remove( 'op-grid-active' )
            gridElement.innerHTML = ''
            
        } else if ( type == 'add' ) {
            
            ///// Remove the Grid Element.
            gridContainer.classList.add( 'op-grid-active' )

            ///// Get Grid Variables.
            let gridWidth = gridContainer.clientWidth
            let gridCols = gridContainer.getAttribute( 'data-grid-cols' )
            let gridElementId = gridElement.getAttribute( 'id' )
    
            ///// Get the Data from the Form Element.
            const formData = new FormData( formElement )

            ///// The URL to the API.
            const url = `${ opGetCurrentScriptPath() }/../api/api-convert-csv-into-json.php`

            ///// Fetch from Local PHP file.
            const apiData = await opGetApiData( debug, 'POST', formData, url, 'json', 'form' )

            ///// Console Log if the Debug parameter is 'true'.
            opConsoleDebug( debug, `API Data:`, apiData )
     
            ///// If the Fetch Response has Code 200 (OK).
            if ( apiData.code === 200 ) {
                
                let gridColName = gridContainer.getAttribute( 'data-grid-col-name' )
                let gridNoCol = gridContainer.getAttribute( 'data-grid-no-col' )
                let gridNewCol = gridContainer.getAttribute( 'data-grid-new-col' )
                let colWidth = ( Number( gridWidth ) / ( Number( gridCols ) + 2 ) )
                ///// Create new Grid Element.
                eventGridElement = new DataGridXL( gridElementId, {
                    data: apiData.response,
                    allowFreezeRows: false,
                    allowFreezeCols: false,
                    colHeaderHeight: 60,
                    rowHeaderWidth: 44,
                    colWidth: ( colWidth > 100 ) ? colWidth : 100,
                    colHeaderLabelFunction: function( index, coord, colRef, labels ){
                        //console.log( 'index: ', index, 'coord: ', coord, 'colRef: ', colRef, 'labels: ', labels )
                        let colTitle = ( colRef.title ) ? colRef.title : `${ gridNewCol } ${ colRef.id }`
                        if ( Number ( coord ) < Number ( gridCols ) ){
                            return String( `<span class="op-col">${ gridColName } ${ Number ( coord + 1 ) }</span><span class="op-col-name">${ colTitle }</span>` );
                        } else {
                            return String( `<span class="op-col-no">${ gridNoCol }</span><span class="op-col-name">${ colTitle }</span>` );
                        }
                    }
                } )
                
                ///// Create/throw Response.
                error = false, code = 201, message = { message : 'Grid was created!', gridElementId : gridElementId }

            } else throw 'Missing Grid Data!'

        }

    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, message = errorMessage
        if ( errorMessage && ! code ) code = 400
        
        ///// Throw Error Response in the Console.
        console.error( `opSetGridContainer( ${type} ):`, opReturnResponse( error, code, errorMessage ) )
        
    } finally {
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
    }

}

/* ---------------------------------------------------------
 >  2f. Validation of Inputs in Form
------------------------------------------------------------ */
async function opFormInputValidation( debug, type, inputElement ) {
    
    ///// Create Variables.
    let error, code, message

    try {

        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( ! debug ) debug = false
        ////* 'input', 'fieldset', 'form'
        if ( ! type ) type = 'fieldset'
        if ( ! inputElement ) inputElement = event.target

        ///// Get the Elements.
        let inputWrapperElement = inputElement.closest( '.op-input-wrapper' )
        let fieldsetElement = inputElement.closest( 'fieldset[class*="op-fieldset"]' )
        // #NG (2023-02-21) - Have removed ( op-fieldset "-step" ) in the Class Name
        
        ///// Type of Validation.
        if ( type == 'clear' ) {

            ///// Clear the Validation.
            inputWrapperElement.setAttribute( 'data-validation', '0' )

        } else if ( type == 'input' ) {

            ///// Get the Validated Input Response.
            const inputResponse = opValidateContainerInputs( debug, inputWrapperElement )
            
            ///// Create/throw Response.
            if ( inputResponse.error !== false ) throw inputResponse.response
            else error = false, code = 200, message = `The Input was Approved!`
    
        } else if ( type == 'fieldset' || type == 'grid' ) {
        
            ///// Get the Validated Fieldset Response.
            const fieldsetResponse = opValidateContainerInputs( debug, fieldsetElement )
            
            ///// Remove or Add Validation.
            if ( fieldsetResponse.error !== false ) {

                ///// Remove or Add the Grid Element.
                if ( type == 'grid' ) {

                    ///// Remove the Grid from the Container Element.
                    const removeGridResponse = await opSetGridContainer( debug, inputElement, 'remove' )

                    ///// Grid Response.
                    if ( removeGridResponse.error !== false ) gridMessage = removeGridResponse.response
                    else gridMessage = `the Grid was Removed from the Container Element!`
                    
                }

                ///// Remove Approval from the Step (Fieldset) in the Form Element.
                const removeApprovalResponse = opSetApprovalToStepInForm( debug, fieldsetElement, 'remove' )
               
                ///// Throw Response.
                if ( removeApprovalResponse.error !== false ) throw removeApprovalResponse.response
                else if ( fieldsetResponse.error !== false ) throw fieldsetResponse.response
                
            } else {
            
                if ( type == 'grid' ) {

                    ///// Adding a new Grid to the Container Element.
                    const addGridResponse = await opSetGridContainer( debug, inputElement, 'add' )

                    ///// Grid Response.
                    if ( addGridResponse.error !== false ) gridMessage = addGridResponse.response
                    else gridMessage = `the Grid was Added to the Container Element!`

                }

                ///// Add Approval to the Step (Fieldset) in the Form Element.
                const addApprovalResponse = opSetApprovalToStepInForm( debug, fieldsetElement, 'add' )

                ///// Throw Response.
                if ( addApprovalResponse.error !== false ) throw addApprovalResponse.response

            }

            if ( type == 'grid' ) {
                
                ///// Create Response.
                error = false, code = 200, message = `All the Inputs in the Fieldset was Approved and ${ gridMessage}!`
                
            } else {
                
                ///// Create Response.
                error = false, code = 200, message = `All the Inputs in the Fieldset was Approved!`
            
            }

        } else if ( type == 'form' ) {
        

        } else throw `Something went wrong with the Validation!`


    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, code = 400, message = errorMessage

    } finally {

        ///// Console Log if the Debug parameter is 'true'.
        opConsoleDebug( debug, `opFormInputValidation():`, message )
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
    }

}

/* ---------------------------------------------------------
 >  2g. Validation of Submit Input in Form
 *  #NG - Move to Block Script later 
------------------------------------------------------------ */
function opFormInputValidationToSubmit() {

    ///// Debug the function
    let debug = false // true or false

    let inputElement = event.target
    let block = inputElement.closest( 'section[id*="op-block"]' )
    let inputElementWrapper = inputElement.closest( '.op-input-wrapper' )
    let form = inputElementWrapper.closest( '.op-form-steps' )
    let fieldsets = form.querySelectorAll( 'fieldset' )
    let directionButtons = form.querySelectorAll( '.op-form-directions button' )
    let currentStep = form.getAttribute( 'data-form-step' ) 

    if ( inputElement.checked ) {

        inputElementWrapper.setAttribute( 'data-validation', '1' )
        directionButtons[2].disabled = false

        for( let i = 0; i < fieldsets.length; ++i ) {

            if ( i === ( Number( currentStep ) - 1 ) ) {
                opConsoleDebug( debug, 'fieldset:', fieldsets[i] )
                
                ///// Validate the inputs in the fieldset.
                const validatedFormResponse = opValidateContainerInputs( debug, fieldsets[i] )
                opConsoleDebug( debug, 'Validation:', validatedFormResponse )

                //if ( validatedFormResponse.error !== false ) return opAddErrorToElements( debug, block, validatedFormResponse.response )

                fieldsets[i].classList.add( 'op-validation-approved' )
            }

        }

    } else {

        inputElementWrapper.setAttribute( 'data-validation', '0' )
        directionButtons[2].disabled = true
        fieldsets[ ( Number( currentStep ) - 1 ) ].classList.remove( 'op-validation-approved' )

    }
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
        'aGNhb2kzOG5jbzNu',
        'iYxAmDotuEqEEZYR'
    ]

    if ( object === 'url' ) return fastApiUrl[ 0 ]
    if ( object === 'token' ) return fastApiToken[ 0 ]
}

/* ---------------------------------------------------------
 >  3b. Get Data from FastAPI
------------------------------------------------------------ */
async function opGetApiData( debug, method, bodyInput, url, output, contentType ) {

    ///// Create Variables.
    let error, code, message

    try {

        ///// Set the Parameter If the Debug is not defined.
        if ( ! debug ) debug = false
        
        ///// Validate the Function Parameters.
        if ( ! method ) throw `Missing the Method in the Function Parameters!`
        else if ( ! url ) throw `Missing the URL link in the Function Parameters!`
        else if ( ! output ) throw `Missing the Output in the Function Parameters!`
        else {

            ///// Request Options for fetch.
            ////* method (GET, POST, PUT, DELETE, etc.)
            let options = {
                method: method,
                headers: {
                    accept: 'application/json',
                    'access_token': opGetFastApiInfo( 'token' )
                }
            }
            
            ///// Add Content Type to Options.
            if ( contentType !== 'form' ) {
                options.headers = { ...options.headers, 'Content-Type': 'application/json' }
            }

            ///// Add Body to Options.
            if ( bodyInput ) {
                options = { ...options, 'body': bodyInput }
            }
        
            ///// Get the Response from the API.
            ////* output (json or blob).
            const apiResponse = await opFetchDataFromApi( debug, url, options, output )
            
            ///// Console Log if the Debug parameter is 'true'.
            opConsoleDebug( debug, `API Response:`, apiResponse )
            
            ///// Validate the Fetch Response.
            const validatedApiResponse = opValidateApiResponse( debug, apiResponse )
            if ( validatedApiResponse.error !== false ) {
                code = validatedApiResponse.code
                throw 'The Validated API Response has an Error!'
            } else error = validatedApiResponse.error, code = validatedApiResponse.code, message = validatedApiResponse.response

            ///// Console Log if the Debug parameter is 'true'.
            opConsoleDebug( debug, `Validated API Response:`, validatedApiResponse )

        }
        
    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, message = errorMessage
        if ( errorMessage && ! code ) code = 400
        
        ///// Throw Error Response in the Console.
        console.error( 'opGetApiData()', opReturnResponse( error, code, errorMessage ) )
        
    } finally {
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
    }

}


/* ------------------------------------------
 >  3c. Create Booking
--------------------------------------------- */
async function opCreateBooking( debug, bookingData ) {   

    ///// Create Variables.
    let error, code, message

    try {

        ///// Set the Parameter If the Debug is not defined.
        if ( ! debug ) debug = false

        ///// Validate the Function Parameters.
        if ( ! bookingData ) throw `Missing the Booking Data in the Function Parameters!`

        ///// The URL to the API.
        const url = `${ opGetFastApiInfo( 'url' ) }layouts/name_tags/${bookingData.name_tag_type}`

        ///// Fetch from the FastAPI.
        const nameTagType = await opGetApiData( debug, 'GET', '', url, 'json' )

        ///// Console Log if the Debug parameter is 'true'.
        opConsoleDebug( debug, `Name Tag Type:`, nameTagType )

        ///// Validate the Fetch Response.
        if ( nameTagType.error !== false ) throw 'Could not find any Name Tag Type for the Booking!'
        else {        
            
            ///// Define new Booking Item variable.
            let bookingItem = { 
                bookingId : bookingData.booking_code, 
                bookingStartDate : bookingData.start_date, 
                bookingEndDate : bookingData.end_date,
                printerId : bookingData.printer_code, 
                nameTagType : {
                    nameTagTypeId : bookingData.name_tag_type, 
                    nameTagTypeLayouts : nameTagType.response.layouts
                }
            }

            ///// Console Log if the Debug parameter is 'true'.
            opConsoleDebug( debug, `Booking Item:`, bookingItem )
            
            ///// Create new Form Element.
            const formData = new FormData()

            ///// Add Data to the new Form Element
            formData.append( 'booking-item', JSON.stringify( bookingItem ) )

            ///// The URL to the API.
            const acsUrl = `${ opGetCurrentScriptPath() }/../api/api-create-session.php`

            ///// Fetch from Local PHP file.
            const createBookingResponse = await opGetApiData( debug, 'POST', formData, acsUrl, 'json', 'form' )

            ///// Console Log if the Debug parameter is 'true'.
            opConsoleDebug( debug, `Create Booking Response:`, createBookingResponse )

            ///// Validate the Fetch Response.
            if ( createBookingResponse.error !== false ) throw 'Could not Create the Booking!'
            else if ( createBookingResponse.response.session.bookingId !== bookingData.booking_code ) {

                ///// The URL to the API.
                const adsUrl = `${ opGetCurrentScriptPath() }/../api/api-delete-session.php`

                ///// Fetch from Local PHP file.
                const deleteBookingResponse = await opGetApiData( debug, 'DELETE', '', adsUrl, 'json' )

                ///// Console Log if the Debug parameter is 'true'.
                opConsoleDebug( debug, `Delete Booking Response:`, deleteBookingResponse )

                ///// Validate the Fetch Response.
                if ( deleteBookingResponse.error !== false ) throw deleteBookingResponse.response.message
                else throw 'The Booking ID and Code do not Match!'

            } else {
                
                ///// Create Response.
                error = false, code = createBookingResponse.code, message = `The Booking was created perfectly!`

            }

        }
            
    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, message = errorMessage
        if ( errorMessage && ! code ) code = 400
        
        ///// Throw Error Response in the Console.
        console.error( 'opCreateTemplate()', opReturnResponse( error, code, errorMessage ) )
        
    } finally {
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
    }

}


/* ------------------------------------------------------------------------
 #  4x. Session Storage Functions
---------------------------------------------------------------------------
 >  4x. Booking Session Storage
------------------------------------------------------------
 >  4x-1. Get Booking from Session
--------------------------------------------- */
async function opGetBookingFromSession( debug ) {
    
    ///// Create Variables.
    let error, code, message

    try {

        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( ! debug ) debug = false

        ///// The URL to the API.
        const agsUrl = `${ opGetCurrentScriptPath() }/../api/api-get-session.php`

        ///// Fetch from Local PHP file.
        const getBookingResponse = await opGetApiData( debug, 'GET', '', agsUrl, 'json' )

        ///// Console Log if the Debug parameter is 'true'.
        opConsoleDebug( debug, `Get Booking Response:`, getBookingResponse )
        
        if ( getBookingResponse.error !== false ) throw getBookingResponse.response
        else {

            ///// Get Booking Item.
            const bookingItem = getBookingResponse.response.session
            opConsoleDebug( debug, 'bookingItem:', bookingItem )

            ///// Create Approved Response.
            error = false, code = 200, message = bookingItem

        }

    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, code = 400, message = errorMessage
        
        ///// Throw Error Response in the Console.
        console.error( `opGetBookingFromSession()`, opReturnResponse( error, code, errorMessage ) )
        
    } finally {
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
    }

}


/* ------------------------------------------------------------------------
 #  4. Local Storage Functions
---------------------------------------------------------------------------
 >  4a. Get a Local Storage
------------------------------------------------------------ */
function opGetLocalStorage( debug, localStorageName ) {

    ///// Create Variables.
    let error, code, message

    try {

        ///// If the Storage Name is missing.
        if ( ! localStorageName ) {
            throw 'Missing Local Storage Name!'
        }
    
        ///// Convert Local Storages Name to UpperCase.
        const storageName = localStorageName.toUpperCase()

        ///// Get Local Storages.
        const storage = JSON.parse( localStorage.getItem( `OP_PLUGIN_DATA_${ storageName }` ) )
        
        ///// Validate the Local Storage.
        const validatedLocalStorage = opValidateLocalStorage( debug, storage, storageName )
        if ( validatedLocalStorage.error !== false ) throw validatedLocalStorage.response
        else error = false, code = 200, message = validatedLocalStorage.response
        
    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, code = 400, message = errorMessage
        
        ///// Throw Error Response in the Console.
        console.error( `opGetLocalStorage(${ storageName })`, opReturnResponse( error, code, errorMessage ) )
        
    } finally {
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
    }

}

/* ---------------------------------------------------------
 >  4b. Templates Storage
------------------------------------------------------------
 >  4b-1. Get Template
--------------------------------------------- */
function opGetTemplate( templateId ) {

    ///// Debug the function
    let debug = false // true or false

    ///// Get Local Storage of Templates.
    const templatesStorage = opGetLocalStorage( debug, 'Templates' )

    ///// Get the Template List from the Local Storage of Templates.
    const templateList = templatesStorage.response.templateList
    opConsoleDebug( debug, 'templateList:', templateList )

    ///// Validate the Template List.
    if ( ! templateList || ! templateList[0] ) return opReturnResponse( true, 400, 'No Storage of Templates have been created yet!' )
    
    // #NG - This function needs to be recreate - See function[ opCreateTemplate() ]
    ///// Validate Template List.
    //if ( ! templateList || ! templateList[0] ) throw 'Could not find any templates!'

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

/* ------------------------------------------
 >  4b-2. Create Template
--------------------------------------------- */
async function opCreateTemplate( debug, formElement ) {   

    ///// Create Variables.
    let error, code, message

    try {

        ///// Set the Parameter If the Debug is not defined.
        if ( ! debug ) debug = false

        ///// Validate the Function Parameters.
        if ( ! formElement ) throw `Missing the Form Element in the Function Parameters!`
        else {

            ///// Get the Local Storage of Templates.
            const templatesStorage = opGetLocalStorage( debug, 'Templates' )

            ///// Validate the Response from the Local Storage of Templates.
            if ( templatesStorage.error !== false ) throw templatesStorage.response

            ///// Get the Template List from the Local Storage of Templates.
            const templateList = templatesStorage.response

            ///// Get the Data from the Form Element.
            const formData = new FormData( formElement )

            ///// The URL to the API.
            const url = `${ opGetFastApiInfo( 'url' ) }images/`

            ///// Fetch from the FastAPI.
            const apiData = await opGetApiData( debug, 'POST', formData, url, 'json', 'form' )

            ///// Console Log if the Debug parameter is 'true'.
            opConsoleDebug( debug, `API Data:`, apiData )

            ///// Validate the Fetch Response.
            if ( apiData.error !== false ) throw 'The API Data has an Error!'
            else {
                
                ///// If the Fetch Response has Code 200.
                if ( apiData.code === 200 ) {

                    ///// Get the element for output.
                    let filenameUploaded = apiData.response.filename.slice(7)                 
                    
                    ///// Throw Error Response if the Image is missing.
                    if ( ! filenameUploaded ) throw `Missing Image Data!`

                    ///// Define new data variables.
                    let dateNow = Date.now()
                    let fileInput = formElement[ 'image' ];   
                    let filenameOriginal = fileInput.files[0].name;

                    ///// Define new Template Item variable.
                    let templateItem = { 
                        'templateCreationDate' : dateNow, 
                        'templateName' : formElement[ 'name' ].value, 
                        'templateFilenameOriginal' : filenameOriginal,
                        'templateFilenameUploaded' : filenameUploaded,
                        'templateLayout' : formElement[ 'layout' ].value.slice(3),
                        'templateLayoutColumns' : formElement[ 'layout' ].value.slice(0, 2)
                    }
                    
                    ///// Push Template Item variable into Template List.
                    templateList.templateList.push( templateItem )
                    
                    ///// Set Template List in Local Storage.
                    localStorage.setItem( 'OP_PLUGIN_DATA_TEMPLATES', JSON.stringify( templateList ) )

                    ///// Create Approved Response.
                    error = false, code = 201, message = { message : 'Template was created!', template : templateItem }

                } else throw 'The API Data has an Error!'

            }
            
        }

    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, message = errorMessage
        if ( errorMessage && ! code ) code = 400
        
        ///// Throw Error Response in the Console.
        console.error( 'opCreateTemplate()', opReturnResponse( error, code, errorMessage ) )
        
    } finally {
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
    }

}

/* ------------------------------------------
 >  4b-3. Delete Template
 ?  Updated: 2023-03-21 - 21:10 (Y:m:d - H:i)
--------------------------------------------- */
function opDeleteTemplate( debug, templateId ) {   
        
    ///// Create Variables.
    let error, code, message

    try {

        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( ! debug ) debug = false
        if ( ! templateId ) throw `Missing the Template ID!`

        ///// Get the Local Storage of Templates.
        const templatesStorage = opGetLocalStorage( debug, 'Templates' )

        ///// Validate the Response from the Local Storage of Templates.
        if ( templatesStorage.error !== false ) throw templatesStorage.response

        ///// Get the Template List from the Local Storage of Templates.
        let templateList = templatesStorage.response
        
        ///// Get the Template List without the Template.
        let templateListWithoutTemplate = templateList.templateList.filter( template => template.templateCreationDate !== templateId )
        
        ///// Overwrite the Template List.
        templateList.templateList = templateListWithoutTemplate
        opConsoleDebug( debug, `The new Template list:`, templateList )

        ///// Set the new Template List in Local Storage.
        localStorage.setItem( 'OP_PLUGIN_DATA_TEMPLATES', JSON.stringify( templateList ) )

        ///// Create Response.
        error = false, code = 201, message =  `The Template was Deleted!`

    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, message = errorMessage
        if ( errorMessage && ! code ) code = 400
        
        ///// Throw Error Response in the Console.
        console.error( 'opDeleteTemplate()', opReturnResponse( error, code, errorMessage ) )
        
    } finally {
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
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
    const eventsStorage = opGetLocalStorage( debug, 'Events' )

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
 >  4c-2. Create Event
--------------------------------------------- */
async function opCreateEvent( debug, formElement ) {   
        
    ///// Create Variables.
    let error, code, message

    try {

        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( ! debug ) debug = false
        if ( ! formElement ) throw `Missing the Form Element!`

        ///// Get the Local Storage of Events.
        const eventsStorage = opGetLocalStorage( debug, 'Events' )

        ///// Validate the Response from the Local Storage of Events.
        if ( eventsStorage.error !== false ) throw eventsStorage.response

        ///// Get the Event List from the Local Storage of Events.
        const eventList = eventsStorage.response
            
        ///// Define new data variables.
        let dateNow = Date.now()
        let inputName = formElement[ 'name' ].value
        let inputTemplate = formElement[ 'template' ].value  
               
        ///// Get the Grid data.
        const jsonFormGrid = JSON.stringify( eventGridElement.getData() )

        ///// Get data from the form element.
        let formData = new FormData()

        ///// Add JSON from Grid to Form Element
        formData.append( 'json-from-grid', jsonFormGrid )

        ///// The URL to the API.
        const url = `${ opGetCurrentScriptPath() }/../api/api-convert-grid-data-into-json.php`

        ///// Fetch from Local PHP file.
        const apiData = await opGetApiData( debug, 'POST', formData, url, 'json', 'form' )
        
        ///// If the Fetch Response has Code 200 (OK).
        if ( apiData.code === 200 ) {

            ///// Define new Template Item variable.
            let eventItem = { 
                eventCreationDate : dateNow, 
                eventName : inputName,
                eventTemplate : inputTemplate,
                eventParticipants : apiData.response
            }
            
            ///// Push Template Item variable into Template List.
            eventList.eventList.push( eventItem )
            
            ///// Set Event List in Local Storage.
            localStorage.setItem( 'OP_PLUGIN_DATA_EVENTS', JSON.stringify( eventList ) )

            ///// Create Response.
            error = false, code = 201, message =  { message : `Event was created!`, eventCreationDate : dateNow }

        } else throw 'Missing Grid Data!'

    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, message = errorMessage
        if ( errorMessage && ! code ) code = 400
        
        ///// Throw Error Response in the Console.
        console.error( 'opCreateEvent()', opReturnResponse( error, code, errorMessage ) )
        
    } finally {
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
    }

}

/* ------------------------------------------
 >  4c-2. Update Event
 #NG - Must be split into two functions, an update event and an add new participant.
--------------------------------------------- */
async function opUpdateEvent( debug, eventId, formElement ) {   
        
    ///// Create Variables.
    let error, code, message

    try {

        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( ! debug ) debug = false
        if ( ! eventId ) throw `Missing the Event ID!`
        if ( ! formElement ) throw `Missing the Form Element!`

        ///// Get the Local Storage of Events.
        const eventsStorage = opGetLocalStorage( debug, 'Events' )

        ///// Validate the Response from the Local Storage of Events.
        if ( eventsStorage.error !== false ) throw eventsStorage.response

        ///// Get the Event List from the Local Storage of Events.
        const eventList = eventsStorage.response           
        
        for( var i = 0; i < eventList.eventList.length; i++ ) {
            if ( Number( eventList.eventList[i].eventCreationDate ) === Number( eventId ) ) {
                
                opConsoleDebug( debug, `Event-${ eventList.eventList[i].eventCreationDate }:`, eventList.eventList[i] )

                // #NG (2023-02-26) - Create Function at some time.
                //function opCreateNewParticipant ( debug, formElement ) { }

                ///// Define new data variables.
                let column1, column2, column3, column4, column5, dateNow = Date.now()

                if ( ! formElement[ 'column-1' ] ) column1 = ''
                else column1 = formElement[ 'column-1' ].value

                if ( ! formElement[ 'column-2' ] ) column2 = ''
                else column2 = formElement[ 'column-2' ].value

                if ( ! formElement[ 'column-3' ] ) column3 = ''
                else column3 = formElement[ 'column-3' ].value
                
                if ( ! formElement[ 'column-4' ] ) column4 = ''
                else column4 = formElement[ 'column-4' ].value
                
                if ( ! formElement[ 'column-5' ] ) column5 = ''
                else column5 = formElement[ 'column-5' ].value

                ///// Define new Participant Item variable.
                let participantItem = {
                    id : `${ dateNow }`,
                    line1 : column1,
                    line2 : column2,
                    line3 : column3,
                    line4 : column4,
                    line5 : column5,
                    time : '',
                    active : 0,
                    prints : 0
                }

                opConsoleDebug( debug, `participantItem-${ dateNow }:`, participantItem )

                ///// Push Template Item variable into Template List.
                eventList.eventList[i].eventParticipants.push( participantItem )               

            } else opConsoleDebug( debug, `Event List:`, `The eventId(${eventId}) was not found!` )
        }

        ///// Set Event List in Local Storage.
        localStorage.setItem( 'OP_PLUGIN_DATA_EVENTS', JSON.stringify( eventList ) )

        ///// Create Response.
        error = false, code = 201, message =  `The new Participant was Added!`

    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, message = errorMessage
        if ( errorMessage && ! code ) code = 400
        
        ///// Throw Error Response in the Console.
        console.error( 'opCreateEvent()', opReturnResponse( error, code, errorMessage ) )
        
    } finally {
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
    }

}

/* ------------------------------------------
 >  4c-3. Delete Event
 ?  Updated: 2023-03-21 - 18:47 (Y:m:d - H:i)
--------------------------------------------- */
function opDeleteEvent( debug, eventId ) {   
        
    ///// Create Variables.
    let error, code, message

    try {

        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( ! debug ) debug = false
        if ( ! eventId ) throw `Missing the Event ID!`

        ///// Get the Local Storage of Events.
        const eventsStorage = opGetLocalStorage( debug, 'Events' )

        ///// Validate the Response from the Local Storage of Events.
        if ( eventsStorage.error !== false ) throw eventsStorage.response

        ///// Get the Event List from the Local Storage of Events.
        let eventList = eventsStorage.response
        
        ///// Get the Event List without the Event.
        let eventListWithoutEvent = eventList.eventList.filter( event => event.eventCreationDate !== eventId )
        
        ///// Overwrite the Event List.
        eventList.eventList = eventListWithoutEvent
        opConsoleDebug( debug, `The new Event list:`, eventList )

        ///// Set the new Event List in Local Storage.
        localStorage.setItem( 'OP_PLUGIN_DATA_EVENTS', JSON.stringify( eventList ) )

        ///// Create Response.
        error = false, code = 201, message =  `The Event was Deleted!`

    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, message = errorMessage
        if ( errorMessage && ! code ) code = 400
        
        ///// Throw Error Response in the Console.
        console.error( 'opDeleteEvent()', opReturnResponse( error, code, errorMessage ) )
        
    } finally {
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
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
    const eventsStorage = opGetLocalStorage( debug, 'Events' )

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
   
    ///// Get Booking Item.
    const bookingItem = await opGetBookingFromSession( debug )
    opConsoleDebug( debug, 'bookingItem:', bookingItem )

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
    opConsoleDebug( debug, 'Template:', template )

    ///// Get the Amount of Columns.
    let columnAmount = template.templateLayoutColumns.charAt(0)

    //////////////////// #NG: Needs to be looked at again - Search.
    ///// Get Participant Item. 
    const participantItem = opGetParticipant( eventListId, participantId )
    if ( participantItem.error !== false ) return opConsoleDebug( debug, 'participantItem:', participantItem.response )

    ///// Get Participant.
    const participant = participantItem.response
    opConsoleDebug( debug, 'Participant:', participant )
   
    ///// Create Variables.
    let bookingCode = bookingItem.response.bookingId
    let layout = template.templateLayout
    let imageFilename = template.templateFilenameUploaded
    let string1 = ( 1 <= columnAmount ) ? participant.line1 : ""
    let string2 = ( 2 <= columnAmount ) ? participant.line2 : ""
    let string3 = ( 3 <= columnAmount ) ? participant.line3 : ""
    let string4 = ( 4 <= columnAmount ) ? participant.line4 : ""
    let string5 = ( 5 <= columnAmount ) ? participant.line5 : ""

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
    opGetApiData( debug, 'POST', bodyInput, url, 'json' ).then( apiData => {
        opConsoleDebug( debug, 'apiData:', apiData )

        ///// If the Fetch Response has Code 201 (Created).
        if ( apiData.code === 201 ) { 
       
            let participantPrints = ( participant.prints + 1 )
            let dateNow = Date.now()
    
            ///// Update Participant in Local Storage. 
            const participantUpdate = opUpdateParticipant( eventListId, participantId, participantPrints, dateNow )
            if ( participantUpdate.error !== false ) return opConsoleDebug( debug, 'participantUpdate:', participantUpdate.response )
            
            ///// Update Event Participant List Block. 
            let eventPrintActive = block.getAttribute( 'data-print-active' ) // #NG - Need to be changed to html tags instead
            participantElement.querySelector( 'footer .op-message .op-text' ).innerText = eventPrintActive // #NG - Need to be changed to html tags instead
            //participantElement.classList.add( 'op-print-active' )
            //participantElement.setAttribute( 'data-op-arrival', '1' )
            participantElement.setAttribute( 'data-validation', '1' )
            participantElement.setAttribute( 'data-op-prints', participantPrints )
            participantElement.querySelector( 'header .op-col-amount-of-prints' ).innerText = participantPrints
            participantElement.querySelector( 'header .op-col-arrival-time' ).innerText = opTimeConverter( dateNow, 'hour-min' )
            participantElement.querySelector( 'footer .op-col-arrival-time .op-text' ).innerText = opTimeConverter( dateNow, 'hour-min' )
    
            setTimeout( function () {
                let eventPrintSuccess = block.getAttribute( 'data-print-success' ) // #NG - Need to be changed to html tags instead
                participantElement.querySelector( 'footer .op-message .op-text' ).innerText = eventPrintSuccess // #NG - Need to be changed to html tags instead
                //participantElement.classList.remove( 'op-print-active' )
                participantElement.setAttribute( 'data-validation', '2' )
                participantElement.classList.add( 'op-active' )
    
                ///// Update Event Information Blocks. 
                opEventInformationBlocks()
            }, 3000 );
            
            //let windowUrl = `${ opGetFastApiInfo( 'url' ) + apiData.response.filename }`
            //opConsoleDebug( debug, 'windowUrl:', windowUrl )

        } else {
            participantElement.setAttribute( 'data-validation', '3' )
            let eventPrintError = block.getAttribute( 'data-print-error' ) // #NG - Need to be changed to html tags instead
            participantElement.querySelector( 'footer .op-message .op-text' ).innerText = eventPrintError // #NG - Need to be changed to html tags instead
        }
    
    } )

    
    //////////////////// #NG: Below must be deleted later.    
    // If error:
    //participantElement.querySelector( 'footer .op-message .op-text' ).innerText = 'Error!!!'
    //let windowUrl = `${ opGetFastApiInfo( 'url' ) + request.response.filename }`
    //window.open(windowUrl, '_blank').focus()

}

/* ---------------------------------------------------------
 >  5b. Create Print Document
------------------------------------------------------------ */
async function opCreatePrintDocument( debug, printWindow, block, eventListId ) {


    //////////////////// #NG: Needs to be looked at again - Search.
    ///// Get Event List. 
    const eventList = opGetEventList( eventListId )
    if ( eventList.error !== false ) return opConsoleDebug( debug, 'eventList:', eventList.response )

    ///// Get Event Item. 
    const eventItem = eventList.response
    opConsoleDebug( debug, 'eventItem:', eventItem )

    ///// Get Event Name. 
    let eventName = eventItem.eventName


    ///// Get Template Item.
    const templateItem = opGetTemplate( eventItem.eventTemplate )
    if ( templateItem.error !== false ) opConsoleDebug( true, 'templateItem:', 'Could not find the Template!' )
    opConsoleDebug( debug, 'templateItem:', templateItem )

    ///// Get the Amount of Columns.
    let columnAmount = templateItem.response.templateLayoutColumns.charAt(0)


    let pageTitle = `Event_${ eventName.replace(/ /g, '-') }`

    //let request = await fetch( 'http://onsiteprint.dk/wp-content/plugins/onsiteprint-plugin/assets/css/onsiteprint-styles-print.css' )

    //let response = await request.text()

    let htmlHead = document.querySelector( 'head' ).innerHTML

    //printWindow.document.write( `<html><head><title>${ pageTitle }</title><style>${response}</style></head>` )
    
    printWindow.document.write( `<html><head><title>OnsitePrint.dk | ${ pageTitle }</title>${ htmlHead }<link rel="stylesheet" id="onsiteprint-plugin-styles-print-css" href="https://onsiteprint.dk/wp-content/plugins/onsiteprint-plugin/assets/css/onsiteprint-styles-print.css?ver=1.0.0.56" media="all"></head>` )

    printWindow.document.write( '<body onafterprint="self.close()"><h2>OnsitePrint.dk</h2>' )

    let header = `<h3><b>Event:</b> ${ eventName }</h3><p class="op-page-number"></p>`

    let colInfo = block.querySelector( '.op-participant-col-info' ).outerHTML
    let rowList = block.querySelectorAll( '.op-participant-rows article' )

    ///// Add element to the container.
    printWindow.document.write( `
        <div class="op-event-participant-list op-block__event" data-column-count="${ columnAmount }"><table class="op-pdf-container">
            <thead class="op-pdf-header">
                <tr><th class="op-pdf-header-cell"></th><th class="op-pdf-header-info">
                    <div class="op-header-info">${ header + colInfo }</div>
                </th></tr>
            </thead>
            <tbody class="op-pdf-content">
        `
    )

    for(let i = 0; i< rowList.length; i++){
        printWindow.document.write( `<tr class="op-pdf-row"><td class="op-participant-number">${i+1}</td><td class="op-participant-cell">${rowList[i].outerHTML}</td></tr>` )
    }
    
    printWindow.document.write( `
            </tbody>
        </table></div></body></html>
    ` )

    /*
    <tfoot class="op-pdf-footer">
        <tr><td class="op-pdf-footer-cell"></td><td class="op-pdf-footer-info">
            <div class="op-participant-col-info">${ colInfo }</div>
        </td></tr>
    </tfoot>
    */

    return new Promise( resolve => {
        resolve( { document: 'Document loaded' } )
    })

}

/* ---------------------------------------------------------
 >  5c. Print All Participants (PDF)
------------------------------------------------------------ */
function opPrintEventParticipants( eventListId ) {

    ///// Debug the function
    let debug = false // true or false 

    ///// Get the elements.
    let block = event.target.closest( 'section[id*="op-block_"]' )
    
    ///// Get Id's. 
    let blockId = block.getAttribute( 'id' ).substring(9)

    ///// Create Browser Window. 
    printWindow = window.open( '', '_blank', `height=${ screen.height }, width=${ screen.width }`  )
    
    ///// Create Print Document in Window, then open Print Window and close after. 
    opCreatePrintDocument( debug, printWindow, block, eventListId ).then( response => {
        opConsoleDebug( debug, 'Response:', response )
        setInterval( () => {
            printWindow.print()
            printWindow.close()
            window.location.reload()
        }, 500)
    })

}

/* ------------------------------------------------------------------------
 #  6. Functions to ACF Custom Blocks
---------------------------------------------------------------------------
 >  6a. Block Functions
------------------------------------------------------------
 >  6a-1. Add Event Participant to Block
--------------------------------------------- */
function opAddEventParticipant( debug, block, participant, columnAmount ) {

    ///// Get the elements.
    let eventPrintSuccess = block.getAttribute( 'data-print-success' )
    let eventPrintButton = block.getAttribute( 'data-print-button' )

    ///// Debug the function.
    opConsoleDebug( debug, 'participant:', participant )
    opConsoleDebug( debug, 'eventPrintSuccess:', eventPrintSuccess )

    //////////////////// #NG: Missing Layout Information.

    ///// Create Participant variables.
    let participantId, participantLine, participantLines, participantPrints, participantTimeFull, participantTimeHour, participantActive, participantElement

    participantId = participant.id
    participantLines = [ participant.line1, participant.line2, participant.line3, participant.line4, participant.line5 ]
    participantPrints = participant.prints
    participantTimeFull = opTimeConverter( participant.time, 'full' )
    participantTimeHour = opTimeConverter( participant.time, 'hour-min' )
    participantActive = ( participant.active == 1 ) ? 2 : 0
    
    participantElement = `
        <article class="op-participant_${ participantId }" data-validation="${ participantActive }" data-op-prints="${ participantPrints }" onclick="opToggleActive( 'class', 'op-participant_' )">
            <header>
                <p class="op-col-icon" data-icon="user">
                    <span class="op-icon" role="img" aria-label="User Icon"></span>
                </p>
                <div class="op-col-lines">`

                    

    for( let i = 0; i < columnAmount; ++i ) {

        participantElement += `
            <p class="op-col-line-${ i+1 }">
                <span class="op-label">${ i+1 }</span>
                <span class="op-text">${ participantLines[i] }</span>
            </p>
        `

    }
    
    participantElement += `
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

    opConsoleDebug( true, 'participantElement:', participantElement )

    return new Promise( resolve => {
        resolve( { element: participantElement } )
    })

}

/* ------------------------------------------
 >   >  6a-2. Add Search Filter to the Event Participants List block
 // #NG - Is not used anymore! 
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
 >   >  6a-3. Toggle Filter Search of Event Participants
--------------------------------------------- */
function opToggleSearchFilter( filterId ) {

    ///// Get the elements.
    let block = event.target.closest( 'section[id*="op-block"]' )
    let blockId = block.getAttribute( 'id' )
    let filterInputText = block.querySelector( `[for="${ blockId }__filter-input-${ filterId }"] .op-text` ).innerText
    let searchInputText = block.querySelector( `[name="op-search-input"]` ).value

    block.querySelector( '.op-filter-label .op-button-title' ).innerText = filterInputText
    block.querySelector( '[name="op-filter-button"]').checked = false

    if ( searchInputText ) return opSearchEventParticipants()
    
}

/* ------------------------------------------
 >   >  6a-4. Search after Event Participants
--------------------------------------------- */
function opSearchEventParticipants() {

    ///// Debug the function
    let debug = false // true or false

    ///// Get the elements.
    let block = event.target.closest( 'section[id*="op-block"]' )
    opConsoleDebug( debug, 'block:', block )

    let formElement = block.querySelector( '.op-search-form' )

    let searchInput = formElement['op-search-input']
    ! searchInput.value ? formElement.setAttribute( 'data-search-active', '0' ) : formElement.setAttribute( 'data-search-active', '1' )
    opConsoleDebug( debug, 'searchInput:', searchInput.value )
    
    let filterInput = formElement['op-filter-input'].value == 0 ? [ 'line1', 'line2', 'line3','line4', 'line5' ] : [ `line${formElement['op-filter-input'].value}` ]
    opConsoleDebug( debug, 'filterInput:', filterInput )
    
    

    ///// Get Event Id. 
    let eventListId = block.getAttribute( 'data-event-id' )

    ///// Get the elements.
    let participantListElement = block.querySelector( '.op-participant-rows' )

    
    //////////////////// #NG: Missing login validation


    ///// Validate Local Storage of Events.
    const eventsStorage = opGetLocalStorage( debug, 'Events' )

    ///// Get Event List. 
    const eventList = eventsStorage.response.eventList
    opConsoleDebug( debug, 'eventList:', eventList )

    ///// Validate Event List.
    if ( ! eventList || ! eventList[0] ) return opValidateBlock( block, blockName, 'No Events have been created yet!' )
    
    ///// Filter Event Items.
    let eventItems = eventList.filter( event => event.eventCreationDate === Number( eventListId ) )
    opConsoleDebug( debug, `${eventListId}:`, eventItems )
    
    ///// Validate Event Item. 
    if ( ! eventItems[0] ) return opValidateBlock( block, blockName, 'No Event Information could be found to display!' )

    ///// Get Event Participants. 
    let participantList = eventItems[0].eventParticipants

    const participants = opUniversalSearch( searchInput, participantList , filterInput )
    opConsoleDebug( debug, 'Search:', participants )
    
    participantListElement.innerHTML = ''
    
    // #NG (2023-02-26) - New Code
    ///// Get Template Item.
    const templateItem = opGetTemplate( eventItems[0].eventTemplate )
    if ( templateItem.error !== false ) opConsoleDebug( true, 'templateItem:', 'Could not find the Template!' )
    opConsoleDebug( debug, 'templateItem:', templateItem )

    ///// Get the Amount of Columns.
    let columnAmount = templateItem.response.templateLayoutColumns.charAt(0)

    ///// For each Participant create Participant Element.
    for( let i = 0; i < participants.length; ++i ) {

        opAddEventParticipant( debug, block, participants[i], columnAmount ).then( response => {
            opConsoleDebug( debug, 'Response:', response )
            participantListElement.insertAdjacentHTML( 'afterbegin', response.element )
        })

    }

}

/* ------------------------------------------
 >   >  6a-5. Clear Search
--------------------------------------------- */
function opSearchClear() {

    ///// Get the elements.
    let block = event.target.closest( 'section[id*="op-block"]' )
    let formElement = block.querySelector( '.op-search-form' )
    let searchInput = formElement['op-search-input']
    
    ///// Clear the Search input.
    searchInput.value = ''
    
    ///// End function after Searching the Participants.
    return opSearchEventParticipants()

}

/* ------------------------------------------
 >   >  6a-6. Relocate to Page from Modal Window
--------------------------------------------- */
function opRelocateFromModal( url ) {

    ///// Get the elements.
    //let block = event.target.closest( 'section[id*="op-block"]' )

    ///// Relocate to URL Page.
    url = ! url ? window.location.origin : url
    window.location.href = url

}

/* ------------------------------------------
 >   >  6a-7. Go To Step in Form 
--------------------------------------------- */
function opFormGoToStep( newStep ) {

    ///// Debug the function
    let debug = false // true or false

    ///// Get the elements.
    let eventTarget = event.target
    let block = eventTarget.closest( 'section[id*="op-block"]' )
    let form = block.querySelector( '.op-form-steps' )
    let processButtons = form.querySelectorAll( '.op-form-process__inner button' )
    let directionButtons = form.querySelectorAll( '.op-form-directions button' )
    let fieldsets = form.querySelectorAll( 'fieldset' )

    ///// Get Step numbers.
    let allSteps = form.getAttribute( 'data-form-steps' )
    let currentStep = form.getAttribute( 'data-form-step' ) 

    ///// Give the new Step a number.
    if ( newStep.includes( 'step-') ) {
        newStep = newStep.slice(5)
    } else if ( newStep == 'next' ) {
        newStep = ( Number( currentStep ) + 1 )
    } else if ( newStep == 'back' ) {
        newStep = ( Number( currentStep ) - 1 )
    }
    
    ///// Create array number from the new Step.
    let slide = ( Number( newStep ) - 1 )

    eventTarget.closest( 'button' ).blur()

    if ( newStep >= 1 && newStep <= allSteps ) {

        for( let i = 0; i < fieldsets.length; ++i ) {

            if ( i === ( Number( currentStep ) - 1 ) && i <= slide ) {
                opConsoleDebug( debug, 'fieldset:', fieldsets[i] )
                
                ///// Validate the inputs in the fieldset.
                const validatedFormResponse = opValidateContainerInputs( debug, fieldsets[i] )

                if ( validatedFormResponse.error !== false ) return opConsoleDebug( debug, 'opFormGoToStep():', validatedFormResponse )

                fieldsets[i].classList.add( 'op-validation-approved' )
            }

            fieldsets[i].style.opacity = '0'
                    
            if ( i == slide ) {
                fieldsets[i].style.transform = 'translateX( 0% )'
                fieldsets[i].style.opacity = '1'
                fieldsets[i].style.visibility = 'visible'
                fieldsets[i].focus()
            } else if ( i <= slide ) {
                fieldsets[i].style.transform = 'translateX( -100% )'
                fieldsets[i].style.opacity = '0'
                fieldsets[i].style.visibility = 'hidden'
            } else if ( i >= slide ) {
                fieldsets[i].style.transform = 'translateX( 100% )'
                fieldsets[i].style.opacity = '0'
                fieldsets[i].style.visibility = 'hidden'
            }           
        }

        form.setAttribute( 'data-form-step', newStep )
    
        if ( newStep == allSteps ) {
            form.setAttribute( 'data-form-step-last', true )
        } else {
            form.setAttribute( 'data-form-step-last', false )
        }

        if ( fieldsets[ ( Number( newStep ) - 1 ) ].classList.contains( 'op-validation-approved' ) ) {
            directionButtons[1].disabled = false
            //processButtons[ newStep ].disabled = false // old

            // new
            let flow = false

            for( let i = 0; i < fieldsets.length; ++i ) {
                if ( fieldsets[i].classList.contains( 'op-validation-approved' ) ) {
                    flow = true
                    processButtons[i].disabled = false
                } else {
                    flow = false
                }
                                
                if ( flow == true && ( Number( i ) + 1 ) !== fieldsets.length ) {
                    processButtons[ ( Number( i ) + 1 ) ].disabled = false
                }
            }

        } else {
            directionButtons[1].disabled = true
        }

    }

    ///// Get Form Color.
    let formColor = block.getAttribute( 'data-form-color' )

    for( let i = 0; i < processButtons.length; ++i ) {
        if ( i == slide ) {
            processButtons[i].setAttribute( 'data-color', `${ formColor }-60` )                
        } else {
            processButtons[i].setAttribute( 'data-color', `${ formColor }-20` )
        }
    }


}

/* ------------------------------------------
 >   >  6a-8. Save New Template from Form 
--------------------------------------------- */
async function opSaveNewTemplate( debug ) {

    ///// Create Variables.
    let error, code, message

    try {

        ///// Set the Parameter If the Debug is not defined.
        if ( ! debug ) debug = false

        ///// Get the elements.
        let block = event.target.closest( 'section[id*="op-block"]' )
        let form = event.target.closest( 'form' )
        let saveButton = form.querySelector( '.op-button-save')
        let modal = block.querySelector( '.op-modal')

        ///// Disable the Save button.
        saveButton.disabled = true

        ///// Get the Response from the Create Template Function.
        const createdTemplateResponse = await opCreateTemplate( debug, form )

        ///// Console Log if the Debug parameter is 'true'.
        opConsoleDebug( debug, `Create Template Response:`, createdTemplateResponse )

        ///// Validate the Response from the Create Template Function.
        if ( createdTemplateResponse.error !== false ) {

            saveButton.disabled = false
            throw 'The Create Template Function has an Error!'

        } else {
            
            const template = createdTemplateResponse.response.template

            ///// Activate the Modal Window.
            modal.classList.add( 'op-active' )

            let templateId = template.templateCreationDate

            let eventUrl = modal.getAttribute( 'data-relocation-event-creation' )
            modal.querySelector( '.op-button-event-creation' ).setAttribute( 'href', `${ eventUrl }?template=${ templateId }` )

            ///// Create Approved Response.
            error = false, code = 200, message = 'The Template has been Saved Correctly!'

        }
            
    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, message = errorMessage
        if ( errorMessage && ! code ) code = 400
        
        ///// Throw Error Response in the Console.
        console.error( 'opSaveNewTemplate()', opReturnResponse( error, code, errorMessage ) )
        
    } finally {
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
    }

}

/* ------------------------------------------
 >   >  6a-9. Adding one or more Templates to an Element 
--------------------------------------------- */
function opAddTemplatesToElement( debug, blockId, containerElement, templateList ) {

    ///// Create Variables.
    let error, code, message

    try {

        ///// If the Elements are missing.
        if ( ! blockId ) {
            throw 'Missing Block ID!'
        } else if ( ! containerElement ) {
            throw 'Missing Container Element!'
        } else if ( ! templateList ) {
            throw 'Missing Template List!'
        } else { 
           
            for( var i = 0; i < templateList.length; i++ ) {
                
                ///// Console Log if the Debug parameter is 'true'.
                opConsoleDebug( debug, `Template(${ templateList[i].templateCreationDate })`, templateList[i] )

                ///// The URL to the Layouts.
                const svgUrl = `${ opGetCurrentScriptPath().slice( 0, -3 ) }/img/svg/layouts/`

                ///// Create new element.
                newTemplateElement = `
                    <div class="op-radio-input">
                        <input type="radio" id="${ blockId }-${ templateList[i].templateCreationDate }-input" oninput="opFormInputValidation(), opSetGridCols(false, ${ templateList[i].templateLayoutColumns.charAt(0) })" name="template" value="${ templateList[i].templateCreationDate }" required>
                        <label for="${ blockId }-${ templateList[i].templateCreationDate }-input">
                            <div class="op-radio-check" data-icon="circle-check">
                                <span class="op-icon" role="img" aria-label="Check Mark Icon"></span>
                            </div>
                            <div class="op-radio-info">
                                <div class="op-info op-flex-row">
                                    <p class="op-text" data-icon="calendar-days">
                                        <span class="op-icon" role="img" aria-label="Calendar Icon"></span>
                                        <span class="op-text-info">${ opTimeConverter( templateList[i].templateCreationDate, 'date-month-year', 'da' ) }</span>                               
                                    </p>
                                    <p class="op-text" data-icon="clock">
                                        <span class="op-icon" role="img" aria-label="Clock Icon"></span>
                                        <span class="op-text-info">${ opTimeConverter( templateList[i].templateCreationDate, 'hour-min' ) }</span>                               
                                    </p>
                                </div>
                                <div class="op-content op-flex-col">
                                    <p class="op-text op-flex-col">
                                        <b class="op-text-title">Skabelonnavn</b>
                                        <span class="op-text-info">${ templateList[i].templateName }</span>                               
                                    </p>
                                    <p class="op-text op-flex-col">
                                        <b class="op-text-title">Beskrivelse</b>
                                        <span class="op-text-info">3 kolonner + logo</span>
                                    </p>
                                    <p class="op-text op-flex-col">
                                        <b class="op-text-title">Logo</b>
                                        <span class="op-text-info">${ templateList[i].templateFilenameOriginal }</span>                               
                                    </p>
                                </div>
                                <div class="op-image op-flex-col">
                                    <img src="${ svgUrl + templateList[i].templateLayoutColumns + '/' + templateList[i].templateLayoutColumns }_${ templateList[i].templateLayout }.svg" alt="Template: ${ templateList[i].templateLayout }" width="100%" height="auto">
                                </div>
                            </div>
                            
                        </label>
                    </div>
                `

                ///// Add element to the container.
                containerElement.insertAdjacentHTML( 'beforeEnd', newTemplateElement )

            }

            ///// Create Response.
            error = false, code = 200, message = 'New Templates was added!'

        }
        
    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, code = 400, message = errorMessage

    }

    ///// Console Log if the Debug parameter is 'true'.
    opConsoleDebug( debug, 'opAddTemplatesToElement():', message )

    ///// Return the Response to the Function.
    return opReturnResponse( error, code, message )

}


/* ------------------------------------------
 >  6a-10. Adding Created Events to an Element
 ?  Updated: 2023-03-21 - 21:39 (Y:m:d - H:i)
--------------------------------------------- */
function opAddCreatedEventsToElement( debug, blockId, containerElement, eventList ) {

    ///// Create Variables.
    let error, code, message

    try {

        ///// If the Elements are missing.
        if ( ! blockId ) {
            throw 'Missing Block ID!'
        } else if ( ! containerElement ) {
            throw 'Missing Container Element!'
        } else if ( ! eventList ) {
            throw 'Missing Event List!'
        } else { 
           
            for( var i = 0; i < eventList.length; i++ ) {
                
                ///// Console Log if the Debug parameter is 'true'.
                opConsoleDebug( debug, `Event(${ eventList[i].eventCreationDate })`, eventList[i] )
                
                let tapColor = containerElement.getAttribute('data-tap-color')
                let eventLink = containerElement.getAttribute('date-event-link')
                let eventLinkTitle = containerElement.getAttribute('date-event-link-title')
                
                ///// Get Template Item.
                const templateItem = opGetTemplate( eventList[i].eventTemplate )
                if ( templateItem.error !== false ) return opConsoleDebug( debug, 'templateItem:', templateItem.response )
                
                ///// Console Log if the Debug parameter is 'true'.
                opConsoleDebug( debug, `templateItem`, templateItem )
                
                ///// The URL to the Layouts.
                const svgUrl = `${ opGetCurrentScriptPath().slice( 0, -3 ) }/img/svg/layouts/`

                ///// Create new element.
                newTemplateElement = `
                    <article id="${ blockId }-${ eventList[i].eventCreationDate }-event">
                        <button class="op-option-button" data-icon="xmark" onclick="opRemoveItemFromStorage( false, 'events', ${ eventList[i].eventCreationDate } ); return false">
                            <span class="op-icon" role="img" aria-label="Check Mark Icon"></span>
                        </button>
                        <div class="op-information">
                            <div class="op-info op-flex-row">
                                <p class="op-text" data-icon="calendar-days">
                                    <span class="op-icon" role="img" aria-label="Calendar Icon"></span>
                                    <span class="op-text-info">${ opTimeConverter( eventList[i].eventCreationDate, 'date-month-year', 'da' ) }</span>                               
                                </p>
                                <p class="op-text" data-icon="clock">
                                    <span class="op-icon" role="img" aria-label="Clock Icon"></span>
                                    <span class="op-text-info">${ opTimeConverter( eventList[i].eventCreationDate, 'hour-min' ) }</span>                               
                                </p>
                            </div>
                            <div class="op-content op-flex-col">
                                <p class="op-text op-flex-col">
                                    <b class="op-text-title">Eventnavn</b>
                                    <span class="op-text-info">${ eventList[i].eventName }</span>                               
                                </p>
                                <p class="op-text op-flex-col">
                                    <b class="op-text-title">Skabelonnavn</b>
                                    <span class="op-text-info">${ templateItem.response.templateName }</span>
                                </p>
                            </div>
                            <div class="op-image op-flex-col">
                                <img src="${ svgUrl + templateItem.response.templateLayoutColumns + '/' + templateItem.response.templateLayoutColumns }_${ templateItem.response.templateLayout }.svg" alt="Template: ${ templateItem.response.templateLayout }" width="100%" height="auto">
                            </div>
                            <div class="op-info-button op-flex-col">
                                <a href="${ eventLink }?event=${ eventList[i].eventCreationDate }" class="op-button op-button-size-small op-button-style-solid" data-color="${ tapColor }">
                                    <span class="op-button-title">${ eventLinkTitle }</span>
                                </a>
                            </div>
                        </div>
                        
                    </article>
                `

                ///// Add element to the container.
                containerElement.insertAdjacentHTML( 'beforeEnd', newTemplateElement )

            }

            ///// Create/throw Response.
            error = false, code = 200, message = 'All Events was added!'

        }

    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, message = errorMessage
        if ( errorMessage && ! code ) code = 400
        
        ///// Throw Error Response in the Console.
        console.error( 'opAddCreatedEventsToElement()', opReturnResponse( error, code, errorMessage ) )
        
    } finally {
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
    }

}

/* ------------------------------------------
 >  6a-11. Adding Created Templates to an Element
 ?  Updated: 2023-03-21 - 21:39 (Y:m:d - H:i)
--------------------------------------------- */
function opAddCreatedTemplatesToElement( debug, blockId, containerElement, templateList ) {

    ///// Create Variables.
    let error, code, message

    try {

        ///// If the Elements are missing.
        if ( ! blockId ) {
            throw 'Missing Block ID!'
        } else if ( ! containerElement ) {
            throw 'Missing Container Element!'
        } else if ( ! templateList ) {
            throw 'Missing Template List!'
        } else { 
           
            for( var i = 0; i < templateList.length; i++ ) {
                
                ///// Console Log if the Debug parameter is 'true'.
                opConsoleDebug( debug, `Template(${ templateList[i].templateCreationDate })`, templateList[i] )

                let tapColor = containerElement.getAttribute('data-tap-color')
                let templateLink = containerElement.getAttribute('date-template-link')
                let templateLinkTitle = containerElement.getAttribute('date-template-link-title')

                ///// The URL to the Layouts.
                const svgUrl = `${ opGetCurrentScriptPath().slice( 0, -3 ) }/img/svg/layouts/`

                ///// Create new element.
                newTemplateElement = `
                    <article id="${ blockId }-${ templateList[i].templateCreationDate }-template">
                        <button class="op-option-button" data-icon="xmark" onclick="opRemoveItemFromStorage( false, 'templates', ${ templateList[i].templateCreationDate } ); return false">
                            <span class="op-icon" role="img" aria-label="Check Mark Icon"></span>
                        </button>
                        <div class="op-information">
                            <div class="op-info op-flex-row">
                                <p class="op-text" data-icon="calendar-days">
                                    <span class="op-icon" role="img" aria-label="Calendar Icon"></span>
                                    <span class="op-text-info">${ opTimeConverter( templateList[i].templateCreationDate, 'date-month-year', 'da' ) }</span>                               
                                </p>
                                <p class="op-text" data-icon="clock">
                                    <span class="op-icon" role="img" aria-label="Clock Icon"></span>
                                    <span class="op-text-info">${ opTimeConverter( templateList[i].templateCreationDate, 'hour-min' ) }</span>                               
                                </p>
                            </div>
                            <div class="op-content op-flex-col">
                                <p class="op-text op-flex-col">
                                    <b class="op-text-title">Skabelonnavn</b>
                                    <span class="op-text-info">${ templateList[i].templateName }</span>                               
                                </p>
                                <p class="op-text op-flex-col">
                                    <b class="op-text-title">Beskrivelse</b>
                                    <span class="op-text-info">3 kolonner + logo</span>
                                </p>
                                <p class="op-text op-flex-col">
                                    <b class="op-text-title">Logo</b>
                                    <span class="op-text-info">${ templateList[i].templateFilenameOriginal }</span>                               
                                </p>
                            </div>
                            <div class="op-image op-flex-col">
                                <img src="${ svgUrl + templateList[i].templateLayoutColumns + '/' + templateList[i].templateLayoutColumns }_${ templateList[i].templateLayout }.svg" alt="Template: ${ templateList[i].templateLayout }" width="100%" height="auto">
                            </div>
                            <div class="op-info-button op-flex-col">
                                <a href="${ templateLink }?template=${ templateList[i].templateCreationDate }" class="op-button op-button-size-small op-button-style-solid" data-color="${ tapColor }">
                                    <span class="op-button-title">${ templateLinkTitle }</span>
                                </a>
                            </div>
                        </div>
                        
                    </article>
                `

                ///// Add element to the container.
                containerElement.insertAdjacentHTML( 'beforeEnd', newTemplateElement )

            }

            ///// Create/throw Response.
            error = false, code = 200, message = 'All Templates was added!'

        }

    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, message = errorMessage
        if ( errorMessage && ! code ) code = 400
        
        ///// Throw Error Response in the Console.
        console.error( 'opAddCreatedTemplatesToElement()', opReturnResponse( error, code, errorMessage ) )
        
    } finally {
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
    }

}


/* ------------------------------------------
 >   >  6a-12. Save New Event from Form 
--------------------------------------------- */
async function opSaveNewEvent( debug ) {

    ///// Create Variables.
    let error, code, message

    try {

        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( ! debug ) debug = false

        ///// Get the Elements.
        let blockElement = event.target.closest( 'section[id*="op-block"]' )
        let formElement = blockElement.querySelector( '.op-form-steps' )
        let saveButton = formElement.querySelector( '.op-button-save')
        let modalElement = blockElement.querySelector( '.op-modal')

        ///// Disable the Save button.
        saveButton.disabled = true

        ///// Set Approval to the Buttons in the Form Element.
        const createEventResponse = await opCreateEvent( debug, formElement )

        ///// Create/throw Response.
        if ( createEventResponse.error !== false ) throw createEventResponse.response
        else error = false, code = 200, message = `The Event could not be Created!`
       
        ///// Get Event Data.
        const eventData = createEventResponse.response
        let eventId = eventData.eventCreationDate

        ///// Activate the Modal Window.
        modalElement.classList.add( 'op-active' )
        
        ///// Set URL in the Modal Window.
        let eventUrl = modalElement.getAttribute( 'data-relocation-event' )
        modalElement.querySelector( '.op-button-event' ).setAttribute( 'href', `${ eventUrl }?event=${ eventId }` )

        ///// Create/throw Response.
        error = false, code = 200, message = 'The Number of Grid Columns was added to the Grid Element!'

    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, message = errorMessage
        if ( errorMessage && ! code ) code = 400
        
        ///// Throw Error Response in the Console.
        console.error( 'opSaveNewEvent()', opReturnResponse( error, code, errorMessage ) )
        
    } finally {
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
    }

}

/* ------------------------------------------
>  6a-13. Get Booking from FastAPI
--------------------------------------------- */
async function opGetBookingFromFastAPI( debug, bookingCode ) {
    
    ///// Create Variables.
    let error, code, message

    try {

        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( ! debug ) debug = false

        ///// Validate the Function Parameters.
        if ( ! bookingCode ) throw 'Missing Booking Code!'
        else {

            ///// The URL to the API.
            const url = `${ opGetFastApiInfo( 'url' ) }bookings/${ bookingCode }`

            ///// Fetch from the FastAPI.
            const apiData = await opGetApiData( debug, 'GET', '', url, 'json' )

            ///// Console Log if the Debug parameter is 'true'.
            opConsoleDebug( debug, `API Data:`, apiData )

            ///// If the Fetch Response has Code 200.
            if ( apiData.code === 200 ) {
                
                ///// Create Approved Response.
                error = false, code = 200, message = apiData.response
                
            } else if ( apiData.code === 404 ) {

                ///// Create not Found Response.
                error = true, code = 404, message = 'The Booking was not Found!'

            } else throw 'The API Data has an Error!'
            
        }

    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, code = 400, message = errorMessage
        
        ///// Throw Error Response in the Console.
        console.error( `opGetBookingFromFastAPI(${ bookingCode })`, opReturnResponse( error, code, errorMessage ) )
        
    } finally {
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
    }

}


/* ------------------------------------------
>  6a-14. Login Button
--------------------------------------------- */
function opLoginButton( debug, inputElement ) {

    ///// Create Variables.
    let error, code, message

    try {

        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( ! debug ) debug = false

        ///// Validate the Function Parameters.
        if ( ! inputElement ) inputElement = event.target

        ///// Get the Elements.
        let formElement = inputElement.closest( '.op-form-fields' )
        let loginButton = formElement.querySelector( '.op-button-save' )

        ///// Enable or Disable the Login Button.
        if ( inputElement.checked ) {
            
            ///// Enable the Login Button.
            loginButton.disabled = false
            
            ///// Create Response.
            error = false, code = 200, message = `The Login Button was Enabled!`
            
        } else {
            
            ///// Disable the Login Button.
            loginButton.disabled = true

            ///// Create Response.
            error = false, code = 200, message = `The Login Button was Disable!`

        }
 
    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, code = 400, message = errorMessage
        
        ///// Throw Error Response in the Console.
        console.error( `opLoginButton()`, opReturnResponse( error, code, errorMessage ) )
        
    } finally {
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
    }

}

/* ------------------------------------------
>  6a-15. Logout Button
--------------------------------------------- */
async function opLogoutButton( debug, url, inputElement ) {

    ///// Create Variables.
    let error, code, message

    try {

        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( ! debug ) debug = false

        ///// Validate the Function Parameters.
        if ( ! url ) throw 'Missing the URL to relocation!'
        else if ( ! inputElement ) inputElement = event.target

        ///// Get the Block Element.
        let blockElement = inputElement.closest( 'section[id*="op-block"]' )

        ///// The URL to the API.
        const adsUrl = `${ opGetCurrentScriptPath() }/../api/api-delete-session.php`

        ///// Fetch from Local PHP file.
        const deleteBookingResponse = await opGetApiData( debug, 'DELETE', '', adsUrl, 'json' )

        ///// Console Log if the Debug parameter is 'true'.
        opConsoleDebug( debug, `Delete Booking Response:`, deleteBookingResponse )

        ///// Validate the Fetch Response.
        if ( deleteBookingResponse.error !== false ) {
            
            ///// Throw Response.
            throw deleteBookingResponse.response.message

        } else {

            ///// Create Response.
            error = false, code = 200, message = `There is Logged out successfully!`

            ///// Relocate to the URL Link.
            opRelocateFromModal( url )

        }
    
 
    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, code = 400, message = errorMessage
        
        ///// Throw Error Response in the Console.
        console.error( `opLogoutButton()`, opReturnResponse( error, code, errorMessage ) )
        
    } finally {
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
    }

}

/* ------------------------------------------
>  6a-16. Validate the Booking Form
--------------------------------------------- */
async function opBookingFormValidation( debug, url ) {
    
    ///// Create Variables.
    let error, code, message
    
    try {
        
        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( ! debug ) debug = false
        
        ///// Validate the Function Parameters.
        if ( ! url ) throw 'Missing the URL Parameter!'
        
        ///// Get the Form Element.
        let formElement = event.target.closest( '.op-form-fields' )
        
        ///// Get the Booking Code from Form.
        let bookingElement = formElement[ 'bookingcode' ]
        let bookingCode = bookingElement.value
        
        ///// Get the Validated Input Response.
        const bookingResponse = await opGetBookingFromFastAPI( debug, bookingCode )
        
        
        ///// Validate to Booking Code.
        if ( bookingResponse.error !== false ) {
            
            let addErrorToElements = opAddValidationToElements( debug, formElement, [ bookingElement ], 'error' )
            
            if ( addErrorToElements.error !== false ) throw addErrorToElements.response
            else {
                ///// Create Response.
                error = false, code = 200, message = `The Error was Added to the Booking Element!`
            }

        } else {

            const createdBookingResponse = await opCreateBooking( debug, bookingResponse.response )

            if ( createdBookingResponse.error !== false ) throw createdBookingResponse.response
            else {

                let addApprovalToElements = opAddValidationToElements( debug, formElement, [ bookingElement ], 'approve' )
                
                if ( addApprovalToElements.error !== false ) throw addErrorToElements.response
                else {
                    ///// Create Response.
                    error = false, code = 200, message = `The Approval was Added to the Booking Element!`
                    
                    ///// Relocate to the URL Link.
                    opRelocateFromModal( url )
                }
            }

        }
 
    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, code = 400, message = errorMessage
        
        ///// Throw Error Response in the Console.
        console.error( `opBookingFormValidation(${ bookingCode })`, opReturnResponse( error, code, errorMessage ) )
        
    } finally {
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
    }

}

/* ------------------------------------------
 >  6a-17. Add new Participant to the Event List
 ?  Updated: 2023-02-26 - 20:45 (Y:m:d - H:i)
--------------------------------------------- */
async function opAddNewParticipantToEventList( debug, eventId ) {

    ///// Create Variables.
    let error, code, message

    try {

        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( ! debug ) debug = false

        ///// Validate the Function Parameters.
        if ( ! eventId ) throw 'Missing the Event ID!'
         
        ///// Get Event List.
        const eventItem = opGetEventList( eventId )
        if ( eventItem.error !== false ) throw 'Could not find the Event!'
        opConsoleDebug( debug, 'eventItem:', eventItem )
        // #NG (2023-02-21) - Maybe change the Name of the opGetEventList() Function

        ///// Get Template Item.
        const templateItem = opGetTemplate( eventItem.response.eventTemplate )
        if ( templateItem.error !== false ) throw 'Could not find the Template!'
        opConsoleDebug( debug, 'templateItem:', templateItem )

        ///// Get the Amount of Columns.
        let columnAmount = templateItem.response.templateLayoutColumns.charAt(0)

        ///// Get the Form Elements.
        let formElement = event.target.closest( '.op-form-fields' )       
        
        ///// Create an Array to contain Column Validation Elements.
        let columnValidation = []

        ///// Add Column to the Column Validation if the Column Input Field is Empty.
        for( let i = 0; i < columnAmount; ++i ) {
            if ( formElement[ `column-${ ( Number( i ) + 1 ) }` ].value.trim().length == 0 ) {
                columnValidation.push( `{ 'column${ ( Number( i ) + 1 ) }' : false }` )
            }            
        }

        ///// Check if the Amount of Column Validation is the same as the Amount of Columns.
        if ( columnAmount == columnValidation.length ) {

            formElement.querySelector( '.op-fieldset-step' ).setAttribute( 'data-validation', '2' )

            ///// Create Response.
            error = true, code = 400, message = `One or more Columns must be Filled!`
            
        } else {
            
            ///// Fetch from Local PHP file.
            const updateEventResponse = await opUpdateEvent( debug, eventId, formElement )
            
            ///// Console Log if the Debug parameter is 'true'.
            opConsoleDebug( debug, `Update Event Response:`, updateEventResponse )
            
            ///// Validate the Fetch Response.
            if ( updateEventResponse.error !== false ) {
                
                // #NG (2023-02-26) - Missing some Validation
                ///// Throw Response.
                throw updateEventResponse.response
    
            } else {
    
                ///// Create Response.
                error = false, code = 200, message = `The new Participant was Added!`
    
                ///// Reload Window.
                window.location.reload()

            }           

        }
        
    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, code = 400, message = errorMessage
        
        ///// Throw Error Response in the Console.
        console.error( `opAddNewParticipantToEventList()`, opReturnResponse( error, code, errorMessage ) )
        
    } finally {
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
    }

}

/* ------------------------------------------
 >  6a-18. Remove Event or Template from Local Storage
 ?  Updated: 2023-03-21 - 18:47 (Y:m:d - H:i)
--------------------------------------------- */
function opRemoveItemFromStorage( debug, storageName, itemId ) {

    ///// Create Variables.
    let error, code, message, storageResponse

    try {

        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( ! debug ) debug = false

        ///// Validate the Function Parameters.
        if ( ! storageName ) throw 'Missing the Storage Name!'
        if ( ! itemId ) throw 'Missing the Item ID!'
         
        ///// Check the Local Storage Name.
        if ( storageName.toUpperCase() === 'EVENTS' ) {

            ///// Get the Response from the Local Storage of Events.
            storageResponse = opDeleteEvent( debug, itemId )
            
        } else if ( storageName.toUpperCase() === 'TEMPLATES' ) {
            
            ///// Get the Response from the Local Storage of Templates.
            storageResponse = opDeleteTemplate( debug, itemId )
            
        } else throw 'Could not find the Local Storage!'
        
        ///// Validate the Local Storage Response.
        opConsoleDebug( debug, 'Storage Response:', storageResponse.response )

        ///// Validate the Local Storage Response.
        if ( storageResponse.error !== false ) {
            
            ///// Throw Response.
            throw storageResponse.response

        } else {

            ///// Create Response.
            error = false, code = 200, message = `The Item was Deleted!`

            ///// Reload Window.
            window.location.reload()

        }           
        
    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, code = 400, message = errorMessage
        
        ///// Throw Error Response in the Console.
        console.error( `opRemoveItemFromStorage()`, opReturnResponse( error, code, errorMessage ) )
        
    } finally {
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
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
        blocks.forEach( async block => {

            ///// Get Booking Item.
            const bookingItem = await opGetBookingFromSession( debug )
            opConsoleDebug( debug, 'bookingItem:', bookingItem )

            let bookingStartDate = opTimeConverter( bookingItem.response.bookingStartDate, 'date-month-year', 'da' )
            let bookingEndDate = opTimeConverter( bookingItem.response.bookingEndDate, 'date-month-year', 'da' )

            let bookingStartDateFull = opTimeConverter( bookingItem.response.bookingStartDate, 'full' )
            let bookingEndDateFull = opTimeConverter( bookingItem.response.bookingEndDate, 'full' )

            block.querySelector('.booking-code .text').innerHTML = bookingItem.response.bookingId
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
        blocks.forEach( async block => {

            ///// Get Booking Item.
            const bookingItem = await opGetBookingFromSession( debug )
            opConsoleDebug( debug, 'bookingItem:', bookingItem )

            block.querySelector('.printer-id .text').innerHTML = bookingItem.response.printerId

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
            const eventsStorage = opGetLocalStorage( debug, 'Events' )

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
            const eventsStorage = opGetLocalStorage( debug, 'Events' )

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
 ?  Updated: 2023-02-21 - 19:10 (Y:m:d - H:i)
------------------------------------------------------------ */
function opEventParticipantListBlocks() {

    /* -----------------------------------
        OLD BLOCK - NOT USED
    --------------------------------------*/

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
            const eventsStorage = opGetLocalStorage( debug, 'Events' )

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

            
            // #NG (2023-02-26) - New Code
            ///// Get Template Item.
            const templateItem = opGetTemplate( eventItems[0].eventTemplate )
            if ( templateItem.error !== false ) opConsoleDebug( true, 'templateItem:', 'Could not find the Template!' )
            opConsoleDebug( true, 'templateItem:', templateItem )

            
            ///// Get the Amount of Columns.
            let columnAmount = templateItem.response.templateLayoutColumns.charAt(0)
            
            ///// Get All Column Elements.
            let columnElements = block.querySelectorAll( '.op-modal .op-fieldset__inner .op-input-wrapper input' )
            
            if ( columnAmount !== columnElements.length ) {
                opConsoleDebug( debug, 'columnElements:', 'There are too many Column Elements in relation to the Number of Columns in the Event!' )
                
                ///// Delete the Column Element if the Column Number is above the Amount of Columns.
                for( let i = 0; i < columnElements.length; ++i ) {                   
                    if ( columnAmount < Number( i + 1 ) ) {
                        columnElements[i].closest( '.op-input-wrapper' ).remove()
                        opConsoleDebug( debug, `columnElement-${ Number( i + 1 ) }:`, 'The Column Element is deleted!' )
                    }
                }
            } else opConsoleDebug( debug, 'columnElements:', 'The Number of Column Elements is Correct!' )

            ///// Add Function to Modal Window. 
            block.querySelector( '.op-modal .op-button-save' ).setAttribute( 'onclick', `opAddNewParticipantToEventList( false, ${ eventListId } )` )

            ///// Add Function to Modal Window. 
            block.querySelector( '.op-modal .op-button-save' ).setAttribute( 'onclick', `opAddNewParticipantToEventList( false, ${ eventListId } )` )

        })
    }
}

/* ---------------------------------------------------------
 >  6c-8. Template Creation
 *  Check if multiple (Template Creation) Blocks is on page
------------------------------------------------------------ */
function opTemplateCreationBlocks() {

    ///// Debug the function
    let debug = false // true or false 

    ///// Get the elements.
    let blockName = 'Template Creation'
    let blocks = document.querySelectorAll( '.op-template-creation' )
    opConsoleDebug( debug, 'blocks:', blocks )

    
    ///// Get each Block.
    if ( blocks ) {
        blocks.forEach( async block => {
            
            ///// Get the elements.
            let blockId = block.getAttribute( 'id' )
            opConsoleDebug( debug, 'blockId:', blockId )

            ///// Get Booking Item.
            const bookingItem = await opGetBookingFromSession( debug )
            opConsoleDebug( debug, 'bookingItem:', bookingItem )

            ///// Get Layouts from Booking.
            const layouts = bookingItem.response.nameTagType.nameTagTypeLayouts
            if ( layouts.length == 0 ) return opConsoleDebug( true, 'layouts:', 'Could not find any Layouts!' )
            opConsoleDebug( debug, 'Layouts:', layouts )

            let cols = [ '1C', '2C', '3C', '4C', '5C' ]
            //let cols = [ '3C', '4C' ]

            ///// The URL to the Layouts.
            const svgUrl = `${ opGetCurrentScriptPath().slice( 0, -3 ) }/img/svg/layouts/`

            let container, col

            let checkImageURL = async function( col, imageName ) {
                //let image = new Image()
                let url_image = svgUrl + col + '/' + col + '_' + imageName + '.svg'
                //image.src = url_image
                return await opFetchDataFromApi( false, url_image, {}, 'blob' )
            }
            
            for( var c = 0; c < cols.length; c++ ) {

                for( var i = 0; i < layouts.length; i++ ) {

                    if ( ( await checkImageURL( cols[c], layouts[i] )).error == false ) {

                        if ( layouts[i].includes( 'P' ) ) {

                            opConsoleDebug( debug, `layout-${i}:`, layouts[i] )
            
                            col = cols[c].slice( 0, -1 )

                            layoutElement = `
                                <div class="op-radio-input" data-layout-col="${ col }">
                                    <input type="radio" id="${ blockId }-${ cols[c] }_${ layouts[i] }-input" oninput="opFormInputValidation()" name="layout" value="${ cols[c] }_${ layouts[i] }" required>
                                    <label for="${ blockId }-${ cols[c] }_${ layouts[i] }-input">
                                        <div class="op-radio-check" data-icon="circle-check">
                                            <span class="op-icon" role="img" aria-label="Check Mark Icon"></span>
                                        </div>
                                        <div class="op-radio-info">
                                            <div class="op-image op-flex-col">
                                                <img src="${ svgUrl + cols[c] }/${ cols[c] }_${ layouts[i] }.svg" alt="Columns: ${ col }, Layout: ${ layouts[i] }" width="100%" height="auto">
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            `

                            /* <p class="op-radio-info">
                                <span class="op-text">${ layouts[i] }</span>
                            </p> */

                            container = block.querySelector( `#${ blockId }-radio-inputs .op-form-radio-inputs` )

                            ///// Add element to the container.
                            container.insertAdjacentHTML( 'beforeEnd', layoutElement )       

                        }
                    }
                }

            }
        })
    }
}

/* ---------------------------------------------------------
 >  6c-9. Event Creation
 *  Check if multiple (Event Creation) Blocks is on page
------------------------------------------------------------ */
function opEventCreationBlocks() {

    ///// Debug the function
    let debug = false // true or false 

    ///// Get the elements.
    let blockName = 'Event Creation'
    let blocks = document.querySelectorAll( '.op-event-creation' )
    opConsoleDebug( debug, 'blocks:', blocks )

    ///// Get each Block.
    if ( blocks ) {
        blocks.forEach( async block => {
            
            ///// Create Variables.
            let error, code, message

            try {            

                ///// Get the Block ID.
                let blockId = block.getAttribute( 'id' )

                ///// Get the Radio Inputs Container.
                let containerElement = block.querySelector( `#${ blockId }-radio-inputs .op-form-radio-inputs` )
               
                ///// Get the Local Storage of Templates.
                const templatesStorage = opGetLocalStorage( debug, 'Templates' )
    
                ///// Validate the Response from the Local Storage of Templates.
                if ( templatesStorage.error !== false ) throw templatesStorage.response
    
                ///// Get the Template List from the Local Storage of Templates.
                const templateList = templatesStorage.response.templateList

                ///// Sort the Template List after newest date.
                const sortedTemplateList = templateList.sort( (a, b) => a.templateCreationDate - b.templateCreationDate ).reverse()

                ///// Add new Templates to the Container Element.
                const addTemplatesToElement = opAddTemplatesToElement( debug, blockId, containerElement, sortedTemplateList )
    
                ///// Validate the Response from the Adding Templates Function.
                if ( addTemplatesToElement.error !== false ) throw addTemplatesToElement.response
                
                ///// Get the Template ID from the URL Parameter.
                const templateId = await opGetUrlParameters().template

                if ( templateId !== '' ) {

                    ///// Get Template Item.
                    const templateItem = opGetTemplate( templateId )
                    if ( templateItem.error !== false ) opConsoleDebug( debug, 'templateItem:', 'Could not find the Template!' )

                    ///// Get the Amount of Columns.
                    let columnAmount = templateItem.response.templateLayoutColumns.charAt(0)

                    let radioInput = block.querySelector( `#${ blockId }-${ templateId }-input` )
                    
                    let formElement = radioInput.closest( '.op-form-steps' )
                    opSetGridCols( debug, columnAmount, formElement )
                    
                    // #NG3
                    ///// #NG - Need validation from opSetGridCols() before proceeding! 

                    radioInput.checked = true
                    radioInput.closest( '.op-radio-input' ).classList.add( 'op-radio-input-checked' )                   


                    opFormInputValidation( debug, 'fieldset', radioInput )

                }

            } catch( errorMessage ) {
    
                ///// Throw Error Response.
                error = true, code = 400, message = errorMessage

            }

            ///// Console Log if the Error parameter is 'true'.
            if ( error !== false ) opConsoleDebug( debug, `opEventCreationBlocks:`, message )

        })
    }
}

/* ---------------------------------------------------------
 >  6c-10. Site Login
 *  Check if multiple (Site Login) Blocks is on page
------------------------------------------------------------ */
function opSiteLoginBlocks() {
    
    ///// Create Variables.
    let error, code, message

    try {

        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( ! debug ) debug = false

        ///// Get the elements.
        let blockName = 'Site Login'
        let blocks = document.querySelectorAll( '.op-site-login' )
        opConsoleDebug( debug, 'blocks:', blocks )

        return
        
        ///// Get each Block.
        if ( blocks ) { blocks.forEach( block => {

            ///// Get the Block ID.
            let blockId = block.getAttribute( 'id' )

            ///// Get the Radio Inputs Container.
            let containerElement = block.querySelector( `#${ blockId }-radio-inputs .op-form-radio-inputs` )
        
            ///// Get the Local Storage of Templates.
            const templatesStorage = opGetLocalStorage( debug, 'Templates' )

            ///// Validate the Response from the Local Storage of Templates.
            if ( templatesStorage.error !== false ) throw templatesStorage.response

            ///// Get the Template List from the Local Storage of Templates.
            const templateList = templatesStorage.response.templateList

            ///// Sort the Template List after newest date.
            const sortedTemplateList = templateList.sort( (a, b) => a.templateCreationDate - b.templateCreationDate ).reverse()

            ///// Add new Templates to the Container Element.
            const addTemplatesToElement = opAddTemplatesToElement( debug, blockId, containerElement, sortedTemplateList )

            ///// Validate the Response from the Adding Templates Function.
            if ( addTemplatesToElement.error !== false ) throw addTemplatesToElement.response
            
            ///// Get the Template ID from the URL Parameter.
            const templateId = opGetUrlParameters().template

            if ( templateId ) {

                ///// Find Template Item.
                let templateItem = templateList.filter( template => template.templateCreationDate === Number( templateId ) )
                opConsoleDebug( debug, `template-${ templateId }:`, templateItem )

                let formElement = radioInput.closest( '.op-form-steps' )
                opSetGridCols( debug, templateItem[0].templateLayoutColumns.charAt(0), formElement )

                ///// #NG - Need validation from opSetGridCols() before proceeding! 

                let radioInput = block.querySelector( `#${ blockId }-${ templateId }-input` )
                
                radioInput.checked = true
                radioInput.closest( '.op-radio-input' ).classList.add( 'op-radio-input-checked' )                   


                opFormInputValidation( debug, 'fieldset', radioInput )

            }

        })}
        
    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, code = 400, message = errorMessage
        
        ///// Throw Error Response in the Console.
        console.error( `opSiteLoginBlocks()`, opReturnResponse( error, code, errorMessage ) )
        
    } finally {
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
    }

}


/* ---------------------------------------------------------
 >  6c-11. Dashboard
 *  Check if multiple (Dashboard) Blocks is on page
------------------------------------------------------------ */
function opDashboardBlocks( debug ) {
     
    ///// Create Variables.
    let error, code, message

    try {

        ///// Set the Parameter If is not defined.
        ////* true or false
        if ( ! debug ) debug = false

        ///// Get the elements.
        let blockName = 'Dashboard'
        let blocks = document.querySelectorAll( '.op-dashboard' )
        opConsoleDebug( debug, 'blocks:', blocks )
      
        ///// Get each Block.
        if ( blocks ) { blocks.forEach( block => {

            ///// Get the Block ID.
            let blockId = block.getAttribute( 'id' )



            ///// Get the Radio Inputs Container.
            let eventsSectionElement = block.querySelector( `.op-block__taps section.events` )
            let eventsContainerElement = block.querySelector( `.op-block__taps section .op-tap__inner .op-tap__events` )
        
            location.hash = "events";

            ///// Get the Local Storage of Templates.
            const eventsStorage = opGetLocalStorage( debug, 'Events' )

            ///// Validate the Response from the Local Storage of Templates.
            if ( eventsStorage.error !== false ) throw eventsStorage.response

            ///// Get the Template List from the Local Storage of Templates.
            const eventList = eventsStorage.response.eventList

            ///// Sort the Template List after newest date.
            const sortedEventList = eventList.sort( (a, b) => a.templateCreationDate - b.templateCreationDate ).reverse()

            ///// Add new Templates to the Container Element.
            const addEventsToElement = opAddCreatedEventsToElement( debug, blockId, eventsContainerElement, sortedEventList )



            ///// Get the Radio Inputs Container.
            let templatesContainerElement = block.querySelector( `.op-block__taps section .op-tap__inner .op-tap__templates` )
        
            ///// Get the Local Storage of Templates.
            const templatesStorage = opGetLocalStorage( debug, 'Templates' )

            ///// Validate the Response from the Local Storage of Templates.
            if ( templatesStorage.error !== false ) throw templatesStorage.response

            ///// Get the Template List from the Local Storage of Templates.
            const templateList = templatesStorage.response.templateList

            ///// Sort the Template List after newest date.
            const sortedTemplateList = templateList.sort( (a, b) => a.templateCreationDate - b.templateCreationDate ).reverse()

            ///// Add new Templates to the Container Element.
            const addTemplatesToElement = opAddCreatedTemplatesToElement( debug, blockId, templatesContainerElement, sortedTemplateList )



            /*///// Validate the Response from the Adding Templates Function.
            if ( addTemplatesToElement.error !== false ) throw addTemplatesToElement.response
            
            ///// Get the Template ID from the URL Parameter.
            const templateId = opGetUrlParameters().template

             if ( templateId ) {

                ///// Find Template Item.
                let templateItem = templateList.filter( template => template.templateCreationDate === Number( templateId ) )
                opConsoleDebug( debug, `template-${ templateId }:`, templateItem )

                let formElement = radioInput.closest( '.op-form-steps' )
                opSetGridCols( debug, templateItem[0].templateLayoutColumns.charAt(0), formElement )

                ///// #NG - Need validation from opSetGridCols() before proceeding! 

                let radioInput = block.querySelector( `#${ blockId }-${ templateId }-input` )
                
                radioInput.checked = true
                radioInput.closest( '.op-radio-input' ).classList.add( 'op-radio-input-checked' )                   


                opFormInputValidation( debug, 'fieldset', radioInput )

            } */

        })}
        
    } catch( errorMessage ) {

        ///// Throw Error Response.
        error = true, code = 400, message = errorMessage
        
        ///// Throw Error Response in the Console.
        console.error( `opSiteLoginBlocks()`, opReturnResponse( error, code, errorMessage ) )
        
    } finally {
        
        ///// Return the Response to the Function.
        return opReturnResponse( error, code, message )
    
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
            'opEventParticipantListBlocks',
            'opEventCreationBlocks',
            'opDashboardBlocks',
            'opEventListBlocks'
        ]

        ///// Check if the Functions exist and execute
        const functionValidation = opCheckFunctionExist ( functionNames, true )
        if ( functionValidation.error !== false ) throw functionValidation       

    } catch ( error ) {
        opConsoleDebug( debug, 'opDocumentReady:', error )
    }
}
opListener( 'load', window, opDocumentReady )