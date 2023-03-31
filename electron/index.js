"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var WinState = require('electron-win-state').default;
var path_1 = require("path");
electron_1.app.disableHardwareAcceleration(); // 关闭硬件加速
var winState = new WinState({
    defaultWidth: 1920,
    defaultHeight: 1080,
}); //上一次的窗口状态
var createWindow = function () {
    var mainWin = new electron_1.BrowserWindow(__assign(__assign({ minWidth: 1280, minHeight: 760, show: false, autoHideMenuBar: true }, winState.winOptions), { webPreferences: {
        // preload: path.join(__dirname, 'preload.js'),
        //别用不安全
        // nodeIntegration: true,//是否集成 Nodejs
        // contextIsolation: false,//是否开启上下文隔离
        // enableRemoteModule: true // 是否开启远程模块
        } }));
    // 如果打包了，渲染index.html
    if (electron_1.app.isPackaged) {
        mainWin.loadFile(path_1.default.join(__dirname, "../index.html"));
    }
    else {
        var url = "http://localhost:2048"; // 本地启动的vue项目路径
        mainWin.loadURL(url);
    }
    mainWin.on('ready-to-show', function () {
        mainWin.show(); // 窗口加载完毕后再显示。对应上方的先不显示
    });
    // 打开开发工具
    mainWin.webContents.openDevTools();
    //关闭安全警告
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
    // dialog.showMessageBox(mainWin, {
    //   title: "懂不懂看字，不懂看别用",
    //   message: '可以玩玩',
    //   type: 'error'
    // })
    winState.manage(mainWin);
};
// 这段程序将会在 Electron 结束初始化  和创建浏览器窗口的时候调用 部分 API 在 ready 事件触发后才能使用。
electron_1.app.whenReady().then(function () {
    createWindow();
    electron_1.app.on('activate', function () {
        // 在 macOS 系统内, 如果没有已开启的应用窗口
        // 点击托盘图标时通常会重新创建一个新窗口
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
/*  除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
 直到用户使用 Cmd + Q 明确退出 */
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
