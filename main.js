console.log("Main Process Working");
console.log("From main.js");

const electron = require("electron");
const { create } = require("domain");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let winone, winTwo;

function createWindow() {
	winone = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
		},
	});
	winTwo = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
		},
	});
	winone.loadURL(
		url.format({
			pathname: path.join(__dirname, "one.html"),
			protocol: "file",
			slashes: true,
		})
	);
	winTwo.loadURL(
		url.format({
			pathname: path.join(__dirname, "two.html"),
			protocol: "file",
			slashes: true,
		})
	);

	winone.webContents.openDevTools();
	winTwo.webContents.openDevTools();

	winone.on("closed", () => {
		win = null;
	});

	winTwo.on("closed", () => {
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
