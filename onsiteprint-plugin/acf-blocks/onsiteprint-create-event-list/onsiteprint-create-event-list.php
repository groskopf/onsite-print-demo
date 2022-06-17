<?php
/**
 * [Block] Create Event List.
 *
 * [Front-end] Create new Event List from CSV-file.
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

$className = 'op-create-event-list' . $listPageType . ' active';

if ( ! empty( $block['className'] ) ) {
    $className .= ' ' . $block['className'];
}

if ( ! empty( $block['align'] ) ) {
    $className .= ' align' . $block['align'];
}

$className .= ' ' . $listColumns;

?>

<section id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?>" onload="checkLoginNew()">
    <div class="login-validation">Login Validation</div>
    <div class="op-block__inner active">

        <div id="<?= esc_attr($id) ?>-event-list-info" class="op-block__wrapper post">
            <div class="content">
                <div class="form-container">
                    <form class="event-list-info-form">
                        <div class="input-outer flex-wrap">
                            <label for="<?= esc_attr($id) ?>-event-name-input">Event Name</label>
                            <input id="<?= esc_attr($id) ?>-event-name-input" name="event-name" type="text" required>
                        </div>
                    </form>
                </div>
            </div>
        </div><!-- #<?= esc_attr($id) ?>-event-list-info -->
        
        <div class="content">
            <div class="form-container">
                <form class="event-list-info">
                    <div class="input-outer flex-wrap">
                        <label for="<?= esc_attr($id) ?>-event-name-input">Event Name</label>
                        <input id="<?= esc_attr($id) ?>-event-name-input" name="event-name" type="text" required>
                    </div>
                </form>
                <form class="upload-csv-to-grid" onchange="createNewEventList(); return false">
                    <input id="<?= esc_attr($id) ?>-csv-file-input" name="csv-file" type="file" accept=".csv" required>
                </form>
            </div>
            <div class="responses">
                <h4>Responses:</h4>
                <div class="inner"></div>
            </div>
        </div>

    </div>
</section><!-- #<?= esc_attr($id) ?> -->