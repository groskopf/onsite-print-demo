# OnsitePrint Plugin - Change log

This document includes the change log notes for the OnsitePrint Plugin - [GitHub](https://github.com/groskopf/onsite-print-demo)


## 2024-11-08

#### [Step 1 (JS) - step-1.js](blocks/event-creation/block-script-parts/block-form/steps/step-1.js)
- Changed wrong variable in the Debug Console Log Details.

    ---

#### [Step 3 (JS) - step-3.js](blocks/event-creation/block-script-parts/block-form/steps/step-3.js)
- Moved the Event Listener Function (Grid Input Element) from Step 3 (JS) to a new file - Step Listeners (JS).

    ---

#### [Step Additions (JS) - steps-additions.js](blocks/event-creation/block-script-parts/block-form/steps/steps-additions.js)
- Changed the Description in Step Additions (JS).

    ---

## 2024-12-04

#### [Step 3 (JS) - step-3.js](blocks/event-creation/block-script-parts/block-form/steps/step-3.js)
- Moved Event Listener (opGridInputListener) to [Step Listeners (JS)](blocks/event-creation/block-script-parts/block-form/steps/steps-listeners.js).

    ---

## 2024-12-05

#### [Step Listeners (JS) - steps-listeners.js](blocks/event-creation/block-script-parts/block-form/steps/steps-listeners.js)
- Moved Lines to New Function (opGetCSVDataAsJSON) in [Step Additions (JS)](blocks/event-creation/block-script-parts/block-form/steps/steps-additions.js).

    ---

## 2024-12-12

#### [Step Listeners (JS) - steps-listeners.js](blocks/event-creation/block-script-parts/block-form/steps/steps-listeners.js)
- Moved Lines containing opAddGridToElement() to opGridInputListener().
- Moved Lines containing opGetCSVDataAsJSON() to opAddGridToElement() in [Step Additions (JS)](blocks/event-creation/block-script-parts/block-form/steps/steps-additions.js).

    ---

## 2024-12-13

#### [Step Listeners (JS) - steps-listeners.js](blocks/event-creation/block-script-parts/block-form/steps/steps-listeners.js)
- Moved Lines containing the Dropdown Template Element to opGridInputListener() from needToBeChanged().
- Created a New Function (opLayoutButtonListener).

    ---

## 2024-12-18

#### [Step Listeners (JS) - steps-listeners.js](blocks/event-creation/block-script-parts/block-form/steps/steps-listeners.js)
- Created a New Function (opExampleButtonListener).
- Changed opExampleButtonListener() so it contains the Element in the Parameter.

    ---

#### [Step 4 (JS) - step-4.js](blocks/event-creation/block-script-parts/block-form/steps/step-4.js)
- Added Event Listener opExampleButtonListener() from [Step Listeners (JS)](blocks/event-creation/block-script-parts/block-form/steps/steps-listeners.js) to Step 4.

    ---
    
## 2024-12-31

#### [Data Grid XL (JS) - datagridxl.js](assets/js/datagridxl2.js)
- Removed the Fullscreen Button, there was in Step 3 (Grid Input Table) in the Creation Event Block.

    ---

## 2025-01-02

#### [Block Style (CSS) - block-style.js](blocks/event-creation/block-style.css)
- Changed the Appearance (CSS) of the Dropdown Menu, located in Step 3 (Event Creation).

    ---

#### [Block Template (PHP) - block-template.js](blocks/event-creation/block-template.php)
- Added new Title Text to the Dropdown Menu Button, located in Step 3 (Event Creation).

    ---

#### [Step 3 (PHP) - step-3.php](blocks/event-creation/block-template-parts/block-form/steps/step-3.php)
- Added new Title Text Tag and Changed Icon in the Dropdown Menu Button.

    ---

## 2025-01-03

#### [Onsiteprint Styles (CSS) - onsiteprint-styles.css](assets/css/onsiteprint-styles.css)
- Changed the Buttons Style, so it fits the GIT Branch (layout_preview).

    ---

#### [Step Listeners (JS) - steps-listeners.js](blocks/event-creation/block-script-parts/block-form/steps/steps-listeners.js)
- Changed the Error Response in the Example Button Listener Function.
- Added Try/Catch in the Example Button Listener.
- Removed some Validation in the Example Button Listener.

    ---

## 2025-01-09

#### [Step Listeners (JS) - steps-listeners.js](blocks/event-creation/block-script-parts/block-form/steps/steps-listeners.js)
- Added Error Modal to opExampleButtonListener().

    ---

#### [Step 3 (PHP) - step-3.php](blocks/event-creation/block-template-parts/block-form/steps/step-3.php)
- Added new Error Modal Template in Step 3.

    ---

#### [Block Template (PHP) - block-template.js](blocks/event-creation/block-template.php)
- Added new Title and Description Text to the Error Modal, located in Step 3.

    ---
    
## 2025-01-21

#### [Step 4 (PHP) - step-4.php](blocks/template-creation/block-template-parts/block-form/steps/step-4.php)
- Added new Layout Type from Booking in Step 4 (Template Creation).

    ---

#### [Layout Type (Folder) - 4786103](assets/img/svg/layouts/4786103/)
- Added new Layout Type Folder (4786103) in the SVG Image Folder and Moved all Layout into the new Folder.

    ---

#### [Layout Type (Folder) - 4760100](assets/img/svg/layouts/4760100/)
- Added new Layout Type Folder (4760100) in the SVG Image Folder and Added new Layout into the new Folder.

    ---

#### [Elements (JS) - elements.js](assets/js/elements.js)
- Added new Template Layout Type to JSON in opCreateTemplate().
- Added new Template Layout Type to the Image URL in opAddCreatedTemplatesToElement().

    ---

#### [Step Additions (JS) - steps-additions.js](blocks/event-creation/block-script-parts/block-form/steps/steps-additions.js)
- Added new Template Layout Type in createPrintExample() - (Event Creation).

    ---
 
## 2025-01-31

#### [Event Creation Block (JSON) - block.json](blocks/event-creation/block.json)
- New Version Number of the Event Creation Block.

    ---

#### [Template Creation Block (JSON) - block.json](blocks/template-creation/block.json)
- New Version Number of the Template Creation Block.

    ---

#### [Plugin File (PHP) - onsiteprint-plugin.php](onsiteprint-plugin.php)
- New Version Number of the Plugin File.

    ---

## 2025-02-19

#### [Layout Type (Folder) - 4760100](assets/img/svg/layouts/4760100/)
- Changed all SVG Layouts in the Layout Type Folder (4760100).

    ---

## 2025-03-08

#### [.gitignore (File)](../.gitignore)
- Changed the ".gitignore" File.

    ---