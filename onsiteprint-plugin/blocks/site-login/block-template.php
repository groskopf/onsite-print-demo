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
 ?  Updated: 2023-02-19 - 14:18 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  The Block Data
--------------------------------------------------------------------------- */

$tc = 'site_login_';

$acf = array(
    'style_color'               => get_field( $tc . 'color' ) ?: 'primary-60',

    'login_header_title'        => get_field( $tc . 'login_title' ) ?: 'Login with Booking Code',
    'login_header_description'  => get_field( $tc . 'login_description' ) ?: 'Login to our web service and easily complete your event.',
    'login_main_link'           => get_field_object( $tc . 'login_relocate_main' )['value']['url'] ?: 'https://onsiteprint.dk/',
    'login_main_title'          => get_field_object( $tc . 'login_relocate_main' )['value']['title'] ?: 'Login',

    'logout_header_title'       => get_field( $tc . 'logout_title' ) ?: 'You are already Logged in!',
    'logout_header_description' => get_field( $tc . 'logout_description' ) ?: 'Go to the Dashboard or Log out below.',
    'logout_main_link'          => get_field_object( $tc . 'logout_relocate_main' )['value']['url'] ?: 'https://onsiteprint.dk/',
    'logout_main_title'         => get_field_object( $tc . 'logout_relocate_main' )['value']['title'] ?: 'Login',
    'logout_sub_link'           => get_field_object( $tc . 'logout_relocate_sub' )['value']['url'] ?: 'https://onsiteprint.dk/',
    'logout_sub_title'          => get_field_object( $tc . 'logout_relocate_sub' )['value']['title'] ?: 'Dashboard',
    
    'field_1_title'             => get_field( $tc . 'form_field_1_title' ) ?: 'Booking Code',
    'field_1_val'               => get_field( $tc . 'form_field_1_validation' ) ?: 'The Booking was not Found!',
    
    'field_2_title'             => get_field( $tc . 'form_field_2_title' ) ?: 'Local Storage Approval',
    'field_2_description'       => get_field( $tc . 'form_field_2_description' ) ?: 'Onsite Prints\' web service adds data to your browser\'s Local Storage. Read more about our cookie policy ',
    'field_2_link'              => get_field_object( $tc . 'form_field_2_link_main' )['value']['url'] ?: 'https://onsiteprint.dk/',
    'field_2_link_title'        => get_field_object( $tc . 'form_field_2_link_main' )['value']['title'] ?: 'here!',
    'field_2_value'             => get_field( $tc . 'form_field_2_value' ) ?: 'I accept the Local Storage data.',
    'field_2_val'               => get_field( $tc . 'form_field_2_validation' ) ?: 'The checkbox must be checked!',

);

$styleColor = substr( $acf['style_color'], 0, strpos( $acf['style_color'], '-' ) );

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

session_start();

/* ------------------------------------------------------------------------
 #  The Block Content
--------------------------------------------------------------------------- */
?>

<section id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?>" data-form-color="<?= esc_attr( $styleColor ) ?>">

    <?php ///// #NG(2023/02/19) - Ask TG about WP Editor mode and Function to validation
        if ( ! isset( json_decode( $_SESSION['OP_PLUGIN_DATA_BOOKING'], true )['bookingId'] ) ) { ?>

        <div class="op-block__inner op-flex-col op-login">

            <header class="op-fields-header">
                <h3 class="op-fields-title"><?= esc_attr( $acf['login_header_title'] ) ?></h3>
                <p class="op-fields-description"><?= esc_attr( $acf['login_header_description'] ) ?></p>
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
                    
                    <button type="button" onclick="opBookingFormValidation( false, '<?= esc_attr( $acf['login_main_link'] ) ?>' )" class="op-button-save op-button op-button-size-medium op-button-style-solid" data-color="<?= esc_attr( $styleColor ) ?>-60" data-icon="lock" data-icon-position="left" disabled>
                        <span class="op-icon" role="img" aria-label="Lock Icon"></span>
                        <span class="op-button-title"><?= esc_attr( $acf['login_main_title'] ) ?></span>
                    </button>

                </div><!-- .op-form__inner -->
            </form><!-- .op-form-steps -->
            
        </div><!-- .op-login -->

    <?php } else { ?>

        <div class="op-block__inner op-flex-col op-logout">

            <header class="op-fields-header">
                <h3 class="op-fields-title"><?= esc_attr( $acf['logout_header_title'] ) ?></h3>
                <p class="op-fields-description"><?= esc_attr( $acf['logout_header_description'] ) ?></p>
            </header>

            <div class="op-form-fields op-flex-col">
        
                <a class="op-button op-button-size-medium op-button-style-solid" href="<?= esc_attr( $acf['logout_sub_link'] ) ?>" data-color="<?= esc_attr( $styleColor ) ?>-60" data-icon="arrow-left" data-icon-position="left">
                    <span class="op-icon" role="img" aria-label="arrow-left Icon"></span>
                    <span class="op-button-title"><?= esc_attr( $acf['logout_sub_title'] ) ?></span>
                </a>

                <button type="button" onclick="opLogoutButton( false, '<?= esc_attr( $acf['logout_main_link'] ) ?>' )" class="op-button-save op-button op-button-size-medium op-button-style-outline" data-color="<?= esc_attr( $styleColor ) ?>-60" data-icon="unlock" data-icon-position="left">
                    <span class="op-icon" role="img" aria-label="Lock Icon"></span>
                    <span class="op-button-title"><?= esc_attr( $acf['logout_main_title'] ) ?></span>
                </button>

            </div><!-- .op-form-fields -->
            
        </div><!-- .op-logout -->

    <?php } ?>

</section><!-- #<?= esc_attr($id) ?> -->