/**
 * Module dependencies.
 */

var path = require('path');
var pkg = require('./../../../package.json');
var util = require('util');
var yeoman = require('yeoman-generator');

/**
 * Module exports.
 */

module.exports = Generator;

/**
 * Generator constructor.
 *
 * @api public
 */

function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);

  this.name = this.name || path.basename(process.cwd());
  this.genVersion = pkg.version;

  this.sourceRoot(path.join(__dirname, '../../templates/package/'));

  this.on('end', function () {
    this.installDependencies({ skipInstall: this.options['skip-install'] });
  });
}

util.inherits(Generator, yeoman.generators.Base);

/**
 * Setup the default directory structure
 *
 * @api public
 */

Generator.prototype.setupEnv = function setupEnv() {
  this.mkdir('lib');
  this.mkdir('test');
  this.mkdir('test/spec');
};

/**
 * Generate the standard project files
 *
 * Copy over basic files that don't require any app-specific data.
 * Other files are templates that require app-specific data.
 *
 * @api public
 */

Generator.prototype.projectFiles = function projectFiles() {
  // Create in generated root
  this.copy('bowerrc', '.bowerrc');
  this.copy('karma.conf.js', 'karma.conf.js');
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
  this.copy('jshintrc', '.jshintrc');
  this.copy('travis.yml', '.travis.yml');
  this.template('bower.json');
  this.template('package.json');
  this.template('CONTRIBUTING.md');
  this.template('README.md');

  // Create in generated 'lib' dir
  this.template('../component.js', 'lib/' + this.name + '.js');

  // Create in generated 'test' dir
  this.template('../spec.js', 'test/spec/' + this.name + '.spec.js', {
    'requirePath': 'lib/' + this.name,
    'type': 'component'
  });
  this.copy('test/test-main.js', 'test/test-main.js');
};
