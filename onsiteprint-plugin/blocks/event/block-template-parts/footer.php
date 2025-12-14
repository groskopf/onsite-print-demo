<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Footer
 ?  Updated: 2025-12-14 - 05:15 (Y:m:d - H:i)
 ?  Info: Added new Footer File.
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */
?>

<footer>
    
    <div class="op-page" data-page="<?= esc_attr( $footer[ 'page' ] ) ?>">
    </div>
    <div class="op-limit" data-limit="<?= esc_attr( $footer[ 'show_limit' ] ) ?>">
        
        <p><?= esc_attr( $footer[ 'show_text_first' ] ) ?></p>

        <div class="op-limit-filter">
            
            <button type="button" class="op-button-limit-filter op-button op-button-size-small op-button-style-outline" data-color="primary-90" data-icon="sliders" data-icon-position="left">
                <span class="op-icon" role="img" aria-label="Filter Icon"></span>
                <span class="op-button-title"><?= esc_attr( $footer[ 'show_limit' ] ) ?></span>
            </button>

            <div class="op-limit-options">

                <?php foreach ( $footer[ 'show_choices' ] as $limit_option ) { ?>
                    <label for="<?= esc_attr( $id ) ?>__limit-input-<?= esc_attr( $limit_option ) ?>" class="op-limit-input-label">
                        <input type="radio" id="<?= esc_attr( $id ) ?>__limit-input-<?= esc_attr( $limit_option ) ?>" name="op-limit-input" value="<?= esc_attr( $limit_option ) ?>" <?= $limit_option === $footer[ 'show_limit' ] ? 'checked' : '' ?>>
                        <span class="op-check"></span>
                        <span class="op-text"><?= esc_attr( $limit_option ) ?></span>
                    </label>
                <?php } ?>

            </div>

        </div>

        <p><?= esc_attr( $footer[ 'show_text_last' ] ) ?></p>

    </div>

</footer>