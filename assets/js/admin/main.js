
      // Var to save the JWT token in memory when we have igt

      // Simple function to transform regular links into asynchronous html loaders
      var gotoPage = function(url) {
        // Clear out any errors being displayed
        $('#errors').html('');
        // Make an AJAX GET request with an Authorization header bearing our JWT token (if any)
        $.ajax(url, {
          method: 'get',
          dataType: 'text',
          headers: {
            'Authorization': 'Bearer ' + jwtToken,
          },
          // If the request is successful, display the HTML in the content area
          success: function(html) {
            $('#content').html(html);
          },
          // Otherwise display the errors in the error area
          error: function(jqXHR) {
            $('#errors').html(jqXHR.responseText);
          }
        });
      }

      // Special handler for the "logout" link -- clear the JWT token before
      // loading the "/logout" page content
      $( document ).on( 'click', 'a[href="/logout"]', function(e) {
        jwtToken = null;
      });

      // When a link is clicked, instead of the default behavior (loading a page in the browser)
      // we'll make an AJAX request for the page content, and place that content in the #content DIV,
      // making this a simple SPA (single-page app)
      $( document ).on( 'click', '.get', function(e) {
        sails.log.info('admin/main.js:gotoPage:(1): a with get found ', e);
        // Prevent the default behavior when clicking a link
        e.preventDefault();
        // Don't propagate this click to other elements on the page
        e.stopPropagation();
        // Use our gotoPage function to load the page contents
        gotoPage($(this).attr('href'));
      });

      // When the "submit" button is clicked on the login page, attempt to log in
      $( document ).on( 'click', '#submitLogin', function onSubmitLogin(e) {
        $('#errors').html('');
        e.preventDefault();
        $.ajax('/login', {
          method: 'post',
          contentType: 'application/json',
          processData: false,
          data: JSON.stringify({
            email: $('input[name=email]').val(),
            password: $('input[name=password]').val()
          }),
          // If the login is successful, save the JWT token and load the home page
          success: function(newToken) {
            jwtToken = newToken;
            gotoPage('/');
          },
          // If not, update the "errors" section on the page
          error: function(jqXHR, text) {
            $('#errors').html(jqXHR.responseText);
          }
        });
      });

      // When the "submit" button is clicked on the signup page, attempt to sign up
      $( document ).on( 'click', '#submitSignup', function onSubmitSignup(e) {
        $('#errors').html('');
        e.preventDefault();
        $.ajax('/signup', {
          method: 'post',
          contentType: 'application/json',
          processData: false,
          data: JSON.stringify({
            name: $('input[name=name]').val(),
            email: $('input[name=email]').val(),
            password: $('input[name=password]').val()
          }),
          // If the signup is successful, save the JWT token and load the welcome page
          success: function(newToken) {
            jwtToken = newToken;
            gotoPage('/welcome');
          },
          // If not, update the "errors" section on the page
          error: function(jqXHR, text) {
            $('#errors').html(jqXHR.responseText);
          }
        });
      });