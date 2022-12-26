<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Step 1
 ?  Updated: 2022-12-26 - 15:05 (Y:m:d - H:i)
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
        <label for="<?= esc_attr($id) ?>-name-input">Template Name</label>
        <div id="<?= esc_attr($id) ?>-name-input-validation" class="validation-error"></div>
        <input id="<?= esc_attr($id) ?>-name-input" name="name" type="text" required>
    </div>
</fieldset>