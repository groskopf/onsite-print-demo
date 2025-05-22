/* ------------------------------------------------------------------------
 #  JS Part Name: Participant Listeners Script
 *  Functions Used in the Add Participant Scripts in the Event Block.
 ?  Updated: 2025-05-22 - 02:28 (Y:m:d - H:i)
 ?  Info: Added new Function, opPrintParticipantListener().
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Participant Toggle Listener

    3. 	Function: Print Participant Listener

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../../assets/js/inc/basic.js'

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
            
        })

        ///// Console Log Success if Debug.
        if ( debug ) console.log( 'SUCCESS:', { 
            message: `The Participant Toggle Listener is Active!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        })

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
export function opPrintParticipantListener( debug, printButton, participantId ) {

    try {
        
        ///// Get Function Name.
        var functionName = opPrintParticipantListener.name
        
        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Set Print Participant Listener to the Participant Print Button.
        opModuleBasic.opListener( 'click', printButton, async () => {

            ///// Start the Console Log Group.
            if ( debug ) console.group( `Participant with ID: op-participant_${ participantId }` )
                
            ///// Add Class when the Participant is Clicked on.
            opPrintParticipant( participantId )

            ///// Console Log Success if Debug.
            if ( debug ) console.log( 'SUCCESS:', { 
                message: `No errors were found in the Print Participant Listener!`,
                line: opModuleBasic.errorLine(),
                function: functionName
            })

            ///// End the Console Log Group.
            if ( debug ) console.groupEnd()
            
        })

        ///// Console Log Success if Debug.
        if ( debug ) console.log( 'SUCCESS:', { 
            message: `The Print Participant Listener is Active!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        })

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