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

$className = 'op-show-list-of-event-urls' . $listPageType . ' active';

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

        <div id="<?= esc_attr($id) ?>-show-list-of-event-urls-info" class="op-block__wrapper"></div>

    </div>
</section><!-- #<?= esc_attr($id) ?> -->