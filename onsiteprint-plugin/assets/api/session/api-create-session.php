<?php
/* ------------------------------------------------------------------------

 *  Plugin Name: OnsitePrint Plugin
 *  Description: Creating a PHP Session in the Browser with Booking Information.
 *  Author: Gerdes Group
 *  Author URL: https://www.clarify.nu/
 *
 *  @link: https://stackoverflow.com/questions/22221807/session-cookies-http-secure-flag-how-do-you-set-these
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 * 
 *  Version: 1.0.0
 ?  Updated: 2023-12-22 - 04:37 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  The Content
--------------------------------------------------------------------------- */

try {

    //// Get Basic Functions.
    require_once( '../../../basic.php' );

    //// Check if Login Session exist.
    checkLoginSession();

    //// Create the Booking Code variable.
    $bookingCode = $_POST['booking-code'];

    if ( $_SERVER['REQUEST_METHOD'] !== 'POST' ) {

        //// Send Error Response.
        sendResponse( 400, array( 'message' => 'Wrong Request Method!' ), __LINE__ );

    } else {
       
        //// Create new API Request (Get Booking).
        $getBooking = new apiRequest();
        $getBooking -> url = 'https://udviklingogtest.onsiteprint.dk/wp-content/plugins/onsiteprint-plugin/assets/api/fastapi/api-get-booking.php';
        $getBooking -> fields = array( 'booking-code' => $bookingCode );

        //// The Response from the API Request.
        $booking = json_decode( $getBooking -> post() );

        if ( $booking->code !== 200 ) {

            //// Send Error Response.
            sendResponse( $booking->code, $booking->response, __LINE__ );

        }

        //// Create new API Request (Get Layouts with Name Tag Type).
        $getLayouts = new apiRequest();
        $getLayouts -> url = 'https://udviklingogtest.onsiteprint.dk/wp-content/plugins/onsiteprint-plugin/assets/api/fastapi/api-get-layouts_name-tag-type.php';
        $getLayouts -> fields = array( 'name-tag-type' => $booking->response->booking->name_tag_type  );

        //// The Response from the API Request.
        $layouts = json_decode( $getLayouts -> post() );

        if ( $layouts->code !== 200 ) {

            //// Send Error Response.
            sendResponse( $layouts->code, $layouts->response, __LINE__ );

        }

        //// Create Session Item.
        $sessionItem = array(
            'bookingCode'           => $booking->response->booking->booking_code, 
            'bookingStartDate'      => $booking->response->booking->start_date, 
            'bookingEndDate'        => $booking->response->booking->end_date,
            'printerID'             => $booking->response->booking->printer_code, 
            'nameTagType'           => array(
                'nameTagTypeID'         => $booking->response->booking->name_tag_type, 
                'nameTagTypeLayouts'    => $layouts->response->nameTagType->layouts
            )
        );        

        //// Create Cookie Options.
        $cookieOptions = array (
            'expires' => strtotime( $booking->response->booking->end_date ), 
            //'expires' => strtotime("+60 seconds"), 
            'path' => '/', 
            //'domain' => '', // '.example.com' leading dot for compatibility or use subdomain
            'secure' => true,     // or false
            'httponly' => true,    // or false
            'samesite' => 'Strict' // None || Lax  || Strict
        );

        //// Set Cookie in Browser.
        setcookie('OP_PLUGIN_DATA_SESSION', json_encode( $sessionItem ), $cookieOptions);
        
        //// Send Approved Response.
        //sendResponse( 201, array( 'message' => 'The Session was Created!', 'session' => $sessionItem ), __LINE__ );
        sendResponse( 201, array( 'message' => 'The Session was Created!' ), __LINE__ );

    }
    
} catch( PDOException $exception ) {

    ///// Only echo when debugging.
    //echo $exception;
    sendResponse( 500, array( 'details' => 'System under maintaining.' ), __LINE__ );

}