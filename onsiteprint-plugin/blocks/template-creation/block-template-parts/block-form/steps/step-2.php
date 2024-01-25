<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Step 2
 ?  Updated: 2024-01-25 - 04:14 (Y:m:d - H:i)
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */
?>

<fieldset class="op-fieldset-step-2">
    <header class="op-fieldset-header">
        <p class="op-fieldset-steps"><?= esc_attr( $acf['header_step'] ) ?> <span class="op-fieldset-step-number">2/4</span></p>
        <h3 class="op-fieldset-title"><?= esc_attr( $acf['step_2_title'] ) ?></h3>
        <p class="op-fieldset-description"><?= esc_attr( $acf['step_2_description'] ) ?></p>
    </header>
    <div class="op-fieldset__inner">
 
       <div id="<?= esc_attr($id) ?>-radio-inputs" class="op-input-wrapper" data-validation="0" data-layout-col="1">
            <p class="op-label-title"><?= esc_attr( $acf['step_2_field_1_title'] ) ?></p>
            <div class="op-input-validation" data-icon="circle-exclamation">
                <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
                <span class="op-message"><?= esc_attr( $acf['step_2_field_1_val'] ) ?></span>
            </div>
            <div class="op-form-layouts op-flex-col op-flex-nowrap">
                <details class="op-layouts-col-1" open>
                    <summary data-icon="arrow-down">
                        <span class="op-message"><?= esc_attr( $acf['step_2_col_1_title'] ) ?></span>
                        <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
                    </summary>
                    <div class="op-form-radio-inputs"></div>
                </details>
                <details class="op-layouts-col-2">
                    <summary data-icon="arrow-down">
                        <span class="op-message"><?= esc_attr( $acf['step_2_col_2_title'] ) ?></span>
                        <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
                    </summary>
                    <div class="op-form-radio-inputs"></div>
                </details>
                <details class="op-layouts-col-3">
                    <summary data-icon="arrow-down">
                        <span class="op-message"><?= esc_attr( $acf['step_2_col_3_title'] ) ?></span>
                        <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
                    </summary>
                    <div class="op-form-radio-inputs"></div>
                </details>
                <details class="op-layouts-col-4">
                    <summary data-icon="arrow-down">
                        <span class="op-message"><?= esc_attr( $acf['step_2_col_4_title'] ) ?></span>
                        <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
                    </summary>
                    <div class="op-form-radio-inputs"></div>
                </details>
                <details class="op-layouts-col-5">
                    <summary data-icon="arrow-down">
                        <span class="op-message"><?= esc_attr( $acf['step_2_col_5_title'] ) ?></span>
                        <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
                    </summary>
                    <div class="op-form-radio-inputs"></div>
                </details>
            </div>
        </div>

    </div>
</fieldset>
