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
 ?  Updated: 2023-02-06 - 21:02 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  The Block Data
--------------------------------------------------------------------------- */

$tc = 'site_login_';

$acf = array(
    'style_color'           => get_field( $tc . 'color' ),

    'header_title'          => get_field( $tc . 'header_title' ) ?: 'Login with Booking Code',
    'header_description'    => get_field( $tc . 'header_description' ) ?: 'Login to our web service and easily complete your event.',
    
    'field_1_title'         => get_field( $tc . 'field_1_title' ) ?: 'Booking Code',
    'field_1_val'           => get_field( $tc . 'field_1_validation' ) ?: 'The input field is empty!',
    
    'field_2_title'         => get_field( $tc . 'field_2_title' ) ?: 'Local Storage Approval',
    'field_2_description'   => get_field( $tc . 'field_2_description' ) ?: 'Onsite Prints\' web service adds data to your browser\'s Local Storage. Read more about our cookie policy ',
    'field_2_link'          => get_field_object( $tc . 'field_2_main' )['value']['url'] ?: 'https://onsiteprint.dk/',
    'field_2_link_title'    => get_field_object( $tc . 'field_2_main' )['value']['title'] ?: 'here!',
    'field_2_value'         => get_field( $tc . 'field_2_value' ) ?: 'I accept the Local Storage data.',
    'field_2_val'           => get_field( $tc . 'field_2_validation' ) ?: 'The checkbox must be checked!',

    'main_link'             => get_field_object( $tc . 'relocate_main' )['value']['url'] ?: 'https://onsiteprint.dk/',
    'main_title'            => get_field_object( $tc . 'relocate_main' )['value']['title'] ?: 'Login',
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

/* ------------------------------------------------------------------------
 #  The Block Content
--------------------------------------------------------------------------- */
?>


<section id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?>" data-form-color="<?= esc_attr( $styleColor ) ?>">
    <div class="op-block__inner op-flex-col">

        <header class="op-fields-header">
            <h3 class="op-fields-title"><?= esc_attr( $acf['header_title'] ) ?></h3>
            <p class="op-fields-description"><?= esc_attr( $acf['header_description'] ) ?></p>
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
                
                <button type="button" onclick="opLogin( '<?= esc_attr( $acf['main_link'] ) ?>' ); return false" class="op-button-save op-button op-button-size-medium op-button-style-solid" data-color="<?= esc_attr( $styleColor ) ?>-60" data-icon="lock" data-icon-position="left" disabled>
                    <span class="op-icon" role="img" aria-label="Lock Icon"></span>
                    <span class="op-button-title"><?= esc_attr( $acf['main_title'] ) ?></span>
                </button>

            </div><!-- .op-form__inner -->
        </form><!-- .op-form-steps -->
        
    </div><!-- .op-block__inner -->
</section><!-- #<?= esc_attr($id) ?> -->