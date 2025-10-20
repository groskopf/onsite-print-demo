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
 ?  Updated: 2025-10-19 - 02:18 (Y:m:d - H:i)
 ?  Info: Fixed Variables

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
$titleVisibility = '';
$iconPosition = '';
$icon = '';

$id = 'op-' . $block['id'];

if( ! empty( $block['anchor'] ) ) {
    $id = $block['anchor'];
}

$className = 'op-button';

if ( $buttonSize ) {
    $className .= ' op-button-size-' . $buttonSize;
}

if ( $buttonStyle ) {
    $className .= ' op-button-style-' . $buttonStyle;
}

if ( $buttonColor ) {
    $buttonColor = ' data-color=' . $buttonColor;
}

if( $buttonLink ) {
    //var_dump($buttonLink);
    $url = $buttonLink['url'];
    $target = $buttonLink['target'];
    $title = $buttonLink['title'];

    if( $target ) {
        $target = 'target=' . $target;
    }

    if( ! $title || "" ) {
        if ( substr( $url, 0, 7 ) == 'http://' ) {
            $title = substr( $url, 7 );
        } else if ( substr( $url, 0, 8 ) == 'https://' ) {
            $title = substr( $url, 8 );
        } else {
            $title = $url;
        }
    }
} else {
    $url = site_url();
    $title = 'OnsitePrint';
}

if ( ! $buttonIcon && $buttonStyle == 'show' ) {
    $buttonIcon = 'link';
}

if( $buttonIcon ) {
    $icon = ' data-icon=' . $buttonIcon;
}

if( $buttonIconPosition ) {
    $iconPosition = ' data-icon-position=' . $buttonIconPosition;
}

if ( $buttonTitleVisibility == 1 ) {
    $titleVisibility = ' data-title-visibility=' . $buttonTitleVisibility;
}



/* ------------------------------------------------------------------------
 #  The Block Content
--------------------------------------------------------------------------- */
?>

<a id="<?= esc_attr( $id ) ?>" class="<?= esc_attr( $className ) ?>" href="<?= esc_attr( $url ) ?>" <?php echo esc_attr( $target ) . esc_attr( $buttonColor ) . esc_attr( $icon ) . esc_attr( $iconPosition ) . esc_attr( $titleVisibility )?>>
    <?php if ( $buttonIcon ) { ?>
        <span class="op-icon" role="img" aria-label="<?= esc_attr($buttonIcon) ?> Icon"></span>
    <?php } ?>
    <span class="op-button-title"><?= esc_attr( $title ) ?></span>
</a><!-- #<?= esc_attr( $id ) ?> -->