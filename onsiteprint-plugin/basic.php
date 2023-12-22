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
 ?  Updated: 2023-12-21 - 00:04 (Y:m:d - H:i)

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

		//// Connection is made through HTTP 
		sendResponse( 500, array( 'details' => 'Connection is not secured and page is called from HTTP!' ), __LINE__ );

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
		sendResponse( 400, array( 'message' => 'Login Session already exist!' ), __LINE__ );

	}

}

/* ---------------------------------------------------------
 >  1C. Send an Error if Login Session exist.
------------------------------------------------------------ */
class apiRequest {
	public $url;
	public $fields;
	
	public function post() {

		//// Initiate cURL session in a variable (resource).
		$curlHandle = curl_init();
		
		//// Set the cURL option.
		curl_setopt_array( $curlHandle, array(
			CURLOPT_URL => $this->url,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'POST',
			CURLOPT_POSTFIELDS => $this->fields,
		));

		//// Execute cURL & store data in variables.
		$curlResponse = curl_exec( $curlHandle );
		$httpStatus = curl_getinfo( $curlHandle, CURLINFO_HTTP_CODE );
	
		//// Close the cURL session.
		curl_close( $curlHandle );
	
		return $curlResponse;
	
	}

}