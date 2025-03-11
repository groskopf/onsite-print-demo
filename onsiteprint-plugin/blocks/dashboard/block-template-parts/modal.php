<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Modal
 ?  Updated: 2024-05-12 - 00:15 (Y:m:d - H:i)
 ?  Info: (CSS, PHP & JS) Added Modal Window i Dashboard block.
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */
?>

<div class="op-modal">
    <div class="op-modal__inner">
        <div class="op-modal-header">
            <h3 class="op-modal-title"><?= esc_attr( $modal['title'] ) ?></h3>
            <button type="button" onclick="opToggleActive( 'class', 'op-modal ' ), opToggleActive( 'class', 'wp-block-post-content', 'op-modal-active' )" class="op-button-cancel op-button op-button-size-small op-button-style-outline" data-color="primary-90" data-icon="xmark" data-icon-position="right" data-title-visibility="1">
                <span class="op-icon" role="img" aria-label="X Mark Icon"></span>
                <span class="op-button-title"><?= esc_attr( $modal['cancel_button'] ) ?></span>
            </button>
            <p class="op-modal-description"><?= esc_attr( $modal['description'] ) ?></p>
        </div>
    </div>
</div><!-- .op-modal -->