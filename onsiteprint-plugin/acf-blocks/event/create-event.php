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

$className = 'op-create-event flex-col' . $listPageType . ' active';

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

        <div id="<?= esc_attr($id) ?>-event-info" class="op-block__wrapper">
            <div class="form-container">
                <form class="event-form flex-wrap" action="POST">
                    <div class="input-outer flex-wrap">
                        <label for="<?= esc_attr($id) ?>-event-name-input">Event Name</label>
                        <div id="<?= esc_attr($id) ?>-event-name-input-validation" class="validation-error"></div>
                        <input id="<?= esc_attr($id) ?>-event-name-input" name="event-name" type="text" required>
                    </div>
                    <fieldset id="<?= esc_attr($id) ?>-template-fieldset" class="input-outer flex-wrap">
                        <legend>Choose Template:</legend>
                        <div id="<?= esc_attr($id) ?>-template-input-validation" class="validation-error"></div>
                        <div class="template-buttons flex-wrap">
                            <button class="list-button" onclick="openEventTemplates(); return false">Choose saved Template</button>
                            <button class="list-button" onclick="window.location.replace('?template=1656329159061'); return false">Create new Template</button>
                        </div>
                        <div class="event-templates-radio-option input-outer flex-wrap flex-row-wrap"></div>
                        <div class="event-template-option input-outer flex-wrap">
                            <p class="no-input">Plase choose a Template!</p>
                            <p class="event-template-option-input"></p>
                        </div>
                    </fieldset>
                    <fieldset id="<?= esc_attr($id) ?>-csv-fieldset" class="input-outer flex-wrap">
                        <legend>CSV convert:</legend>
                        <div class="input-outer flex-wrap">
                            <label for="<?= esc_attr($id) ?>-csv-file-input">Select a CSV file</label>
                            <div id="<?= esc_attr($id) ?>-csv-file-input-validation" class="validation-error"></div>
                            <input id="<?= esc_attr($id) ?>-csv-file-input" name="csv-file" type="file" accept=".csv" required onchange="createGridFromCsv(); return false">
                        </div>
                        <div class="event-grid input-outer flex-wrap responses">
                            <div id="<?= esc_attr($id) ?>-event-grid" class="grid-content" style="height:50rem"></div>
                            <div class="buttons-wrapper">
                                <button class="button-save-csv list-button" onclick="saveAsCsv(); return false">Save as CSV</button>
                                <button class="list-button" type="submit" onclick="createNewEvent(); return false">Create new Event</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>

    </div>
</section><!-- #<?= esc_attr($id) ?> -->