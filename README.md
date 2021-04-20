# CapeWorld

## Idea:

A **fancy** Superhero-wiki-like application.  
The application communicates with a couple of different APIs to get information about superheroes/supervillains and related topics like comics, films, actors, etc.

## Team:

- Johannes Gerstbauer (s2010629002)
- Regina Schrattmaier(s2010629009)

## Deployment

1. navigate into the client folder
2. run "npm run build" to build the vue.js-application
3. when building was successfully, a folder called "public" is generated in the root directory. This folder contains the built vue.js-app.
4. copy all files in the root directory (except: client-folder, node_modules) to the server

## API-Credentials

In the root directory of the application, a file called "api_credentials.js" contains all the credentials for accessing the APIs. Note that this file is not versioned since it is mentioned in the .gitignore-file.
