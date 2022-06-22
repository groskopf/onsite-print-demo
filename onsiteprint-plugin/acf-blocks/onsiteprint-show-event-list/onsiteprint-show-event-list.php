<?php
/**
 * [Block] Show Event List.
 *
 * [Front-end] Shows a Single Event List.
 *
 * @link https://www.advancedcustomfields.com/resources/
 *
 * @package WordPress
 * @subpackage OnsitePrint Plugin
 * @since OnsitePrint Plugin 1.0
 */

//$pageListOptions = get_field('page_list_options');

$id = 'op-' . $block['id'];

$eventList = ( ! empty( $_GET['event-list'] ) ) ? $_GET['event-list'] : false;


if ( ! empty( $block['anchor'] ) ) {
	$id = $block['anchor'];
}

$className = 'op-show-event-list-single' . $listPageType . ' active';

if ( ! empty( $block['className'] ) ) {
    $className .= ' ' . $block['className'];
}

if ( ! empty( $block['align'] ) ) {
    $className .= ' align' . $block['align'];
}

$className .= ' ' . $listColumns;


?>

<section id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?>" data-event-list="<?= esc_attr($eventList) ?>">
    <div class="validation-info">Validation Informaiton</div>
    <div class="op-block__inner active">

        <div id="<?= esc_attr($id) ?>-event-list-info" class="op-block__wrapper get active">

            <header onclick="openContent()">               
                <h3><span>Get</span>Show Single Event List</h3>
                <div class="arrow"></div>
            </header>

            <div class="content">
                <div class="inner">
                    
                </div>
            </div>

        </div><!-- #<?= esc_attr($id) ?>-event-list-info -->

    </div>
</section><!-- #<?= esc_attr($id) ?> -->