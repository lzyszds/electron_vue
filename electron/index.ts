import { BrowserWindow, app, dialog } from 'electron';
const WinState = require('electron-win-state').default
import path from 'path'

app.disableHardwareAcceleration() // 关闭硬件加速
const winState = new WinState({
  defaultWidth: 1920,
  defaultHeight: 1080,
}) //上一次的窗口状态

const createWindow = () => {
  const mainWin = new BrowserWindow({
    minWidth: 1280,
    minHeight: 760,
    show: false, // 先不显示
    autoHideMenuBar: true,//隐藏菜单栏
    ...winState.winOptions,//窗口状态,当前结构必须放在下方
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
      //别用不安全
      // nodeIntegration: true,//是否集成 Nodejs
      // contextIsolation: false,//是否开启上下文隔离
      // enableRemoteModule: true // 是否开启远程模块
    }
  })
  // 如果打包了，渲染index.html
  if (app.isPackaged) {
    mainWin.loadFile(path.join(__dirname, "../index.html"));
  } else {
    let url = "http://localhost:2048"; // 本地启动的vue项目路径
    mainWin.loadURL(url);
  }

  mainWin.on('ready-to-show', () => {
    mainWin.show() // 窗口加载完毕后再显示。对应上方的先不显示
  })
  // 打开开发工具
  mainWin.webContents.openDevTools()
  //关闭安全警告
  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
  // dialog.showMessageBox(mainWin, {
  //   title: "懂不懂看字，不懂看别用",
  //   message: '可以玩玩',
  //   type: 'error'
  // })
  winState.manage(mainWin)
}

// 这段程序将会在 Electron 结束初始化  和创建浏览器窗口的时候调用 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

/*  除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
 直到用户使用 Cmd + Q 明确退出 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
