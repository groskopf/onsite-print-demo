<section id="name-tags-container" class="main">
    <header class="header-parrent" onclick="openContent()">               
        <h2>Name Tags</h2>
        <div class="arrow"></div>
    </header>
    <section class="inner-container">

        <div id="create-new-name-tag" class="wrapper post">
            <header onclick="openContent()">               
                <h3><span>Post</span>Create new Name Tag</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="create-new-name-tag" action="POST" onsubmit="return false">
                        <div class="form-inner">
                            <div class="input-outer">
                                <label for="CNNT-layout-select">Layout</label>
                                <select id="CNNT-layout-select" name="layout" required>
                                    <option value="layout_1">layout_1</option>
                                    <option value="invalid">invalid</option>
                                </select>
                            </div>
                            <div class="input-outer">
                                <label for="CNNT-image-filename-input">Image Filename</label>
                                <input id="CNNT-image-filename-input" name="image-filename" type="text" required>
                            </div>
                            <div class="input-outer">
                                <label for="CNNT-qr-code-input">QR-Code</label>
                                <input id="CNNT-qr-code-input" name="qr-code" type="text" required>
                            </div>
                            <div class="input-outer">
                                <label for="CNNT-booking-code-input">Booking Code</label>
                                <input id="CNNT-booking-code-input" name="booking-code" type="text" required>
                            </div>
                        </div>
                        <button class="list-button" onclick="createNewNameTag(); return false">Create new Name Tag</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #create-new-name-tag | #CNNT -->

        <div id="get-all-name-tags-in-printer-queue" class="wrapper get">
            <header onclick="openContent()">               
                <h3><span>Get</span>Get all Name Tags in Printer Queue</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="get-all-name-tags-in-printer-queue" action="POST" onsubmit="return false">
                        <div class="form-inner">
                            <div class="input-outer">
                                <label for="GANTIPQ-printer-code-select">Printer Code</label>
                                <select id="GANTIPQ-printer-code-select" name="printer-code" required>
                                    <option value="XDESP95271_p">XDESP95271_p</option>
                                    <option value="W8IL27UCYQ_m">W8IL27UCYQ_m</option>
                                    <option value="1OPYKBGXVN_1">1OPYKBGXVN_1</option>
                                </select>
                            </div>
                        </div>
                        <button class="list-button" onclick="getAllNameTagsInPrinterQueue(); return false">Get all Name Tags</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-all-name-tags-in-printer-queue | #GANTIPQ -->

        <div id="delete-all-name-tags-in-printer-queue" class="wrapper delete">
            <header onclick="openContent()">               
                <h3><span>Delete</span>Delete all Name Tags in Printer Queue</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="delete-all-name-tags-in-printer-queue" action="POST" onsubmit="return false">
                        <div class="form-inner">
                            <div class="input-outer">
                                <label for="DANTIPQ-printer-code-select">Printer Code</label>
                                <select id="DANTIPQ-printer-code-select" name="printer-code" required>
                                    <option value="XDESP95271_p">XDESP95271_p</option>
                                    <option value="W8IL27UCYQ_m">W8IL27UCYQ_m</option>
                                    <option value="1OPYKBGXVN_1">1OPYKBGXVN_1</option>
                                </select>
                            </div>
                        </div>
                        <button class="list-button" onclick="deleteAllNameTagsInPrinterQueue(); return false">Delete all Name Tags</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #delete-all-name-tags-in-printer-queue | #DANTIPQ -->

        <div id="get-name-tag-with-filename" class="wrapper get">
            <header onclick="openContent()">               
                <h3><span>Get</span>Get Name Tag with Filename</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="get-name-tag-with-filename" action="POST" onsubmit="return false">
                        <div class="form-inner">
                            <div class="input-outer">
                                <label for="GNTWF-filename-input">Filename</label>
                                <input id="GNTWF-filename-input" name="filename" type="text" required>
                            </div>
                            <div class="input-outer">
                                <label for="GNTWF-printer-code-select">Printer Code</label>
                                <select id="GNTWF-printer-code-select" name="printer-code" required>
                                    <option value="XDESP95271_p">XDESP95271_p</option>
                                    <option value="W8IL27UCYQ_m">W8IL27UCYQ_m</option>
                                    <option value="1OPYKBGXVN_1">1OPYKBGXVN_1</option>
                                </select>
                            </div>
                        </div>
                        <button class="list-button" onclick="getNameTagWithFilename(); return false">Get Name Tag</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-name-tag-with-filename | #GNTWF -->

        <div id="delete-name-tag-with-filename" class="wrapper delete">
            <header onclick="openContent()">               
                <h3><span>Delete</span>Delete Name Tag with Filename</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="delete-name-tag-with-filename" action="POST" onsubmit="return false">
                        <div class="form-inner">
                            <div class="input-outer">
                                <label for="DNTWF-filename-input">Filename</label>
                                <input id="DNTWF-filename-input" name="filename" type="text" required>
                            </div>
                            <div class="input-outer">
                                <label for="DNTWF-printer-code-select">Printer Code</label>
                                <select id="DNTWF-printer-code-select" name="printer-code" required>
                                    <option value="XDESP95271_p">XDESP95271_p</option>
                                    <option value="W8IL27UCYQ_m">W8IL27UCYQ_m</option>
                                    <option value="1OPYKBGXVN_1">1OPYKBGXVN_1</option>
                                </select>
                            </div>
                        </div>
                        <button class="list-button" onclick="deleteNameTagWithFilename(); return false">Delete Name Tag</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #delete-name-tag-with-filename | #DNTWF -->

    </section><!-- .inner-container -->
</section><!-- #name-tags-container -->