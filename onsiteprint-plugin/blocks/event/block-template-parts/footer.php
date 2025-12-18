<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Footer
 ?  Updated: 2025-12-18 - 01:08 (Y:m:d - H:i)
 ?  Info: Added new "No Participants Found" message.
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

    <div class="op-participant-index">

        <p class="op-index-empty"><?= esc_attr( $footer['no_participants'] ) ?></p>

        <p class="op-index-text">
            <span class="op-index-start">1</span>-<span class="op-index-end">2</span>

            <?= esc_attr( $footer['index_text_first'] ) ?>
            <span class="op-index-amount">3</span>
            <?= esc_attr( $footer['index_text_last'] ) ?>

        </p>

    </div>

    <div class="op-page" data-page="<?= esc_attr( $footer['page'] ) ?>">

        <button type="button" name="previous" class="op-button-page-previous op-button op-button-size-small op-button-style-outline op-disabled" data-color="primary-90" data-icon="arrow-left" data-icon-position="left" disabled>
            <span class="op-icon" role="img" aria-label="Previous Icon"></span>
            <span class="op-button-title"><?= esc_attr( $footer['page_previous_text'] ) ?></span>
        </button>

        <button type="button" name="next" class="op-button-page-next op-button op-button-size-small op-button-style-outline op-disabled" data-color="primary-90" data-icon="arrow-right" data-icon-position="right" disabled>
            <span class="op-icon" role="img" aria-label="Next Icon"></span>
            <span class="op-button-title"><?= esc_attr( $footer['page_next_text'] ) ?></span>
        </button>

    </div>

</footer>