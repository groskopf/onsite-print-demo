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

$additionalOptions = $args['additionalOptions']; // #NG - Comming from the get_template_part().
$additionalTitle = $additionalOptions['page_list_additional_title'];
$additionalExcerpt = $additionalOptions['page_list_additional_excerpt'];
$additionalLink = $additionalOptions['page_list_additional_link'];

if ( ! $additionalTitle && ! $additionalExcerpt ) {
    return;
}

?>

<article class="after-page-list is-style-shadow has-background has-dark-background-color">
    <div class="post-inner">
        <header class="post-header">
            <?php 
            if ( $additionalTitle ) {
                ?>
                <h3 class="post-title"><?= $additionalTitle ?></h3>
                <?php
            }

            if ( $additionalExcerpt ) {
                ?>
                <p class="post-excerpt"><?= $additionalExcerpt ?></p>
                <?php
            }
            ?>
        </header>
        <footer class="post-footer">           
            <i class="read-more-icon fa-solid fa-arrow-right"></i>
            <a class="post-link" href="<?= $additionalLink ?>">
                <span class="post-read-more">Læs mere om <?= $page->post_title ?></span>
            </a>
        </footer>
    </div>
</article>