<?php
/* ------------------------------------------------------------------------

 #  API Name: Convert CSV into JSON
 *  This PHP file provides an API endpoint to convert a CSV file (uploaded via POST) into a JSON array.
 ?  Updated: 2025-09-18 - 04:09 (Y:m:d - H:i)
 ?  Info: Modified the file to handle multi-line fields and added some more error handling.

---------------------------------------------------------------------------
 #  The API Content
--------------------------------------------------------------------------- */
try {

    ///// Get POST (csv-file).
    $file = $_FILES['csv-file'] ?? null;

    ///// Validate CSV file.
    if ( ! isset( $file ) || ! is_array( $file ) ) {
        http_response_code(400);
        header( 'Content-Type: application/json' );
        echo '{"error":"Missing File"}';
        exit();
    }

    ///// Check for upload errors
    if ( $file['error'] !== UPLOAD_ERR_OK ) {
        http_response_code(400);
        header( 'Content-Type: application/json' );
        echo '{"error":"File upload error"}';
        exit();
    }

    ///// Check if file is empty
    if ( $file['size'] === 0) {
        http_response_code(400);
        header( 'Content-Type: application/json' );
        echo '{"error":"Empty File"}';
        exit();
    }

    ///// Open file and check if it's readable
    $handle = fopen( $file['tmp_name'], 'r' );
    if ( ! $handle ) {
        http_response_code(400);
        header( 'Content-Type: application/json' );
        echo '{"error":"Cannot read file"}';
        exit();
    }

    ///// Detect separator by reading the first line
    $firstLine = fgets( $handle );
    if ( $firstLine === false ) {
        fclose( $handle );
        http_response_code(400);
        header( 'Content-Type: application/json' );
        echo '{"error":"File is not a valid CSV"}';
        exit();
    }
    $separator = ( strpos( $firstLine, ';' ) !== false ) ? ';' : ',';
    rewind( $handle );

    ///// Read CSV using fgetcsv (handles multi-line fields)
    $rows = [];
    while ( ( $row = fgetcsv( $handle, 0, $separator ) ) !== false ) {
        $rows[] = $row;
    }
    fclose( $handle );

    ///// Check if CSV has at least a header row
    if ( count( $rows ) === 0 ) {
        http_response_code(400);
        header('Content-Type: application/json');
        echo '{"error":"CSV file has no data"}';
        exit();
    }

    ///// Function to convert to UTF8.
    function utf8_converter( $array ) {
        array_walk_recursive( $array, function( &$item, $key ) {
            if ( ! mb_detect_encoding( $item, 'utf-8', true ) ) {
                $item = utf8_encode( $item );
                ////#NG - Maybe use this: $item = mb_convert_encoding( $item, 'UTF-8', 'ISO-8859-1' );
            }
        });
        return $array;
    }

    ///// Convert array to UTF8.
    $rows = utf8_converter( $rows );

    ///// Get header and data
    $header = array_shift( $rows );
    $result = [];
    foreach ( $rows as $row ) {
        if ( count( $row ) === count( $header ) ) {
            $result[] = array_combine( $header, $row );
        }
    }

    ///// Return array as json.
    header( 'Content-Type: application/json' );
    echo json_encode( $result, JSON_PRETTY_PRINT );

} catch ( Exception $ex ) {
    http_response_code(500);
    header( 'Content-Type: application/json' );
    echo '{"message":"Error '.__LINE__.'"}';
}