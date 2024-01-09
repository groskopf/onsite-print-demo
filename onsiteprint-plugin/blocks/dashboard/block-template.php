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
 ?  Updated: 2024-01-09 - 02:41 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  Redirect if User is not Logged In
--------------------------------------------------------------------------- */

if ( ! $GLOBALS['op_login_session'] ) {
    ///// Redirect.
    header('Location: /'); exit();
}

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

        <div class="op-block__content op-flex-col" data-tap-active="1">

            <div class="op-block__buttons">

                <?php $dashboard_taps = glob( __DIR__ . '/block-template-parts/block-taps/taps/*' );

                for ( $i = 0; $i < count( $dashboard_taps ); $i++ ) { ?>

                    <a href="#<?= esc_attr( $taps[$i]['id'] ) ?>" class="op-button op-button-size-medium op-button-style-outline" data-color="<?= esc_attr( $options['style_color'] ) ?>">
                        <span class="op-button-title"><?= esc_attr( $taps[$i]['name'] ) ?></span>
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