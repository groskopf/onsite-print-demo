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
 ?  Updated: 2024-05-12 - 00:15 (Y:m:d - H:i)
 ?  Info: (CSS, PHP & JS) Added Modal Window i Dashboard block.

---------------------------------------------------------------------------
 #  Redirect if User is not Logged In
--------------------------------------------------------------------------- */

require_once( __DIR__.'/../../private/session.php' );

/* ------------------------------------------------------------------------
 #  The Block Data
--------------------------------------------------------------------------- */

$path = 'dashboard_';

$options = array(
    'style_color'       => get_field( $path . 'color' ) ?: 'primary-60',
);

$header = array(
    'title'             => get_field( $path . 'header_title' ) ?: 'Dashboard',
    'description'       => get_field( $path . 'header_description' ) ?: 'You can see below your Events and Templates.',
);

$modal = array(
    'title'             => get_field( $path . 'modal_title' ) ?: 'The Template cannot be deleted!',
    'description'       => get_field( $path . 'modal_description' ) ?: 'There are Events associated with this Template, delete them first and then delete the Template.',
    'cancel_button'     => get_field( $path . 'modal_cancel_button' ) ?: 'Cancel',
);

$taps = array(  
    array(  
        'id'            => get_field( $path . 'taps_tab1_id' ) ?: 'events',
        'name'          => get_field( $path . 'taps_tab1_name' ) ?: 'Events',
        'title'         => get_field( $path . 'taps_tab1_title' ) ?: 'Created Events',
        'color'         => get_field( $path . 'taps_tab1_color' ) ?: 'accent-60',
        'create_link'   => ( get_field_object( $path . 'taps_tab1_create_relocation' )['value'] !== '' ) ? get_field_object( $path . 'taps_tab1_create_relocation' )['value'] : array(
            'title'     => 'Create Event',
            'url'       => 'https://onsiteprint.dk/',
            'target'    => ''
        ),
        'event_link'    => ( get_field_object( $path . 'taps_tab1_event_relocation' )['value'] !== '' ) ? get_field_object( $path . 'taps_tab1_event_relocation' )['value'] : array(
            'title'     => 'Show Event',
            'url'       => 'https://onsiteprint.dk/',
            'target'    => ''
        ),
    ), array(  
        'id'            => get_field( $path . 'taps_tab2_id' ) ?: 'templates',
        'name'          => get_field( $path . 'taps_tab2_name' ) ?: 'Templates',
        'title'         => get_field( $path . 'taps_tab2_title' ) ?: 'Created Templates',
        'color'         => get_field( $path . 'taps_tab2_color' ) ?: 'secondary-60',       
        'create_link'   => ( get_field_object( $path . 'taps_tab2_create_relocation' )['value'] !== '' ) ? get_field_object( $path . 'taps_tab2_create_relocation' )['value'] : array(
            'title'     => 'Create Template',
            'url'       => 'https://onsiteprint.dk/',
            'target'    => ''
        ),
        'template_link' => ( get_field_object( $path . 'taps_tab2_template_relocation' )['value'] !== '' ) ? get_field_object( $path . 'taps_tab2_template_relocation' )['value'] : array(
            'title'     => 'Choose Template',
            'url'       => 'https://onsiteprint.dk/',
            'target'    => ''
        ),
    )
);

$styleColor = substr( $options['style_color'], 0, strpos( $options['style_color'], '-' ) );

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

<section id="<?= esc_attr( $id ) ?>" class="<?= esc_attr( $className ) ?>" data-form-color="<?= esc_attr( $styleColor ) ?>">
    <div class="op-block__inner op-flex-col">

        <header class="op-block__header op-flex-col">
            <h2 class="op-block-title"><?= esc_attr( $header['title'] ) ?></h2>
            <p class="op-block-description"><?= esc_attr( $header['description'] ) ?></p>
        </header>

        <?php require( __DIR__ . '/block-template-parts/modal.php' ); ?>

        <div class="op-block__content op-flex-col" data-tap-active="1">

            <div class="op-block__buttons">

                <?php $dashboard_taps = glob( __DIR__ . '/block-template-parts/block-taps/taps/*' );

                for ( $i = 0; $i < count( $dashboard_taps ); $i++ ) { ?>

                    <button onclick="opFormGoToTab(<?= $i+1 ?>)" class="op-button op-button-size-medium op-button-style-outline" data-color="<?= esc_attr( $options['style_color'] ) ?>">
                        <span class="op-button-title"><?= esc_attr( $taps[$i]['name'] ) ?></span>
                    </button>

                <?php } ?>

                <span class="op-tab-slider"></span>
            </div>
            
            <div class="op-block__taps op-flex-col">

                <?php foreach ( $dashboard_taps as $tap ) {
                    require( $tap );
                } ?>                   

            </div>

        </div>

    </div><!-- .op-block__inner -->
</section><!-- #<?= esc_attr($id) ?> -->