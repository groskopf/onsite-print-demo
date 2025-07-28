<?php
/* ------------------------------------------------------------------------
 *  Modal Part Name: Create Participant Template
 ?  Updated: 2025-07-28 - 03:42 (Y:m:d - H:i)
 ?  Info: Added "disabled" to the Save Button.
---------------------------------------------------------------------------
 #  The Modal Part - Content
--------------------------------------------------------------------------- */
?>

<template id="<?= esc_attr($id) ?>-create-participant-template">
    
    <div class="op-header-content__inner">
        
        <h3 class="op-modal-title" data-icon="user">
            <span class="op-icon" role="img" aria-label="User Icon"></span>
            <span class="op-text"><?= esc_attr( $modal['title'] ) ?></span>
        </h3>
    
        <p class="op-modal-description"><?= esc_attr( $modal['description'] ) ?></p>

        <div class="op-form-validation" data-icon="circle-exclamation">
            <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
            <span class="op-message"><?= esc_attr( $modal['messages_error'] ) ?></span>
        </div>

    </div>
    
    <div class="op-modal-content__inner">
        
        <div class="op-modal-overflow">
            <div class="op-modal-overflow__inner">

                <form id="<?= esc_attr( $id ) ?>__form" class="op-form op-form-fields op-flex-col" action="POST">

                    <button type="submit" disabled style="display: none" aria-hidden="true"></button>

                    <div class="op-form__inner op-flex-col">

                        <div class="op-form-content op-flex-col">

                            <fieldset class="op-fieldset-step" data-validation="0">

                                <div class="op-fieldset__inner op-flex-col">

                                    <label for="<?= esc_attr($id) ?>-column-1-input" class="op-input-wrapper op-col-input">
                                        <p class="op-label-title"><span class="op-text"><?= esc_attr( $header['column'] ) ?></span><span class="op-number">1</span></p>
                                        <div class="op-input-field">
                                            <input id="<?= esc_attr($id) ?>-column-1-input" class="op-input-border" name="column-1" type="text" maxlength="60">
                                        </div>
                                    </label>

                                    <label for="<?= esc_attr($id) ?>-column-2-input" class="op-input-wrapper op-col-input">
                                        <p class="op-label-title"><span class="op-text"><?= esc_attr( $header['column'] ) ?></span><span class="op-number">2</span></p>
                                        <div class="op-input-field">
                                            <input id="<?= esc_attr($id) ?>-column-2-input" class="op-input-border" name="column-2" type="text" maxlength="60">
                                        </div>
                                    </label>

                                    <label for="<?= esc_attr($id) ?>-column-3-input" class="op-input-wrapper op-col-input">
                                        <p class="op-label-title"><span class="op-text"><?= esc_attr( $header['column'] ) ?></span><span class="op-number">3</span></p>
                                        <div class="op-input-field">
                                            <input id="<?= esc_attr($id) ?>-column-3-input" class="op-input-border" name="column-3" type="text" maxlength="60">
                                        </div>
                                    </label>

                                    <label for="<?= esc_attr($id) ?>-column-4-input" class="op-input-wrapper op-col-input">
                                        <p class="op-label-title"><span class="op-text"><?= esc_attr( $header['column'] ) ?></span><span class="op-number">4</span></p>
                                        <div class="op-input-field">
                                            <input id="<?= esc_attr($id) ?>-column-4-input" class="op-input-border" name="column-4" type="text" maxlength="60">
                                        </div>
                                    </label>

                                    <label for="<?= esc_attr($id) ?>-column-5-input" class="op-input-wrapper op-col-input">
                                        <p class="op-label-title"><span class="op-text"><?= esc_attr( $header['column'] ) ?></span><span class="op-number">5</span></p>
                                        <div class="op-input-field">
                                            <input id="<?= esc_attr($id) ?>-column-5-input" class="op-input-border" name="column-5" type="text" maxlength="60">
                                        </div>
                                    </label>

                                    <label for="<?= esc_attr($id) ?>-note-input" class="op-input-wrapper">
                                        <p class="op-label-title"><span class="op-text"><?= esc_attr( $modal['note'] ) ?></span></p>
                                        <div class="op-input-field">
                                            <textarea id="<?= esc_attr($id) ?>-note-input" class="op-input-border" name="note" rows="3" maxlength="250"></textarea>
                                        </div>
                                    </label>

                                </div>

                            </fieldset>

                        </div>

                    </div>
                    
                </form><!-- .op-form-fields -->
            
            </div><!-- .op-modal-overflow__inner -->   
        </div><!-- .op-modal-overflow -->
        
        <div class="op-modal-buttons op-flex-col">
            
            <button type="button" class="op-button-save op-button op-button-size-medium op-button-style-solid" data-color="primary-90" disabled>
                <span class="op-button-title"><?= esc_attr( $modal['add_button'] ) ?></span>
            </button>
    
        </div><!-- .op-modal-buttons -->

    </div><!-- .op-modal-content__inner -->   

</template>