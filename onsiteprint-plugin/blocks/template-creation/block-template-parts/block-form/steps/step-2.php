<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Step 2
 ?  Updated: 2022-12-26 - 15:11 (Y:m:d - H:i)
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
        <div id="<?= esc_attr($id) ?>-radio-input-validation" class="validation-error"></div>
        <div id="<?= esc_attr($id) ?>-radio-input" class="input-outer flex-wrap flex-row-wrap"></div>
    </div>
</fieldset>
