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
 ?  Updated: 2022-12-16 - 09:45 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  The Block Data
--------------------------------------------------------------------------- */

$tc = 'template_creation_';

$acf = array(
    'header_title'          => get_field( $tc . 'header_title' ) ?: 'Create a new Template',
    'header_description'    => get_field( $tc . 'header_description' ) ?: 'Follow the steps below to complete your new template.',
    'header_step'           => get_field( $tc . 'header_step' ) ?: 'Step',
	'button_back'           => get_field( $tc . 'buttons_back_text' ) ?: 'Back',
    'button_next'           => get_field( $tc . 'buttons_next_text' ) ?: 'Next',
    'button_save'           => get_field( $tc . 'buttons_save_text' ) ?: 'Save Template',

    'step_1_process'        => get_field( $tc . 'steps_step_1_process' ) ?: 'Template Name',
    'step_1_title'          => get_field( $tc . 'steps_step_1_title' ) ?: 'Let’s start with the Template Name',
    'step_1_description'    => get_field( $tc . 'steps_step_1_description' ) ?: 'Some text her...',

    'step_2_process'        => get_field( $tc . 'steps_step_2_process' ) ?: 'Choose Layout',
    'step_2_title'          => get_field( $tc . 'steps_step_2_title' ) ?: 'What kind of layout are you looking for?',
    'step_2_description'    => get_field( $tc . 'steps_step_2_description' ) ?: 'Some text her...',

    'step_3_process'        => get_field( $tc . 'steps_step_3_process' ) ?: 'Select Image',
    'step_3_title'          => get_field( $tc . 'steps_step_3_title' ) ?: 'Please select your Image/Logo',
    'step_3_description'    => get_field( $tc . 'steps_step_3_description' ) ?: 'Some text her...',

    'step_4_process'        => get_field( $tc . 'steps_step_4_process' ) ?: 'Save Template',
    'step_4_title'          => get_field( $tc . 'steps_step_4_title' ) ?: 'Finally, save your new Template',
    'step_4_description'    => get_field( $tc . 'steps_step_4_description' ) ?: 'Some text her...',

    'modal_title'           => get_field( $tc . 'modal_title' ) ?: 'Template have been Saved!',
    'modal_description'     => get_field( $tc . 'modal_description' ) ?: 'Choose whether you want to go to the Dashboard or create a new Event with the new template.',
    'main_link'             => get_field_object( $tc . 'modal_relocate_main' )['url'] ?: 'https://onsiteprint.dk/',
    'main_title'            => get_field_object( $tc . 'modal_relocate_main' )['title'] ?: 'Front Page',
    'event_creation_link'   => get_field_object( $tc . 'modal_relocate_event_creation' )['url'] ?: 'https://onsiteprint.dk/',
    'event_creation_title'  => get_field_object( $tc . 'modal_relocate_event_creation' )['title'] ?: 'Create Event'
);

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
            <h2 class="op-block-title"><?= esc_attr( $acf['header_title'] ) ?></h2>
            <p class="op-block-description"><?= esc_attr( $acf['header_description'] ) ?></p>
        </header>

        <form id="<?= esc_attr($id) ?>__form" class="op-form-steps op-flex-fill" action="POST" data-form-step="1" data-form-steps="4"  data-form-step-last="false">
           
            <div class="op-form-process">
                <div class="op-form-process__inner">
                    <button type="button" onclick="opFormGoTo( 'step-1' ); return false" class="op-button op-button-size-medium op-button-style-solid" data-color="secondary-60" data-icon="op-number-1" data-icon-position="left" data-title-visibility="1">
                        <span class="op-icon" role="img" aria-label="Number 1 Icon"></span>
                        <span class="op-button-title"><?= esc_attr( $acf['step_1_process'] ) ?></span>
                    </button>
                    <button type="button" onclick="opFormGoTo( 'step-2' ); return false" class="op-button op-button-size-medium op-button-style-solid" data-color="secondary-20" data-icon="op-number-2" data-icon-position="left" data-title-visibility="1">
                        <span class="op-icon" role="img" aria-label="Number 2 Icon"></span>
                        <span class="op-button-title"><?= esc_attr( $acf['step_2_process'] ) ?></span>
                    </button>
                    <button type="button" onclick="opFormGoTo( 'step-3' ); return false" class="op-button op-button-size-medium op-button-style-solid" data-color="secondary-20" data-icon="op-number-3" data-icon-position="left" data-title-visibility="1">
                        <span class="op-icon" role="img" aria-label="Number 3 Icon"></span>
                        <span class="op-button-title"><?= esc_attr( $acf['step_3_process'] ) ?></span>
                    </button>
                    <button type="button" onclick="opFormGoTo( 'step-4' ); return false" class="op-button op-button-size-medium op-button-style-solid" data-color="secondary-20" data-icon="op-number-4" data-icon-position="left" data-title-visibility="1">
                        <span class="op-icon" role="img" aria-label="Number 4 Icon"></span>
                        <span class="op-button-title"><?= esc_attr( $acf['step_4_process'] ) ?></span>
                    </button>
                </div>
            </div>

            <div class="op-form__inner op-flex-col">

                <div class="op-form-content">

                    <fieldset class="op-fieldset-step-1">
                        <header>
                            <p class="op-fieldset-steps"><?= esc_attr( $acf['header_step'] ) ?> <span class="op-fieldset-step-number">1/4</span></p>
                            <h3 class="op-fieldset-title"><?= esc_attr( $acf['step_1_title'] ) ?></h3>
                            <p class="op-fieldset-description"><?= esc_attr( $acf['step_1_description'] ) ?></p>
                        </header>
                        <div class="op-fieldset__inner">
                            <label for="<?= esc_attr($id) ?>-name-input">Template Name</label>
                            <div id="<?= esc_attr($id) ?>-name-input-validation" class="validation-error"></div>
                            <input id="<?= esc_attr($id) ?>-name-input" name="name" type="text" required>
                        </div>
                    </fieldset>

                    <fieldset class="op-fieldset-step-2">
                        <header>
                            <p class="op-fieldset-steps"><?= esc_attr( $acf['header_step'] ) ?> <span class="op-fieldset-step-number">2/4</span></p>
                            <h3 class="op-fieldset-title"><?= esc_attr( $acf['step_2_title'] ) ?></h3>
                            <p class="op-fieldset-description"><?= esc_attr( $acf['step_2_description'] ) ?></p>
                        </header>
                        <div class="op-fieldset__inner">
                            <div id="<?= esc_attr($id) ?>-radio-input-validation" class="validation-error"></div>
                            <div id="<?= esc_attr($id) ?>-radio-input" class="input-outer flex-wrap flex-row-wrap"></div>
                        </div>
                    </fieldset>

                    <fieldset class="op-fieldset-step-3">
                        <header>
                            <p class="op-fieldset-steps"><?= esc_attr( $acf['header_step'] ) ?> <span class="op-fieldset-step-number">3/4</span></p>
                            <h3 class="op-fieldset-title"><?= esc_attr( $acf['step_3_title'] ) ?></h3>
                            <p class="op-fieldset-description"><?= esc_attr( $acf['step_3_description'] ) ?></p>
                        </header>
                        <div class="op-fieldset__inner">
                            <label for="<?= esc_attr($id) ?>-image-file-input">Select Image/Logo</label>
                            <div id="<?= esc_attr($id) ?>-image-file-input-validation" class="validation-error"></div>
                            <input id="<?= esc_attr($id) ?>-image-file-input" name="image" type="file" accept=".jpg, .jpeg, .png" required>
                        </div>
                    </fieldset>

                    <fieldset class="op-fieldset-step-4">
                        <header>
                            <p class="op-fieldset-steps"><?= esc_attr( $acf['header_step'] ) ?> <span class="op-fieldset-step-number">4/4</span></p>
                            <h3 class="op-fieldset-title"><?= esc_attr( $acf['step_4_title'] ) ?></h3>
                            <p class="op-fieldset-description"><?= esc_attr( $acf['step_4_description'] ) ?></p>
                        </header>
                        <div class="op-fieldset__inner">

                        </div>
                    </fieldset>

                </div>
                
                <div class="op-form-directions">
                    <div class="op-col-left">
                        <button type="button" onclick="opFormGoTo( 'back' ); return false" class="op-button-back op-button op-button-size-small op-button-style-outline" data-color="secondary-60" data-icon="arrow-left" data-icon-position="left">
                            <span class="op-icon" role="img" aria-label="Arrow Left Icon"></span>
                            <span class="op-button-title"><?= esc_attr( $acf['button_back'] ) ?></span>
                        </button>
                    </div>
                    <div class="op-col-right">
                        <button type="button" onclick="opFormGoTo( 'next' ); return false" class="op-button-next op-button op-button-size-small op-button-style-outline" data-color="secondary-60" data-icon="arrow-right" data-icon-position="right">
                            <span class="op-icon" role="img" aria-label="Arrow Right Icon"></span>
                            <span class="op-button-title"><?= esc_attr( $acf['button_next'] ) ?></span>
                        </button>
                        <button type="submit" form="<?= esc_attr($id) ?>__form" value="Submit" onclick="opCreateTemplate(); return false" class="op-button-save op-button op-button-size-small op-button-style-solid" data-color="secondary-60" data-icon="floppy-disk" data-icon-position="left">
                            <span class="op-icon" role="img" aria-label="Floppy Disk Icon"></span>
                            <span class="op-button-title"><?= esc_attr( $acf['button_save'] ) ?></span>
                        </button>
                    </div>
                </div>

            </div><!-- .op-form__inner -->
        </form><!-- .op-form-steps -->

        <div class="op-modal" data-relocation-event-creation="<?= esc_attr( $acf['event_creation_link'] ) ?>">
            <div class="op-modal__inner">
                <div class="op-flex-col">
                    <h3 class="op-modal-title"><?= esc_attr( $acf['modal_title'] ) ?></h3>
                    <p class="op-modal-description"><?= esc_attr( $acf['modal_description'] ) ?></p>
                </div>
                <div class="op-flex-row">
                    <a href="<?= esc_attr( $acf['main_link'] ) ?>" class="op-button op-button-size-small op-button-style-outline" data-color="primary-100" data-icon="arrow-left" data-icon-position="left">
                        <span class="op-icon" role="img" aria-label="Arrow Left Icon"></span>
                        <span class="op-button-title"><?= esc_attr( $acf['main_title'] ) ?></span>
                    </a>
                    <a class="op-button-event-creation op-button op-button-size-small op-button-style-outline" data-color="primary-100" data-icon="arrow-right" data-icon-position="right">
                        <span class="op-icon" role="img" aria-label="Arrow Right Icon"></span>
                        <span class="op-button-title"><?= esc_attr( $acf['event_creation_title'] ) ?></span>
                    </a>
                </div>
            </div>
        </div>
        
    </div><!-- .op-block__inner -->
</section><!-- #<?= esc_attr($id) ?> -->