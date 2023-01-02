<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Step 1
 ?  Updated: 2023-01-02 - 15:34 (Y:m:d - H:i)
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */
?>

<fieldset class="op-fieldset-step-1">
    <header>
        <p class="op-fieldset-steps"><?= esc_attr( $acf['header_step'] ) ?> <span class="op-fieldset-step-number">1/4</span></p>
        <h3 class="op-fieldset-title"><?= esc_attr( $acf['step_1_title'] ) ?></h3>
        <p class="op-fieldset-description"><?= esc_attr( $acf['step_1_description'] ) ?></p>
    </header>
    <div class="op-fieldset__inner">

        <label for="<?= esc_attr($id) ?>-name-input" class="op-input-wrapper" data-validation="0">
            <p class="op-label-title"><?= esc_attr( $acf['step_1_field_1_title'] ) ?></p>
            <div class="op-input-field">
                <div class="op-input-validation" data-icon="circle-exclamation">
                    <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
                    <span class="op-message"><?= esc_attr( $acf['step_1_field_1_val'] ) ?></span>
                </div>
                <div class="op-input-approved" data-icon="circle-check">
                    <span class="op-icon" role="img" aria-label="Approved Icon"></span>
                </div>
                <input id="<?= esc_attr($id) ?>-name-input" oninput="opFormInputValidation()" name="name" type="text" required>
            </div>
        </label>

    </div>
</fieldset>