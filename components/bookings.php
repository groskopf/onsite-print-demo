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