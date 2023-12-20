<?php
/* ------------------------------------------------------------------------

 *  Plugin Name: OnsitePrint Plugin
 *  Description: Basic functions to the Plugin.
 *  Author: Gerdes Group
 *  Author URL: https://www.clarify.nu/
 *
 *  @package WordPress
 *  @subpackage OnsitePrint Plugin
 *  @since OnsitePrint Plugin 1.0
 ?  Updated: 2023-12-20 - 01:18 (Y:m:d - H:i)

 ---------------------------------------------------------------------------
 #	TABLE OF CONTENTS:
---------------------------------------------------------------------------

	0. 	List of upcoming tasks 
	1. 	Basic Functions
		a. 	Send Response as JSON
		b. 	Check the Server Connection

---------------------------------------------------------------------------
 &	0. List of upcoming tasks
---------------------------------------------------------------------------

---------------------------------------------------------------------------
 #  1. Basic Functions
---------------------------------------------------------------------------
 >  1a. Send Response as JSON.
------------------------------------------------------------ */
function sendResponse( $iHttpCode, $sMessage, $iLine ) {
    http_response_code( $iHttpCode );
    header( 'Content-Type: application/json' );

	if ( ( $iHttpCode >= 200 ) && ( $iHttpCode <= 399 ) ) {
		$error = false;
	} else {
		$error = true;
	}

	$response = array(
		'error'		=> $error, 
		'code'		=> $iHttpCode, 
		'response'	=> $sMessage
	);

	if ( $iHttpCode == 500 ) $response['line'] = $iLine;

	echo json_encode( $response );
    exit();

}

/* ---------------------------------------------------------
 >  1b. Check the Server Connection.
------------------------------------------------------------ */
function checkConnection() {
	// checking if $_SERVER['HTTPS'] is set and its value is 'on'  
	// or '1' and if server port number is 443 then we can say the  
	// connection is made through HTTPS 
	if ( isset( $_SERVER['HTTPS'] ) ) {
		
		if ( $_SERVER['HTTPS'] == 'on' && $_SERVER['SERVER_PORT'] == 443 ) {
			///// Connection is secured and page is called from HTTPS.
			return true;
		}

	} else { 
		// Connection is made through HTTP 
		sendError( 500, 'Connection is not secured and page is called from HTTP!', __LINE__ );
	}
}

/* ---------------------------------------------------------
 >  1C. Send an Error if Login Session exist.
------------------------------------------------------------ */
function checkLoginSession() {

	//// Check if Login Session exist.
	require_once( 'private/session.php' );

	if ( $OP_LOGIN === true ) {

		//// Send Error Response.
		sendError( 400, 'Login Session already exist!', __LINE__ );
		
	}

}