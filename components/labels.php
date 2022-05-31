<section id="labels-container" class="main">
    <header class="header-parrent" onclick="openContent()">               
        <h2>Labels</h2>
        <div class="arrow"></div>
    </header>
    <section class="inner-container">

        <div id="get-labels" class="wrapper get">
            <header onclick="openContent()">               
                <h3><span>Get</span>Get Labels</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <button class="list-button" onclick="getLabels(); return false">Get Labels</button>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-labels -->

        <div id="create-label" class="wrapper post">
            <header onclick="openContent()">               
                <h3><span>Post</span>Create Label</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="create-label" action="POST" onsubmit="return false">
                        <div class="form-inner">
                            <div class="input-outer">
                                <select class="sheet-type-select" name="sheet-type" required>
                                    <option value="456090">Sheet Type 1</option>
                                    <option value="454070">Sheet Type 2</option>
                                    <option value="454075">Sheet Type 3</option>
                                </select>
                                <select class="layout-select" name="layout" required>
                                    <option value="layout_1">Layout 1</option>
                                    <option value="invalid">Invalid</option>
                                </select>
                            </div>
                            <div class="input-outer">
                                <label for="image-filename-input">Image Filename</label>
                                <input id="image-filename-input" name="image-filename" type="text" required>
                            </div>
                            <div class="input-outer">
                                <label for="label-qr-code-input">QR-Code</label>
                                <input id="label-qr-code-input" name="qr-code" type="text" required>
                            </div>
                        </div>
                        <button class="list-button" onclick="createLabel(); return false">Create Label</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #create-label -->

        <div id="get-label-with-filename" class="wrapper get">
            <header onclick="openContent()">               
                <h3><span>Get</span>Get Label with Filename</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="get-label-with-filename" action="POST" onsubmit="return false">
                        <div class="input-outer">
                            <label for="get-label-with-filename-input">Filename</label>
                            <input id="get-label-with-filename-input" name="filename" type="text" required>
                        </div>
                        <button class="list-button" onclick="getLabelWithFilename(); return false">Get Label</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-label-with-filename -->

        <div id="delete-label-with-filename" class="wrapper delete">
            <header onclick="openContent()">               
                <h3><span>Delete</span>Delete Label with Filename</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="delete-label-with-filename" action="POST" onsubmit="return false">
                        <div class="input-outer">
                            <label for="delete-label-with-filename-input">Filename</label>
                            <input id="delete-label-with-filename-input" name="filename" type="text" required>
                        </div>
                        <button class="list-button" onclick="deleteLabelWithFilename(); return false">Delete Label</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #delete-label-with-filename -->

    </section><!-- .inner-container -->
</section><!-- #labels-container -->