# Changes to the OnsitePrint Plugin

This document includes the change log notes for the OnsitePrint Plugin - [GitHub](https://github.com/groskopf/onsite-print-demo)

---

### 1.2.3 (2025-09-18) - QR Code in Templates *(NB: Under Construction)*

- Modified the file to handle multi-line fields and added some more error handling.

    [API | api-convert-csv-into-json.php](assets/api/api-convert-csv-into-json.php)

    ---

- Added new Variable `(step_3_qr_col)`.

    [ECB | block-template.php](blocks/event-creation/block-template.php)

    ---

- Added new Data Attribute `(data-grid-qr-col)` to `(.op-grid-wrapper)` with the `(step_3_qr_col)` Variable.

    [ECB | step-3.php](blocks/event-creation/block-template-parts/block-form/steps/step-3.php)

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