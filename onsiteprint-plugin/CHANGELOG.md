# Changes to the OnsitePrint Plugin

This document includes the change log notes for the OnsitePrint Plugin - [GitHub](https://github.com/groskopf/onsite-print-demo)

---

### 1.2.5 (2025-12-13) - New Event Block

- Changed the `Plugin` Version to `1.2.5`.

    [OP | onsiteprint-plugin.php](onsiteprint-plugin.php)

---

- Changed the `Debug` Parameter.

    [JS | plugin.js](assets/js/plugin.js)

    ---

- Changed where the class should be placed to activate the `Modal window` in the function `opSaveNewTemplate()`.
- Changed `URL` in `opCreateEvent()`.

    [JS | elements.js](assets/js/elements.js)

---

- Changed the `opReturnResponse` Function with new `Debug Response`.
- Added the same lines in `opTimeConverter()` as in `opTimeConverter()` from `elements.js`.

    [JS | basic.js](assets/js/inc/basic.js)

    ---

- Added new `Listeners` Script.

    [JS | listeners.js](assets/js/inc/listeners.js)

    ---

- Added new `Get Booking from Session` Script.

    [JS | get-booking-from-session.js](assets/js/inc/booking/get-booking-from-session.js)

    ---

- Changed the API Folder `fastapi` to `api`.

    [JS | api](assets/js/inc/api)

    ---

- Changed the API Script `fastAPI.js` to `get-api-date.js`.
- Changed the `Approved Response`.

    [JS | get-api-data.js](assets/js/inc/api/get-api-data.js)

    ---

- Added new `Get Local Storage Data` Script.

    [JS | get-local-storage-data.js](assets/js/inc/api/get-local-storage-data.js)

    ---

- Added the `Local Storage Data` and the `Filter` of the `Event List`.

    [JS | get-event.js](assets/js/inc/event/get-event.js)

    ---

- Added new `opGetTemplate()` Function.

    [JS | template.js](assets/js/inc/template/template.js)

    ---

- Added new `Get Template` Script.

    [JS | get-template.js](assets/js/inc/template/get-template.js)

    ---

- Added new `Participant` Script.

    [JS | participant.js](assets/js/inc/participant/participant.js)

    ---

- Added new `Get Participant` Script.

    [JS | get-participant.js](assets/js/inc/participant/get-participant.js)

    ---

- Added new `Print Participant` Script.

    [JS | print-participant.js](assets/js/inc/participant/print-participant.js)

    ---

- Added new `Update Participant` Script.

    [JS | update-participant.js](assets/js/inc/participant/update-participant.js)

    ---

- Added new `Create Participant` Script.

    [JS | create-participant.js](assets/js/inc/participant/create-participant.js)

    ---

- Added new `Update Event` Script.

    [JS | update-event.js](assets/js/inc/event/update-event.js)

    ---

- Added new `Modal` Script.

    [JS | modal.js](assets/js/inc/modal/modal.js)

    ---

- Added new `Toggle Modal Listener` Script.

    [JS | toggle-modal-listener.js](assets/js/inc/modal/toggle-modal-listener.js)

    ---

- Added new `Change Modal Content` Script.

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

- Deleted `Print CSS` File.

    [CSS | onsiteprint-styles-print.css](assets/css/onsiteprint-styles-print.css)

    ---

- Modified the file to handle a `QR Code line` and added some more error handling.

    [PHP | api-convert-json-into-csv.php](/assets/api/api-convert/api-convert-json-into-csv.php)

---

- Changed the `Event Block` Version to `1.0.3`.

    [EB | block.json](blocks/event/block.json)

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

- Added new `Print CSS` File.

    [EB | block-style-print.css](blocks/event/block-style-print.css)

    ---

- Added New `Error Title` and `Error Description` to Modal, used in /modal.php.
- Changed the `Error Messages` in the Modal, used in /modal.php.
- Added new `Error Button` to Modal, used in /modal.php.
- Changed the `Modal` & `Header` variable.
- Added new `Footer` Variable and `Footer` File.

    [EB | block-template.php](blocks/event/block-template.php)

    ---

- Changed the Block Script in the `Event Block`.
- Changed the `Import` Functions.
- Added new Function, `opSetupHeader()`.
- Added `Event ID` to `opSetupHeader()`.
- Added new `Limit` & `Page` Filter.
- Added new Script `Setup Footer`.

    [EB | block-script.js](blocks/event/block-script.js)

    ---

- Added new `Parts` Script.

    [EB | parts.js](blocks/event/block-script-parts/parts.js)

    ---

- Added new `Setup Header` Script.

    [EB | setup-header.js](blocks/event/block-script-parts/setup-header.js)

    ---

- Added new `Setup Footer` Script.

    [EB | setup-footer.js](blocks/event/block-script-parts/setup-footer.js)

    ---

- Added new `Setup List` Script.

    [EB | setup-list.js](blocks/event/block-script-parts/setup-list.js)

    ---

- Added new `Add Participant` Script.

    [EB | add-participant.js](blocks/event/block-script-parts/add-participant.js)

    ---

- Added new `Search For Participant` Script.

    [EB | search-for-participant.js](blocks/event/block-script-parts/search-for-participant.js)

    ---

- Added new `Participant Listeners` Script.

    [EB | participant-listeners.js](blocks/event/block-script-parts/participant-listeners.js)

    ---

- Added new `Modal - Create Participant` Script.

    [EB | modal-create-participant.js](blocks/event/block-script-parts/modals/modal-create-participant.js)

    ---

- Added new `Modal - Clear Form Listener` Script.

    [EB | modal-clear-form-listener.js](blocks/event/block-script-parts/modals/modal-clear-form-listener.js)

    ---

- Added new `Participant Template` File.

    [EB | participant-template.php](blocks/event/block-template-parts/templates/participant-template.php)

    ---

- Added New `Create Participant Template` File.

    [EB | create-participant-template.php](blocks/event/block-template-parts/templates/create-participant-template.php)

    ---

- Added New `Download Files Template` File.

    [EB | download-files-template.php](blocks/event/block-template-parts/templates/download-files-template.php)

    ---

- Added new `Reload Button`.
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

- Added new `Footer` File.

    [EB | footer.php](blocks/event/block-template-parts/footer.php)

    ---

- Added new Added new `Print Document` File.

    [EB | print-document.php](blocks/event/block-template-parts/print-document.php)

---

- Changed the `Event Creation Block` Version to `1.0.2`.

    [ECB | block.json](blocks/event-creation/block.json)

    ---

- Removed one of the `opToggleActive()` in the `Cancel Buttons`.

    [ECB | step-3.php](blocks/event-creation/block-template-parts/block-form/steps/step-3.php)

    ---

- Changed the `Activation` of the `Modal Window`.

    [ECB | steps-listeners.js](blocks/event-creation/block-script-parts/block-form/steps/steps-listeners.js)

    ---

- Changed `URL` in `opGetCSVDataAsJSON()`.

    [ECB | steps-additions.js](blocks/event-creation/block-script-parts/block-form/steps/steps-additions.js)

    ---

- Changed where the class should be placed to activate the `Modal window`.

    [ECB | step-4.js](blocks/event-creation/block-script-parts/block-form/steps/step-4.js)

---