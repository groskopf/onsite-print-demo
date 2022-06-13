<?php
/**
 * The template for displaying content from (Sevice Pages) or (Material Pages). 
 *
 * Used for StormCut (Page List Block).
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since Twenty Twenty 1.0
 */

$pageId = $args['pageId']; // #NG - Comming from the get_template_part().
$displayOptions = $args['displayOptions']; // #NG - Comming from the get_template_part().

$page = get_post($pageId);

if ( $page->post_status != 'publish' ) {
    return;
}

$pageIcon = get_field('page_icon', $pageId);
$pageIconUrl = $pageIcon['url'];
$pageIconAlt = $pageIcon['alt'];
$pageIconWidth = $pageIcon['sizes']['thumbnail-width'];
$pageIconHeight = $pageIcon['sizes']['thumbnail-height'];

?>

<article class="post-<?= $pageId ?> is-style-shadow has-background has-white-background-color">
    <div class="post-inner">
        <header class="post-header">
            <?php 
            if ( in_array( 'page_featured_image', $displayOptions, TRUE ) ) {
                echo get_the_post_thumbnail( $pageId, 'medium' );
            }

            if ( in_array( 'page_title', $displayOptions, TRUE ) ) {
                ?>
                <h3 class="post-title"><?= $page->post_title ?></h3>
                <?php
            }

            if ( in_array( 'page_excerpt', $displayOptions, TRUE ) ) {
                ?>
                <p class="post-excerpt"><?= $page->post_excerpt ?></p>
                <?php
            }
            ?>
        </header>
        <footer class="post-footer">           
            <i class="read-more-icon fa-solid fa-arrow-right"></i>
            <?php

            if ( in_array( 'page_icon', $displayOptions, TRUE ) && $pageIcon ) {
                ?>
                <img loading="lazy" width="<?= $pageIconWidth ?>" height="<?= $pageIconHeight ?>" src="<?= $pageIconUrl ?>" class="attachment-thumbnail size-thumbnail wp-post-image" alt="<?= $pageIconAlt ?>">
                <?php 
            }
            ?>
            <a class="post-link" href="<?= get_permalink( $pageId ) ?>">
                <span class="post-read-more">Læs mere om <?= $page->post_title ?></span>
            </a>
        </footer>
    </div>
</article>