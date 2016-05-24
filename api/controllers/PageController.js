/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  main: function (req, res) {
    if (req.user || req.wantsJSON) {return res.redirect('/admin');}
    return res.view('main');
  },
	admin: function (req, res) {
    var token = req.headers.Authorization;
    return res.view('admin', {
      locals: {
        token: token,
        layout: 'adminLayout'
      }
    });
  },
  welcome: function (req, res) {
    return res.view('user/welcome');
  },
  login: function(req, res) {
    sails.log.info('PageController:login:(1) user: ', req.user )
    if (req.user) {return res.redirect('/admin');}
    return res.view('user/login');
  },
  logout: function(req, res) {
    return res.view('user/logout');
  },
  signup: function(req, res) {
    return res.view('user/signup');
  },
  profile: function(req, res) {
    return res.view('user/profile');
  }
};

