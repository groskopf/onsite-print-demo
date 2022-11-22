<?php
/* ------------------------------------------------------------------------

 *  The OnsitePrint (Event Participant List) Block.
 *  Displaying the current Event List of Participants, if the User is logged in.
 *
 *  @link https://www.advancedcustomfields.com/resources/
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 ?  Updated: 2022-11-22 - 15:27 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  The Block Data
--------------------------------------------------------------------------- */

$epl = 'event_participant_list';

$epl_printActive = get_field( $epl . '_messages_print_active' ) ?: 'Printer Participant...';
$epl_printSuccess = get_field( $epl . '_messages_print_success' ) ?: 'Successfully printed.';

$epl_searchMessage = get_field( $epl . '_search_bar_message' ) ?: 'Search for Participants here...';
$epl_searchFilter = get_field( $epl . '_search_bar_filter' ) ?: 'All Columns';

$epl_elementsPrintAll = get_field( $epl . '_elements_button_print_all' ) ?: 'Print All';
$epl_elementsPrint = get_field( $epl . '_elements_button_print' ) ?: 'Print';

$epl_elementsCol1 = get_field( $epl . '_elements_columns_col1' ) ?: 'Column 1';
$epl_elementsCol2 = get_field( $epl . '_elements_columns_col2' ) ?: 'Column 2';
$epl_elementsCol3 = get_field( $epl . '_elements_columns_col3' ) ?: 'Column 3';
$epl_elementsCol4 = get_field( $epl . '_elements_columns_col4' ) ?: 'Column 4';
$epl_elementsCol5 = get_field( $epl . '_elements_columns_col5' ) ?: 'Column 5';

$eventId = ( ! empty( $_GET['event'] ) ) ? $_GET['event'] : false;

$id = 'op-' . $block['id'];

if( ! empty( $block['anchor'] ) ) {
	$id = $block['anchor'];
}

$className = 'op-event-participant-list';

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

