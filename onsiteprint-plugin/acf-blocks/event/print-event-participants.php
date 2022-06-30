<?php
/**
 * [Block] Print Event Participants.
 *
 * [Front-end] Print Event Participants.
 *
 * @link https://www.advancedcustomfields.com/resources/
 *
 * @package WordPress
 * @subpackage OnsitePrint Plugin
 * @since OnsitePrint Plugin 1.0
 */

//$pageListOptions = get_field('page_list_options');

$id = 'op-' . $block['id'];

$eventList = ( ! empty( $_GET['event'] ) ) ? $_GET['event'] : false;


if ( ! empty( $block['anchor'] ) ) {
	$id = $block['anchor'];
}

$className = 'op-print-event-participants' . $listPageType . ' active';

if ( ! empty( $block['className'] ) ) {
    $className .= ' ' . $block['className'];
}

if ( ! empty( $block['align'] ) ) {
    $className .= ' align' . $block['align'];
}

$className .= ' ' . $listColumns;


?>

<section id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?>" data-event-id="<?= esc_attr($eventList) ?>">
    <div class="validation-info">Validation Informaiton</div>
    <div class="op-block__inner active">

        <button class="list-button filter-button flex-wrap" onclick="printEventParticipanta(<?= esc_attr($eventList) ?>); return false">
            <span class="button-name">Print</span>
        </button>

    </div>
</section><!-- #<?= esc_attr($id) ?> -->