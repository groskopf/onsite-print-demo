<?php
/* ------------------------------------------------------------------------

 *  The OnsitePrint (Link Button) Block.
 *  Displaying a Button with a Custom Link.
 *
 *  @link https://www.advancedcustomfields.com/resources/
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 ?  Updated: 2025-11-19 - 01:50 (Y:m:d - H:i)
 ?  Info: Added extra handling for button max width.

---------------------------------------------------------------------------
 #  The Block Data
--------------------------------------------------------------------------- */

$buttonLink = get_field('button_link') ?: false;
$buttonSize = get_field('button_size') ?: false;
$buttonStyle = get_field('button_style') ?: false;
$buttonColor = get_field('button_color') ?: false;
$buttonIcon = get_field('button_icon') ?: false;
$buttonIconPosition = get_field('button_icon_position') ?: '';
$buttonTitleVisibility = get_field('button_title_visibility') ?: 0;
$buttonMaxWidthNumber = get_field('button_max_width_number') ?: false;
$buttonMaxWidthUnit = get_field('button_max_width_unit') ?: 'px';
$url = site_url();
$title = 'OnsitePrint';
$id = 'op-' . esc_attr( $block['id'] );
$classNames = 'op-button';
$attributes = '';
$maxWidth = '';

if ( $buttonLink ) {
    $url = esc_attr( $buttonLink['url'] );
    $title = esc_attr( $buttonLink['title'] );
    $attributes .= 'href="' . esc_attr( $buttonLink['url'] ) . '"';

    if ( $buttonLink['target'] ) {
        $attributes .= 'target="' . esc_attr( $buttonLink['target'] ) . '"';
    }

    //// If no title is set, use the URL as the title.
    if ( ! $title || "" ) {
        if ( substr( $url, 0, 7 ) == 'http://' ) {
            $title = substr( $url, 7 );
        } else if ( substr( $url, 0, 8 ) == 'https://' ) {
            $title = substr( $url, 8 );
        } else {
            $title = $url;
        }
    }
}

if ( $buttonSize ) {
    $classNames .= ' op-button-size-' . esc_attr( $buttonSize );
} else {
    $classNames .= ' op-button-size-medium';
}

if ( $buttonStyle ) {
    $classNames .= ' op-button-style-' . esc_attr( $buttonStyle );
} else {
    $classNames .= ' op-button-style-solid';
}

if ( $buttonColor ) {
    $attributes .= ' data-color="' . esc_attr( $buttonColor ) . '"';
}

if ( $buttonIcon ) {
    $attributes .= ' data-icon="' . esc_attr( $buttonIcon ) . '"';
    $attributes .= ' data-icon-position="' . esc_attr( $buttonIconPosition ) . '"';
    $attributes .= ' data-title-visibility="' . esc_attr( $buttonTitleVisibility ) . '"';
}
 
if ( $buttonMaxWidthNumber ) {
    $classNames .= ' op-button-has-max-width';
    $buttonMaxWidth = 'max-width:' . esc_attr( $buttonMaxWidthNumber ) . esc_attr( $buttonMaxWidthUnit ) . ';';
    if ( $buttonTitleVisibility == 1 ) {
        $maxWidth = $buttonMaxWidth;
    } else {
        $attributes .= $buttonMaxWidth;
    }
}

/* ------------------------------------------------------------------------
#  The Block Content
--------------------------------------------------------------------------- */
?>

<a id="<?= $id ?>" class="<?= $classNames ?>" <?= $attributes ?>>
    <?php if ( $buttonIcon ) { ?>
        <span class="op-icon" role="img" aria-label="<?= esc_attr( $buttonIcon ) ?> Icon"></span>
    <?php } ?>
    <span class="op-button-title" <?= $maxWidth ?>><?= $title ?></span>
</a><!-- #<?= $id ?> -->