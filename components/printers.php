<section id="printers-container" class="main">
    <header class="header-parrent" onclick="openContent()">               
        <h2>Printers</h2>
        <div class="arrow"></div>
    </header>
    <section class="inner-container">

        <div id="create-nameplate" class="wrapper post">
            <header onclick="openContent()">               
                <h3><span>Post</span>Create Nameplate</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="create-nameplate" action="POST" onsubmit="return false">
                        <div class="form-inner">
                            <div class="input-outer">
                                <label for="nameplate-booking-code-input">Booking Code</label>
                                <input id="nameplate-booking-code-input" name="booking-code" type="text" required>
                            </div>
                            <div class="input-outer">
                                <label for="nameplate-image-filename-input">Image Filename</label>
                                <input id="nameplate-image-filename-input" name="image-filename" type="text" required>
                            </div>
                            <div class="input-outer">
                                <label for="nameplate-qr-code-input">QR-Code</label>
                                <input id="nameplate-qr-code-input" name="qr-code" type="text" required>
                            </div>
                            <div class="input-outer">
                                <select class="nameplate-layout-select" name="layout" required>
                                    <option value="layout_1">Layout 1</option>
                                    <option value="invalid">Invalid</option>
                                </select>
                            </div>
                        </div>
                        <button class="list-button" onclick="createNameplate(); return false">Create Nameplate</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #create-nameplate -->

        <div id="get-printer-queue" class="wrapper get">
            <header onclick="openContent()">               
                <h3><span>Get</span>Get Printer Queue</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="get-printer-queue" action="POST" onsubmit="return false">
                        <div class="form-inner">
                            <div class="input-outer">
                                <select class="printer-queue-code-select" name="printer-code" required>
                                    <option value="XDESP95271_p">Printer 1</option>
                                    <option value="W8IL27UCYQ_m">Printer 2</option>
                                    <option value="1OPYKBGXVN_1">Printer 3</option>
                                </select>
                            </div>
                        </div>
                        <button class="list-button" onclick="getPrinterQueue(); return false">Get Printer Queue</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-printer-queue -->

        <div id="get-nameplate" class="wrapper get">
            <header onclick="openContent()">               
                <h3><span>Get</span>Get Nameplate</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="get-nameplate" action="POST" onsubmit="return false">
                        <div class="form-inner">
                            <div class="input-outer">
                                <label for="nameplate-filename-input">Nameplate Filename</label>
                                <input id="nameplate-filename-input" name="nameplate-filename" type="text" required>
                            </div>
                            <div class="input-outer">
                                <select class="nameplate-printer-code-select" name="printer-code" required>
                                    <option value="XDESP95271_p">Printer 1</option>
                                    <option value="W8IL27UCYQ_m">Printer 2</option>
                                    <option value="1OPYKBGXVN_1">Printer 3</option>
                                </select>
                            </div>
                        </div>
                        <button class="list-button" onclick="getNameplate(); return false">Get Nameplate</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-nameplate -->

        <div id="delete-nameplate" class="wrapper delete">
            <header onclick="openContent()">               
                <h3><span>Delete</span>Delete Nameplate</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="delete-nameplate" action="POST" onsubmit="return false">
                        <div class="form-inner">
                            <div class="input-outer">
                                <label for="delete-nameplate-filename-input">Nameplate Filename</label>
                                <input id="delete-nameplate-filename-input" name="nameplate-filename" type="text" required>
                            </div>
                            <div class="input-outer">
                                <select class="delete-nameplate-printer-code-select" name="printer-code" required>
                                    <option value="XDESP95271_p">Printer 1</option>
                                    <option value="W8IL27UCYQ_m">Printer 2</option>
                                    <option value="1OPYKBGXVN_1">Printer 3</option>
                                </select>
                            </div>
                        </div>
                        <button class="list-button" onclick="deleteNameplate(); return false">Delete Nameplate</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #delete-nameplate -->

    </section><!-- .inner-container -->
</section><!-- #printers-container -->