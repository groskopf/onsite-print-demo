<?php
/* ------------------------------------------------------------------------

 *  The OnsitePrint (Get Session) API.
 *  Getting the PHP Session in the Browser with Booking Information.
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 ?  Updated: 2023-02-19 - 18:04 (Y:m:d - H:i)

---------------------------------------------------------------------------
 #  The API Content
--------------------------------------------------------------------------- */

try {

    if ( $_SERVER['REQUEST_METHOD'] === 'GET' ) { 

        ///// Start Session.
        session_start();

        ///// Validate Booking Item.
        if ( ! isset( json_decode( $_SESSION['OP_PLUGIN_DATA_BOOKING'], true )['bookingId'] ) ) {
            http_response_code(400);
            header('Content-Type: application/json');
            echo '{"message":"Could not find the Booking ID!"}';
            exit();
        } else if ( ! isset( json_decode( $_SESSION['OP_PLUGIN_DATA_BOOKING'], true )['bookingStartDate'] ) ) {
            http_response_code(400);
            header('Content-Type: application/json');
            echo '{"message":"Could not find the Booking Start Date!"}';
            exit();
        } else if ( ! isset( json_decode( $_SESSION['OP_PLUGIN_DATA_BOOKING'], true )['bookingEndDate'] ) ) {
            http_response_code(400);
            header('Content-Type: application/json');
            echo '{"message":"Could not find the Booking End Date!"}';
            exit();
        } else if ( ! isset( json_decode( $_SESSION['OP_PLUGIN_DATA_BOOKING'], true )['printerId'] ) ) {
            http_response_code(400);
            header('Content-Type: application/json');
            echo '{"message":"Could not find the Printer ID!"}';
            exit();
        } else if ( ! isset( json_decode( $_SESSION['OP_PLUGIN_DATA_BOOKING'], true )['nameTagType']['nameTagTypeId'] ) ) {
            http_response_code(400);
            header('Content-Type: application/json');
            echo '{"message":"Could not find the Name Tag Type ID!"}';
            exit();
        } else if ( ! isset( json_decode( $_SESSION['OP_PLUGIN_DATA_BOOKING'], true )['nameTagType']['nameTagTypeLayouts'] ) ) {
            http_response_code(400);
            header('Content-Type: application/json');
            echo '{"message":"Could not find the Name Tag Type Layouts!"}';
            exit();
        } else {
            
            ///// Return the Response.
            http_response_code(200);
            header( 'Content-Type: application/json' );
            echo '{"message":"Session was found!", "session":' . $_SESSION['OP_PLUGIN_DATA_BOOKING'] . '}';
        
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