<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Footer
 ?  Updated: 2025-12-16 - 02:59 (Y:m:d - H:i)
 ?  Info: Added new Participant Index.
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */
?>

<footer>

    <div class="op-limit" data-limit="<?= esc_attr( $footer['show_limit'] ) ?>">

        <p><?= esc_attr( $footer['show_text_first'] ) ?></p>

        <div class="op-limit-filter op-dropdown-menu">

            <button type="button" name="dropdown" class="op-button-limit-filter op-button op-button-size-small op-button-style-outline" data-color="primary-90" data-icon="user" data-icon-position="left">
                <span class="op-icon" role="img" aria-label="User Icon"></span>
                <span class="op-button-title"><?= esc_attr( $footer['show_limit'] ) ?></span>
            </button>

            <div class="op-dropdown">
                <div class="op-limit-options">

                    <?php foreach ( $footer['show_choices'] as $limit_option ) { ?>
                        <label for="<?= esc_attr( $id ) ?>__limit-input-<?= esc_attr( $limit_option ) ?>" class="op-limit-input-label">
                            <input type="radio" id="<?= esc_attr( $id ) ?>__limit-input-<?= esc_attr( $limit_option ) ?>" name="op-limit-input" value="<?= esc_attr( $limit_option ) ?>" <?= $limit_option === $footer['show_limit'] ? 'checked' : '' ?>>
                            <span class="op-check"></span>
                            <span class="op-text"><?= esc_attr( $limit_option ) ?></span>
                        </label>
                    <?php } ?>

                </div>
            </div>

        </div>

        <p><?= esc_attr( $footer['show_text_last'] ) ?></p>

    </div>

    <p class="op-participant-index">
        <span class="op-index-start">1</span>-<span class="op-index-end">2</span>

        <?= esc_attr( $footer['index_text_first'] ) ?>
        <span class="op-index-amount">3</span>
        <?= esc_attr( $footer['index_text_last'] ) ?>

    </p>

</footer>