<section id="<?= esc_attr($id) ?>" class="<?= esc_attr($className) ?>" data-event-id="<?= esc_attr($eventId) ?>" data-print-active="<?= esc_attr($epl_printActive) ?>" data-print-success="<?= esc_attr($epl_printSuccess) ?>" data-print-button="<?= esc_attr($epl_elementsPrint) ?>">
    <div class="op-block__inner">

        <header>

            <div class="op-participants-search">
                <form class="op-search-form" action="POST" onsubmit="return false">
                    <label for="<?= esc_attr($id) ?>__search-input" class="op-search-label" data-icon="magnifying-glass">
                        <span class="op-icon" role="img" aria-label="Filter Icon"></span>
                        <input id="<?= esc_attr($id) ?>__search-input" name="op-search-input" type="search" placeholder="<?= esc_attr($epl_searchMessage) ?>" oninput="opSearchEventParticipants()">
                    </label>
                    <fieldset class="op-search-filter">
                        <input id="<?= esc_attr($id) ?>__filter-button" name="op-filter-button" type="checkbox" value="Filter">
                        <label for="<?= esc_attr($id) ?>__filter-button" class="op-filter-label op-button op-button-size-small op-button-style-outline" data-color="primary-100" data-icon="sliders" data-icon-position="left">
                            <span class="op-icon" role="img" aria-label="Filter Icon"></span>
                            <span class="op-button-title"><?= esc_attr($epl_searchFilter) ?></span>
                        </label>
                        <div class="op-filter-options">
                            <label for="<?= esc_attr($id) ?>__filter-input-0" class="op-filter-input-label" onclick="opToggleSearchFilter('0')">
                                <input type="radio" id="<?= esc_attr($id) ?>__filter-input-0" name="op-filter-input" value="0" checked>
                                <span class="op-check"></span>
                                <span class="op-text"><?= esc_attr($epl_searchFilter) ?></span>
                            </label>
                        </div>
                    </fieldset>
                </form>
            </div>

            <div class="op-participant-col-info">
                <p class="op-col-icon" data-icon="user">
                    <span class="op-icon" role="img" aria-label="User Icon"></span>
                </p>
                <p class="op-col-line-1"><?= esc_attr($epl_elementsCol1) ?></p>
                <p class="op-col-line-2"><?= esc_attr($epl_elementsCol2) ?></p>
                <p class="op-col-line-3"><?= esc_attr($epl_elementsCol3) ?></p>
                <p class="op-col-arrival-time" data-icon="clock">
                    <span class="op-icon" role="img" aria-label="Clock Icon"></span>
                </p>
                <p class="op-col-amount-of-prints" data-icon="print">
                    <span class="op-icon" role="img" aria-label="Printer Icon"></span>
                </p>
                <button class="op-button op-button-size-medium op-button-style-outline"  data-color="primary-90" onclick="opPrintEventParticipants(<?= esc_attr($eventId) ?>)"><span class="op-button-title"><?= esc_attr($epl_elementsPrintAll) ?></span></button>
            </div>

        </header>

        <div class="op-participant-rows op-flex-col">
            <?php
                if ( current_user_can( 'read' ) ) { ?>
                    <article class="op-participant_test" data-op-arrival="0" data-op-prints="0">
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
                                <button class="op-participant-print op-button op-button-size-medium op-button-style-solid" data-color="primary-90" data-icon="print" data-icon-position="left"><span class="op-icon" role="img" aria-label="Printer Icon"></span><span class="op-button-title"><?= esc_attr($epl_elementsPrint) ?></span></button>
                                <p class="op-col-amount-of-prints">0</p>
                            </div>
                        </header>
                        <footer>
                            <p class="op-message" data-icon="user">
                                <span class="op-icon" role="img" aria-label="User Icon"></span>
                                <span class="op-text"><?= esc_attr($epl_printSuccess) ?></span>
                            </p>
                            <time class="op-col-arrival-time" datetime="" data-icon="clock">
                                <span class="op-icon" role="img" aria-label="Clock Icon"></span>
                                <span class="op-text"></span>
                            </time>
                        </footer>
                    </article>
                    <article class="op-participant_test op-active op-print-active" data-op-arrival="1" data-op-prints="1">
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
                            <time class="op-col-arrival-time" datetime="2000-01-01 16:20">16:20</time>
                            <div class="op-col-print-info">
                                <button class="op-participant-print op-button op-button-size-medium op-button-style-solid" data-color="primary-90" data-icon="print" data-icon-position="left"><span class="op-icon" role="img" aria-label="Printer Icon"></span><span class="op-button-title"><?= esc_attr($epl_elementsPrint) ?></span></button>
                                <p class="op-col-amount-of-prints">1</p>
                            </div>
                        </header>
                        <footer>
                            <p class="op-message" data-icon="user">
                                <span class="op-icon" role="img" aria-label="User Icon"></span>
                                <span class="op-text"><?= esc_attr($epl_printActive) ?></span>
                            </p>
                            <time class="op-col-arrival-time" datetime="2000-01-01 16:20" data-icon="clock">
                                <span class="op-icon" role="img" aria-label="Clock Icon"></span>
                                <span class="op-text">16:20</span>
                            </time>
                        </footer>
                    </article>
                    <article class="op-participant_test op-active" data-op-arrival="1" data-op-prints="1">
                        <header>
                            <p class="op-col-icon" data-icon="user">
                                <span class="op-icon" role="img" aria-label="User Icon"></span>
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
                            <time class="op-col-arrival-time" datetime="2000-01-01 16:20">16:20</time>
                            <div class="op-col-print-info">
                                <button class="op-participant-print op-button op-button-size-medium op-button-style-solid" data-color="primary-90" data-icon="print" data-icon-position="left"><span class="op-icon" role="img" aria-label="Printer Icon"></span><span class="op-button-title"><?= esc_attr($epl_elementsPrint) ?></span></button>
                                <p class="op-col-amount-of-prints">1</p>
                            </div>
                        </header>
                        <footer>
                            <p class="op-message" data-icon="user">
                                <span class="op-icon" role="img" aria-label="User Icon"></span>
                                <span class="op-text"><?= esc_attr($epl_printSuccess) ?></span>
                            </p>
                            <time class="op-col-arrival-time" datetime="2000-01-01 16:20" data-icon="clock">
                                <span class="op-icon" role="img" aria-label="Clock Icon"></span>
                                <span class="op-text">16:20</span>
                            </time>
                        </footer>
                    </article>
                <?php }
                else { ?>
                    <p class="op-flex-col">
                        <span class="op-text">Loading...</span>
                    </p>
                <?php }
            ?>
        </div>

    </div><!-- .block__inner -->
</section><!-- #<?= esc_attr($id) ?> -->