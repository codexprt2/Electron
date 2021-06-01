console.log("Main Process Working");
console.log("From main.js");

const electron = require("electron");
const { create } = require("domain");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let win;

function createWindow() {
	win = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
		},
	});
	win.loadURL(
		url.format({
			pathname: path.join(__dirname, "index.html"),
			protocol: "file",
			slashes: true,
		})
	);
	win.webContents.openDevTools();
	win.on("closed", () => {
		win = null;
	});
}
app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
app.on("active", () => {
	if (win === null) {
		createWindow();
	}
});