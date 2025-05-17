<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Participant Template
 ?  Updated: 2025-05-17 - 05:28 (Y:m:d - H:i)
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */
?>

<template id="<?= esc_attr($id) ?>-participant-template">
    <article class="op-participant" data-validation="0" data-op-prints="0">
        <header>
            <p class="op-col-icon" data-icon="user">
                <span class="op-icon" role="img" aria-label="User Icon"></span>
            </p>
            <div class="op-col-lines">
                <p class="op-col-line-1">
                    <span class="op-label">1</span>
                    <span class="op-text"></span>
                </p>
                <p class="op-col-line-2">
                    <span class="op-label">2</span>
                    <span class="op-text"></span>
                </p>
                <p class="op-col-line-3">
                    <span class="op-label">3</span>
                    <span class="op-text"></span>
                </p>
                <p class="op-col-line-4">
                    <span class="op-label">4</span>
                    <span class="op-text"></span>
                </p>
                <p class="op-col-line-5">
                    <span class="op-label">5</span>
                    <span class="op-text"></span>
                </p>
            </div>
            <time class="op-col-arrival-time" datetime=""><span class="op-text"></span></time>
            <div class="op-col-print-info">
                <button class="op-participant-print op-button op-button-size-medium op-button-style-solid" data-color="primary-90" data-icon="print" data-icon-position="left">
                    <span class="op-icon" role="img" aria-label="Printer Icon"></span>
                    <span class="op-button-title"><?= esc_attr( $list['print_button'] ) ?></span>
                </button>
                <p class="op-col-amount-of-prints">0</p>
            </div>
        </header>
        <footer>
            <p class="op-message" data-icon="user">
                <span class="op-icon" role="img" aria-label="User Icon"></span>
                <span class="op-text"></span>
            </p>
            <time class="op-col-arrival-time" datetime="" data-icon="clock">
                <span class="op-icon" role="img" aria-label="Clock Icon"></span>
                <span class="op-text"></span>
            </time>
        </footer>
    </article>
</template>