# Changes to the OnsitePrint Plugin

This document includes the change log notes for the OnsitePrint Plugin - [GitHub](https://github.com/groskopf/onsite-print-demo)

---

### 1.2.5 (2025-12-13) - New Event Block *(NB: Under Construction)*

- Changed the Block Script in the `Event Block`.
- Changed the `Import` Functions.
- Added new Function, `opSetupHeader()`.
- Added `Event ID` to `opSetupHeader()`.
- Added new `Limit` & `Page` Filter.
- Added new Script `Setup Footer`.

    [EB | block-script.js](blocks/event/block-script.js)

    ---

- Changed how to show `Lines` in the `Participant Row (Event Block)`.
- Added new `footer .op-message` in the `Participant Row - Info (Event Block)`.
- Added `Participant Skeleton` and `CSS animation`.
- Changed the CSS in the `Modal Window` of `Add Participant`.
- Changed `op-button-cancel` to `op-button-close` in the Modal Window.
- Added `z-index` to `.op-filter-options`.
- Removed `.op-input-wrapper:last-child` and changed padding in `.op-modal-overflow__inner`.
- Added `footer`.

    [EB | block-style.css](blocks/event/block-style.css)

    ---

- Added New `Error Title` and `Error Description` to Modal, used in /modal.php.
- Changed the `Error Messages` in the Modal, used in /modal.php.
- Added new `Error Button` to Modal, used in /modal.php.
- Changed the `Modal` & `Header` variable.
- Added new `Footer` Variable and `Footer` File.

    [EB | block-template.php](blocks/event/block-template.php)

    ---

- Added new Script `Parts`.
- Added new Function, `opAddParticipant()`.
- Added new Function, `opSetupHeader()`.
- Added new Script, `participant-listeners.js`.
- Added new Function, `SetupFooter()`.

    [EB | parts.js](blocks/event/block-script-parts/parts.js)

    ---

- Added new Script `Setup Header`.
- Added `opModalToggleListener()` and `opCreateParticipantListener()`.
- Added the `Column Input Listener` Function.
- Added new `Modal Toggle Listener` to the `CSV Download Button`.
- Added new `Modal Toggle Listener` to new `Cancel Error Button`.
- Added new `Modal Toggle Listener` to new `Download Button`.

    [EB | setup-header.js](blocks/event/block-script-parts/setup-header.js)

    ---

- Added new Script `Setup Footer`.

    [EB | setup-footer.js](blocks/event/block-script-parts/setup-footer.js)

    ---

- Added new Script `Setup List`.
- Changed `Participant List Element` to `Participant Container` and Changed `Block` to `Event ID`.
- Changed the `Import` Functions.
- Added New `Participant Loop` with `Fading (CSS Animation)`.
- Added new `Limit` & `Page` Filter.

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

- Added new Script `Search For Participant`.

    [EB | search-for-participant.js](blocks/event/block-script-parts/search-for-participant.js)

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
- Changed the Modal variable.

    [EB | download-files-template.php](blocks/event/block-template-parts/templates/download-files-template.php)

    ---

- Added new `Reload Button` in the modal.php.
- Added new `Cancel Error Button` and moved `Close Button`.
- Added new `Download Files Template Part`.
- Changed the Modal variable.

    [EB | modal.php](blocks/event/block-template-parts/modal.php)

    ---

- Added new Lines with the `Participant Template`.
- Added `Participant Skeleton` when loading.
- Added new `Div` Elements.

    [EB | list.php](blocks/event/block-template-parts/list.php)

    ---

- Removed the `onclick` in the Add Participant Button, `.op-button-add`.
- Removed the `onclick` in the Download CSV Button, `.op-button-csv`.
- Added new Dropdown Element.
- Added new Variables to the Header.

    [EB | header.php](blocks/event/block-template-parts/header.php)

    ---

- Added new Footer File.

    [EB | footer.php](blocks/event/block-template-parts/footer.php)

    ---

- Changed the `Debug` Parameter.

    [JS | plugin.js](assets/js/plugin.js)

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