<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Step 1
 ?  Updated: 2023-02-11 - 18:01 (Y:m:d - H:i)
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */
?>

<fieldset class="op-fieldset-step">
   <div class="op-fieldset__inner op-flex-col">
        
        <label for="<?= esc_attr($id) ?>-bookingcode-input" class="op-input-wrapper" data-validation="0">
            <p class="op-label-title"><?= esc_attr( $acf['field_1_title'] ) ?></p>
            <div class="op-input-field">
                <div class="op-input-validation" data-icon="circle-exclamation">
                    <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
                    <span class="op-message"><?= esc_attr( $acf['field_1_val'] ) ?></span>
                </div>
                <div class="op-input-approved" data-icon="circle-check">
                    <span class="op-icon" role="img" aria-label="Approved Icon"></span>
                </div>
                <input id="<?= esc_attr($id) ?>-bookingcode-input" class="op-input-border" oninput="opFormInputValidation(false, 'clear')" name="bookingcode" type="text" required>
            </div>
        </label>

        <p class="op-input-description"><?= esc_attr( $acf['field_2_description'] ) ?><a href="<?= esc_attr( $acf['field_2_link'] ) ?>"><?= esc_attr( $acf['field_2_link_title'] ) ?></a></p>
        <label for="<?= esc_attr($id) ?>-storage-approval-input" class="op-input-wrapper op-storage-approval-input" data-validation="0">
            <div class="op-input-field">
                <div class="op-input-validation" data-icon="circle-exclamation">
                    <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
                    <span class="op-message"><?= esc_attr( $acf['field_2_val'] ) ?></span>
                </div>
                <div class="op-input-checkbox op-input-border">
                    <input id="<?= esc_attr($id) ?>-storage-approval-input" oninput="opLoginButton(), opFormInputValidation(false, 'input')" name="approval" type="checkbox" required>
                    <div class="op-radio-check" data-icon="circle-check">
                        <span class="op-icon" role="img" aria-label="Check Mark Icon"></span>
                    </div>
                    <p class="op-input-value"><?= esc_attr( $acf['field_2_value'] ) ?></p>
                </div>
            </div>
        </label>

    </div>
</fieldset>
