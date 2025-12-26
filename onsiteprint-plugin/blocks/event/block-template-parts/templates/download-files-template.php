<?php
/* ------------------------------------------------------------------------
 *  Modal Part Name: Download Files Template
 ?  Updated: 2025-12-26 - 03:36 (Y:m:d - H:i)
 ?  Info: Added Classes to the Download Buttons.
---------------------------------------------------------------------------
 #  The Modal Part - Content
--------------------------------------------------------------------------- */
?>

<template id="<?= esc_attr($id) ?>-download-files-template">

    <div class="op-header-content__inner">

        <button type="button" class="op-button-close op-cancel_download-files op-button op-button-size-small op-button-style-outline" data-color="primary-90" data-icon="xmark" data-icon-position="right" data-title-visibility="1">
            <span class="op-icon" role="img" aria-label="X Mark Icon"></span>
            <span class="op-button-title"><?= esc_attr($modal['close_button']) ?></span>
        </button>

        <h3 class="op-modal-title" data-icon="download">
            <span class="op-icon" role="img" aria-label="Download"></span>
            <span class="op-text"><?= esc_attr($modal_df['title']) ?></span>
        </h3>

        <p class="op-modal-description"><?= esc_attr($modal_df['description']) ?></p>

    </div>

    <div class="op-modal-content__inner">

        <div class="op-modal-overflow">
            <div class="op-modal-overflow__inner op-flex-row">

                <button class="op-button-download-csv op-button op-button-size-medium op-button-style-outline op-flex-fill" data-color="primary-90" data-icon="file-csv" data-icon-position="left" onclick="opDownloadEventParticipants('csv', <?= esc_attr($options['event_id']) ?>)">
                    <span class="op-icon" role="img" aria-label="CSV File Icon"></span>
                    <span class="op-button-title"><?= esc_attr($modal_df['download_csv']) ?></span>
                </button>
                <button class="op-button-download-pdf op-button op-button-size-medium op-button-style-outline op-flex-fill" data-color="primary-90" data-icon="file-pdf" data-icon-position="left" onclick="opDownloadEventParticipants('pdf', <?= esc_attr($options['event_id']) ?>)">
                    <span class="op-icon" role="img" aria-label="PDF File Icon"></span>
                    <span class="op-button-title"><?= esc_attr($modal_df['download_pdf']) ?></span>
                </button>

            </div><!-- .op-modal-overflow__inner -->
        </div><!-- .op-modal-overflow -->

    </div><!-- .op-modal-content__inner -->

</template>