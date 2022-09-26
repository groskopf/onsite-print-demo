<?php
/**
 * [Block] Create Template.
 *
 * [Front-end] Creating a new Template for use to print.
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

$className = 'op-create-template' . $listPageType;

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

        <div id="<?= esc_attr($id) ?>-create-template" class="op-block__wrapper">
            <div class="form-container">
                <form class="create-template-form" action="POST">
                    <fieldset id="<?= esc_attr($id) ?>-layout-fieldset" class="input-outer flex-wrap">
                        <legend>Choose Layout:</legend>
                        <div id="<?= esc_attr($id) ?>-radio-input-validation" class="validation-error"></div>
                        <div id="<?= esc_attr($id) ?>-radio-input" class="input-outer flex-wrap flex-row-wrap"></div>
                    </fieldset>
                    <fieldset id="<?= esc_attr($id) ?>-design-fieldset" class="input-outer flex-wrap">
                        <legend>Specialize Design:</legend>
                        <div class="input-outer flex-wrap">
                            <label for="<?= esc_attr($id) ?>-name-input">Template Name</label>
                            <div id="<?= esc_attr($id) ?>-name-input-validation" class="validation-error"></div>
                            <input id="<?= esc_attr($id) ?>-name-input" name="name" type="text" required>
                        </div>
                        <div class="input-outer flex-wrap">
                            <label for="<?= esc_attr($id) ?>-image-file-input">Select a Logo</label>
                            <div id="<?= esc_attr($id) ?>-image-file-input-validation" class="validation-error"></div>
                            <input id="<?= esc_attr($id) ?>-image-file-input" name="image" type="file" accept=".jpg, .jpeg, .png" required>
                        </div>
                    </fieldset>
                    <button class="list-button" type="submit" onclick="createNewTemplate( '<?= $relocate ?>' ); return false">Gem og gå til Oversigt</button>
                    <button class="list-button" type="submit" onclick="createNewTemplate( false ); return false">Gem og lav nyt Event</button>
                </form>
            </div>
        </div>

    </div>
</section><!-- #<?= esc_attr($id) ?> -->