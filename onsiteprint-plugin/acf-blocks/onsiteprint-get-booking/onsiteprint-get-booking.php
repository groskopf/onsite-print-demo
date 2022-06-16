<?php
/**
 * The OnsitePrint (Get Booking Block).
 *
 * Displaying Booking infomation from FastAPI.
 *
 * @link https://www.advancedcustomfields.com/resources/
 *
 * @package WordPress
 * @subpackage OnsitePrint Plugin
 * @since OnsitePrint Plugin 1.0
 */

//$pageListOptions = get_field('page_list_options');

$id = 'OP-get-booking-' . $block['id'];

if( ! empty( $block['anchor'] ) ) {
	$id = $block['anchor'];
}

$className = 'OP-block wrapper get' . $listPageType;

if ( ! empty( $block['className'] ) ) {
    $className .= ' ' . $block['className'];
}

if ( ! empty( $block['align'] ) ) {
    $className .= ' align' . $block['align'];
}

$className .= ' ' . $listColumns;

?>

<div id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?>">

    <header onclick="openContent()">               
        <h3><span>Get</span>Get Booking with Booking Code</h3>
        <div class="arrow"></div>
    </header>

    <div class="content">
        <div class="form-container">
            <form class="get-booking-with-booking-code" action="POST">
                <div class="input-outer">
                    <label for="GBWBC-booking-code-input">Booking Code</label>
                    <div id="booking-code-validation" class="validation-error"></div>
                    <input id="GBWBC-booking-code-input" name="booking-code" type="text" required>
                </div>
                <button class="list-button" type="submit" onclick="getBookingWithBookingCode(); return false">Get Booking</button>
            </form>
        </div>
        <div class="responses">
            <h4>Responses:</h4>
            <div class="inner"></div>
        </div>
    </div>

</div><!-- #<?= esc_attr($id) ?> | #GBWBC -->