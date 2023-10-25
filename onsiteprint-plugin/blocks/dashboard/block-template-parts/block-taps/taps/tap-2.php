<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Tap 2
 ?  Updated: 2023-03-05 - 17:33 (Y:m:d - H:i)
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */
?>

<section id="<?= esc_attr( $taps[1]['id'] ) ?>" class="op-block__tap-2 op-flex-col" style="--tap-color: var(--wp--preset--color--<?= esc_attr( $taps[1]['color'] ) ?>);">

    <header class="op-tap-header" onclick="opGoToTap( 'tap-2' ); return false">
        <h3 class="op-tap-title"><?= esc_attr( $taps[1]['title'] ) ?></h3>
    </header>

    <div class="op-tap__inner">
        <div class="op-tap__templates" date-template-link="<?= esc_attr( $taps[1]['template_link']['url'] ) ?>" date-template-link-title="<?= esc_attr( $taps[1]['template_link']['title'] ) ?>" data-tap-color="<?= esc_attr( $taps[1]['color']  ) ?>">
            <a href="<?= esc_attr( $taps[1]['create_link']['url'] ) ?>" target="<?= esc_attr( $taps[1]['create_link']['target'] ) ?>" class="op-new-button op-button op-button-size-medium op-button-style-solid" data-color="<?= esc_attr( $taps[1]['color']  ) ?>" data-icon="pen" data-icon-position="left">
                <span class="op-icon" role="img" aria-label="Pen Icon"></span>
                <span class="op-button-title"><?= esc_attr( $taps[1]['create_link']['title'] ) ?></span>
            </a>
        </div>
    </div>

</section>
