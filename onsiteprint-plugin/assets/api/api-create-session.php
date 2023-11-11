<?php
/* ------------------------------------------------------------------------

 *  The OnsitePrint (Create Session) API.
 *  Creating a PHP Session in the Browser with Booking Information.
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 ?  Updated: 2023-02-19 - 15:23 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  The API Content
--------------------------------------------------------------------------- */

try {

    if ( $_SERVER['REQUEST_METHOD'] === 'POST' ) { 

        ///// Validate Booking Item.
        if ( ! isset( json_decode( $_POST['booking-item'], true )['bookingId'] ) ) {
            http_response_code(400);
            header('Content-Type: application/json');
            echo '{"message":"Missing the Booking ID!"}';
            exit();
        } else if ( ! isset( json_decode( $_POST['booking-item'], true )['bookingStartDate'] ) ) {
            http_response_code(400);
            header('Content-Type: application/json');
            echo '{"message":"Missing the Booking Start Date!"}';
            exit();
        } else if ( ! isset( json_decode( $_POST['booking-item'], true )['bookingEndDate'] ) ) {
            http_response_code(400);
            header('Content-Type: application/json');
            echo '{"message":"Missing the Booking End Date!"}';
            exit();
        } else if ( ! isset( json_decode( $_POST['booking-item'], true )['printerId'] ) ) {
            http_response_code(400);
            header('Content-Type: application/json');
            echo '{"message":"Missing the Printer ID!"}';
            exit();
        } else if ( ! isset( json_decode( $_POST['booking-item'], true )['nameTagType']['nameTagTypeId'] ) ) {
            http_response_code(400);
            header('Content-Type: application/json');
            echo '{"message":"Missing the Name Tag Type ID!"}';
            exit();
        } else if ( ! isset( json_decode( $_POST['booking-item'], true )['nameTagType']['nameTagTypeLayouts'] ) ) {
            http_response_code(400);
            header('Content-Type: application/json');
            echo '{"message":"Missing the Name Tag Type Layouts!"}';
            exit();
        } else {
            
            ///// Prevents javascript XSS attacks aimed to steal the session ID
            ini_set('session.cookie_httponly', 1);

            ///// Session ID cannot be passed through URLs
            ini_set('session.use_only_cookies', 1);

            ///// Uses a secure connection (HTTPS) if possible
            ini_set('session.cookie_secure', 1);

            ///// Start the Session.
            session_start();
            
            ///// Set the Session value.
            $_SESSION['OP_PLUGIN_DATA_BOOKING'] = $_POST['booking-item'];
            
            ///// Return the Response.
            http_response_code(201);
            header( 'Content-Type: application/json' );
            echo '{"message":"Session was Created!", "session":' . $_POST['booking-item'] . '}';
        
        }

    } else {
        http_response_code(400);
        header('Content-Type: application/json');
        echo '{"message":"Wrong Request Method!"}';
        exit();
    }

}

catch( Exception $ex ) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo '{"message":"Error at line: '.__LINE__.'"}';
}