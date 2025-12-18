<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Header
 ?  Updated: 2025-12-18 - 01:10 (Y:m:d - H:i)
 ?  Info: Removed functions and added new query and filter values.
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */
?>

<header>

    <?php if ( $header['enable_search'] ) { ?>

    <div class="op-participants-search">
        <form class="op-search-form" data-search-active="<?= ( isset( $header['query'] ) && $header['query'] !== '' ) ? 1 : 0 ?>" action="POST" onsubmit="return false">
            <label for="<?= esc_attr( $id ) ?>__search-input" class="op-search-label" data-icon="magnifying-glass">
                <span class="op-icon" role="img" aria-label="Search Icon"></span>
                <input id="<?= esc_attr( $id ) ?>__search-input" name="op-search-input" type="search" placeholder="<?= esc_attr( $header['search_message'] ) ?>" value="<?= esc_attr( $header['query'] ) ?>">
            </label>
            <div class="op-search-cancel" data-icon="xmark">
                <span class="op-icon" role="img" aria-label="Cancel Icon"></span>
            </div>
            <fieldset class="op-search-filter">
                <input id="<?= esc_attr( $id ) ?>__filter-button" name="op-filter-button" type="checkbox" value="Filter">
                <label for="<?= esc_attr( $id ) ?>__filter-button" class="op-filter-label op-button op-button-size-small op-button-style-outline" data-color="primary-100" data-icon="sliders" data-icon-position="left">
                    <span class="op-icon" role="img" aria-label="Filter Icon"></span>
                    <span class="op-button-title"><?= esc_attr( $header['search_filter'] ) ?></span>
                </label>
                <div class="op-filter-options">
                    <label for="<?= esc_attr( $id ) ?>__filter-input-0" class="op-filter-input-label">
                        <input type="radio" id="<?= esc_attr( $id ) ?>__filter-input-0" name="op-filter-input" value="all" <?= ( $header['filter'] === 'all') ? 'checked' : ''; ?>>
                        <span class="op-check"></span>
                        <span class="op-text"><?= esc_attr( $header['search_filter'] ) ?></span>
                    </label>
                    <label for="<?= esc_attr( $id ) ?>__filter-input-1" class="op-filter-input-label">
                        <input type="radio" id="<?= esc_attr( $id ) ?>__filter-input-1" name="op-filter-input" value="line1" <?= ( $header['filter'] === 'line1') ? 'checked' : ''; ?>>
                        <span class="op-check"></span>
                        <span class="op-text"><?= esc_attr( $header['column'] ) ?> 1</span>
                    </label>
                    <label for="<?= esc_attr( $id ) ?>__filter-input-2" class="op-filter-input-label">
                        <input type="radio" id="<?= esc_attr( $id ) ?>__filter-input-2" name="op-filter-input" value="line2" <?= ( $header['filter'] === 'line2') ? 'checked' : ''; ?>>
                        <span class="op-check"></span>
                        <span class="op-text"><?= esc_attr( $header['column'] ) ?> 2</span>
                    </label>
                    <label for="<?= esc_attr( $id ) ?>__filter-input-3" class="op-filter-input-label">
                        <input type="radio" id="<?= esc_attr( $id ) ?>__filter-input-3" name="op-filter-input" value="line3" <?= ( $header['filter'] === 'line3' ) ? 'checked' : ''; ?>>
                        <span class="op-check"></span>
                        <span class="op-text"><?= esc_attr( $header['column'] ) ?> 3</span>
                    </label>
                    <label for="<?= esc_attr( $id ) ?>__filter-input-4" class="op-filter-input-label">
                        <input type="radio" id="<?= esc_attr( $id ) ?>__filter-input-4" name="op-filter-input" value="line4" <?= ( $header['filter'] === 'line4' ) ? 'checked' : ''; ?>>
                        <span class="op-check"></span>
                        <span class="op-text"><?= esc_attr( $header['column'] ) ?> 4</span>
                    </label>
                    <label for="<?= esc_attr( $id ) ?>__filter-input-5" class="op-filter-input-label">
                        <input type="radio" id="<?= esc_attr( $id ) ?>__filter-input-5" name="op-filter-input" value="line5" <?= ( $header['filter'] === 'line5' ) ? 'checked' : ''; ?>>
                        <span class="op-check"></span>
                        <span class="op-text"><?= esc_attr( $header['column'] ) ?> 5</span>
                    </label>
                </div>
            </fieldset>
        </form>
    </div>

    <?php } ?>

    <div class="op-participant-col-info">
        <p class="op-col-user" data-icon="user">
            <span class="op-icon" role="img" aria-label="User Icon"></span>
        </p>
        <p class="op-col-line-1"><span class="op-text"><?= esc_attr( $header['column'] ) ?></span><span class="op-number">1</span></p>
        <p class="op-col-line-2"><span class="op-text"><?= esc_attr( $header['column'] ) ?></span><span class="op-number">2</span></p>
        <p class="op-col-line-3"><span class="op-text"><?= esc_attr( $header['column'] ) ?></span><span class="op-number">3</span></p>
        <p class="op-col-line-4"><span class="op-text"><?= esc_attr( $header['column'] ) ?></span><span class="op-number">4</span></p>
        <p class="op-col-line-5"><span class="op-text"><?= esc_attr( $header['column'] ) ?></span><span class="op-number">5</span></p>
        <p class="op-col-arrival-time" data-icon="clock">
            <span class="op-icon" role="img" aria-label="Clock Icon"></span>
        </p>
        <p class="op-col-amount-of-prints" data-icon="print">
            <span class="op-icon" role="img" aria-label="Printer Icon"></span>
        </p>
        <div class="op-dropdown-menu" data-dropdown-position="right">
            <button name="dropdown" type="button" class="op-button op-button-size-small op-button-style-outline" data-color="primary-90" data-icon="ellipsis" data-icon-position="left">
                <span class="op-icon" role="img" aria-label="Ellipsis Icon"></span>
                <span class="op-button-title"><?= esc_attr( $header['shortcuts'] ) ?></span>
            </button>
            <div class="op-dropdown">
                <button name="add-participant" type="button" class="op-button op-button-size-small op-button-style-outline" data-color="accent-60" data-icon="user-plus" data-icon-position="left">
                    <span class="op-icon" role="img" aria-label="User Plus Icon"></span>
                    <span class="op-button-title"><?= esc_attr( $header['add_participant'] ) ?></span>
                </button>
                <button name="download" type="button" class="op-button op-button-size-small op-button-style-outline" data-color="accent-60" data-icon="download" data-icon-position="left">
                    <span class="op-icon" role="img" aria-label="Download Icon"></span>
                    <span class="op-button-title"><?= esc_attr( $header['download'] ) ?></span>
                </button>
            </div>
        </div>
    </div>

</header>