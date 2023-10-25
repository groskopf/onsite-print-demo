<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Tap 1
 ?  Updated: 2023-03-05 - 17:33 (Y:m:d - H:i)
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */
?>

<section id="<?= esc_attr( $taps[0]['id'] ) ?>" class="op-block__tap-1 op-flex-col" style="--tap-color: var(--wp--preset--color--<?= esc_attr( $taps[0]['color'] ) ?>);">

    <header class="op-tap-header" onclick="opGoToTap( 'tap-1' ); return false">
        <h3 class="op-tap-title"><?= esc_attr( $taps[0]['title'] ) ?></h3>
    </header>

    <div class="op-tap__inner">
        <div class="op-tap__events" date-event-link="<?= esc_attr( $taps[0]['event_link']['url'] ) ?>" date-event-link-title="<?= esc_attr( $taps[0]['event_link']['title'] ) ?>" data-tap-color="<?= esc_attr( $taps[0]['color']  ) ?>">
            <a href="<?= esc_attr( $taps[0]['create_link']['url'] ) ?>" target="<?= esc_attr( $taps[0]['create_link']['target'] ) ?>" class="op-new-button op-button op-button-size-medium op-button-style-solid" data-color="<?= esc_attr( $taps[0]['color']  ) ?>" data-icon="pen" data-icon-position="left">
                <span class="op-icon" role="img" aria-label="Pen Icon"></span>
                <span class="op-button-title"><?= esc_attr( $taps[0]['create_link']['title'] ) ?></span>
            </a>
        </div>
    </div>

</section>
