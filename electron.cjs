const { app, BrowserWindow } = require("electron");
const path = require("path");
const { spawn } = require("child_process");
const net = require("net");

let backendProcess = null;

function startBackend() {
    const backendPath = path.join(
        process.resourcesPath,
        "CSEBackendPublish",
        "CSEProject.exe"
    );

    console.log("Starting backend:");
    console.log(backendPath);

    backendProcess = spawn(
        backendPath,
        ["--urls", "http://localhost:5133"],
        {
            cwd: path.dirname(backendPath),
            windowsHide: true
        }
    );

    backendProcess.stdout.on("data", (data) => {
        console.log(`Backend: ${data}`);
    });

    backendProcess.stderr.on("data", (data) => {
        console.error(`Backend: ${data}`);
    });

    backendProcess.on("error", (error) => {
        console.error("Could not start backend:", error);
    });

    backendProcess.on("exit", (code) => {
        console.log(`Backend stopped. Exit code: ${code}`);
        backendProcess = null;
    });
}

function waitForBackend() {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error("Backend did not start within 15 seconds."));
        }, 15000);

        const check = () => {
            const socket = new net.Socket();

            socket.setTimeout(1000);

            socket.on("connect", () => {
                clearTimeout(timeout);
                socket.destroy();
                resolve();
            });

            socket.on("error", () => {
                socket.destroy();
                setTimeout(check, 250);
            });

            socket.on("timeout", () => {
                socket.destroy();
                setTimeout(check, 250);
            });

            socket.connect(5133, "127.0.0.1");
        };

        check();
    });
}

async function createWindow() {
    const win = new BrowserWindow({
        width: 1400,
        height: 900,
        show: false,
        icon: path.join(__dirname, "src", "assets", "app.ico"),
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    if (app.isPackaged) {
        startBackend();

        try {
            console.log("Waiting for backend...");
            await waitForBackend();
            console.log("Backend is ready.");

            await win.loadFile(
                path.join(__dirname, "dist", "index.html")
            );
            win.show();
        } catch (error) {
            console.error(error);

            await win.loadFile(
                path.join(__dirname, "dist", "index.html")
            );
            win.show();
        }
    } else {
        await win.loadURL("http://localhost:5173");
        win.show();
    }
}

app.whenReady().then(() => {
    console.log("Electron started");
    createWindow();
});

app.on("before-quit", () => {
    if (backendProcess) {
        backendProcess.kill();
        backendProcess = null;
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});