<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Step 4
 ?  Updated: 2024-07-02 - 21:45 (Y:m:d - H:i)
 ?  Info: Added Modal (See Print Example) to Step 3 (Event Creation).
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
            <div class="op-modal-header">
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