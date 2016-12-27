/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  home: function (req, res) {
    if (req.user || req.wantsJSON ||  req.session.token) {return res.redirect('admin');}
    return res.view('public/homepage');
  },
	admin: function (req, res) {
    var token = req.session.token;
    return res.view('admin', {
      locals: {
        token: token,
        layout: 'admin/layout'
      }
    });
  },
  login: function(req, res) {
    sails.log.info('PageController:login:(1) user: ', req.session.token )
    if (req.user) {return res.redirect('/admin');}
    if (req.method == "POST"){return}
    return res.view('login/login', {
      locals: {
        layout: 'login/layout'
      }
    });
  },
  logout: function(req, res) {
    return res.view('login/logout', {
      locals: {
        layout: 'login/layout'
      }
    });
  },
  signup: function(req, res) {
    return res.view('login/signup');
  },
  profile: function(req, res) {
    return res.view('admin/user/profile');
  }
};

