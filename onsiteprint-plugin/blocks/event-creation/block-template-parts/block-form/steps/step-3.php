<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Step 3
 ?  Updated: 2023-01-15 - 20:30 (Y:m:d - H:i)
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */
?>

<fieldset class="op-fieldset-step-3">
    <header>
        <p class="op-fieldset-steps"><?= esc_attr( $acf['header_step'] ) ?> <span class="op-fieldset-step-number">3/5</span></p>
        <h3 class="op-fieldset-title"><?= esc_attr( $acf['step_3_title'] ) ?></h3>
        <p class="op-fieldset-description"><?= esc_attr( $acf['step_3_description'] ) ?></p>
    </header>
    <div class="op-fieldset__inner">

        <label for="<?= esc_attr($id) ?>-csv-file-input" class="op-input-wrapper" data-validation="0">
            <p class="op-label-title"><?= esc_attr( $acf['step_3_field_1_title'] ) ?></p>
            <div class="op-input-field">
                <div class="op-input-validation" data-icon="circle-exclamation">
                    <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
                    <span class="op-message"><?= esc_attr( $acf['step_3_field_1_val'] ) ?></span>
                </div>
                <div class="op-input-approved" data-icon="circle-check">
                    <span class="op-icon" role="img" aria-label="Approved Icon"></span>
                </div>
                <input id="<?= esc_attr($id) ?>-csv-file-input" class="op-input-border" oninput="opFormInputValidation( 'grid' )" name="csv-file" type="file" accept=".csv" required>
            </div>
        </label>

        <div id="<?= esc_attr($id) ?>-form-grid"></div>

        <label for="<?= esc_attr($id) ?>-grid-input" class="op-input-wrapper op-grid-input" data-validation="0">
            <div class="op-input-field">
                <div class="op-input-validation" data-icon="circle-exclamation">
                    <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
                    <span class="op-message"><?= esc_attr( $acf['step_3_field_2_val'] ) ?></span>
                </div>
                <div class="op-input-checkbox op-input-border">
                    <input id="<?= esc_attr($id) ?>-grid-input" oninput="opFormInputValidation()" name="grid" type="checkbox" required>
                    <div class="op-radio-check" data-icon="circle-check">
                        <span class="op-icon" role="img" aria-label="Check Mark Icon"></span>
                    </div>
                    <p class="op-input-description"><?= esc_attr( $acf['step_4_field_1_value'] ) ?></p>
                </div>
            </div>
        </label>

    </div>
</fieldset>
