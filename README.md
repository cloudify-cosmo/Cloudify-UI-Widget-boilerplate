# Custom Widget Development Environment (CWDE)

Custom Widget Development Environment, or CWDE in short, allows a user to create his own, custom widgets for Cloudify Stage utilizing the powerful Cloudify Api.
There are hundreds of options and components available for customizing your Cloudify Stage experience. Learn more by checking the [Cloudify Docs](http://docs.getcloudify.org/dev/manager_webui/custom-widgets/#widget-file-structure).

An example widget (`Sample Widget`) has been included with CWDE installation. You can use it as a template for developing our own, more complex widgets.
#### Installation

1. Clone the current repository to your computer:
```
git clone https://github.com/cloudify-cosmo/Cloudify-UI-Widget-boilerplate.git
cd Cloudify-UI-Widget-boilerplate
```

2. Make sure you have the appropriate cloudify-stage version configured in package.json:
```
"cloudify-stage-dist": "http://cloudify-release-eu.s3.amazonaws.com/cloudify/17.11.22/build/cloudify-stage-17.11.22-community.tgz"
```

3. Download the necessary npm libraries:
```
npm install
```

4. Adjust configuration files to point to your Cloudify instance (you need to have one running in order to use CWDE).
```
in /conf/app.json change "influx.ip" if you want to use graphs from an influx server (By default on the manager machine, just make sure you open port 8086)
in /conf/manager.json change "ip" to point to the manager you are using
```

5. Download authentication token from your Cloudify instance. You can either:
* Manually put the *admin_token* file, if you already have it, into /security/ directory, or
* Use the provided automated script to pull the appropriate *admin_token* directly from your Cloudify manager. To do so, however, you will need to have direct ssh access to the Cloudify host.
Please see the /security/download_token.sh script and fill in the required fields before running it:
```
export KEY_PATH=./security/cloudify.key
export MANAGER_IP="10.239.0.180"
```
> `KEY_PATH` is where your private SSH key resides. This is the same file that was used during Cloudify manager instance creation. \
> `MANAGER_IP` the same IP address as in #step 4

then run the ```download_token.sh``` script (skip if you already have the *admin_token* file).

5. Build the project
```
grunt build
```
> Note: This will setup the stage server and will copy your widgets to the widget library of the server.
You should have a new directory */dist* added to the root folder.
Should you need to change configuration in the future please remember to edit the *manager.json* file in the */conf* directory (not *dist/conf/manager.json*).
After editing any of the configuration files you must re-run `grunt build` in order to refresh */dist* directory.

This step concludes CWDE installation.

#### Running the Server

###### DB configuration
Before the server can be started you need to prepare a valid DB connection for the "Proxy" to use. There are two possible options to achieve this:
* First one is to use the db on the manager machine.
To do so you will have to change the configuration in *conf/app.json* to point to the correct address:
`"url": "postgres://cloudify:cloudify@localhost:5432/stage"`

* Second option is to create your own db (usually on localhost).
To do so you need to install postgress on your machine
create a database called `stage`
create a user called `cloudify` with password `cloudify` and grant it access to the `stage` db
start that db
If its not on localhost or you have different configuration (different user name, different db) you will have to chagne the configuration db.url option.

Should you decide to run with a local DB, you will have to run the migration process to create stage tables in the new database:

```
cd dist/backend
npm run db-migrate
```

> Note: Please remember to re-build the */dist* folder after each change in the configuraion. Otherwise the "Proxy" will not notice the changes (#Installation->step 5)

###### Starting the server

In order to run the CWDE you will need to start three separate processes in parallel (separate terminal sessions):

```
cd dist/backend/
npm start

cd ../../
grunt widgets
grunt widgetsCopy
```

> Note: You may need to run `export NODE_TLS_REJECT_UNAUTHORIZED=0` before `npm start` to enable ssl for the manager communications without using the certificate file.
> Alternatively, you can change the manager.json to use `http` and port `80` instead.

* `npm start` - runs the "backend" or "proxy" server mediating between the Cloudify manager and your local UI.
* `grunt widgets` - compiles the widgets (from widget src folder) and create widget.js from it.
* `grunt widgetsCopy` - starts a listener on the widgets library and will copy any changes you make on the fly to the server
                        You will have to click refresh on the browser for it to take effect.

> Note: The last two functions may be amalgamated into a single process in the future.

This concludes CWDE start-up. You can now access your CWDE UI by navigating to http://localhost:8088/.
All of your custom widgets will be available there immediately after page refresh.


##### Exporting widgets

Once you have developed your first few widgets you may want to share them. To do so you will have to zip them, and upload to your Cloudify instance via `Add widget` feature.
To zip all the widgets in your CWDE run the following command:

```
grunt widgetsZip
```

This will create a zip file for each widget in the 'output' folder
> Note: Each widget will be zipped to a separate zip file (Cloudify currently does not support multiple widgets per zip).

You can take the result zip files and install them (via edit-mode->add widget->install) in an existing Cloudify Stage environment.

##### Other useful commands
* If you add another widget library and want it to take effect (copy to dist) either run `grunt build`, or simply run `grunt registerWidget`
* If you change the configuration files after you already ran grunt build once, no need to run it again. Simply change the configuration and run `grunt copy:resources`