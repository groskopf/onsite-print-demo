<section id="image-container" class="main">
    <header class="header-parrent" onclick="openContent()">               
        <h2>Images</h2>
        <div class="arrow"></div>
    </header>
    <section class="inner-container">

        <div id="get-all-images" class="wrapper get">
            <header onclick="openContent()">               
                <h3><span>Get</span>Get all Images</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <button class="list-button" onclick="getAllImages(); return false">Get all Images</button>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-all-images -->

        <div id="upload-new-image" class="wrapper post">
            <header onclick="openContent()">               
                <h3><span>Post</span>Upload new Image</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="upload-new-image" action="POST" onsubmit="return false">
                        <input id="upload-new-image-image-file" name="image" type="file" required>
                        <button class="list-button" onclick="uploadNewImage(); return false">Upload new Image</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #upload-new-image -->

        <div id="get-image-with-filename" class="wrapper get">
            <header onclick="openContent()">               
                <h3><span>Get</span>Get Image with Filename</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="get-image-with-filename" action="POST" onsubmit="return false">
                        <div class="input-outer">
                            <label for="get-image-with-filename-input">Image Filename</label>
                            <input id="get-image-with-filename-input" name="image-filename" type="text" required>
                        </div>
                        <button class="list-button" onclick="getImageWithFilename(); return false">Get Image</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-image-with-filename -->

        <div id="delete-image-with-filename" class="wrapper delete">
            <header onclick="openContent()">               
                <h3><span>Delete</span>Delete Image with Filename</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="delete-image-with-filename" action="POST" onsubmit="return false">
                        <div class="input-outer">
                            <label for="delete-image-with-filename-input">Image Filename</label>
                            <input id="delete-image-with-filename" name="image-filename" type="text" required>
                        </div>
                        <button class="list-button" onclick="deleteImageWithFilename(); return false">Delete Image</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #delete-image-with-filename -->

    </section><!-- .inner-container -->
</section><!-- #image-container -->