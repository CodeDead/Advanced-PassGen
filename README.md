# Advanced PassGen

![Advanced PassGen](https://i.imgur.com/WcaJL2t.png)

![GitHub](https://img.shields.io/badge/language-JavaScript+Rust-green)
![GitHub](https://img.shields.io/github/license/CodeDead/Advanced-PassGen)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/CodeDead/Advanced-PassGen)
[![Release](https://github.com/CodeDead/Advanced-PassGen/actions/workflows/release.yml/badge.svg)](https://github.com/CodeDead/Advanced-PassGen/actions/workflows/release.yml)
[![Test](https://github.com/CodeDead/Advanced-PassGen/actions/workflows/test.yml/badge.svg)](https://github.com/CodeDead/Advanced-PassGen/actions/workflows/test.yml)

Advanced PassGen is a free and open-source application that can help you generate passwords and export them. You can export your passwords in plain text, CSV or JSON format!

For a live version of the application, visit [our website](https://advancedpassgen.codedead.com).

## Building

Advanced PassGen uses tauri to build the desktop application. You can find more information about Tauri [here](https://tauri.app/v1/guides/getting-started/prerequisites).

### Web

You can build a web version of Advanced PassGen using `Vite` by running the following command:

```shell
yarn build
```

For more information about building the web version, please read the `Vite` documentation [here](https://vitejs.dev/guide/build.html).

### Windows

#### Installer

You can create an executable installer by running the `yarn tauri build` command on a Windows host:
```shell
yarn tauri build
```

### Linux

#### deb

You can create a .deb file, by running the `yarn tauri build` command on a Linux host:
```shell
yarn tauri build
```

#### AppImage

You can create an [AppImage](https://appimage.github.io/) by executing the `yarn tauri build` command on a Linux host:
```shell
yarn tauri build
```

### macOS

#### dmg

You can create a macOS build by running the `yarn tauri build` command on a macOS host:
```shell
yarn tauri build
```

#### Archive

You can create a macOS build by running the `yarn tauri build` command on a macOS host:
```shell
yarn tauri build
```

## Credits

### Tauri

This project uses [Tauri](https://tauri.app/) to create a cross-platform application.

### ReactJS

This project uses [React](https://reactjs.org/) to create the user interface.

### Theme

The theme used in this application is [MUI](https://mui.com/).

### Images

The application icon (and derivatives) are provided by [RemixIcon](https://remixicon.com/).  
All other images were provided by [MUI](https://mui.com/material-ui/material-icons/).

### Translations

* Chinese (Simplified) - [大眼仔~旭](https://github.com/wcxu21)
* German: [uDEV2019](https://github.com/uDEV2019)

## About

This library is maintained by CodeDead. You can find more about us using the following links:
* [Website](https://codedead.com)
* [Bluesky](https://bsky.app/profile/codedead.com)
* [Facebook](https://facebook.com/deadlinecodedead)

Copyright © 2025 CodeDead
