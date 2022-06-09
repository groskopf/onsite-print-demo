<section id="csv-container" class="main last">
    <header class="header-parrent" onclick="openContent()">               
        <h2>CSV</h2>
        <div class="arrow"></div>
    </header>
    <section class="inner-container">

        <div id="get-list-from-csv-with-semicolon" class="wrapper get">
            <header onclick="openContent()">               
                <h3><span>Get</span>Get List from CSV with Semicolon</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="get-list-from-csv-with-semicolon" onsubmit="getListFromCsvWithSemicolon(); return false">
                        <input id="GLFCWS-csv-file-input" name="csv-file" type="file" required>
                        <button class="list-button">Get List</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-list-from-csv-with-semicolon | #GLFCWS -->

        <div id="get-list-from-csv-with-comma" class="wrapper get">
            <header onclick="openContent()">               
                <h3><span>Get</span>Get List from CSV with Comma</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="get-list-from-csv-with-comma" onsubmit="getListFromCsvWithComma(); return false">
                        <input id="GLFCWC-csv-file-input" name="csv-file" type="file" required>
                        <button class="list-button">Get List</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-list-from-csv-with-comma | #GLFCWC -->

        <div id="get-list-from-csv-with-semicolon-extra" class="wrapper get">
            <header onclick="openContent()">               
                <h3><span>Get</span>Get List from CSV with Semicolon Extra</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="get-list-from-csv-with-semicolon-extra" onsubmit="getListFromCsvWithSemicolonExtra(); return false">
                        <input id="GLFCWSE-csv-file-input" name="csv-file" type="file" required>
                        <button class="list-button">Get List</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div id="grid" class="grid-list"></div>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-list-from-csv-with-semicolon-extra | #GLFCWSE -->

        <div id="create-list-from-csv-with-semicolon" class="wrapper post">
            <header onclick="openContent()">               
                <h3><span>Post</span>Create List from CSV with Semicolon</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="upload-csv-with-semicolon-to-grid" onsubmit="uploadCsvWithSemicolonToGrid(); return false">
                        <input id="CLFCWS-csv-file-input" name="csv-file" type="file" required>
                        <button class="list-button">Uplaod List</button>
                    </form>
                </div>
                <div id="upload-grid" class="grid-list"></div>
                <div class="form-container">
                    <button class="button-save-csv list-button">Save as CSV</button>
                    <button class="list-button" onclick="getListFromGridWithSemicolonExtra(); return false">Get List</button>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #create-list-from-csv-with-semicolon | #CLFCWS -->

    </section><!-- .inner-container -->
</section><!-- #csv-container -->