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
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-list-from-csv-with-semicolon-extra | #GLFCWSE -->

    </section><!-- .inner-container -->
</section><!-- #csv-container -->