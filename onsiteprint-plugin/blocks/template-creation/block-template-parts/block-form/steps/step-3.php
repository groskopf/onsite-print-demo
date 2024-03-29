<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Step 3
 ?  Updated: 2024-03-22 - 15:21 (Y:m:d - H:i)
 ?  Info: New Step (2) with amount of Lines at the Layout. 
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */

$stepNumber = 3;

?>

<fieldset class="op-fieldset-step-<?= esc_attr( $stepNumber ) ?>">
    <header class="op-fieldset-header">
        <p class="op-fieldset-steps"><?= esc_attr( $acf['header_step'] ) ?> <span class="op-fieldset-step-number"><?= esc_attr( $stepNumber ) ?>/<?= esc_attr( $amountOfSteps ) ?></span></p>
        <h3 class="op-fieldset-title"><?= esc_attr( $acf['step_'.$stepNumber.'_title'] ) ?></h3>
        <p class="op-fieldset-description"><?= esc_attr( $acf['step_'.$stepNumber.'_description'] ) ?></p>
    </header>
    <div class="op-fieldset__inner">

        <label for="<?= esc_attr($id) ?>-image-approval-input" class="op-input-wrapper op-form-approval-input" data-validation="0">
            <p class="op-label-title"><?= esc_attr( $acf['step_'.$stepNumber.'_field_1_title'] ) ?></p>
            <div class="op-input-field">
                <div class="op-input-validation" data-icon="circle-exclamation">
                    <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
                    <span class="op-message"><?= esc_attr( $acf['step_'.$stepNumber.'_field_1_val'] ) ?></span>
                </div>
                <div class="op-input-checkbox op-input-border">
                    <input id="<?= esc_attr($id) ?>-image-approval-input" oninput="opFormInputValidation()" name="image_approval" type="checkbox" value="true">
                    <div class="op-radio-check" data-icon="circle-check">
                        <span class="op-icon" role="img" aria-label="Check Mark Icon"></span>
                    </div>
                    <p class="op-input-description"><?= esc_attr( $acf['step_'.$stepNumber.'_field_1_value'] ) ?></p>
                </div>
            </div>
        </label>

        <label for="<?= esc_attr($id) ?>-image-file-input" class="op-input-wrapper" data-validation="0">
            <p class="op-label-title"><?= esc_attr( $acf['step_'.$stepNumber.'_field_1_title'] ) ?></p>
            <div class="op-input-field">
                <div class="op-input-validation" data-icon="circle-exclamation">
                    <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
                    <span class="op-message"><?= esc_attr( $acf['step_'.$stepNumber.'_field_1_val'] ) ?></span>
                </div>
                <div class="op-input-approved" data-icon="circle-check">
                    <span class="op-icon" role="img" aria-label="Approved Icon"></span>
                </div>
                <input id="<?= esc_attr($id) ?>-image-file-input" class="op-input-border" oninput="opFormInputValidation()" name="image" type="file" accept=".jpg, .jpeg, .png" required>
            </div>
        </label>

    </div>
</fieldset>
