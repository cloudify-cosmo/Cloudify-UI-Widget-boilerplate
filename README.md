# Widget Writing env boilerplate

### Build the project

#### First run
```
npm install
```

#### Change the configuration files to point to the manager you want to access
in /conf/app.json change "influx.ip" if you want to use graphs from an influx server (By default on the manager machine, just make sure you open port 8086)
in /conf/manager.json change "ip" to point to the manager you are using

#### To set up the dev env run
```
grunt build
```

This will setup the stage server and will copy your widgets to the widget library of the server.

#### Start the server by running:

```
npm start
```

### For widget development

For development purposes setup the server as described above
also run both grunt tasks in different command windows:

```
grunt widgets
```

This will compile the widgets (from widget src folder) and create widget.js from it.


```
grunt widgetsCopy
```

This will start a listener on the widgets library and will copy any changes you make on the fly to the server
You will have to click refresh on the browser for it to take effect.


** Note: im trying to combine those but it took too much effort so i left it like this.


In order to deploy this to prod environment,  need to run the first 2 steps (copy stage server files and run 'grunt build').
then copy the dist lib (zip it and unzip in server)

#### DB configuration
You have a few options
First one is to use the db on the manager machine.
To do so you will have to change the configuration file to point to it. conf/app.json , change "db.url" to postgres://cloudify:cloudify@your-manager-ip:5432/stage

Second option is to create your own db (usually on localhost).
You will have to install postgress
create a db called stage
create a user called cloudify with password cloudify and grant it access to stage db
start that db
If its not on localhost or you have different configuration (different user name, different db) you will have to chagne the configuration db.url option.

Then you will have to run the migration process to create stage tables on that db.

```
cd dist/backend
npm run db-migrate
```

** This will have to happen after you copied the configuration file if you changed it so it will know which DB to connect to.


#### Start the server by running

```
export NODE_TLS_REJECT_UNAUTHORIZED=0
cd dist/backend
node server.js
```

** first line is to use ssl for the manager communications without using the certificate file. You can also change the manager communication to use http on port 80 in manager.json config file.

## Zip the widgets

You can zip the widgets so you can install them on an existing stage environment.
Each widget is zipped in a single zip file (we currently dont support multiple widgets per zip).

To zip all the widgets in your env run

```
grunt widgetsZip
```

This will create a zip file for each widget in the 'output' folder

You can take those zip files and install them (via edit-mode->add widget->install) in an existing stage envorinment.


### other grunt tasks
If you add another widget library and want it to take effect (copy to dist) either run "grunt build", or simply run - "grunt registerWidget"

If you change the configuration files after you already ran grunt build once, no need to run it again. Simply change the configuration and run

```
grunt copy:resources
```