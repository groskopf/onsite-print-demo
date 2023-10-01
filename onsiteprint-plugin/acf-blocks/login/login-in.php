<?php
/**
 * The OnsitePrint (Log in Block).
 *
 * Displaying Log in.
 *
 * @link https://www.advancedcustomfields.com/resources/
 *
 * @package WordPress
 * @subpackage OnsitePrint Plugin
 * @since OnsitePrint Plugin 1.0
 */

$relocate = get_field('relocate');

$id = 'op-' . $block['id'];

if( ! empty( $block['anchor'] ) ) {
	$id = $block['anchor'];
}

$className = 'op-log-in' . $listPageType;

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

        <div id="<?= esc_attr($id) ?>-login" class="op-block__wrapper put active">
            <div class="content">
                <div class="form-container">
                    <form class="login-form" action="POST">
                        <div class="input-outer">
                        <label for="<?= esc_attr($id) ?>-booking-code-input">Booking Code</label>
                            <div id="<?= esc_attr($id) ?>-booking-code-input-validation" class="validation-error"></div>
                            <input id="<?= esc_attr($id) ?>-booking-code-input" name="booking-code" type="text" required>
                        </div>
                        <button class="list-button" type="submit" onclick="loginWithBookingCode( '<?= $relocate ?>' ); return false">Log in</button>
                    </form>
                </div>
            </div>
        </div><!-- #<?= esc_attr($id) ?>-login -->
        
    </div><!-- .inner-container -->
</section><!-- #<?= esc_attr($id) ?> -->