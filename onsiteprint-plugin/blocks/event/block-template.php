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
 ?  Updated: 2025-03-20 - 03:15 (Y:m:d - H:i)
 ?  Info: (PHP) Added New variable to Modal (note), used in /modal.php (Event).

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
    'download_csv'      => get_field( $path . 'header_columns_download_csv' ) ?: 'Download CSV',
    'download_pdf'      => get_field( $path . 'header_columns_download_pdf' ) ?: 'Download PDF',
    'add_participant'   => get_field( $path . 'header_columns_add_participant' ) ?: 'Add new Participant',
);

$modal = array(
    'title'             => get_field( $path . 'modal_title' ) ?: 'Add new Participant',
    'description'       => get_field( $path . 'modal_description' ) ?: 'Below you can enter the information about the participant.',
    'messages_error'    => get_field( $path . 'modal_messages_error' ) ?: 'One or more columns must be filled!',
    'cancel_button'     => get_field( $path . 'modal_cancel_button' ) ?: 'Cancel',
    'add_button'        => get_field( $path . 'modal_add_button' ) ?: 'Add new Participant',
    'note'              => get_field( $path . 'modal_note' ) ?: 'Extra Notes',
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