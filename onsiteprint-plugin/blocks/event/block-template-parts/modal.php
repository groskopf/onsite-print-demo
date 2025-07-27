<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Modal
 ?  Updated: 2025-07-27 - 04:52 (Y:m:d - H:i)
 ?  Info: Added new Error Button.
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */
?>

<div class="op-modal">
    <div class="op-modal__inner">

        <div class="op-modal-header">

            <div class="op-modal-error">
                <div class="op-modal-error__inner">

                    <h3 class="op-modal-title" data-icon="circle-exclamation">
                        <span class="op-icon" role="img" aria-label="Error Icon"></span>
                        <span class="op-text"><?= esc_attr( $modal['error_title'] ) ?></span>
                    </h3>

                    <p class="op-modal-description"><?= esc_attr( $modal['error_description'] ) ?></p>

                    <button type="button" class="op-button-reload op-button op-button-size-medium op-button-style-solid" data-color="primary-90" onclick="window.location.reload()">
                        <span class="op-button-title"><?= esc_attr( $modal['error_button'] ) ?></span>
                    </button>

                </div>
            </div>

            <div class="op-header-content"></div>

            <button type="button" class="op-button-cancel op-button op-button-size-small op-button-style-outline" data-color="primary-90" data-icon="xmark" data-icon-position="right" data-title-visibility="1">
                <span class="op-icon" role="img" aria-label="X Mark Icon"></span>
                <span class="op-button-title"><?= esc_attr( $modal['cancel_button'] ) ?></span>
            </button>

        </div>

        <div class="op-modal-content"></div>

    </div><!-- .op-modal__inner -->
    <div class="op-modal__templates">
        
        <?php require( __DIR__ . '/templates/create-participant-template.php' ); ?>

    </div><!-- .op-modal__templates -->
</div><!-- .op-modal -->