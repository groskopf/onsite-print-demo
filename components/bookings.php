<section id="bookings-container" class="main">
    <header class="header-parrent" onclick="openContent()">               
        <h2>Bookings</h2>
        <div class="arrow"></div>
    </header>
    <section class="inner-container">

        <div id="get-all-bookings" class="wrapper get">
            <header onclick="openContent()">               
                <h3><span>Get</span>Get all Bookings</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <button class="list-button" onclick="getAllBookings(); return false">Get all Bookings</button>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-all-bookings | #GAB -->

        <div id="create-new-booking" class="wrapper post">
            <header onclick="openContent()">               
                <h3><span>Post</span>Create new Booking</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="create-new-booking" action="POST" onsubmit="return false">
                        <div class="form-inner">
                            <div class="input-outer">
                                <div class="start-date">
                                    <label for="CNB-start-date-input">Start Date</label>
                                    <input id="CNB-start-date-input" name="start_date" type="date" required>
                                </div>
                                <div class="end-date">
                                    <label for="CNB-end-date-input">End Date</label>
                                    <input id="CNB-end-date-input" name="end_date" type="date" required>
                                </div>
                            </div>
                            <div class="input-outer">
                                <label for="CNB-name-tag-type-select">Name tag Type</label>
                                <select id="CNB-name-tag-type-select" name="name_tag_type" required>
                                    <option value="4786103">4786103</option>
                                    <option value="4760100">4760100</option>
                                </select>
                            </div>
                            <div class="input-outer">
                                <label for="CNB-printer-code-select">Printer Code</label>
                                <select id="CNB-printer-code-select" name="printer_code" required>
                                    <option value="XDESP95271_p">XDESP95271_p</option>
                                    <option value="W8IL27UCYQ_m">W8IL27UCYQ_m</option>
                                    <option value="1OPYKBGXVN_1">1OPYKBGXVN_1</option>
                                </select>
                            </div>
                        </div>
                        <button class="list-button" onclick="createNewBooking(); return false">Create new Booking</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #create-new-booking | #CNB -->

        <div id="get-booking-with-booking-code" class="wrapper get">
            <header onclick="openContent()">               
                <h3><span>Get</span>Get Booking with Booking Code</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="get-booking-with-booking-code" action="POST" onsubmit="return false">
                        <div class="input-outer">
                            <label for="GBWBC-booking-code-input">Booking Code</label>
                            <input id="GBWBC-booking-code-input" name="booking-code" type="text" required>
                        </div>
                        <button class="list-button" onclick="getBookingWithBookingCode(); return false">Get Booking</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #get-booking-with-booking-code | #GBWBC -->
        
        <div id="update-booking-with-booking-code" class="wrapper put">
            <header onclick="openContent()">               
                <h3><span>Put</span>Update Booking with Booking Code</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="update-booking-with-booking-code" action="POST" onsubmit="return false">
                        <div class="form-inner">
                            <div class="input-outer">
                                <div class="start-date">
                                    <label for="UBWBC-start-date-input">Start Date</label>
                                    <input id="UBWBC-start-date-input" name="start_date" type="date" required>
                                </div>
                                <div class="end-date">
                                    <label for="UBWBC-end-date-input">End Date</label>
                                    <input id="UBWBC-end-date-input" name="end_date" type="date" required>
                                </div>
                            </div>
                            <div class="input-outer">
                                <label for="UBWBC-name-tag-type-select">Name tag Type</label>
                                <select id="UBWBC-name-tag-type-select" name="name_tag_type" required>
                                    <option value="4786103">4786103</option>
                                    <option value="4760100">4760100</option>
                                </select>
                            </div>
                            <div class="input-outer">
                                <label for="UBWBC-printer-code-select">Printer Code</label>
                                <select id="UBWBC-printer-code-select" name="printer_code" required>
                                    <option value="XDESP95271_p">XDESP95271_p</option>
                                    <option value="W8IL27UCYQ_m">W8IL27UCYQ_m</option>
                                    <option value="1OPYKBGXVN_1">1OPYKBGXVN_1</option>
                                </select>
                            </div>
                            <div class="input-outer">
                                <label for="UBWBC-booking-code-input">Booking Code</label>
                                <input id="UBWBC-booking-code-input" name="booking-code" type="text" required>
                            </div>
                        </div>
                        <button class="list-button" onclick="updateBookingWithBookingCode(); return false">Update Booking</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #update-booking-with-booking-code | #UBWBC -->

        <div id="delete-booking-with-booking-code" class="wrapper delete">
            <header onclick="openContent()">               
                <h3><span>Delete</span>Delete Booking with Booking Code</h3>
                <div class="arrow"></div>
            </header>
            <div class="content">
                <div class="form-container">
                    <form name="delete-booking-with-booking-code" action="POST" onsubmit="return false">
                        <div class="input-outer">
                            <label for="DBWBC-booking-code-input">Booking Code</label>
                            <input id="DBWBC-booking-code-input" name="booking-code" type="text" required>
                        </div>
                        <button class="list-button" onclick="deleteBookingWithBookingCode(); return false">Delete Booking</button>
                    </form>
                </div>
                <div class="responses">
                    <h4>Responses:</h4>
                    <div class="inner"></div>
                </div>
            </div>
        </div><!-- #delete-booking-with-booking-code | #DBWBC -->

    </section><!-- .inner-container -->
</section><!-- #bookings-container -->