<?php
/* ------------------------------------------------------------------------

 *  The OnsitePrint (Site Login/Logout Button) Block.
 *  Displaying a Button to Login/Logout of the website.
 *
 *  @link https://www.advancedcustomfields.com/resources/
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 ?  Updated: 2023-11-11 - 20:30 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  Redirect if User is not Logged In
--------------------------------------------------------------------------- */

require( __DIR__.'/../../private/session.php' );

/* ------------------------------------------------------------------------
 #  The Block Data
--------------------------------------------------------------------------- */

$tc = 'site_loginout_button_';

///// #NG(2023/02/19) - Missing Fields in WP.
$acf = array(
    'style_color'               => get_field( $tc . 'color' ) ?: 'primary-90',

    'login_link_url'           => get_field_object( $tc . 'login_relocate' )['value']['url'] ?: 'https://onsiteprint.dk/',
    'login_link_title'          => get_field_object( $tc . 'login_relocate' )['value']['title'] ?: 'Log ind',//'Login',

    'logout_link_url'          => get_field_object( $tc . 'logout_relocate' )['value']['url'] ?: 'https://onsiteprint.dk/',
    'logout_link_title'         => get_field_object( $tc . 'logout_relocate' )['value']['title'] ?: 'Log ud',//'Logout',
);

$id = 'op-' . $block['id'];

if( ! empty( $block['anchor'] ) ) {
	$id = $block['anchor'];
}

$className = 'op-site-loginout-button op-form op-flex-col';

if ( ! empty( $block['className'] ) ) {
    $className .= ' ' . $block['className'];
}

if ( ! empty( $block['align'] ) ) {
    $className .= ' align' . $block['align'];
}

/* ------------------------------------------------------------------------
 #  The Block Content
--------------------------------------------------------------------------- */

///// Validate if the user is logged in with a Booking Code or a Wordpress login.
if ( $OP_LOGIN === false || ( current_user_can( 'edit_posts' ) && is_admin() ) ) { ?>

    <a id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?> op-button-login op-button op-button-size-medium op-button-style-solid" href="<?= esc_attr( $acf['login_link_url'] ) ?>" data-color="<?= esc_attr( $acf['style_color'] ) ?>" data-icon="lock" data-icon-position="left" data-title-visibility="1">
        <span class="op-icon" role="img" aria-label="Lock Icon"></span>
        <span class="op-button-title"><?= esc_attr( $acf['login_link_title'] ) ?></span>
    </a>

<?php } if ( $OP_LOGIN === true || ( current_user_can( 'edit_posts' ) && is_admin() ) ) { ?>

    <button type="button" onclick="opLogoutButton( false, '<?= esc_attr( $acf['logout_link_url'] ) ?>' )"  id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?> op-button-logout op-button op-button-size-medium op-button-style-solid" data-color="<?= esc_attr( $acf['style_color'] ) ?>" data-icon="unlock" data-icon-position="left" data-title-visibility="1">
        <span class="op-icon" role="img" aria-label="Unlock Icon"></span>
        <span class="op-button-title"><?= esc_attr( $acf['logout_link_title'] ) ?></span>
    </button><!-- #<?= esc_attr($id) ?> -->

<?php } ?>