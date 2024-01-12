<?php
/* ------------------------------------------------------------------------

 *  Plugin Name: OnsitePrint Plugin
 *  Description: Creating a PHP Session in the Browser with Booking Information.
 *  Author: Gerdes Group
 *  Author URL: https://www.clarify.nu/
 *
 *  @link: https://stackoverflow.com/questions/22221807/session-cookies-http-secure-flag-how-do-you-set-these
 *  @link: https://en.wikipedia.org/wiki/Cross-site_request_forgery
 *  @link: https://en.wikipedia.org/wiki/Cryptographic_nonce
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 * 
 *  Version: 1.0.2
 ?  Updated: 2024-01-08 - 01:05 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  The Content
--------------------------------------------------------------------------- */
try {

    //// Get Basic Functions.
    require_once( '../../../basic.php' );

    //// Create the Booking Code variable.
    $bookingCode = $_POST[ 'booking-code' ];

    if ( $_SERVER[ 'REQUEST_METHOD' ] !== 'POST' ) {

        //// Send Error Response.
        sendResponse( 400, array( 'message' => 'Wrong Request Method!' ), __LINE__ );

    } elseif ( checkLoginSession() ) {

        //// Send Error Response.
		sendResponse( 400, array( 'message' => 'Login Session already exist!' ), __LINE__ );

    } else {

        //// Create new unique User Token ID.
        $userToken = time() . 123456;

        //// Create Session Cookie Options.
        $sessionCookieOptions = array (
            'expires' => strtotime( '+60 seconds' ),
            'path' => '/',
            //'domain' => '', // '.example.com' leading dot for compatibility or use subdomain
            'secure' => true,       // or false
            'httponly' => false,    // or false
            'samesite' => 'Strict'  // None || Lax || Strict
        );

        //// Set Session Cookie in Browser.
        setcookie( 'OP_PLUGIN_DATA_SESSION', $userToken, $sessionCookieOptions );
       
        //// Create new API Request (Get Booking).
        $getBooking = new opApiRequest();
        $getBooking -> url = getPluginUrl() . '/assets/api/fastapi/api-get-booking.php';
        $getBooking -> fields = array(
            'user-token' => $userToken,
            'booking-code' => $bookingCode
        );

        //// The Response from the API Request.
        $booking = json_decode( $getBooking -> post() );

        if ( $booking->code !== 200 ) {

            //// Send Error Response.
            sendResponse( $booking->code, $booking->response, __LINE__ );

        }

        //// Create new API Request (Get Layouts with Name Tag Type).
        $getLayouts = new opApiRequest();
        $getLayouts -> url = getPluginUrl() . '/assets/api/fastapi/api-get-layouts_name-tag-type.php';
        $getLayouts -> fields = array(
            'user-token' => $userToken,
            'name-tag-type' => $booking->response->booking->name_tag_type
        );

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

        //// Create User Cookie Options.
        $userCookieOptions = array (
            'expires' => strtotime( $booking->response->booking->end_date . "+1 day" ),
            'path' => '/',
            'secure' => true,     // or false
            'httponly' => true,    // or false
            'samesite' => 'Strict' // None || Lax || Strict
        );

        //// Create Session Cookie Options.
        $sessionCookieOptions = array (
            'expires' => strtotime( $booking->response->booking->end_date . "+1 day" ),
            'path' => '/',
            'secure' => true,       // or false
            'httponly' => false,    // or false
            'samesite' => 'Strict'  // None || Lax || Strict
        );

        //// Get variables from authorization.php ($serverURL, $serverToken).
        require_once( '../../../private/encryption.php' );

        //// Use openssl_encrypt() function to encrypt the data.
        $encryptedData = openssl_encrypt( json_encode( $sessionItem ), $method, $keyToken, $options, $userToken );

        //// Set Cookies in Browser.
        setcookie( 'OP_PLUGIN_DATA_USER', $encryptedData, $userCookieOptions );
        setcookie( 'OP_PLUGIN_DATA_SESSION', $userToken, $sessionCookieOptions );

        //// Send Approved Response.
        //sendResponse( 201, array( 'message' => 'The Session was Created!', 'session' => $sessionItem ), __LINE__ );
        sendResponse( 201, array( 'message' => 'The Session was Created!' ), __LINE__ );

    }

} catch( PDOException $exception ) {

    ///// Only echo when debugging.
    //echo $exception;
    sendResponse( 500, array( 'details' => 'System under maintaining.' ), __LINE__ );

}