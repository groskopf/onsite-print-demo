<?php
/**
 * The OnsitePrint (Create Design) Block.
 *
 * Creating a new design for use to print.
 *
 * @link https://www.advancedcustomfields.com/resources/
 *
 * @package WordPress
 * @subpackage OnsitePrint Plugin
 * @since OnsitePrint Plugin 1.0
 */

//$pageListOptions = get_field('page_list_options');

$id = $block['id'];

if( ! empty( $block['anchor'] ) ) {
	$id = $block['anchor'];
}

$idName = 'OP-create-design-' . $id;

$className = 'OP-block wrapper post' . $listPageType;

if ( ! empty( $block['className'] ) ) {
    $className .= ' ' . $block['className'];
}

if ( ! empty( $block['align'] ) ) {
    $className .= ' align' . $block['align'];
}

$className .= ' ' . $listColumns;

?>

<div id="<?= esc_attr($idName) ?>" class="<?= esc_attr($className) ?>">

    <header onclick="openContent()">               
        <h3><span>Post</span>Create new Design</h3>
        <div class="arrow"></div>
    </header>

    <div class="content">
        <div class="form-container">
            <div class="form-validate"></div>
            <form class="upload-new-image" action="POST">
                <div class="input-outer flex-wrap">
                    <label for="<?= esc_attr($id) ?>-name-input">Design Name</label>
                    <input id="<?= esc_attr($id) ?>-name-input" name="name" type="text" required>
                </div>
                <input id="<?= esc_attr($id) ?>-image-file-input" name="image" type="file" accept=".jpg, .jpeg, .png" required>
                <button class="list-button" type="submit" onclick="createNewDesign(); return false">Create new Design</button>
            </form>
        </div>
        <div class="responses">
            <h4>Responses:</h4>
            <div class="inner"></div>
        </div>
    </div>

</div><!-- #<?= esc_attr($idName) ?> -->