<?php
/**
 * [Block] Create Design.
 *
 * [Front-end] Creating a new design for use to print.
 *
 * @link https://www.advancedcustomfields.com/resources/
 *
 * @package WordPress
 * @subpackage OnsitePrint Plugin
 * @since OnsitePrint Plugin 1.0
 */

//$pageListOptions = get_field('page_list_options');

$id = 'op-' . $block['id'];

if( ! empty( $block['anchor'] ) ) {
	$id = $block['anchor'];
}

$className = 'op-create-design' . $listPageType;

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

        <div id="<?= esc_attr($id) ?>-create-design" class="op-block__wrapper post">

            <header onclick="openContent()">               
                <h3><span>Post</span>Create new Design</h3>
                <div class="arrow"></div>
            </header>

            <div class="content">
                <div class="form-container">
                    <form class="create-design-form" action="POST">
                        <div class="input-outer flex-wrap">
                            <label for="<?= esc_attr($id) ?>-name-input">Design Name</label>
                            <div id="<?= esc_attr($id) ?>-name-input-validation" class="validation-error"></div>
                            <input id="<?= esc_attr($id) ?>-name-input" name="name" type="text" required>
                        </div>
                        <div class="input-outer">
                            <div id="<?= esc_attr($id) ?>-image-file-input-validation" class="validation-error"></div>
                            <input id="<?= esc_attr($id) ?>-image-file-input" name="image" type="file" accept=".jpg, .jpeg, .png" required>
                        </div>
                        <button class="list-button" type="submit" onclick="createNewDesign(); return false">Create new Design</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>

        </div><!-- #<?= esc_attr($id) ?>-create-design -->

    </div>
</section><!-- #<?= esc_attr($id) ?> -->