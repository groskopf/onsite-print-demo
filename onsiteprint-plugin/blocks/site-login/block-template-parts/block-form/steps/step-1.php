<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Step 1
 ?  Updated: 2023-03-05 - 20:00 (Y:m:d - H:i)
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */
?>

<fieldset class="op-fieldset-step">
   <div class="op-fieldset__inner op-flex-col">
        
        <label for="<?= esc_attr($id) ?>-bookingcode-input" class="op-input-wrapper" data-validation="0">
            <p class="op-label-title"><?= esc_attr( $form['field_1']['title'] ) ?></p>
            <div class="op-input-field">
                <div class="op-input-validation" data-icon="circle-exclamation">
                    <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
                    <span class="op-message"><?= esc_attr( $form['field_1']['validation'] ) ?></span>
                </div>
                <div class="op-input-approved" data-icon="circle-check">
                    <span class="op-icon" role="img" aria-label="Approved Icon"></span>
                </div>
                <input id="<?= esc_attr($id) ?>-bookingcode-input" class="op-input-border" oninput="opFormInputValidation(false, 'clear')" name="bookingcode" type="text" required>
            </div>
        </label>

        <p class="op-input-description"><?= esc_attr( $form['field_2']['description'] ) ?><a href="<?= esc_attr( $form['field_2']['link']['url'] ) ?>"><?= esc_attr( $form['field_2']['link']['title'] ) ?></a></p>
        <label for="<?= esc_attr($id) ?>-storage-approval-input" class="op-input-wrapper op-storage-approval-input" data-validation="0">
            <div class="op-input-field">
                <div class="op-input-validation" data-icon="circle-exclamation">
                    <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
                    <span class="op-message"><?= esc_attr( $form['field_2']['validation'] ) ?></span>
                </div>
                <div class="op-input-checkbox op-input-border">
                    <input id="<?= esc_attr($id) ?>-storage-approval-input" oninput="opLoginButton(), opFormInputValidation(false, 'input')" name="approval" type="checkbox" required>
                    <div class="op-radio-check" data-icon="circle-check">
                        <span class="op-icon" role="img" aria-label="Check Mark Icon"></span>
                    </div>
                    <p class="op-input-value"><?= esc_attr( $form['field_2']['value'] ) ?></p>
                </div>
            </div>
        </label>

    </div>
</fieldset>
