<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Tap 1
 ?  Updated: 2023-02-19 - 22:00 (Y:m:d - H:i)
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */
?>

<section id="<?= esc_attr( $acf['tap_1_id'] ) ?>" class="op-block__tap-1 op-flex-col" style="--tap-color: var(--wp--preset--color--<?= esc_attr( $acf['tap_1_color'] ) ?>);">

    <header class="op-tap-header" onclick="opGoToTap( 'tap-1' ); return false">
        <h3 class="op-tap-title"><?= esc_attr( $acf['tap_1_title'] ) ?></h3>
    </header>

    <div class="op-tap__inner">
        <div class="op-tap__events" date-event-link="<?= esc_attr( $acf['tap_1_link'] ) ?>" date-event-link-title="<?= esc_attr( $acf['tap_1_link_title'] ) ?>" data-tap-color="<?= esc_attr( $acf['tap_1_color']  ) ?>">
            <a href="<?= esc_attr( $acf['event_link'] ) ?>" class="op-new-button op-button op-button-size-medium op-button-style-solid" data-color="<?= esc_attr( $acf['tap_1_color']  ) ?>" data-icon="pen" data-icon-position="left">
                <span class="op-icon" role="img" aria-label="Pen Icon"></span>
                <span class="op-button-title"><?= esc_attr( $acf['event_link_title'] ) ?></span>
            </a>
        </div>
    </div>

</section>
