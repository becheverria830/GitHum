# CSE-416-Mixtape-App

## Overview
This repository will be used to track the frontend & backend for our CSE-416 course, where we will develop a web application related to creating, sharing, and listening to playlists.

## Installation
To begin setup, install the following tools:
1. Git Command Line
1. Docker
1. Docker-Compose

Then, we will pull the repository using the following command:
```
git clone https://github.com/JHerrmann01/CSE-416-Mixtape-App.git
```

Now, we have the repository and all the associated code on our development environment and can begin working on it!

## Running Application Locally

Without Docker:
1. Open a command line / terminal.
1. Navigate to your CSE-416-Mixtape-App folder.
1. Navigate to the api folder.
1. Run the command npm start
1. Leave this terminal open, and open another terminal.
1. Navigate to your CSE-416-Mixtape-App folder.
1. Navigate to the client folder.
1. Run the command npm start
1. Visit localhost on your browser and you will see the web application.

With Docker:
1. Open a command line / terminal.
1. Navigate to your CSE-416-Mixtape-App folder.
1. Run the command sudo docker-compose up
1. Visit localhost on your browser and you will see the web application.

## Making Changes

Without Docker:
1. While you have the server running, whenever you save a file your page should refresh and you should see the changes.

## Pushing Changes

To Github:
1. git status
1. git add <list of files you've edited and want to push to our code base>
1. git commit -m "<insert commit message here>"
1. git push

To Docker:
1. sudo docker login
1. navigate to /api/
  1. sudo docker build -t jherrmann01/mixtape-app-api .
  1. sudo docker tag jherrmann01/mixtape-app-api jherrmann01/mixtape-app-api:<insert version number here(ex: v1)>
  1. sudo docker push jherrmann01/mixtape-app-api:<insert version number here(ex: v1)>
1. navigate to /client/
  1. sudo docker build -t jherrmann01/mixtape-app-client .
  1. sudo docker tag jherrmann01/mixtape-app-client jherrmann01/mixtape-app-client:<insert version number here(ex: v1)>
  1. sudo docker push jherrmann01/mixtape-app-client:<insert version number here(ex: v1)>

## General Tips

##### This is a good place to record problems you ran into and how you solved them for other people in the group to see

1.
1.
1.
1.
