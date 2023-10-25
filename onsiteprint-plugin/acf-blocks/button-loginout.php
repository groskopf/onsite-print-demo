<?php
/* ------------------------------------------------------------------------

 *  The OnsitePrint (Log In/Out Button) Block.
 *  Displaying a Button to Log In/Out of the website.
 *
 *  @link https://www.advancedcustomfields.com/resources/
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 ?  Updated: 2022-09-26 - 09:35 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  The Block Data
--------------------------------------------------------------------------- */

$logInRelocate = get_field('button_login_relocate');
$logOutRelocate = get_field('button_logout_relocate');
$logInText = get_field('button_login_text');
$logOutText = get_field('button_logout_text');

$id = 'op-' . $block['id'];

if( ! empty( $block['anchor'] ) ) {
	$id = $block['anchor'];
}

$className = 'op-button-loginout';

if ( ! empty( $block['className'] ) ) {
    $className .= ' ' . $block['className'];
}

if ( ! empty( $block['align'] ) ) {
    $className .= ' align' . $block['align'];
}

if( ! $logInText ) {
	$logInText = 'Log In';
}

if( ! $logOutText ) {
	$logOutText = 'Log Out';
}

/* ------------------------------------------------------------------------
 #  The Block Content
--------------------------------------------------------------------------- */
?>

<section id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?>">
    <div class="block__inner">

        <button class="button-login" onclick="opButtonLoginout( '<?= esc_attr($logInRelocate) ?>', 'login' )">
            <i class="button-icon fa-solid fa-lock"></i>
            <span class="button-text"><?= esc_attr($logInText) ?></span>
        </button>
        <button class="button-logout" onclick="opButtonLoginout( '<?= esc_attr($logOutRelocate) ?>' )">
            <i class="button-icon fa-solid fa-unlock"></i>
            <span class="button-text"><?= esc_attr($logOutText) ?></span>
        </button>

    </div><!-- .block__inner -->
</section><!-- #<?= esc_attr($id) ?> -->