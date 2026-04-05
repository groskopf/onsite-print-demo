/* ------------------------------------------------------------------------
 #  JS Part Name: Participant Listeners Script
 *  Functions Used in the Add Participant Scripts in the Event Block.
 ?  Updated: 2026-02-22 - 05:15 (Y:m:d - H:i)
 ?  Info: Changed the comments in stripSurroundingQuotes().
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Participant Toggle Listener

    3. 	Function: Print Participant Listener

    4.  Function: Column Input Listener

    5.  Function: Create Participant Listener

    6.  Function: Download CSV File Listener

    7.  Function: Download PDF File Listener

    8.  Function: Search for Participant Listener

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../assets/js/inc/basic.js'
import * as opModuleParticipant from '../../../assets/js/inc/participant/participant.js'
import { opChangeModalContent } from '../../../assets/js/inc/modal/change-modal-content.js'
import { opAddParticipant } from './add-participant.js'
import { opGetEvent } from '../../../assets/js/inc/event/event.js'
import { opGetTemplate } from '../../../assets/js/inc/template/template.js'
import { opGetApiData } from '../../../assets/js/inc/api/get-api-data.js'

/* ------------------------------------------------------------------------
 #  2. Function: Participant Toggle Listener
--------------------------------------------------------------------------- */
export function opParticipantToggleListener( debug, participant, participantId ) {

    try {
        
        ///// Get Function Name.
        var functionName = opParticipantToggleListener.name
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Set Participant Toggle Listener to the Participant Template Element.
        opModuleBasic.opListener( 'click', participant, async () => {

            ///// Start the Console Log Group.
            if ( debug ) console.group( `Participant with ID: op-participant_${ participantId }` )
                
            ///// Add Class when the Participant is Clicked on.
            opToggleActive( 'class', 'op-participant' )

            ///// Console Log Success if Debug.
            if ( debug ) console.log( 'SUCCESS:', { 
                message: `No errors were found in the Participant Toggle Listener!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            })

            ///// End the Console Log Group.
            if ( debug ) console.groupEnd()
            
        } )

        ///// Console Log Success if Debug.
        if ( debug ) console.log( 'SUCCESS:', { 
            message: `The Participant Toggle Listener is Active!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

    } catch( errorResponse ) {

        ///// Create Error Details.
        let errorDetails = ( errorResponse.error == true ) ? errorResponse : opModuleBasic.opReturnResponse( false, 400, { 
            message: errorResponse.message,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Log Error Details in the Console.
        if ( debug ) console.error( 'ERROR:', errorDetails )

    } finally {

        ///// End the Console Log Group.
        if ( debug ) console.groupEnd()

    }

}

/* ------------------------------------------------------------------------
 #  3. Function: Print Participant Listener
--------------------------------------------------------------------------- */
export function opPrintParticipantListener( debug, printButton, eventId, participantId ) {

    try {
        
        ///// Get Function Name.
        var functionName = opPrintParticipantListener.name
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Set Print Participant Listener to the Participant Print Button.
        opModuleBasic.opListener( 'click', printButton, async ( event ) => {

            ///// Start the Console Log Group.
            if ( debug ) console.group( `Participant with ID: op-participant_${ participantId }` )

            ///// Stop Propagation from the Event Listener.
            event.stopPropagation()

            ///// Set the Participant Element.
            let participantElement = event.target.closest( 'article' )
            participantElement.classList.add( 'op-active' )
            participantElement.querySelector( 'button.op-participant-print' ).disabled = true
            participantElement.setAttribute( 'data-validation', '1' )
            
            try {

                ///// Print the Participant.
                const printParticipantResponse = await opModuleParticipant.opPrintParticipant( debug, eventId, participantId )

                ///// Validate the Response from the Print the Participant.
                if ( printParticipantResponse.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
                    message: `Something went wrong Printing the Event!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )

                ///// Get the Participant.
                const participant = printParticipantResponse.response.details.participant

                ///// Update the Participant.
                const updateParticipantResponse = await opModuleParticipant.opUpdateParticipant( debug, eventId, participant )

                ///// Validate the Response from the Update the Participant.
                if ( updateParticipantResponse.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
                    message: `Something went wrong Updating the Event!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )

                ///// Set Timeout to three seconds.
                setTimeout( () => {

                    ///// Set the Participant Element.
                    participantElement.querySelector( 'button.op-participant-print' ).disabled = false
                    participantElement.setAttribute( 'data-validation', '2' )
                    participantElement.setAttribute( 'data-op-arrival', participant.active )
                    participantElement.setAttribute( 'data-op-prints', participant.prints )
                    participantElement.querySelector( '.op-col-amount-of-prints' ).textContent = participant.prints
                    participantElement.querySelectorAll( '.op-col-arrival-time' ).forEach( timeElement => {
                        timeElement.setAttribute( 'datetime', opModuleBasic.opTimeConverter( participant.time, 'full' ) )
                        timeElement.querySelector( '.op-text' ).textContent =  opModuleBasic.opTimeConverter( participant.time, 'hour-min' )
                    } )

                    //// #NG - TODO: This function need to be changed, when a new (EventInformationBlock) is created.
                    ///// Update Event Information Blocks.
                    opEventInformationBlocks()

                }, 3000 )

                ///// Console Log Success if Debug.
                if ( debug ) console.log( 'SUCCESS:', { 
                    message: `No errors were found in the Print Participant Listener!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )

            } catch( errorListenerResponse ) {

                ///// Set Timeout to three seconds.
                setTimeout( () => {
                    
                    ///// Set the Participant Element.
                    let dateNow = Date.now()
                    participantElement.querySelector( 'button.op-participant-print' ).disabled = false
                    participantElement.setAttribute( 'data-validation', '3' )    
                    participantElement.querySelectorAll( '.op-col-arrival-time' ).forEach( timeElement => {
                        timeElement.setAttribute( 'datetime', opModuleBasic.opTimeConverter( dateNow, 'full' ) )
                        timeElement.querySelector( '.op-text' ).textContent =  opModuleBasic.opTimeConverter( dateNow, 'hour-min' )
                    } )

                }, 3000 )

                ///// Log Error Details in the Console.
                if ( debug ) console.error( 'ERROR:', errorListenerResponse )

            }

            ///// End the Console Log Group.
            if ( debug ) console.groupEnd()
            
        })

        ///// Console Log Success if Debug.
        if ( debug ) console.log( 'SUCCESS:', { 
            message: `The Print Participant Listener is Active!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

    } catch( errorResponse ) {

        ///// Create Error Details.
        let errorDetails = ( errorResponse.error == true ) ? errorResponse : opModuleBasic.opReturnResponse( false, 400, { 
            message: errorResponse.message,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Log Error Details in the Console.
        if ( debug ) console.error( 'ERROR:', errorDetails )

    } finally {

        ///// End the Console Log Group.
        if ( debug ) console.groupEnd()

    }

}

/* ------------------------------------------------------------------------
 #  4. Function: Column Input Listener
--------------------------------------------------------------------------- */
export function opColumnInputListener( debug, block, inputElement, saveButton ) {

    try {

        ///// Get Function Name.
        var functionName = opColumnInputListener.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Set Column Input Listener to the Input Element.
        opModuleBasic.opListener( 'input', inputElement, async () => {

            ///// Start the Console Log Group.
            if ( debug ) console.group( `opColumnInputListener()` )

            ///// Check if the String is Empty (Return: True or False).
            const isEmpty = string => ! string || ! string.trim().length

            ///// If the Input Element is Empty.
            if ( isEmpty( inputElement.value ) ) {

                ///// Add "disabled" to the Create Participant Button.
                saveButton.disabled = true

            } else {

                ///// Remove the Validation from the Form.
                block.querySelector( '.op-modal' ).removeAttribute( 'data-validation' )

                ///// Remove "disabled" from the Create Participant Button.
                saveButton.disabled = false

            }

            ///// Console Log Success if Debug.
            if ( debug ) console.log( 'SUCCESS:', { 
                message: `No errors were found in the Column Input Listener!`,
                line: opModuleBasic.errorLine(),
                function: functionName,
                details: {
                    input: ! isEmpty( inputElement.value ),
                    value: inputElement.value
                }
            } )

            ///// End the Console Log Group.
            if ( debug ) console.groupEnd()

        } )

        ///// Console Log Success if Debug.
        if ( debug ) console.log( 'SUCCESS:', { 
            message: `The Column Input Listener is Active!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

    } catch( errorResponse ) {

        ///// Create Error Details.
        let errorDetails = ( errorResponse.error == true ) ? errorResponse : opModuleBasic.opReturnResponse( false, 400, { 
            message: errorResponse.message,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Log Error Details in the Console.
        if ( debug ) console.error( 'ERROR:', errorDetails )

    } finally {

        ///// End the Console Log Group.
        if ( debug ) console.groupEnd()

    }

}

/* ------------------------------------------------------------------------
 #  5. Function: Create Participant Listener
--------------------------------------------------------------------------- */
export function opCreateParticipantListener( debug, block, button, eventId, formElement ) {

    try {
        
        ///// Get Function Name.
        var functionName = opCreateParticipantListener.name
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Set Create Participant Listener to the Button Element.
        opModuleBasic.opListener( 'click', button, async () => {

            ///// Start the Console Log Group.
            if ( debug ) console.group( `opCreateParticipantListener()` )

            try {

                ///// Check if the String is Empty (Return: True or False).
                const isEmpty = string => ! string || ! string.trim().length

                ///// Strip surrounding single or double quotes from a string if the string contains VCARD or MECARD.
                function stripSurroundingQuotes( string ) {

                    ///// Trim the String for Whitespace.
                    string = string.trim()

                    ///// Detect presence of VCARD / MECARD in the string (Return: True or False).
                    ////* Uses regular expression with (i = case-insensitive).
                    const containsVCARD = /vcard/i.test( string )
                    const containsMECARD = /mecard/i.test( string )

                    ///// If VCARD or MECARD is detected, return without surrounding quotes.
                    if ( containsVCARD || containsMECARD ) {
                        if ( ( string.startsWith( '"' ) && string.endsWith( '"' ) ) || ( string.startsWith( "'" ) && string.endsWith( "'" ) ) ) {
                            return string.slice( 1, -1 )
                        }
                    }

                    ///// If no VCARD or MECARD is detected, return the original string.
                    return string
                }

                ///// Define the Participant Data variables.
                let id = 'np' + Date.now()
                let column1 = isEmpty( formElement[ 'column-1' ].value ) ? '' : formElement[ 'column-1' ].value
                let column2 = isEmpty( formElement[ 'column-2' ].value ) ? '' : formElement[ 'column-2' ].value
                let column3 = isEmpty( formElement[ 'column-3' ].value ) ? '' : formElement[ 'column-3' ].value
                let column4 = isEmpty( formElement[ 'column-4' ].value ) ? '' : formElement[ 'column-4' ].value
                let column5 = isEmpty( formElement[ 'column-5' ].value ) ? '' : formElement[ 'column-5' ].value
                let qrCode = isEmpty( formElement[ 'qr' ].value ) ? '' : stripSurroundingQuotes( formElement[ 'qr' ].value )
                let note = isEmpty( formElement[ 'note' ].value ) ? '' : formElement[ 'note' ].value
                
                ///// If all the Columns are Empty throw an error.
                if ( ( column1 == '' ) && ( column2 == '' ) && ( column3 == '' ) && ( column4 == '' ) && ( column5 == '' ) ) throw opModuleBasic.opReturnResponse( true, 404, { 
                    message: `At least one Column must be Filled!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )

                ///// Define new Participant variable.
                let participant = {
                    id : id,
                    line1 : column1,
                    line2 : column2,
                    line3 : column3,
                    line4 : column4,
                    line5 : column5,
                    qrCode : qrCode,
                    note : note,
                    time : '',
                    active : 0,
                    prints : 0
                }

                ///// Create the Participant.
                const createParticipantResponse = await opModuleParticipant.opCreateParticipant( debug, eventId, participant )

                ///// Validate the Response from the Create the Participant.
                if ( createParticipantResponse.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
                    message: `Something went wrong Creating the Event!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )


                ///// Clear the Form Values and the Validation.
                let inputElements = formElement.querySelectorAll( 'input' )
                block.querySelector( '.op-modal' ).removeAttribute( 'data-validation' )
                formElement.querySelector( 'textarea' ).value = ''
                inputElements.forEach( inputElement => {
                    inputElement.value = ''
                } )

                ///// Add "disabled" to the Create Participant Button.
                button.disabled = true

                ///// Close the Modal.
                opChangeModalContent( debug, block.querySelector( '.op-modal' ), false )

                ///// Get the Participants Container.
                let participantsContainer = block.querySelector('.op-participant-list')

                ///// Create a Participant Element.
                const participantResponse = opAddParticipant( debug, eventId, participantsContainer, participant, 'afterbegin' )

                ///// Validate the Participant Response.
                if ( participantResponse.error !== false ) {

                    ///// Console Log Group Value.
                    if ( debug ) console.debug( 'DEBUG:', { 
                        message: `Something went wrong when adding a Participant!`,
                        line: opModuleBasic.errorLine(),
                        function: functionName
                    } )

                } else {

                    ///// Scroll to the New Participant.
                    block.scrollIntoView( { behavior: 'instant', block: 'start' } )

                    ///// Set Timeout for the New Participant.
                    setTimeout( () => {

                        ///// Fade In the New Participant.
                        participantResponse.response.details.classList.add( 'op-fade-in' )

                        //// #NG - TODO: This function need to be changed, when a new (EventInformationBlock) is created.
                        ///// Update Event Information Blocks.
                        opEventInformationBlocks()

                    }, 500 )

                }

                ///// Console Log Success if Debug.
                if ( debug ) console.log( 'SUCCESS:', { 
                    message: `No errors were found in the Create Participant Listener!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )

            } catch( errorListenerResponse ) {

                ///// Add the Validation to the Modal.
                if ( errorListenerResponse.code == 404 ) {
                    block.querySelector( '.op-modal' ).setAttribute( 'data-validation', '2' )
                } else {
                    block.querySelector( '.op-modal' ).classList.add( 'op-error' )
                }

                ///// Log Error Details in the Console.
                if ( debug ) console.error( 'ERROR:', errorListenerResponse )

            }

            ///// End the Console Log Group.
            if ( debug ) console.groupEnd()

        } )

        ///// Console Log Success if Debug.
        if ( debug ) console.log( 'SUCCESS:', { 
            message: `The Create Participant Listener is Active!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

    } catch( errorResponse ) {

        ///// Create Error Details.
        let errorDetails = ( errorResponse.error == true ) ? errorResponse : opModuleBasic.opReturnResponse( false, 400, { 
            message: errorResponse.message,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Log Error Details in the Console.
        if ( debug ) console.error( 'ERROR:', errorDetails )

    } finally {

        ///// End the Console Log Group.
        if ( debug ) console.groupEnd()

    }

}

/* ------------------------------------------------------------------------
 #  6. Function: Download CSV File Listener
--------------------------------------------------------------------------- */
export function opDownloadCSVFileListener( debug, button, eventId ) {

    try {
        
        ///// Get Function Name.
        var functionName = opDownloadCSVFileListener.name
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Set Create Participant Listener to the Button Element.
        opModuleBasic.opListener( 'click', button, async () => {

            ///// Start the Console Log Group.
            if ( debug ) console.group( `opDownloadCSVFileListener()` )

            try {

                ///// Get the Event. 
                const eventItem = opGetEvent( debug, eventId )

                ///// Validate the Response from the Get Event.
                if ( eventItem.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
                    message: `Something went wrong getting the Event!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )

                ///// Create Variables.
                const currentDate = opModuleBasic.opTimeConverter( new Date(), 'file')
                const filename = eventItem.response.details.eventName.replace(/ /g,"-")
                const participantList = eventItem.response.details.eventParticipants
                const newFilename = ( filename + '_' + currentDate.toString() )

                ///// Convert Epoch Timestamp to new Date
                ////* https://www.epochconverter.com/
                participantList.forEach( participant => {
                    let newDate = new Date( Number( participant.time ) )
                    let newParticipantTime = Math.floor( newDate.getTime() / 1000.0 )
                    participant.time = newParticipantTime
                } )

                ///// Create new Form Element.
                const formData = new FormData()

                
                ///// Add Data to the new Form Element
                formData.append( 'event-list', JSON.stringify( participantList ) )

                ///// The URL to the API.
                const url = `${ opModuleBasic.opGetCurrentScriptPath() }/../api/api-convert/api-convert-json-into-csv.php`

                ///// Get JSON with CSV Data.
                const jsonResponse = await opGetApiData( debug, 'POST', formData, url, 'json', 'form' )

                ///// Validate the JSON Response.
                if ( jsonResponse.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
                    message: `Something went wrong when Converting the Participant List into CSV format!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )
                
                ///// Create a Blob with the Participant List in CSV Format
                var blob = new Blob( jsonResponse.response.details, { type: 'text/csv;charset=utf-8;' } )

                ///// Check if the Browser is Internet Explorer (10+) else use the Create Element method.
                if ( navigator.msSaveBlob ) {

                    ///// Internet Explorer (10+) method.
                    navigator.msSaveBlob( blob, newFilename )

                } else {

                    ///// Create a Link Element
                    const link = document.createElement( 'a' )

                    ///// Check if the Link Element has the HTML Download attribute.
                    if ( link.download !== undefined ) {   

                        const blobURL = URL.createObjectURL( blob )
                        link.setAttribute( 'href', blobURL )
                        link.setAttribute( 'download', newFilename )
                        link.style.visibility = 'hidden'

                        ///// Append the Link Element
                        document.body.appendChild( link )

                        ///// Trigger a Click
                        link.click()

                        /////Remove the Element again.
                        document.body.removeChild( link )

                    }
                }

                ///// Console Log Success if Debug.
                if ( debug ) console.log( 'SUCCESS:', { 
                    message: `No errors were found in the Download CSV File Listener!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )

            } catch( errorListenerResponse ) {

                ///// Log Error Details in the Console.
                if ( debug ) console.error( 'ERROR:', errorListenerResponse )

            }

            ///// End the Console Log Group.
            if ( debug ) console.groupEnd()

        })

        ///// Console Log Success if Debug.
        if ( debug ) console.log( 'SUCCESS:', { 
            message: `The Download CSV File Listener is Active!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

    } catch( errorResponse ) {

        ///// Create Error Details.
        let errorDetails = ( errorResponse.error == true ) ? errorResponse : opModuleBasic.opReturnResponse( false, 400, { 
            message: errorResponse.message,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Log Error Details in the Console.
        if ( debug ) console.error( 'ERROR:', errorDetails )

    } finally {

        ///// End the Console Log Group.
        if ( debug ) console.groupEnd()

    }

}

/* ------------------------------------------------------------------------
 #  7. Function: Download PDF File Listener
--------------------------------------------------------------------------- */
export function opDownloadPDFFileListener( debug, button, eventId ) {

    try {
        
        ///// Get Function Name.
        var functionName = opDownloadPDFFileListener.name
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Set Download PDF Listener to the Button Element.
        opModuleBasic.opListener( 'click', button, async () => {

            ///// Start the Console Log Group.
            if ( debug ) console.group( `opDownloadPDFFileListener()` )

            try {

                ///// Get the Event. 
                const eventResponse = opGetEvent( debug, eventId )

                ///// Validate the Response from the Get Event.
                if ( eventResponse.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
                    message: `Something went wrong getting the Event!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )

                ///// Get the Information from Event Response (Event Participants & Template ID).
                const eventItem = eventResponse.response.details
                const participants = eventItem.eventParticipants
                const templateId = eventItem.eventTemplate

                ///// Get the Template. 
                const templateItem = opGetTemplate( debug, templateId )

                ///// Validate the Response from the Get Template.
                if ( templateItem.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
                    message: `Something went wrong getting the Template!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )

                ///// The URL to the API.
                const url = `${ opModuleBasic.opGetCurrentScriptPath() }/../../blocks/event/block-template-parts/print-document.php`

                ///// Get the Response from the PHP File.
                const printResponse = await opGetApiData( debug, 'GET', '', url, 'text' )

                ///// Validate the Print Response.
                if ( printResponse.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
                    message: `Something went wrong Getting the Content form the Print Document!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )

                ///// Get the Print Document Content.
                let printDocument = new DOMParser().parseFromString( printResponse.response.details, 'text/html' )
                let headContent = printDocument.querySelector( 'head' )
                let bodyContent = printDocument.querySelector( 'body' )

                ///// Get the Content from the Participant List Site.
                const htmlHead = document.querySelector( 'head' )
                const titleElement = `<span><b>Event:</b> ${ eventItem.eventName }</span>`
                const logo = document.querySelector( '.custom-logo-link' )
                const currentDate = `<span>${ opModuleBasic.opTimeConverter( new Date(), 'full', 'da' ) }</span>`
                const columnAmount = Number( templateItem.response.details.templateLayoutColumns.charAt(0) )
                const headerInfo = `<th><p>${ titleElement } ${ currentDate }</p></th>`

                ///// Edit the Print Document Content.
                headContent.insertAdjacentHTML( 'afterbegin', htmlHead.innerHTML )
                bodyContent.querySelector('.op-pdf-header-info').innerHTML = headerInfo
                bodyContent.querySelector( '.op-pdf-container' ).setAttribute( 'data-column-count', columnAmount )
                bodyContent.querySelector( '.logo figure' ).insertAdjacentHTML( 'beforeend', logo.innerHTML )

                ///// Create the Table Head Columns.
                let thUser = `<th class="op-col-user">${ document.querySelector( '.op-participant-col-info .op-col-user' ).outerHTML }</th>`
                let thLine1 = `<th class="op-col-line-1">${ document.querySelector( '.op-participant-col-info .op-col-line-1' ).outerHTML }</th>`
                let thLine2 = `<th class="op-col-line-2">${ document.querySelector( '.op-participant-col-info .op-col-line-2' ).outerHTML }</th>`
                let thLine3 = `<th class="op-col-line-3">${ document.querySelector( '.op-participant-col-info .op-col-line-3' ).outerHTML }</th>`
                let thLine4 = `<th class="op-col-line-4">${ document.querySelector( '.op-participant-col-info .op-col-line-4' ).outerHTML }</th>`
                let thLine5 = `<th class="op-col-line-5">${ document.querySelector( '.op-participant-col-info .op-col-line-5' ).outerHTML }</th>`
                let thTime = `<th class="op-col-arrival-time">${ document.querySelector( '.op-participant-col-info .op-col-arrival-time' ).outerHTML }</th>`
                let thPrints = `<th class="op-col-amount-of-prints">${ document.querySelector( '.op-participant-col-info .op-col-amount-of-prints' ).outerHTML }</th>`

                ///// Insert each Column in the Table Head in the Print Document Content.
                bodyContent.querySelector('.op-pdf-header .op-pdf-col-info').insertAdjacentHTML('beforeend', thUser + thLine1 + thLine2 + thLine3 + thLine4 + thLine5 + thTime + thPrints )

                ///// Insert each Row in the Table Body in the Print Document Content.
                participants.forEach( participant => {

                    let user

                    if ( ! Number( participant.active ) == 1 ) {
                         user = `<td class="op-col-user"><p class="op-col-user" data-icon="user"><span class="op-icon" role="img" aria-label="User Icon"></span></p></td>`
                    } else {
                         user = `<td class="op-col-user"><p class="op-col-user" data-icon="check"><span class="op-icon" role="img" aria-label="User Icon"></span></p></td>`
                    }

                    let line1 = `<td class="op-col-line-1"><p>${ participant.line1 }</p></td>`
                    let line2 = `<td class="op-col-line-2"><p>${ participant.line2 }</p></td>`
                    let line3 = `<td class="op-col-line-3"><p>${ participant.line3 }</p></td>`
                    let line4 = `<td class="op-col-line-4"><p>${ participant.line4 }</p></td>`
                    let line5 = `<td class="op-col-line-5"><p>${ participant.line5 }</p></td>`
                    let time = `<td class="op-col-arrival-time"><p>${ opModuleBasic.opTimeConverter( participant.time, 'hour-min' ) }</p></td>`
                    let prints = `<td class="op-col-amount-of-prints"><p>${ participant.prints }</p></td>`
                    let newElement = `<tr>${ user + line1 + line2 + line3 + line4 + line5 + time + prints }</tr>`

                    bodyContent.querySelector( '.op-pdf-content' ).insertAdjacentHTML( 'beforeend', newElement )

                } )

                ///// Create Browser Window. 
                let printWindow = window.open( '', '_blank', `height=${ screen.height }, width=${ screen.width }` )

                ///// Insert Head and Body Content.
                printWindow.document.querySelector( 'head' ).insertAdjacentHTML( 'beforeend',  headContent.innerHTML )
                printWindow.document.querySelector( 'body' ).insertAdjacentHTML( 'beforeend',  bodyContent.innerHTML )

                ///// Set Timeout to Print and Close the Window.
                setInterval( () => {
                    printWindow.print()
                    printWindow.close()
                }, 500 )

                ///// Console Log Success if Debug.
                if ( debug ) console.log( 'SUCCESS:', { 
                    message: `No errors were found in the Download CSV File Listener!`,
                    line: opModuleBasic.errorLine(),
                    function: functionName
                } )

            } catch( errorListenerResponse ) {

                ///// Log Error Details in the Console.
                if ( debug ) console.error( 'ERROR:', errorListenerResponse )

            }

            ///// End the Console Log Group.
            if ( debug ) console.groupEnd()

        })

        ///// Console Log Success if Debug.
        if ( debug ) console.log( 'SUCCESS:', { 
            message: `The Download CSV File Listener is Active!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

    } catch( errorResponse ) {

        ///// Create Error Details.
        let errorDetails = ( errorResponse.error == true ) ? errorResponse : opModuleBasic.opReturnResponse( false, 400, { 
            message: errorResponse.message,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Log Error Details in the Console.
        if ( debug ) console.error( 'ERROR:', errorDetails )

    } finally {

        ///// End the Console Log Group.
        if ( debug ) console.groupEnd()

    }

}

/* ------------------------------------------------------------------------
 #  8. Function: Search for Participant Listener
--------------------------------------------------------------------------- */
export function opParticipantSearchListener( debug, button, searchInputElement ) {

    try {

        ///// Get Function Name.
        var functionName = opParticipantSearchListener.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        function setURLParams() {

            ///// Get the Search Value.
            let searchValue = searchInputElement.value

            ///// Get the Current URL Parameters.
            let urlParams = new URLSearchParams( window.location.search )

            ///// Update the Query Parameter.
            if ( searchValue ) {
                urlParams.set( 'query', searchValue )
            } else {
                urlParams.delete( 'query' )
            }

            ///// Create the New URL for the Search Button.
            let newUrl = window.location.pathname + '?' + urlParams.toString()

            ///// Return the New URL.
            return newUrl

        }

        ///// Set Search for Participant Listener to the Search Button.
        opModuleBasic.opListener( 'click', button, async ( event ) => {

            ///// Start the Console Log Group.
            if ( debug ) console.group( `opParticipantSearchListener()` )

            ///// Stop Propagation from the Event Listener.
            event.stopPropagation()

            ///// Get the New URL.
            const newUrl = setURLParams()

            ///// Redirect to the New URL.
            window.location.href = newUrl

            ///// Console Log Success if Debug.
            if ( debug ) console.log( 'SUCCESS:', { 
                message: `No errors were found in the Search for Participant Listener!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )

            ///// End the Console Log Group.
            if ( debug ) console.groupEnd()

        } )

        ///// Set Search for Participant Listener to the Search Button.
        opModuleBasic.opListener( 'search', searchInputElement, async ( event ) => {

            ///// Start the Console Log Group.
            if ( debug ) console.group( `opParticipantSearchListener()` )

            ///// Stop Propagation from the Event Listener.
            event.stopPropagation()

            ///// Get the New URL.
            const newUrl = setURLParams()

            ///// Redirect to the New URL.
            window.location.href = newUrl

            ///// Console Log Success if Debug.
            if ( debug ) console.log( 'SUCCESS:', { 
                message: `No errors were found in the Search for Participant Listener!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )

            ///// End the Console Log Group.
            if ( debug ) console.groupEnd()

        } )

        ///// Console Log Success if Debug.
        if ( debug ) console.log( 'SUCCESS:', { 
            message: `The Search for Participant Listener is Active!`,
            line: opModuleBasic.errorLine(),
            function: functionName,
            details: { 
                button: button,
                searchInput: searchInputElement
            }
        } )

    } catch( errorResponse ) {

        ///// Create Error Details.
        let errorDetails = ( errorResponse.error == true ) ? errorResponse : opModuleBasic.opReturnResponse( false, 400, { 
            message: errorResponse.message,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Log Error Details in the Console.
        if ( debug ) console.error( 'ERROR:', errorDetails )

    } finally {

        ///// End the Console Log Group.
        if ( debug ) console.groupEnd()

    }

}