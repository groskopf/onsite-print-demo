<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Modal
 ?  Updated: 2025-11-20 - 04:10 (Y:m:d - H:i)
 ?  Info: Changed the Modal Variable.
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */
?>

<div class="op-modal">
    <div class="op-modal__inner">

        <div class="op-modal-header">

            <div class="op-modal-error">
                <div class="op-modal-error__inner">

                    <button type="button" class="op-button-close op-cancel_error op-button op-button-size-small op-button-style-outline" data-color="primary-90" data-icon="xmark" data-icon-position="right" data-title-visibility="1">
                        <span class="op-icon" role="img" aria-label="X Mark Icon"></span>
                        <span class="op-button-title"><?= esc_attr( $modal['close_button'] ) ?></span>
                    </button>

                    <h3 class="op-modal-title" data-icon="circle-exclamation">
                        <span class="op-icon" role="img" aria-label="Error Icon"></span>
                        <span class="op-text"><?= esc_attr( $modal_error['title'] ) ?></span>
                    </h3>

                    <p class="op-modal-description"><?= esc_attr( $modal_error['description'] ) ?></p>

                    <button type="button" class="op-button-reload op-button op-button-size-medium op-button-style-solid" data-color="primary-90" onclick="window.location.reload()">
                        <span class="op-button-title"><?= esc_attr( $modal_error['button'] ) ?></span>
                    </button>

                </div>
            </div>

            <div class="op-header-content"></div>

        </div>

        <div class="op-modal-content"></div>

    </div><!-- .op-modal__inner -->
    <div class="op-modal__templates">
        
        <?php require( __DIR__ . '/templates/create-participant-template.php' ); ?>
        <?php require( __DIR__ . '/templates/download-files-template.php' ); ?>

    </div><!-- .op-modal__templates -->
</div><!-- .op-modal -->