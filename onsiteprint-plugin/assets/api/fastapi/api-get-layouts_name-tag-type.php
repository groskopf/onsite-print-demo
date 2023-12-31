<?php
/* ------------------------------------------------------------------------

 *  Plugin Name: OnsitePrint Plugin
 *  Description: Getting the Layouts with Name Tag Type from the FastAPI Server.
 *  Author: Gerdes Group
 *  Author URL: https://www.clarify.nu/
 *
 *  @link https://tutorialsclass.com/php-rest-api-get-data-using-curl/
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 * 
 *  Version: 1.0.1
 ?  Updated: 2023-12-31 - 04:15 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  The Content
--------------------------------------------------------------------------- */
try{

    //// Get Basic Functions.
    require_once( '../../../basic.php' );

    //// Create variables from POST.
    $userToken = $_POST['user-token'];
    $nameTagType = $_POST['name-tag-type'];

    if ( $_SERVER['REQUEST_METHOD'] !== 'POST' ) {

        //// Send Error Response.
        sendResponse( 400, array( 'message' => 'Wrong Request Method!' ), __LINE__ );

    } elseif ( ! $userToken && $userToken !== $_COOKIE['OP_PLUGIN_DATA_SESSION'] ) {

        //// Send Error Response.
        sendResponse( 400, array( 'message' => 'Something went wrong with the Authorization!' ), __LINE__ );

    } elseif ( ! $nameTagType ) {

        //// Send Error Response.
        sendResponse( 400, array( 'message' => 'Missing the Name Tag Type!' ), __LINE__ );

    } elseif ( preg_match( '/^[0-9]{7,7}$/', $nameTagType ) === 0 ) {

        //// Send Error Response.
        sendResponse( 400, array( 'message' => 'The Name Tag Type can only be 7 characters and contain digits!' ), __LINE__ );

    } else {

        //// Get variables from authorization.php ($serverURL, $serverToken).
        require_once( '../../../private/authorization.php' );

        //// Initiate cURL session in a variable (resource).
        $curlHandle = curl_init();

        //// Set the cURL option.
        curl_setopt_array( $curlHandle, array(
            CURLOPT_URL => $serverURL . '/layouts/name_tags/' . $nameTagType,
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
            sendResponse( $httpStatus, array( 'message' => 'The Name Tag Type was Found!', 'nameTagType' => json_decode( $curlResponse ) ), __LINE__ );

        } elseif ( $httpStatus == 404 ) {

            //// Send Error Response.
            sendResponse( $httpStatus, array( 'message' => 'The Name Tag Type was not Found!' ), __LINE__ );

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