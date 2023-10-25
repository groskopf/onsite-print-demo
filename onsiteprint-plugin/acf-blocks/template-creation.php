<?php
/* ------------------------------------------------------------------------

 *  The OnsitePrint (Template Creation) Block.
 *  Displaying a Creation Form to Create a new Template, if the User is logged in.
 *
 *  @link https://www.advancedcustomfields.com/resources/
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 ?  Updated: 2022-12-15 - 09:43 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  The Block Data
--------------------------------------------------------------------------- */

$tc = 'template_creation';

$tc_step_1 = 'Template Name';
$tc_step_2 = 'Choose Layout';
$tc_step_3 = 'Select Image';

$tc_buttonBack = get_field( $tc . '_buttons_back_text' ) ?: 'Back';
$tc_buttonNext = get_field( $tc . '_buttons_next_text' ) ?: 'Next';
$tc_buttonSave = get_field( $tc . '_buttons_save_text' ) ?: 'Save Template';

$tc_modalTitle = get_field( $tc . '_modal_title' ) ?: 'Template have been Saved!';
$tc_modalDescription = get_field( $tc . '_modal_description' ) ?: 'Choose whether you want to go to the Dashboard or create a new Event with the new template.';

$tc_relocateMain = get_field( $tc . '_modal_relocate_main' );
$tc_relocateMainLink = $tc_relocateMain['url'] ?: 'https://onsiteprint.dk/';
$tc_relocateMainTitle = $tc_relocateMain['title'] ?: 'Front Page';

$tc_relocateEventCreation = get_field( $tc . '_modal_relocate_event_creation' );
$tc_relocateEventCreationLink = $tc_relocateEventCreation['url'] ?: 'https://onsiteprint.dk/';
$tc_relocateEventCreationTitle = $tc_relocateEventCreation['title'] ?: 'Create Event';


$id = 'op-' . $block['id'];

if( ! empty( $block['anchor'] ) ) {
	$id = $block['anchor'];
}

$className = 'op-template-creation op-flex-col';

if ( ! empty( $block['className'] ) ) {
    $className .= ' ' . $block['className'];
}

if ( ! empty( $block['align'] ) ) {
    $className .= ' align' . $block['align'];
}

/* ------------------------------------------------------------------------
 #  The Block Content
--------------------------------------------------------------------------- */
?>

