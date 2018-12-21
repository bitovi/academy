/*[system-bundles-config]*/
System.bundles = {"bundles/bit-docs-site/static.css!":["bit-docs-prettify@0.4.0#prettify.less!steal-less@1.3.4#less","prismjs@1.15.0#themes/prism-coy.css!steal-css@1.3.2#css","prismjs@1.15.0#plugins/line-numbers/prism-line-numbers.css!steal-css@1.3.2#css","prismjs@1.15.0#plugins/previewers/prism-previewers.css!steal-css@1.3.2#css","prismjs@1.15.0#plugins/command-line/prism-command-line.css!steal-css@1.3.2#css","prismjs@1.15.0#plugins/toolbar/prism-toolbar.css!steal-css@1.3.2#css","bit-docs-site@0.0.1#styles/styles.less!steal-less@1.3.4#less"]};
/*npm-utils*/
define('npm-utils', function (require, exports, module) {
    (function (global, require, exports, module) {
        var slice = Array.prototype.slice;
        var npmModuleRegEx = /.+@.+\..+\..+#.+/;
        var conditionalModuleRegEx = /#\{[^\}]+\}|#\?.+$/;
        var gitUrlEx = /(git|http(s?)):\/\//;
        var supportsSet = typeof Set === 'function';
        var utils = {
            extend: function (d, s, deep, existingSet) {
                var val;
                var set = existingSet;
                if (deep) {
                    if (!set) {
                        if (supportsSet) {
                            set = new Set();
                        } else {
                            set = [];
                        }
                    }
                    if (supportsSet) {
                        if (set.has(s)) {
                            return s;
                        } else {
                            set.add(s);
                        }
                    } else {
                        if (set.indexOf(s) !== -1) {
                            return s;
                        } else {
                            set.push(s);
                        }
                    }
                }
                for (var prop in s) {
                    val = s[prop];
                    if (deep) {
                        if (utils.isArray(val)) {
                            d[prop] = slice.call(val);
                        } else if (utils.isPlainObject(val)) {
                            d[prop] = utils.extend({}, val, deep, set);
                        } else {
                            d[prop] = s[prop];
                        }
                    } else {
                        d[prop] = s[prop];
                    }
                }
                return d;
            },
            map: function (arr, fn) {
                var i = 0, len = arr.length, out = [];
                for (; i < len; i++) {
                    out.push(fn.call(arr, arr[i]));
                }
                return out;
            },
            filter: function (arr, fn) {
                var i = 0, len = arr.length, out = [], res;
                for (; i < len; i++) {
                    res = fn.call(arr, arr[i]);
                    if (res) {
                        out.push(arr[i]);
                    }
                }
                return out;
            },
            forEach: function (arr, fn) {
                var i = 0, len = arr.length;
                for (; i < len; i++) {
                    fn.call(arr, arr[i], i);
                }
            },
            flow: function (fns) {
                return function () {
                    var res = fns[0].apply(this, arguments);
                    for (var i = 1; i < fns.length; i++) {
                        res = fns[i].call(this, res);
                    }
                    return res;
                };
            },
            isObject: function (obj) {
                return typeof obj === 'object';
            },
            isPlainObject: function (obj) {
                return utils.isObject(obj) && (!obj || obj.__proto__ === Object.prototype);
            },
            isArray: Array.isArray || function (arr) {
                return Object.prototype.toString.call(arr) === '[object Array]';
            },
            isEnv: function (name) {
                return this.isEnv ? this.isEnv(name) : this.env === name;
            },
            isGitUrl: function (str) {
                return gitUrlEx.test(str);
            },
            warnOnce: function (msg) {
                var w = this._warnings = this._warnings || {};
                if (w[msg])
                    return;
                w[msg] = true;
                this.warn(msg);
            },
            warn: function (msg) {
                if (typeof steal !== 'undefined' && typeof console !== 'undefined' && console.warn) {
                    steal.done().then(function () {
                        if (steal.dev && steal.dev.warn) {
                        } else if (console.warn) {
                            console.warn('steal.js WARNING: ' + msg);
                        } else {
                            console.log(msg);
                        }
                    });
                }
            },
            relativeURI: function (baseURL, url) {
                return typeof steal !== 'undefined' ? steal.relativeURI(baseURL, url) : url;
            },
            moduleName: {
                create: function (descriptor, standard) {
                    if (standard) {
                        return descriptor.moduleName;
                    } else {
                        if (descriptor === '@empty') {
                            return descriptor;
                        }
                        var modulePath;
                        if (descriptor.modulePath) {
                            modulePath = descriptor.modulePath.substr(0, 2) === './' ? descriptor.modulePath.substr(2) : descriptor.modulePath;
                        }
                        var version = descriptor.version;
                        if (version && version[0] !== '^') {
                            version = encodeURIComponent(decodeURIComponent(version));
                        }
                        return descriptor.packageName + (version ? '@' + version : '') + (modulePath ? '#' + modulePath : '') + (descriptor.plugin ? descriptor.plugin : '');
                    }
                },
                isNpm: function (moduleName) {
                    return npmModuleRegEx.test(moduleName);
                },
                isConditional: function (moduleName) {
                    return conditionalModuleRegEx.test(moduleName);
                },
                isFullyConvertedNpm: function (parsedModuleName) {
                    return !!(parsedModuleName.packageName && parsedModuleName.version && parsedModuleName.modulePath);
                },
                isScoped: function (moduleName) {
                    return moduleName[0] === '@';
                },
                parse: function (moduleName, currentPackageName, global, context) {
                    var pluginParts = moduleName.split('!');
                    var modulePathParts = pluginParts[0].split('#');
                    var versionParts = modulePathParts[0].split('@');
                    if (!modulePathParts[1] && !versionParts[0]) {
                        versionParts = ['@' + versionParts[1]];
                    }
                    if (versionParts.length === 3 && utils.moduleName.isScoped(moduleName)) {
                        versionParts.splice(0, 1);
                        versionParts[0] = '@' + versionParts[0];
                    }
                    var packageName, modulePath;
                    if (currentPackageName && utils.path.isRelative(moduleName)) {
                        packageName = currentPackageName;
                        modulePath = versionParts[0];
                    } else if (currentPackageName && utils.path.isInHomeDir(moduleName, context)) {
                        packageName = currentPackageName;
                        modulePath = versionParts[0].split('/').slice(1).join('/');
                    } else {
                        if (modulePathParts[1]) {
                            packageName = versionParts[0];
                            modulePath = modulePathParts[1];
                        } else {
                            var folderParts = versionParts[0].split('/');
                            if (folderParts.length && folderParts[0][0] === '@') {
                                packageName = folderParts.splice(0, 2).join('/');
                            } else {
                                packageName = folderParts.shift();
                            }
                            modulePath = folderParts.join('/');
                        }
                    }
                    modulePath = utils.path.removeJS(modulePath);
                    return {
                        plugin: pluginParts.length === 2 ? '!' + pluginParts[1] : undefined,
                        version: versionParts[1],
                        modulePath: modulePath,
                        packageName: packageName,
                        moduleName: moduleName,
                        isGlobal: global
                    };
                },
                parseFromPackage: function (loader, refPkg, name, parentName) {
                    var packageName = utils.pkg.name(refPkg), parsedModuleName = utils.moduleName.parse(name, packageName, undefined, { loader: loader }), isRelative = utils.path.isRelative(parsedModuleName.modulePath);
                    if (isRelative && !parentName) {
                        throw new Error('Cannot resolve a relative module identifier ' + 'with no parent module:', name);
                    }
                    if (isRelative) {
                        var parentParsed = utils.moduleName.parse(parentName, packageName);
                        if (parentParsed.packageName === parsedModuleName.packageName && parentParsed.modulePath) {
                            var makePathRelative = true;
                            if (name === '../' || name === './' || name === '..') {
                                var relativePath = utils.path.relativeTo(parentParsed.modulePath, name);
                                var isInRoot = utils.path.isPackageRootDir(relativePath);
                                if (isInRoot) {
                                    parsedModuleName.modulePath = utils.pkg.main(refPkg);
                                    makePathRelative = false;
                                } else {
                                    parsedModuleName.modulePath = name + (utils.path.endsWithSlash(name) ? '' : '/') + 'index';
                                }
                            }
                            if (makePathRelative) {
                                parsedModuleName.modulePath = utils.path.makeRelative(utils.path.joinURIs(parentParsed.modulePath, parsedModuleName.modulePath));
                            }
                        }
                    }
                    var mapName = utils.moduleName.create(parsedModuleName), refSteal = utils.pkg.config(refPkg), mappedName;
                    if (refPkg.browser && typeof refPkg.browser !== 'string' && mapName in refPkg.browser && (!refSteal || !refSteal.ignoreBrowser)) {
                        mappedName = refPkg.browser[mapName] === false ? '@empty' : refPkg.browser[mapName];
                    }
                    var global = loader && loader.globalBrowser && loader.globalBrowser[mapName];
                    if (global) {
                        mappedName = global.moduleName === false ? '@empty' : global.moduleName;
                    }
                    if (mappedName) {
                        return utils.moduleName.parse(mappedName, packageName, !!global);
                    } else {
                        return parsedModuleName;
                    }
                },
                nameAndVersion: function (parsedModuleName) {
                    return parsedModuleName.packageName + '@' + parsedModuleName.version;
                },
                isBareIdentifier: function (identifier) {
                    return identifier && identifier[0] !== '.' && identifier[0] !== '@';
                }
            },
            pkg: {
                name: function (pkg) {
                    var steal = utils.pkg.config(pkg);
                    return steal && steal.name || pkg.name;
                },
                main: function (pkg) {
                    var main;
                    var steal = utils.pkg.config(pkg);
                    if (steal && steal.main) {
                        main = steal.main;
                    } else if (typeof pkg.browser === 'string') {
                        if (utils.path.endsWithSlash(pkg.browser)) {
                            main = pkg.browser + 'index';
                        } else {
                            main = pkg.browser;
                        }
                    } else if (typeof pkg.jam === 'object' && pkg.jam.main) {
                        main = pkg.jam.main;
                    } else if (pkg.main) {
                        main = pkg.main;
                    } else {
                        main = 'index';
                    }
                    return utils.path.removeJS(utils.path.removeDotSlash(main));
                },
                rootDir: function (pkg, isRoot) {
                    var root = isRoot ? utils.path.removePackage(pkg.fileUrl) : utils.path.pkgDir(pkg.fileUrl);
                    var lib = utils.pkg.directoriesLib(pkg);
                    if (lib) {
                        root = utils.path.joinURIs(utils.path.addEndingSlash(root), lib);
                    }
                    return root;
                },
                isRoot: function (loader, pkg) {
                    var root = utils.pkg.getDefault(loader);
                    return pkg && pkg.name === root.name && pkg.version === root.version;
                },
                homeAlias: function (context) {
                    return context && context.loader && context.loader.homeAlias || '~';
                },
                getDefault: function (loader) {
                    return loader.npmPaths.__default;
                },
                findByModuleNameOrAddress: function (loader, moduleName, moduleAddress) {
                    if (loader.npm) {
                        if (moduleName) {
                            var parsed = utils.moduleName.parse(moduleName);
                            if (parsed.version && parsed.packageName) {
                                var name = parsed.packageName + '@' + parsed.version;
                                if (name in loader.npm) {
                                    return loader.npm[name];
                                }
                            }
                        }
                        if (moduleAddress) {
                            var startingAddress = utils.relativeURI(loader.baseURL, moduleAddress);
                            var packageFolder = utils.pkg.folderAddress(startingAddress);
                            return packageFolder ? loader.npmPaths[packageFolder] : utils.pkg.getDefault(loader);
                        } else {
                            return utils.pkg.getDefault(loader);
                        }
                    }
                },
                folderAddress: function (address) {
                    var nodeModules = '/node_modules/', nodeModulesIndex = address.lastIndexOf(nodeModules), nextSlash = address.indexOf('/', nodeModulesIndex + nodeModules.length);
                    if (nodeModulesIndex >= 0) {
                        return nextSlash >= 0 ? address.substr(0, nextSlash) : address;
                    }
                },
                findDep: function (loader, refPkg, name) {
                    if (loader.npm && refPkg && !utils.path.startsWithDotSlash(name)) {
                        var nameAndVersion = name + '@' + refPkg.resolutions[name];
                        var pkg = loader.npm[nameAndVersion];
                        return pkg;
                    }
                },
                findDepWalking: function (loader, refPackage, name) {
                    if (loader.npm && refPackage && !utils.path.startsWithDotSlash(name)) {
                        var curPackage = utils.path.depPackageDir(refPackage.fileUrl, name);
                        while (curPackage) {
                            var pkg = loader.npmPaths[curPackage];
                            if (pkg) {
                                return pkg;
                            }
                            var parentAddress = utils.path.parentNodeModuleAddress(curPackage);
                            if (!parentAddress) {
                                return;
                            }
                            curPackage = parentAddress + '/' + name;
                        }
                    }
                },
                findByName: function (loader, name) {
                    if (loader.npm && !utils.path.startsWithDotSlash(name)) {
                        return loader.npm[name];
                    }
                },
                findByNameAndVersion: function (loader, name, version) {
                    if (loader.npm && !utils.path.startsWithDotSlash(name)) {
                        var nameAndVersion = name + '@' + version;
                        return loader.npm[nameAndVersion];
                    }
                },
                findByUrl: function (loader, url) {
                    if (loader.npm) {
                        var fullUrl = utils.pkg.folderAddress(url);
                        return loader.npmPaths[fullUrl];
                    }
                },
                directoriesLib: function (pkg) {
                    var steal = utils.pkg.config(pkg);
                    var lib = steal && steal.directories && steal.directories.lib;
                    var ignores = [
                            '.',
                            '/'
                        ], ignore;
                    if (!lib)
                        return undefined;
                    while (!!(ignore = ignores.shift())) {
                        if (lib[0] === ignore) {
                            lib = lib.substr(1);
                        }
                    }
                    return lib;
                },
                hasDirectoriesLib: function (pkg) {
                    var steal = utils.pkg.config(pkg);
                    return steal && steal.directories && !!steal.directories.lib;
                },
                findPackageInfo: function (context, pkg) {
                    var pkgInfo = context.pkgInfo;
                    if (pkgInfo) {
                        var out;
                        utils.forEach(pkgInfo, function (p) {
                            if (pkg.name === p.name && pkg.version === p.version) {
                                out = p;
                            }
                        });
                        return out;
                    }
                },
                saveResolution: function (context, refPkg, pkg) {
                    var npmPkg = utils.pkg.findPackageInfo(context, refPkg);
                    npmPkg.resolutions[pkg.name] = refPkg.resolutions[pkg.name] = pkg.version;
                },
                config: function (pkg) {
                    return pkg.steal || pkg.system;
                }
            },
            path: {
                makeRelative: function (path) {
                    if (utils.path.isRelative(path) && path.substr(0, 1) !== '/') {
                        return path;
                    } else {
                        return './' + path;
                    }
                },
                removeJS: function (path) {
                    return path.replace(/\.js(!|$)/, function (whole, part) {
                        return part;
                    });
                },
                removePackage: function (path) {
                    return path.replace(/\/package\.json.*/, '');
                },
                addJS: function (path) {
                    if (/\.js(on)?$/.test(path)) {
                        return path;
                    } else {
                        return path + '.js';
                    }
                },
                isRelative: function (path) {
                    return path.substr(0, 1) === '.';
                },
                isInHomeDir: function (path, context) {
                    return path.substr(0, 2) === utils.pkg.homeAlias(context) + '/';
                },
                joinURIs: function (baseUri, rel) {
                    function removeDotSegments(input) {
                        var output = [];
                        input.replace(/^(\.\.?(\/|$))+/, '').replace(/\/(\.(\/|$))+/g, '/').replace(/\/\.\.$/, '/../').replace(/\/?[^\/]*/g, function (p) {
                            if (p === '/..') {
                                output.pop();
                            } else {
                                output.push(p);
                            }
                        });
                        return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
                    }
                    var href = parseURI(rel || '');
                    var base = parseURI(baseUri || '');
                    return !href || !base ? null : (href.protocol || base.protocol) + (href.protocol || href.authority ? href.authority : base.authority) + removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : href.pathname ? (base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname : base.pathname) + (href.protocol || href.authority || href.pathname ? href.search : href.search || base.search) + href.hash;
                },
                startsWithDotSlash: function (path) {
                    return path.substr(0, 2) === './';
                },
                removeDotSlash: function (path) {
                    return utils.path.startsWithDotSlash(path) ? path.substr(2) : path;
                },
                endsWithSlash: function (path) {
                    return path[path.length - 1] === '/';
                },
                addEndingSlash: function (path) {
                    return utils.path.endsWithSlash(path) ? path : path + '/';
                },
                depPackage: function (parentPackageAddress, childName) {
                    var packageFolderName = parentPackageAddress.replace(/\/package\.json.*/, '');
                    return (packageFolderName ? packageFolderName + '/' : '') + 'node_modules/' + childName + '/package.json';
                },
                peerPackage: function (parentPackageAddress, childName) {
                    var packageFolderName = parentPackageAddress.replace(/\/package\.json.*/, '');
                    return packageFolderName.substr(0, packageFolderName.lastIndexOf('/')) + '/' + childName + '/package.json';
                },
                depPackageDir: function (parentPackageAddress, childName) {
                    return utils.path.depPackage(parentPackageAddress, childName).replace(/\/package\.json.*/, '');
                },
                peerNodeModuleAddress: function (address) {
                    var nodeModules = '/node_modules/', nodeModulesIndex = address.lastIndexOf(nodeModules);
                    if (nodeModulesIndex >= 0) {
                        return address.substr(0, nodeModulesIndex + nodeModules.length - 1);
                    }
                },
                parentNodeModuleAddress: function (address) {
                    var nodeModules = '/node_modules/', nodeModulesIndex = address.lastIndexOf(nodeModules), prevModulesIndex = address.lastIndexOf(nodeModules, nodeModulesIndex - 1);
                    if (prevModulesIndex >= 0) {
                        return address.substr(0, prevModulesIndex + nodeModules.length - 1);
                    }
                },
                pkgDir: function (address) {
                    var nodeModules = '/node_modules/', nodeModulesIndex = address.lastIndexOf(nodeModules), nextSlash = address.indexOf('/', nodeModulesIndex + nodeModules.length);
                    if (address[nodeModulesIndex + nodeModules.length] === '@') {
                        nextSlash = address.indexOf('/', nextSlash + 1);
                    }
                    if (nodeModulesIndex >= 0) {
                        return nextSlash >= 0 ? address.substr(0, nextSlash) : address;
                    }
                },
                basename: function (address) {
                    var parts = address.split('/');
                    return parts[parts.length - 1];
                },
                relativeTo: function (modulePath, rel) {
                    var parts = modulePath.split('/');
                    var idx = 1;
                    while (rel[idx] === '.') {
                        parts.pop();
                        idx++;
                    }
                    return parts.join('/');
                },
                isPackageRootDir: function (pth) {
                    return pth.indexOf('/') === -1;
                }
            },
            json: {
                transform: function (loader, load, data) {
                    data.steal = utils.pkg.config(data);
                    var fn = loader.jsonOptions && loader.jsonOptions.transform;
                    if (!fn)
                        return data;
                    return fn.call(loader, load, data);
                }
            },
            includeInBuild: true
        };
        function parseURI(url) {
            var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@\/]*(?::[^:@\/]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
            return m ? {
                href: m[0] || '',
                protocol: m[1] || '',
                authority: m[2] || '',
                host: m[3] || '',
                hostname: m[4] || '',
                port: m[5] || '',
                pathname: m[6] || '',
                search: m[7] || '',
                hash: m[8] || ''
            } : null;
        }
        module.exports = utils;
    }(function () {
        return this;
    }(), require, exports, module));
});
/*npm-extension*/
define('npm-extension', [
    'require',
    'exports',
    'module',
    '@steal',
    './npm-utils'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        'format cjs';
        var steal = require('@steal');
        var utils = require('./npm-utils');
        exports.includeInBuild = true;
        var isNode = typeof process === 'object' && {}.toString.call(process) === '[object process]';
        var isWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
        var isBrowser = typeof window !== 'undefined' && !isNode && !isWorker;
        exports.addExtension = function (System) {
            if (System._extensions) {
                System._extensions.push(exports.addExtension);
            }
            var oldNormalize = System.normalize;
            System.normalize = function (identifier, parentModuleName, parentAddress, pluginNormalize) {
                var name = identifier;
                var parentName = parentModuleName;
                if (parentName && this.npmParentMap && this.npmParentMap[parentName]) {
                    parentName = this.npmParentMap[parentName];
                }
                var hasNoParent = !parentName;
                var nameIsRelative = utils.path.isRelative(name);
                var parentIsNpmModule = utils.moduleName.isNpm(parentName);
                var identifierEndsWithSlash = utils.path.endsWithSlash(name);
                if (parentName && nameIsRelative && !parentIsNpmModule) {
                    return oldNormalize.call(this, name, parentName, parentAddress, pluginNormalize);
                }
                if (utils.moduleName.isConditional(name)) {
                    return oldNormalize.call(this, name, parentName, parentAddress, pluginNormalize);
                }
                var hasContextualMap = typeof this.map[parentName] === 'object' && this.map[parentName][name];
                if (hasContextualMap) {
                    return oldNormalize.call(this, name, parentName, parentAddress, pluginNormalize);
                }
                var refPkg = utils.pkg.findByModuleNameOrAddress(this, parentName, parentAddress);
                if (!refPkg) {
                    return oldNormalize.call(this, name, parentName, parentAddress, pluginNormalize);
                }
                var isPointingAtParentFolder = name === '../' || name === './';
                if (parentIsNpmModule && isPointingAtParentFolder) {
                    var parsedParentModuleName = utils.moduleName.parse(parentName);
                    var parentModulePath = parsedParentModuleName.modulePath || '';
                    var relativePath = utils.path.relativeTo(parentModulePath, name);
                    var isInRoot = utils.path.isPackageRootDir(relativePath);
                    if (isInRoot) {
                        name = refPkg.name + '#' + utils.path.removeJS(refPkg.main);
                    } else {
                        name = name + 'index';
                    }
                }
                var parsedModuleName = utils.moduleName.parseFromPackage(this, refPkg, name, parentName);
                var isRoot = utils.pkg.isRoot(this, refPkg);
                var parsedPackageNameIsReferringPackage = parsedModuleName.packageName === refPkg.name;
                var isRelativeToParentNpmModule = parentIsNpmModule && nameIsRelative && parsedPackageNameIsReferringPackage;
                var depPkg, wantedPkg;
                if (isRelativeToParentNpmModule) {
                    depPkg = refPkg;
                }
                var context = this.npmContext;
                var crawl = context && context.crawl;
                var isDev = !!crawl;
                if (!depPkg) {
                    if (crawl) {
                        var parentPkg = nameIsRelative ? null : crawl.matchedVersion(context, refPkg.name, refPkg.version);
                        if (parentPkg) {
                            var depMap = crawl.getFullDependencyMap(this, parentPkg, isRoot);
                            wantedPkg = depMap[parsedModuleName.packageName];
                            if (wantedPkg) {
                                var wantedVersion = refPkg.resolutions && refPkg.resolutions[wantedPkg.name] || wantedPkg.version;
                                var foundPkg = crawl.matchedVersion(this.npmContext, wantedPkg.name, wantedVersion);
                                if (foundPkg) {
                                    depPkg = utils.pkg.findByUrl(this, foundPkg.fileUrl);
                                }
                            }
                        }
                    } else {
                        if (isRoot) {
                            depPkg = utils.pkg.findDepWalking(this, refPkg, parsedModuleName.packageName);
                        } else {
                            depPkg = utils.pkg.findDep(this, refPkg, parsedModuleName.packageName);
                        }
                    }
                }
                if (parsedPackageNameIsReferringPackage) {
                    depPkg = utils.pkg.findByNameAndVersion(this, parsedModuleName.packageName, refPkg.version);
                }
                var lookupByName = parsedModuleName.isGlobal || hasNoParent;
                if (!depPkg) {
                    depPkg = utils.pkg.findByName(this, parsedModuleName.packageName);
                }
                var isThePackageWeWant = !isDev || !depPkg || (wantedPkg ? crawl.pkgSatisfies(depPkg, wantedPkg.version) : true);
                if (!isThePackageWeWant) {
                    depPkg = undefined;
                } else if (isDev && depPkg) {
                    utils.pkg.saveResolution(context, refPkg, depPkg);
                }
                if (!depPkg) {
                    var browserPackageName = this.globalBrowser[parsedModuleName.packageName];
                    if (browserPackageName) {
                        parsedModuleName.packageName = browserPackageName.moduleName;
                        depPkg = utils.pkg.findByName(this, parsedModuleName.packageName);
                    }
                }
                if (!depPkg && isRoot && name === refPkg.main && utils.pkg.hasDirectoriesLib(refPkg)) {
                    parsedModuleName.version = refPkg.version;
                    parsedModuleName.packageName = refPkg.name;
                    parsedModuleName.modulePath = utils.pkg.main(refPkg);
                    return oldNormalize.call(this, utils.moduleName.create(parsedModuleName), parentName, parentAddress, pluginNormalize);
                }
                var loader = this;
                if (!depPkg) {
                    if (crawl) {
                        var parentPkg = crawl.matchedVersion(this.npmContext, refPkg.name, refPkg.version);
                        if (parentPkg) {
                            var depMap = crawl.getFullDependencyMap(this, parentPkg, isRoot);
                            depPkg = depMap[parsedModuleName.packageName];
                            if (!depPkg) {
                                var parents = crawl.findPackageAndParents(this.npmContext, parsedModuleName.packageName);
                                if (parents) {
                                    depPkg = parents.package;
                                }
                            }
                        }
                    }
                    if (!depPkg) {
                        if (refPkg.browser && refPkg.browser[name]) {
                            return oldNormalize.call(this, refPkg.browser[name], parentName, parentAddress, pluginNormalize);
                        }
                        var steal = utils.pkg.config(refPkg);
                        if (steal && steal.map && typeof steal.map[name] === 'string') {
                            var mappedName = steal.map[name];
                            var envConfig = steal.envs && steal.envs[loader.env];
                            if (envConfig && envConfig.map && typeof envConfig.map[name] === 'string') {
                                mappedName = envConfig.map[name];
                            }
                            return loader.normalize(mappedName, parentName, parentAddress, pluginNormalize);
                        } else {
                            return oldNormalize.call(this, name, parentName, parentAddress, pluginNormalize);
                        }
                    }
                    return crawl.dep(this.npmContext, parentPkg, refPkg, depPkg, isRoot).then(createModuleNameAndNormalize);
                } else {
                    return createModuleNameAndNormalize(depPkg);
                }
                function createModuleNameAndNormalize(depPkg) {
                    parsedModuleName.version = depPkg.version;
                    if (!parsedModuleName.modulePath) {
                        parsedModuleName.modulePath = utils.pkg.main(depPkg);
                    }
                    var p = oldNormalize.call(loader, utils.moduleName.create(parsedModuleName), parentName, parentAddress, pluginNormalize);
                    if (identifierEndsWithSlash) {
                        p.then(function (name) {
                            if (context && context.forwardSlashMap) {
                                context.forwardSlashMap[name] = true;
                            }
                        });
                    }
                    return p;
                }
            };
            var oldLocate = System.locate;
            System.locate = function (load) {
                var parsedModuleName = utils.moduleName.parse(load.name), loader = this;
                var pmn = load.metadata.parsedModuleName = parsedModuleName;
                load.metadata.npmPackage = utils.pkg.findByNameAndVersion(this, pmn.packageName, pmn.version);
                if (parsedModuleName.version && this.npm && !loader.paths[load.name]) {
                    var pkg = this.npm[utils.moduleName.nameAndVersion(parsedModuleName)];
                    if (pkg) {
                        return oldLocate.call(this, load).then(function (locatedAddress) {
                            var address = locatedAddress;
                            var expectedAddress = utils.path.joinURIs(System.baseURL, load.name);
                            if (isBrowser) {
                                expectedAddress = expectedAddress.replace(/#/g, '%23');
                            }
                            if (address !== expectedAddress + '.js' && address !== expectedAddress) {
                                return address;
                            }
                            var root = utils.pkg.rootDir(pkg, utils.pkg.isRoot(loader, pkg));
                            if (parsedModuleName.modulePath) {
                                var npmAddress = utils.path.joinURIs(utils.path.addEndingSlash(root), parsedModuleName.plugin ? parsedModuleName.modulePath : utils.path.addJS(parsedModuleName.modulePath));
                                address = typeof steal !== 'undefined' ? utils.path.joinURIs(loader.baseURL, npmAddress) : npmAddress;
                            }
                            return address;
                        });
                    }
                }
                return oldLocate.call(this, load);
            };
            var oldFetch = System.fetch;
            System.fetch = function (load) {
                if (load.metadata.dryRun) {
                    return oldFetch.apply(this, arguments);
                }
                var loader = this;
                var context = loader.npmContext;
                var fetchPromise = Promise.resolve(oldFetch.apply(this, arguments));
                if (utils.moduleName.isNpm(load.name)) {
                    fetchPromise = fetchPromise.then(null, function (err) {
                        if (err.statusCode !== 404) {
                            return Promise.reject(err);
                        }
                        if (!loader.npmContext) {
                            loader.npmContext = { forwardSlashMap: {} };
                        }
                        var types = [].slice.call(retryTypes);
                        return retryAll(types, err).then(null, function (e) {
                            return Promise.reject(err);
                        });
                        function retryAll(types, err) {
                            if (!types.length) {
                                throw err;
                            }
                            var type = types.shift();
                            if (!type.test(load)) {
                                throw err;
                            }
                            return Promise.resolve(retryFetch.call(loader, load, type)).then(null, function (err) {
                                return retryAll(types, err);
                            });
                        }
                    });
                }
                return fetchPromise.catch(function (error) {
                    if (error.statusCode === 404 && utils.moduleName.isBareIdentifier(load.name) && !utils.pkg.isRoot(loader, load.metadata.npmPackage)) {
                        var newError = new Error([
                            'Could not load \'' + load.name + '\'',
                            'Is this an npm module not saved in your package.json?'
                        ].join('\n'));
                        newError.statusCode = error.statusCode;
                        throw newError;
                    } else {
                        throw error;
                    }
                });
            };
            var convertName = function (loader, name) {
                var pkg = utils.pkg.findByName(loader, name.split('/')[0]);
                if (pkg) {
                    var parsed = utils.moduleName.parse(name, pkg.name);
                    parsed.version = pkg.version;
                    if (!parsed.modulePath) {
                        parsed.modulePath = utils.pkg.main(pkg);
                    }
                    return utils.moduleName.create(parsed);
                }
                return name;
            };
            var configSpecial = {
                map: function (map) {
                    var newMap = {}, val;
                    for (var name in map) {
                        val = map[name];
                        newMap[convertName(this, name)] = typeof val === 'object' ? configSpecial.map(val) : convertName(this, val);
                    }
                    return newMap;
                },
                meta: function (map) {
                    var newMap = {};
                    for (var name in map) {
                        newMap[convertName(this, name)] = map[name];
                    }
                    return newMap;
                },
                paths: function (paths) {
                    var newPaths = {};
                    for (var name in paths) {
                        newPaths[convertName(this, name)] = paths[name];
                    }
                    return newPaths;
                }
            };
            var oldConfig = System.config;
            System.config = function (cfg) {
                var loader = this;
                if (loader.npmContext) {
                    var context = loader.npmContext;
                    var pkg = context.versions.__default;
                    var conv = context.convert.steal(context, pkg, cfg, true);
                    context.convert.updateConfigOnPackageLoad(conv, false, true, context.applyBuildConfig);
                    oldConfig.apply(loader, arguments);
                    return;
                }
                for (var name in cfg) {
                    if (configSpecial[name]) {
                        cfg[name] = configSpecial[name].call(loader, cfg[name]);
                    }
                }
                oldConfig.apply(loader, arguments);
            };
            steal.addNpmPackages = function (npmPackages) {
                var packages = npmPackages || [];
                var loader = this.loader;
                for (var i = 0; i < packages.length; i += 1) {
                    var pkg = packages[i];
                    var path = pkg && pkg.fileUrl;
                    if (path) {
                        loader.npmContext.paths[path] = pkg;
                    }
                }
            };
            steal.getNpmPackages = function () {
                var context = this.loader.npmContext;
                return context ? context.packages || [] : [];
            };
            function retryFetch(load, type) {
                var loader = this;
                var moduleName = typeof type.name === 'function' ? type.name(loader, load) : load.name + type.name;
                var local = utils.extend({}, load);
                local.name = moduleName;
                local.metadata = { dryRun: true };
                return Promise.resolve(loader.locate(local)).then(function (address) {
                    local.address = address;
                    return loader.fetch(local);
                }).then(function (source) {
                    load.metadata.address = local.address;
                    loader.npmParentMap[load.name] = local.name;
                    var npmLoad = loader.npmContext && loader.npmContext.npmLoad;
                    if (npmLoad) {
                        npmLoad.saveLoadIfNeeded(loader.npmContext);
                        if (!isNode) {
                            utils.warnOnce('Some 404s were encountered ' + 'while loading. Don\'t panic! ' + 'These will only happen in dev ' + 'and are harmless.');
                        }
                    }
                    return source;
                });
            }
            var retryTypes = [
                {
                    name: function (loader, load) {
                        var context = loader.npmContext;
                        if (context.forwardSlashMap[load.name]) {
                            var parts = load.name.split('/');
                            parts.pop();
                            return parts.concat(['index']).join('/');
                        }
                        return load.name + '/index';
                    },
                    test: function () {
                        return true;
                    }
                },
                {
                    name: '.json',
                    test: function (load) {
                        return utils.moduleName.isNpm(load.name) && utils.path.basename(load.address) === 'package.js';
                    }
                }
            ];
        };
    }(function () {
        return this;
    }(), require, exports, module));
});
/*npm-load*/
define('npm-load', [], function(){ return {}; });
/*semver*/
define('semver', [], function(){ return {}; });
/*npm-crawl*/
define('npm-crawl', [], function(){ return {}; });
/*npm-convert*/
define('npm-convert', [], function(){ return {}; });
/*npm*/
define('npm', [], function(){ return {}; });
/*package.json!npm*/
define('package.json!npm', [
    '@loader',
    'npm-extension',
    'module'
], function (loader, npmExtension, module) {
    npmExtension.addExtension(loader);
    if (!loader.main) {
        loader.main = 'bit-docs-site@0.0.1#static';
    }
    loader._npmExtensions = [].slice.call(arguments, 2);
    (function (loader, packages, options) {
        var g = loader.global;
        if (!g.process) {
            g.process = {
                argv: [],
                cwd: function () {
                    var baseURL = loader.baseURL;
                    return baseURL;
                },
                browser: true,
                env: { NODE_ENV: loader.env },
                version: '',
                platform: navigator && navigator.userAgent && /Windows/.test(navigator.userAgent) ? 'win' : ''
            };
        }
        if (!loader.npm) {
            loader.npm = {};
            loader.npmPaths = {};
            loader.globalBrowser = {};
        }
        if (!loader.npmParentMap) {
            loader.npmParentMap = options.npmParentMap || {};
        }
        var rootPkg = loader.npmPaths.__default = packages[0];
        var rootConfig = rootPkg.steal || rootPkg.system;
        var lib = rootConfig && rootConfig.directories && rootConfig.directories.lib;
        var setGlobalBrowser = function (globals, pkg) {
            for (var name in globals) {
                loader.globalBrowser[name] = {
                    pkg: pkg,
                    moduleName: globals[name]
                };
            }
        };
        var setInNpm = function (name, pkg) {
            if (!loader.npm[name]) {
                loader.npm[name] = pkg;
            }
            loader.npm[name + '@' + pkg.version] = pkg;
        };
        var forEach = function (arr, fn) {
            var i = 0, len = arr.length;
            for (; i < len; i++) {
                res = fn.call(arr, arr[i], i);
                if (res === false)
                    break;
            }
        };
        var setupLiveReload = function () {
            if (loader.liveReloadInstalled) {
                loader['import']('live-reload', { name: module.id }).then(function (reload) {
                    reload.dispose(function () {
                        var pkgInfo = loader.npmContext.pkgInfo;
                        delete pkgInfo[rootPkg.name + '@' + rootPkg.version];
                        var idx = -1;
                        forEach(pkgInfo, function (pkg, i) {
                            if (pkg.name === rootPkg.name && pkg.version === rootPkg.version) {
                                idx = i;
                                return false;
                            }
                        });
                        pkgInfo.splice(idx, 1);
                    });
                });
            }
        };
        var ignoredConfig = [
            'bundle',
            'configDependencies',
            'transpiler'
        ];
        packages.reverse();
        forEach(packages, function (pkg) {
            var steal = pkg.steal || pkg.system;
            if (steal) {
                var main = steal.main;
                delete steal.main;
                var configDeps = steal.configDependencies;
                if (pkg !== rootPkg) {
                    forEach(ignoredConfig, function (name) {
                        delete steal[name];
                    });
                }
                loader.config(steal);
                if (pkg === rootPkg) {
                    steal.configDependencies = configDeps;
                }
                steal.main = main;
            }
            if (pkg.globalBrowser) {
                var doNotApplyGlobalBrowser = pkg.name === 'steal' && rootConfig.builtins === false;
                if (!doNotApplyGlobalBrowser) {
                    setGlobalBrowser(pkg.globalBrowser, pkg);
                }
            }
            var systemName = steal && steal.name;
            if (systemName) {
                setInNpm(systemName, pkg);
            } else {
                setInNpm(pkg.name, pkg);
            }
            if (!loader.npm[pkg.name]) {
                loader.npm[pkg.name] = pkg;
            }
            loader.npm[pkg.name + '@' + pkg.version] = pkg;
            var pkgAddress = pkg.fileUrl.replace(/\/package\.json.*/, '');
            loader.npmPaths[pkgAddress] = pkg;
        });
        setupLiveReload();
        forEach(loader._npmExtensions || [], function (ext) {
            if (ext.systemConfig) {
                loader.config(ext.systemConfig);
            }
        });
    }(loader, [
        {
            'name': 'bit-docs-site',
            'version': '0.0.1',
            'fileUrl': './package.json',
            'main': 'static.js',
            'steal': {
                'plugins': ['steal-less'],
                'npmAlgorithm': 'flat'
            },
            'resolutions': {
                'bit-docs-site': '0.0.1',
                'steal-less': '1.3.4',
                'bit-docs-prettify': '0.4.0',
                'bit-docs-tag-demo': '0.5.3',
                'bit-docs-html-codepen-link': '1.3.0'
            }
        },
        {
            'name': 'steal-less',
            'version': '1.3.4',
            'fileUrl': './node_modules/steal-less/package.json',
            'main': 'less.js',
            'steal': {
                'plugins': ['steal-css'],
                'envs': {
                    'build': { 'map': { 'steal-less/less-engine': 'steal-less/less-engine-node' } },
                    'server-development': { 'map': { 'steal-less/less-engine': 'steal-less/less-engine-node' } },
                    'server-production': { 'map': { 'steal-less/less-engine': 'steal-less/less-engine-node' } },
                    'bundle-build': {
                        'map': { 'steal-less/less-engine': 'steal-less/less-engine-node' },
                        'meta': { 'steal-less/less': { 'useLocalDeps': true } }
                    }
                },
                'ext': { 'less': 'steal-less' },
                'meta': {}
            },
            'resolutions': {}
        },
        {
            'name': 'steal-css',
            'version': '1.3.2',
            'fileUrl': './node_modules/steal-css/package.json',
            'main': 'css.js',
            'steal': {
                'ext': { 'css': 'steal-css' },
                'map': { '$css': 'steal-css@1.3.2#css' }
            },
            'resolutions': {}
        },
        {
            'name': 'bit-docs-prettify',
            'version': '0.4.0',
            'fileUrl': './node_modules/bit-docs-prettify/package.json',
            'main': 'prettify.js',
            'resolutions': {
                'bit-docs-prettify': '0.4.0',
                'steal-less': '1.3.4',
                'prismjs': '1.15.0',
                'steal-css': '1.3.2'
            }
        },
        {
            'name': 'bit-docs-tag-demo',
            'version': '0.5.3',
            'fileUrl': './node_modules/bit-docs-tag-demo/package.json',
            'main': 'demo.js',
            'steal': { 'plugins': ['steal-less'] },
            'resolutions': { 'bit-docs-tag-demo': '0.5.3' }
        },
        {
            'name': 'bit-docs-html-codepen-link',
            'version': '1.3.0',
            'fileUrl': './node_modules/bit-docs-html-codepen-link/package.json',
            'main': 'index.js',
            'resolutions': { 'bit-docs-html-codepen-link': '1.3.0' }
        },
        {
            'name': 'prismjs',
            'version': '1.15.0',
            'fileUrl': './node_modules/prismjs/package.json',
            'main': 'prism.js',
            'jspm': { 'main': 'prism' },
            'resolutions': { 'clipboard': '2.0.4' }
        },
        {
            'name': 'clipboard',
            'version': '2.0.4',
            'fileUrl': './node_modules/clipboard/package.json',
            'main': 'dist/clipboard.js',
            'resolutions': {}
        }
    ], { 'npmParentMap': {} }));
});
/*steal-css@1.3.2#css*/
define('steal-css@1.3.2#css', [
    'require',
    'exports',
    'module',
    '@loader',
    '@steal'
], function (require, exports, module) {
    (function (global, require, exports, module) {
        var loader = require('@loader');
        var steal = require('@steal');
        var isNode = typeof process === 'object' && {}.toString.call(process) === '[object process]';
        var importRegEx = /@import [^uU]['"]?([^'"\)]*)['"]?/g;
        var resourceRegEx = /url\(['"]?([^'"\)]*)['"]?\)/g;
        var waitSeconds = loader.cssOptions && loader.cssOptions.timeout ? parseInt(loader.cssOptions.timeout, 10) : 60;
        var onloadCss = function (link, cb) {
            var styleSheets = getDocument().styleSheets, i = styleSheets.length;
            while (i--) {
                if (styleSheets[i].href === link.href) {
                    return cb();
                }
            }
            setTimeout(function () {
                onloadCss(link, cb);
            });
        };
        function isIE9() {
            var doc = getDocument();
            return doc && !!Function('/*@cc_on return (/^9/.test(@_jscript_version) && /MSIE 9.0(?!.*IEMobile)/i.test(navigator.userAgent)); @*/')();
        }
        function getDocument() {
            if (typeof doneSsr !== 'undefined' && doneSsr.globalDocument) {
                return doneSsr.globalDocument;
            }
            if (typeof document !== 'undefined') {
                return document;
            }
            throw new Error('Unable to load CSS in an environment without a document.');
        }
        function getHead() {
            var doc = getDocument();
            var head = doc.head || doc.getElementsByTagName('head')[0];
            if (!head) {
                var docEl = doc.documentElement || doc;
                head = doc.createElement('head');
                docEl.insertBefore(head, docEl.firstChild);
            }
            return head;
        }
        function CSSModule(load, loader) {
            if (typeof load === 'object') {
                this.load = load;
                this.loader = loader;
                this.address = this.load.address;
                this.source = this.load.source;
            } else {
                this.address = load;
                this.source = loader;
            }
        }
        CSSModule.cssCount = 0;
        CSSModule.ie9MaxStyleSheets = 31;
        CSSModule.currentStyleSheet = null;
        CSSModule.prototype = {
            injectLink: function () {
                if (this._loaded) {
                    return this._loaded;
                }
                if (this.linkExists()) {
                    this._loaded = Promise.resolve('');
                    return this._loaded;
                }
                var doc = getDocument();
                var link = this.link = doc.createElement('link');
                link.type = 'text/css';
                link.rel = 'stylesheet';
                link.href = this.address;
                this._loaded = new Promise(function (resolve, reject) {
                    var timeout = setTimeout(function () {
                        reject('Unable to load CSS');
                    }, waitSeconds * 1000);
                    var loadCB = function (event) {
                        clearTimeout(timeout);
                        link.removeEventListener('load', loadCB);
                        link.removeEventListener('error', loadCB);
                        if (event && event.type === 'error') {
                            reject('Unable to load CSS');
                        } else {
                            resolve('');
                        }
                    };
                    if ('isApplicationInstalled' in navigator || !link.addEventListener) {
                        onloadCss(link, loadCB);
                    } else if (navigator.noUI) {
                        loadCB();
                    } else {
                        link.addEventListener('load', loadCB);
                        link.addEventListener('error', loadCB);
                    }
                    getHead().appendChild(link);
                });
                return this._loaded;
            },
            injectStyle: function () {
                var doc = getDocument();
                var head = getHead();
                var style = this.style = doc.createElement('style');
                style.type = 'text/css';
                if (style.sheet) {
                    style.sheet.cssText = this.source;
                } else if (style.styleSheet) {
                    style.styleSheet.cssText = this.source;
                } else {
                    style.appendChild(doc.createTextNode(this.source));
                }
                head.appendChild(style);
            },
            ie9StyleSheetLimitHack: function () {
                var doc = getDocument();
                if (!CSSModule.cssCount) {
                    CSSModule.currentStyleSheet = doc.createStyleSheet();
                }
                CSSModule.cssCount += 1;
                CSSModule.currentStyleSheet.cssText += this.source;
                if (CSSModule.cssCount === CSSModule.ie9MaxStyleSheets) {
                    CSSModule.cssCount = 0;
                }
            },
            updateURLs: function () {
                var rawSource = this.source, address = this.address;
                this.source = rawSource.replace(importRegEx, function (whole, part) {
                    if (isNode) {
                        return '@import url(' + part + ')';
                    } else {
                        return '@import url(' + steal.joinURIs(address, part) + ')';
                    }
                });
                if (!loader.isEnv('build')) {
                    this.source = this.source + '/*# sourceURL=' + address + ' */';
                    this.source = this.source.replace(resourceRegEx, function (whole, part) {
                        return 'url(' + steal.joinURIs(address, part) + ')';
                    });
                }
                return this.source;
            },
            getExistingNode: function () {
                var doc = getDocument();
                var selector = '[href=\'' + this.address + '\']';
                return doc.querySelector && doc.querySelector(selector);
            },
            linkExists: function () {
                var styleSheets = getDocument().styleSheets;
                for (var i = 0; i < styleSheets.length; ++i) {
                    if (this.address === styleSheets[i].href) {
                        return true;
                    }
                }
                return false;
            },
            setupLiveReload: function (loader, name) {
                var head = getHead();
                var css = this;
                if (loader.liveReloadInstalled) {
                    var cssReload = loader['import']('live-reload', { name: module.id });
                    Promise.resolve(cssReload).then(function (reload) {
                        loader['import'](name).then(function () {
                            reload.once('!dispose/' + name, function () {
                                css.style.__isDirty = true;
                                reload.once('!cycleComplete', function () {
                                    head.removeChild(css.style);
                                });
                            });
                        });
                    });
                }
            }
        };
        if (loader.isEnv('production')) {
            exports.fetch = function (load) {
                var css = new CSSModule(load.address);
                return css.injectLink();
            };
        } else {
            exports.instantiate = function (load) {
                var loader = this;
                var css = new CSSModule(load.address, load.source);
                load.source = css.updateURLs();
                load.metadata.deps = [];
                load.metadata.format = 'css';
                load.metadata.execute = function () {
                    if (getDocument()) {
                        if (isIE9()) {
                            css.ie9StyleSheetLimitHack();
                        } else {
                            css.injectStyle();
                        }
                        css.setupLiveReload(loader, load.name);
                    }
                    return loader.newModule({ source: css.source });
                };
            };
        }
        exports.CSSModule = CSSModule;
        exports.getDocument = getDocument;
        exports.getHead = getHead;
        exports.locateScheme = true;
        exports.buildType = 'css';
        exports.includeInBuild = true;
        exports.pluginBuilder = 'steal-css/slim';
    }(function () {
        return this;
    }(), require, exports, module));
});
/*@node-require/steal-less@1.3.4#less-engine-node*/
define('@node-require/steal-less@1.3.4#less-engine-node', [], function(){ return {}; });
/*steal-less@1.3.4#less-engine-node*/
define('steal-less@1.3.4#less-engine-node', [], function(){ return {}; });
/*steal-less@1.3.4#less*/
define('steal-less@1.3.4#less', [], function(){ return {}; });
/*bit-docs-prettify@0.4.0#prism-config*/
define('bit-docs-prettify@0.4.0#prism-config', [
    'module',
    '@loader',
    'require'
], function (module, loader, require) {
    loader.get('@@global-helpers').prepareGlobal({
        require: require,
        name: module.id,
        deps: []
    });
    var define = loader.global.define;
    var require = loader.global.require;
    var source = 'window.Prism = {\n\tmanual: true\n};\n';
    loader.global.define = undefined;
    loader.global.module = undefined;
    loader.global.exports = undefined;
    loader.__exec({
        'source': source,
        'address': module.uri
    });
    loader.global.require = require;
    loader.global.define = define;
    return loader.get('@@global-helpers').retrieveGlobal(module.id, undefined);
});
/*prismjs@1.15.0#prism*/
define('prismjs@1.15.0#prism', function (require, exports, module) {
    (function (global, require, exports, module) {
        var _self = typeof window !== 'undefined' ? window : typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self : {};
        var Prism = function () {
            var lang = /\blang(?:uage)?-([\w-]+)\b/i;
            var uniqueId = 0;
            var _ = _self.Prism = {
                manual: _self.Prism && _self.Prism.manual,
                disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
                util: {
                    encode: function (tokens) {
                        if (tokens instanceof Token) {
                            return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
                        } else if (_.util.type(tokens) === 'Array') {
                            return tokens.map(_.util.encode);
                        } else {
                            return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
                        }
                    },
                    type: function (o) {
                        return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
                    },
                    objId: function (obj) {
                        if (!obj['__id']) {
                            Object.defineProperty(obj, '__id', { value: ++uniqueId });
                        }
                        return obj['__id'];
                    },
                    clone: function (o, visited) {
                        var type = _.util.type(o);
                        visited = visited || {};
                        switch (type) {
                        case 'Object':
                            if (visited[_.util.objId(o)]) {
                                return visited[_.util.objId(o)];
                            }
                            var clone = {};
                            visited[_.util.objId(o)] = clone;
                            for (var key in o) {
                                if (o.hasOwnProperty(key)) {
                                    clone[key] = _.util.clone(o[key], visited);
                                }
                            }
                            return clone;
                        case 'Array':
                            if (visited[_.util.objId(o)]) {
                                return visited[_.util.objId(o)];
                            }
                            var clone = [];
                            visited[_.util.objId(o)] = clone;
                            o.forEach(function (v, i) {
                                clone[i] = _.util.clone(v, visited);
                            });
                            return clone;
                        }
                        return o;
                    }
                },
                languages: {
                    extend: function (id, redef) {
                        var lang = _.util.clone(_.languages[id]);
                        for (var key in redef) {
                            lang[key] = redef[key];
                        }
                        return lang;
                    },
                    insertBefore: function (inside, before, insert, root) {
                        root = root || _.languages;
                        var grammar = root[inside];
                        if (arguments.length == 2) {
                            insert = arguments[1];
                            for (var newToken in insert) {
                                if (insert.hasOwnProperty(newToken)) {
                                    grammar[newToken] = insert[newToken];
                                }
                            }
                            return grammar;
                        }
                        var ret = {};
                        for (var token in grammar) {
                            if (grammar.hasOwnProperty(token)) {
                                if (token == before) {
                                    for (var newToken in insert) {
                                        if (insert.hasOwnProperty(newToken)) {
                                            ret[newToken] = insert[newToken];
                                        }
                                    }
                                }
                                ret[token] = grammar[token];
                            }
                        }
                        _.languages.DFS(_.languages, function (key, value) {
                            if (value === root[inside] && key != inside) {
                                this[key] = ret;
                            }
                        });
                        return root[inside] = ret;
                    },
                    DFS: function (o, callback, type, visited) {
                        visited = visited || {};
                        for (var i in o) {
                            if (o.hasOwnProperty(i)) {
                                callback.call(o, i, o[i], type || i);
                                if (_.util.type(o[i]) === 'Object' && !visited[_.util.objId(o[i])]) {
                                    visited[_.util.objId(o[i])] = true;
                                    _.languages.DFS(o[i], callback, null, visited);
                                } else if (_.util.type(o[i]) === 'Array' && !visited[_.util.objId(o[i])]) {
                                    visited[_.util.objId(o[i])] = true;
                                    _.languages.DFS(o[i], callback, i, visited);
                                }
                            }
                        }
                    }
                },
                plugins: {},
                highlightAll: function (async, callback) {
                    _.highlightAllUnder(document, async, callback);
                },
                highlightAllUnder: function (container, async, callback) {
                    var env = {
                        callback: callback,
                        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                    };
                    _.hooks.run('before-highlightall', env);
                    var elements = env.elements || container.querySelectorAll(env.selector);
                    for (var i = 0, element; element = elements[i++];) {
                        _.highlightElement(element, async === true, env.callback);
                    }
                },
                highlightElement: function (element, async, callback) {
                    var language, grammar, parent = element;
                    while (parent && !lang.test(parent.className)) {
                        parent = parent.parentNode;
                    }
                    if (parent) {
                        language = (parent.className.match(lang) || [
                            ,
                            ''
                        ])[1].toLowerCase();
                        grammar = _.languages[language];
                    }
                    element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
                    if (element.parentNode) {
                        parent = element.parentNode;
                        if (/pre/i.test(parent.nodeName)) {
                            parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
                        }
                    }
                    var code = element.textContent;
                    var env = {
                        element: element,
                        language: language,
                        grammar: grammar,
                        code: code
                    };
                    _.hooks.run('before-sanity-check', env);
                    if (!env.code || !env.grammar) {
                        if (env.code) {
                            _.hooks.run('before-highlight', env);
                            env.element.textContent = env.code;
                            _.hooks.run('after-highlight', env);
                        }
                        _.hooks.run('complete', env);
                        return;
                    }
                    _.hooks.run('before-highlight', env);
                    if (async && _self.Worker) {
                        var worker = new Worker(_.filename);
                        worker.onmessage = function (evt) {
                            env.highlightedCode = evt.data;
                            _.hooks.run('before-insert', env);
                            env.element.innerHTML = env.highlightedCode;
                            callback && callback.call(env.element);
                            _.hooks.run('after-highlight', env);
                            _.hooks.run('complete', env);
                        };
                        worker.postMessage(JSON.stringify({
                            language: env.language,
                            code: env.code,
                            immediateClose: true
                        }));
                    } else {
                        env.highlightedCode = _.highlight(env.code, env.grammar, env.language);
                        _.hooks.run('before-insert', env);
                        env.element.innerHTML = env.highlightedCode;
                        callback && callback.call(element);
                        _.hooks.run('after-highlight', env);
                        _.hooks.run('complete', env);
                    }
                },
                highlight: function (text, grammar, language) {
                    var env = {
                        code: text,
                        grammar: grammar,
                        language: language
                    };
                    _.hooks.run('before-tokenize', env);
                    env.tokens = _.tokenize(env.code, env.grammar);
                    _.hooks.run('after-tokenize', env);
                    return Token.stringify(_.util.encode(env.tokens), env.language);
                },
                matchGrammar: function (text, strarr, grammar, index, startPos, oneshot, target) {
                    var Token = _.Token;
                    for (var token in grammar) {
                        if (!grammar.hasOwnProperty(token) || !grammar[token]) {
                            continue;
                        }
                        if (token == target) {
                            return;
                        }
                        var patterns = grammar[token];
                        patterns = _.util.type(patterns) === 'Array' ? patterns : [patterns];
                        for (var j = 0; j < patterns.length; ++j) {
                            var pattern = patterns[j], inside = pattern.inside, lookbehind = !!pattern.lookbehind, greedy = !!pattern.greedy, lookbehindLength = 0, alias = pattern.alias;
                            if (greedy && !pattern.pattern.global) {
                                var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
                                pattern.pattern = RegExp(pattern.pattern.source, flags + 'g');
                            }
                            pattern = pattern.pattern || pattern;
                            for (var i = index, pos = startPos; i < strarr.length; pos += strarr[i].length, ++i) {
                                var str = strarr[i];
                                if (strarr.length > text.length) {
                                    return;
                                }
                                if (str instanceof Token) {
                                    continue;
                                }
                                if (greedy && i != strarr.length - 1) {
                                    pattern.lastIndex = pos;
                                    var match = pattern.exec(text);
                                    if (!match) {
                                        break;
                                    }
                                    var from = match.index + (lookbehind ? match[1].length : 0), to = match.index + match[0].length, k = i, p = pos;
                                    for (var len = strarr.length; k < len && (p < to || !strarr[k].type && !strarr[k - 1].greedy); ++k) {
                                        p += strarr[k].length;
                                        if (from >= p) {
                                            ++i;
                                            pos = p;
                                        }
                                    }
                                    if (strarr[i] instanceof Token) {
                                        continue;
                                    }
                                    delNum = k - i;
                                    str = text.slice(pos, p);
                                    match.index -= pos;
                                } else {
                                    pattern.lastIndex = 0;
                                    var match = pattern.exec(str), delNum = 1;
                                }
                                if (!match) {
                                    if (oneshot) {
                                        break;
                                    }
                                    continue;
                                }
                                if (lookbehind) {
                                    lookbehindLength = match[1] ? match[1].length : 0;
                                }
                                var from = match.index + lookbehindLength, match = match[0].slice(lookbehindLength), to = from + match.length, before = str.slice(0, from), after = str.slice(to);
                                var args = [
                                    i,
                                    delNum
                                ];
                                if (before) {
                                    ++i;
                                    pos += before.length;
                                    args.push(before);
                                }
                                var wrapped = new Token(token, inside ? _.tokenize(match, inside) : match, alias, match, greedy);
                                args.push(wrapped);
                                if (after) {
                                    args.push(after);
                                }
                                Array.prototype.splice.apply(strarr, args);
                                if (delNum != 1)
                                    _.matchGrammar(text, strarr, grammar, i, pos, true, token);
                                if (oneshot)
                                    break;
                            }
                        }
                    }
                },
                tokenize: function (text, grammar, language) {
                    var strarr = [text];
                    var rest = grammar.rest;
                    if (rest) {
                        for (var token in rest) {
                            grammar[token] = rest[token];
                        }
                        delete grammar.rest;
                    }
                    _.matchGrammar(text, strarr, grammar, 0, 0, false);
                    return strarr;
                },
                hooks: {
                    all: {},
                    add: function (name, callback) {
                        var hooks = _.hooks.all;
                        hooks[name] = hooks[name] || [];
                        hooks[name].push(callback);
                    },
                    run: function (name, env) {
                        var callbacks = _.hooks.all[name];
                        if (!callbacks || !callbacks.length) {
                            return;
                        }
                        for (var i = 0, callback; callback = callbacks[i++];) {
                            callback(env);
                        }
                    }
                }
            };
            var Token = _.Token = function (type, content, alias, matchedStr, greedy) {
                this.type = type;
                this.content = content;
                this.alias = alias;
                this.length = (matchedStr || '').length | 0;
                this.greedy = !!greedy;
            };
            Token.stringify = function (o, language, parent) {
                if (typeof o == 'string') {
                    return o;
                }
                if (_.util.type(o) === 'Array') {
                    return o.map(function (element) {
                        return Token.stringify(element, language, o);
                    }).join('');
                }
                var env = {
                    type: o.type,
                    content: Token.stringify(o.content, language, parent),
                    tag: 'span',
                    classes: [
                        'token',
                        o.type
                    ],
                    attributes: {},
                    language: language,
                    parent: parent
                };
                if (o.alias) {
                    var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
                    Array.prototype.push.apply(env.classes, aliases);
                }
                _.hooks.run('wrap', env);
                var attributes = Object.keys(env.attributes).map(function (name) {
                    return name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
                }).join(' ');
                return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';
            };
            if (!_self.document) {
                if (!_self.addEventListener) {
                    return _self.Prism;
                }
                if (!_.disableWorkerMessageHandler) {
                    _self.addEventListener('message', function (evt) {
                        var message = JSON.parse(evt.data), lang = message.language, code = message.code, immediateClose = message.immediateClose;
                        _self.postMessage(_.highlight(code, _.languages[lang], lang));
                        if (immediateClose) {
                            _self.close();
                        }
                    }, false);
                }
                return _self.Prism;
            }
            var script = document.currentScript || [].slice.call(document.getElementsByTagName('script')).pop();
            if (script) {
                _.filename = script.src;
                if (!_.manual && !script.hasAttribute('data-manual')) {
                    if (document.readyState !== 'loading') {
                        if (window.requestAnimationFrame) {
                            window.requestAnimationFrame(_.highlightAll);
                        } else {
                            window.setTimeout(_.highlightAll, 16);
                        }
                    } else {
                        document.addEventListener('DOMContentLoaded', _.highlightAll);
                    }
                }
            }
            return _self.Prism;
        }();
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = Prism;
        }
        if (typeof global !== 'undefined') {
            global.Prism = Prism;
        }
        Prism.languages.markup = {
            'comment': /<!--[\s\S]*?-->/,
            'prolog': /<\?[\s\S]+?\?>/,
            'doctype': /<!DOCTYPE[\s\S]+?>/i,
            'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
            'tag': {
                pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
                greedy: true,
                inside: {
                    'tag': {
                        pattern: /^<\/?[^\s>\/]+/i,
                        inside: {
                            'punctuation': /^<\/?/,
                            'namespace': /^[^\s>\/:]+:/
                        }
                    },
                    'attr-value': {
                        pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
                        inside: {
                            'punctuation': [
                                /^=/,
                                {
                                    pattern: /(^|[^\\])["']/,
                                    lookbehind: true
                                }
                            ]
                        }
                    },
                    'punctuation': /\/?>/,
                    'attr-name': {
                        pattern: /[^\s>\/]+/,
                        inside: { 'namespace': /^[^\s>\/:]+:/ }
                    }
                }
            },
            'entity': /&#?[\da-z]{1,8};/i
        };
        Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] = Prism.languages.markup['entity'];
        Prism.hooks.add('wrap', function (env) {
            if (env.type === 'entity') {
                env.attributes['title'] = env.content.replace(/&amp;/, '&');
            }
        });
        Prism.languages.xml = Prism.languages.markup;
        Prism.languages.html = Prism.languages.markup;
        Prism.languages.mathml = Prism.languages.markup;
        Prism.languages.svg = Prism.languages.markup;
        Prism.languages.css = {
            'comment': /\/\*[\s\S]*?\*\//,
            'atrule': {
                pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
                inside: { 'rule': /@[\w-]+/ }
            },
            'url': /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
            'selector': /[^{}\s][^{};]*?(?=\s*\{)/,
            'string': {
                pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                greedy: true
            },
            'property': /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
            'important': /\B!important\b/i,
            'function': /[-a-z0-9]+(?=\()/i,
            'punctuation': /[(){};:]/
        };
        Prism.languages.css['atrule'].inside.rest = Prism.languages.css;
        if (Prism.languages.markup) {
            Prism.languages.insertBefore('markup', 'tag', {
                'style': {
                    pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
                    lookbehind: true,
                    inside: Prism.languages.css,
                    alias: 'language-css',
                    greedy: true
                }
            });
            Prism.languages.insertBefore('inside', 'attr-value', {
                'style-attr': {
                    pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
                    inside: {
                        'attr-name': {
                            pattern: /^\s*style/i,
                            inside: Prism.languages.markup.tag.inside
                        },
                        'punctuation': /^\s*=\s*['"]|['"]\s*$/,
                        'attr-value': {
                            pattern: /.+/i,
                            inside: Prism.languages.css
                        }
                    },
                    alias: 'language-css'
                }
            }, Prism.languages.markup.tag);
        }
        Prism.languages.clike = {
            'comment': [
                {
                    pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
                    lookbehind: true
                },
                {
                    pattern: /(^|[^\\:])\/\/.*/,
                    lookbehind: true,
                    greedy: true
                }
            ],
            'string': {
                pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
                greedy: true
            },
            'class-name': {
                pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
                lookbehind: true,
                inside: { punctuation: /[.\\]/ }
            },
            'keyword': /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
            'boolean': /\b(?:true|false)\b/,
            'function': /[a-z0-9_]+(?=\()/i,
            'number': /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
            'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
            'punctuation': /[{}[\];(),.:]/
        };
        Prism.languages.javascript = Prism.languages.extend('clike', {
            'keyword': /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
            'number': /\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
            'function': /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
            'operator': /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
        });
        Prism.languages.insertBefore('javascript', 'keyword', {
            'regex': {
                pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
                lookbehind: true,
                greedy: true
            },
            'function-variable': {
                pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
                alias: 'function'
            },
            'constant': /\b[A-Z][A-Z\d_]*\b/
        });
        Prism.languages.insertBefore('javascript', 'string', {
            'template-string': {
                pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
                greedy: true,
                inside: {
                    'interpolation': {
                        pattern: /\${[^}]+}/,
                        inside: {
                            'interpolation-punctuation': {
                                pattern: /^\${|}$/,
                                alias: 'punctuation'
                            },
                            rest: null
                        }
                    },
                    'string': /[\s\S]+/
                }
            }
        });
        Prism.languages.javascript['template-string'].inside['interpolation'].inside.rest = Prism.languages.javascript;
        if (Prism.languages.markup) {
            Prism.languages.insertBefore('markup', 'tag', {
                'script': {
                    pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
                    lookbehind: true,
                    inside: Prism.languages.javascript,
                    alias: 'language-javascript',
                    greedy: true
                }
            });
        }
        Prism.languages.js = Prism.languages.javascript;
        (function () {
            if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
                return;
            }
            self.Prism.fileHighlight = function () {
                var Extensions = {
                    'js': 'javascript',
                    'py': 'python',
                    'rb': 'ruby',
                    'ps1': 'powershell',
                    'psm1': 'powershell',
                    'sh': 'bash',
                    'bat': 'batch',
                    'h': 'c',
                    'tex': 'latex'
                };
                Array.prototype.slice.call(document.querySelectorAll('pre[data-src]')).forEach(function (pre) {
                    var src = pre.getAttribute('data-src');
                    var language, parent = pre;
                    var lang = /\blang(?:uage)?-([\w-]+)\b/i;
                    while (parent && !lang.test(parent.className)) {
                        parent = parent.parentNode;
                    }
                    if (parent) {
                        language = (pre.className.match(lang) || [
                            ,
                            ''
                        ])[1];
                    }
                    if (!language) {
                        var extension = (src.match(/\.(\w+)$/) || [
                            ,
                            ''
                        ])[1];
                        language = Extensions[extension] || extension;
                    }
                    var code = document.createElement('code');
                    code.className = 'language-' + language;
                    pre.textContent = '';
                    code.textContent = 'Loading\u2026';
                    pre.appendChild(code);
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', src, true);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4) {
                            if (xhr.status < 400 && xhr.responseText) {
                                code.textContent = xhr.responseText;
                                Prism.highlightElement(code);
                            } else if (xhr.status >= 400) {
                                code.textContent = '\u2716 Error ' + xhr.status + ' while fetching file: ' + xhr.statusText;
                            } else {
                                code.textContent = '\u2716 Error: File does not exist or is empty';
                            }
                        }
                    };
                    xhr.send(null);
                });
                if (Prism.plugins.toolbar) {
                    Prism.plugins.toolbar.registerButton('download-file', function (env) {
                        var pre = env.element.parentNode;
                        if (!pre || !/pre/i.test(pre.nodeName) || !pre.hasAttribute('data-src') || !pre.hasAttribute('data-download-link')) {
                            return;
                        }
                        var src = pre.getAttribute('data-src');
                        var a = document.createElement('a');
                        a.textContent = pre.getAttribute('data-download-link-label') || 'Download';
                        a.setAttribute('download', '');
                        a.href = src;
                        return a;
                    });
                }
            };
            document.addEventListener('DOMContentLoaded', self.Prism.fileHighlight);
        }());
    }(function () {
        return this;
    }(), require, exports, module));
});
/*prismjs@1.15.0#plugins/line-numbers/prism-line-numbers*/
define('prismjs@1.15.0#plugins/line-numbers/prism-line-numbers', [
    'module',
    '@loader',
    'require'
], function (module, loader, require) {
    loader.get('@@global-helpers').prepareGlobal({
        require: require,
        name: module.id,
        deps: []
    });
    var define = loader.global.define;
    var require = loader.global.require;
    var source = '(function () {\n\n\tif (typeof self === \'undefined\' || !self.Prism || !self.document) {\n\t\treturn;\n\t}\n\n\t/**\n\t * Plugin name which is used as a class name for <pre> which is activating the plugin\n\t * @type {String}\n\t */\n\tvar PLUGIN_NAME = \'line-numbers\';\n\t\n\t/**\n\t * Regular expression used for determining line breaks\n\t * @type {RegExp}\n\t */\n\tvar NEW_LINE_EXP = /\\n(?!$)/g;\n\n\t/**\n\t * Resizes line numbers spans according to height of line of code\n\t * @param {Element} element <pre> element\n\t */\n\tvar _resizeElement = function (element) {\n\t\tvar codeStyles = getStyles(element);\n\t\tvar whiteSpace = codeStyles[\'white-space\'];\n\n\t\tif (whiteSpace === \'pre-wrap\' || whiteSpace === \'pre-line\') {\n\t\t\tvar codeElement = element.querySelector(\'code\');\n\t\t\tvar lineNumbersWrapper = element.querySelector(\'.line-numbers-rows\');\n\t\t\tvar lineNumberSizer = element.querySelector(\'.line-numbers-sizer\');\n\t\t\tvar codeLines = codeElement.textContent.split(NEW_LINE_EXP);\n\n\t\t\tif (!lineNumberSizer) {\n\t\t\t\tlineNumberSizer = document.createElement(\'span\');\n\t\t\t\tlineNumberSizer.className = \'line-numbers-sizer\';\n\n\t\t\t\tcodeElement.appendChild(lineNumberSizer);\n\t\t\t}\n\n\t\t\tlineNumberSizer.style.display = \'block\';\n\n\t\t\tcodeLines.forEach(function (line, lineNumber) {\n\t\t\t\tlineNumberSizer.textContent = line || \'\\n\';\n\t\t\t\tvar lineSize = lineNumberSizer.getBoundingClientRect().height;\n\t\t\t\tlineNumbersWrapper.children[lineNumber].style.height = lineSize + \'px\';\n\t\t\t});\n\n\t\t\tlineNumberSizer.textContent = \'\';\n\t\t\tlineNumberSizer.style.display = \'none\';\n\t\t}\n\t};\n\n\t/**\n\t * Returns style declarations for the element\n\t * @param {Element} element\n\t */\n\tvar getStyles = function (element) {\n\t\tif (!element) {\n\t\t\treturn null;\n\t\t}\n\n\t\treturn window.getComputedStyle ? getComputedStyle(element) : (element.currentStyle || null);\n\t};\n\n\twindow.addEventListener(\'resize\', function () {\n\t\tArray.prototype.forEach.call(document.querySelectorAll(\'pre.\' + PLUGIN_NAME), _resizeElement);\n\t});\n\n\tPrism.hooks.add(\'complete\', function (env) {\n\t\tif (!env.code) {\n\t\t\treturn;\n\t\t}\n\n\t\t// works only for <code> wrapped inside <pre> (not inline)\n\t\tvar pre = env.element.parentNode;\n\t\tvar clsReg = /\\s*\\bline-numbers\\b\\s*/;\n\t\tif (\n\t\t\t!pre || !/pre/i.test(pre.nodeName) ||\n\t\t\t// Abort only if nor the <pre> nor the <code> have the class\n\t\t\t(!clsReg.test(pre.className) && !clsReg.test(env.element.className))\n\t\t) {\n\t\t\treturn;\n\t\t}\n\n\t\tif (env.element.querySelector(\'.line-numbers-rows\')) {\n\t\t\t// Abort if line numbers already exists\n\t\t\treturn;\n\t\t}\n\n\t\tif (clsReg.test(env.element.className)) {\n\t\t\t// Remove the class \'line-numbers\' from the <code>\n\t\t\tenv.element.className = env.element.className.replace(clsReg, \' \');\n\t\t}\n\t\tif (!clsReg.test(pre.className)) {\n\t\t\t// Add the class \'line-numbers\' to the <pre>\n\t\t\tpre.className += \' line-numbers\';\n\t\t}\n\n\t\tvar match = env.code.match(NEW_LINE_EXP);\n\t\tvar linesNum = match ? match.length + 1 : 1;\n\t\tvar lineNumbersWrapper;\n\n\t\tvar lines = new Array(linesNum + 1);\n\t\tlines = lines.join(\'<span></span>\');\n\n\t\tlineNumbersWrapper = document.createElement(\'span\');\n\t\tlineNumbersWrapper.setAttribute(\'aria-hidden\', \'true\');\n\t\tlineNumbersWrapper.className = \'line-numbers-rows\';\n\t\tlineNumbersWrapper.innerHTML = lines;\n\n\t\tif (pre.hasAttribute(\'data-start\')) {\n\t\t\tpre.style.counterReset = \'linenumber \' + (parseInt(pre.getAttribute(\'data-start\'), 10) - 1);\n\t\t}\n\n\t\tenv.element.appendChild(lineNumbersWrapper);\n\n\t\t_resizeElement(pre);\n\n\t\tPrism.hooks.run(\'line-numbers\', env);\n\t});\n\n\tPrism.hooks.add(\'line-numbers\', function (env) {\n\t\tenv.plugins = env.plugins || {};\n\t\tenv.plugins.lineNumbers = true;\n\t});\n\t\n\t/**\n\t * Global exports\n\t */\n\tPrism.plugins.lineNumbers = {\n\t\t/**\n\t\t * Get node for provided line number\n\t\t * @param {Element} element pre element\n\t\t * @param {Number} number line number\n\t\t * @return {Element|undefined}\n\t\t */\n\t\tgetLine: function (element, number) {\n\t\t\tif (element.tagName !== \'PRE\' || !element.classList.contains(PLUGIN_NAME)) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tvar lineNumberRows = element.querySelector(\'.line-numbers-rows\');\n\t\t\tvar lineNumberStart = parseInt(element.getAttribute(\'data-start\'), 10) || 1;\n\t\t\tvar lineNumberEnd = lineNumberStart + (lineNumberRows.children.length - 1);\n\n\t\t\tif (number < lineNumberStart) {\n\t\t\t\tnumber = lineNumberStart;\n\t\t\t}\n\t\t\tif (number > lineNumberEnd) {\n\t\t\t\tnumber = lineNumberEnd;\n\t\t\t}\n\n\t\t\tvar lineIndex = number - lineNumberStart;\n\n\t\t\treturn lineNumberRows.children[lineIndex];\n\t\t}\n\t};\n\n}());';
    loader.global.define = undefined;
    loader.global.module = undefined;
    loader.global.exports = undefined;
    loader.__exec({
        'source': source,
        'address': module.uri
    });
    loader.global.require = require;
    loader.global.define = define;
    return loader.get('@@global-helpers').retrieveGlobal(module.id, undefined);
});
/*prismjs@1.15.0#plugins/previewers/prism-previewers*/
define('prismjs@1.15.0#plugins/previewers/prism-previewers', [
    'module',
    '@loader',
    'require'
], function (module, loader, require) {
    loader.get('@@global-helpers').prepareGlobal({
        require: require,
        name: module.id,
        deps: []
    });
    var define = loader.global.define;
    var require = loader.global.require;
    var source = '(function() {\n\n\tif (\n\t\ttypeof self !== \'undefined\' && !self.Prism ||\n\t\t!self.document || !Function.prototype.bind\n\t) {\n\t\treturn;\n\t}\n\n\tvar previewers = {\n\t\t// gradient must be defined before color and angle\n\t\t\'gradient\': {\n\t\t\tcreate: (function () {\n\n\t\t\t\t// Stores already processed gradients so that we don\'t\n\t\t\t\t// make the conversion every time the previewer is shown\n\t\t\t\tvar cache = {};\n\n\t\t\t\t/**\n\t\t\t\t * Returns a W3C-valid linear gradient\n\t\t\t\t * @param {string} prefix Vendor prefix if any ("-moz-", "-webkit-", etc.)\n\t\t\t\t * @param {string} func Gradient function name ("linear-gradient")\n\t\t\t\t * @param {string[]} values Array of the gradient function parameters (["0deg", "red 0%", "blue 100%"])\n\t\t\t\t */\n\t\t\t\tvar convertToW3CLinearGradient = function(prefix, func, values) {\n\t\t\t\t\t// Default value for angle\n\t\t\t\t\tvar angle = \'180deg\';\n\n\t\t\t\t\tif (/^(?:-?\\d*\\.?\\d+(?:deg|rad)|to\\b|top|right|bottom|left)/.test(values[0])) {\n\t\t\t\t\t\tangle = values.shift();\n\t\t\t\t\t\tif (angle.indexOf(\'to \') < 0) {\n\t\t\t\t\t\t\t// Angle uses old keywords\n\t\t\t\t\t\t\t// W3C syntax uses "to" + opposite keywords\n\t\t\t\t\t\t\tif (angle.indexOf(\'top\') >= 0) {\n\t\t\t\t\t\t\t\tif (angle.indexOf(\'left\') >= 0) {\n\t\t\t\t\t\t\t\t\tangle = \'to bottom right\';\n\t\t\t\t\t\t\t\t} else if (angle.indexOf(\'right\') >= 0) {\n\t\t\t\t\t\t\t\t\tangle = \'to bottom left\';\n\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\tangle = \'to bottom\';\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t} else if (angle.indexOf(\'bottom\') >= 0) {\n\t\t\t\t\t\t\t\tif (angle.indexOf(\'left\') >= 0) {\n\t\t\t\t\t\t\t\t\tangle = \'to top right\';\n\t\t\t\t\t\t\t\t} else if (angle.indexOf(\'right\') >= 0) {\n\t\t\t\t\t\t\t\t\tangle = \'to top left\';\n\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\tangle = \'to top\';\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t} else if (angle.indexOf(\'left\') >= 0) {\n\t\t\t\t\t\t\t\tangle = \'to right\';\n\t\t\t\t\t\t\t} else if (angle.indexOf(\'right\') >= 0) {\n\t\t\t\t\t\t\t\tangle = \'to left\';\n\t\t\t\t\t\t\t} else if (prefix) {\n\t\t\t\t\t\t\t\t// Angle is shifted by 90deg in prefixed gradients\n\t\t\t\t\t\t\t\tif (angle.indexOf(\'deg\') >= 0) {\n\t\t\t\t\t\t\t\t\tangle = (90 - parseFloat(angle)) + \'deg\';\n\t\t\t\t\t\t\t\t} else if (angle.indexOf(\'rad\') >= 0) {\n\t\t\t\t\t\t\t\t\tangle = (Math.PI / 2 - parseFloat(angle)) + \'rad\';\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\treturn func + \'(\' + angle + \',\' + values.join(\',\') + \')\';\n\t\t\t\t};\n\n\t\t\t\t/**\n\t\t\t\t * Returns a W3C-valid radial gradient\n\t\t\t\t * @param {string} prefix Vendor prefix if any ("-moz-", "-webkit-", etc.)\n\t\t\t\t * @param {string} func Gradient function name ("linear-gradient")\n\t\t\t\t * @param {string[]} values Array of the gradient function parameters (["0deg", "red 0%", "blue 100%"])\n\t\t\t\t */\n\t\t\t\tvar convertToW3CRadialGradient = function(prefix, func, values) {\n\t\t\t\t\tif (values[0].indexOf(\'at\') < 0) {\n\t\t\t\t\t\t// Looks like old syntax\n\n\t\t\t\t\t\t// Default values\n\t\t\t\t\t\tvar position = \'center\';\n\t\t\t\t\t\tvar shape = \'ellipse\';\n\t\t\t\t\t\tvar size = \'farthest-corner\';\n\n\t\t\t\t\t\tif (/\\bcenter|top|right|bottom|left\\b|^\\d+/.test(values[0])) {\n\t\t\t\t\t\t\t// Found a position\n\t\t\t\t\t\t\t// Remove angle value, if any\n\t\t\t\t\t\t\tposition = values.shift().replace(/\\s*-?\\d+(?:rad|deg)\\s*/, \'\');\n\t\t\t\t\t\t}\n\t\t\t\t\t\tif (/\\bcircle|ellipse|closest|farthest|contain|cover\\b/.test(values[0])) {\n\t\t\t\t\t\t\t// Found a shape and/or size\n\t\t\t\t\t\t\tvar shapeSizeParts = values.shift().split(/\\s+/);\n\t\t\t\t\t\t\tif (shapeSizeParts[0] && (shapeSizeParts[0] === \'circle\' || shapeSizeParts[0] === \'ellipse\')) {\n\t\t\t\t\t\t\t\tshape = shapeSizeParts.shift();\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tif (shapeSizeParts[0]) {\n\t\t\t\t\t\t\t\tsize = shapeSizeParts.shift();\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t// Old keywords are converted to their synonyms\n\t\t\t\t\t\t\tif (size === \'cover\') {\n\t\t\t\t\t\t\t\tsize = \'farthest-corner\';\n\t\t\t\t\t\t\t} else if (size === \'contain\') {\n\t\t\t\t\t\t\t\tsize = \'clothest-side\';\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\treturn func + \'(\' + shape + \' \' + size + \' at \' + position + \',\' + values.join(\',\') + \')\';\n\t\t\t\t\t}\n\t\t\t\t\treturn func + \'(\' + values.join(\',\') + \')\';\n\t\t\t\t};\n\n\t\t\t\t/**\n\t\t\t\t * Converts a gradient to a W3C-valid one\n\t\t\t\t * Does not support old webkit syntax (-webkit-gradient(linear...) and -webkit-gradient(radial...))\n\t\t\t\t * @param {string} gradient The CSS gradient\n\t\t\t\t */\n\t\t\t\tvar convertToW3CGradient = function(gradient) {\n\t\t\t\t\tif (cache[gradient]) {\n\t\t\t\t\t\treturn cache[gradient];\n\t\t\t\t\t}\n\t\t\t\t\tvar parts = gradient.match(/^(\\b|\\B-[a-z]{1,10}-)((?:repeating-)?(?:linear|radial)-gradient)/);\n\t\t\t\t\t// "", "-moz-", etc.\n\t\t\t\t\tvar prefix = parts && parts[1];\n\t\t\t\t\t// "linear-gradient", "radial-gradient", etc.\n\t\t\t\t\tvar func = parts && parts[2];\n\n\t\t\t\t\tvar values = gradient.replace(/^(?:\\b|\\B-[a-z]{1,10}-)(?:repeating-)?(?:linear|radial)-gradient\\(|\\)$/g, \'\').split(/\\s*,\\s*/);\n\n\t\t\t\t\tif (func.indexOf(\'linear\') >= 0) {\n\t\t\t\t\t\treturn cache[gradient] = convertToW3CLinearGradient(prefix, func, values);\n\t\t\t\t\t} else if (func.indexOf(\'radial\') >= 0) {\n\t\t\t\t\t\treturn cache[gradient] = convertToW3CRadialGradient(prefix, func, values);\n\t\t\t\t\t}\n\t\t\t\t\treturn cache[gradient] = func + \'(\' + values.join(\',\') + \')\';\n\t\t\t\t};\n\n\t\t\t\treturn function () {\n\t\t\t\t\tnew Prism.plugins.Previewer(\'gradient\', function(value) {\n\t\t\t\t\t\tthis.firstChild.style.backgroundImage = \'\';\n\t\t\t\t\t\tthis.firstChild.style.backgroundImage = convertToW3CGradient(value);\n\t\t\t\t\t\treturn !!this.firstChild.style.backgroundImage;\n\t\t\t\t\t}, \'*\', function () {\n\t\t\t\t\t\tthis._elt.innerHTML = \'<div></div>\';\n\t\t\t\t\t});\n\t\t\t\t};\n\t\t\t}()),\n\t\t\ttokens: {\n\t\t\t\t\'gradient\': {\n\t\t\t\t\tpattern: /(?:\\b|\\B-[a-z]{1,10}-)(?:repeating-)?(?:linear|radial)-gradient\\((?:(?:rgb|hsl)a?\\(.+?\\)|[^\\)])+\\)/gi,\n\t\t\t\t\tinside: {\n\t\t\t\t\t\t\'function\': /[\\w-]+(?=\\()/,\n\t\t\t\t\t\t\'punctuation\': /[(),]/\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t},\n\t\t\tlanguages: {\n\t\t\t\t\'css\': true,\n\t\t\t\t\'less\': true,\n\t\t\t\t\'sass\': [\n\t\t\t\t\t{\n\t\t\t\t\t\tlang: \'sass\',\n\t\t\t\t\t\tbefore: \'punctuation\',\n\t\t\t\t\t\tinside: \'inside\',\n\t\t\t\t\t\troot: Prism.languages.sass && Prism.languages.sass[\'variable-line\']\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tlang: \'sass\',\n\t\t\t\t\t\tbefore: \'punctuation\',\n\t\t\t\t\t\tinside: \'inside\',\n\t\t\t\t\t\troot: Prism.languages.sass && Prism.languages.sass[\'property-line\']\n\t\t\t\t\t}\n\t\t\t\t],\n\t\t\t\t\'scss\': true,\n\t\t\t\t\'stylus\': [\n\t\t\t\t\t{\n\t\t\t\t\t\tlang: \'stylus\',\n\t\t\t\t\t\tbefore: \'func\',\n\t\t\t\t\t\tinside: \'rest\',\n\t\t\t\t\t\troot: Prism.languages.stylus && Prism.languages.stylus[\'property-declaration\'].inside\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tlang: \'stylus\',\n\t\t\t\t\t\tbefore: \'func\',\n\t\t\t\t\t\tinside: \'rest\',\n\t\t\t\t\t\troot: Prism.languages.stylus && Prism.languages.stylus[\'variable-declaration\'].inside\n\t\t\t\t\t}\n\t\t\t\t]\n\t\t\t}\n\t\t},\n\t\t\'angle\': {\n\t\t\tcreate: function () {\n\t\t\t\tnew Prism.plugins.Previewer(\'angle\', function(value) {\n\t\t\t\t\tvar num = parseFloat(value);\n\t\t\t\t\tvar unit = value.match(/[a-z]+$/i);\n\t\t\t\t\tvar max, percentage;\n\t\t\t\t\tif (!num || !unit) {\n\t\t\t\t\t\treturn false;\n\t\t\t\t\t}\n\t\t\t\t\tunit = unit[0];\n\n\t\t\t\t\tswitch(unit) {\n\t\t\t\t\t\tcase \'deg\':\n\t\t\t\t\t\t\tmax = 360;\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\tcase \'grad\':\n\t\t\t\t\t\t\tmax = 400;\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\tcase \'rad\':\n\t\t\t\t\t\t\tmax = 2 * Math.PI;\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\tcase \'turn\':\n\t\t\t\t\t\t\tmax = 1;\n\t\t\t\t\t}\n\n\t\t\t\t\tpercentage = 100 * num/max;\n\t\t\t\t\tpercentage %= 100;\n\n\t\t\t\t\tthis[(num < 0? \'set\' : \'remove\') + \'Attribute\'](\'data-negative\', \'\');\n\t\t\t\t\tthis.querySelector(\'circle\').style.strokeDasharray = Math.abs(percentage) + \',500\';\n\t\t\t\t\treturn true;\n\t\t\t\t}, \'*\', function () {\n\t\t\t\t\tthis._elt.innerHTML = \'<svg viewBox="0 0 64 64">\' +\n\t\t\t\t\t\t\'<circle r="16" cy="32" cx="32"></circle>\' +\n\t\t\t\t\t\t\'</svg>\';\n\t\t\t\t});\n\t\t\t},\n\t\t\ttokens: {\n\t\t\t\t\'angle\': /(?:\\b|\\B-|(?=\\B\\.))\\d*\\.?\\d+(?:deg|g?rad|turn)\\b/i\n\t\t\t},\n\t\t\tlanguages: {\n\t\t\t\t\'css\': true,\n\t\t\t\t\'less\': true,\n\t\t\t\t\'markup\': {\n\t\t\t\t\tlang: \'markup\',\n\t\t\t\t\tbefore: \'punctuation\',\n\t\t\t\t\tinside: \'inside\',\n\t\t\t\t\troot: Prism.languages.markup && Prism.languages.markup[\'tag\'].inside[\'attr-value\']\n\t\t\t\t},\n\t\t\t\t\'sass\': [\n\t\t\t\t\t{\n\t\t\t\t\t\tlang: \'sass\',\n\t\t\t\t\t\tinside: \'inside\',\n\t\t\t\t\t\troot: Prism.languages.sass && Prism.languages.sass[\'property-line\']\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tlang: \'sass\',\n\t\t\t\t\t\tbefore: \'operator\',\n\t\t\t\t\t\tinside: \'inside\',\n\t\t\t\t\t\troot: Prism.languages.sass && Prism.languages.sass[\'variable-line\']\n\t\t\t\t\t}\n\t\t\t\t],\n\t\t\t\t\'scss\': true,\n\t\t\t\t\'stylus\': [\n\t\t\t\t\t{\n\t\t\t\t\t\tlang: \'stylus\',\n\t\t\t\t\t\tbefore: \'func\',\n\t\t\t\t\t\tinside: \'rest\',\n\t\t\t\t\t\troot: Prism.languages.stylus && Prism.languages.stylus[\'property-declaration\'].inside\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tlang: \'stylus\',\n\t\t\t\t\t\tbefore: \'func\',\n\t\t\t\t\t\tinside: \'rest\',\n\t\t\t\t\t\troot: Prism.languages.stylus && Prism.languages.stylus[\'variable-declaration\'].inside\n\t\t\t\t\t}\n\t\t\t\t]\n\t\t\t}\n\t\t},\n\t\t\'color\': {\n\t\t\tcreate: function () {\n\t\t\t\tnew Prism.plugins.Previewer(\'color\', function(value) {\n\t\t\t\t\tthis.style.backgroundColor = \'\';\n\t\t\t\t\tthis.style.backgroundColor = value;\n\t\t\t\t\treturn !!this.style.backgroundColor;\n\t\t\t\t});\n\t\t\t},\n\t\t\ttokens: {\n\t\t\t\t\'color\': {\n\t\t\t\t\tpattern: /\\B#(?:[0-9a-f]{3}){1,2}\\b|\\b(?:rgb|hsl)\\(\\s*\\d{1,3}\\s*,\\s*\\d{1,3}%?\\s*,\\s*\\d{1,3}%?\\s*\\)\\B|\\b(?:rgb|hsl)a\\(\\s*\\d{1,3}\\s*,\\s*\\d{1,3}%?\\s*,\\s*\\d{1,3}%?\\s*,\\s*(?:0|0?\\.\\d+|1)\\s*\\)\\B|\\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGray|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gray|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGray|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\\b/i,\n\t\t\t\t\tinside: {\n\t\t\t\t\t\t\'function\': /[\\w-]+(?=\\()/,\n\t\t\t\t\t\t\'punctuation\': /[(),]/\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t},\n\t\t\tlanguages: {\n\t\t\t\t\'css\': true,\n\t\t\t\t\'less\': true,\n\t\t\t\t\'markup\': {\n\t\t\t\t\tlang: \'markup\',\n\t\t\t\t\tbefore: \'punctuation\',\n\t\t\t\t\tinside: \'inside\',\n\t\t\t\t\troot: Prism.languages.markup && Prism.languages.markup[\'tag\'].inside[\'attr-value\']\n\t\t\t\t},\n\t\t\t\t\'sass\': [\n\t\t\t\t\t{\n\t\t\t\t\t\tlang: \'sass\',\n\t\t\t\t\t\tbefore: \'punctuation\',\n\t\t\t\t\t\tinside: \'inside\',\n\t\t\t\t\t\troot: Prism.languages.sass && Prism.languages.sass[\'variable-line\']\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tlang: \'sass\',\n\t\t\t\t\t\tinside: \'inside\',\n\t\t\t\t\t\troot: Prism.languages.sass && Prism.languages.sass[\'property-line\']\n\t\t\t\t\t}\n\t\t\t\t],\n\t\t\t\t\'scss\': true,\n\t\t\t\t\'stylus\': [\n\t\t\t\t\t{\n\t\t\t\t\t\tlang: \'stylus\',\n\t\t\t\t\t\tbefore: \'hexcode\',\n\t\t\t\t\t\tinside: \'rest\',\n\t\t\t\t\t\troot: Prism.languages.stylus && Prism.languages.stylus[\'property-declaration\'].inside\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tlang: \'stylus\',\n\t\t\t\t\t\tbefore: \'hexcode\',\n\t\t\t\t\t\tinside: \'rest\',\n\t\t\t\t\t\troot: Prism.languages.stylus && Prism.languages.stylus[\'variable-declaration\'].inside\n\t\t\t\t\t}\n\t\t\t\t]\n\t\t\t}\n\t\t},\n\t\t\'easing\': {\n\t\t\tcreate: function () {\n\t\t\t\tnew Prism.plugins.Previewer(\'easing\', function (value) {\n\n\t\t\t\t\tvalue = {\n\t\t\t\t\t\t\'linear\': \'0,0,1,1\',\n\t\t\t\t\t\t\'ease\': \'.25,.1,.25,1\',\n\t\t\t\t\t\t\'ease-in\': \'.42,0,1,1\',\n\t\t\t\t\t\t\'ease-out\': \'0,0,.58,1\',\n\t\t\t\t\t\t\'ease-in-out\':\'.42,0,.58,1\'\n\t\t\t\t\t}[value] || value;\n\n\t\t\t\t\tvar p = value.match(/-?\\d*\\.?\\d+/g);\n\n\t\t\t\t\tif(p.length === 4) {\n\t\t\t\t\t\tp = p.map(function(p, i) { return (i % 2? 1 - p : p) * 100; });\n\n\t\t\t\t\t\tthis.querySelector(\'path\').setAttribute(\'d\', \'M0,100 C\' + p[0] + \',\' + p[1] + \', \' + p[2] + \',\' + p[3] + \', 100,0\');\n\n\t\t\t\t\t\tvar lines = this.querySelectorAll(\'line\');\n\t\t\t\t\t\tlines[0].setAttribute(\'x2\', p[0]);\n\t\t\t\t\t\tlines[0].setAttribute(\'y2\', p[1]);\n\t\t\t\t\t\tlines[1].setAttribute(\'x2\', p[2]);\n\t\t\t\t\t\tlines[1].setAttribute(\'y2\', p[3]);\n\n\t\t\t\t\t\treturn true;\n\t\t\t\t\t}\n\n\t\t\t\t\treturn false;\n\t\t\t\t}, \'*\', function () {\n\t\t\t\t\tthis._elt.innerHTML = \'<svg viewBox="-20 -20 140 140" width="100" height="100">\' +\n\t\t\t\t\t\t\'<defs>\' +\n\t\t\t\t\t\t\'<marker id="prism-previewer-easing-marker" viewBox="0 0 4 4" refX="2" refY="2" markerUnits="strokeWidth">\' +\n\t\t\t\t\t\t\'<circle cx="2" cy="2" r="1.5" />\' +\n\t\t\t\t\t\t\'</marker>\' +\n\t\t\t\t\t\t\'</defs>\' +\n\t\t\t\t\t\t\'<path d="M0,100 C20,50, 40,30, 100,0" />\' +\n\t\t\t\t\t\t\'<line x1="0" y1="100" x2="20" y2="50" marker-start="url(\' + location.href + \'#prism-previewer-easing-marker)" marker-end="url(\' + location.href + \'#prism-previewer-easing-marker)" />\' +\n\t\t\t\t\t\t\'<line x1="100" y1="0" x2="40" y2="30" marker-start="url(\' + location.href + \'#prism-previewer-easing-marker)" marker-end="url(\' + location.href + \'#prism-previewer-easing-marker)" />\' +\n\t\t\t\t\t\t\'</svg>\';\n\t\t\t\t});\n\t\t\t},\n\t\t\ttokens: {\n\t\t\t\t\'easing\': {\n\t\t\t\t\tpattern: /\\bcubic-bezier\\((?:-?\\d*\\.?\\d+,\\s*){3}-?\\d*\\.?\\d+\\)\\B|\\b(?:linear|ease(?:-in)?(?:-out)?)(?=\\s|[;}]|$)/i,\n\t\t\t\t\tinside: {\n\t\t\t\t\t\t\'function\': /[\\w-]+(?=\\()/,\n\t\t\t\t\t\t\'punctuation\': /[(),]/\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t},\n\t\t\tlanguages: {\n\t\t\t\t\'css\': true,\n\t\t\t\t\'less\': true,\n\t\t\t\t\'sass\': [\n\t\t\t\t\t{\n\t\t\t\t\t\tlang: \'sass\',\n\t\t\t\t\t\tinside: \'inside\',\n\t\t\t\t\t\tbefore: \'punctuation\',\n\t\t\t\t\t\troot: Prism.languages.sass && Prism.languages.sass[\'variable-line\']\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tlang: \'sass\',\n\t\t\t\t\t\tinside: \'inside\',\n\t\t\t\t\t\troot: Prism.languages.sass && Prism.languages.sass[\'property-line\']\n\t\t\t\t\t}\n\t\t\t\t],\n\t\t\t\t\'scss\': true,\n\t\t\t\t\'stylus\': [\n\t\t\t\t\t{\n\t\t\t\t\t\tlang: \'stylus\',\n\t\t\t\t\t\tbefore: \'hexcode\',\n\t\t\t\t\t\tinside: \'rest\',\n\t\t\t\t\t\troot: Prism.languages.stylus && Prism.languages.stylus[\'property-declaration\'].inside\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tlang: \'stylus\',\n\t\t\t\t\t\tbefore: \'hexcode\',\n\t\t\t\t\t\tinside: \'rest\',\n\t\t\t\t\t\troot: Prism.languages.stylus && Prism.languages.stylus[\'variable-declaration\'].inside\n\t\t\t\t\t}\n\t\t\t\t]\n\t\t\t}\n\t\t},\n\n\t\t\'time\': {\n\t\t\tcreate: function () {\n\t\t\t\tnew Prism.plugins.Previewer(\'time\', function(value) {\n\t\t\t\t\tvar num = parseFloat(value);\n\t\t\t\t\tvar unit = value.match(/[a-z]+$/i);\n\t\t\t\t\tif (!num || !unit) {\n\t\t\t\t\t\treturn false;\n\t\t\t\t\t}\n\t\t\t\t\tunit = unit[0];\n\t\t\t\t\tthis.querySelector(\'circle\').style.animationDuration = 2 * num + unit;\n\t\t\t\t\treturn true;\n\t\t\t\t}, \'*\', function () {\n\t\t\t\t\tthis._elt.innerHTML = \'<svg viewBox="0 0 64 64">\' +\n\t\t\t\t\t\t\'<circle r="16" cy="32" cx="32"></circle>\' +\n\t\t\t\t\t\t\'</svg>\';\n\t\t\t\t});\n\t\t\t},\n\t\t\ttokens: {\n\t\t\t\t\'time\': /(?:\\b|\\B-|(?=\\B\\.))\\d*\\.?\\d+m?s\\b/i\n\t\t\t},\n\t\t\tlanguages: {\n\t\t\t\t\'css\': true,\n\t\t\t\t\'less\': true,\n\t\t\t\t\'markup\': {\n\t\t\t\t\tlang: \'markup\',\n\t\t\t\t\tbefore: \'punctuation\',\n\t\t\t\t\tinside: \'inside\',\n\t\t\t\t\troot: Prism.languages.markup && Prism.languages.markup[\'tag\'].inside[\'attr-value\']\n\t\t\t\t},\n\t\t\t\t\'sass\': [\n\t\t\t\t\t{\n\t\t\t\t\t\tlang: \'sass\',\n\t\t\t\t\t\tinside: \'inside\',\n\t\t\t\t\t\troot: Prism.languages.sass && Prism.languages.sass[\'property-line\']\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tlang: \'sass\',\n\t\t\t\t\t\tbefore: \'operator\',\n\t\t\t\t\t\tinside: \'inside\',\n\t\t\t\t\t\troot: Prism.languages.sass && Prism.languages.sass[\'variable-line\']\n\t\t\t\t\t}\n\t\t\t\t],\n\t\t\t\t\'scss\': true,\n\t\t\t\t\'stylus\': [\n\t\t\t\t\t{\n\t\t\t\t\t\tlang: \'stylus\',\n\t\t\t\t\t\tbefore: \'hexcode\',\n\t\t\t\t\t\tinside: \'rest\',\n\t\t\t\t\t\troot: Prism.languages.stylus && Prism.languages.stylus[\'property-declaration\'].inside\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tlang: \'stylus\',\n\t\t\t\t\t\tbefore: \'hexcode\',\n\t\t\t\t\t\tinside: \'rest\',\n\t\t\t\t\t\troot: Prism.languages.stylus && Prism.languages.stylus[\'variable-declaration\'].inside\n\t\t\t\t\t}\n\t\t\t\t]\n\t\t\t}\n\t\t}\n\t};\n\n\t/**\n\t * Returns the absolute X, Y offsets for an element\n\t * @param {HTMLElement} element\n\t * @returns {{top: number, right: number, bottom: number, left: number}}\n\t */\n\tvar getOffset = function (element) {\n\t\tvar left = 0, top = 0, el = element;\n\n\t\tif (el.parentNode) {\n\t\t\tdo {\n\t\t\t\tleft += el.offsetLeft;\n\t\t\t\ttop += el.offsetTop;\n\t\t\t} while ((el = el.offsetParent) && el.nodeType < 9);\n\n\t\t\tel = element;\n\n\t\t\tdo {\n\t\t\t\tleft -= el.scrollLeft;\n\t\t\t\ttop -= el.scrollTop;\n\t\t\t} while ((el = el.parentNode) && !/body/i.test(el.nodeName));\n\t\t}\n\n\t\treturn {\n\t\t\ttop: top,\n\t\t\tright: innerWidth - left - element.offsetWidth,\n\t\t\tbottom: innerHeight - top - element.offsetHeight,\n\t\t\tleft: left\n\t\t};\n\t};\n\n\tvar tokenRegexp = /(?:^|\\s)token(?=$|\\s)/;\n\tvar activeRegexp = /(?:^|\\s)active(?=$|\\s)/g;\n\tvar flippedRegexp = /(?:^|\\s)flipped(?=$|\\s)/g;\n\n\t/**\n\t * Previewer constructor\n\t * @param {string} type Unique previewer type\n\t * @param {function} updater Function that will be called on mouseover.\n\t * @param {string[]|string=} supportedLanguages Aliases of the languages this previewer must be enabled for. Defaults to "*", all languages.\n\t * @param {function=} initializer Function that will be called on initialization.\n\t * @constructor\n\t */\n\tvar Previewer = function (type, updater, supportedLanguages, initializer) {\n\t\tthis._elt = null;\n\t\tthis._type = type;\n\t\tthis._clsRegexp = RegExp(\'(?:^|\\\\s)\' + type + \'(?=$|\\\\s)\');\n\t\tthis._token = null;\n\t\tthis.updater = updater;\n\t\tthis._mouseout = this.mouseout.bind(this);\n\t\tthis.initializer = initializer;\n\n\t\tvar self = this;\n\n\t\tif (!supportedLanguages) {\n\t\t\tsupportedLanguages = [\'*\'];\n\t\t}\n\t\tif (Prism.util.type(supportedLanguages) !== \'Array\') {\n\t\t\tsupportedLanguages = [supportedLanguages];\n\t\t}\n\t\tsupportedLanguages.forEach(function (lang) {\n\t\t\tif (typeof lang !== \'string\') {\n\t\t\t\tlang = lang.lang;\n\t\t\t}\n\t\t\tif (!Previewer.byLanguages[lang]) {\n\t\t\t\tPreviewer.byLanguages[lang] = [];\n\t\t\t}\n\t\t\tif (Previewer.byLanguages[lang].indexOf(self) < 0) {\n\t\t\t\tPreviewer.byLanguages[lang].push(self);\n\t\t\t}\n\t\t});\n\t\tPreviewer.byType[type] = this;\n\t};\n\n\t/**\n\t * Creates the HTML element for the previewer.\n\t */\n\tPreviewer.prototype.init = function () {\n\t\tif (this._elt) {\n\t\t\treturn;\n\t\t}\n\t\tthis._elt = document.createElement(\'div\');\n\t\tthis._elt.className = \'prism-previewer prism-previewer-\' + this._type;\n\t\tdocument.body.appendChild(this._elt);\n\t\tif(this.initializer) {\n\t\t\tthis.initializer();\n\t\t}\n\t};\n\n\tPreviewer.prototype.isDisabled = function (token) {\n\t\tdo {\n\t\t\tif (token.hasAttribute && token.hasAttribute(\'data-previewers\')) {\n\t\t\t\tvar previewers = token.getAttribute(\'data-previewers\');\n\t\t\t\treturn (previewers || \'\').split(/\\s+/).indexOf(this._type) === -1;\n\t\t\t}\n\t\t} while(token = token.parentNode);\n\t\treturn false;\n\t};\n\n\t/**\n\t * Checks the class name of each hovered element\n\t * @param token\n\t */\n\tPreviewer.prototype.check = function (token) {\n\t\tif (tokenRegexp.test(token.className) && this.isDisabled(token)) {\n\t\t\treturn;\n\t\t}\n\t\tdo {\n\t\t\tif (tokenRegexp.test(token.className) && this._clsRegexp.test(token.className)) {\n\t\t\t\tbreak;\n\t\t\t}\n\t\t} while(token = token.parentNode);\n\n\t\tif (token && token !== this._token) {\n\t\t\tthis._token = token;\n\t\t\tthis.show();\n\t\t}\n\t};\n\n\t/**\n\t * Called on mouseout\n\t */\n\tPreviewer.prototype.mouseout = function() {\n\t\tthis._token.removeEventListener(\'mouseout\', this._mouseout, false);\n\t\tthis._token = null;\n\t\tthis.hide();\n\t};\n\n\t/**\n\t * Shows the previewer positioned properly for the current token.\n\t */\n\tPreviewer.prototype.show = function () {\n\t\tif (!this._elt) {\n\t\t\tthis.init();\n\t\t}\n\t\tif (!this._token) {\n\t\t\treturn;\n\t\t}\n\n\t\tif (this.updater.call(this._elt, this._token.textContent)) {\n\t\t\tthis._token.addEventListener(\'mouseout\', this._mouseout, false);\n\n\t\t\tvar offset = getOffset(this._token);\n\t\t\tthis._elt.className += \' active\';\n\n\t\t\tif (offset.top - this._elt.offsetHeight > 0) {\n\t\t\t\tthis._elt.className = this._elt.className.replace(flippedRegexp, \'\');\n\t\t\t\tthis._elt.style.top = offset.top + \'px\';\n\t\t\t\tthis._elt.style.bottom = \'\';\n\t\t\t} else {\n\t\t\t\tthis._elt.className +=  \' flipped\';\n\t\t\t\tthis._elt.style.bottom = offset.bottom + \'px\';\n\t\t\t\tthis._elt.style.top = \'\';\n\t\t\t}\n\n\t\t\tthis._elt.style.left = offset.left + Math.min(200, this._token.offsetWidth / 2) + \'px\';\n\t\t} else {\n\t\t\tthis.hide();\n\t\t}\n\t};\n\n\t/**\n\t * Hides the previewer.\n\t */\n\tPreviewer.prototype.hide = function () {\n\t\tthis._elt.className = this._elt.className.replace(activeRegexp, \'\');\n\t};\n\n\t/**\n\t * Map of all registered previewers by language\n\t * @type {{}}\n\t */\n\tPreviewer.byLanguages = {};\n\n\t/**\n\t * Map of all registered previewers by type\n\t * @type {{}}\n\t */\n\tPreviewer.byType = {};\n\n\t/**\n\t * Initializes the mouseover event on the code block.\n\t * @param {HTMLElement} elt The code block (env.element)\n\t * @param {string} lang The language (env.language)\n\t */\n\tPreviewer.initEvents = function (elt, lang) {\n\t\tvar previewers = [];\n\t\tif (Previewer.byLanguages[lang]) {\n\t\t\tpreviewers = previewers.concat(Previewer.byLanguages[lang]);\n\t\t}\n\t\tif (Previewer.byLanguages[\'*\']) {\n\t\t\tpreviewers = previewers.concat(Previewer.byLanguages[\'*\']);\n\t\t}\n\t\telt.addEventListener(\'mouseover\', function (e) {\n\t\t\tvar target = e.target;\n\t\t\tpreviewers.forEach(function (previewer) {\n\t\t\t\tpreviewer.check(target);\n\t\t\t});\n\t\t}, false);\n\t};\n\tPrism.plugins.Previewer = Previewer;\n\n\tPrism.hooks.add(\'before-highlight\', function (env) {\n\t\tfor (var previewer in previewers) {\n\t\t\tvar languages = previewers[previewer].languages;\n\t\t\tif (env.language && languages[env.language] && !languages[env.language].initialized) {\n\t\t\t\tvar lang = languages[env.language];\n\t\t\t\tif (Prism.util.type(lang) !== \'Array\') {\n\t\t\t\t\tlang = [lang];\n\t\t\t\t}\n\t\t\t\tlang.forEach(function (lang) {\n\t\t\t\t\tvar before, inside, root, skip;\n\t\t\t\t\tif (lang === true) {\n\t\t\t\t\t\tbefore = \'important\';\n\t\t\t\t\t\tinside = env.language;\n\t\t\t\t\t\tlang = env.language;\n\t\t\t\t\t} else {\n\t\t\t\t\t\tbefore = lang.before || \'important\';\n\t\t\t\t\t\tinside = lang.inside || lang.lang;\n\t\t\t\t\t\troot = lang.root || Prism.languages;\n\t\t\t\t\t\tskip = lang.skip;\n\t\t\t\t\t\tlang = env.language;\n\t\t\t\t\t}\n\n\t\t\t\t\tif (!skip && Prism.languages[lang]) {\n\t\t\t\t\t\tPrism.languages.insertBefore(inside, before, previewers[previewer].tokens, root);\n\t\t\t\t\t\tenv.grammar = Prism.languages[lang];\n\n\t\t\t\t\t\tlanguages[env.language] = {initialized: true};\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t}\n\t\t}\n\t});\n\n\t// Initialize the previewers only when needed\n\tPrism.hooks.add(\'after-highlight\', function (env) {\n\t\tif(Previewer.byLanguages[\'*\'] || Previewer.byLanguages[env.language]) {\n\t\t\tPreviewer.initEvents(env.element, env.language);\n\t\t}\n\t});\n\n\tfor (var previewer in previewers) {\n\t\tpreviewers[previewer].create();\n\t}\n\n}());';
    loader.global.define = undefined;
    loader.global.module = undefined;
    loader.global.exports = undefined;
    loader.__exec({
        'source': source,
        'address': module.uri
    });
    loader.global.require = require;
    loader.global.define = define;
    return loader.get('@@global-helpers').retrieveGlobal(module.id, undefined);
});
/*prismjs@1.15.0#plugins/command-line/prism-command-line*/
define('prismjs@1.15.0#plugins/command-line/prism-command-line', [
    'module',
    '@loader',
    'require'
], function (module, loader, require) {
    loader.get('@@global-helpers').prepareGlobal({
        require: require,
        name: module.id,
        deps: []
    });
    var define = loader.global.define;
    var require = loader.global.require;
    var source = '(function() {\n\nif (typeof self === \'undefined\' || !self.Prism || !self.document) {\n\treturn;\n}\n\nvar clsReg = /\\s*\\bcommand-line\\b\\s*/;\n\nPrism.hooks.add(\'before-highlight\', function (env) {\n\tenv.vars = env.vars || {};\n\tenv.vars[\'command-line\'] = env.vars[\'command-line\'] || {};\n\n\tif (env.vars[\'command-line\'].complete || !env.code) {\n\t\tenv.vars[\'command-line\'].complete = true;\n\t\treturn;\n\t}\n\n\t// Works only for <code> wrapped inside <pre> (not inline).\n\tvar pre = env.element.parentNode;\n\tif (!pre || !/pre/i.test(pre.nodeName) || // Abort only if neither the <pre> nor the <code> have the class\n\t\t(!clsReg.test(pre.className) && !clsReg.test(env.element.className))) {\n\t\tenv.vars[\'command-line\'].complete = true;\n\t\treturn;\n\t}\n\n\tif (env.element.querySelector(\'.command-line-prompt\')) { // Abort if prompt already exists.\n\t\tenv.vars[\'command-line\'].complete = true;\n\t\treturn;\n\t}\n\n\tvar codeLines = env.code.split(\'\\n\');\n\tenv.vars[\'command-line\'].numberOfLines = codeLines.length;\n\tenv.vars[\'command-line\'].outputLines = [];\n\n\tvar outputSections = pre.getAttribute(\'data-output\');\n\tvar outputFilter = pre.getAttribute(\'data-filter-output\');\n\tif (outputSections || outputSections === \'\') { // The user specified the output lines. -- cwells\n\t\toutputSections = outputSections.split(\',\');\n\t\tfor (var i = 0; i < outputSections.length; i++) { // Parse the output sections into start/end ranges. -- cwells\n\t\t\tvar range = outputSections[i].split(\'-\');\n\t\t\tvar outputStart = parseInt(range[0], 10);\n\t\t\tvar outputEnd = (range.length === 2 ? parseInt(range[1], 10) : outputStart);\n\n\t\t\tif (!isNaN(outputStart) && !isNaN(outputEnd)) {\n\t\t\t\tif (outputStart < 1) {\n\t\t\t\t\toutputStart = 1;\n\t\t\t\t}\n\t\t\t\tif (outputEnd > codeLines.length) {\n\t\t\t\t\toutputEnd = codeLines.length;\n\t\t\t\t}\n\t\t\t\t// Convert start and end to 0-based to simplify the arrays. -- cwells\n\t\t\t\toutputStart--;\n\t\t\t\toutputEnd--;\n\t\t\t\t// Save the output line in an array and clear it in the code so it\'s not highlighted. -- cwells\n\t\t\t\tfor (var j = outputStart; j <= outputEnd; j++) {\n\t\t\t\t\tenv.vars[\'command-line\'].outputLines[j] = codeLines[j];\n\t\t\t\t\tcodeLines[j] = \'\';\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t} else if (outputFilter) { // Treat lines beginning with this string as output. -- cwells\n\t\tfor (var i = 0; i < codeLines.length; i++) {\n\t\t\tif (codeLines[i].indexOf(outputFilter) === 0) { // This line is output. -- cwells\n\t\t\t\tenv.vars[\'command-line\'].outputLines[i] = codeLines[i].slice(outputFilter.length);\n\t\t\t\tcodeLines[i] = \'\';\n\t\t\t}\n\t\t}\n\t}\n\n\tenv.code = codeLines.join(\'\\n\');\n});\n\nPrism.hooks.add(\'before-insert\', function (env) {\n\tenv.vars = env.vars || {};\n\tenv.vars[\'command-line\'] = env.vars[\'command-line\'] || {};\n\tif (env.vars[\'command-line\'].complete) {\n\t\treturn;\n\t}\n\n\t// Reinsert the output lines into the highlighted code. -- cwells\n\tvar codeLines = env.highlightedCode.split(\'\\n\');\n\tfor (var i = 0; i < env.vars[\'command-line\'].outputLines.length; i++) {\n\t\tif (env.vars[\'command-line\'].outputLines.hasOwnProperty(i)) {\n\t\t\tcodeLines[i] = env.vars[\'command-line\'].outputLines[i];\n\t\t}\n\t}\n\tenv.highlightedCode = codeLines.join(\'\\n\');\n});\n\nPrism.hooks.add(\'complete\', function (env) {\n\tenv.vars = env.vars || {};\n\tenv.vars[\'command-line\'] = env.vars[\'command-line\'] || {};\n\tif (env.vars[\'command-line\'].complete) {\n\t\treturn;\n\t}\n\n\tvar pre = env.element.parentNode;\n\tif (clsReg.test(env.element.className)) { // Remove the class "command-line" from the <code>\n\t\tenv.element.className = env.element.className.replace(clsReg, \' \');\n\t}\n\tif (!clsReg.test(pre.className)) { // Add the class "command-line" to the <pre>\n\t\tpre.className += \' command-line\';\n\t}\n\n\tvar getAttribute = function(key, defaultValue) {\n\t\treturn (pre.getAttribute(key) || defaultValue).replace(/"/g, \'&quot\');\n\t};\n\n\t// Create the "rows" that will become the command-line prompts. -- cwells\n\tvar promptLines = new Array(env.vars[\'command-line\'].numberOfLines + 1);\n\tvar promptText = getAttribute(\'data-prompt\', \'\');\n\tif (promptText !== \'\') {\n\t\tpromptLines = promptLines.join(\'<span data-prompt="\' + promptText + \'"></span>\');\n\t} else {\n\t\tvar user = getAttribute(\'data-user\', \'user\');\n\t\tvar host = getAttribute(\'data-host\', \'localhost\');\n\t\tpromptLines = promptLines.join(\'<span data-user="\' + user + \'" data-host="\' + host + \'"></span>\');\n\t}\n\n\t// Create the wrapper element. -- cwells\n\tvar prompt = document.createElement(\'span\');\n\tprompt.className = \'command-line-prompt\';\n\tprompt.innerHTML = promptLines;\n\n\t// Remove the prompt from the output lines. -- cwells\n\tfor (var i = 0; i < env.vars[\'command-line\'].outputLines.length; i++) {\n\t\tif (env.vars[\'command-line\'].outputLines.hasOwnProperty(i)) {\n\t\t\tvar node = prompt.children[i];\n\t\t\tnode.removeAttribute(\'data-user\');\n\t\t\tnode.removeAttribute(\'data-host\');\n\t\t\tnode.removeAttribute(\'data-prompt\');\n\t\t}\n\t}\n\n\tenv.element.insertBefore(prompt, env.element.firstChild);\n\tenv.vars[\'command-line\'].complete = true;\n});\n\n}());\n';
    loader.global.define = undefined;
    loader.global.module = undefined;
    loader.global.exports = undefined;
    loader.__exec({
        'source': source,
        'address': module.uri
    });
    loader.global.require = require;
    loader.global.define = define;
    return loader.get('@@global-helpers').retrieveGlobal(module.id, undefined);
});
/*prismjs@1.15.0#plugins/toolbar/prism-toolbar*/
define('prismjs@1.15.0#plugins/toolbar/prism-toolbar', [
    'module',
    '@loader',
    'require'
], function (module, loader, require) {
    loader.get('@@global-helpers').prepareGlobal({
        require: require,
        name: module.id,
        deps: []
    });
    var define = loader.global.define;
    var require = loader.global.require;
    var source = '(function(){\n\tif (typeof self === \'undefined\' || !self.Prism || !self.document) {\n\t\treturn;\n\t}\n\n\tvar callbacks = [];\n\tvar map = {};\n\tvar noop = function() {};\n\n\tPrism.plugins.toolbar = {};\n\n\t/**\n\t * Register a button callback with the toolbar.\n\t *\n\t * @param {string} key\n\t * @param {Object|Function} opts\n\t */\n\tvar registerButton = Prism.plugins.toolbar.registerButton = function (key, opts) {\n\t\tvar callback;\n\n\t\tif (typeof opts === \'function\') {\n\t\t\tcallback = opts;\n\t\t} else {\n\t\t\tcallback = function (env) {\n\t\t\t\tvar element;\n\n\t\t\t\tif (typeof opts.onClick === \'function\') {\n\t\t\t\t\telement = document.createElement(\'button\');\n\t\t\t\t\telement.type = \'button\';\n\t\t\t\t\telement.addEventListener(\'click\', function () {\n\t\t\t\t\t\topts.onClick.call(this, env);\n\t\t\t\t\t});\n\t\t\t\t} else if (typeof opts.url === \'string\') {\n\t\t\t\t\telement = document.createElement(\'a\');\n\t\t\t\t\telement.href = opts.url;\n\t\t\t\t} else {\n\t\t\t\t\telement = document.createElement(\'span\');\n\t\t\t\t}\n\n\t\t\t\telement.textContent = opts.text;\n\n\t\t\t\treturn element;\n\t\t\t};\n\t\t}\n\n\t\tcallbacks.push(map[key] = callback);\n\t};\n\n\t/**\n\t * Post-highlight Prism hook callback.\n\t *\n\t * @param env\n\t */\n\tvar hook = Prism.plugins.toolbar.hook = function (env) {\n\t\t// Check if inline or actual code block (credit to line-numbers plugin)\n\t\tvar pre = env.element.parentNode;\n\t\tif (!pre || !/pre/i.test(pre.nodeName)) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Autoloader rehighlights, so only do this once.\n\t\tif (pre.parentNode.classList.contains(\'code-toolbar\')) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Create wrapper for <pre> to prevent scrolling toolbar with content\n\t\tvar wrapper = document.createElement("div");\n\t\twrapper.classList.add("code-toolbar");\n\t\tpre.parentNode.insertBefore(wrapper, pre);\n\t\twrapper.appendChild(pre);\n\n\t\t// Setup the toolbar\n\t\tvar toolbar = document.createElement(\'div\');\n\t\ttoolbar.classList.add(\'toolbar\');\n\n\t\tif (document.body.hasAttribute(\'data-toolbar-order\')) {\n\t\t\tcallbacks = document.body.getAttribute(\'data-toolbar-order\').split(\',\').map(function(key) {\n\t\t\t\treturn map[key] || noop;\n\t\t\t});\n\t\t}\n\n\t\tcallbacks.forEach(function(callback) {\n\t\t\tvar element = callback(env);\n\n\t\t\tif (!element) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tvar item = document.createElement(\'div\');\n\t\t\titem.classList.add(\'toolbar-item\');\n\n\t\t\titem.appendChild(element);\n\t\t\ttoolbar.appendChild(item);\n\t\t});\n\n\t\t// Add our toolbar to the currently created wrapper of <pre> tag\n\t\twrapper.appendChild(toolbar);\n\t};\n\n\tregisterButton(\'label\', function(env) {\n\t\tvar pre = env.element.parentNode;\n\t\tif (!pre || !/pre/i.test(pre.nodeName)) {\n\t\t\treturn;\n\t\t}\n\n\t\tif (!pre.hasAttribute(\'data-label\')) {\n\t\t\treturn;\n\t\t}\n\n\t\tvar element, template;\n\t\tvar text = pre.getAttribute(\'data-label\');\n\t\ttry {\n\t\t\t// Any normal text will blow up this selector.\n\t\t\ttemplate = document.querySelector(\'template#\' + text);\n\t\t} catch (e) {}\n\n\t\tif (template) {\n\t\t\telement = template.content;\n\t\t} else {\n\t\t\tif (pre.hasAttribute(\'data-url\')) {\n\t\t\t\telement = document.createElement(\'a\');\n\t\t\t\telement.href = pre.getAttribute(\'data-url\');\n\t\t\t} else {\n\t\t\t\telement = document.createElement(\'span\');\n\t\t\t}\n\n\t\t\telement.textContent = text;\n\t\t}\n\n\t\treturn element;\n\t});\n\n\t/**\n\t * Register the toolbar with Prism.\n\t */\n\tPrism.hooks.add(\'complete\', hook);\n})();\n';
    loader.global.define = undefined;
    loader.global.module = undefined;
    loader.global.exports = undefined;
    loader.__exec({
        'source': source,
        'address': module.uri
    });
    loader.global.require = require;
    loader.global.define = define;
    return loader.get('@@global-helpers').retrieveGlobal(module.id, undefined);
});
/*clipboard@2.0.4#dist/clipboard*/
(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define('clipboard@2.0.4#dist/clipboard', [], factory);
    else if (typeof exports === 'object')
        exports['ClipboardJS'] = factory();
    else
        root['ClipboardJS'] = factory();
}(this, function () {
    return function (modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
                return installedModules[moduleId].exports;
            }
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: false,
                exports: {}
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.l = true;
            return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.d = function (exports, name, getter) {
            if (!__webpack_require__.o(exports, name)) {
                Object.defineProperty(exports, name, {
                    enumerable: true,
                    get: getter
                });
            }
        };
        __webpack_require__.r = function (exports) {
            if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            }
            Object.defineProperty(exports, '__esModule', { value: true });
        };
        __webpack_require__.t = function (value, mode) {
            if (mode & 1)
                value = __webpack_require__(value);
            if (mode & 8)
                return value;
            if (mode & 4 && typeof value === 'object' && value && value.__esModule)
                return value;
            var ns = Object.create(null);
            __webpack_require__.r(ns);
            Object.defineProperty(ns, 'default', {
                enumerable: true,
                value: value
            });
            if (mode & 2 && typeof value != 'string')
                for (var key in value)
                    __webpack_require__.d(ns, key, function (key) {
                        return value[key];
                    }.bind(null, key));
            return ns;
        };
        __webpack_require__.n = function (module) {
            var getter = module && module.__esModule ? function getDefault() {
                return module['default'];
            } : function getModuleExports() {
                return module;
            };
            __webpack_require__.d(getter, 'a', getter);
            return getter;
        };
        __webpack_require__.o = function (object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = '';
        return __webpack_require__(__webpack_require__.s = 0);
    }([
        function (module, exports, __webpack_require__) {
            'use strict';
            var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
            };
            var _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ('value' in descriptor)
                            descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function (Constructor, protoProps, staticProps) {
                    if (protoProps)
                        defineProperties(Constructor.prototype, protoProps);
                    if (staticProps)
                        defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();
            var _clipboardAction = __webpack_require__(1);
            var _clipboardAction2 = _interopRequireDefault(_clipboardAction);
            var _tinyEmitter = __webpack_require__(3);
            var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);
            var _goodListener = __webpack_require__(4);
            var _goodListener2 = _interopRequireDefault(_goodListener);
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError('Cannot call a class as a function');
                }
            }
            function _possibleConstructorReturn(self, call) {
                if (!self) {
                    throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
                }
                return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
            }
            function _inherits(subClass, superClass) {
                if (typeof superClass !== 'function' && superClass !== null) {
                    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass)
                    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }
            var Clipboard = function (_Emitter) {
                _inherits(Clipboard, _Emitter);
                function Clipboard(trigger, options) {
                    _classCallCheck(this, Clipboard);
                    var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this));
                    _this.resolveOptions(options);
                    _this.listenClick(trigger);
                    return _this;
                }
                _createClass(Clipboard, [
                    {
                        key: 'resolveOptions',
                        value: function resolveOptions() {
                            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                            this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
                            this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
                            this.text = typeof options.text === 'function' ? options.text : this.defaultText;
                            this.container = _typeof(options.container) === 'object' ? options.container : document.body;
                        }
                    },
                    {
                        key: 'listenClick',
                        value: function listenClick(trigger) {
                            var _this2 = this;
                            this.listener = (0, _goodListener2.default)(trigger, 'click', function (e) {
                                return _this2.onClick(e);
                            });
                        }
                    },
                    {
                        key: 'onClick',
                        value: function onClick(e) {
                            var trigger = e.delegateTarget || e.currentTarget;
                            if (this.clipboardAction) {
                                this.clipboardAction = null;
                            }
                            this.clipboardAction = new _clipboardAction2.default({
                                action: this.action(trigger),
                                target: this.target(trigger),
                                text: this.text(trigger),
                                container: this.container,
                                trigger: trigger,
                                emitter: this
                            });
                        }
                    },
                    {
                        key: 'defaultAction',
                        value: function defaultAction(trigger) {
                            return getAttributeValue('action', trigger);
                        }
                    },
                    {
                        key: 'defaultTarget',
                        value: function defaultTarget(trigger) {
                            var selector = getAttributeValue('target', trigger);
                            if (selector) {
                                return document.querySelector(selector);
                            }
                        }
                    },
                    {
                        key: 'defaultText',
                        value: function defaultText(trigger) {
                            return getAttributeValue('text', trigger);
                        }
                    },
                    {
                        key: 'destroy',
                        value: function destroy() {
                            this.listener.destroy();
                            if (this.clipboardAction) {
                                this.clipboardAction.destroy();
                                this.clipboardAction = null;
                            }
                        }
                    }
                ], [{
                        key: 'isSupported',
                        value: function isSupported() {
                            var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [
                                'copy',
                                'cut'
                            ];
                            var actions = typeof action === 'string' ? [action] : action;
                            var support = !!document.queryCommandSupported;
                            actions.forEach(function (action) {
                                support = support && !!document.queryCommandSupported(action);
                            });
                            return support;
                        }
                    }]);
                return Clipboard;
            }(_tinyEmitter2.default);
            function getAttributeValue(suffix, element) {
                var attribute = 'data-clipboard-' + suffix;
                if (!element.hasAttribute(attribute)) {
                    return;
                }
                return element.getAttribute(attribute);
            }
            module.exports = Clipboard;
        },
        function (module, exports, __webpack_require__) {
            'use strict';
            var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
            };
            var _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ('value' in descriptor)
                            descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function (Constructor, protoProps, staticProps) {
                    if (protoProps)
                        defineProperties(Constructor.prototype, protoProps);
                    if (staticProps)
                        defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();
            var _select = __webpack_require__(2);
            var _select2 = _interopRequireDefault(_select);
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError('Cannot call a class as a function');
                }
            }
            var ClipboardAction = function () {
                function ClipboardAction(options) {
                    _classCallCheck(this, ClipboardAction);
                    this.resolveOptions(options);
                    this.initSelection();
                }
                _createClass(ClipboardAction, [
                    {
                        key: 'resolveOptions',
                        value: function resolveOptions() {
                            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                            this.action = options.action;
                            this.container = options.container;
                            this.emitter = options.emitter;
                            this.target = options.target;
                            this.text = options.text;
                            this.trigger = options.trigger;
                            this.selectedText = '';
                        }
                    },
                    {
                        key: 'initSelection',
                        value: function initSelection() {
                            if (this.text) {
                                this.selectFake();
                            } else if (this.target) {
                                this.selectTarget();
                            }
                        }
                    },
                    {
                        key: 'selectFake',
                        value: function selectFake() {
                            var _this = this;
                            var isRTL = document.documentElement.getAttribute('dir') == 'rtl';
                            this.removeFake();
                            this.fakeHandlerCallback = function () {
                                return _this.removeFake();
                            };
                            this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || true;
                            this.fakeElem = document.createElement('textarea');
                            this.fakeElem.style.fontSize = '12pt';
                            this.fakeElem.style.border = '0';
                            this.fakeElem.style.padding = '0';
                            this.fakeElem.style.margin = '0';
                            this.fakeElem.style.position = 'absolute';
                            this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
                            var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                            this.fakeElem.style.top = yPosition + 'px';
                            this.fakeElem.setAttribute('readonly', '');
                            this.fakeElem.value = this.text;
                            this.container.appendChild(this.fakeElem);
                            this.selectedText = (0, _select2.default)(this.fakeElem);
                            this.copyText();
                        }
                    },
                    {
                        key: 'removeFake',
                        value: function removeFake() {
                            if (this.fakeHandler) {
                                this.container.removeEventListener('click', this.fakeHandlerCallback);
                                this.fakeHandler = null;
                                this.fakeHandlerCallback = null;
                            }
                            if (this.fakeElem) {
                                this.container.removeChild(this.fakeElem);
                                this.fakeElem = null;
                            }
                        }
                    },
                    {
                        key: 'selectTarget',
                        value: function selectTarget() {
                            this.selectedText = (0, _select2.default)(this.target);
                            this.copyText();
                        }
                    },
                    {
                        key: 'copyText',
                        value: function copyText() {
                            var succeeded = void 0;
                            try {
                                succeeded = document.execCommand(this.action);
                            } catch (err) {
                                succeeded = false;
                            }
                            this.handleResult(succeeded);
                        }
                    },
                    {
                        key: 'handleResult',
                        value: function handleResult(succeeded) {
                            this.emitter.emit(succeeded ? 'success' : 'error', {
                                action: this.action,
                                text: this.selectedText,
                                trigger: this.trigger,
                                clearSelection: this.clearSelection.bind(this)
                            });
                        }
                    },
                    {
                        key: 'clearSelection',
                        value: function clearSelection() {
                            if (this.trigger) {
                                this.trigger.focus();
                            }
                            window.getSelection().removeAllRanges();
                        }
                    },
                    {
                        key: 'destroy',
                        value: function destroy() {
                            this.removeFake();
                        }
                    },
                    {
                        key: 'action',
                        set: function set() {
                            var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';
                            this._action = action;
                            if (this._action !== 'copy' && this._action !== 'cut') {
                                throw new Error('Invalid "action" value, use either "copy" or "cut"');
                            }
                        },
                        get: function get() {
                            return this._action;
                        }
                    },
                    {
                        key: 'target',
                        set: function set(target) {
                            if (target !== undefined) {
                                if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
                                    if (this.action === 'copy' && target.hasAttribute('disabled')) {
                                        throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                    }
                                    if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                                        throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                                    }
                                    this._target = target;
                                } else {
                                    throw new Error('Invalid "target" value, use a valid Element');
                                }
                            }
                        },
                        get: function get() {
                            return this._target;
                        }
                    }
                ]);
                return ClipboardAction;
            }();
            module.exports = ClipboardAction;
        },
        function (module, exports) {
            function select(element) {
                var selectedText;
                if (element.nodeName === 'SELECT') {
                    element.focus();
                    selectedText = element.value;
                } else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
                    var isReadOnly = element.hasAttribute('readonly');
                    if (!isReadOnly) {
                        element.setAttribute('readonly', '');
                    }
                    element.select();
                    element.setSelectionRange(0, element.value.length);
                    if (!isReadOnly) {
                        element.removeAttribute('readonly');
                    }
                    selectedText = element.value;
                } else {
                    if (element.hasAttribute('contenteditable')) {
                        element.focus();
                    }
                    var selection = window.getSelection();
                    var range = document.createRange();
                    range.selectNodeContents(element);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    selectedText = selection.toString();
                }
                return selectedText;
            }
            module.exports = select;
        },
        function (module, exports) {
            function E() {
            }
            E.prototype = {
                on: function (name, callback, ctx) {
                    var e = this.e || (this.e = {});
                    (e[name] || (e[name] = [])).push({
                        fn: callback,
                        ctx: ctx
                    });
                    return this;
                },
                once: function (name, callback, ctx) {
                    var self = this;
                    function listener() {
                        self.off(name, listener);
                        callback.apply(ctx, arguments);
                    }
                    ;
                    listener._ = callback;
                    return this.on(name, listener, ctx);
                },
                emit: function (name) {
                    var data = [].slice.call(arguments, 1);
                    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
                    var i = 0;
                    var len = evtArr.length;
                    for (i; i < len; i++) {
                        evtArr[i].fn.apply(evtArr[i].ctx, data);
                    }
                    return this;
                },
                off: function (name, callback) {
                    var e = this.e || (this.e = {});
                    var evts = e[name];
                    var liveEvents = [];
                    if (evts && callback) {
                        for (var i = 0, len = evts.length; i < len; i++) {
                            if (evts[i].fn !== callback && evts[i].fn._ !== callback)
                                liveEvents.push(evts[i]);
                        }
                    }
                    liveEvents.length ? e[name] = liveEvents : delete e[name];
                    return this;
                }
            };
            module.exports = E;
        },
        function (module, exports, __webpack_require__) {
            var is = __webpack_require__(5);
            var delegate = __webpack_require__(6);
            function listen(target, type, callback) {
                if (!target && !type && !callback) {
                    throw new Error('Missing required arguments');
                }
                if (!is.string(type)) {
                    throw new TypeError('Second argument must be a String');
                }
                if (!is.fn(callback)) {
                    throw new TypeError('Third argument must be a Function');
                }
                if (is.node(target)) {
                    return listenNode(target, type, callback);
                } else if (is.nodeList(target)) {
                    return listenNodeList(target, type, callback);
                } else if (is.string(target)) {
                    return listenSelector(target, type, callback);
                } else {
                    throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
                }
            }
            function listenNode(node, type, callback) {
                node.addEventListener(type, callback);
                return {
                    destroy: function () {
                        node.removeEventListener(type, callback);
                    }
                };
            }
            function listenNodeList(nodeList, type, callback) {
                Array.prototype.forEach.call(nodeList, function (node) {
                    node.addEventListener(type, callback);
                });
                return {
                    destroy: function () {
                        Array.prototype.forEach.call(nodeList, function (node) {
                            node.removeEventListener(type, callback);
                        });
                    }
                };
            }
            function listenSelector(selector, type, callback) {
                return delegate(document.body, selector, type, callback);
            }
            module.exports = listen;
        },
        function (module, exports) {
            exports.node = function (value) {
                return value !== undefined && value instanceof HTMLElement && value.nodeType === 1;
            };
            exports.nodeList = function (value) {
                var type = Object.prototype.toString.call(value);
                return value !== undefined && (type === '[object NodeList]' || type === '[object HTMLCollection]') && 'length' in value && (value.length === 0 || exports.node(value[0]));
            };
            exports.string = function (value) {
                return typeof value === 'string' || value instanceof String;
            };
            exports.fn = function (value) {
                var type = Object.prototype.toString.call(value);
                return type === '[object Function]';
            };
        },
        function (module, exports, __webpack_require__) {
            var closest = __webpack_require__(7);
            function _delegate(element, selector, type, callback, useCapture) {
                var listenerFn = listener.apply(this, arguments);
                element.addEventListener(type, listenerFn, useCapture);
                return {
                    destroy: function () {
                        element.removeEventListener(type, listenerFn, useCapture);
                    }
                };
            }
            function delegate(elements, selector, type, callback, useCapture) {
                if (typeof elements.addEventListener === 'function') {
                    return _delegate.apply(null, arguments);
                }
                if (typeof type === 'function') {
                    return _delegate.bind(null, document).apply(null, arguments);
                }
                if (typeof elements === 'string') {
                    elements = document.querySelectorAll(elements);
                }
                return Array.prototype.map.call(elements, function (element) {
                    return _delegate(element, selector, type, callback, useCapture);
                });
            }
            function listener(element, selector, type, callback) {
                return function (e) {
                    e.delegateTarget = closest(e.target, selector);
                    if (e.delegateTarget) {
                        callback.call(element, e);
                    }
                };
            }
            module.exports = delegate;
        },
        function (module, exports) {
            var DOCUMENT_NODE_TYPE = 9;
            if (typeof Element !== 'undefined' && !Element.prototype.matches) {
                var proto = Element.prototype;
                proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
            }
            function closest(element, selector) {
                while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
                    if (typeof element.matches === 'function' && element.matches(selector)) {
                        return element;
                    }
                    element = element.parentNode;
                }
            }
            module.exports = closest;
        }
    ]);
}));
/*prismjs@1.15.0#plugins/copy-to-clipboard/prism-copy-to-clipboard*/
define('prismjs@1.15.0#plugins/copy-to-clipboard/prism-copy-to-clipboard', [
    'require',
    'exports',
    'module',
    'clipboard'
], function (require, exports, module) {
    (function () {
        if (typeof self === 'undefined' || !self.Prism || !self.document) {
            return;
        }
        if (!Prism.plugins.toolbar) {
            console.warn('Copy to Clipboard plugin loaded before Toolbar plugin.');
            return;
        }
        var ClipboardJS = window.ClipboardJS || undefined;
        if (!ClipboardJS && typeof require === 'function') {
            ClipboardJS = require('clipboard');
        }
        var callbacks = [];
        if (!ClipboardJS) {
            var script = document.createElement('script');
            var head = document.querySelector('head');
            script.onload = function () {
                ClipboardJS = window.ClipboardJS;
                if (ClipboardJS) {
                    while (callbacks.length) {
                        callbacks.pop()();
                    }
                }
            };
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js';
            head.appendChild(script);
        }
        Prism.plugins.toolbar.registerButton('copy-to-clipboard', function (env) {
            var linkCopy = document.createElement('a');
            linkCopy.textContent = 'Copy';
            if (!ClipboardJS) {
                callbacks.push(registerClipboard);
            } else {
                registerClipboard();
            }
            return linkCopy;
            function registerClipboard() {
                var clip = new ClipboardJS(linkCopy, {
                    'text': function () {
                        return env.code;
                    }
                });
                clip.on('success', function () {
                    linkCopy.textContent = 'Copied!';
                    resetText();
                });
                clip.on('error', function () {
                    linkCopy.textContent = 'Press Ctrl+C to copy';
                    resetText();
                });
            }
            function resetText() {
                setTimeout(function () {
                    linkCopy.textContent = 'Copy';
                }, 5000);
            }
        });
    }());
});
/*prismjs@1.15.0#components/prism-typescript*/
define('prismjs@1.15.0#components/prism-typescript', [
    'module',
    '@loader',
    'require'
], function (module, loader, require) {
    loader.get('@@global-helpers').prepareGlobal({
        require: require,
        name: module.id,
        deps: []
    });
    var define = loader.global.define;
    var require = loader.global.require;
    var source = 'Prism.languages.typescript = Prism.languages.extend(\'javascript\', {\n\t// From JavaScript Prism keyword list and TypeScript language spec: https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#221-reserved-words\n\t\'keyword\': /\\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield|module|declare|constructor|namespace|abstract|require|type)\\b/,\n\t\'builtin\': /\\b(?:string|Function|any|number|boolean|Array|symbol|console)\\b/,\n});\n\nPrism.languages.ts = Prism.languages.typescript;';
    loader.global.define = undefined;
    loader.global.module = undefined;
    loader.global.exports = undefined;
    loader.__exec({
        'source': source,
        'address': module.uri
    });
    loader.global.require = require;
    loader.global.define = define;
    return loader.get('@@global-helpers').retrieveGlobal(module.id, undefined);
});
/*prismjs@1.15.0#components/prism-jsx*/
define('prismjs@1.15.0#components/prism-jsx', [
    'module',
    '@loader',
    'require'
], function (module, loader, require) {
    loader.get('@@global-helpers').prepareGlobal({
        require: require,
        name: module.id,
        deps: []
    });
    var define = loader.global.define;
    var require = loader.global.require;
    var source = '(function(Prism) {\n\nvar javascript = Prism.util.clone(Prism.languages.javascript);\n\nPrism.languages.jsx = Prism.languages.extend(\'markup\', javascript);\nPrism.languages.jsx.tag.pattern= /<\\/?(?:[\\w.:-]+\\s*(?:\\s+(?:[\\w.:-]+(?:=(?:("|\')(?:\\\\[\\s\\S]|(?!\\1)[^\\\\])*\\1|[^\\s{\'">=]+|\\{(?:\\{(?:\\{[^}]*\\}|[^{}])*\\}|[^{}])+\\}))?|\\{\\.{3}[a-z_$][\\w$]*(?:\\.[a-z_$][\\w$]*)*\\}))*\\s*\\/?)?>/i;\n\nPrism.languages.jsx.tag.inside[\'tag\'].pattern = /^<\\/?[^\\s>\\/]*/i;\nPrism.languages.jsx.tag.inside[\'attr-value\'].pattern = /=(?!\\{)(?:("|\')(?:\\\\[\\s\\S]|(?!\\1)[^\\\\])*\\1|[^\\s\'">]+)/i;\n\nPrism.languages.insertBefore(\'inside\', \'attr-name\', {\n\t\'spread\': {\n\t\tpattern: /\\{\\.{3}[a-z_$][\\w$]*(?:\\.[a-z_$][\\w$]*)*\\}/,\n\t\tinside: {\n\t\t\t\'punctuation\': /\\.{3}|[{}.]/,\n\t\t\t\'attr-value\': /\\w+/\n\t\t}\n\t}\n}, Prism.languages.jsx.tag);\n\nPrism.languages.insertBefore(\'inside\', \'attr-value\',{\n\t\'script\': {\n\t\t// Allow for two levels of nesting\n\t\tpattern: /=(\\{(?:\\{(?:\\{[^}]*\\}|[^}])*\\}|[^}])+\\})/i,\n\t\tinside: {\n\t\t\t\'script-punctuation\': {\n\t\t\t\tpattern: /^=(?={)/,\n\t\t\t\talias: \'punctuation\'\n\t\t\t},\n\t\t\trest: Prism.languages.jsx\n\t\t},\n\t\t\'alias\': \'language-javascript\'\n\t}\n}, Prism.languages.jsx.tag);\n\n// The following will handle plain text inside tags\nvar stringifyToken = function (token) {\n\tif (!token) {\n\t\treturn \'\';\n\t}\n\tif (typeof token === \'string\') {\n\t\treturn token;\n\t}\n\tif (typeof token.content === \'string\') {\n\t\treturn token.content;\n\t}\n\treturn token.content.map(stringifyToken).join(\'\');\n};\n\nvar walkTokens = function (tokens) {\n\tvar openedTags = [];\n\tfor (var i = 0; i < tokens.length; i++) {\n\t\tvar token = tokens[i];\n\t\tvar notTagNorBrace = false;\n\n\t\tif (typeof token !== \'string\') {\n\t\t\tif (token.type === \'tag\' && token.content[0] && token.content[0].type === \'tag\') {\n\t\t\t\t// We found a tag, now find its kind\n\n\t\t\t\tif (token.content[0].content[0].content === \'</\') {\n\t\t\t\t\t// Closing tag\n\t\t\t\t\tif (openedTags.length > 0 && openedTags[openedTags.length - 1].tagName === stringifyToken(token.content[0].content[1])) {\n\t\t\t\t\t\t// Pop matching opening tag\n\t\t\t\t\t\topenedTags.pop();\n\t\t\t\t\t}\n\t\t\t\t} else {\n\t\t\t\t\tif (token.content[token.content.length - 1].content === \'/>\') {\n\t\t\t\t\t\t// Autoclosed tag, ignore\n\t\t\t\t\t} else {\n\t\t\t\t\t\t// Opening tag\n\t\t\t\t\t\topenedTags.push({\n\t\t\t\t\t\t\ttagName: stringifyToken(token.content[0].content[1]),\n\t\t\t\t\t\t\topenedBraces: 0\n\t\t\t\t\t\t});\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} else if (openedTags.length > 0 && token.type === \'punctuation\' && token.content === \'{\') {\n\n\t\t\t\t// Here we might have entered a JSX context inside a tag\n\t\t\t\topenedTags[openedTags.length - 1].openedBraces++;\n\n\t\t\t} else if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces > 0 && token.type === \'punctuation\' && token.content === \'}\') {\n\n\t\t\t\t// Here we might have left a JSX context inside a tag\n\t\t\t\topenedTags[openedTags.length - 1].openedBraces--;\n\n\t\t\t} else {\n\t\t\t\tnotTagNorBrace = true\n\t\t\t}\n\t\t}\n\t\tif (notTagNorBrace || typeof token === \'string\') {\n\t\t\tif (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces === 0) {\n\t\t\t\t// Here we are inside a tag, and not inside a JSX context.\n\t\t\t\t// That\'s plain text: drop any tokens matched.\n\t\t\t\tvar plainText = stringifyToken(token);\n\n\t\t\t\t// And merge text with adjacent text\n\t\t\t\tif (i < tokens.length - 1 && (typeof tokens[i + 1] === \'string\' || tokens[i + 1].type === \'plain-text\')) {\n\t\t\t\t\tplainText += stringifyToken(tokens[i + 1]);\n\t\t\t\t\ttokens.splice(i + 1, 1);\n\t\t\t\t}\n\t\t\t\tif (i > 0 && (typeof tokens[i - 1] === \'string\' || tokens[i - 1].type === \'plain-text\')) {\n\t\t\t\t\tplainText = stringifyToken(tokens[i - 1]) + plainText;\n\t\t\t\t\ttokens.splice(i - 1, 1);\n\t\t\t\t\ti--;\n\t\t\t\t}\n\n\t\t\t\ttokens[i] = new Prism.Token(\'plain-text\', plainText, null, plainText);\n\t\t\t}\n\t\t}\n\n\t\tif (token.content && typeof token.content !== \'string\') {\n\t\t\twalkTokens(token.content);\n\t\t}\n\t}\n};\n\nPrism.hooks.add(\'after-tokenize\', function (env) {\n\tif (env.language !== \'jsx\' && env.language !== \'tsx\') {\n\t\treturn;\n\t}\n\twalkTokens(env.tokens);\n});\n\n}(Prism));\n';
    loader.global.define = undefined;
    loader.global.module = undefined;
    loader.global.exports = undefined;
    loader.__exec({
        'source': source,
        'address': module.uri
    });
    loader.global.require = require;
    loader.global.define = define;
    return loader.get('@@global-helpers').retrieveGlobal(module.id, undefined);
});
/*bit-docs-prettify@0.4.0#prettify*/
define('bit-docs-prettify@0.4.0#prettify', [
    'require',
    'exports',
    'module',
    './prettify.less',
    './prism-config',
    'prismjs',
    'prismjs/themes/prism-coy.css',
    'prismjs/plugins/line-numbers/prism-line-numbers',
    'prismjs/plugins/line-numbers/prism-line-numbers.css',
    'prismjs/plugins/previewers/prism-previewers',
    'prismjs/plugins/previewers/prism-previewers.css',
    'prismjs/plugins/command-line/prism-command-line',
    'prismjs/plugins/command-line/prism-command-line.css',
    'prismjs/plugins/toolbar/prism-toolbar',
    'prismjs/plugins/toolbar/prism-toolbar.css',
    'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard',
    'prismjs/components/prism-typescript',
    'prismjs/components/prism-jsx'
], function (require, exports, module) {
    require('./prettify.less');
    require('./prism-config');
    var Prism = require('prismjs');
    require('prismjs/themes/prism-coy.css');
    require('prismjs/plugins/line-numbers/prism-line-numbers');
    require('prismjs/plugins/line-numbers/prism-line-numbers.css');
    require('prismjs/plugins/previewers/prism-previewers');
    require('prismjs/plugins/previewers/prism-previewers.css');
    require('prismjs/plugins/command-line/prism-command-line');
    require('prismjs/plugins/command-line/prism-command-line.css');
    require('prismjs/plugins/toolbar/prism-toolbar');
    require('prismjs/plugins/toolbar/prism-toolbar.css');
    require('prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard');
    require('prismjs/components/prism-typescript');
    require('prismjs/components/prism-jsx');
    Prism.languages.insertBefore('javascript', 'template-string', {
        'html-template-string': {
            pattern: /`(?:[\s\S])*<[a-z-]+(?:\s+[^<>]*)?>(?:[\s\S])*`/,
            inside: {
                'interpolation': {
                    pattern: /\$\{[^}]+\}/,
                    inside: {
                        'interpolation-punctuation': {
                            pattern: /^\$\{|\}$/,
                            alias: 'punctuation'
                        },
                        rest: Prism.languages.javascript
                    }
                },
                rest: Prism.languages.html
            }
        }
    });
    module.exports = function () {
        var codes = document.getElementsByTagName('code');
        for (var i = 0; i < codes.length; i++) {
            var code = codes[i];
            if (code.textContent.slice(-1) === '\n') {
                code.textContent = code.textContent.slice(0, -1);
            }
            if (code.parentNode.nodeName.toUpperCase() === 'PRE') {
                code.parentNode.className += ' line-numbers';
                if (code.className.includes('language-shell')) {
                    code.parentNode.className += ' command-line';
                }
                if (!code.className.includes('language-')) {
                    code.className += ' language-unknown';
                }
            }
        }
        window.requestAnimationFrame(Prism.highlightAll);
    };
});
/*bit-docs-tag-demo@0.5.3#demo_tpl*/
define('bit-docs-tag-demo@0.5.3#demo_tpl', function (require, exports, module) {
    module.exports = `
	<ul>
		<li class="tab" data-tab="demo">Demo</li>
		<li class="tab" data-tab="html" style="display:none">HTML</li>
		<li class="tab" data-tab="js" style="display:none;">JS</li>
	</ul>
	<div class="tab-content" data-for="demo">
		<iframe></iframe>
	</div>
	<div class="tab-content" data-for="html">
		<pre class="line-numbers language-html"><code> </code></pre>
	</div>
	<div class="tab-content" data-for="js">
		<pre class="line-numbers language-js"><code> </code></pre>
	</div>
`;
});
/*bit-docs-tag-demo@0.5.3#demo_frame*/
define('bit-docs-tag-demo@0.5.3#demo_frame', [
    'require',
    'exports',
    'module',
    './demo_tpl'
], function (require, exports, module) {
    var template = require('./demo_tpl');
    function render(node, docObject) {
        var demoDiv = document.createElement('div');
        demoDiv.className = 'demo';
        demoDiv.innerHTML = template;
        var demoSrc = (docObject.pathToRoot || '..') + '/' + (node.dataset ? node.dataset.demoSrc : node.getAttribute('data-demo-src'));
        demoDiv.getElementsByTagName('iframe')[0].src = demoSrc;
        node.innerHTML = '';
        node.appendChild(demoDiv);
        return demoDiv;
    }
    module.exports = function (node) {
        var docObject = window.docObject || {};
        render(node, docObject);
        var iframe = node.getElementsByTagName('iframe')[0];
        iframe.addEventListener('load', process);
        function process() {
            var demoEl = this.contentDocument.getElementById('demo-html'), sourceEl = this.contentDocument.getElementById('demo-source');
            var html = getHTML.call(this, demoEl);
            var js = getJS.call(this, sourceEl);
            if (html && html.trim()) {
                var dataForHtml = node.querySelector('[data-for=html] > pre code, [data-for=html] > div > pre code');
                dataForHtml.innerHTML = escape(html);
                prettify(dataForHtml);
                show(node.querySelector('[data-tab=html]'));
            }
            if (js) {
                var dataForJS = node.querySelector('[data-for=js] > pre code, [data-for=js] > div > pre code');
                dataForJS.innerHTML = escape(js);
                prettify(dataForJS);
                show(node.querySelector('[data-tab=js]'));
            }
            resizeIframe();
            tabs();
        }
        function getHTML(demoEl) {
            var html = demoEl ? demoEl.innerHTML : this.contentWindow.DEMO_HTML;
            if (!html) {
                var clonedBody = this.contentDocument.body.cloneNode(true);
                var scripts = [].slice.call(clonedBody.getElementsByTagName('script'));
                scripts.forEach(function (script) {
                    if (!script.type || script.type.indexOf('javascript') === -1) {
                        script.parentNode.removeChild(script);
                    }
                });
                var styles = [].slice.call(clonedBody.getElementsByTagName('style'));
                styles.forEach(function (style) {
                    style.parentNode.removeChild(style);
                });
                html = clonedBody.innerHTML;
            }
            if (html[0] === '\n') {
                html = html.slice(1);
            }
            return html;
        }
        function getJS(sourceEl) {
            var source = sourceEl ? sourceEl.innerHTML : this.contentWindow.DEMO_SOURCE;
            if (!source) {
                var scripts = [].slice.call(this.contentDocument.querySelectorAll('script'));
                for (var i = 0; i < scripts.length; i++) {
                    if (!scripts[i].type || scripts[i].type.indexOf('javascript') >= 0 && !scripts[i].src) {
                        source = scripts[i].innerHTML;
                        break;
                    }
                }
            }
            return source ? source.trim() : '';
        }
        function show(el) {
            el.style.display = '';
        }
        function hide(el) {
            el.style.display = 'none';
        }
        function tabs() {
            node.querySelector('ul').addEventListener('click', function (ev) {
                var el = ev.target;
                if (el.className === 'tab') {
                    toggle(el.dataset ? el.dataset.tab : el.getAttribute('data-tab'));
                }
            });
            toggle('demo');
            function toggle(tabName) {
                each('.tab', function (el) {
                    if (el.classList) {
                        el.classList.remove('active');
                    } else {
                        el.className = 'tab';
                    }
                });
                each('.tab-content', hide);
                each('.tab[data-tab=\'' + tabName + '\']', function (el) {
                    if (el.classList) {
                        el.classList.add('active');
                    } else {
                        el.className = 'tab active';
                    }
                });
                each('[data-for=\'' + tabName + '\']', show);
            }
            function each(selector, cb) {
                var tabs = [].slice.call(node.querySelectorAll(selector));
                tabs.forEach(cb);
            }
        }
        function escape(txt) {
            txt = txt.replace(/</g, '&lt;');
            return txt;
        }
        function prettify(el) {
            if (typeof Prism === 'undefined') {
                return;
            }
            Prism.highlightElement(el);
        }
        function getTotalHeight(height, computed) {
            return height + parseInt(computed.marginTop, 10) + parseInt(computed.marginBottom, 10) + parseInt(computed.borderTopWidth, 10) + parseInt(computed.borderBottomWidth, 10) + parseInt(computed.paddingTop, 10) + parseInt(computed.paddingBottom, 10);
        }
        function resizeIframe() {
            var frame = node.getElementsByTagName('iframe')[0];
            var computed = getComputedStyle(frame);
            if (!frame.contentDocument || !frame.contentDocument.body) {
                return;
            }
            var tolerance = 5;
            var desiredHeight = getTotalHeight(frame.contentDocument.body.scrollHeight, computed);
            var low = desiredHeight - tolerance;
            var high = desiredHeight + tolerance;
            var currentHeight = parseInt(computed.height, 10);
            if (currentHeight < low || currentHeight > high) {
                iframe.style.height = Math.min(high, 600) + 'px';
            }
            setTimeout(resizeIframe, 1000);
        }
    };
});
/*bit-docs-tag-demo@0.5.3#demo*/
define('bit-docs-tag-demo@0.5.3#demo', [
    'require',
    'exports',
    'module',
    './demo_frame'
], function (require, exports, module) {
    var demoFrame = require('./demo_frame');
    module.exports = function () {
        var demos = [].slice.call(document.getElementsByClassName('demo_wrapper'));
        demos.forEach(demoFrame);
    };
});
/*bit-docs-html-codepen-link@1.3.0#codepen-data*/
define('bit-docs-html-codepen-link@1.3.0#codepen-data', function (require, exports, module) {
    var scriptRegExp = /<script\s([^>]+)>([\s\S]*?)<\/script>/ig;
    var styleRegExp = /<style>([\s\S]*?)<\/style>/i;
    var moduleTest = /type=["']([\w\/]+)["']/;
    var srcTest = /src=/;
    var types = {
        html: function htmlType(text) {
            var result;
            text.replace(scriptRegExp, function (match, attrs, code) {
                var matchTest = attrs.match(moduleTest);
                if (matchTest && !srcTest.test(attrs)) {
                    var HTML = text.replace(match, '').trim();
                    var CSS;
                    var styleResults = HTML.match(styleRegExp);
                    if (styleResults) {
                        HTML = HTML.replace(styleResults[0], '').trim();
                        CSS = styleResults[1].trim();
                    }
                    if (types[matchTest[1]]) {
                        result = types[matchTest[1]](code.trim());
                    } else {
                        result = types.js(code.trim());
                    }
                    result.editors = '1011';
                    if (HTML) {
                        result.html = HTML;
                    }
                    if (CSS) {
                        result.css = CSS;
                    }
                }
            });
            return result;
        },
        js: function (text) {
            return {
                js: text,
                js_module: true,
                editors: '0011'
            };
        },
        typescript: function (text) {
            return {
                js: text,
                js_pre_processor: 'typescript',
                editors: '0011'
            };
        },
        jsx: function (text) {
            return {
                js: text,
                js_pre_processor: 'babel',
                editors: '0011'
            };
        }
    };
    module.exports = types;
});
/*bit-docs-html-codepen-link@1.3.0#index*/
define('bit-docs-html-codepen-link@1.3.0#index', [
    'require',
    'exports',
    'module',
    './codepen-data'
], function (require, exports, module) {
    var types = require('./codepen-data');
    var languageHTML = /language-(\w+)/;
    function cleanCodePenData(data) {
        if (docObject.codepen) {
            docObject.codepen.forEach(function (replacement) {
                if (data.js) {
                    data.js = data.js.split(replacement[0]).join(replacement[1]);
                }
            });
        }
    }
    function createCodePen(data) {
        var JSONstring = JSON.stringify(data).replace(/"/g, '&\u200Bquot;').replace(/'/g, '&apos;');
        var form = '<form action="https://codepen.io/pen/define" method="POST" target="_blank">' + '<input type="hidden" name="data" value=\'' + JSONstring + '\'>' + '</form>';
        var div = document.createElement('div');
        div.innerHTML = form;
        document.body.appendChild(div);
        div.firstChild.submit();
        setTimeout(function () {
            document.body.removeChild(div);
        }, 10);
    }
    var browserMatches = document.body.matches || document.body.msMatchesSelector;
    function matches(selector) {
        if (this.nodeType === 1) {
            if (selector.indexOf(',') >= 0) {
                return selector.split(',').some(function (selector) {
                    return browserMatches.call(this, selector);
                }, this);
            } else {
                return browserMatches.call(this, selector);
            }
        } else {
            return false;
        }
    }
    function findPre(start) {
        while (start) {
            if (start.nodeName === 'PRE') {
                return start;
            }
            if (start.querySelector) {
                var pre = start.querySelector('pre');
                if (pre) {
                    return pre;
                }
            }
            start = start.previousSibling;
        }
    }
    function findSelector(start, selector) {
        while (start) {
            if (matches.call(start, selector)) {
                return start;
            }
            if (start.querySelector) {
                var pre = start.querySelector(selector);
                if (pre) {
                    return pre;
                }
            }
            start = start.previousSibling;
        }
    }
    function getStylesFromIframe(iframe) {
        var styles = iframe.contentDocument.documentElement.querySelectorAll('style');
        var cssText = '';
        styles.forEach(function (style) {
            cssText += style.innerHTML;
        });
        return cssText;
    }
    module.exports = function () {
        document.body.addEventListener('click', function (ev) {
            if (matches.call(ev.target, '.codepen')) {
                var el = findSelector(ev.target, 'pre, .demo_wrapper');
                if (el && matches.call(el, 'pre')) {
                    var preElement = el;
                    var codeElement = preElement.querySelector('code');
                    var language = codeElement.className.match(languageHTML)[1];
                    var text = codeElement.textContent;
                    var data = types[language](text);
                    if (data.js) {
                        data.js = data.js.trim();
                    }
                    if (data.html) {
                        data.html = data.html.trim();
                    }
                    if (data) {
                        cleanCodePenData(data);
                        if (window.CREATE_CODE_PEN) {
                            CREATE_CODE_PEN(data);
                        } else {
                            createCodePen(data);
                        }
                    } else {
                        console.warn('Unable to create a codepen for this demo');
                    }
                }
                if (el && matches.call(el, '.demo_wrapper')) {
                    var htmlCode = el.querySelector('[data-for=html] code');
                    var htmlText = htmlCode ? htmlCode.textContent.trim() : '';
                    var jsCode = el.querySelector('[data-for=js] code');
                    var jsText = jsCode ? jsCode.textContent.trim() : '';
                    var cssText = getStylesFromIframe(el.querySelector('iframe'));
                    var codePen = {
                        html: htmlText,
                        js: jsText,
                        js_module: true,
                        editors: '1011',
                        css: cssText.trim()
                    };
                    cleanCodePenData(codePen);
                    if (window.CREATE_CODE_PEN) {
                        CREATE_CODE_PEN(codePen);
                    } else {
                        createCodePen(codePen);
                    }
                }
            }
        });
    };
});
/*bit-docs-site@0.0.1#packages*/
define('bit-docs-site@0.0.1#packages', [
    'require',
    'exports',
    'module',
    'bit-docs-prettify',
    'bit-docs-tag-demo',
    'bit-docs-html-codepen-link'
], function (require, exports, module) {
    function callIfFunction(value) {
        if (typeof value === 'function') {
            try {
                value();
            } catch (e) {
            }
        }
        return value;
    }
    module.exports = {
        'bit-docs-prettify': callIfFunction(require('bit-docs-prettify')),
        'bit-docs-tag-demo': callIfFunction(require('bit-docs-tag-demo')),
        'bit-docs-html-codepen-link': callIfFunction(require('bit-docs-html-codepen-link'))
    };
});
/*bit-docs-site@0.0.1#static*/
define('bit-docs-site@0.0.1#static', [
    'require',
    'exports',
    'module',
    './packages',
    './styles/styles.less!'
], function (require, exports, module) {
    var packages = require('./packages');
    require('./styles/styles.less!');
    window.PACKAGES = packages;
});