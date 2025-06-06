/* ------------------------------------------------------------------------
 #  JS Part Name: Print Participant
 *  Printing the Participant from the Participant List in the Event Block.
 ?  Updated: 2025-06-06 - 05:18 (Y:m:d - H:i)
 ?  Info: Added the Update Participant Information.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Print the Participant from the Participant List

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../basic.js'
import { opGetBookingFromSession } from '../booking/get-booking-from-session.js'
import { opGetEvent } from '../event/event.js'
import { opGetTemplate } from '../template/template.js'
import { opGetApiData } from '../api/get-api-data.js'
import { opGetParticipant } from './participant.js'

/* ------------------------------------------------------------------------
 #  2. Function: Print the Participant from the Participant List
--------------------------------------------------------------------------- */
export async function opPrintParticipant( debug, eventId, participantId ) {

    try {

        ///// Get Function Name.
        var functionName = opPrintParticipant.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Get Booking from Session.
        const bookingItem = await opGetBookingFromSession( debug )

        ///// Validate the Response from the Get Booking from Session.
        if ( bookingItem.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
            message: `Something went wrong Getting the Booking!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )
 
        ///// Get the Event. 
        const eventItem = opGetEvent( debug, eventId )

        ///// Validate the Response from the Get Event.
        if ( eventItem.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
            message: `Something went wrong Getting the Event!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Get the Template. 
        const templateItem = opGetTemplate( debug, eventItem.response.details.eventTemplate )

        ///// Validate the Response from the Get Template.
        if ( templateItem.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
            message: `Something went wrong Getting the Template!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Get the Participant.
        const participantItem = await opGetParticipant( debug, eventId, participantId )

        ///// Validate the Response from the Get Participant.
        if ( participantItem.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
            message: `Something went wrong Getting the Participant!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Get Template and Participant from the Response.
        const template = templateItem.response.details
        const participant = participantItem.response.details

        ///// Create Variables.
        let bookingCode = bookingItem.response.details.bookingId
        let layout = template.templateLayout
        let columnAmount = template.templateLayoutColumns[0]
        let imageFilename = template.templateFilenameUploaded
        let string1 = ( 1 <= columnAmount ) ? participant.line1 : ""
        let string2 = ( 2 <= columnAmount ) ? participant.line2 : ""
        let string3 = ( 3 <= columnAmount ) ? participant.line3 : ""
        let string4 = ( 4 <= columnAmount ) ? participant.line4 : ""
        let string5 = ( 5 <= columnAmount ) ? participant.line5 : ""

        ///// The URL to the API.
        let url = `https://api.printerboks.dk/api/v1/name_tags/${ bookingCode }?layout=${ layout }`

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

        ///// Print the Participant and Get the Response with the Filename.
        const filenameResponse = await opGetApiData( debug, 'POST', bodyInput, url, 'json' )

        ///// Validate the Response from the Filename Response.
        if ( filenameResponse.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
            message: `Something went wrong Printing the Participant!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )       

        ///// Update Participant Information
        let updatedParticipant = { ...participant }
        updatedParticipant.time = Date.now()
        updatedParticipant.prints = ( participant.prints + 1 )
        updatedParticipant.active = 1

        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `The Participant was Printed!`, 
            line: opModuleBasic.errorLine(),
            function: functionName,
            details: {
                filename: filenameResponse.response.details,
                participant: updatedParticipant
            }
        }, debug )
        
    } catch( errorResponse ) {

        ///// Create Error Details.
        let errorDetails = ( errorResponse.error == true ) ? errorResponse : opModuleBasic.opReturnResponse( true, 400, { 
            message: errorResponse.message,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Log Error Details in the Console.
        if ( debug ) console.error( 'ERROR:', errorDetails )

        ///// Return the Error Response.
        return errorDetails

    } finally {

        ///// End the Console Log Group.
        if ( debug ) console.groupEnd()

    }

}