<?php
/* ------------------------------------------------------------------------

 #  API Name: Create CSV from JSON
 *  Purpose: Convert a JSON array (POSTed as 'event-list') into a CSV-like array. The script normalizes empty values, preserves numeric zeros, formats timestamps to a readable date/time and includes a QR code column.
 ?  Updated: 2026-01-16 - 02:58 (Y:m:d - H:i)
 ?  Info: Added check for empty fields and extra error handling.

---------------------------------------------------------------------------
 #  The API Content
--------------------------------------------------------------------------- */
try {

    ///// Get POST parameters.
    $eventList = $_POST['event-list'] ?? '';

    ///// Validate required field
    if (empty($eventList)) {
        http_response_code(400);
        header('Content-Type: application/json');
        echo '{"error":"Missing Event List"}';
        exit();
    }

    ///// Decode JSON into associative array and validate
    $jsonArray = json_decode($eventList, true);
    if (! is_array($jsonArray)) {
        http_response_code(400);
        header('Content-Type: application/json');
        echo '{"error":"Invalid JSON data"}';
        exit();
    }

    ///// Prepare output containers
    $header = false;
    $csvArray = [];

    ///// Helper: safely quote/escape CSV values
    function findValue($value)
    {
        ///// Treat non-empty values as strings and escape quotes
        if ($value) {
            return '"' . str_replace('"', '""', $value) . '"';
        } elseif (is_numeric($value)) {
            ///// Preserve numeric zeros (and other numeric zero-like values)
            return '"0"';
        } else {
            ///// Explicit empty CSV cell
            return '""';
        }
    }

    ///// Helper: format a UNIX timestamp to human readable date/time in CET
    function findDate($value)
    {
        if ($value) {
            $timestamp = (int) $value;
            $dateTimeFormat = 'd/m/Y - H:i';
            $dateTime = new DateTime("@$timestamp");
            $dateTime->setTimeZone(new DateTimeZone("Europe/Copenhagen"));
            return '"' . $dateTime->format($dateTimeFormat) . '"';
        } else {
            return '""';
        }
    }

    ///// Iterate rows and build CSV lines
    foreach ($jsonArray as $line) {

        ///// Build header row from first input row keys (once)
        if (empty($header)) {
            $header = array_keys($line);
            $headerLine = [
                '"Column 1"',
                '"Column 2"',
                '"Column 3"',
                '"Column 4"',
                '"Column 5"',
                '"Extra Notes"',
                '"Last Arrived"',
                '"Amount of Prints"',
                '"QR Code"'
            ];
            array_push($csvArray, implode(',', array_filter(array_values($headerLine))) . "\n");
        }

        ///// Normalize participant row and ensure expected keys exist
        $participant = is_array($line) ? $line : [];

        ///// For textual fields: treat whitespace-only as empty
        $line_1 = findValue(isset($participant['line1']) && trim((string) $participant['line1']) !== '' ? $participant['line1'] : '');
        $line_2 = findValue(isset($participant['line2']) && trim((string) $participant['line2']) !== '' ? $participant['line2'] : '');
        $line_3 = findValue(isset($participant['line3']) && trim((string) $participant['line3']) !== '' ? $participant['line3'] : '');
        $line_4 = findValue(isset($participant['line4']) && trim((string) $participant['line4']) !== '' ? $participant['line4'] : '');
        $line_5 = findValue(isset($participant['line5']) && trim((string) $participant['line5']) !== '' ? $participant['line5'] : '');
        $note   = findValue(isset($participant['note']) && trim((string) $participant['note']) !== '' ? $participant['note'] : '');

        ///// Time: expect numeric UNIX timestamp; pass null/empty to helper when invalid
        $line_time = findDate(isset($participant['time']) && is_numeric($participant['time']) ? $participant['time'] : null);

        ///// Prints: allow numeric 0, otherwise empty when not set
        $prints = findValue(isset($participant['prints']) ? $participant['prints'] : '');

        ///// QR code: treat whitespace-only as empty
        $qrCode = findValue(isset($participant['qrCode']) && trim((string) $participant['qrCode']) !== '' ? $participant['qrCode'] : '');

        ///// Combine normalized fields and append CSV row
        $participantLine = [$line_1, $line_2, $line_3, $line_4, $line_5, $note, $line_time, $prints, $qrCode];

        ///// array_filter removes empty CSV entries (""), implode with commas, keep newline
        array_push($csvArray, implode(',', array_filter(array_values($participantLine))) . "\n");
    }

    ///// Return the result array as JSON with pretty print formatting
    header('Content-Type: application/json');
    echo json_encode($csvArray, JSON_PRETTY_PRINT);
} catch (Exception $ex) {
    ///// Handle any unexpected errors and return a 500 error code
    http_response_code(500);
    header('Content-Type: application/json');
    echo '{"message":"Error ' . __LINE__ . '"}';
}