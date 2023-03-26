<?php
/* ------------------------------------------------------------------------

 *  The OnsitePrint (Site Login) Block.
 *  Displaying a Site Login Form.
 *
 *  @link https://www.advancedcustomfields.com/resources/
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 ?  Updated: 2023-03-26 - 20:27 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  The Block Data
--------------------------------------------------------------------------- */

$path = 'site_login_';

$options = array(
    'style_color'       => get_field( $path . 'color' ) ?: 'primary-60',
);

if ( ! isset( json_decode( $_SESSION['OP_PLUGIN_DATA_BOOKING'], true )['bookingId'] ) ) {
    $header = array(
        'title'         => get_field( $path . 'login_title' ) ?: 'Login with Booking Code',
        'description'   => get_field( $path . 'login_description' ) ?: 'Login to our web service and easily complete your event.',    
    );
} else {
    $header = array(
        'title'         => get_field( $path . 'logout_title' ) ?: 'You are already Logged in!',
        'description'   => get_field( $path . 'logout_description' ) ?: 'Go to the Dashboard or Log out below.',    
    );
}

$login = array(
    'login_link'        => ( get_field_object( $path . 'login_relocate_main' )['value'] !== '' ) ? get_field_object( $path . 'login_relocate_main' )['value'] : array(
        'title'         => 'Login',
        'url'           => 'https://onsiteprint.dk/',
        'target'        => ''
    ),
);

$logout = array(
    'logout_link'       => ( get_field_object( $path . 'logout_relocate_main' )['value'] !== '' ) ? get_field_object( $path . 'logout_relocate_main' )['value'] : array(
        'title'         => 'Logout',
        'url'           => 'https://onsiteprint.dk/',
        'target'        => ''
    ),
    'dashboard_link'    => ( get_field_object( $path . 'logout_relocate_sub' )['value'] !== '' ) ? get_field_object( $path . 'logout_relocate_sub' )['value'] : array(
        'title'         => 'Dashboard',
        'url'           => 'https://onsiteprint.dk/',
        'target'        => ''
    ),
);

$form = array(
    'field_1'           => array(
        'title'         => get_field( $path . 'form_field_1_title' ) ?: 'Booking Code',
        'validation'    => get_field( $path . 'form_field_1_validation' ) ?: 'The Booking was not Found!',
    ),
    'field_2'           => array(
        'title'         => get_field( $path . 'form_field_2_title' ) ?: 'Local Storage Approval',
        'description'   => get_field( $path . 'form_field_2_description' ) ?: 'Onsite Prints\' web service adds data to your browser\'s Local Storage. Read more about our cookie policy ',
        'link'          => ( get_field_object( $path . 'form_field_2_link_main' )['value'] !== '' ) ? get_field_object( $path . 'form_field_2_link_main' )['value'] : array(
            'title'     => 'here!',
            'url'       => 'https://onsiteprint.dk/',
            'target'    => ''
        ),
        'value'         => get_field( $path . 'form_field_2_value' ) ?: 'I accept the Local Storage data.',
        'validation'    => get_field( $path . 'form_field_2_validation' ) ?: 'The checkbox must be checked!',
    ),

);

$styleColor = substr( $options['style_color'], 0, strpos( $options['style_color'], '-' ) );

$id = 'op-' . $block['id'];

if( ! empty( $block['anchor'] ) ) {
	$id = $block['anchor'];
}

$className = 'op-site-login op-form op-flex-col';

if ( ! empty( $block['className'] ) ) {
    $className .= ' ' . $block['className'];
}

if ( ! empty( $block['align'] ) ) {
    $className .= ' align' . $block['align'];
}

///// Start Session.
session_start();

/* ------------------------------------------------------------------------
 #  The Block Content
--------------------------------------------------------------------------- */
?>

<section id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?>" data-form-color="<?= esc_attr( $styleColor ) ?>">

    <?php ///// Validate if the user is logged in with a Booking Code or a Wordpress login.
        if ( ! isset( json_decode( $_SESSION['OP_PLUGIN_DATA_BOOKING'], true )['bookingId'] ) || ( current_user_can( 'edit_posts' ) && is_admin() ) ) { ?>

        <div class="op-block__inner op-flex-col op-login">

            <header class="op-fields-header">
                <h3 class="op-fields-title"><?= esc_attr( $header['title'] ) ?></h3>
                <p class="op-fields-description"><?= esc_attr( $header['description'] ) ?></p>
            </header>

            <form id="<?= esc_attr($id) ?>__form" class="op-form-fields op-flex-col" action="POST">

                <button type="submit" disabled style="display: none" aria-hidden="true"></button>

                <div class="op-form__inner op-flex-col">

                    <div class="op-form-content op-flex-col">

                        <?php $form_steps = glob( __DIR__ . '/block-template-parts/block-form/steps/*' );
                        
                        foreach ( $form_steps as $step ) {
                            require( $step );
                        } ?>                   

                    </div>
                    
                    <button type="button" onclick="opBookingFormValidation( false, '<?= esc_attr( $login['login_link']['url'] ) ?>' )" class="op-button-save op-button op-button-size-medium op-button-style-solid" data-color="<?= esc_attr( $styleColor ) ?>-60" data-icon="lock" data-icon-position="left" disabled>
                        <span class="op-icon" role="img" aria-label="Lock Icon"></span>
                        <span class="op-button-title"><?= esc_attr( $login['login_link']['title'] ) ?></span>
                    </button>

                </div><!-- .op-form__inner -->
            </form><!-- .op-form-fields -->
            
        </div><!-- .op-login -->

    <?php } if ( isset( json_decode( $_SESSION['OP_PLUGIN_DATA_BOOKING'], true )['bookingId'] ) || ( current_user_can( 'edit_posts' ) && is_admin() ) ) { ?>

        <div class="op-block__inner op-flex-col op-logout">

            <header class="op-fields-header">
                <h3 class="op-fields-title"><?= esc_attr( $header['title'] ) ?></h3>
                <p class="op-fields-description"><?= esc_attr( $header['description'] ) ?></p>
            </header>

            <div class="op-form-fields op-flex-col">
        
                <a class="op-button op-button-size-medium op-button-style-solid" href="<?= esc_attr( $logout['dashboard_link']['url'] ) ?>" target="<?= esc_attr( $logout['dashboard_link']['target'] ) ?>" data-color="<?= esc_attr( $styleColor ) ?>-60" data-icon="arrow-left" data-icon-position="left">
                    <span class="op-icon" role="img" aria-label="arrow-left Icon"></span>
                    <span class="op-button-title"><?= esc_attr( $logout['dashboard_link']['title'] ) ?></span>
                </a>

                <button type="button" onclick="opLogoutButton( false, '<?= esc_attr( $logout['logout_link']['url'] ) ?>' )" class="op-button-save op-button op-button-size-medium op-button-style-outline" data-color="<?= esc_attr( $styleColor ) ?>-60" data-icon="unlock" data-icon-position="left">
                    <span class="op-icon" role="img" aria-label="Unlock Icon"></span>
                    <span class="op-button-title"><?= esc_attr( $logout['logout_link']['title'] ) ?></span>
                </button>

            </div><!-- .op-form-fields -->
            
        </div><!-- .op-logout -->

    <?php } ?>

</section><!-- #<?= esc_attr($id) ?> -->