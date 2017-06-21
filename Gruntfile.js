/**
 * Created by kinneretzin on 02/10/2016.
 */

var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

    grunt.registerTask("prepareModules", "Finds and prepares modules for concatenation.", function() {

        // get the current concat object from initConfig
        var browserify = grunt.config.get('browserify') || {};
        var watch = grunt.config.get('watch') || {};

        // get all module directories
        grunt.file.expand("widgets/**/src").forEach(function (dir) {

            var destDir = dir.substr(0,dir.lastIndexOf('/src'));

            // get the module name from the directory name
            //var dirName = destDir.substr(destDir.lastIndexOf('/')+1);

            // create a subtask for each module, find all src files
            // and combine into a single js file per module
            browserify.widgets.files[destDir+'/widget.js'] = [dir + '/**/*.js'];
            browserify.dist.files[destDir+'/widget.js'] = [dir + '/**/*.js'];

            watch.widgets.files.push(destDir+'/widget.js');
        });

        // add module subtasks to the concat task in initConfig
        grunt.config.set('browserify', browserify);

        grunt.config.set('watch',watch);

        console.log('browserify files:' ,browserify.widgets.files);
        console.log('watch files',watch.widgets.files);
    });

    grunt.registerTask("registerTemplates", "", function() {
        try {

            var templatesJson = JSON.parse(fs.readFileSync(path.resolve(__dirname , "dist/dist/templates/templates.json"), 'utf8'));

            grunt.file.expand("templates/*").forEach(function (dir) {

                // get the module name from the directory name
                var templateName = dir.substr(dir.lastIndexOf('/')+1);
                templateName = templateName.substr(0,templateName.indexOf('.json'));

                console.log('Adding template ' + templateName);
                if (templatesJson.indexOf(templateName) == -1) {
                    templatesJson.push(templateName);
                }
            });

            fs.writeFileSync(path.resolve(__dirname , "dist/dist/templates/templates.json"), JSON.stringify(templatesJson), 'utf8');

        } catch (e) {
            console.error(e);
        }

    });

    grunt.initConfig({
        //clean: ['.tmp'],
        browserify: {
            options: {
                transform: [[require('babelify')]],
                browserifyOptions: {
                    debug: true
                }
            },
            widgets: {
                files: {
                },
                options: {
                    watch: true,
                    keepAlive: true
                }
            },
            dist: {
                files: {
                },
                options: {
                }
            }
        },
        watch: {
            widgets: {
                files: ['widgets/*/widget.css','widgets/*/widget.png','widgets/*/images/*'],
                tasks: ['copy:widgets'],
                options: {
                    spawn: false
                }
            }
        },
        copy: {
            widgets: {
                files: [
                    {
                        expand: true,
                        cwd: 'widgets',
                        src: '**',
                        dest: 'dist/dist/widgets'
                    }
                ]
            },
            resources: {
                files: [
                    {
                        expand: true,
                        cwd: 'templates',
                        src: '**',
                        dest: 'dist/dist/templates'
                    },
                    {
                        expand: true,
                        cwd: 'conf',
                        src: '**',
                        dest: 'dist/conf'
                    },
                    {
                        expand: true,
                        src: 'resources/**',
                        dest: 'dist/dist'
                    }
                ]
            },
            server: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/cloudify-stage-dist',
                        src: '**',
                        dest: 'dist'
                    }
                ]
            }
        }
    });

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

    grunt.registerTask('widgets',
        [
            'prepareModules',
            'browserify:widgets'
        ]);

    grunt.registerTask('widgetsCopy',
        [
            'prepareModules',
            'watch:widgets'
        ]);

    grunt.registerTask('build',
        [
            'copy:server',
            'prepareModules',
            'browserify:dist',
            'copy:widgets',
            'copy:resources',
            "registerTemplates"
        ]);

};
