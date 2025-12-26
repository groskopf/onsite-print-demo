<?php
/* ------------------------------------------------------------------------

 #  API Name: Create CSV from JSON
 *  This PHP file provides an API endpoint to convert a JSON array (uploaded via POST) into a CSV format (array).
 ?  Updated: 2025-12-26 - 05:24 (Y:m:d - H:i)
 ?  Info: Modified the file to handle a QR Code line and added some more error handling.

---------------------------------------------------------------------------
 #  The API Content
--------------------------------------------------------------------------- */
try {

    ///// Get POST (csv-file).
    $eventList = $_POST['event-list'] ?? null;

    ///// Validate CSV file.
    if ( ! isset( $eventList ) || ! is_string( $eventList ) ) {
        http_response_code(400);
        header( 'Content-Type: application/json' );
        echo '{"error":"Missing Event List"}';
        exit();
    }
        
    $jsonArray = json_decode( $eventList, true );
    $header = false;
    $csvArray = [];
        
    function findValue( $value ) {
        if ( $value ) {
            return '"' . str_replace( '"', '""', $value ) . '"';
        } elseif ( is_numeric( $value ) ) {
            return '"0"';
        } else {
            return '""';
        }
    }

    function findDate( $value ) {
        if ( $value ) {

            $timestamp = (int)$value;
            $dateTimeFormat = 'd/m/Y - H:i';
            $dateTime = new DateTime( "@$timestamp" );
            $dateTime->setTimeZone( new DateTimeZone( "Europe/Copenhagen" ) );

            return '"' . $dateTime->format( $dateTimeFormat ) . '"';

        } else {
            return '""';
        }
    }

    foreach ( $jsonArray as $line ) {

        if ( empty( $header ) ) {
            $header = array_keys( $line );
            $headerLine = [
                '"' . $header[1] . '"',
                '"' . $header[2] . '"',
                '"' . $header[3] . '"',
                '"' . $header[4] . '"',
                '"' . $header[5] . '"',
                '"Extra Notes"',
                '"Last Arrived"',
                '"Amount of Prints"',
                '"qrCode"'
            ];
            array_push( $csvArray, implode(',', array_filter( array_values( $headerLine) ) ) . "\n" );
        }

        $participant = $line;

        $line_1     = findValue( $participant['line1'] );
        $line_2     = findValue( $participant['line2'] );
        $line_3     = findValue( $participant['line3'] );
        $line_4     = findValue( $participant['line4'] );
        $line_5     = findValue( $participant['line5'] );
        $note       = findValue( $participant['note'] );
        $line_time  = findDate( $participant['time'] );
        $prints     = findValue( $participant['prints'] );
        $qrCode     = findValue( $participant['qrCode'] );
        
        $participantLine = [ $line_1, $line_2, $line_3, $line_4, $line_5, $note, $line_time, $prints, $qrCode ];

        array_push( $csvArray, implode(',', array_filter( array_values( $participantLine) ) ) . "\n" );
    }

    ///// Return array as json.
    header( 'Content-Type: application/json' );
    echo json_encode( $csvArray, JSON_PRETTY_PRINT );

} catch ( Exception $ex ) {
    http_response_code(500);
    header( 'Content-Type: application/json' );
    echo '{"message":"Error '.__LINE__.'"}';
}