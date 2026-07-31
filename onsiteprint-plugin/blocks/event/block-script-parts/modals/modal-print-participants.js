/* ------------------------------------------------------------------------
 #  JS Part Name: Modal - Print Multiple Participants
 *  Creating the Print Multiple Participants Content to the Modal in the Event Block.
 ?  Updated: 2026-31-07 - 03:04 (Y:m:d - H:i)
 ?  Info: Added `Validation` to the Modal.
---------------------------------------------------------------------------
 #  TABLE OF CONTENTS:
---------------------------------------------------------------------------

	1. 	Import Functions from Scripts

    2. 	Function: Print Multiple Participants from the Modal

---------------------------------------------------------------------------
 #  1. Import Functions from Scripts
--------------------------------------------------------------------------- */
import * as opModuleBasic from '../../../../assets/js/inc/basic.js'
import { opModalToggleListener } from '../../../../assets/js/inc/modal/toggle-modal-listener.js'
import { opGetEvent } from '../../../../assets/js/inc/event/event.js'
import { opPrintParticipant } from '../../../../assets/js/inc/participant/print-participant.js'


/* ------------------------------------------------------------------------
 #  2. Function: Modal - Print Multiple Participants
--------------------------------------------------------------------------- */
export function opModalPrintMultipleParticipants( debug, block, eventId ) {

    try {

        ///// Get Function Name.
        var functionName = opModalPrintMultipleParticipants.name

        ///// Set the Debug.
        ////* Set the Parameter If is not defined (true or false).
        if ( debug !== true ) debug = false
        if ( debug ) console.group( `${ functionName }()` )

        ///// Get the Elements for the Print Multiple Participants Modal.
        let printMoreButton = block.querySelector( '.op-button[name="print-more"]' )
        let printModalTemplateElement = block.querySelector( `[id$="-print-multiple-participants-template"]` )
        let printModal = printModalTemplateElement.content.cloneNode(true)
        let printModalHeader = printModal.querySelector( '.op-header-content__inner' )
        let printModalMain = printModal.querySelector( '.op-modal-content__inner' )
        let printModalId = printModalTemplateElement.getAttribute( 'id' ).replace( 'op-block', 'op-modal' ).slice( 0, -9 )
        let printCloseButton = printModal.querySelector( '.op-cancel_print-more' )
        let startPrintingButton = printModal.querySelector( '.op-button-start-printing' )
        let pausePrintingButton = printModal.querySelector( '.op-button-pause-printing' )
        let restartPrintingButton = printModal.querySelector( '.op-button-restart-printing' )
        let resumePrintingButton = printModal.querySelector( '.op-button-resume-printing' )
        let participantsTotal = printModal.querySelector('.event-participants-total .text')
        let participantsPrinted = printModal.querySelector('.event-participants-printed .text')

        ///// Set Modal Toggle Listener to the Close Button.
        opModalToggleListener( debug, printCloseButton, false )

        ///// Set Modal Toggle Listener to the Download Button.
        opModalToggleListener( debug, printMoreButton, true, printModalHeader, printModalMain, printModalId, 'op-dropdown-menu' )

        ///// Get the Event.
        const eventItem = opGetEvent( debug, eventId )

        ///// Validate the Response from the Get Event.
        if ( eventItem.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, {
            message: `Something went wrong getting the Event!`,
            line: opModuleBasic.errorLine(),
            function: functionName
        } )

        ///// Get Participant List.
        let participantList = eventItem.response.details.eventParticipants

        ///// Change the Total Participants in the Modal.
        participantsTotal.textContent = participantList.length

        ///// Initialize the Participants Loop Controller.
        const participantsLoopController = {
            array: participantList,
            index: 0,
            isPaused: false,
            timeoutId: null,

            start() {
                ///// Start the Printing.
                startPrintingButton.disabled = true
                startPrintingButton.classList.add( 'op-hidden' )
                pausePrintingButton.disabled = false
                pausePrintingButton.classList.remove( 'op-hidden' )
                this.loop()
            },

            async loop() {
                ///// Loop through the Participants.
                if ( this.index < this.array.length ) {

                    try {

                        if ( ! this.isPaused ) {

                            ///// Print the Participant.
                            const printParticipantResponse = await opPrintParticipant( debug, eventId, this.array[ this.index ].id )

                            ///// Validate the Response from the Print the Participant.
                            if ( printParticipantResponse.error !== false ) throw opModuleBasic.opReturnResponse( true, 400, { 
                                message: `Something went wrong Printing the Event!`,
                                line: opModuleBasic.errorLine(),
                                function: functionName
                            } )

                            ////// Increase the Index and Update the Printed Participants in the Modal.
                            this.index++
                            participantsPrinted.textContent = this.index

                            ///// Disable the Pause Button if the Last Participant was Printed.
                            if ( this.index == this.array.length ) pausePrintingButton.disabled = true

                        }

                        ///// Set the Timeout for the Next Loop.
                        this.timeoutId = setTimeout( () => this.loop(), 2000 )

                    } catch( errorListenerResponse ) {
                        
                        ///// Add the Validation to the Modal.
                        block.querySelector( '.op-modal' ).classList.add( 'op-error' )

                        ///// Log Error Details in the Console.
                        if ( debug ) console.error( 'ERROR:', errorListenerResponse )

                        ///// Stop the Loop.
                        this.stop()

                    }

                } else this.stop()

            },

            pause() {
                ///// Pause the Printing.
                pausePrintingButton.disabled = true
                pausePrintingButton.classList.add( 'op-hidden' )
                resumePrintingButton.disabled = false
                resumePrintingButton.classList.remove( 'op-hidden' )
                this.isPaused = true
            },

            resume() {
                ///// Resume the Printing.
                resumePrintingButton.disabled = true
                resumePrintingButton.classList.add( 'op-hidden' )
                pausePrintingButton.disabled = false
                pausePrintingButton.classList.remove( 'op-hidden' )
                this.isPaused = false
            },

            stop() {
                ///// Stop the Printing.
                startPrintingButton.disabled = false
                startPrintingButton.classList.remove( 'op-hidden' )
                pausePrintingButton.disabled = true
                pausePrintingButton.classList.add( 'op-hidden' )
                resumePrintingButton.disabled = true
                resumePrintingButton.classList.add( 'op-hidden' )
                clearTimeout( this.timeoutId )
                this.index = 0
                this.isPaused = false
                participantsPrinted.textContent = this.index
            }
        }

        ///// Add Event Listeners to the Buttons in the Modal.
        opModuleBasic.opListener( 'click', startPrintingButton, () => {
            participantsLoopController.start()
        } )

        opModuleBasic.opListener( 'click', pausePrintingButton, () => {
            participantsLoopController.pause()
        } )

        opModuleBasic.opListener( 'click', resumePrintingButton, () => {
            participantsLoopController.resume()
        } )

        opModuleBasic.opListener( 'click', restartPrintingButton, () => {
            participantsLoopController.stop()
        } )

        ///// Return the Response.
        return opModuleBasic.opReturnResponse( false, 200, { 
            message: `The Print Participants Modal was correctly Executed!`, 
            line: opModuleBasic.errorLine(),
            function: functionName
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