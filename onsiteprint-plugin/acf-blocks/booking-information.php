<?php
/* ------------------------------------------------------------------------

 *  The OnsitePrint (Booking Information) Block.
 *  Displaying Booking Information, if the User is logged in.
 *
 *  @link https://www.advancedcustomfields.com/resources/
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 ?  Updated: (Y:m:d - H:i) 2022-09-22 - 13:52

---------------------------------------------------------------------------
 #  The Block Data
--------------------------------------------------------------------------- */

$bookingCodeLabel = get_field('booking_code_label');
$bookingStartDateLabel = get_field('booking_start_date_label');
$bookingEndDateLabel = get_field('booking_end_date_label');

$id = 'op-' . $block['id'];

if( ! empty( $block['anchor'] ) ) {
	$id = $block['anchor'];
}

$className = 'op-booking-information';

if ( ! empty( $block['className'] ) ) {
    $className .= ' ' . $block['className'];
}

if ( ! empty( $block['align'] ) ) {
    $className .= ' align' . $block['align'];
}

if( ! $bookingCodeLabel ) {
	$bookingCodeLabel = 'Booking Code';
}

if( ! $bookingStartDateLabel ) {
	$bookingStartDateLabel = 'Start Date';
}

if( ! $bookingEndDateLabel ) {
	$bookingEndDateLabel = 'End Date';
}

/* ------------------------------------------------------------------------
 #  The Block Content
--------------------------------------------------------------------------- */
?>

<section id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?>">
    <div class="block__inner">

        <p class="booking-code has-text-align-center flex-col">
            <span class="label"><?= esc_attr($bookingCodeLabel) ?></span>
            <span class="text">Loading...</span>
        </p>

        <div class="booking-date">
            <p class="booking-start-date has-text-align-right flex-col">
                <span class="label"><?= esc_attr($bookingStartDateLabel) ?></span>
                <span class="text">Loading...</span>
            </p>
            <div class="divider"></div>
            <p class="booking-end-date flex-col">
                <span class="label"><?= esc_attr($bookingEndDateLabel) ?></span>
                <span class="text">Loading...</span>
            </p>
        </div>

    </div><!-- .block__inner -->
</section><!-- #<?= esc_attr($id) ?> -->