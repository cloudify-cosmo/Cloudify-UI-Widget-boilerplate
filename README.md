# Widget Development Environment (WDE) Boilerplate

Custom Widget Development Environment, or WDE in short, allows a user to create his own, custom widgets for Cloudify Stage utilizing the powerful Cloudify API.

There are hundreds of options and components available for customizing your Cloudify Stage experience. Learn more by checking the [Cloudify Documentation](http://docs.cloudify.co) (see section: **Manager Web Interface** > **Creating Custom Widgets**).

An example widget (`Sample Widget`) has been included with WDE installation. You can use it as a template for developing our own, more complex widgets.


## Setup
- Install [NodeJS v8.9.4](https://nodejs.org/en/)
- Install [Grunt-CLI](https://gruntjs.com/): `npm install -g grunt-cli` (possibly you need to prepend it with `sudo` if you run on Linux/Mac)
- Clone repository: `git clone https://github.com/cloudify-cosmo/Cloudify-UI-Widget-boilerplate`
- Install dependencies: `cd Cloudify-UI-Widget-boilerplate && npm install`

## Widget Development
- Create your new widget directory (in `widgets` directory: `widgets/<new-widget-id>`)
- You can use working example as a base: [widgets/sampleWidget](widgets/sampleWidget)
- Add your code

Widgets directory and files structure as well as API is described in details in [Cloudify Documentation](http://docs.cloudify.co) (see section: **Manager Web Interface** > **Creating Custom Widgets**). 

## Widget Build
- Execute `grunt widgetsZip`
- After successful execution your widget package is in: `output/<new-widget-id>.zip`

## Widget Test & Installation
- Log in to Cloudify UI
- Turn on **Edit Mode** and click **Add widget** button
- Click **Install new widget** button
- Upload your `output/<new-widget-id>.zip` file and click **Install widget** button
- After successful installation find your widget in the list of all widgets installed, select it and click **Add selected widget** button