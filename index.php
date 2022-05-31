<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="icon" type="image/png" sizes="32x32" href="../_favicon/favicon-32x32.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    <title>Onsite-Print Demo | FastAPI connection</title>
</head>
<body>
    <h1>Onsite-Print Demo - FastAPI connection</h1>

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
    <section id="bookings-container" class="main">
        <header class="header-parrent" onclick="openContent()">               
            <h2>Bookings</h2>
            <div class="arrow"></div>
        </header>
        <section class="inner-container">

            <div id="get-bookings" class="wrapper get">
                <header onclick="openContent()">               
                    <h3><span>Get</span>Get Bookings</h3>
                    <div class="arrow"></div>
                </header>
                <div class="content">
                    <div class="form-container">
                        <button class="list-button" onclick="getBookings(); return false">Get Bookings</button>
                    </div>
                    <div class="responses">
                        <h4>Responses:</h4>
                        <div class="inner"></div>
                    </div>
                </div>
            </div><!-- #get-bookings -->

            <div id="create-booking" class="wrapper post">
                <header onclick="openContent()">               
                    <h3><span>Post</span>Create Booking</h3>
                    <div class="arrow"></div>
                </header>
                <div class="content">
                    <div class="form-container">
                        <form name="booking-form" action="POST" onsubmit="return false">
                            <div class="form-inner">
                                <div class="input-outer">
                                    <div class="start-date">
                                        <label for="start-date-input">Start Date</label>
                                        <input id="start-date-input" name="start_date" type="date" required>
                                    </div>
                                    <div class="end-date">
                                        <label for="end-date-input">End Date</label>
                                        <input id="end-date-input" name="end_date" type="date" required>
                                    </div>
                                </div>
                                <div class="input-outer">
                                    <select class="printer-code-select" name="printer_code" required>
                                        <option value="XDESP95271_p">Printer 1</option>
                                        <option value="W8IL27UCYQ_m">Printer 2</option>
                                        <option value="1OPYKBGXVN_1">Printer 3</option>
                                    </select>
                                    <select class="name-tag-type-select" name="name_tag_type" required>
                                        <option value="4786103">Product 1</option>
                                        <option value="4760100">Product 2</option>
                                        <option value="47150106">Product 3</option>
                                    </select>
                                </div>
                            </div>
                            <button class="list-button" onclick="createBooking(); return false">Create Booking</button>
                        </form>
                    </div>
                    <div class="responses">
                        <h4>Responses:</h4>
                        <div class="inner"></div>
                    </div>
                </div>
            </div><!-- #create-booking -->

            <div id="get-booking-with-code" class="wrapper get">
                <header onclick="openContent()">               
                    <h3><span>Get</span>Get Booking with Code</h3>
                    <div class="arrow"></div>
                </header>
                <div class="content">
                    <div class="form-container">
                        <form name="get-booking-with-code" action="POST" onsubmit="return false">
                            <div class="input-outer">
                                <label for="get-booking-with-code-input">Booking Code</label>
                                <input id="get-booking-with-code-input" name="booking-code" type="text" required>
                            </div>
                            <button class="list-button" onclick="getBookingWithCode(); return false">Get Booking</button>
                        </form>
                    </div>
                    <div class="responses">
                        <h4>Responses:</h4>
                        <div class="inner"></div>
                    </div>
                </div>
            </div><!-- #get-booking-with-code -->
            
            <div id="update-booking-with-code" class="wrapper put">
                <header onclick="openContent()">               
                    <h3><span>Put</span>Update Booking with Code</h3>
                    <div class="arrow"></div>
                </header>
                <div class="content">
                    <div class="form-container">
                        <form name="update-booking-with-code" action="POST" onsubmit="return false">
                            <div class="form-inner">
                                <div class="input-outer">
                                    <label for="update-booking-with-code-input">Booking Code</label>
                                    <input id="update-booking-with-code-input" name="booking-code" type="text" required>
                                </div>
                                <div class="input-outer">
                                    <div class="start-date">
                                        <label for="start-date-input">Start Date</label>
                                        <input id="start-date-input" name="start-date" type="date" required>
                                    </div>
                                    <div class="end-date">
                                        <label for="end-date-input">End Date</label>
                                        <input id="end-date-input" name="end-date" type="date" required>
                                    </div>
                                </div>
                                <div class="input-outer">
                                    <select class="printer-code-select" name="printer-code" required>
                                        <option value="XDESP95271_p">Printer 1</option>
                                        <option value="W8IL27UCYQ_m">Printer 2</option>
                                        <option value="1OPYKBGXVN_1">Printer 3</option>
                                    </select>
                                    <select class="name-tag-type-select" name="name-tag-type" required>
                                        <option value="4786103">Product 1</option>
                                        <option value="4760100">Product 2</option>
                                        <option value="47150106">Product 3</option>
                                    </select>
                                </div>
                            </div>
                            <button class="list-button" onclick="updateBookingWithCode(); return false">Update Booking</button>
                        </form>
                    </div>
                    <div class="responses">
                        <h4>Responses:</h4>
                        <div class="inner"></div>
                    </div>
                </div>
            </div><!-- #update-booking-with-code -->

            <div id="delete-booking-with-code" class="wrapper delete">
                <header onclick="openContent()">               
                    <h3><span>Delete</span>Delete Booking with Code</h3>
                    <div class="arrow"></div>
                </header>
                <div class="content">
                    <div class="form-container">
                        <form name="delete-booking-with-code" action="POST" onsubmit="return false">
                            <div class="input-outer">
                                <label for="delete-booking-with-code-input">Booking Code</label>
                                <input id="delete-booking-with-code-input" name="booking-code" type="text" required>
                            </div>
                            <button class="list-button" onclick="deleteBookingWithCode(); return false">Delete Booking</button>
                        </form>
                    </div>
                    <div class="responses">
                        <h4>Responses:</h4>
                        <div class="inner"></div>
                    </div>
                </div>
            </div><!-- #delete-booking-with-code -->

        </section><!-- .inner-container -->
    </section><!-- #bookings-container -->
    <section id="labels-container" class="main last">
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
                                    <label for="label-booking-code-input">Booking Code</label>
                                    <input id="label-booking-code-input" name="label-booking-code" type="text" required>
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

        </section><!-- .inner-container -->
    </section><!-- #labels-container -->


    <script src="js/fetch.js"></script>
    <script src="js/images.js"></script>
    <script src="js/bookings.js"></script>
    <script src="js/labels.js"></script>
</body>
</html>