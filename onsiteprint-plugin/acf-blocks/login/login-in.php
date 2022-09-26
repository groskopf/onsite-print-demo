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








<article id="op-item-62bbf60f448d5" class="op-event-item" data-op-arrival="1" data-op-prints="1">
        <header class="participant-content">
            <div>
                <span class="icon"></span>
            </div>
            <div class="time">
                <p class="arrival-time">8:50</p>
            </div>
            <div class="list-info">
                <p class="line-1">Prince</p>
                <p class="line-2">Sekretær</p>
                <p class="line-3">VVS'eren ApS</p>
                <p class="line-4">3</p>
                <p class="line-5"></p>
            </div>
            <div class="print">
                <button class="print-button op-button op-button-solid" onclick="printParticipant('62bbf60f448d5'); return false">Print</button>
                <p class="amount-of-print">2</p>
            </div>
        </header>
        <footer>
            <p class="message"></p>
            <p class="arrival-time">8:50</p>
        </footer>
    </article>

            <article id="op-item-${ participantId }" class="op-event-item" data-op-arrival="${ participantActive }" data-op-prints="${ participantPrints }">
                <header class="participant-content">
                    <div>
                        <span class="icon"></span>
                    </div>
                    <div class="time">
                        <p class="arrival-time">${ participantTime }</p>
                    </div>
                    <div class="list-info">
                        <p class="line-1">${ participantline1 }</p>
                        <p class="line-2">${ participantline2 }</p>
                        <p class="line-3">${ participantline3 }</p>
                        <p class="line-4">${ participantline4 }</p>
                        <p class="line-5">${ participantline5 }</p>
                    </div>
                    <div class="print">
                        <button class="print-button op-button op-button-solid" onclick="printParticipant('${ participantId }'); return false">Print</button>
                        <figcaption class="amount-of-print">${ participantPrints }</figcaption>
                    </div>
                </header>
                <footer>
                    <p class="message"></p>
                    <p class="arrival-time">${ participantTime }</p>
                </footer>
            </article>