<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Step 2
 ?  Updated: 2023-01-02 - 16:12 (Y:m:d - H:i)
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */
?>

<fieldset class="op-fieldset-step-2">
    <header>
        <p class="op-fieldset-steps"><?= esc_attr( $acf['header_step'] ) ?> <span class="op-fieldset-step-number">2/4</span></p>
        <h3 class="op-fieldset-title"><?= esc_attr( $acf['step_2_title'] ) ?></h3>
        <p class="op-fieldset-description"><?= esc_attr( $acf['step_2_description'] ) ?></p>
    </header>
    <div class="op-fieldset__inner">
        
        <div id="<?= esc_attr($id) ?>-radio-inputs" class="op-input-wrapper" data-validation="0">
            <p class="op-label-title"><?= esc_attr( $acf['step_2_field_1_title'] ) ?></p>
            <div class="op-input-validation" data-icon="circle-exclamation">
                <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
                <span class="op-message"><?= esc_attr( $acf['step_2_field_1_val'] ) ?></span>
            </div>
            <div class="op-form-radio-inputs"></div>
        </div>

    </div>
</fieldset>
