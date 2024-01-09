<?php
/* ------------------------------------------------------------------------

 *  Plugin Name: OnsitePrint Plugin
 *  Description: Delete Cookies in the Browser.
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
 ?  Updated: 2024-01-08 - 01:05 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  The Content
--------------------------------------------------------------------------- */
try {

    //// Get Basic Functions.
    require_once( '../../../basic.php' );

    //// Create variable from POST.
    $userToken = $_POST['user-token'];
    
    if ( $_SERVER[ 'REQUEST_METHOD' ] !== 'POST' ) {

        //// Send Error Response.
        sendResponse( 400, array( 'message' => 'Wrong Request Method!' ), __LINE__ );

    } elseif ( ! $userToken && $userToken !== $_COOKIE['OP_PLUGIN_DATA_SESSION'] ) {

        //// Send Error Response.
        sendResponse( 400, array( 'message' => 'Something went wrong with the Authorization!' ), __LINE__ );

    } else {
           
        //// Destroy Login Session (Cookies).
        destroyLoginSession();

        //// Send Approved Response.
        sendResponse( 200, array( 'message' => 'Session was Deleted!' ), __LINE__ );

    }

} catch( PDOException $exception ) {

    ///// Only echo when debugging.
    //echo $exception;
    sendResponse( 500, array( 'details' => 'System under maintaining.' ), __LINE__ );

}