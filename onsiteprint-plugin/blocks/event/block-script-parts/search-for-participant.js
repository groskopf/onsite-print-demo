/* ------------------------------------------------------------------------
 #  JS Part Name: Search for Participant
 *  Searching for a Participant in the Participant Container in the Event Block.
 ?  Updated: 2025-12-18 - 01:00 (Y:m:d - H:i)
 ?  Info: Added new Search For Participant Script and Function.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Add the Participant to the Participant Container

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../assets/js/inc/basic.js'

/* ------------------------------------------------------------------------
 #  2. Function: Search for Participant in the Participant Container
 *  Highlights matched Search Query substrings by wrapping them in <b>...</b>
 *  Signature: opSearchForParticipant( debug, block, participantList, searchQuery = '', fields = [] )
--------------------------------------------------------------------------- */
export function opSearchForParticipant( debug, participantList, searchQuery = '', fields = [] ) {

    try {

        ///// Get Function Name.
        var functionName = opSearchForParticipant.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Validate participantList
        if ( ! Array.isArray( participantList ) ) {
            throw new Error( 'participantList must be an array' )
        }

        ///// Normalize search query and default fields
        const query = String( searchQuery || '' ).toLowerCase().trim()
        if ( ! Array.isArray( fields ) || fields.length === 0 ) {
            fields = [ 'line1', 'line2', 'line3', 'line4', 'line5' ]
        }

        ///// escape RegExp helper
        const escapeRegExp = str => String( str ).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

        ///// If empty query return copy of original participants (no highlighting)
        if ( query=== '' ) {
            const allCopy = participantList.map( participant => ( { ...participant } ) )
            return opModuleBasic.opReturnResponse( false, 200, {
                message: `Returned all participants (${ allCopy.length })!`,
                line: opModuleBasic.errorLine(),
                function: functionName,
                details: {
                    query: query,
                    fields: fields,
                    results: allCopy,
                }
            }, debug )
        }

        ///// Build case-insensitive regex for the query
        const regex = new RegExp( escapeRegExp( query ), 'ig' )

        ///// Filter and highlight matches
        const results = participantList.reduce( ( acc, participant ) => {
            if ( participant == null || typeof participant !== 'object' ) return acc

            ///// Determine if any field matches
            let matched = false
            const copy = { ...participant }

            ///// Check each specified field
            for ( const field of fields ) {
                if ( ! Object.prototype.hasOwnProperty.call( participant, field ) ) continue
                const rawVal = participant[ field ]
                if ( rawVal === null || rawVal === undefined ) continue
                const strVal = String( rawVal )
                if ( strVal.toLowerCase().includes( query ) ) {
                    matched = true
                    ///// Replace occurrences with <b> preserving original case
                    copy[ field ] = strVal.replace( regex, match => `<b>${ match }</b>` )
                } else {
                    ///// Keep original string form (no HTML)
                    copy[ field ] = strVal
                }
            }

            ///// If matched, add to results
            if ( matched ) acc.push( copy )
            return acc
        }, [] )


        ///// Return the Response.
        if ( ! Array.isArray( results ) || results.length === 0 ) {
            return opModuleBasic.opReturnResponse( false, 204, {
                message: `No participants were found!`,
                line: opModuleBasic.errorLine(),
                function: functionName,
                details: {
                    query: query,
                    fields: fields,
                    results: results,
                }
            }, debug )
        } else {
            return opModuleBasic.opReturnResponse( false, 200, {
                message: `Found ${ results.length } participant(s)!`,
                line: opModuleBasic.errorLine(),
                function: functionName,
                details: {
                    query: query,
                    fields: fields,
                    results: results,
                }
            }, debug )
        }

    } catch( errorResponse ) {

        ///// Create Error Details.
        let errorDetails = ( errorResponse && errorResponse.error === true ) ? errorResponse : opModuleBasic.opReturnResponse( true, 400, {
            message: ( errorResponse && errorResponse.message ) ? errorResponse.message : 'Search failed',
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