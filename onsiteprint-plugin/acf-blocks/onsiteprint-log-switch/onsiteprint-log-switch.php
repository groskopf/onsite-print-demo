<?php
/**
 * The OnsitePrint (Log in/out Block).
 *
 * Displaying Log in/out.
 *
 * @link https://www.advancedcustomfields.com/resources/
 *
 * @package WordPress
 * @subpackage OnsitePrint Plugin
 * @since OnsitePrint Plugin 1.0
 */


$id = 'op-' . $block['id'];

if( ! empty( $block['anchor'] ) ) {
	$id = $block['anchor'];
}

$className = 'op-log-switch' . $listPageType;

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
                    <form class="login-form">
                        <div class="input-outer">
                        <label for="<?= esc_attr($id) ?>-booking-code-input">Booking Code</label>
                            <div id="<?= esc_attr($id) ?>-booking-code-input-validation" class="validation-error"></div>
                            <input id="<?= esc_attr($id) ?>-booking-code-input" name="booking-code" type="text" required>
                        </div>
                        <button class="list-button" type="submit" onclick="loginWithBookingCode(); return false">Log in</button>
                    </form>
                </div>
            </div>
        </div><!-- #<?= esc_attr($id) ?>-login -->
        
        <div id="<?= esc_attr($id) ?>-logout" class="op-block__wrapper delete active">
            <div class="content">
                <div class="form-container">
                    <button class="list-button" onclick="localStorage.removeItem('OP_PLUGIN_DATA_BOOKING'); location.reload()">Log out</button>
                </div>
            </div>       
        </div><!-- #<?= esc_attr($id) ?>-logout -->
        
    </div><!-- .inner-container -->
</section><!-- #<?= esc_attr($id) ?> -->