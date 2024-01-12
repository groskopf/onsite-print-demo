<?php
/* ------------------------------------------------------------------------

 *  The OnsitePrint (Printer Information) Block.
 *  Displaying Printer Information, if the User is logged in.
 *
 *  @link https://www.advancedcustomfields.com/resources/
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 ?  Updated: (Y:m:d - H:i) 2022-09-23 - 13:52

---------------------------------------------------------------------------
 #  The Block Data
--------------------------------------------------------------------------- */

$printerID = 'Loading...';

global $op_login_session;
if ( $op_login_session ) {

    //// Get variables from authorization.php ($serverURL, $serverToken).
    require( __DIR__ . '/../private/encryption.php' );
    
    //// Use openssl_decrypt() function to decrypt the data.
    $decryption = openssl_decrypt( $_COOKIE['OP_PLUGIN_DATA_USER'], $method, $keyToken, $options, $_COOKIE['OP_PLUGIN_DATA_SESSION'] );
    
    $booking = json_decode( $decryption );

    $printerID = $booking->printerID;

}

$printerIdLabel = get_field('printer_id_label');

$id = 'op-' . $block['id'];

if( ! empty( $block['anchor'] ) ) {
	$id = $block['anchor'];
}

$className = 'op-printer-information';

if ( ! empty( $block['className'] ) ) {
    $className .= ' ' . $block['className'];
}

if ( ! empty( $block['align'] ) ) {
    $className .= ' align' . $block['align'];
}

if( ! $printerIdLabel ) {
	$printerIdLabel = 'Printer Id';
}


/* ------------------------------------------------------------------------
 #  The Block Content
--------------------------------------------------------------------------- */
?>

<section id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?>">
    <div class="block__inner">

        <p class="printer-id flex-col">
            <span class="label"><?= esc_attr($printerIdLabel) ?></span>
            <span class="text"><?= esc_attr($printerID) ?></span>
        </p>

    </div><!-- .block__inner -->
</section><!-- #<?= esc_attr($id) ?> -->