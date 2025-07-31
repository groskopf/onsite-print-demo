<?php
/* ------------------------------------------------------------------------

 *  Plugin Name: OnsitePrint Plugin
 *  Description: Getting the Booking from the FastAPI Server.
 *  Author: Gerdes Group
 *  Author URL: https://www.clarify.nu/
 *
 *  @link https://tutorialsclass.com/php-rest-api-get-data-using-curl/
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 * 
 *	Version: 1.0.0
 ?  Updated: 2023-12-20 - 03:50 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  The Content
--------------------------------------------------------------------------- */
try{

    //// Get Basic Functions.
    require_once( '../../../basic.php' );

    //// Create the Booking Code variable.
    $bookingCode = $_POST['booking-code'];

    if ( $_SERVER['REQUEST_METHOD'] !== 'POST' ) {

        //// Send Error Response.
        sendResponse( 400, array( 'message' => 'Wrong Request Method!' ), __LINE__ );

    } elseif ( ! $bookingCode ) {
            
        //// Send Error Response.
        return sendResponse( 400, array( 'message' => 'Missing the Booking Code!' ), __LINE__ );
        
    } elseif ( preg_match( '/^[0-9a-zA-Z]{15,}$/', $bookingCode ) === 0 ) {

        //// Send Error Response.
        sendResponse( 400, array( 'message' => 'The Booking Code must be longer than 15 characters and contain only digits and letters!' ), __LINE__ );

    } else {

        //// Get variables from authorization.php ($serverURL, $serverToken). 
        require_once( '../../../private/authorization.php' );

        //// Initiate cURL session in a variable (resource).
        $curlHandle = curl_init();

        //// Set the cURL option.
        curl_setopt_array( $curlHandle, array(
            CURLOPT_URL => $serverURL . 'bookings/' . $bookingCode,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
              'access_token: ' . $serverToken
            ),
          ));

        //// Execute cURL & store data in variables.
        $curlResponse = curl_exec( $curlHandle );
        $httpStatus = curl_getinfo( $curlHandle, CURLINFO_HTTP_CODE );

        //// Close the cURL session.
        curl_close( $curlHandle );

        if ( $httpStatus == 200 ) {
        
            //// Send Approved Response.
            sendResponse( $httpStatus, array( 'message' => 'The Booking was Found!', 'booking' => json_decode( $curlResponse ) ), __LINE__ );
            
        } elseif ( $httpStatus == 404 ) {

            //// Send Error Response.
            sendResponse( $httpStatus, array( 'message' => 'The Booking was not Found!' ), __LINE__ );

        } else {

            //// Send Error Response.
            sendResponse( $httpStatus, json_decode( $curlResponse ), __LINE__ );

        }

    }

} catch( PDOException $exception ) {

    ///// Only echo when debugging.
    //echo $exception;
    sendResponse( 500, array( 'details' => 'System under maintaining.' ), __LINE__ );

}