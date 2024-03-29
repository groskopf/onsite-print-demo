<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Step 2
 ?  Updated: 2024-03-22 - 15:21 (Y:m:d - H:i)
 ?  Info: New Step (2) with amount of Lines at the Layout. 
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */

$stepNumber = 2;

?>

<fieldset class="op-fieldset-step-<?= esc_attr( $stepNumber ) ?>">
    <header class="op-fieldset-header">
        <p class="op-fieldset-steps"><?= esc_attr( $acf['header_step'] ) ?> <span class="op-fieldset-step-number"><?= esc_attr( $stepNumber ) ?>/<?= esc_attr( $amountOfSteps ) ?></span></p>
        <h3 class="op-fieldset-title"><?= esc_attr( $acf['step_'.$stepNumber.'_title'] ) ?></h3>
        <p class="op-fieldset-description"><?= esc_attr( $acf['step_'.$stepNumber.'_description'] ) ?></p>
    </header>
    <div class="op-fieldset__inner">
 
       <div id="<?= esc_attr($id) ?>-radio-inputs" class="op-input-wrapper" data-validation="0">
            <p class="op-label-title"><?= esc_attr( $acf['step_'.$stepNumber.'_field_1_title'] ) ?></p>
            <div class="op-input-validation" data-icon="circle-exclamation">
                <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
                <span class="op-message"><?= esc_attr( $acf['step_'.$stepNumber.'_field_1_val'] ) ?></span>
            </div>
            <div class="op-form-layout-lines">

                <div class="op-radio-input op-flex-row">
                    <input type="radio" id="<?= esc_attr($id) ?>-radio-input-1" oninput="opFormInputValidation()" name="layout" value="1" required>
                    <label for="<?= esc_attr($id) ?>-radio-input-1">
                        <div class="op-radio-check" data-icon="circle-check">
                            <span class="op-icon" role="img" aria-label="Check Mark Icon"></span>
                        </div>
                        <p class="op-input-description"><?= esc_attr( $acf['step_'.$stepNumber.'_line_1_title'] ) ?></p>
                    </label>
                </div>
                <div class="op-radio-input op-flex-row">
                    <input type="radio" id="<?= esc_attr($id) ?>-radio-input-2" oninput="opFormInputValidation()" name="layout" value="2" required>
                    <label for="<?= esc_attr($id) ?>-radio-input-2">
                        <div class="op-radio-check" data-icon="circle-check">
                            <span class="op-icon" role="img" aria-label="Check Mark Icon"></span>
                        </div>
                        <p class="op-input-description"><?= esc_attr( $acf['step_'.$stepNumber.'_line_2_title'] ) ?></p>
                    </label>
                </div>
                <div class="op-radio-input op-flex-row">
                    <input type="radio" id="<?= esc_attr($id) ?>-radio-input-3" oninput="opFormInputValidation()" name="layout" value="3" required>
                    <label for="<?= esc_attr($id) ?>-radio-input-3">
                        <div class="op-radio-check" data-icon="circle-check">
                            <span class="op-icon" role="img" aria-label="Check Mark Icon"></span>
                        </div>
                        <p class="op-input-description"><?= esc_attr( $acf['step_'.$stepNumber.'_line_3_title'] ) ?></p>
                    </label>
                </div>
                <div class="op-radio-input">
                    <input type="radio" id="<?= esc_attr($id) ?>-radio-input-4" oninput="opFormInputValidation()" name="layout" value="4" required>
                    <label for="<?= esc_attr($id) ?>-radio-input-4">
                        <div class="op-radio-check" data-icon="circle-check">
                            <span class="op-icon" role="img" aria-label="Check Mark Icon"></span>
                        </div>
                        <p class="op-input-description"><?= esc_attr( $acf['step_'.$stepNumber.'_line_4_title'] ) ?></p>
                    </label>
                </div>
                <div class="op-radio-input">
                    <input type="radio" id="<?= esc_attr($id) ?>-radio-input-5" oninput="opFormInputValidation()" name="layout" value="5" required>
                    <label for="<?= esc_attr($id) ?>-radio-input-5">
                        <div class="op-radio-check" data-icon="circle-check">
                            <span class="op-icon" role="img" aria-label="Check Mark Icon"></span>
                        </div>
                        <p class="op-input-description"><?= esc_attr( $acf['step_'.$stepNumber.'_line_5_title'] ) ?></p>
                    </label>
                </div>

            </div>
        </div>

    </div>
</fieldset>
