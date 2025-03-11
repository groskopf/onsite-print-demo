<?php
    ////////////////////////////////////////
    /////// Get List from CSV with Semicolon
    ////////////////////////////////////////
    try {
        
        ///// Get POST (JSON Data).
        $eventList = $_POST['event-list'];

        ///// Validate CSV file.
        if( ! isset( $eventList ) ) {
            http_response_code(400);
            header('Content-Type: application/json');
            echo '{"error":"Missing File"}';
            exit();
        } else {
           
            $jsonArray = json_decode( $eventList, true );
            $header = false;
            $csvArray = [];
               
            function findValue( $value ) {
                if ( $value ) {
                    return $value;
                } elseif ( is_numeric( $value ) ) {
                    return "0\040";
                } else {
                    return "\040";
                }
            }

            function findDate( $value ) {
                if ( $value ) {
                    $timestamp = (int)$value;
                    $dateTimeFormat = 'd/m/Y - H:i';
                    $dateTime = new DateTime( "@$timestamp" );
                    return $dateTime->format( $dateTimeFormat );
                } else {
                    return "\040";
                }
            }

            foreach ( $jsonArray as $line ) {

                if ( empty( $header ) ) {
                    $header = array_keys( $line );                   
                    $headerLine = [ $header[1], $header[2], $header[3], $header[4], $header[5], 'Last Arrived', 'Amount of Prints' ];
                    array_push( $csvArray, implode(',', array_filter( array_values( $headerLine) ) ) . "\n" );
                }
    
                $participant = array_values( $line );

                $line_1 = findValue( $participant[1] );
                $line_2 = findValue( $participant[2] );
                $line_3 = findValue( $participant[3] );
                $line_4 = findValue( $participant[4] );
                $line_5 = findValue( $participant[5] );
                $line_time = findDate( $participant[6] );
                $prints = findValue( $participant[8] );
                
                $participantLine = [ $line_1, $line_2, $line_3, $line_4, $line_5, $line_time, $prints ];

                array_push( $csvArray, implode(',', array_filter( array_values( $participantLine) ) ) . "\n" );
            }

            ///// Return array as json.
            header('Content-Type: application/json');
            echo json_encode( $csvArray, JSON_PRETTY_PRINT );
        
        }

    }

    catch( Exception $ex ) {
        http_response_code(500);
        header('Content-Type: application/json');
        echo '{"message":"Error '.__LINE__.'"}';
    }


