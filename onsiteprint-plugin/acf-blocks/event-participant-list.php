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
 ?  Updated: 2022-10-28 - 14:42 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  The Block Data
--------------------------------------------------------------------------- */

$eventParticipantPrintActive = get_field('event_participant_print_active');
$eventParticipantPrintSuccess = get_field('event_participant_print_success');

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

if( ! $eventParticipantPrintActive ) {
    $eventParticipantPrintActive = 'Printer Participant...';
}

if( ! $eventParticipantPrintSuccess ) {
	$eventParticipantPrintSuccess = 'Successfully printed.';
}

/* ------------------------------------------------------------------------
 #  The Block Content
--------------------------------------------------------------------------- */
?>

<section id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?>" data-event-id="<?= esc_attr($eventId) ?>" data-print-active="<?= esc_attr($eventParticipantPrintActive) ?>" data-print-success="<?= esc_attr($eventParticipantPrintSuccess) ?>">
    <div class="block__inner">

        <div class="op-participant-list-cols flex-row">
            <p class="op-participant-list-option"></p>
            <p class="op-col-1">Kolonne 1</p>
            <p class="op-col-2">Kolonne 2</p>
            <p class="op-col-3">Kolonne 3</p>
            <p class="op-col-time"></p>
            <p class="op-col-prints"></p>
            <button class="op-participant-list-print-all op-button op-button-size-medium op-button-style-outline"  data-color="primary-90" onclick="printEventParticipants(<?= esc_attr($eventId) ?>); return false">Print Alle</button>
        </div>

        <div class="op-participant-list flex-col">
            <p class="flex-col">
                <span class="text">Loading...</span>
            </p>
        </div>

    </div><!-- .block__inner -->
</section><!-- #<?= esc_attr($id) ?> -->