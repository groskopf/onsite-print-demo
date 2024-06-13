/* ------------------------------------------------------------------------
 #  JS Part Name: Set Column Number Script
 *  Functions included in the Block Form Script (Event Creation).
 ?  Updated: 2024-06-13 - 21:44 (Y:m:d - H:i)
 ?  Info: Changed permissions in the Grid. Function (opAddGridToElement).
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Set Column Number

    3. 	Function: Add Grid to Element

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../../../assets/js/inc/basic.js'

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
        if (  ! templateId || ! fieldset) throw opModuleBasic.opReturnResponse( true, 404, { 
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
export function opAddGridToElement( debug, gridContainer, jsonList ) {

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
        else if ( ! jsonList ) throw opModuleBasic.opReturnResponse( true, 404, { 
                message: `Missing the JSON List!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            } )
        else {

            ///// Get the Grid Elements.
            let gridElement = gridContainer.querySelector( '[id*="-form-grid"]' )

            ///// Set Grid Variables.
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
            let eventGridElement = new DataGridXL( gridElementId, {
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
                function: functionName
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