<?php
/* ------------------------------------------------------------------------

 *  The OnsitePrint (Event) Block.
 *  Displaying a List of Participants of the current Event with search functionality, if the User is logged in.
 *
 *  @link https://www.advancedcustomfields.com/resources/
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 ?  Updated: 2025-08-20 - 03:19 (Y:m:d - H:i)
 ?  Info: Changed the Modal variable.

---------------------------------------------------------------------------
 #  Redirect if User is not Logged In
--------------------------------------------------------------------------- */

require_once( __DIR__.'/../../private/session.php' );

/* ------------------------------------------------------------------------
 #  The Block Data
--------------------------------------------------------------------------- */

$path = 'event_';

$options = array(
    'event_id'          => empty( $_GET['event'] ) ? false : $_GET['event'],
    'enable_search'     => get_field( $path . 'enable_search' ) ? true : false,
);

$header = array(
    'search_message'    => get_field( $path . 'header_search_message' ) ?: 'Search for Participants here...',
    'search_filter'     => get_field( $path . 'header_search_filter' ) ?: 'All Columns',
    'column'            => get_field( $path . 'header_columns_col' ) ?: 'Column',
    'add_participant'   => get_field( $path . 'header_columns_add_participant' ) ?: 'Add new Participant',
);

$modal = array(
    'cp_path'           => $path . 'modal_create_participant_',
    'df_path'           => $path . 'modal_download_files_',
    'cp'                => array(
        'title'             => get_field( $modal[0] . 'title' ) ?: 'Add new Participant',
        'description'       => get_field( $modal[0] . 'description' ) ?: 'Below you can enter the information about the participant.',
        'messages_error'    => get_field( $modal[0] . 'messages_error' ) ?: 'At least one Column must be Filled!',
        'add_button'        => get_field( $modal[0] . 'add_button' ) ?: 'Add new Participant',
        'note'              => get_field( $modal[0] . 'note' ) ?: 'Extra Notes',
    ),
    'df'                => array(
        'title'             => get_field( $modal[1] . 'title' ) ?: 'Download List',
        'description'       => get_field( $modal[1] . 'description' ) ?: 'Below you can download the Participant List in CSV or PDF format.',
        'download_csv'      => get_field( $modal[1] . 'download_csv_button' ) ?: 'CSV File',
        'download_pdf'      => get_field( $modal[1] . 'download_pdf_button' ) ?: 'PDF File',
    ),
    'close_button'      => get_field( $path . 'modal_close_button' ) ?: 'Close',
    'error_title'       => get_field( $path . 'modal_error_title' ) ?: 'Something went wrong!',
    'error_description' => get_field( $path . 'modal_error_description' ) ?: 'Please try again and contact us if the error continues to persist.',
    'error_button'      => get_field( $path . 'modal_error_button' ) ?: 'Reload the page',
);

$list = array(  
    'print_button'      => get_field( $path . 'list_print_button' ) ?: 'Print',
    'messages_printing' => get_field( $path . 'list_messages_printing' ) ?: 'Printer Participant...',
    'messages_success'  => get_field( $path . 'list_messages_success' ) ?: 'Participant was successfully printed.', 
    'messages_error'    => get_field( $path . 'list_messages_error' ) ?: 'Something went wrong while printing!', 
);

$id = 'op-' . $block['id'];

if( ! empty( $block['anchor'] ) ) {
	$id = $block['anchor'];
}

$className = 'op-block__event op-flex-col alignfull';

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

<section id="<?= esc_attr( $id ) ?>" class="<?= esc_attr( $className ) ?>" data-event-id="<?= esc_attr( $options['event_id'] ) ?>" data-print-active="<?= esc_attr( $list['messages_printing'] ) ?>" data-print-success="<?= esc_attr( $list['messages_success'] ) ?>" data-print-error="<?= esc_attr( $list['messages_error'] ) ?>" data-print-button="<?= esc_attr( $list['print_button'] ) ?>"  data-column-count="5">
    <div class="op-block__inner op-flex-col">

    <?php

        require( __DIR__ . '/block-template-parts/header.php' );
        require( __DIR__ . '/block-template-parts/modal.php' );
        require( __DIR__ . '/block-template-parts/list.php' );
        
    ?>

    </div><!-- .op-block__inner -->
</section><!-- #<?= esc_attr( $id ) ?> -->