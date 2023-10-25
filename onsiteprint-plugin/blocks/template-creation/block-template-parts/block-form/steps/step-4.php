<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Step 4
 ?  Updated: 2023-02-06 - 20:00 (Y:m:d - H:i)
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
                    <input id="<?= esc_attr($id) ?>-form-approval-input" oninput="opFormInputValidationToSubmit()" name="approval" type="checkbox" required>
                    <div class="op-radio-check" data-icon="circle-check">
                        <span class="op-icon" role="img" aria-label="Check Mark Icon"></span>
                    </div>
                    <p class="op-input-description"><?= esc_attr( $acf['step_4_field_1_value'] ) ?></p>
                </div>
            </div>
        </label>

    </div>
</fieldset>