<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Step 1
 ?  Updated: 2023-01-15 - 20:30 (Y:m:d - H:i)
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */
?>

<fieldset class="op-fieldset-step-1">
    <header>
        <p class="op-fieldset-steps"><?= esc_attr( $acf['header_step'] ) ?> <span class="op-fieldset-step-number">1/5</span></p>
        <h3 class="op-fieldset-title"><?= esc_attr( $acf['step_1_title'] ) ?></h3>
        <p class="op-fieldset-description"><?= esc_attr( $acf['step_1_description'] ) ?></p>
    </header>
    <div class="op-fieldset__inner">
        
        <div id="<?= esc_attr($id) ?>-radio-inputs" class="op-input-wrapper" data-validation="0">
            <p class="op-label-title"><?= esc_attr( $acf['step_1_field_1_title'] ) ?></p>
            <div class="op-input-validation" data-icon="circle-exclamation">
                <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
                <span class="op-message"><?= esc_attr( $acf['step_1_field_1_val'] ) ?></span>
            </div>
            <div class="op-form-radio-inputs">
                <a href="<?= esc_attr( $acf['step_1_btn_link'] ) ?>" class="op-new-button op-button op-button-size-medium op-button-style-solid" data-color="<?= esc_attr( $styleColor ) ?>-60" data-icon="pen" data-icon-position="left">
                    <span class="op-icon" role="img" aria-label="Pen Icon"></span>
                    <span class="op-button-title"><?= esc_attr( $acf['step_1_btn_title'] ) ?></span>
                </a>
            </div>
        </div>

    </div>
</fieldset>
