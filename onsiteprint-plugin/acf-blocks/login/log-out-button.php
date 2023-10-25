<?php
/**
 * The OnsitePrint (Log out Block).
 *
 * Displaying Log out.
 *
 * @link https://www.advancedcustomfields.com/resources/
 *
 * @package WordPress
 * @subpackage OnsitePrint Plugin
 * @since OnsitePrint Plugin 1.0
 */

$relocate = get_field('relocate');

$id = 'op-' . $block['id'];

if( ! empty( $block['anchor'] ) ) {
	$id = $block['anchor'];
}

$className = 'op-log-out' . $listPageType;

if ( ! empty( $block['className'] ) ) {
    $className .= ' ' . $block['className'];
}

if ( ! empty( $block['align'] ) ) {
    $className .= ' align' . $block['align'];
}

$className .= ' ' . $listColumns;

?>

<section id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?>">
    <div class="validation-info">Validation Informaiton</div>
    <div class="op-block__inner active">
   
        <div id="<?= esc_attr($id) ?>-logout" class="op-block__wrapper">
            <button class="list-button button-logout" onclick="loginOut( '<?= $relocate ?>' )"><span class="text">Log Out</span></button>
            <button class="list-button button-login" onclick="loginOut( '<?= $relocate ?>', 'login' )"><span class="text">Log in</span></button>
        </div><!-- #<?= esc_attr($id) ?>-logout -->
        
    </div><!-- .inner-container -->
</section><!-- #<?= esc_attr($id) ?> -->