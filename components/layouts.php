<section id="layouts-container" class="main last">
    <header class="header-parrent" onclick="openContent()">               
        <h2>Layouts</h2>
        <div class="arrow"></div>
    </header>
    <section class="inner-container">

        <div id="get-all-name-tag-types" class="wrapper get">
            <header onclick="openContent()">               
                <h3><span>Get</span>Get all Name Tag Types</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <button class="list-button" onclick="getAllNameTagTypes(); return false">Get all Name Tag Types</button>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-all-name-tag-types | #GANTT -->

        <div id="get-all-sheet-types" class="wrapper get">
            <header onclick="openContent()">               
                <h3><span>Get</span>Get all Sheet Types</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <button class="list-button" onclick="getAllSheetTypes(); return false">Get all Sheet Types</button>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-all-sheet-types | #GAST -->

        <div id="get-name-tag-type" class="wrapper get">
            <header onclick="openContent()">               
                <h3><span>Get</span>Get Name Tag Type</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="get-name-tag-type" action="POST" onsubmit="return false">
                        <div class="form-inner">
                            <div class="input-outer">
                                <label for="GNTT-name-tag-type-select">Name Tag Type</label>
                                <select id="GNTT-name-tag-type-select" name="name-tag-type" required>
                                    <option value="4786103">4786103</option>
                                    <option value="4760100">4760100</option>
                                </select>
                            </div>
                        </div>
                        <button class="list-button" onclick="getNameTagType(); return false">Get Name Tag Type</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-name-tag-type | #GNTT -->

        <div id="get-sheet-type" class="wrapper get">
            <header onclick="openContent()">               
                <h3><span>Get</span>Get Sheet Type</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="get-sheet-type" action="POST" onsubmit="return false">
                        <div class="form-inner">
                            <div class="input-outer">
                                <label for="GST-sheet-type-select">Sheet Type</label>
                                <select id="GST-sheet-type-select" name="sheet-type" required>
                                    <option value="4669100">4669100</option>
                                    <option value="464764">464764</option>
                                    <option value="463770">463770</option>
                                </select>
                            </div>
                        </div>
                        <button class="list-button" onclick="getSheetType(); return false">Get Sheet Type</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-sheet-type | #GST -->

    </section><!-- .inner-container -->
</section><!-- #layouts-container -->