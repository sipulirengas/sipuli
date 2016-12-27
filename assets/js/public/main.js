
      // Var to save the JWT token in memory when we have igt
      var jwtToken;

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
      $( document ).on( 'click', 'a', function(e) {
        // Prevent the default behavior when clicking a link
        e.preventDefault();
        // Don't propagate this click to other elements on the page
        e.stopPropagation();
        // Use our gotoPage function to load the page contents
        gotoPage($(this).attr('href'));
      });

   