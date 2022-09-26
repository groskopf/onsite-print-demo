<?php
/* ------------------------------------------------------------------------

 *  The OnsitePrint (Event Design Information) Block.
 *  Displaying Event Design Information of the current Event, if the User is logged in.
 *
 *  @link https://www.advancedcustomfields.com/resources/
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 ?  Updated: (Y:m:d - H:i) 2022-09-25 - 13:23

---------------------------------------------------------------------------
 #  The Block Data
--------------------------------------------------------------------------- */

$eventDesignNameLabel = get_field('event_design_name_label');

$eventId = ( ! empty( $_GET['event'] ) ) ? $_GET['event'] : false;

$id = 'op-' . $block['id'];

if( ! empty( $block['anchor'] ) ) {
	$id = $block['anchor'];
}

$className = 'op-event-design-information';

if ( ! empty( $block['className'] ) ) {
    $className .= ' ' . $block['className'];
}

if ( ! empty( $block['align'] ) ) {
    $className .= ' align' . $block['align'];
}

if( ! $eventDesignNameLabel ) {
	$eventDesignNameLabel = 'Design Name';
}


/* ------------------------------------------------------------------------
 #  The Block Content
--------------------------------------------------------------------------- */
?>

<section id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?>" data-event-id="<?= esc_attr($eventId) ?>">
    <div class="block__inner">

        <p class="design-name flex-col">
            <span class="label"><?= esc_attr($eventDesignNameLabel) ?></span>
            <span class="text">Loading...</span>
        </p>

    </div><!-- .block__inner -->
</section><!-- #<?= esc_attr($id) ?> -->