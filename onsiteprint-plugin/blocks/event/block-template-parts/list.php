<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: List
 ?  Updated: 2025-07-02 - 04:42 (Y:m:d - H:i)
 ?  Info: Added new folder to the Participant Template.
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */
?>

<div class="op-participant-rows op-flex-col">

    <?php ///// Validate if the user is logged in with a Wordpress login.
        if ( current_user_can( 'edit_posts' ) && is_admin() ) { ?>

        <article class="op-participant_test" data-validation="0" data-op-arrival="0" data-op-prints="0">
            <header>
                <p class="op-col-icon" data-icon="user">
                    <span class="op-icon" role="img" aria-label="User Icon"></span>
                </p>
                <div class="op-col-lines">
                    <p class="op-col-line-1">
                        <span class="op-label">1</span>
                        <span class="op-text">Thor</span>
                    </p>
                    <p class="op-col-line-2">
                        <span class="op-label">2</span>
                        <span class="op-text">Gud (Nordisk mytologi)</span>
                    </p>
                    <p class="op-col-line-3">
                        <span class="op-label">3</span>
                        <span class="op-text">Valhalla A/S</span>
                    </p>
                </div>
                <time class="op-col-arrival-time" datetime=""></time>
                <div class="op-col-print-info">
                    <button class="op-participant-print op-button op-button-size-medium op-button-style-solid" data-color="primary-90" data-icon="print" data-icon-position="left"><span class="op-icon" role="img" aria-label="Printer Icon"></span><span class="op-button-title"><?= esc_attr( $list['print_button'] ) ?></span></button>
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

        <article class="op-participant_test op-active" data-validation="1" data-op-arrival="0" data-op-prints="0">
            <header>
                <p class="op-col-icon" data-icon="user">
                    <span class="op-icon" role="img" aria-label="User Icon"></span>
                </p>
                <div class="op-col-lines">
                    <p class="op-col-line-1">
                        <span class="op-label">1</span>
                        <span class="op-text">Freja</span>
                    </p>
                    <p class="op-col-line-2">
                        <span class="op-label">2</span>
                        <span class="op-text">Gud (Nordisk mytologi)</span>
                    </p>
                    <p class="op-col-line-3">
                        <span class="op-label">3</span>
                        <span class="op-text">Valhalla A/S</span>
                    </p>
                </div>
                <time class="op-col-arrival-time" datetime="2000-01-01 12:00">12:00</time>
                <div class="op-col-print-info">
                    <button class="op-participant-print op-button op-button-size-medium op-button-style-solid" data-color="primary-90" data-icon="print" data-icon-position="left"><span class="op-icon" role="img" aria-label="Printer Icon"></span><span class="op-button-title"><?= esc_attr( $list['print_button'] ) ?></span></button>
                    <p class="op-col-amount-of-prints">0</p>
                </div>
            </header>
            <footer>
                <p class="op-message" data-icon="user">
                    <span class="op-icon" role="img" aria-label="User Icon"></span>
                    <span class="op-text"><?= esc_attr( $list['messages_printing'] ) ?></span>
                </p>
                <time class="op-col-arrival-time" datetime="2000-01-01 16:20" data-icon="clock">
                    <span class="op-icon" role="img" aria-label="Clock Icon"></span>
                    <span class="op-text">12:00</span>
                </time>
            </footer>
        </article>

        <article class="op-participant_test op-active" data-validation="2" data-op-arrival="1" data-op-prints="1">
            <header>
                <p class="op-col-icon" data-icon="user">
                    <span class="op-icon" role="img" aria-label="User Icon"></span>
                </p>
                <div class="op-col-lines">
                    <p class="op-col-line-1">
                        <span class="op-label">1</span>
                        <span class="op-text">Heimdal</span>
                    </p>
                    <p class="op-col-line-2">
                        <span class="op-label">2</span>
                        <span class="op-text">Gud (Nordisk mytologi)</span>
                    </p>
                    <p class="op-col-line-3">
                        <span class="op-label">3</span>
                        <span class="op-text">Valhalla A/S</span>
                    </p>
                </div>
                <time class="op-col-arrival-time" datetime="2000-01-01 12:10">12:10</time>
                <div class="op-col-print-info">
                    <button class="op-participant-print op-button op-button-size-medium op-button-style-solid" data-color="primary-90" data-icon="print" data-icon-position="left"><span class="op-icon" role="img" aria-label="Printer Icon"></span><span class="op-button-title"><?= esc_attr( $list['print_button'] ) ?></span></button>
                    <p class="op-col-amount-of-prints">1</p>
                </div>
            </header>
            <footer>
                <p class="op-message" data-icon="user">
                    <span class="op-icon" role="img" aria-label="User Icon"></span>
                    <span class="op-text"><?= esc_attr( $list['messages_success'] ) ?></span>
                </p>
                <time class="op-col-arrival-time" datetime="2000-01-01 16:20" data-icon="clock">
                    <span class="op-icon" role="img" aria-label="Clock Icon"></span>
                    <span class="op-text">12:10</span>
                </time>
            </footer>
        </article>

        <article class="op-participant_test op-active" data-validation="3" data-op-arrival="0" data-op-prints="0">
            <header>
                <p class="op-col-icon" data-icon="circle-exclamation">
                    <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
                </p>
                <div class="op-col-lines">
                    <p class="op-col-line-1">
                        <span class="op-label">1</span>
                        <span class="op-text">Odin</span>
                    </p>
                    <p class="op-col-line-2">
                        <span class="op-label">2</span>
                        <span class="op-text">Gud (Nordisk mytologi)</span>
                    </p>
                    <p class="op-col-line-3">
                        <span class="op-label">3</span>
                        <span class="op-text">Valhalla A/S</span>
                    </p>
                </div>
                <time class="op-col-arrival-time" datetime="2000-01-01 12:20">12:20</time>
                <div class="op-col-print-info">
                    <button class="op-participant-print op-button op-button-size-medium op-button-style-solid" data-color="primary-90" data-icon="print" data-icon-position="left"><span class="op-icon" role="img" aria-label="Printer Icon"></span><span class="op-button-title"><?= esc_attr( $list['print_button'] ) ?></span></button>
                    <p class="op-col-amount-of-prints">0</p>
                </div>
            </header>
            <footer>
                <p class="op-message" data-icon="circle-exclamation">
                    <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
                    <span class="op-text"><?= esc_attr($list['messages_error']) ?></span>
                </p>
                <time class="op-col-arrival-time" datetime="2000-01-01 16:20" data-icon="clock">
                    <span class="op-icon" role="img" aria-label="Clock Icon"></span>
                    <span class="op-text">12:20</span>
                </time>
            </footer>
        </article>

    <?php } else { ?>

        <article class="op-participant_skeleton op-active op-fade-in">
            <p class="op-flex-col">
                <span class="op-shimmer"></span>
                <span class="op-text">Loading...</span>
            </p>
        </article>
        <article class="op-participant_skeleton op-active op-fade-in">
            <p class="op-flex-col">
                <span class="op-shimmer"></span>
                <span class="op-text">Loading...</span>
            </p>
        </article>
        <article class="op-participant_skeleton op-active op-fade-in">
            <p class="op-flex-col">
                <span class="op-shimmer"></span>
                <span class="op-text">Loading...</span>
            </p>
        </article>

    <?php 

        require( __DIR__ . '/templates/participant-template.php' );

    } ?>

</div><!-- .op-participant-rows -->