<section id="sheets-container" class="main">
    <header class="header-parrent" onclick="openContent()">               
        <h2>Sheets</h2>
        <div class="arrow"></div>
    </header>
    <section class="inner-container">

        <div id="get-all-sheets" class="wrapper get">
            <header onclick="openContent()">               
                <h3><span>Get</span>Get all Sheets</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <button class="list-button" onclick="getAllSheets(); return false">Get all Sheets</button>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-all-sheets | #GAS -->

        <div id="create-new-sheet" class="wrapper post">
            <header onclick="openContent()">               
                <h3><span>Post</span>Create new Sheet</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="create-new-sheet" action="POST" onsubmit="return false">
                        <div class="form-inner">
                            <div class="input-outer">
                                <label for="CNS-sheet-type-select">Sheet Type</label>
                                <select id="CNS-sheet-type-select" name="sheet-type" required>
                                    <option value="456090">456090</option>
                                    <option value="454070">454070</option>
                                    <option value="454075">454075</option>
                                </select>
                            </div>
                            <div class="input-outer">
                                <label for="CNS-layout-select">Layout</label>
                                <select id="CNS-layout-select" name="layout" required>
                                    <option value="layout_1">layout_1</option>
                                    <option value="invalid">invalid</option>
                                </select>
                            </div>
                            <div class="input-outer">
                                <label for="CNS-image-filename-input">Image Filename</label>
                                <input id="CNS-image-filename-input" name="image-filename" type="text" required>
                            </div>
                            <div class="input-outer">
                                <label for="CNS-qr-code-input">QR-Code</label>
                                <input id="CNS-qr-code-input" name="qr-code" type="text" required>
                            </div>
                        </div>
                        <button class="list-button" onclick="createNewSheet(); return false">Create new Sheet</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #create-new-sheet | #CNS -->

        <div id="get-sheet-with-filename" class="wrapper get">
            <header onclick="openContent()">               
                <h3><span>Get</span>Get Sheet with Filename</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="get-sheet-with-filename" action="POST" onsubmit="return false">
                        <div class="input-outer">
                            <label for="GSWF-filename-input">Filename</label>
                            <input id="GSWF-filename-input" name="filename" type="text" required>
                        </div>
                        <button class="list-button" onclick="getSheetWithFilename(); return false">Get Sheet</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-sheet-with-filename | #GSWF -->

        <div id="delete-sheet-with-filename" class="wrapper delete">
            <header onclick="openContent()">               
                <h3><span>Delete</span>Delete Sheet with Filename</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="delete-sheet-with-filename" action="POST" onsubmit="return false">
                        <div class="input-outer">
                            <label for="DSWF-filename-input">Filename</label>
                            <input id="DSWF-filename-input" name="filename" type="text" required>
                        </div>
                        <button class="list-button" onclick="deleteSheetWithFilename(); return false">Delete Sheet</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #delete-sheet-with-filename | #DSWF -->

    </section><!-- .inner-container -->
</section><!-- #sheets-container -->