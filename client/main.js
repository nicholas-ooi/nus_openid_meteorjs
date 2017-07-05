import { Template } from 'meteor/templating';
import { OAuth } from 'meteor/oauth'
import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'
import { HTTP } from 'meteor/http'

import './main.html';

Template.hello.onRendered( () => {
  console.log(Router.current().params.query);
  console.log(Router.current().params.query["openid.identity"])
  // store identity in a session or persistant storage such as mongoDB?
  //Router.current().params.query["openid.identity"]

});


Template.hello.events({
  'click button'(event, instance) {


    try {


      var loginUrl = 'https://openid.nus.edu.sg/auth/' +
      '?openid.ns=http://specs.openid.net/auth/2.0' +
      '&openid.mode=checkid_setup' +
      '&openid.return_to=http://localhost:3000' +
      '&openid.realm=' + Meteor.absoluteUrl() +
      '&openid.ax_mode=fetch_request' +
      '&openid.ns.ax=http://openid.net/srv/ax/1.0' +
      '&openid.ns.sreg=http://openid.net/extensions/sreg/1.1' +
      '&openid.identity=http://specs.openid.net/auth/2.0/identifier_select' +
      '&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select' +
      '&openid.ax.type.contact_email=http://axschema.org/contact/email' +
      '&openid.ax.type.nickname=http://axschema.org/nickname' +
      '&openid.ax.required=contact_email,nickname' +
      '&oopenid.sreg.required=email' +
      "&controller=server&action=index&module=default"

      OAuth.launchLogin({
        loginService: 'nus',
        loginStyle: "redirect",
        loginUrl: loginUrl,
        credentialRequestCompleteCallback: function(data)
        {
          console.log(data)
        },
        credentialToken: Random.secret()
      });

    } catch (e) {
      console.log("error")
    }

  }
});
