(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        if (typeof root === 'undefined' || root !== Object(root)) {
            throw new Error('templatizer: window does not exist or is not an object');
        }
        root.templatizer = factory();
    }
}(this, function () {
    var jade=function(){function n(n){return null!=n&&""!==n}function t(e){return(Array.isArray(e)?e.map(t):e&&"object"==typeof e?Object.keys(e).filter(function(n){return e[n]}):[e]).filter(n).join(" ")}function e(n){return i[n]||n}function r(n){var t=String(n).replace(o,e);return t===""+n?n:t}var a={};a.merge=function t(e,r){if(1===arguments.length){for(var a=e[0],i=1;i<e.length;i++)a=t(a,e[i]);return a}var o=e.class,s=r.class;(o||s)&&(o=o||[],s=s||[],Array.isArray(o)||(o=[o]),Array.isArray(s)||(s=[s]),e.class=o.concat(s).filter(n));for(var f in r)"class"!=f&&(e[f]=r[f]);return e},a.joinClasses=t,a.cls=function(n,e){for(var r=[],i=0;i<n.length;i++)e&&e[i]?r.push(a.escape(t([n[i]]))):r.push(t(n[i]));var o=t(r);return o.length?' class="'+o+'"':""},a.style=function(n){return n&&"object"==typeof n?Object.keys(n).map(function(t){return t+":"+n[t]}).join(";"):n},a.attr=function(n,t,e,r){return"style"===n&&(t=a.style(t)),"boolean"==typeof t||null==t?t?" "+(r?n:n+'="'+n+'"'):"":0==n.indexOf("data")&&"string"!=typeof t?(-1!==JSON.stringify(t).indexOf("&")&&console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"),t&&"function"==typeof t.toISOString&&console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0")," "+n+"='"+JSON.stringify(t).replace(/'/g,"&apos;")+"'"):e?(t&&"function"==typeof t.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+n+'="'+a.escape(t)+'"'):(t&&"function"==typeof t.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+n+'="'+t+'"')},a.attrs=function(n,e){var r=[],i=Object.keys(n);if(i.length)for(var o=0;o<i.length;++o){var s=i[o],f=n[s];"class"==s?(f=t(f))&&r.push(" "+s+'="'+f+'"'):r.push(a.attr(s,f,!1,e))}return r.join("")};var i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"},o=/[&<>"]/g;return a.escape=r,a.rethrow=function n(t,e,r,a){if(!(t instanceof Error))throw t;if(!("undefined"==typeof window&&e||a))throw t.message+=" on line "+r,t;try{a=a||require("fs").readFileSync(e,"utf8")}catch(e){n(t,null,r)}var i=3,o=a.split("\n"),s=Math.max(r-i,0),f=Math.min(o.length,r+i),i=o.slice(s,f).map(function(n,t){var e=t+s+1;return(e==r?"  > ":"    ")+e+"| "+n}).join("\n");throw t.path=e,t.message=(e||"Jade")+":"+r+"\n"+i+"\n\n"+t.message,t},a.DebugItem=function(n,t){this.lineno=n,this.filename=t},a}(); 

    var templatizer = {};
    templatizer["jade"] = {};
    templatizer["jade"]["includes"] = {};
    templatizer["jade"]["pages"] = {};

    // jade/body.jade compiled template
    templatizer["jade"]["body"] = function tmpl_jade_body() {
        return '<body><nav class="navbar navbar-default"><div class="container-fluid"><div class="navbar-header"><a href="/" class="navbar-brand">web-client-app</a></div><ul class="nav navbar-nav"><li><a href="/">home</a></li><li><a href="/collections">collection demo</a></li><li><a href="/info">more info</a></li><li> <a href="/login">Login</a></li></ul></div></nav><div class="container"><main data-hook="page-container"></main><footer class="footer-main"><nav class="nav-footer cf"><div><a href="http://ampersandjs.com/learn" class="nav-item external">Learn</a><a href="http://ampersandjs.com/docs" class="nav-item external">Docs</a><a href="http://tools.ampersandjs.com" class="nav-item external">Modules</a></div><div><a href="https://gitter.im/AmpersandJS/AmpersandJS" class="nav-item external">Chatroom</a><a href="https://trello.com/b/UxylNzHr/ampersand-js-roadmap" class="nav-item external">Roadmap</a><a href="http://ampersandjs.com/contribute" class="nav-item external">Contribute</a></div><div><a href="http://ampersandjs.com/security" class="nav-item external">Security</a><a href="https://github.com/ampersandjs" class="nav-item external">Github</a><a href="https://twitter.com/ampersandjs" class="nav-item external">Twitter</a></div></nav><p>Sponsored by <a href="https://andyet.com">&amp;yet </a><br/>with the help of our <a href="http://ampersandjs.com/contribute">contributors</a></p><a href="http://ampersandjs.com" class="logo logo-ampersand-pink">&amp;</a></footer></div></body>';
    };

    // jade/head.jade compiled template
    templatizer["jade"]["head"] = function tmpl_jade_head() {
        return '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/><meta name="apple-mobile-web-app-capable" content="yes"/>';
    };

    // jade/includes/formInput.jade compiled template
    templatizer["jade"]["includes"]["formInput"] = function tmpl_jade_includes_formInput() {
        return '<div class="form-group"><label data-hook="label"></label><div data-hook="message-container"><div data-hook="message-text" class="alert alert-danger"></div></div><input class="form-control"/></div>';
    };

    // jade/includes/login/form/input.jade compiled template
    templatizer["jade"]["includes"]["login"]["form"]["input"] = function tmpl_jade_includes_login_form_input() {
        return '<div class="form-group"><label data-hook="label"></label><div data-hook="message-container"><div data-hook="message-text" class="alert alert-danger"></div></div><input class="form-control"/></div>';
    };

    // jade/includes/login/form.jade compiled template
    templatizer["jade"]["includes"]["login"]["form"] = function tmpl_jade_includes_login_form() {
        return '<div class="form-group"><label data-hook="label"></label><div data-hook="message-container"><div data-hook="message-text" class="alert alert-danger"></div></div><input class="form-control"/></div>';
    };

    // jade/includes/person.jade compiled template
    templatizer["jade"]["includes"]["person"] = function tmpl_jade_includes_person() {
        return '<li class="person list-group-item container"><img data-hook="avatar" width="40" height="40"/><a data-hook="name"></a><span class="btn-group pull-right"> <a data-hook="action-edit" class="btn btn-default">edit </a><a href="#" data-hook="action-delete" class="btn btn-danger">delete</a></span></li>';
    };

    // jade/pages/collectionDemo.jade compiled template
    templatizer["jade"]["pages"]["collectionDemo"] = function tmpl_jade_pages_collectionDemo() {
        return '<section class="page pageOne"><h2>Collection demo</h2><p>Intelligently rendering collections can be a bit tricky. </p><p><a href="https://github.com/ampersandjs/ampersand-view">ampersand-view\'s</a> <code>renderCollection()</code> method makes it simple.</p><p>The only code required to manage the collection is:</p><pre><code>this.renderCollection(\n   this.collection, \n   PersonView, \n   this.queryByHook(\'people-list\')\n);</code></pre><h3>People container:</h3><ul data-hook="people-list" class="list-group"></ul><p>Try it by clicking the buttons</p><div class="buttons btn-group"><button data-hook="reset" class="btn btn-default">.reset() </button><button data-hook="fetch" class="btn btn-default">.fetch() </button><button data-hook="shuffle" class="btn btn-default">.shuffle() </button><button data-hook="add" class="btn btn-default">.addRandom()</button><a href="/person/add" class="btn btn-default">Add Person</a></div><p>Events are always managed so you don\'t get any leaks.</p></section>';
    };

    // jade/pages/home.jade compiled template
    templatizer["jade"]["pages"]["home"] = function tmpl_jade_pages_home() {
        return '<section class="page home"><h2>Welcome to a skeleton for web-client-app</h2><p>If you "view source" you\'ll see it\'s 100% client rendered.</p><p>Click around the site using the nav bar at the top. </p><p>Things to note:<ul><li>The url changes, no requests are made to the server.</li><li>Refreshing the page will always get you back to the same page</li><li>Page changes are nearly instantaneous</li><li>In development mode, you don\'t need to restart the server to see changes, just edit and refresh.</li><li>In production mode, it will serve minfied, uniquely named files with super agressive cache headers. To test:<ul> <li>in dev_config.json set <code>isDev</code> to <code>false</code>.</li><li>restart the server.</li><li>view source and you\'ll see minified css and js files with unique names.</li><li>open the "network" tab in chrome dev tools (or something similar). You\'ll also want to make sure you haven\'t disabled your cache.</li><li>without hitting "refresh" load the app again (selecting current URL in url bar and hitting "enter" works great).</li><li>you should now see that the JS and CSS files were both served from cache without making any request to the server at all.</li></ul></li></ul></p></section>';
    };

    // jade/pages/info.jade compiled template
    templatizer["jade"]["pages"]["info"] = function tmpl_jade_pages_info() {
        return '<section class="page pageTwo"><h2>Simple Page Example</h2><p>This page was rendered by a simple page view file at client/pages/info.js.</p></section>';
    };

    // jade/pages/login.jade compiled template
    templatizer["jade"]["pages"]["login"] = function tmpl_jade_pages_login() {
        return '<section class="page login"><div><div>Login page</div><div><form data-hook="login-form"><fieldset data-hook="field-container"></fieldset><div class="buttons"><button data-hook="reset" type="submit" class="btn">Submit</button></div></form></div></div></section>';
    };

    // jade/pages/personAdd.jade compiled template
    templatizer["jade"]["pages"]["personAdd"] = function tmpl_jade_pages_personAdd() {
        return '<section class="page add-person"><h2>Add Person</h2><p>This form and all behavior is defined by the form view in <code>client/forms/person.js</code>.</p><p>The same form-view is used for both editing and creating new users.</p><form data-hook="person-form"><fieldset data-hook="field-container"></fieldset><div class="buttons"><button data-hook="reset" type="submit" class="btn">Submit</button></div></form></section>';
    };

    // jade/pages/personEdit.jade compiled template
    templatizer["jade"]["pages"]["personEdit"] = function tmpl_jade_pages_personEdit() {
        return '<section class="page edit-person"><h2>Edit Person</h2><p>This form and all behavior is defined by the form view in <code>client/forms/person.js</code>.</p><p>The same form-view is used for both editing and creating new users.</p><form data-hook="person-form"><fieldset data-hook="field-container"></fieldset><div class="buttons"><button data-hook="reset" type="submit" class="btn">Submit</button></div></form></section>';
    };

    // jade/pages/personView.jade compiled template
    templatizer["jade"]["pages"]["personView"] = function tmpl_jade_pages_personView() {
        return '<section class="page view-person"><h2 data-hook="name"></h2><img data-hook="avatar" width="80" height="80"/><div class="buttons"><a data-hook="edit" class="btn">Edit</a><button data-hook="delete" class="btn">Delete</button></div></section>';
    };

    return templatizer;
}));
