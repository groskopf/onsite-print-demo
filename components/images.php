<section id="image-container" class="main">
    <header class="header-parrent" onclick="openContent()">               
        <h2>Images</h2>
        <div class="arrow"></div>
    </header>
    <section class="inner-container">

        <div id="get-images" class="wrapper get">
            <header onclick="openContent()">               
                <h3><span>Get</span>Get Images</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <button class="list-button" onclick="getImages(); return false">Get Images</button>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-images -->

        <div id="upload-image" class="wrapper post">
            <header onclick="openContent()">               
                <h3><span>Post</span>Upload Image</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form id="image-form" name="image-form" action="POST" onsubmit="return false">
                        <input class="image-form-input" type="file" name="image" required>
                        <button class="list-button" onclick="uploadImage(); return false">Upload Image</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #upload-image -->

        <div id="get-image" class="wrapper get">
            <header onclick="openContent()">               
                <h3><span>Get</span>Get Image</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form id="get-image-form" name="get-image-form" action="POST" onsubmit="return false">
                        <div class="input-outer">
                            <label for="get-image-form-input">Image Filename</label>
                            <input id="get-image-form-input" name="image-file-name" type="text" required>
                        </div>
                        <button class="list-button" onclick="getImage(); return false">Get Image</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-image -->

        <div id="delete-image" class="wrapper delete">
            <header onclick="openContent()">               
                <h3><span>Delete</span>Delete Image</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form id="delete-image-form" name="delete-image-form" action="POST" onsubmit="return false">
                        <div class="input-outer">
                            <label for="delete-image-form-input">Image Filename</label>
                            <input id="delete-image-form-input" name="image-file-name" type="text" required>
                        </div>
                        <button class="list-button" onclick="deleteImage(); return false">Delete Image</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #delete-image -->

    </section><!-- .inner-container -->
</section><!-- #image-container -->