<section id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?>">
    <div class="op-block__inner op-flex-col">

        <header class="op-block__header op-flex-col">
            <h2 class="op-block-title">Create a new Template</h2>
            <p class="op-block-description">Follow the steps below to complete your new template.</p>
        </header>

        <form id="<?= esc_attr($id) ?>__form" class="op-form-steps op-flex-fill" action="POST" data-form-step="1" data-form-steps="4"  data-form-step-last="false">
           
            <div class="op-form-process">
                <div class="op-form-process__inner">
                    <button type="button" onclick="opFormGoTo( 'step-1' ); return false" class="op-button op-button-size-medium op-button-style-solid" data-color="secondary-60" data-icon="op-number-1" data-icon-position="left" data-title-visibility="1">
                        <span class="op-icon" role="img" aria-label="Number 1 Icon"></span>
                        <span class="op-button-title"><?= esc_attr($tc_step_1) ?></span>
                    </button>
                    <button type="button" onclick="opFormGoTo( 'step-2' ); return false" class="op-button op-button-size-medium op-button-style-solid" data-color="secondary-20" data-icon="op-number-2" data-icon-position="left" data-title-visibility="1">
                        <span class="op-icon" role="img" aria-label="Number 2 Icon"></span>
                        <span class="op-button-title"><?= esc_attr($tc_step_2) ?></span>
                    </button>
                    <button type="button" onclick="opFormGoTo( 'step-3' ); return false" class="op-button op-button-size-medium op-button-style-solid" data-color="secondary-20" data-icon="op-number-3" data-icon-position="left" data-title-visibility="1">
                        <span class="op-icon" role="img" aria-label="Number 3 Icon"></span>
                        <span class="op-button-title"><?= esc_attr($tc_step_3) ?></span>
                    </button>
                    <button type="button" onclick="opFormGoTo( 'step-4' ); return false" class="op-button op-button-size-medium op-button-style-solid" data-color="secondary-20" data-icon="op-number-4" data-icon-position="left" data-title-visibility="1">
                        <span class="op-icon" role="img" aria-label="Number 4 Icon"></span>
                        <span class="op-button-title"><?= esc_attr($tc_step_3) ?></span>
                    </button>
                </div>
            </div>

            <div class="op-form__inner op-flex-col">

                <div class="op-form-content">

                    <fieldset class="op-fieldset-step-1">
                        <header>
                            <p class="op-fieldset-steps">Step <span class="op-fieldset-step-number">1/4</span></p>
                            <h3 class="op-fieldset-title">Let's start with the Template Name</h3>
                            <p class="op-fieldset-description">Her skal der stå noget.</p>
                        </header>
                        <div class="op-fieldset__inner">
                            <label for="<?= esc_attr($id) ?>-name-input">Template Name</label>
                            <div id="<?= esc_attr($id) ?>-name-input-validation" class="validation-error"></div>
                            <input id="<?= esc_attr($id) ?>-name-input" name="name" type="text" required>
                        </div>
                    </fieldset>

                    <fieldset class="op-fieldset-step-2">
                        <header>
                            <p class="op-fieldset-steps">Step <span class="op-fieldset-step-number">2/4</span></p>
                            <h3 class="op-fieldset-title">What kind of layout are you looking for?</h3>
                            <p class="op-fieldset-description">Her skal der stå noget.</p>
                        </header>
                        <div class="op-fieldset__inner">
                            <div id="<?= esc_attr($id) ?>-radio-input-validation" class="validation-error"></div>
                            <div id="<?= esc_attr($id) ?>-radio-input" class="input-outer flex-wrap flex-row-wrap"></div>
                        </div>
                    </fieldset>

                    <fieldset class="op-fieldset-step-3">
                        <header>
                            <p class="op-fieldset-steps">Step <span class="op-fieldset-step-number">3/4</span></p>
                            <h3 class="op-fieldset-title">Please select your Image/Logo</h3>
                            <p class="op-fieldset-description">Her skal der stå noget.</p>
                        </header>
                        <div class="op-fieldset__inner">
                            <label for="<?= esc_attr($id) ?>-image-file-input">Select Image/Logo</label>
                            <div id="<?= esc_attr($id) ?>-image-file-input-validation" class="validation-error"></div>
                            <input id="<?= esc_attr($id) ?>-image-file-input" name="image" type="file" accept=".jpg, .jpeg, .png" required>
                        </div>
                    </fieldset>

                    <fieldset class="op-fieldset-step-4">
                        <header>
                            <p class="op-fieldset-steps">Step <span class="op-fieldset-step-number">4/4</span></p>
                            <h3 class="op-fieldset-title">Finally, save your new Template</h3>
                            <p class="op-fieldset-description">Her skal der stå noget.</p>
                        </header>
                        <div class="op-fieldset__inner">

                        </div>
                    </fieldset>

                </div>
                
                <div class="op-form-directions">
                    <div class="op-col-left">
                        <button type="button" onclick="opFormGoTo( 'back' ); return false" class="op-button-back op-button op-button-size-small op-button-style-outline" data-color="secondary-60" data-icon="arrow-left" data-icon-position="left">
                            <span class="op-icon" role="img" aria-label="Arrow Left Icon"></span>
                            <span class="op-button-title"><?= esc_attr($tc_buttonBack) ?></span>
                        </button>
                    </div>
                    <div class="op-col-right">
                        <button type="button" onclick="opFormGoTo( 'next' ); return false" class="op-button-next op-button op-button-size-small op-button-style-outline" data-color="secondary-60" data-icon="arrow-right" data-icon-position="right">
                            <span class="op-icon" role="img" aria-label="Arrow Right Icon"></span>
                            <span class="op-button-title"><?= esc_attr($tc_buttonNext) ?></span>
                        </button>
                        <button type="submit" form="<?= esc_attr($id) ?>__form" value="Submit" onclick="opCreateTemplate(); return false" class="op-button-save op-button op-button-size-small op-button-style-solid" data-color="secondary-60" data-icon="floppy-disk" data-icon-position="left">
                            <span class="op-icon" role="img" aria-label="Floppy Disk Icon"></span>
                            <span class="op-button-title"><?= esc_attr($tc_buttonSave) ?></span>
                        </button>
                    </div>
                </div>

            </div><!-- .op-form__inner -->
        </form><!-- .op-form-steps -->

        <div class="op-modal" data-relocation-event-creation="<?= esc_attr($tc_relocateEventCreationLink) ?>">
            <div class="op-modal__inner">
                <div class="op-flex-col">
                    <h3 class="op-modal-title"><?= esc_attr($tc_modalTitle) ?></h3>
                    <p class="op-modal-description"><?= esc_attr($tc_modalDescription) ?></p>
                </div>
                <div class="op-flex-row">
                    <a href="<?= esc_attr($tc_relocateMainLink) ?>" class="op-button op-button-size-small op-button-style-outline" data-color="primary-100" data-icon="arrow-left" data-icon-position="left">
                        <span class="op-icon" role="img" aria-label="Arrow Left Icon"></span>
                        <span class="op-button-title"><?= esc_attr($tc_relocateMainTitle) ?></span>
                    </a>
                    <a class="op-button-event-creation op-button op-button-size-small op-button-style-outline" data-color="primary-100" data-icon="arrow-right" data-icon-position="right">
                        <span class="op-icon" role="img" aria-label="Arrow Right Icon"></span>
                        <span class="op-button-title"><?= esc_attr($tc_relocateEventCreationTitle) ?></span>
                    </a>
                </div>
            </div>
        </div>
        
    </div><!-- .op-block__inner -->
</section><!-- #<?= esc_attr($id) ?> -->