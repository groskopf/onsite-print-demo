<?php
/* ------------------------------------------------------------------------

 *  The OnsitePrint (Event Template Information) Block.
 *  Displaying Event Template Information of the current Event, if the User is logged in.
 *
 *  @link https://www.advancedcustomfields.com/resources/
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 ?  Updated: 2022-10-07 - 14:50 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  The Block Data
--------------------------------------------------------------------------- */

$eventTemplateNameLabel = get_field('event_template_name_label');
$eventTemplateLayoutLabel = get_field('event_template_layout_label');
$eventTemplateLogoLabel = get_field('event_template_logo_label');

$eventTemplateEditButton = get_field('event_template_edit_button');
$eventTemplateViewLayoutButton = get_field('event_template_view_layout_button');
$eventTemplateViewLogoButton = get_field('event_template_view_logo_button');

$eventId = ( ! empty( $_GET['event'] ) ) ? $_GET['event'] : false;

$id = 'op-' . $block['id'];

if( ! empty( $block['anchor'] ) ) {
	$id = $block['anchor'];
}

$className = 'op-event-template-information';

if ( ! empty( $block['className'] ) ) {
    $className .= ' ' . $block['className'];
}

if ( ! empty( $block['align'] ) ) {
    $className .= ' align' . $block['align'];
}

if( ! $eventTemplateNameLabel ) {
	$eventTemplateNameLabel = 'Template Name';
}

if( ! $eventTemplateLayoutLabel ) {
	$eventTemplateLayoutLabel = 'Template Layout';
}

if( ! $eventTemplateLogoLabel ) {
	$eventTemplateLogoLabel = 'Template Logo';
}

if( ! $eventTemplateEditButton ) {
	$eventTemplateEditButton = 'Edit Template';
}

if( ! $eventTemplateViewLayoutButton ) {
	$eventTemplateViewLayoutButton = 'View Layout';
}

if( ! $eventTemplateViewLogoButton ) {
	$eventTemplateViewLogoButton = 'View Logo';
}


/* ------------------------------------------------------------------------
 #  The Block Content
--------------------------------------------------------------------------- */
?>

<section id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?>" data-event-id="<?= esc_attr($eventId) ?>">
    <div class="op-block__inner">

        <div class="op-template-name op-flex-row op-align-start op-gap-1">
            <p class="op-flex-col op-flex-fill">
                <span class="op-label"><?= esc_attr($eventTemplateNameLabel) ?></span>
                <span class="op-text">Loading...</span>
            </p>
            <button class="op-button op-button-small op-button-stroke op-button-show op-flex-row-reverse" data-icon="pen" onclick="; return false">
                <span class="op-icon" role="img" aria-label="Edit Icon"></span>
                <span class="op-button-text"><?= esc_attr($eventTemplateEditButton) ?></span>
            </button>
        </div>

        <div class="op-template-layout op-flex-row op-align-start op-gap-1">           
            <p class="op-flex-col op-flex-fill">
                <span class="op-label"><?= esc_attr($eventTemplateLayoutLabel) ?></span>
                <span class="op-text">Loading...</span>
            </p>
            <button class="op-button op-button-small op-button-stroke op-button op-flex-row-reverse" data-icon="eye" onclick="; return false">
                <span class="op-icon" role="img" aria-label="Eye Icon"></span>
                <span class="op-button-text"><?= esc_attr($eventTemplateViewLayoutButton) ?></span>
            </button>
        </div>
        
        <div class="op-template-logo op-flex-row op-align-start op-gap-1">    
            <p class="op-flex-col op-flex-fill">
                <span class="op-label"><?= esc_attr($eventTemplateLogoLabel) ?></span>
                <span class="op-text">Loading...</span>
            </p>
            <button class="op-button op-button-small op-button-stroke op-x" data-icon="eye" onclick="; return false">
                <span class="op-icon" role="img" aria-label="Eye Icon"></span>
                <span class="op-button-text screen-reader-text"><?= esc_attr($eventTemplateViewLogoButton) ?></span>
            </button>
        </div>

    </div><!-- .block__inner -->
</section><!-- #<?= esc_attr($id) ?> -->