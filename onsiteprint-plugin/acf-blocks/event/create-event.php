<?php
/**
 * [Block] Create new Event.
 *
 * [Front-end] Create new Event.
 *
 * @link https://www.advancedcustomfields.com/resources/
 *
 * @package WordPress
 * @subpackage OnsitePrint Plugin
 * @since OnsitePrint Plugin 1.0
 */

//$pageListOptions = get_field('page_list_options');

$id = 'op-' . $block['id'];

if( ! empty( $block['anchor'] ) ) {
	$id = $block['anchor'];
}

$className = 'op-create-event' . $listPageType . ' active';

if ( ! empty( $block['className'] ) ) {
    $className .= ' ' . $block['className'];
}

if ( ! empty( $block['align'] ) ) {
    $className .= ' align' . $block['align'];
}

$className .= ' ' . $listColumns;

?>

<section id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?>">
    <div class="validation-info">Validation Informaiton</div>
    <div class="op-block__inner active">

        <div id="<?= esc_attr($id) ?>-event-info" class="op-block__wrapper post">

            <header onclick="openContent()">               
                <h3><span>Post</span>Create new Event</h3>
                <div class="arrow"></div>
            </header>

            <div class="content">
                <div class="form-container">
                    <form class="event-form flex-wrap" action="POST">
                        <div class="input-outer flex-wrap">
                            <label for="<?= esc_attr($id) ?>-event-name-input">Event Name</label>
                            <div id="<?= esc_attr($id) ?>-event-name-input-validation" class="validation-error"></div>
                            <input id="<?= esc_attr($id) ?>-event-name-input" name="event-name" type="text" required>
                        </div>
                        <div class="input-outer flex-wrap">
                            <div id="<?= esc_attr($id) ?>-csv-file-input-validation" class="validation-error"></div>
                            <input id="<?= esc_attr($id) ?>-csv-file-input" name="csv-file" type="file" accept=".csv" required onchange="createGridFromCsv(); return false">
                        </div>
                        <div class="event-grid input-outer flex-wrap responses">
                            <div id="<?= esc_attr($id) ?>-event-grid"></div>
                            <div class="buttons-wrapper">
                                <button class="button-save-csv list-button" onclick="saveAsCsv(); return false">Save as CSV</button>
                                <button class="list-button" type="submit" onclick="createNewEvent(); return false">Create new Event</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div><!-- #<?= esc_attr($id) ?>-event-info -->

    </div>
</section><!-- #<?= esc_attr($id) ?> -->