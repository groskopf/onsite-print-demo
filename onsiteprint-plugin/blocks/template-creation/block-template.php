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
 ?  Updated: 2023-01-07 - 17:31 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  The Block Data
--------------------------------------------------------------------------- */

$tc = 'template_creation_';

$acf = array(
    'style_color'           => get_field( $tc . 'color' ),

    'header_title'          => get_field( $tc . 'header_title' ) ?: 'Create a new Template',
    'header_description'    => get_field( $tc . 'header_description' ) ?: 'Follow the steps below to complete your new template.',
    'header_step'           => get_field( $tc . 'header_step' ) ?: 'Step',
	'button_back'           => get_field( $tc . 'buttons_back_text' ) ?: 'Back',
    'button_next'           => get_field( $tc . 'buttons_next_text' ) ?: 'Next',
    'button_save'           => get_field( $tc . 'buttons_save_text' ) ?: 'Save Template',

    'step_1_process'        => get_field( $tc . 'steps_step_1_process' ) ?: 'Template Name',
    'step_1_title'          => get_field( $tc . 'steps_step_1_title' ) ?: 'Let’s start with the Template Name',
    'step_1_description'    => get_field( $tc . 'steps_step_1_description' ) ?: 'Some text her...',
    'step_1_field_1_title'  => get_field( $tc . 'steps_step_1_field_1_title' ) ?: 'Template Name',
    'step_1_field_1_val'    => get_field( $tc . 'steps_step_1_field_1_validation' ) ?: 'The input field is empty!',
    
    'step_2_process'        => get_field( $tc . 'steps_step_2_process' ) ?: 'Choose Layout',
    'step_2_title'          => get_field( $tc . 'steps_step_2_title' ) ?: 'What kind of layout are you looking for?',
    'step_2_description'    => get_field( $tc . 'steps_step_2_description' ) ?: 'Some text her...',
    'step_2_field_1_title'  => get_field( $tc . 'steps_step_2_field_1_title' ) ?: 'Layouts',
    'step_2_field_1_val'    => get_field( $tc . 'steps_step_2_field_1_validation' ) ?: 'One of the radio inputs must be checked!',

    'step_3_process'        => get_field( $tc . 'steps_step_3_process' ) ?: 'Select Image',
    'step_3_title'          => get_field( $tc . 'steps_step_3_title' ) ?: 'Please select your Image/Logo',
    'step_3_description'    => get_field( $tc . 'steps_step_3_description' ) ?: 'Some text her...',
    'step_3_field_1_title'  => get_field( $tc . 'steps_step_3_field_1_title' ) ?: 'Select/upload logo file',
    'step_3_field_1_val'    => get_field( $tc . 'steps_step_3_field_1_validation' ) ?: 'No file has been selected!',

    'step_4_process'        => get_field( $tc . 'steps_step_4_process' ) ?: 'Save Template',
    'step_4_title'          => get_field( $tc . 'steps_step_4_title' ) ?: 'Finally, save your new Template',
    'step_4_description'    => get_field( $tc . 'steps_step_4_description' ) ?: 'Some text her...',
    'step_4_field_1_title'  => get_field( $tc . 'steps_step_4_field_1_title' ) ?: 'Template Approval',
    'step_4_field_1_val'    => get_field( $tc . 'steps_step_4_field_1_validation' ) ?: 'The checkbox must be checked!',
    'step_4_field_1_value'  => get_field( $tc . 'steps_step_4_field_1_value' ) ?: 'I Approve the Template.',

    'modal_title'           => get_field( $tc . 'modal_title' ) ?: 'Template have been Saved!',
    'modal_description'     => get_field( $tc . 'modal_description' ) ?: 'Choose whether you want to go to the Dashboard or create a new Event with the new template.',
    'main_link'             => get_field_object( $tc . 'modal_relocate_main' )['value']['url'] ?: 'https://onsiteprint.dk/',
    'main_title'            => get_field_object( $tc . 'modal_relocate_main' )['value']['title'] ?: 'Front Page',
    'event_creation_link'   => get_field_object( $tc . 'modal_relocate_event_creation' )['value']['url'] ?: 'https://onsiteprint.dk/',
    'event_creation_title'  => get_field_object( $tc . 'modal_relocate_event_creation' )['value']['title'] ?: 'Create Event'
);

