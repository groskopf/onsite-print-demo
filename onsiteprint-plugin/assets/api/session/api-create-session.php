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
 ?  Updated: 2023-12-13 - 15:30 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  The Content
--------------------------------------------------------------------------- */

try {
   
    //// Get Basic Functions.
    require_once( __DIR__ . '/../../../basic.php' );

    if ( $_SERVER['REQUEST_METHOD'] !== 'POST' ) {

        //// Send Unauthorized Response.
        sendResponse( 400, 'Wrong Request Method!', __LINE__ );
    
    } else {

        //// Check if Login Session exist.
        checkLoginSession();
        
        if ( ! $_POST['booking-item'] ) {
            
            //// Send Unauthorized Response.
            sendResponse( 400, 'Missing the Booking ID!', __LINE__ );
            
        } else {
            $postdata = http_build_query( 
                array(
                    'bookingId' => $_POST['booking-item']
                )
            );

            $options = array( 'http' =>
                array(
                    'method'    => 'POST',
                    'header'    => 'Content-Type: application/x-www-form-urlencoded',
                    'content'   => 'bookingId=' . $_POST['booking-item']
                )
            );

            $content = stream_context_create( $options );

            //// Get Booking Information from API.
            $bookingItem = '{
                "start_date": "2023-12-19",
                "end_date": "2023-12-19",
                "printer_code": "1OPYKBGXVN_1",
                "booking_code": "string",
                "name_tag_type": "4786103"
              }';//file_get_contents( '../fastapi/api-get-booking.php', false, $content );
            
            // Remember to check .htaccess

            ///// Prevents javascript XSS attacks aimed to steal the session ID.
            ini_set('session.cookie_httponly', 1);

            ///// Session ID cannot be passed through URLs.
            ini_set('session.use_only_cookies', 1);

            ///// Uses a secure connection (HTTPS) if possible.
            ini_set('session.cookie_secure', 1);

            ///// Start the Session.
            session_start();
            return
            ///// Set the Session value.
            $_SESSION['OP_PLUGIN_DATA_BOOKING'] = $bookingItem;
            
            ///// Return the Response.
            sendResponse( 201, '{"message":"Session was Created!", "session":' . $bookingItem . '}', __LINE__ );

        
        }

    }
    
} catch( PDOException $exception ) {
    ///// Only echo when debugging.
    //echo $exception;
    sendResponse( 500, 'System under maintaining.', __LINE__ );
}