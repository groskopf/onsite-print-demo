<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Print Document
 ?  Updated: 2026-01-12 - 03:37 (Y:m:d - H:i)
 ?  Info: Changed CSS directory structure.
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */
?>

<head>
    <link rel="stylesheet" id="onsiteprint-block-style-print-css" href="<?php __DIR__ ?>/wp-content/plugins/onsiteprint-plugin/blocks/event/block-style-print.css?ver=1.0.0" media="all">
</head>

<body>

    <div class="logo">
        <figure></figure>
    </div>

    <table class="op-pdf-container" data-column-count="5">
        <thead class="op-pdf-header">
            <tr class="op-pdf-header-info"></tr>
            <tr class="op-pdf-col-info"></tr>
        </thead>
        <tbody class="op-pdf-content"></tbody>
    </table>

</body>