# REQUIRED SOFTWARE 

## On the client side
bower install angular
bower install angular-route


## On the Express side
npm install express
npm install mongoose
npm install body-parser

## On the mongodb side

$ mongod
$ mongo localhost/cambridge dbscripts/dbcambridge.js

# Branches

`git checkout basic` 

The basic branch is the starting point, it contains snippet codes that are building blocks for creating an author record using angular $http AJAX.

This version only has the ability to create author info, not yet the books associated

`git checkout with-books`

Has the ability to create books 

`git checkout with-routing-and-update`

The most complete one up to date. It can update an existing author  (and books) record. It also contains the code for building blocks of SPA (Single Page Application). It uses the angular routing



