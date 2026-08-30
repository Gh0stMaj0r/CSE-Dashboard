module.exports = {
    packagerConfig: {
        asar: true,
        icon: "src/assets/app",

        extraResource: [
            "D:/CSEBackendPublish"
        ]
    },

    makers: [
        {
            name: "@electron-forge/maker-squirrel",
            config: {
                name: "cse_dashboard"
            }
        },

        {
            name: "@electron-forge/maker-zip",
            platforms: ["win32"]
        }
    ]
};