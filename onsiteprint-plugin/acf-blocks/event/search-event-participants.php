<?php
/**
 * [Block] Search Event Participants.
 *
 * [Front-end] Search for Event Participants.
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

$className = 'op-search-event-participants' . $listPageType . ' active';

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

        <div id="<?= esc_attr($id) ?>-search-event-participants-info" class="op-block__wrapper">
            <div class="form-container">
                <form class="search-form flex-wrap" action="POST" onsubmit="return false">
                    <fieldset id="<?= esc_attr($id) ?>-event-search-filter" class="input-outer flex-wrap">
                        <button class="list-button filter-button flex-wrap" onclick="searchFilterToggle(false); return false">
                            <span class="button-name">Filter</span>
                            <span class="filter-option"></span>
                        </button>
                        <div class="filter-radio-options input-outer"></div>
                    </fieldset>
                    <label for="<?= esc_attr($id) ?>-event-search-input" class="input-outer flex-wrap">
                        <input id="<?= esc_attr($id) ?>-event-search-input" name="search-input" type="search" oninput="searchEventParticipants()">
                    </label>
                </form>
            </div>
        </div>

    </div>
</section><!-- #<?= esc_attr($id) ?> -->