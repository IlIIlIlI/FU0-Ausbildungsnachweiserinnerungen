# osp-base
Oberstufen Projekt Basis

### Project Setup:
1. Pull project
2. open terminal:
3. "make init"  -> should run through all dependencies and build docker env
4. "make start" -> should run through startup of docker, apache2, should distill the minified environment and startup the grunt watcher
5. open browser
6. open localhost

### How to Work:
- The project workfolders are found in "../public/assets" and should keep the given folderstructure.
- Files of the same type can be added freely into the right folders. html into markup, js into js, php into php etc.
- Keep the Gruntwatcher running in a terminal session (use "make w" for startup if not started) while working.
