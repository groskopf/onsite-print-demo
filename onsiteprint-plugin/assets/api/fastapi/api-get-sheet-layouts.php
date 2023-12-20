<?php
/* ------------------------------------------------------------------------

 *  Plugin Name: OnsitePrint Plugin
 *  Description: Getting the Sheet Layouts from the FastAPI Server.
 *  Author: Gerdes Group
 *  Author URL: https://www.clarify.nu/
 *
 *  @link https://tutorialsclass.com/php-rest-api-get-data-using-curl/
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 ?  Updated: 2023-12-13 - 15:30 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  Connect to the FastAPI Server
--------------------------------------------------------------------------- */
try{

    require_once( __DIR__ . '/../../../basic.php' );

    checkConnection();

    if ( $_SERVER['REQUEST_METHOD'] === 'GET' ) { 
       
        ///// Start Session.
        session_start();

        ///// Validate if the user is logged in with a Booking Code or a Wordpress login.
        if ( isset( json_decode( $_SESSION['OP_PLUGIN_DATA_BOOKING'], true )['bookingId'] ) ) { 

            require_once( __DIR__ . '/../../../private/authorization.php' );

            // Initiate curl session in a variable (resource)
            $curl_handle = curl_init();

            // Set the curl URL option
            curl_setopt( $curl_handle, CURLOPT_URL, $serverURL . 'layouts/sheets' );

            curl_setopt( $curl_handle, CURLOPT_HTTPHEADER, array( 
                'accept: application/json', 
                'access_token: ' . $serverToken 
            ) );

            // This option will return data as a string instead of direct output
            curl_setopt( $curl_handle, CURLOPT_RETURNTRANSFER, true );

            // Execute curl & store data in a variable
            $curl_response = curl_exec( $curl_handle );
            
            curl_close( $curl_handle );

            echo $curl_response;
        
        } else {
            //// Send Unauthorized Response.
            sendError( 401, 'Missing login information.', __LINE__ );
        }
    
    } else {
        //// Send Wrong Request Response.
        sendError( 501, 'Wrong Request Method!', __LINE__ );
    }

} catch( PDOException $exception ) {
    ///// Only echo when debugging.
    //echo $exception;
    sendError( 500, 'System under maintaining.', __LINE__ );
}