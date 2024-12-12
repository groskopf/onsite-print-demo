/* ------------------------------------------------------------------------
 #  JS Part Name: Step Additions Script
 *  Functions Used in Step Scripts (Event Creation).
 ?  Updated: 2024-12-12 - 05:25 (Y:m:d - H:i)
 ?  Info: Moved the line containing opGetCSVDataAsJSON() to opAddGridToElement() from steps-listeners.js.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Set Column Number

    3. 	Function: Add Grid to Element

    4.  Function: Save New Event from Form

    5.  Function: Create Print Example

    6.  Function: Get Print Example
   
    7.  Function: Get CSV Data as JSON

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../../../assets/js/inc/basic.js'
import * as opModuleFastAPI from '../../../../../assets/js/inc/fastapi/fastapi.js'

var eventGridElement

/* ------------------------------------------------------------------------
 #  2. Function: Set Column Number
--------------------------------------------------------------------------- */
export function opSetColumnNumber( debug, templateId, fieldset ) {

    try {
        
        ///// Get Function Name.
        var functionName = opSetColumnNumber.name
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Throw Error if the Variables is missing.
        if ( ! templateId || ! fieldset) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Missing the Template ID or the Fieldset Element!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )
        else {

            ///// Get the Elements.
            let gridContainer = fieldset.querySelector( '.op-grid-wrapper' )

            ///// Get Template Item.
            const templateItem = opGetTemplate( templateId )

            ///// Validate the Response from the Get Template Function.
            if ( templateItem.error !== false ) throw templateItem

            ///// Get the Amount of Columns.
            var columnAmount = templateItem.response.templateLayoutColumns.charAt(0)
            
            ///// Set the Number of Grid Columns to the Grid Container Element.
            gridContainer.setAttribute( 'data-grid-cols', columnAmount )

        }

        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `The Column Number was set to ${ columnAmount }!`, 
            line: opModuleBasic.errorLine(),
            function: functionName
        }, debug )

    } catch( errorResponse ) {

        ///// Create Error Details.
        let errorDetails = ( errorResponse.error == true ) ? errorResponse : opModuleBasic.opReturnResponse( false, 400, { 
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

/* ------------------------------------------------------------------------
 #  3. Function: Add Grid to Element
 *  Adding the Grid from the CSV file to an Element.
 *  Link: https://www.datagridxl.com/docs
--------------------------------------------------------------------------- */
export async function opAddGridToElement( debug, gridContainer ) {

    try {
        
        ///// Get Function Name.
        var functionName = opAddGridToElement.name
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Throw Error if the Variables are missing.
        if ( ! gridContainer ) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Missing the Grid Container Element!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )
        else {

            ///// Get CSV Data as JSON.
            const jsonResponse = await opGetCSVDataAsJSON( debug, gridContainer )

            ///// Validate the JSON Response.
            if ( jsonResponse.error !== false ) throw jsonResponse

            ///// Get the Grid Elements.
            let gridElement = gridContainer.querySelector( '[id*="-form-grid"]' )

            ///// Set Grid Variables.
            let jsonList = jsonResponse.response.details
            let gridWidth = gridContainer.clientWidth
            let gridCols = gridContainer.getAttribute( 'data-grid-cols' )
            let gridElementId = gridElement.getAttribute( 'id' )
            let gridColName = gridContainer.getAttribute( 'data-grid-col-name' )
            let gridNoCol = gridContainer.getAttribute( 'data-grid-no-col' )
            let gridNewCol = gridContainer.getAttribute( 'data-grid-new-col' )
            let colWidth = ( Number( gridWidth ) / ( Number( gridCols ) + 2 ) )

            ///// Run through the Items in the JSON List.
            jsonList.map( item => { 
                
                ///// Check if the Template Column Number is greater than the Items Pair (key: value).
                for( let i = Object.keys( item ).length; i < Number ( gridCols ); ++i ) {

                    ///// Add a new empty Column/Pair (key: value) to the Item.
                    item[`${ gridNewCol } ${ i+1 }`] = ''
                
                }

            } )

            ///// Create and Add the new Grid to the Element.
            eventGridElement = new DataGridXL( gridElementId, {
                data: jsonList,
                allowFreezeRows: false,
                allowFreezeCols: false,
                allowHideRows: false,
                allowHideCols: false,
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

            ///// Debug to the Console Log.
            opModuleBasic.opConsoleDebug( debug, { 
                message: `The Grid was Created!`,
                line: opModuleBasic.errorLine(),
                details: eventGridElement 
            } )
            
            ///// Return the Response.
            return opModuleBasic.opReturnResponse( false, 200, { 
                message: `The Grid was Added to the Element!`, 
                line: opModuleBasic.errorLine(),
                function: functionName,
                details: eventGridElement.getData()
            }, debug )

        }

    } catch( errorResponse ) {

        ///// Create Error Details.
        let errorDetails = ( errorResponse.error == true ) ? errorResponse : opModuleBasic.opReturnResponse( false, 400, { 
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

/* ------------------------------------------------------------------------
 #  4. Function: Save New Event from Form
--------------------------------------------------------------------------- */
export async function opSaveNewEvent( debug, formElement ) {

    try {
        
        ///// Get Function Name.
        var functionName = opSaveNewEvent.name
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Throw Error if the Variable is missing.
        if ( ! formElement ) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Missing the Form Element!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )
        else {

            ///// Get the Grid data.
            const jsonFormGrid = JSON.stringify( eventGridElement.getData() )
            
            ///// Set Approval to the Buttons in the Form Element.
            const createEventResponse = await opCreateEvent( debug, formElement, jsonFormGrid )

            ///// Validate the Response from the Create Event Function.
            if ( createEventResponse.error !== false ) throw createEventResponse
            else {

                ///// Get Event Data.
                const eventData = createEventResponse.response

                ///// Return the Response.
                return opModuleBasic.opReturnResponse( false, 200, { 
                    message: `The Event was Created!`, 
                    line: opModuleBasic.errorLine(),
                    function: functionName,
                    details: eventData.eventCreationDate 
                }, debug )

            }

        }

    } catch( errorResponse ) {

        ///// Create Error Details.
        let errorDetails = ( errorResponse.error == true ) ? errorResponse : opModuleBasic.opReturnResponse( false, 400, { 
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

/* ------------------------------------------------------------------------
 #  5. Function: Create Print Example
--------------------------------------------------------------------------- */
export async function createPrintExample( debug, templateId ) {

    try {
        
        ///// Get Function Name.
        var functionName = createPrintExample.name
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Throw Error if the Variable is missing.
        if ( ! templateId ) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Missing the Template ID!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )
        else {

            ///// Get Template Item.
            const templateItem = opGetTemplate( templateId )

            ///// Validate the Response from the Get Template Function.
            if ( templateItem.error !== false ) throw templateItem

            ///// Create Variables.
            let layout = templateItem.response.templateLayout
            let imageFilename = templateItem.response.templateFilenameUploaded
            let columnAmount = templateItem.response.templateLayoutColumns.charAt(0)
           
            ///// Get the Participant from the Grid.
            const participant = eventGridElement.getData()[0]
            let lines = Object.values( participant )

            ///// The Body Input to Request Options.
            let bodyInput = JSON.stringify(
                {
                "line_1": ( 1 <= columnAmount ) ? lines[0] : "",
                "line_2": ( 2 <= columnAmount ) ? lines[1] : "",
                "line_3": ( 3 <= columnAmount ) ? lines[2] : "",
                "line_4": ( 4 <= columnAmount ) ? lines[3] : "",
                "line_5": ( 5 <= columnAmount ) ? lines[4] : "",
                "image_name": imageFilename,
                "qr_code": ""
                }
            )

            ///// The URL to the API.
            let  url = `https://api.printerboks.dk/api/v1/name_tags/MFAWMYXW5NC23K7?layout=${ layout }`

            ///// Get Print Example Filename.
            const filenameResponse = await opModuleFastAPI.opGetApiData( debug, 'POST', bodyInput, url, 'json' )

            ///// Validate the Filename Response.
            if ( filenameResponse.error !== false ) throw filenameResponse

            ///// Return the Response.
            return opModuleBasic.opReturnResponse( false, 200, { 
                message: `The Example was Created!`, 
                line: opModuleBasic.errorLine(),
                function: functionName,
                details: filenameResponse.response.details
            }, debug )
        
        }

    } catch( errorResponse ) {

        ///// Create Error Details.
        let errorDetails = ( errorResponse.error == true ) ? errorResponse : opModuleBasic.opReturnResponse( false, 400, { 
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

/* ------------------------------------------------------------------------
 #  6. Function: Get Print Example
--------------------------------------------------------------------------- */
export async function getPrintExample( debug, filename ) {

    try {
        
        ///// Get Function Name.
        var functionName = getPrintExample.name
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Throw Error if the Variables is missing.
        if ( ! filename ) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Missing the Filename!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )
        else {

            ///// The URL to the API.
            let  url = `https://api.printerboks.dk/api/v1/${ filename }`

            ///// Get Print Example Filename.
            const pdfFileResponse = await opModuleFastAPI.opGetApiData( debug, 'GET', '', url, 'blob' )

            ///// Validate the Filename Response.
            if ( pdfFileResponse.error !== false ) throw pdfFileResponse

            ///// Return the Response.
            return opModuleBasic.opReturnResponse( false, 200, { 
                message: `The PDF Example was Found!`, 
                line: opModuleBasic.errorLine(),
                function: functionName,
                details: pdfFileResponse.response.details
            }, debug )
        
        }

    } catch( errorResponse ) {

        ///// Create Error Details.
        let errorDetails = ( errorResponse.error == true ) ? errorResponse : opModuleBasic.opReturnResponse( false, 400, { 
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

/* ------------------------------------------------------------------------
 #  7. Function: Get CSV Data as JSON
--------------------------------------------------------------------------- */
export async function opGetCSVDataAsJSON( debug, gridContainer ) {

    try {
        
        ///// Get Function Name.
        var functionName = opGetCSVDataAsJSON.name
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Throw Error if the Variables is missing.
        if ( ! gridContainer ) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Missing the Grid Container Element!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )
        else {

            ///// Get the the Form Element.
            let formElement = gridContainer.closest( '.op-form-steps' )

            ///// Throw Error if the Variables are missing.
            if ( ! formElement ) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Missing the Form Element!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )
            
            ///// Get the Data from the Form Element.
            const formData = new FormData( gridContainer.closest( '.op-form-steps' ) )

            ///// The URL to the API.
            const url = `${ opModuleBasic.opGetCurrentScriptPath() }/../api/api-convert-csv-into-json.php`

            ///// Get JSON from CSV file.
            const jsonResponse = await opModuleFastAPI.opGetApiData( debug, 'POST', formData, url, 'json', 'form' )

            ///// Validate the JSON Response.
            if ( jsonResponse.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
                message: `Something went wrong when Converting the CSV file into JSON format!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )

            ///// Return the Response.
            return opModuleBasic.opReturnResponse( false, 200, { 
                message: `The CSV file was Converted into JSON format!!`, 
                line: opModuleBasic.errorLine(),
                function: functionName,
                details: jsonResponse.response.details
            }, debug )
        
        }

    } catch( errorResponse ) {

        ///// Create Error Details.
        let errorDetails = ( errorResponse.error == true ) ? errorResponse : opModuleBasic.opReturnResponse( false, 400, { 
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