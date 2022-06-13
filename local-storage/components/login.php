<section id="login-container" class="main active">
    <section class="inner-container">

        <div id="login-info" class="wrapper active" data-loged-in="false">
            <div class="content"></div>
        </div><!-- #login-with-booking-code | #LWBC -->

        <div id="login-with-booking-code" class="wrapper get active">
            <div class="content">
                <div class="form-container">
                    <form name="login-with-booking-code" action="POST">
                        <div class="input-outer">
                            <label for="LWBC-booking-code-input">Booking Code</label>
                            <input id="LWBC-booking-code-input" name="booking-code" type="text" required>
                        </div>
                        <button class="list-button" type="submit" onclick="loginWithBookingCode(); return false">Log in</button>
                    </form>
                </div>
            </div>
        </div><!-- #login-with-booking-code | #LWBC -->
        
        <div id="logout" class="wrapper delete">
            <div class="content">
                <div class="form-container">
                    <button class="list-button" onclick="localStorage.removeItem('login'); location.reload()">Log out</button>
                </div>
            </div>
        </div><!-- #login-with-booking-code | #LWBC -->
        
    </section><!-- .inner-container -->
</section><!-- #login-container -->