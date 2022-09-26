<?php
/* ------------------------------------------------------------------------

 *  The OnsitePrint (Event Information) Block.
 *  Displaying Event Information of the current Event, if the User is logged in.
 *
 *  @link https://www.advancedcustomfields.com/resources/
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 ?  Updated: (Y:m:d - H:i) 2022-09-23 - 11:19

---------------------------------------------------------------------------
 #  The Block Data
--------------------------------------------------------------------------- */

$eventNameLabel = get_field('event_name_label');
$participantsTotalLabel = get_field('event_participants_total_label');
$participantsRegisteredLabel = get_field('event_participants_registered_label');

$eventId = ( ! empty( $_GET['event'] ) ) ? $_GET['event'] : false;

$id = 'op-' . $block['id'];

if( ! empty( $block['anchor'] ) ) {
	$id = $block['anchor'];
}

$className = 'op-event-information';

if ( ! empty( $block['className'] ) ) {
    $className .= ' ' . $block['className'];
}

if ( ! empty( $block['align'] ) ) {
    $className .= ' align' . $block['align'];
}

if( ! $eventNameLabel ) {
	$eventNameLabel = 'Event Name';
}

if( ! $participantsTotalLabel ) {
	$participantsTotalLabel = 'In Total';
}

if( ! $participantsRegisteredLabel ) {
	$participantsRegisteredLabel = 'Registered';
}


/* ------------------------------------------------------------------------
 #  The Block Content
--------------------------------------------------------------------------- */
?>

<section id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?>" data-event-id="<?= esc_attr($eventId) ?>">
    <div class="block__inner">

        <p class="event-name flex-col">
            <span class="label"><?= esc_attr($eventNameLabel) ?></span>
            <span class="text">Loading...</span>
        </p>

        <div class="event-participants">
            <p class="event-participants-total flex-col">
                <span class="label"><?= esc_attr($participantsTotalLabel) ?></span>
                <span class="text">Loading...</span>
            </p>
            <p class="event-participants-registered flex-col">
                <span class="label"><?= esc_attr($participantsRegisteredLabel) ?></span>
                <span class="text">Loading...</span>
            </p>
        </div>

    </div><!-- .block__inner -->
</section><!-- #<?= esc_attr($id) ?> -->