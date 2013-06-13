// Karma configuration

// base path, that will be used to resolve files and exclude
basePath = '';

// list of files / patterns to load in the browser
files = [
  JASMINE,
  JASMINE_ADAPTER,
  'app/components/jquery/jquery.js',
  'app/components/angular/angular.js',
  'app/components/angular-mocks/angular-mocks.js',
  'app/components/angular-qrcode/qrcode.js',
  'app/scripts/*.js',
  'app/scripts/jsqrcode/grid.js',
  'app/scripts/jsqrcode/version.js',
  'app/scripts/jsqrcode/detector.js',
  'app/scripts/jsqrcode/formatinf.js',
  'app/scripts/jsqrcode/errorlevel.js',
  'app/scripts/jsqrcode/bitmat.js',
  'app/scripts/jsqrcode/datablock.js',
  'app/scripts/jsqrcode/bmparser.js',
  'app/scripts/jsqrcode/datamask.js',
  'app/scripts/jsqrcode/rsdecoder.js',
  'app/scripts/jsqrcode/gf256poly.js',
  'app/scripts/jsqrcode/gf256.js',
  'app/scripts/jsqrcode/decoder.js',
  'app/scripts/jsqrcode/QRCode.js',
  'app/scripts/jsqrcode/findpat.js',
  'app/scripts/jsqrcode/alignpat.js',
  'app/scripts/jsqrcode/databr.js',
  'app/scripts/services/qrDecode.js',
  'app/scripts/**/*.js',
  'test/mock/**/*.js',
  'test/spec/**/*.js'
];

// list of files to exclude
exclude = [];

// test results reporter to use
// possible values: dots || progress || growl
reporters = ['progress'];

// web server port
port = 8080;

// cli runner port
runnerPort = 9100;

// enable / disable colors in the output (reporters and logs)
colors = true;

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;

// enable / disable watching file and executing tests whenever any file changes
autoWatch = false;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['PhantomJS'];

// If browser does not capture in given timeout [ms], kill it
captureTimeout = 5000;

// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
