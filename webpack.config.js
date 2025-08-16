var Encore = require('@symfony/webpack-encore');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // this line tell to webpack to use the plugin

var baseProjectURL = "/mise-relation/public";

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath(baseProjectURL+'/build')
    // only needed for CDN's or sub-directory deploy
    .setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('base', './assets/js/base.js')
    .addEntry('Index/indexPresentation', './assets/js/Index/indexPresentation.js')
    .addEntry('Index/indexMetier', './assets/js/Index/indexMetier.js')
    .addEntry('Index/indexResume', './assets/js/Index/indexResume.js')
    .addEntry('Index/index', './assets/js/Index/index.js')
    .addEntry('User/profile', './assets/js/User/profile.js')
    .addEntry('Formation/formation', './assets/js/Formation/formation.js')
    .addEntry('Experience/experience', './assets/js/Experience/experience.js')
    .addEntry('Document/document', './assets/js/Document/document.js')
    .addEntry('Enterprise/enterprise', './assets/js/Enterprise/enterprise.js')
    .addEntry('Enterprise/enterpriseCurriculum', './assets/js/Enterprise/enterpriseCurriculum.jsx')
    .addEntry('Project/projectList', './assets/js/Project/ProjectList.jsx')
    .addEntry('Project/projectInformation', './assets/js/Project/projectInformation.js')
    .addEntry('Project/profileResources', './assets/js/Project/profileResources.js')
    .addEntry('Resume/profile', './assets/js/Resume/profile.js')
    .addEntry('LegalNotice/legalNotice', './assets/js/LegalNotice/legalNotice.js')

    .addEntry('Index/indexAdmin', './assets/js/Index/indexAdmin.jsx')
    .addEntry('Search/search', './assets/js/Search/search.jsx')


    .addEntry('lib/fontawesome-pro', './node_modules/@fortawesome/fontawesome-pro/js/all.min')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    .enableReactPreset()
    // enables @babel/preset-env polyfills
    .configureBabel(
        function(babelConfig) {
            babelConfig.plugins.push("@babel/plugin-proposal-class-properties");
        }, {
        useBuiltIns: 'usage',
        corejs: 3
    })

    // enables Sass/SCSS support
    .enableSassLoader()
    .copyFiles({
        from: './assets/images',

        // optional target path, relative to the output dir
        // to: 'images/[path][name].[ext]',

        // if versioning is enabled, add the file hash too
        to: 'images/[path][name].[hash:8].[ext]',

        // only copy files matching this pattern
        pattern: /\.(png|jpg|jpeg|ico|svg)$/
    })

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    //.enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    .autoProvidejQuery()

    // uncomment if you use API Platform Admin (composer req api-admin)
    //.enableReactPreset()
    //.addEntry('admin', './assets/js/admin.js')
;

module.exports = Encore.getWebpackConfig();
module.exports.externals = [{
    'bazinga-translator': 'Translator'
}];
