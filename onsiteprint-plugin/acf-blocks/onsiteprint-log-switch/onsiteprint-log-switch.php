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


$id = 'OP-log-switch-' . $block['id'];

if( ! empty( $block['anchor'] ) ) {
	$id = $block['anchor'];
}

$className = 'OP-block main active' . $listPageType;

if ( ! empty( $block['className'] ) ) {
    $className .= ' ' . $block['className'];
}

if ( ! empty( $block['align'] ) ) {
    $className .= ' align' . $block['align'];
}

$className .= ' ' . $listColumns;

?>

<section id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?>">
    <div class="inner-container">

        <div id="login-info" class="wrapper active" data-loged-in="false">
            <div class="content"></div>
        </div><!-- #login-info -->

        <div id="login-with-booking-code" class="wrapper get active">
            <div class="content">
                <div class="form-container">
                    <form name="login-with-booking-code" action="POST">
                        <div class="input-outer">
                            <label for="LWBC-booking-code-input">Booking Code</label>
                            <input id="LWBC-booking-code-input" name="booking-code" type="text" required>
                        </div>
                        <button class="list-button" type="submit" onclick="loginWithBookingCode(); return false">Log in</button>
                    </form>
                </div>
            </div>
        </div><!-- #login-with-booking-code | #LWBC -->
        
        <div id="logout" class="wrapper delete">
            <div class="content">
                <div class="form-container">
                    <button class="list-button" onclick="localStorage.removeItem('login'); location.reload()">Log out</button>
                </div>
            </div>
        </div><!-- #logout -->
        
    </div><!-- .inner-container -->
</section><!-- #<?= esc_attr($id) ?> -->