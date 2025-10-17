<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Step 3
 ?  Updated: 2025-09-19 - 01:25 (Y:m:d - H:i)
 ?  Info: Added new Data Attribute (data-grid-qr-col) to (.op-grid-wrapper) with the (step_3_qr_col) Variable.
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

        <div class="op-grid-wrapper" data-grid-cols="0" data-grid-col-name="<?= esc_attr( $acf['step_3_col'] ) ?>" data-grid-qr-col="<?= esc_attr( $acf['step_3_qr_col'] ) ?>" data-grid-no-col="<?= esc_attr( $acf['step_3_no_col'] ) ?>" data-grid-new-col="<?= esc_attr( $acf['step_3_new_col'] ) ?>">

            <p class="op-label-title"><?= esc_attr( $acf['step_3_grid_title'] ) ?></p>
            <div id="<?= esc_attr($id) ?>-form-grid"></div>

            <template id="<?= esc_attr($id) ?>-button-dropdown-template">
                <div class="op-dropdown" data-menu-position="right">
                    <button type="button" class="op-button-dropdown op-button op-button-size-small op-button-style-solid" data-color="<?= esc_attr( $styleColor ) ?>-60" data-icon="eye" data-icon-position="left" onclick="opToggleActive( 'class', 'op-dropdown' )">
                        <span class="op-icon" role="img" aria-label="Eye Icon"></span>
                        <span class="op-button-title"><?= esc_attr( $acf['step_3_dropdown_button'] ) ?></span>
                        <span class="op-icon op-icon-menu" role="img" aria-label="Arrow Down Icon"></span>
                    </button>
                    <div class="op-menu-dropdown">
                        <button type="button" class="op-button-layout op-button op-button-size-small op-button-style-outline" data-color="<?= esc_attr( $styleColor ) ?>-60" data-icon="eye" data-icon-position="left">
                            <span class="op-icon" role="img" aria-label="Eye Icon"></span>
                            <span class="op-button-title"><?= esc_attr( $acf['step_3_layout_button'] ) ?></span>
                        </button>
                        <button type="button" class="op-button-example op-button op-button-size-small op-button-style-outline" data-color="<?= esc_attr( $styleColor ) ?>-60" data-icon="eye" data-icon-position="left">
                            <span class="op-icon" role="img" aria-label="Eye Icon"></span>
                            <span class="op-button-title"><?= esc_attr( $acf['step_3_example_button'] ) ?></span>
                        </button>
                    </div>
                </div>
            </template>

            <template id="<?= esc_attr($id) ?>-modal-layout-template">
                <div class="op-modal-header">
                    <h3 class="op-modal-title"><?= esc_attr( $acf['step_3_layout_title'] ) ?></h3>
                    <button type="button" onclick="opToggleActive( 'class', 'op-modal ' ), opToggleActive( 'class', 'wp-block-post-content', 'op-modal-active' )" class="op-button-cancel op-button op-button-size-small op-button-style-outline" data-color="primary-90" data-icon="xmark" data-icon-position="right" data-title-visibility="1">
                        <span class="op-icon" role="img" aria-label="X Mark Icon"></span>
                        <span class="op-button-title"><?= esc_attr( $acf['step_3_cancel_button'] ) ?></span>
                    </button>
                </div>
                <div class="op-flex-row">
                    <img src="https://udviklingogtest.onsiteprint.dk/wp-content/plugins/onsiteprint-plugin/assets/img/svg/layouts/4786103/layout_2PB/layout_2PB_2L.svg" alt="Template: layout_2PB" width="100%" height="auto">
                </div>
            </template>

            <template id="<?= esc_attr($id) ?>-modal-example-template">
                <div class="op-modal-header">
                    <h3 class="op-modal-title"><?= esc_attr( $acf['step_3_example_title'] ) ?></h3>
                    <button type="button" onclick="opToggleActive( 'class', 'op-modal ' ), opToggleActive( 'class', 'wp-block-post-content', 'op-modal-active' )" class="op-button-cancel op-button op-button-size-small op-button-style-outline" data-color="primary-90" data-icon="xmark" data-icon-position="right" data-title-visibility="1">
                        <span class="op-icon" role="img" aria-label="X Mark Icon"></span>
                        <span class="op-button-title"><?= esc_attr( $acf['step_3_cancel_button'] ) ?></span>
                    </button>
                </div>
                <div class="op-flex-row">
                    <iframe title="pdf" src="" style="min-height: 40rem; width: 100%"></iframe>
                </div>
            </template>
            
            <template id="<?= esc_attr($id) ?>-modal-error-template">
                <div class="op-modal-header">
                    <h3 class="op-modal-title"><?= esc_attr( $acf['step_3_error_title'] ) ?></h3>
                    <button type="button" onclick="opToggleActive( 'class', 'op-modal ' ), opToggleActive( 'class', 'wp-block-post-content', 'op-modal-active' )" class="op-button-cancel op-button op-button-size-small op-button-style-outline" data-color="primary-90" data-icon="xmark" data-icon-position="right" data-title-visibility="1">
                        <span class="op-icon" role="img" aria-label="X Mark Icon"></span>
                        <span class="op-button-title"><?= esc_attr( $acf['step_3_cancel_button'] ) ?></span>
                    </button>
                </div>
                <div class="op-flex-row">
                    <p class="op-modal-description"><?= esc_attr( $acf['step_3_error_description'] ) ?></p>
                </div>
            </template>

        </div>

    </div>
</fieldset>
