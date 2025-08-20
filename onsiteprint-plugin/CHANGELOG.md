# Changes to the OnsitePrint Plugin

This document includes the change log notes for the OnsitePrint Plugin - [GitHub](https://github.com/groskopf/onsite-print-demo)

---

### 1.2.2^ (2025-05-16) - New Event Block

- Changed the Block Script in the `Event Block` *(NB: The function is under construction)*.
- Changed the `Import` Functions.
- Added new Function, `opSetupHeader()`.
- Added `Event ID` to `opSetupHeader()`.
    
    [EB | block-script.js](blocks/event/block-script.js)

    ---

- Changed how to show `Lines` in the `Participant Row (Event Block)`.
- Added new `footer .op-message` in the `Participant Row - Info (Event Block)`.
- Added `Participant Skeleton` and `CSS animation`.
- Changed the CSS in the `Modal Window` of `Add Participant`.
- Changed `op-button-cancel` to `op-button-close` in the Modal Window.
- Added `z-index` to `.op-filter-options`.
- Removed `.op-input-wrapper:last-child` and changed padding in `.op-modal-overflow__inner`.
    
    [EB | block-style.css](blocks/event/block-style.css)

    ---

- Added New `Error Title` and `Error Description` to Modal, used in /modal.php.
- Changed the `Error Messages` in the Modal, used in /modal.php.
- Added new `Error Button` to Modal, used in /modal.php.
- Changed the Modal variable.
    
    [EB | block-template.php](blocks/event/block-template.php)

    ---

- Added new Script `Parts`.
- Added new Function, `opAddParticipant()`.
- Added new Function, `opSetupHeader()`.
- Added new Script, `participant-listeners.js`.
    
    [EB | parts.js](blocks/event/block-script-parts/parts.js)

    ---

- Added new Script `Setup Header` *(NB: The function is under construction)*.
- Added `opModalToggleListener()` and `opCreateParticipantListener()`.
- Added the `Column Input Listener` Function.
- Added new `Modal Toggle Listener` to the `CSV Download Button`.
- Added new `Modal Toggle Listener` to new `Cancel Error Button`.
    
    [EB | setup-header.js](blocks/event/block-script-parts/setup-header.js)

    ---

- Added new Script `Setup List`.
- Changed `Participant List Element` to `Participant Container` and Changed `Block` to `Event ID`.
- Changed the `Import` Functions.
- Added New `Participant Loop` with `Fading (CSS Animation)`.
    
    [EB | setup-list.js](blocks/event/block-script-parts/setup-list.js)

    ---

- Added new Script `Add Participant`.
- Added Participant Toggle Listener to the Function `opAddParticipant`.
- Added Print Participant Listener to the Function `opAddParticipant`.
- Added Event Id to the Function `opAddParticipant`.
- Added Participant Validation.
- Changed `Participant List Element` to `Participant Container` and Changed `Block` to `Event ID`.
- Added the `Details` to the `Return Response`.

    [EB | add-participant.js](blocks/event/block-script-parts/add-participant.js)

    ---

- Added new Script `Participant Listeners`.
- Added new Function `Participant Toggle Listener`.
- Added new Function `Print Participant Listener`.
- Added Stop Propagation to the Print Participant Listener.
- Added Event Id to the Print Participant Listener.
- Changed the `File Location`.
- Added new `import` of `opUpdateParticipant()`, `Print Participant Listener`.
- Added new `Participant Element` actions, `Print Participant Listener`.
- Added Validation of the Response from the Print the Participant, `Print Participant Listener`.
- Added new Function `opUpdateParticipant()`, `Print Participant Listener`.
- Added Validation of the Response from the Update the Participant, `Print Participant Listener`.
- Added `setTimeout` with `Participant Element` actions, `Print Participant Listener`.
- Added new `try/catch` with the `Participant Element` in the `Print Participant Listener` for error handling.
- Added Update of the `Event Information Block` in the `Print Participant Listener`.
- Added `opModuleBasic` to `opTimeConverter()` in the `Print Participant Listener`.
- Changed the `Import` of the `Participant`.
- Added the `Create Participant Listener` Function.
- Added the `Column Input Listener` Function.
- Added the `Download CSV File Listener` Function.
- Added 'opChangeModalContent()' to the `Create Participant Listener` Function.

    [EB | participant-listeners.js](blocks/event/block-script-parts/participant-listeners.js)

    ---

- Added new Script `Modal - Create Participant`.
- Changed how the `Modal Toggle Listener` is used.
- Added new `Modal Clear Form Listener`.
- Added `Modal ID`.

    [EB | modal-create-participant.js](blocks/event/block-script-parts/modals/modal-create-participant.js)

    ---

- Added new Script `Modal - Clear Form Listener`.

    [EB | modal-clear-form-listener.js](blocks/event/block-script-parts/modals/modal-clear-form-listener.js)

    ---

- Added new File `Participant Template`.
- Removed attribute `data-op-arrival` from `article`.
- Added new element `span.op-text` to `header time`.
- Removed the Listener `opToggleActive` from the Participant Element.
- Added new `footer .op-message` elements.

    [EB | participant-template.php](blocks/event/block-template-parts/templates/participant-template.php)

    ---

- Added New `Create Participant Template Part`.
- Changed the Position of `Form Validation Element`.
- Added class `.op-col-input` to the `Column Input Elements`.
- Removed the `onclick` in the Save Participant Button, `.op-button-save`.
- Added new `Close Button`.
- Changed the Modal variable.

    [EB | create-participant-template.php](blocks/event/block-template-parts/templates/create-participant-template.php)

    ---

- Added New `Download Files Template Part`.

    [EB | download-files-template.php](blocks/event/block-template-parts/templates/download-files-template.php)

    ---

- Added new `Reload Button` in the modal.php.
- Added new `Cancel Error Button` and moved `Close Button`.
- Changed the Modal variable.
- Added new `Download Files Template Part`.

    [EB | modal.php](blocks/event/block-template-parts/modal.php)

    ---

- Added new Lines with the `Participant Template`.
- Added `Participant Skeleton` when loading.

    [EB | list.php](blocks/event/block-template-parts/list.php)

    ---

- Removed the `onclick` in the Add Participant Button, `.op-button-add`.
- Removed the `onclick` in the Download CSV Button, `.op-button-csv`.
- Added new Dropdown Element.

    [EB | header.php](blocks/event/block-template-parts/header.php)

    ---

- Changed the `opReturnResponse` Function with new `Debug Response`.
- Added the same lines in `opTimeConverter()` as in `opTimeConverter()` from `elements.js`.
    
    [JS | basic.js](assets/js/inc/basic.js)

    ---

- Added new Script and Function, `Listeners Script`.
    
    [JS | listeners.js](assets/js/inc/listeners.js)

    ---

- Added new Script `Get Booking from Session`.
    
    [JS | get-booking-from-session.js](assets/js/inc/booking/get-booking-from-session.js)

    ---

- Changed the API Folder `fastapi` to `api`.
    
    [JS | api](assets/js/inc/api)
    
    ---

- Changed the API Script `fastAPI.js` to `get-api-date.js`.
- Changed the `Approved Response`.
    
    [JS | get-api-data.js](assets/js/inc/api/get-api-data.js)

    ---

- Added new Script `Get Local Storage Data`.
    
    [JS | get-local-storage-data.js](assets/js/inc/api/get-local-storage-data.js)

    ---

- Added the `Local Storage Data` and the `Filter` of the `Event List`.
    
    [JS | get-event.js](assets/js/inc/event/get-event.js)

    ---

- Added new Function, `opGetTemplate()`.
    
    [JS | template.js](assets/js/inc/template/template.js)

    ---

- Added new Script `Get Template`.
- Added the `Local Storage Data` and the `Filter` of the `Template List`.
    
    [JS | get-template.js](assets/js/inc/template/get-template.js)

    ---

    - Added new Script `Participant` with Functions.

    [JS | participant.js](assets/js/inc/participant/participant.js)

    ---

- Added new Script `Get Participant`.
- Added Event Id to the Function `opGetParticipant`.
- Added the `Get Event` and the `Filter` of the `Participant List`.
- Changed the `File Location` from `Event Block` to folder: `../assets/inc/participant`.

    [JS | get-participant.js](assets/js/inc/participant/get-participant.js)

    ---

- Added new Script `Print Participant`.
- Added Event Id to the Function `opPrintParticipant`.
- Changed the `File Location` from `Event Block` to folder: `../assets/inc/participant`.
- Added `Validate` to the `Filename Response`.
- Added the `Update Participant Information`.

    [JS | print-participant.js](assets/js/inc/participant/print-participant.js)

    ---

- Added new Script `Update Participant`.

    [JS | update-participant.js](assets/js/inc/participant/update-participant.js)

    ---

- Added new Script `Create Participant`.

    [JS | create-participant.js](assets/js/inc/participant/create-participant.js)

    ---

- Added new Script `Update Event`.

    [JS | update-event.js](assets/js/inc/event/update-event.js)

    ---

- Added new Script `Modal`.

    [JS | modal.js](assets/js/inc/modal/modal.js)

    ---

- Added new Script `Toggle Modal Listener`.
- Changed how the `Modal Toggle Listener` is used.

    [JS | toggle-modal-listener.js](assets/js/inc/modal/toggle-modal-listener.js)

    ---

- Added new Script `Change Modal Content`.

    [JS | change-modal-content.js](assets/js/inc/modal/change-modal-content.js)

    ---

- Changed the `Modal Visibility`.
- Added the `old style` to older `Modals`.
- Changed the `position: relative` to `main` instead of `.wp-block-post-content`.
- Added `--fa-icon-play`.
- Added new `Dropdown (#1.b)`.
- Added `transform` to User Plus Icon.

    [CSS | onsiteprint-styles.css](assets/css/onsiteprint-styles.css)

    ---

- Removed one of the `opToggleActive()` in the `Cancel Buttons`.
    
    [ECB | step-3.php](blocks/event-creation/block-template-parts/block-form/steps/step-3.php)

    ---

- Changed the Activation of the Modal Window.

    [ECB | steps-listeners.js](blocks/event-creation/block-script-parts/block-form/steps/steps-listeners.js)

---

### 1.2.2 (2025-04-21) - More Participant Data

- Added New variable to Modal (note), used in `/modal.php (Event Block)`.

    [EB | block-template.js](blocks/event/block-template.php)

    ---

- Added new Textarea to Modal `(note)`.
- Added Max Length to Inputs and Textarea in Modal.

    [EB | modal.php](blocks/event/block-template-parts/modal.php)

    ---

- Added Textarea to Modal, used in `/modal.php (Event Block)`.
    
    [ECB | block-style.js](blocks/event-creation/block-style.css)

    [OP | onsiteprint-styles.css](assets/css/onsiteprint-styles.css)

    ---

- Added new Line with Extra Notes.
    
    [JS | elements.js](assets/js/elements.js)

    ---

- Added new Line with Extra Notes and changed Parameters in Participant Variable.
- Added Time Zone `"Europe/Copenhagen"`.
    
    [API | api-convert-json-into-csv.php](assets/api/convert-files/api-convert-json-into-csv.php)

    ---

- Changed the Path to the Layout SVG in the `Step 3 and Step 4 (Event Creation Block)`.
    
    [ECB | step-3.php](blocks/event-creation/block-template-parts/block-form/steps/step-3.php)
    
    [ECB | step-4.php](blocks/event-creation/block-template-parts/block-form/steps/step-4.php)

    ---

- Changed the Debug to False in the `Event Creation Block`.
    
    [ECB | block-script.js](blocks/event-creation/block-script.js)

    ---

- Changed Block Version to `1.0.1.0`.
    
    [EB | block.json](blocks/event/block.json)

    ---

- Changed Plugin Version to `1.2.2.00`.
    
    [OP | onsiteprint-plugin.php](onsiteprint-plugin.php)

---



### 1.2.1 (2025-03-08) - Preview of Layouts

- Changed wrong variable in the Debug Console Log Details.
    
    [ECB | step-1.js](blocks/event-creation/block-script-parts/block-form/steps/step-1.js)

    ---

- Changed the Description.
- Added new Template Layout Type in `createPrintExample (Event Creation Block)`.
    
    [ECB | steps-additions.js](blocks/event-creation/block-script-parts/block-form/steps/steps-additions.js)

    ---

- Moved the Event Listener Function `Grid Input Element`.
- Moved Event Listener `opGridInputListener`.
    
    [ECB | From: step-3.js](blocks/event-creation/block-script-parts/block-form/steps/step-3.js)

    [ECB | To: steps-listeners.js](blocks/event-creation/block-script-parts/block-form/steps/steps-listeners.js)

    ---

- Moved Lines from `opGetCSVDataAsJSON` to New Function `opAddGridToElement`.

    [ECB | From: steps-listeners.js](blocks/event-creation/block-script-parts/block-form/steps/steps-listeners.js)

    [ECB | To: steps-additions.js](blocks/event-creation/block-script-parts/block-form/steps/steps-additions.js).

    ---

- Moved Lines containing `opAddGridToElement` to `opGridInputListener`.
- Moved Lines containing the Dropdown Template Element from `needToBeChanged` to `opGridInputListener`.
- Created a New Functions `opLayoutButtonListener` and `opExampleButtonListener`.
- Changed `opExampleButtonListener` so it contains the Element in the Parameter.
- Changed the Error Response in the Example Button Listener Function.
- Added Try/Catch in the Example Button Listener.
- Removed some Validation in the Example Button Listener.
- Added Error Modal to `opExampleButtonListener`.
    
    [ECB | steps-listeners.js](blocks/event-creation/block-script-parts/block-form/steps/steps-listeners.js)

    ---

- Added Event Listener `opExampleButtonListener`.

    [ECB | From: steps-listeners.js](blocks/event-creation/block-script-parts/block-form/steps/steps-listeners.js)
    
    [ECB | To: step-4.js](blocks/event-creation/block-script-parts/block-form/steps/step-4.js)

    ---

- Removed the Fullscreen Button in `Grid Input Table`, there was in `Step 3 (Creation Event Block).
    
    [JS | datagridxl.js](assets/js/datagridxl2.js)

    ---

- Changed the Appearance (CSS) of the Dropdown Menu, located in `Step 3 (Creation Event Block)`.
    
    [ECB | block-style.js](blocks/event-creation/block-style.css)

    ---

- Added new Title Text to the Dropdown Menu Button, located in `Step 3 (Creation Event Block)`.
    
    [ECB | Block Template (PHP) - block-template.js](blocks/event-creation/block-template.php)

    ---

- Added new Title Text Tag and Changed Icon in the Dropdown Menu Button.
- Added new Error Modal Template in Step 3.
    
    [ECB | step-3.php](blocks/event-creation/block-template-parts/block-form/steps/step-3.php)

    ---

- Changed the Buttons Style, so it fits the GIT Branch (layout_preview).
    
    [OP | Onsiteprint Styles (CSS) - onsiteprint-styles.css](assets/css/onsiteprint-styles.css)

    ---

- Added new Title and Description Text to the Error Modal, located in `Step 3 (Creation Event Block)`.
    
    [ECB | block-template.js](blocks/event-creation/block-template.php)

    ---

- Added new Layout Type from Booking in `Step 4 (Template Creation Block)`.
    
    [ECB | step-4.php](blocks/template-creation/block-template-parts/block-form/steps/step-4.php)

    ---

- Added new Layout Type Folders `4786103` and `4760100` in the SVG Image Folder and Moved all Layout into the new Folders.
    
    [IMG | 4786103](assets/img/svg/layouts/4786103/)

    [IMG | 4760100](assets/img/svg/layouts/4760100/)

    ---

- Added new Template Layout Type to JSON in opCreateTemplate().
- Added new Template Layout Type to the Image URL in opAddCreatedTemplatesToElement().
    
    [JS | elements.js](assets/js/elements.js)

    ---
 
- New Version Number of the Event Creation Block.
    
    [ECB | block.json](blocks/event-creation/block.json)

    ---

- New Version Number of the Template Creation Block.
    
    [TCB | block.json](blocks/template-creation/block.json)

    ---

- New Version Number of the Plugin File.
    
    [OP | onsiteprint-plugin.php](onsiteprint-plugin.php)

    ---

- Changed the `.gitignore` File.
    
    [OP | .gitignore](../.gitignore)

---