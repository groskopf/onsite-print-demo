<?php
/**
 * The OnsitePrint (Toggle Button) Block.
 *
 * Displaying a Toggle Button.
 *
 * @link https://www.advancedcustomfields.com/resources/
 *
 * @package WordPress
 * @subpackage OnsitePrint Plugin
 * @since OnsitePrint Plugin 1.0
 */

$placement = get_field('toggle_button_placement');
$text = get_field('toggle_button_text');
$textVisibility = get_field('toggle_button_text_visibility');

$id = 'op-' . $block['id'];

if( ! empty( $block['anchor'] ) ) {
	$id = $block['anchor'];
}

$className = 'op-toggle-button';

if ( ! empty( $block['className'] ) ) {
    $className .= ' ' . $block['className'];
}

if ( ! empty( $block['align'] ) ) {
    $className .= ' align' . $block['align'];
}

if( ! $text ) {
	$text = 'Menu';
}

?>

<section id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?>">

    <button class="toggle-button" data-toggle-button-target="<?= esc_attr($placement) ?>" aria-expanded="false" onclick="opToggleButton()">
        <span class="toggle-inner">
            <span class="toggle-icon">
                <span class="toggle-line-1"></span>
                <span class="toggle-line-2"></span>
                <span class="toggle-line-3"></span>
            </span>
            <span class="toggle-text" data-text-visibility="<?= esc_attr($textVisibility) ?>"><?= esc_attr($text) ?></span>
        </span>
    </button>

</section><!-- #<?= esc_attr($id) ?> -->