$styleColor = substr( $acf['style_color'], 0, strpos( $acf['style_color'], '-' ) );

$id = 'op-' . $block['id'];

if( ! empty( $block['anchor'] ) ) {
	$id = $block['anchor'];
}

$className = 'op-template-creation op-form op-flex-col';

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

<section id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?>" data-form-color="<?= esc_attr( $styleColor ) ?>">
    <div class="op-block__inner op-flex-col">

        <header class="op-block__header op-flex-col">
            <h2 class="op-block-title"><?= esc_attr( $acf['header_title'] ) ?></h2>
            <p class="op-block-description"><?= esc_attr( $acf['header_description'] ) ?></p>
        </header>

        <form id="<?= esc_attr($id) ?>__form" class="op-form-steps op-flex-fill" action="POST" data-form-step="1" data-form-steps="4"  data-form-step-last="false">

            <button type="submit" disabled style="display: none" aria-hidden="true"></button>
           
            <div class="op-form-process" data-steps-validated="0">
                <div class="op-form-process__inner">

                    <?php $form_steps = glob( __DIR__ . '/block-template-parts/block-form/steps/*' );

                    for ( $i=0; $i < count($form_steps); $i++ ) { 
                        
                        $num = $i + 1;
                        $color = ( $i == 0 ) ? $styleColor . '-60' : $styleColor . '-20'; ?>

                        <button type="button" onclick="opFormGoToStep( 'step-<?= $num ?>' ); return false" class="op-button op-button-size-medium op-button-style-solid" data-color="<?= $color ?>" data-icon="op-number-<?= $num ?>" data-icon-position="left" data-title-visibility="1" <?php if ( $i !== 0 ) echo 'disabled' ?>>
                            <span class="op-icon" role="img" aria-label="Number <?= $num ?> Icon"></span>
                            <span class="op-button-title"><?= esc_attr( $acf['step_' . $num . '_process'] ) ?></span>
                        </button>

                    <?php } ?>

                </div>
            </div>

            <div class="op-form__inner op-flex-col">

                <div class="op-form-content">

                    <?php foreach ( $form_steps as $step ) {
                        require( $step );
                    } ?>                   

                </div>
                
                <div class="op-form-directions">
                    <div class="op-col-left">
                        <button type="button" onclick="opFormGoToStep( 'back' ); return false" class="op-button-back op-button op-button-size-small op-button-style-outline" data-color="<?= esc_attr( $styleColor ) ?>-60" data-icon="arrow-left" data-icon-position="left">
                            <span class="op-icon" role="img" aria-label="Arrow Left Icon"></span>
                            <span class="op-button-title"><?= esc_attr( $acf['button_back'] ) ?></span>
                        </button>
                    </div>
                    <div class="op-col-right">
                        <button type="button" onclick="opFormGoToStep( 'next' ); return false" class="op-button-next op-button op-button-size-small op-button-style-outline" data-color="<?= esc_attr( $styleColor ) ?>-60" data-icon="arrow-right" data-icon-position="right" disabled>
                            <span class="op-icon" role="img" aria-label="Arrow Right Icon"></span>
                            <span class="op-button-title"><?= esc_attr( $acf['button_next'] ) ?></span>
                        </button>
                        <button type="button" onclick="opSaveNewTemplate(); return false" class="op-button-save op-button op-button-size-small op-button-style-solid" data-color="<?= esc_attr( $styleColor ) ?>-60" data-icon="floppy-disk" data-icon-position="left" disabled>
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