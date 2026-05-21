<?php
/* ------------------------------------------------------------------------
 *  Modal Part Name: Template - Print Multiple Participants
 ?  Updated: 2026-05-21 - 23:02 (Y:m:d - H:i)
 ?  Info: Added new `Template - Print Multiple Participants` Script.
---------------------------------------------------------------------------
 #  The Modal Part - Content
--------------------------------------------------------------------------- */
?>

<template id="<?= esc_attr( $id ) ?>-print-multiple-participants-template">

    <div class="op-header-content__inner">

        <button type="button" class="op-button-close op-cancel_print-more op-button op-button-size-small op-button-style-outline" data-color="primary-90" data-icon="xmark" data-icon-position="right" data-title-visibility="1">
            <span class="op-icon" role="img" aria-label="X Mark Icon"></span>
            <span class="op-button-title"><?= esc_attr( $modal['close_button'] ) ?></span>
        </button>

        <h3 class="op-modal-title" data-icon="print">
            <span class="op-icon" role="img" aria-label="Print More Icon"></span>
            <span class="op-text"><?= esc_attr( $modal_pm['title'] ) ?></span>
        </h3>

        <p class="op-modal-description"><?= esc_attr( $modal_pm['description'] ) ?></p>

    </div>

    <div class="op-modal-content__inner">

        <div class="op-modal-overflow">          
            
            <div class="op-modal-overflow__inner op-flex-row">

                <p class="op-modal-description"><?= esc_attr( $modal_pm['description'] ) ?></p>


            </div><!-- .op-modal-overflow__inner -->
        </div><!-- .op-modal-overflow -->

        <div class="op-modal-buttons op-flex-row">
            
            <button class="op-button-restart-printing op-button op-button-size-medium op-button-style-solid" data-color="primary-20" data-icon="arrow-rotate-left" data-icon-position="left" data-title-visibility="1">
                <span class="op-icon" role="img" aria-label="Start forefra"></span>
                <span class="op-button-title"><?= esc_attr( $modal_pm['restart_button'] ) ?></span>
            </button>

            <button class="op-button-start-printing op-button op-button-size-medium op-button-style-solid op-flex-fill" data-color="primary-90" data-icon="play" data-icon-position="left">
                <span class="op-icon" role="img" aria-label="Start Printing Icon"></span>
                <span class="op-button-title"><?= esc_attr( $modal_pm['start_button'] ) ?></span>
            </button>

            <button class="op-button-pause-printing op-button op-button-size-medium op-button-style-solid op-flex-fill op-hidden" data-color="action-90" data-icon="pause" data-icon-position="left">
                <span class="op-icon" role="img" aria-label="Pause Printing Icon"></span>
                <span class="op-button-title"><?= esc_attr( $modal_pm['pause_button'] ) ?></span>
            </button>
    
        </div><!-- .op-modal-buttons -->

    </div><!-- .op-modal-content__inner -->

</template>