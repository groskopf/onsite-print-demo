<?php
/**
 * The StormCut (Page List Block).
 *
 * Displaying (Sevice Pages) or (Material Pages) in a list.
 *
 * @link https://www.advancedcustomfields.com/resources/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since Twenty Twenty 1.0
 */

$pageListOptions = get_field('page_list_options');
$listPageType = $pageListOptions['page_list_page_type'];
$listServicePages = $pageListOptions['page_list_service_pages'];
$listMaterialPages = $pageListOptions['page_list_material_pages'];

$pageListDisplay = get_field('page_list_display');
$listDisplayOptions = $pageListDisplay['page_list_display_options'];
$listColumns = $pageListDisplay['page_list_columns'];

$pageAdditionalBlock = get_field('page_list_additional_block');
$pageAdditionalOptions = get_field('page_list_additional_options');

$className = 'stormcut-page-list ' . $listPageType;

if ( ! empty( $block['className'] ) ) {
    $className .= ' ' . $block['className'];
}

if ( ! empty( $block['align'] ) ) {
    $className .= ' align' . $block['align'];
}

$className .= ' ' . $listColumns;

?>

<div class="<?= esc_attr($className) ?>">
    <div class="stormcut-block__inner-container">

        <?php
        if ( $pageAdditionalBlock == 'before-page-list' ) {
            get_template_part( 'acf-blocks/stormcut-page-list/stormcut-page-list-single-additional', 'additional-block', array( 'additionalOptions' => $pageAdditionalOptions ) );     
        }
        ?>

        <?php
        if ( $listPageType == 'service-pages' && $listServicePages != false ) {
            $pageListObject = $listServicePages;
        } 
        if ( $listPageType == 'material-pages' && $listMaterialPages != false ) {
            $pageListObject = $listMaterialPages;
        }

        foreach( $pageListObject as $page ) {
            get_template_part( 'acf-blocks/stormcut-page-list/stormcut-page-list-single', $listPageType, array( 'pageId' => $page, 'displayOptions' => $listDisplayOptions ) );     
        }

        if ( $pageAdditionalBlock == 'after-page-list' ) {
            get_template_part( 'acf-blocks/stormcut-page-list/stormcut-page-list-single-additional', 'additional-block', array( 'additionalOptions' => $pageAdditionalOptions ) );     
        }
        ?>

    </div>
</div>