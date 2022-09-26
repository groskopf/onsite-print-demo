<?php
/* ------------------------------------------------------------------------

 *  The OnsitePrint (Event Participant List) Block.
 *  Displaying the current Event List of Participants, if the User is logged in.
 *
 *  @link https://www.advancedcustomfields.com/resources/
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 ?  Updated: (Y:m:d - H:i) 2022-09-23 - 11:28

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

$className = 'op-event-participant-list';

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

        <div class="participant-list">
            <p class="flex-col">
                <span class="text">Loading...</span>
            </p>
        </div>

    </div><!-- .block__inner -->
</section><!-- #<?= esc_attr($id) ?> -->