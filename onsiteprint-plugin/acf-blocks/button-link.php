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
 ?  Updated: 2022-10-28 - 14:01 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  The Block Data
--------------------------------------------------------------------------- */

$buttonLink = get_field('button_link');
$buttonSize = get_field('button_size');
$buttonStyle = get_field('button_style');
$buttonColor = get_field('button_color');
$buttonIcon = get_field('button_icon');
$buttonIconPosition = get_field('button_icon_position');
$buttonTitleVisibility = get_field('button_title_visibility');
$buttonMaxWidthNumber = get_field('button_max_width_number');
$buttonMaxWidthUnit = get_field('button_max_width_unit');

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
        if ( substr($url, 0, 7) == 'http://' ) {
            $title = substr($url, 7);
        } else if ( substr($url, 0, 8) == 'https://' ) {
            $title = substr($url, 8);
        } else {
            $title = $url;
        }
    }
} else {
    $url = 'https://onsiteprint.dk';
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
    
    if ( $buttonMaxWidthNumber ) {
        $titleMaxWidth = ' style=max-width:' . $buttonMaxWidthNumber . $buttonMaxWidthUnit;
    }
} else {
    if ( $buttonMaxWidthNumber ) {
        $maxWidth = ' style=max-width:' . $buttonMaxWidthNumber . $buttonMaxWidthUnit;
    }
}



/* ------------------------------------------------------------------------
 #  The Block Content
--------------------------------------------------------------------------- */
?>

<a id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?>" href="<?= esc_attr($url) ?>" <?php echo esc_attr($target) . esc_attr($buttonColor) . esc_attr($icon) . esc_attr($iconPosition) . esc_attr($titleVisibility) . esc_attr($maxWidth) ?>>
    <?php if( $buttonIcon ) { ?>
        <span class="op-icon" role="img" aria-label="<?= esc_attr($buttonIcon) ?> Icon"></span>
    <? } ?>
    <span class="op-button-title"<?= esc_attr($titleMaxWidth) ?>><?= esc_attr($title) ?></span>
</a><!-- #<?= esc_attr($id) ?> -->