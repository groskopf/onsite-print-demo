<?php
/* ------------------------------------------------------------------------

 *  Plugin Name: OnsitePrint Plugin
 *  Description: Checking if the User is Logged In with Cookies.
 *  Author: Gerdes Group
 *  Author URL: https://www.clarify.nu/
 *
 *  @link: https://stackoverflow.com/questions/22221807/session-cookies-http-secure-flag-how-do-you-set-these
 *  @link: https://stackoverflow.com/questions/686155/remove-a-cookie
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 * 
 *  Version: 1.0.2
 ?  Updated: 2024-01-08 - 02:39 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  The Content
--------------------------------------------------------------------------- */
try {

    //// Get Basic Functions.
    require_once( '../../../basic.php' );

    ///// Validate if the user is logged.
    if ( $_SERVER[ 'REQUEST_METHOD' ] !== 'GET' ) {

        //// Send Error Response.
        sendResponse( 400, array( 'message' => 'Wrong Request Method!' ), __LINE__ );

    } elseif ( $_COOKIE['OP_PLUGIN_DATA_USER'] && $_COOKIE['OP_PLUGIN_DATA_SESSION'] ) {
        
        //// Get variables from authorization.php ($serverURL, $serverToken).
        require_once( '../../../private/encryption.php' );

        //// Use openssl_decrypt() function to decrypt the data.
        $decryption = openssl_decrypt( $_COOKIE['OP_PLUGIN_DATA_USER'], $method, $keyToken, $options, $_COOKIE['OP_PLUGIN_DATA_SESSION'] );

        //print_r(json_decode( $decryption )->bookingCode);

        if ( json_decode( $decryption )->bookingCode ) {

            //// Send Approved Response.
            sendResponse( 200, array( 'message' => 'Login Session exist!' ), __LINE__ );
        
        } else {

            //// Destroy Login Session (Cookies).
            destroyLoginSession();

            //// Send Error Response.
            sendResponse( 400, array( 'message' => 'Something is Wrong with the Login Session!' ), __LINE__ );
    
        }

    } else {

        //// Destroy Login Session (Cookies).
        destroyLoginSession();

        //// Send Error Response.
        sendResponse( 400, array( 'message' => 'Login Session does not Exist!' ), __LINE__ );

    }

} catch( PDOException $exception ) {

    ///// Only echo when debugging.
    //echo $exception;
    sendResponse( 500, array( 'details' => 'System under maintaining.' ), __LINE__ );

}