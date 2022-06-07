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
                    <form name="get-list" onsubmit="getListFromCsvWithSemicolon(); return false">
                        <input id="GL-csv-file-input" name="csv-file" type="file" required>
                        <button class="list-button">Get List</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-list | #GL -->

    </section><!-- .inner-container -->
</section><!-- #csv-container -->