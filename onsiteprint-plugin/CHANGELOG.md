# Changes to the OnsitePrint Plugin

This document includes the change log notes for the OnsitePrint Plugin - [GitHub](https://github.com/groskopf/onsite-print-demo)

---

### 1.2.5^ (2026-04-06) - Print Multiple Participants

- Changed `URL` in `opGetCSVDataAsJSON()`.

    [ECB | steps-additions.js](blocks/event-creation/block-script-parts/block-form/steps/steps-additions.js)

    ---

- Changed where the class should be placed to activate the `Modal window`.

    [ECB | step-4.js](blocks/event-creation/block-script-parts/block-form/steps/step-4.js)

    ---

- Added new `Modal - Print Multiple Participants` Script.

    [EB | modal-print-participants.js](blocks/event/block-script-parts/modals/modal-print-participants.js)

    ---

- Added new `Array` for the `Modal - Print Multiple Participants`.

    [EB | block-template.php](blocks/event/block-template.php)

    ---

- Added new `Template - Print Multiple Participants` Script.

    [EB | modal.php](blocks/event/block-template-parts/modal.php)
    [EB | print-multiple-participants-template.php](blocks/event/block-template-parts/templates/print-multiple-participants-template.php)

---