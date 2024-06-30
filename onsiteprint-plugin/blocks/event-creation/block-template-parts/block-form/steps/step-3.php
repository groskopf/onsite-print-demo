<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Step 3
 ?  Updated: 2024-06-15 - 18:24 (Y:m:d - H:i)
 ?  Info: Added Button (See Print Example) to Step 3 (Event Creation).
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */
?>

<fieldset class="op-fieldset-step-3">
    <header class="op-fieldset-header">
        <p class="op-fieldset-steps"><?= esc_attr( $acf['header_step'] ) ?> <span class="op-fieldset-step-number">3/4</span></p>
        <h3 class="op-fieldset-title"><?= esc_attr( $acf['step_3_title'] ) ?></h3>
        <p class="op-fieldset-description"><?= esc_attr( $acf['step_3_description'] ) ?></p>
    </header>
    <div class="op-fieldset__inner">

        <label for="<?= esc_attr($id) ?>-csv-file-input" class="op-input-wrapper op-input-grid" data-validation="0">
            <p class="op-label-title"><?= esc_attr( $acf['step_3_field_1_title'] ) ?></p>
            <div class="op-input-field">
                <div class="op-input-validation" data-icon="circle-exclamation">
                    <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
                    <span class="op-message"><?= esc_attr( $acf['step_3_field_1_val'] ) ?></span>
                </div>
                <div class="op-input-approved" data-icon="circle-check">
                    <span class="op-icon" role="img" aria-label="Approved Icon"></span>
                </div>
                <input id="<?= esc_attr($id) ?>-csv-file-input" class="op-input-border" name="csv-file" type="file" accept=".csv" required>
            </div>
        </label>

        <div class="op-grid-wrapper" data-grid-cols="0" data-grid-col-name="<?= esc_attr( $acf['step_3_col'] ) ?>" data-grid-no-col="<?= esc_attr( $acf['step_3_no_col'] ) ?>" data-grid-new-col="<?= esc_attr( $acf['step_3_new_col'] ) ?>">

            <p class="op-label-title"><?= esc_attr( $acf['step_3_grid_title'] ) ?></p>
            <div id="<?= esc_attr($id) ?>-form-grid"></div>

            <template id="<?= esc_attr($id) ?>-button-example-template">
                <button type="button" class="op-button-example op-button op-button-size-small op-button-style-outline" data-color="<?= esc_attr( $styleColor ) ?>-60" data-icon="money-check" data-icon-position="left">
                    <span class="op-icon" role="img" aria-label="Layout Icon"></span>
                    <span class="op-button-title"><?= esc_attr( $acf['step_3_example_button'] ) ?></span>
                </button>
            </template>

        </div>

    </div>
</fieldset>
