<?php
/* ------------------------------------------------------------------------

 *  The OnsitePrint (Toggle Button) Block.
 *  Displaying a Toggle Button. Adding an Additional Data Attribute to the parent or sibling element.
 *
 *  @link https://www.advancedcustomfields.com/resources/
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 ?  Updated: (Y:m:d - H:i) 2022-09-16 - 12:06

---------------------------------------------------------------------------
 #  The Block Data
--------------------------------------------------------------------------- */

$target = get_field('button_toggle_target');
$text = get_field('button_toggle_text');
$textVisibility = get_field('button_toggle_text_visibility');

$id = 'op-' . $block['id'];

if( ! empty( $block['anchor'] ) ) {
	$id = $block['anchor'];
}

$className = 'op-button-toggle';

if ( ! empty( $block['className'] ) ) {
    $className .= ' ' . $block['className'];
}

if ( ! empty( $block['align'] ) ) {
    $className .= ' align' . $block['align'];
}

if( ! $text ) {
	$text = 'Menu';
}

/* ------------------------------------------------------------------------
 #  The Block Content
--------------------------------------------------------------------------- */
?>

<section id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?>">

    <button class="button-toggle" data-target="<?= esc_attr($target) ?>" aria-expanded="false" onclick="opButtonToggle()">
        <span class="button__inner">
            <span class="button-icon">
                <span class="icon-line-1"></span>
                <span class="icon-line-2"></span>
                <span class="icon-line-3"></span>
            </span>
            <span class="button-text" data-text-visibility="<?= esc_attr($textVisibility) ?>"><?= esc_attr($text) ?></span>
        </span>
    </button>

</section><!-- #<?= esc_attr($id) ?> -->