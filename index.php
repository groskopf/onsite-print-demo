<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="icon" type="image/png" sizes="32x32" href="../_favicon/favicon-32x32.png">
    <title>FastAPI connection</title>
</head>
<body>
    <h1>FastAPI connection</h1>


    <section id="get-images" class="container blue">
        <header>
            <h2>Get Images</h2>
            <button class="list-button" onclick="getImages(); return false">Get Images</button>
        </header>
        <div class="inner"></div>
    </section><!-- #get-images -->


    <section id="upload-image" class="container blue">
        <header>
            <h2>Upload Image</h2>
            <form id="image-form" name="image-form" action="POST" onsubmit="return false">
                <input class="image-form-input" type="file" name="image" required>
                <button class="list-button" onclick="uploadImage(); return false">Upload Image</button>
            </form>
        </header>
        <div class="inner"></div>
    </section><!-- #upload-image -->


    <section id="get-image" class="container blue">
        <header>
            <h2>Get Image</h2>
            <form id="get-image-form" name="get-image-form" action="POST" onsubmit="return false">
                <input class="get-image-form-input" type="text" name="image-file-name" required>
                <button class="list-button" onclick="getImage(); return false">Get Image</button>
            </form>
        </header>
        <div class="inner"></div>
    </section><!-- #get-image -->


    <section id="delete-image" class="container blue">
        <header>
            <h2>Delete Image</h2>
            <form id="delete-image-form" name="delete-image-form" action="POST" onsubmit="return false">
                <input class="delete-image-form-input" type="text" name="image-file-name" required>
                <button class="list-button" onclick="deleteImage(); return false">Delete Image</button>
            </form>
        </header>
        <div class="inner"></div>
    </section><!-- #delete-image -->


    <section id="get-bookings" class="container green">
        <header>
            <h2>Get Bookings</h2>
            <button class="list-button" onclick="getBookings(); return false">Get Bookings</button>
        </header>
        <div class="inner"></div>
    </section><!-- #get-bookings -->


    <section id="create-booking" class="container green">
        <header>
            <h2>Create Booking</h2>
            <form name="booking-form" action="POST" onsubmit="return false">
                <div class="start-end">
                    <div class="start-date">
                        <label for="start-date-input">Start Date</label>
                        <input id="start-date-input" name="start_date" type="date">
                    </div>
                    <div class="end-date">
                        <label for="end-date-input">End Date</label>
                        <input id="end-date-input" name="end_date" type="date">
                    </div>
                </div>
                <div class="printer-tag">
                    <select class="printer-code-select" name="printer_code">
                        <option value="XDESP95271_p">Printer 1</option>
                        <option value="W8IL27UCYQ_m">Printer 2</option>
                        <option value="1OPYKBGXVN_1">Printer 3</option>
                    </select>
                    <select class="name-tag-type-select" name="name_tag_type">
                        <option value="4786103">Product 1</option>
                        <option value="4760100">Product 2</option>
                        <option value="47150106">Product 3</option>
                    </select>
                </div>
                <button class="list-button" onclick="createBooking(); return false">Create Booking</button>
            </form>
        </header>
        <div class="inner"></div>
    </section><!-- #create-booking -->


    <section id="get-booking-with-code" class="container green">
        <header>
            <h2>Get Booking with Code</h2>
            <form name="get-booking-with-code" action="POST" onsubmit="return false">
                <div class="booking-code">
                    <label for="booking-code-input">Booking Code</label>
                    <input id="booking-code-input" name="booking-code" type="text" required>
                </div>
                <button class="list-button" onclick="getBookingWithCode(); return false">Get Booking</button>
            </form>
        </header>
        <div class="inner"></div>
    </section><!-- #get-booking-with-code -->

    
    <section id="update-booking-with-code" class="container green">
        <header>
            <h2>Update Booking with Code</h2>
            <form name="update-booking-with-code" action="POST" onsubmit="return false">
                <div class="booking-code">
                    <label for="booking-code-input">Booking Code</label>
                    <input id="booking-code-input" name="booking-code" type="text" required>
                </div>
                <div class="start-end">
                    <div class="start-date">
                        <label for="start-date-input">Start Date</label>
                        <input id="start-date-input" name="start-date" type="date" required>
                    </div>
                    <div class="end-date">
                        <label for="end-date-input">End Date</label>
                        <input id="end-date-input" name="end-date" type="date" required>
                    </div>
                </div>
                <div class="printer-tag">
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
                <button class="list-button" onclick="updateBookingWithCode(); return false">Update Booking</button>
            </form>
        </header>
        <div class="inner"></div>
    </section><!-- #update-booking-with-code -->


    <section id="delete-booking-with-code" class="container green">
        <header>
            <h2>Delete Booking with Code</h2>
            <form name="delete-booking-with-code" action="POST" onsubmit="return false">
                <div class="booking-code">
                    <label for="booking-code-input">Booking Code</label>
                    <input id="booking-code-input" name="booking-code" type="text" required>
                </div>
                <button class="list-button" onclick="deleteBookingWithCode(); return false">Delete Booking</button>
            </form>
        </header>
        <div class="inner"></div>
    </section><!-- #delete-booking-with-code -->


    <script src="js/fetch.js"></script>
    <script src="js/images.js"></script>
    <script src="js/bookings.js"></script>
</body>
</html>