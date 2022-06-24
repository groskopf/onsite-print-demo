<?php
/**
 * [Block] Get Booking.
 *
 * [Front-end] Displaying Booking infomation from FastAPI.
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

$className = 'op-get-booking' . $listPageType;

if ( ! empty( $block['className'] ) ) {
    $className .= ' ' . $block['className'];
}

if ( ! empty( $block['align'] ) ) {
    $className .= ' align' . $block['align'];
}

$className .= ' ' . $listColumns;

?>

<section id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?>">
    <div class="validation-info">Login Validation</div>
    <div class="op-block__inner active">

        <div id="<?= esc_attr($id) ?>-get-booking" class="op-block__wrapper get">

            <header onclick="openContent()">               
                <h3><span>Get</span>Get Booking with Booking Code</h3>
                <div class="arrow"></div>
            </header>

            <div class="content">
                <div class="form-container">
                    <form class="get-booking-form" action="POST">
                        <div class="input-outer">
                            <label for="<?= esc_attr($id) ?>-booking-code-input">Booking Code</label>
                            <div id="<?= esc_attr($id) ?>-booking-code-input-validation" class="validation-error"></div>
                            <input id="<?= esc_attr($id) ?>-booking-code-input" name="booking-code" type="text" required>
                        </div>
                        <button class="list-button" type="submit" onclick="showBooking(); return false">Get Booking</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>

        </div><!-- #<?= esc_attr($id) ?>-get-booking -->

    </div>
</section><!-- #<?= esc_attr($id) ?> -->