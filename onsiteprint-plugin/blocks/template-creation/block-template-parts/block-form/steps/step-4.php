<?php
/* ------------------------------------------------------------------------
 *  Block Part Name: Step 4
 ?  Updated: 2025-01-21 - 02:33 (Y:m:d - H:i)
 ?  Info: Added new Layout Type from Booking.
---------------------------------------------------------------------------
 #  The Block Part Content
--------------------------------------------------------------------------- */

$stepNumber = 4;

?>

<fieldset class="op-fieldset-step-<?= esc_attr( $stepNumber ) ?>">
    <header class="op-fieldset-header">
        <p class="op-fieldset-steps"><?= esc_attr( $acf['header_step'] ) ?> <span class="op-fieldset-step-number"><?= esc_attr( $stepNumber ) ?>/<?= esc_attr( $amountOfSteps ) ?></span></p>
        <h3 class="op-fieldset-title"><?= esc_attr( $acf['step_'.$stepNumber.'_title'] ) ?></h3>
        <p class="op-fieldset-description"><?= esc_attr( $acf['step_'.$stepNumber.'_description'] ) ?></p>
    </header>
    <div class="op-fieldset__inner">
 
       <div id="<?= esc_attr($id) ?>-radio-inputs" class="op-input-wrapper" data-validation="0">
            <p class="op-label-title"><?= esc_attr( $acf['step_'.$stepNumber.'_field_1_title'] ) ?></p>
            <div class="op-input-validation" data-icon="circle-exclamation">
                <span class="op-icon" role="img" aria-label="Exclamation Icon"></span>
                <span class="op-message"><?= esc_attr( $acf['step_'.$stepNumber.'_field_1_val'] ) ?></span>
            </div>
            <div class="op-form-layouts op-form-radio-inputs" data-layout-lines="0" data-layout-image="0">

                <?php 

                    $layoutType = json_decode( $_SESSION['OP_PLUGIN_DATA_BOOKING'], true )['nameTagType']['nameTagTypeId'];

                    foreach ( glob( OP_ROOT_PATH . 'assets/img/svg/layouts/' . $layoutType . '/*/*.svg' ) as $file ) {
                        
                        $fileParts = pathinfo( $file );
                        $fileBasename = $fileParts[ 'basename' ];
                        $fileName = $fileParts[ 'filename' ];
                        $amountOfLines = substr( $fileName, -2, -1 );
                        $layoutName = substr( $fileName, 0, -3 );
                        $layoutImage = str_contains( $fileName, 'P') ? 'yes' : 'no';
                        $filePath = OP_ROOT_URL . 'assets/img/svg/layouts/' . $layoutType . '/' . $layoutName . '/' . $fileBasename;

                        ?>
                    
                        <div class="op-radio-input" data-layout-lines="<?= $amountOfLines ?>L" data-layout-image="<?= $layoutImage ?>">
                            <input type="radio" id="<?= esc_attr( $id ) ?>-<?= $fileName ?>-input" oninput="opFormInputValidation()" name="layout" value="<?= $layoutName ?>" required>
                            <label for="<?= esc_attr( $id ) ?>-<?= $fileName ?>-input">
                                <div class="op-radio-check" data-icon="circle-check">
                                    <span class="op-icon" role="img" aria-label="Check Mark Icon"></span>
                                </div>
                                <div class="op-radio-info">
                                    <div class="op-image op-flex-col">
                                        <img src="<?= esc_attr( $filePath ) ?>" alt="Amount of Lines: <?= $amountOfLines ?>, Layout: <?= $layoutName ?>, Image: <?= $layoutImage ?>" width="100%" height="auto">
                                    </div>
                                </div>
                            </label>
                        </div>

                <?php } ?>

            </div>
        </div>

        <input id="<?= esc_attr($id) ?>-layout-type-input" name="layout-type" type="hidden" value="<?= $layoutType ?>" required>

    </div>
</fieldset>
