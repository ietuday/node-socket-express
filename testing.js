"use strict";
var fs = require('fs');
var path, domain, membership, e = exports, 
files = new Array(), rd = "", mods = {}, cf = {}, response = {};

e.response = response;

e.initApp = function (inits) {
    path = inits.path;
    exports.appPath = inits.path;
    domain = inits.domain;
    s.on('connect', function () {
        s.emit("initApp", inits);
    });

};

e.fail = function (err) {
    console.log("Could Not Connect to Database. Please check the error details\n" + err.message);
};
e.rap = function (d) {
    registerModules();
    registerSecurity();
    rd = d;
    var tp = path.substring(0, path.length - 1)
    if (getPg(tp, d)) {
        for (var i = 0; i < files.length; i++)
            watcher.add(files[i].name);
        s.emit("rap", rd, files[0].name, files[0].dt, 0);
    }
};
e.pr = function (d) {
    var idx = parseInt("" + d);
    if (idx < files.length - 1)
    {
        idx++;
        s.emit("rap", rd, files[idx].name, files[idx].dt, idx);
    }
    else
        console.log(domain + " registered successfully with " + files.length + " files loaded");
};
e.qF = function (meta, data) {
    if (data && data.e) {
        s.emit("response", meta, data);
        return;
    }
    if (meta.module)
    {
        if (response[meta.module])
        {
            if (response[meta.module][meta.response])
            {
                try {
                    response[meta.module][meta.response](meta, data);
                }
                catch (err) {
                    console.log("Error Caught in App : " + meta.domain + " In Module : " + meta.module + " Response : " + meta.response);
                    console.log(err);
                    s.emit("response", meta, {e: "Technical Error! Please try again or contact System Administrator"});
                }
            }
            else
                s.emit("response", meta, {e: meta.module + "Could not find response function"});
        }
        else
            s.emit("response", meta, {e: meta.module + "Module not registered"});
    }
    else
        s.emit("response", meta, {e: "Could not trace Module"});
};
e.qS = function (meta, data) {
    if (data && data.e) {
        s.emit("response", meta, data);
        return;
    }
    if (meta.recItr)
    {
        meta.curItr = parseInt(meta.curItr) + 1;
        if (response[meta.module][meta.response]) {
            try {
                response[meta.module][meta.response](meta, data);
            }
            catch (err) {
                console.log("Error Caught in App : " + meta.domain + " In Module : " + meta.module + " Response : " + meta.response);
                console.log(err);
                s.emit("response", meta, {e: "Technical Error! Please try again or contact System Administrator"});
            }
        }
        return;
    }
    if (meta.module)
    {
        if (response[meta.module])
        {
            if (response[meta.module][meta.response]) {
                try {
                    console.log("Query Success! Response Module : " + meta.module + " Function: " + meta.response);
                    response[meta.module][meta.response](meta, data);
                }
                catch (err) {
                    console.log("Error Caught in App : " + meta.domain + " In Module : " + meta.module + " Response : " + meta.response);
                    console.log(err);
                }
            }
            else
                s.emit("response", meta, {e: meta.module + "Could not find response function"});
        }
        else
            s.emit("response", meta, {e: meta.module + "Module not registered"});
    }
    else
        s.emit("response", meta, {e: "Could not trace Module"});
};
e.func = function (meta, d) {
    console.log("PW => in Func : " + meta.m + " fn : " + meta.fn);
    if (d && d.e) {
        s.emit("response", meta, d);
        return;
    }
    if (mods[meta.m + ".js"]) {
        try {
            mods[meta.m + ".js"]["obj"].handler(meta, d);
        }
        catch (err) {
            console.log("Error Caught in App : " + meta.domain + " In Module : " + meta.m + " Function : " + meta.fn);
            console.log(err);
            s.emit("response", meta, {e: "Technical Error! Please try again or contact System Administrator"});
        }
    }
    else
        s.emit("response", meta, {e: "Requested Module does not exist"});
};
e.mem = function (meta, data) {
    console.log("PW => in mem : " + meta.module + " resp : " + meta.response);
    if (data && data.e) {
        s.emit("response", meta, data);
        return;
    }
    if (response[meta.module]) {
        if (response[meta.module][meta.response]) {
            try {
                response[meta.module][meta.response](meta, data);
            }
            catch (err) {
                console.log("Error Caught in App : " + meta.domain + " In Module : " + meta.module + " Response : " + meta.response);
                console.log(err);
                s.emit("response", meta, {e: "Technical Error! Please try again or contact System Administrator"});
            }
        }
    }
};
e.initPage = function (meta, data) {
    var pg = meta.page;
//        console.log("PW => meta.pjs.rp : "+meta.pjs.rp);
    if (cf[pg]) {
        if (cf[pg]["mf"]) {
            if (mods[cf[pg]["mf"] + ".js"]) {
                try {
                    meta.module = cf[pg]["mf"];
                    meta.fn = "initPage";
                    if (mods[cf[pg]["mf"] + ".js"]["obj"].initPage)
                    {
                        mods[cf[pg]["mf"] + ".js"]["obj"].initPage(meta, data);
                    }
                    else {
                        exports.loadPage(meta);
                    }
                }
                catch (err) {
                    console.log("Error Caught in App : " + meta.domain + " In Module : " + pg + " Function : " + meta.fn);
                    console.log(err);
                    s.emit("response", meta, {e: "Technical Error! Please try again or contact System Administrator"});
                }
            }
            else
            {
                console.log("Module " + pg + " does not exists");
                s.emit("emitPage", meta, data);
            }
        }
        else {
            console.log("PW => No Code File Found for " + pg);
            exports.loadPage(meta);
        }
    }
    else {
        console.log("PW => No Code Files Exists in Hierarchy for " + pg);
        s.emit("emitPage", meta, data);
    }
};
e.send = function (event, meta, data) {
    delete meta.response;
    delete meta.call;
    s.emit(event, meta, data);
};
e.console = function (meta, msg) {
    s.emit("console", meta, msg);
};
e.membership = function (meta, data) {
    s.emit("pm", meta, data);
};
e.mail = function (meta, data) {
    s.emit("pme", meta, data);
};
e.query = function (meta, qry) {
    meta.domain = domain;
    s.emit("qry", meta, qry);
};
e.recQuery = function (meta, data, cb) {
    meta.domain = domain;
    meta.recItr = data.length;
    meta.curItr = "0";
    meta.response = cb;
    meta.recData = data;
    if (data.length > 0)
    {
        if (response[meta.module][meta.response]) {
            try {
                response[meta.module][meta.response](meta);
            }
            catch (err) {
                console.log("Error Caught in App : " + meta.domain + " In Module : " + meta.module + " Response : " + meta.response);
                console.log(err);
            }
        }
    }
};
e.page = function (meta, data) {
    s.emit("page", meta, data);
};
e.notifyAll = function (meta, data) {
    meta.call = "registerNotiAll";
    s.emit("noti", meta, data);
}
e.notifyTo = function (meta, data) {
    meta.call = "registerNotiFor";
    s.emit("noti", meta, data);
}
e.notifyToSome = function (meta, data) {
    meta.call = "registerNotiForSome";
    s.emit("noti", meta, data);
}
e.inform = function (meta, data) {
    meta.call = "inform";
    s.emit("noti", meta, data);
}
e.readNoti = function (meta, data) {
    meta.call = "readNotifications";
    s.emit("noti", meta, data);
}
e.removeNoti = function (meta, data) {
    meta.call = "deleteNoti";
    s.emit("noti", meta, data);
};
e.removeNotiSession = function (meta, data) {
    meta.call = "removeNotiSession";
    s.emit("noti", meta, data);
};
e.getAllNotis = function (meta, data) {
    meta.call = "getAllNotifications";
    s.emit("noti", meta, data);
};
e.changeNotiStatus = function (meta, data) {
    meta.call = "changeNotiStatus";
    s.emit("noti", meta, data);
};
e.getUserChat = function (meta, data) {
    meta.call = "getUserChat";
    s.emit("noti", meta, data);
};
e.getOnlyNotis = function (meta, data) {
    meta.call = "getOnlyNotifications";
    s.emit("noti", meta, data);
};
e.loadPage = function (meta, data) {
    if (!meta.pjs) {
        meta.pjs = {};
        if (data)
            meta.pjs.qs = data;
        else
            meta.pjs.qs = ""
    }
    if (data)
    {
        if (!meta.pjs.data)
            meta.pjs.data = [];
        for (var i = 0; i < data.length; i++)
        {
            meta.pjs.data.push(data[i]);
        }
    }
    if (!meta.pjs.tfs)
    {
        meta.pjs.tfs = [];
        laTFS(meta.page, meta.pjs.tfs);
        if (meta.pjs.tfs.length == 0) {
            if (data) {
                s.emit("loadPage", meta, meta.pjs.data);
            }
            else {
                s.emit("emitPage", meta, {});
            }
            return;
        }
    }
    if (meta.pjs.tfs.length > 0)
    {
        if (mods[cf[meta.pjs.tfs[0]]["mf"] + ".js"]) {
            try {
                meta.module = cf[meta.pjs.tfs[0]]["mf"];
                meta.fn = "initPage";
                if (mods[cf[meta.pjs.tfs[0]]["mf"] + ".js"]["obj"].initPage) {
                    var tf = cf[meta.pjs.tfs[0]]["mf"] + ".js";
                    meta.pjs.tfs.splice(0, 1);
                    mods[tf]["obj"].initPage(meta, data);
                }
                else {
                    meta.pjs.tfs.splice(0, 1);
                    e.loadPage(meta, data);
                }
            }
            catch (err)
            {
                console.log("Error Caught in App : " + meta.domain + " In Module : " + meta.pjs.tfs[0] + " Function : " + meta.fn);
                console.log(err);
            }
        }
        else
        {
            console.log("Module " + cf[meta.pjs.tfs[0]] + " does not exists");
            meta.pjs.tfs.splice(0, 1);
            e.loadPage(meta, data);
        }
    }
    else
    {
        s.emit("loadPage", meta, meta.pjs.data);
    }
};
function laTFS(pg, tfs) {
    if (cf[pg]) {
        if (cf[pg]["tfs"]) {
            var stf = cf[pg]["tfs"];
            for (var i = 0; i < stf.length; i++) {
                if (cf[path + stf[i]]) {
                    tfs.push(path + stf[i]);
                    if (cf[path + stf[i]]["tfs"]) {
                        if (cf[path + stf[i]]["tfs"].length > 0)
                            laTFS(path + stf[i], tfs);
                    }
                }
            }
        }
        else
            return;
    }
    else
        return;
}
function getPg(dir, da) {
    var fl = fs.readdirSync(dir);
    for (var i in fl) {
        var nm = dir + '/' + fl[i];
        if (fs.statSync(nm).isDirectory())
        {
            if (nm.indexOf("upload", nm.length - "upload".length) === -1 && nm.indexOf("repository", nm.length - "repository".length) === -1 && nm.indexOf("App_Modules", nm.length - "App_Modules".length) === -1 && nm.indexOf("node_modules", nm.length - "node_modules".length) === -1 && nm.indexOf("ckeditor", nm.length - "ckeditor".length) === -1 && nm.indexOf("mailAttachment", nm.length - "mailAttachment".length) === -1 && nm.indexOf("logs", nm.length - "logs".length) === -1) {
                if (!getPg(nm, da))
                    return false;
            }
        }
        else {
            var ext = nm.substring(nm.lastIndexOf("."), nm.length);
            var fp = nm.substring(0, nm.lastIndexOf("."));
            if (ext.toLowerCase() != 'png' && ext.toLowerCase() != 'jpg' && ext.toLowerCase() != 'jpeg' && ext.toLowerCase() != 'gif' && ext.toLowerCase() != 'ico' && ext.toLowerCase() != 'bmp') {
                var data = fs.readFileSync(nm, "utf8");
                if (data.indexOf("<pjs") !== -1) {
                    if (data.indexOf("<pjs") < data.indexOf("<body>") || data.indexOf("<pjs") > data.indexOf("</body>"))
                    {
                        var pjs = data.substring(data.indexOf("<pjs") + 4, data.indexOf("/>", data.indexOf("<pjs") + 4)).trim();
                        var drt = {};
                        while (pjs.indexOf("=") != -1) {
                            var st = pjs.indexOf("=");
                            drt[pjs.substring(0, st).trim()] = pjs.substring(pjs.indexOf('"') + 1, (pjs.indexOf('"', pjs.indexOf('"') + 1))).trim();
                            pjs = pjs.substring((pjs.indexOf('"', pjs.indexOf('"') + 1)) + 1).trim();
                        }
                        if (drt["codeFile"]) {
                            if (!fs.existsSync(path + "App_Modules/" + drt["codeFile"] + ".js")) {
                                console.log("Error ==> Code File Does Not Exists!  &&&  " + drt["codeFile"] + "==PAGE==" + fp);
                                return false;
                            }
                            else {
                                console.log("Code file entry for page : " + fp);
                                if (!cf[fp])
                                    cf[fp] = {};
                                cf[fp]["mf"] = drt["codeFile"];
                            }
                        }
                    }
                }
                var ts = 0;
                while (data.indexOf("<template", ts) !== -1) {
                    if (!cf[fp])
                        cf[fp] = {};
                    if (!cf[fp]["tfs"])
                        cf[fp]["tfs"] = [];
                    var srci = data.indexOf("src", data.indexOf("<template", ts) + 9);
                    if (srci !== -1) {
                        srci += 3;
                        var qidx = data.indexOf('"', srci);
                        if (qidx !== -1) {
                            cf[fp]["tfs"].push(data.substring(qidx + 1, data.indexOf('"', qidx + 1)));
                        }
                        else
                            console.error("Error near Template src attribute!");
                    }
                    else
                        console.error("Template Source File not defined.");
                    ts = data.indexOf("</template>", ts) + 11;
                }
                files.push({name: nm, dt: data});
            }
        }
    }
    return true;
}
function registerModules() {
    var fl = fs.readdirSync(path + "App_Modules");
    for (var i in fl) {
        if (!mods[fl[i]])
            mods[fl[i]] = {obj: '', fn: {}};
        if (path.indexOf("Proyolk") > -1)
            console.log("App_Module Loaded : " + fl[i]);
        mods[fl[i]]["obj"] = require(path + 'App_Modules/' + fl[i]);
        files.push({name: path + 'App_Modules/' + fl[i], dt: ''});
    }
}
function registerSecurity() {
    if (fs.existsSync(path + "Security.js"))
    {
        var data = require(path + "Security.js");
        files.push({name: path + 'Security.js', dt: ''});
        s.emit("sec", domain, data.authMods);
    }
}
e.registerResponse = function (mod, respFn) {
    response[mod] = {};
    for (var fn in respFn)
        response[mod][fn] = respFn[fn];
};
e.registerError = function (meta, data, err, m, fn) {
    var d = new Date();
    if (meta.errorLog) {
        fs.open(meta.errorLog, 'a', function (err1) {
            if (err1)
                console.log("open err" + err1)
            else {
                var errdet = {};
                errdet.time = d;
                errdet.meta = meta;
                errdet.data = data;
                errdet.err = err1;
                fs.appendFile('ErrorLog.txt', JSON.stringify(errdet) + "\n", function (err2) {
                    if (err2)
                        console.log("err in appendFile" + err2)
                    else
                        console.log("successs");
                });
            }

        });
    }
    con("----------ERROR BLOCK STARTS----------\nDomain: " + meta.domain + "\Module: " + m + "\nFunction: " + fn + "Error Details: " + JSON.stringify(err) + "\nMeta: " + JSON.stringify(meta) + "\nData: " + JSON.stringify(data) + "\nTime: " + d + "\n----------ERROR BLOCK ENDS----------", "error");
}