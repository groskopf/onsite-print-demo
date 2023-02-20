<?php
/* ------------------------------------------------------------------------

 *  The OnsitePrint (Dashboard) Block.
 *  Displaying a Dashboard of Events and Templates, if the User is logged in.
 *
 *  @link https://www.advancedcustomfields.com/resources/
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 ?  Updated: 2023-01-29 - 22:00 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  The Block Data
--------------------------------------------------------------------------- */

$ec = 'dashboard_';

$acf = array(
    'style_color'           => get_field( $tc . 'color' ) ?: 'primary-60',

    'header_title'          => get_field( $ec . 'header_title' ) ?: 'Dashboard',
    'header_description'    => get_field( $ec . 'header_description' ) ?: 'You can see below your Events and Templates.',

    'tap_1_id'              => get_field( $ec . 'tap_1_id' ) ?: 'events',
    'tap_1_button'          => get_field( $ec . 'tap_1_button' ) ?: 'Events',
    'tap_1_title'           => get_field( $ec . 'tap_1_title' ) ?: 'Created Events',
    'tap_1_color'           => get_field( $ec . 'tap_1_color' ) ?: 'accent-60',
    'tap_1_link'            => get_field_object( $ec . 'event_relocate_main' )['value']['url'] ?: 'https://onsiteprint.dk/event/',
    'tap_1_link_title'      => get_field_object( $ec . 'event_relocate_main' )['value']['title'] ?: 'Show Event',
    
    'tap_2_id'              => get_field( $ec . 'tap_2_id' ) ?: 'templates',
    'tap_2_button'          => get_field( $ec . 'tap_2_button' ) ?: 'Templates',
    'tap_2_title'           => get_field( $ec . 'tap_2_title' ) ?: 'Created Templates',
    'tap_2_color'           => get_field( $ec . 'tap_2_color' ) ?: 'secondary-60',
    'tap_2_link'            => get_field_object( $ec . 'template_relocate_main' )['value']['url'] ?: 'https://onsiteprint.dk/opret-event/',
    'tap_2_link_title'      => get_field_object( $ec . 'template_relocate_main' )['value']['title'] ?: 'Choose Template',
   
    'event_link'            => get_field_object( $ec . 'event_relocate_main' )['value']['url'] ?: 'https://onsiteprint.dk/opret-event/',
    'event_link_title'      => get_field_object( $ec . 'event_relocate_main' )['value']['title'] ?: 'Create Event',
    'template_link'         => get_field_object( $ec . 'template_relocate_event' )['value']['url'] ?: 'https://onsiteprint.dk/opret-skabelon/',
    'template_link_title'   => get_field_object( $ec . 'template_relocate_event' )['value']['title'] ?: 'Create Template'
);

$styleColor = substr( $acf['style_color'], 0, strpos( $acf['style_color'], '-' ) );

$id = 'op-' . $block['id'];

if( ! empty( $block['anchor'] ) ) {
	$id = $block['anchor'];
}

$className = 'op-dashboard op-flex-col alignfull';

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

        <header class="op-block__header op-flex-col">
            <h2 class="op-block-title"><?= esc_attr( $acf['header_title'] ) ?></h2>
            <p class="op-block-description"><?= esc_attr( $acf['header_description'] ) ?></p>
        </header>

        <div class="op-block__content op-flex-col" data-tap-active="1">

            <div class="op-block__buttons">

                <?php $dashboard_taps = glob( __DIR__ . '/block-template-parts/block-taps/taps/*' );

                for ( $i=0; $i < count($dashboard_taps); $i++ ) { 
                    
                    $num = $i + 1; ?>

                    <a href="#<?= esc_attr( $acf['tap_' . $num . '_id'] ) ?>" class="op-button op-button-size-medium op-button-style-outline" data-color="<?= esc_attr( $acf['style_color'] ) ?>">
                        <span class="op-button-title"><?= esc_attr( $acf['tap_' . $num . '_button'] ) ?></span>
                    </a>

                <?php } ?>

            </div>
            
            <div class="op-block__taps op-flex-col">

                <?php foreach ( $dashboard_taps as $tap ) {
                    require( $tap );
                } ?>                   

            </div>

        </div>

    </div><!-- .op-block__inner -->
</section><!-- #<?= esc_attr($id) ?> -->