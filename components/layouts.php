<section id="layouts-container" class="main last">
    <header class="header-parrent" onclick="openContent()">               
        <h2>Layouts</h2>
        <div class="arrow"></div>
    </header>
    <section class="inner-container">

        <div id="get-nameplate-type-layouts" class="wrapper get">
            <header onclick="openContent()">               
                <h3><span>Get</span>Get Nameplate Type Layouts</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <button class="list-button" onclick="getNameplateTypeLayouts(); return false">Get Layouts</button>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-nameplate-type-layouts -->

        <div id="get-label-type-layouts" class="wrapper get">
            <header onclick="openContent()">               
                <h3><span>Get</span>Get Label Type Layouts</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <button class="list-button" onclick="getLabelTypeLayouts(); return false">Get Layouts</button>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-label-type-layouts -->

        <div id="get-layouts-with-nameplate" class="wrapper get">
            <header onclick="openContent()">               
                <h3><span>Get</span>Get Layouts with Nameplate</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="get-layouts-with-nameplate" action="POST" onsubmit="return false">
                        <div class="form-inner">
                            <div class="input-outer">
                                <select class="get-layouts-with-nameplate-select" name="printer-code" required>
                                    <option value="XDESP95271_p">Printer 1</option>
                                    <option value="W8IL27UCYQ_m">Printer 2</option>
                                    <option value="1OPYKBGXVN_1">Printer 3</option>
                                </select>
                            </div>
                        </div>
                        <button class="list-button" onclick="getLayoutsWithNameplate(); return false">Get Layouts</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-layouts-with-nameplate -->

    </section><!-- .inner-container -->
</section><!-- #layouts-container -->