<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Step 4
 ?  Updated: 2025-04-09 - 11:44 (Y:m:d - H:i)
 ?  Info: Changed the Path to the Layout SVG.
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */
?>

<fieldset class="op-fieldset-step-4">
    <header class="op-fieldset-header">
        <p class="op-fieldset-steps"><?= esc_attr( $acf['header_step'] ) ?> <span class="op-fieldset-step-number">4/4</span></p>
        <h3 class="op-fieldset-title"><?= esc_attr( $acf['step_4_title'] ) ?></h3>
        <p class="op-fieldset-description"><?= esc_attr( $acf['step_4_description'] ) ?></p>
    </header>
    <div class="op-fieldset__inner">

        <section class="op-event-approval-display op-flex-col op-flex-nowrap">
            <div class="op-template op-flex-col op-flex-nowrap">
                <div class="op-approval-field-templatename op-flex-col">
                    <h4 class="op-text-title"><?= esc_attr( $acf['step_4_approval_2'] ) ?></h4>
                    <p class="op-text-info">Loading...</p>
                </div>
                <div class="op-approval-field-layout op-flex-col">
                    <h4 class="op-text-title"><?= esc_attr( $acf['step_4_approval_4'] ) ?></h4>
                    <img src="https://udviklingogtest.onsiteprint.dk/wp-content/plugins/onsiteprint-plugin/assets/img/svg/layouts/4786103/layout_2PB/layout_2PB_2L.svg" alt="Template: layout_2PB" width="100%" height="auto">
                </div>
            </div>
            <div class="op-content op-flex-col op-flex-nowrap">
                <div class="op-approval-field-eventname op-flex-col">
                    <h4 class="op-text-title"><?= esc_attr( $acf['step_4_approval_1'] ) ?></h4>
                    <p class="op-text-info">Loading...</p>
                </div>
                <div class="op-approval-field-filename op-flex-col">
                    <h4 class="op-text-title"><?= esc_attr( $acf['step_4_approval_3'] ) ?></h4>
                    <p class="op-text-info">Loading...</p>
                </div>
                <div class="op-approval-field-print-button op-flex-col">
                    <button type="button" class="op-button-example op-button op-button-size-small op-button-style-outline" data-color="<?= esc_attr( $styleColor ) ?>-60" data-icon="money-check" data-icon-position="left">
                        <span class="op-icon" role="img" aria-label="Layout Icon"></span>
                        <span class="op-button-title"><?= esc_attr( $acf['step_3_example_button'] ) ?></span>
                    </button>
                </div>
            </div>
        </section>

        <label for="<?= esc_attr($id) ?>-form-approval-input" class="op-input-wrapper op-form-approval-input" data-validation="0">
            <p class="op-label-title"><?= esc_attr( $acf['step_4_field_1_title'] ) ?></p>
            <div class="op-input-field">
                <div class="op-input-validation" data-icon="circle-exclamation">
                    <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
                    <span class="op-message"><?= esc_attr( $acf['step_4_field_1_val'] ) ?></span>
                </div>
                <div class="op-input-checkbox op-input-border">
                    <input id="<?= esc_attr($id) ?>-form-approval-input" oninput="opFormInputValidation()" name="approval" type="checkbox" required>
                    <div class="op-radio-check" data-icon="circle-check">
                        <span class="op-icon" role="img" aria-label="Check Mark Icon"></span>
                    </div>
                    <p class="op-input-description"><?= esc_attr( $acf['step_4_field_1_value'] ) ?></p>
                </div>
            </div>
        </label>

        <template id="<?= esc_attr($id) ?>-modal-save-template" data-relocation-event="<?= esc_attr( $acf['event_link'] ) ?>">
            <div class="op-modal-header op-flex-row">
                <h3 class="op-modal-title"><?= esc_attr( $acf['modal_title'] ) ?></h3>
                <p class="op-modal-description"><?= esc_attr( $acf['modal_description'] ) ?></p>
            </div>
            <div class="op-flex-row">
                <a href="<?= esc_attr( $acf['main_link'] ) ?>" class="op-button op-button-size-small op-button-style-outline" data-color="primary-100" data-icon="arrow-left" data-icon-position="left">
                    <span class="op-icon" role="img" aria-label="Arrow Left Icon"></span>
                    <span class="op-button-title"><?= esc_attr( $acf['main_title'] ) ?></span>
                </a>
                <a class="op-button-event op-button op-button-size-small op-button-style-outline" data-color="primary-100" data-icon="arrow-right" data-icon-position="right">
                    <span class="op-icon" role="img" aria-label="Arrow Right Icon"></span>
                    <span class="op-button-title"><?= esc_attr( $acf['event_title'] ) ?></span>
                </a>
            </div>
        </template>

    </div>
</fieldset>