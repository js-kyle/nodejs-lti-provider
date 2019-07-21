
<h1 align="center">
  <br>
  nodejs-lti-provider
  <br>
</h1>

<h4 align="center">A minimal LTI provider example using Node.js.</h4>
<p align="center">
    <img alt="GitHub" src="https://img.shields.io/github/license/js-kyle/nodejs-lti-provider.svg">
</p>

A working demo of this application can be found at https://nodejs-lti-provider.herokuapp.com, or, you can deploy your own

<a href="https://heroku.com/deploy">
  <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy">
</a>

## Overview

This project is a minimal example of an LTI provider application. It contains:

- a launch URL to process incoming launch messages from an LTI consumer, generally an LMS
- an in memory session store, to track the user once logged in
- an example page which can only be seen by a logged in user

**Note: This project does not include security and production best practices, and is intended for demo of LTI flow only.**

## Installation

```
# install dependencies using npm
$ npm install

# Run the app
$ npm start
```

## Usage

`GET /` check the application is available

`GET /application` this is a demo of a protected page, which will display the name and some information about the logged in user

`POST /launch_lti` LTI launch URL. This receives a `application/x-www-form-urlencoded` POST request, with the parameters passed according to the LTI specification. This will redirect the user to `/application` once logged in successfully

## Demo consumer secret and keys

This application uses demo consumer key and secrets. In production, these should be stored securely, rather than inside source code.

| Consumer key  | Consumer secret  | 
| --- | --- |
| demo | xzc342AScx |
| demo2 | dh43fvL-ew |

## About LTI

LTI (Learning Tools Interoperability®) provides a standard mechanism for authorizing users accessing a web-based application (Tool Provider) from another web-based application (Tool Consumer, typically an LMS). It can be seen as replacing a login page which a Tool Provider may otherwise have provided and avoids the need to distribute a username and password to each user. Instead a signed launch message is received from the Tool Consumer which can be verified and then trusted. This message should contain sufficient data from which to create user accounts and relevant resources (or resource mappings) "on-the-fly". Users gain a seamless experience without the need for any pre-provisioning, involvement of any other servers (for example, identity providers), or changing of any firewalls (message is sent through the user's browser). LTI works best when the Tool Provider delegates full responsibility for authorizing users to the Tool Consumer and does not allow users to directly access their system, thereby bypassing this authorization. This means that there is no need for the two systems to be synchronized with any changes to user privileges, so there is no risk of a user being given access to resources to which they are no longer entitled.


