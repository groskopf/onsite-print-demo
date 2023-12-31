<?php
/* ------------------------------------------------------------------------

 *  Plugin Name: OnsitePrint Plugin
 *  Description: Delete Cookies in the Browser.
 *  Author: Gerdes Group
 *  Author URL: https://www.clarify.nu/
 *
 *  @link: https://stackoverflow.com/questions/22221807/session-cookies-http-secure-flag-how-do-you-set-these
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 * 
 *  Version: 1.0.1
 ?  Updated: 2023-12-31 - 04:52 (Y:m:d - H:i)

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
           
        //// Destroy Cookies.
        //// Important if the cookie is used later in the code.
        unset( $_COOKIE['OP_PLUGIN_DATA_USER'] );
        setcookie( 'OP_PLUGIN_DATA_USER', '', -1, '/' );
        unset( $_COOKIE['OP_PLUGIN_DATA_SESSION'] );
        setcookie( 'OP_PLUGIN_DATA_SESSION', '', -1, '/' );

        //// Send Approved Response.
        sendResponse( 200, array( 'message' => 'Session was Deleted!' ), __LINE__ );

    }

} catch( PDOException $exception ) {

    ///// Only echo when debugging.
    //echo $exception;
    sendResponse( 500, array( 'details' => 'System under maintaining.' ), __LINE__ );

}