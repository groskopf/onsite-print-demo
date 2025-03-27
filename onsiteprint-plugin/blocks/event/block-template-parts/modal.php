<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Modal
 ?  Updated: 2025-03-20 - 03:15 (Y:m:d - H:i)
 ?  Info: (PHP) Added new Textarea to Modal (note).
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */
?>

<div class="op-modal">
    <div class="op-modal__inner">
        <div class="op-modal-header">
            <h3 class="op-modal-title"><?= esc_attr( $modal['title'] ) ?></h3>
            <button type="button" onclick="opToggleActive( 'class', 'op-modal ' ), opToggleActive( 'class', 'wp-block-post-content', 'op-modal-active' )" class="op-button-cancel op-button op-button-size-small op-button-style-outline" data-color="primary-90" data-icon="xmark" data-icon-position="right" data-title-visibility="1">
                <span class="op-icon" role="img" aria-label="X Mark Icon"></span>
                <span class="op-button-title"><?= esc_attr( $modal['cancel_button'] ) ?></span>
            </button>
            <p class="op-modal-description"><?= esc_attr( $modal['description'] ) ?></p>
        </div>

        <form id="<?= esc_attr( $id ) ?>__form" class="op-form op-form-fields op-flex-col" action="POST">

            <button type="submit" disabled style="display: none" aria-hidden="true"></button>

            <div class="op-form__inner op-flex-col">

                <div class="op-form-content op-flex-col">

                    <fieldset class="op-fieldset-step" data-validation="0">
                        <div class="op-fieldset__inner op-flex-col">
                            
                            <label for="<?= esc_attr($id) ?>-column-1-input" class="op-input-wrapper">
                                <p class="op-label-title"><span class="op-text"><?= esc_attr( $header['column'] ) ?></span><span class="op-number">1</span></p>
                                <div class="op-input-field">
                                    <input id="<?= esc_attr($id) ?>-column-1-input" class="op-input-border" name="column-1" type="text">
                                </div>
                            </label>

                            <label for="<?= esc_attr($id) ?>-column-2-input" class="op-input-wrapper">
                                <p class="op-label-title"><span class="op-text"><?= esc_attr( $header['column'] ) ?></span><span class="op-number">2</span></p>
                                <div class="op-input-field">
                                    <input id="<?= esc_attr($id) ?>-column-2-input" class="op-input-border" name="column-2" type="text">
                                </div>
                            </label>

                            <label for="<?= esc_attr($id) ?>-column-3-input" class="op-input-wrapper">
                                <p class="op-label-title"><span class="op-text"><?= esc_attr( $header['column'] ) ?></span><span class="op-number">3</span></p>
                                <div class="op-input-field">
                                    <input id="<?= esc_attr($id) ?>-column-3-input" class="op-input-border" name="column-3" type="text">
                                </div>
                            </label>

                            <label for="<?= esc_attr($id) ?>-column-4-input" class="op-input-wrapper">
                                <p class="op-label-title"><span class="op-text"><?= esc_attr( $header['column'] ) ?></span><span class="op-number">4</span></p>
                                <div class="op-input-field">
                                    <input id="<?= esc_attr($id) ?>-column-4-input" class="op-input-border" name="column-4" type="text">
                                </div>
                            </label>

                            <label for="<?= esc_attr($id) ?>-column-5-input" class="op-input-wrapper">
                                <p class="op-label-title"><span class="op-text"><?= esc_attr( $header['column'] ) ?></span><span class="op-number">5</span></p>
                                <div class="op-input-field">
                                    <input id="<?= esc_attr($id) ?>-column-5-input" class="op-input-border" name="column-5" type="text">
                                </div>
                            </label>

                            <label for="<?= esc_attr($id) ?>-note-input" class="op-input-wrapper">
                                <p class="op-label-title"><span class="op-text"><?= esc_attr( $modal['note'] ) ?></span></p>
                                <div class="op-input-field">
                                    <textarea id="<?= esc_attr($id) ?>-note-input" class="op-input-border" name="note" rows="3"></textarea>
                                </div>
                            </label>

                            <div class="op-form-validation" data-icon="circle-exclamation">
                                <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
                                <span class="op-message"><?= esc_attr( $modal['messages_error'] ) ?></span>
                            </div>

                        </div>

                    </fieldset>
                    
                    <button type="button" onclick="" class="op-button-save op-button op-button-size-medium op-button-style-solid" data-color="primary-90">
                        <span class="op-button-title"><?= esc_attr( $modal['add_button'] ) ?></span>
                    </button>
                
                </div>

            </div><!-- .op-form__inner -->
        </form><!-- .op-form-fields -->

    </div>
</div><!-- .op-modal -->