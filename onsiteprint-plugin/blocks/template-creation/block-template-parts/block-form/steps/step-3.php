<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Step 3
 ?  Updated: 2022-12-26 - 15:12 (Y:m:d - H:i)
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */
?>

<fieldset class="op-fieldset-step-3">
    <header>
        <p class="op-fieldset-steps"><?= esc_attr( $acf['header_step'] ) ?> <span class="op-fieldset-step-number">3/4</span></p>
        <h3 class="op-fieldset-title"><?= esc_attr( $acf['step_3_title'] ) ?></h3>
        <p class="op-fieldset-description"><?= esc_attr( $acf['step_3_description'] ) ?></p>
    </header>
    <div class="op-fieldset__inner">
        <label for="<?= esc_attr($id) ?>-image-file-input">Select Image/Logo</label>
        <div id="<?= esc_attr($id) ?>-image-file-input-validation" class="validation-error"></div>
        <input id="<?= esc_attr($id) ?>-image-file-input" name="image" type="file" accept=".jpg, .jpeg, .png" required>
    </div>
</fieldset>
