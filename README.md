# Advanced PassGen

![Advanced PassGen](https://i.imgur.com/bVTaGO7.png)

![GitHub](https://img.shields.io/badge/language-JavaScript+Rust-green)
![GitHub](https://img.shields.io/github/license/CodeDead/Advanced-PassGen)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/CodeDead/Advanced-PassGen)
[![Release](https://github.com/CodeDead/Advanced-PassGen/actions/workflows/release.yml/badge.svg)](https://github.com/CodeDead/Advanced-PassGen/actions/workflows/release.yml)
[![Test](https://github.com/CodeDead/Advanced-PassGen/actions/workflows/test.yml/badge.svg)](https://github.com/CodeDead/Advanced-PassGen/actions/workflows/test.yml)

Advanced PassGen is a free and open-source application that can help you generate passwords and export them. You can export your passwords in plain text, CSV or JSON format!

For a live version of the application, visit [https://advancedpassgen.codedead.com](https://advancedpassgen.codedead.com).

## Building

Advanced PassGen uses tauri to build the desktop application. You can find more information about Tauri [here](https://tauri.app/v1/guides/getting-started/prerequisites).

### Web

You can build a web version of Advanced PassGen by running the following command:

```shell
yarn build
```

For more information about building the web version, please read the `creact-react-app` documentation [here](https://create-react-app.dev/docs/production-build).

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

#### DMG

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

This project uses [ReactJS](https://reactjs.org/) to create the user interface.

### Theme

The theme used in this application is [MUI](https://mui.com/).

### Images

The application icon was provided by [RemixIcon](https://remixicon.com/).

## About

This library is maintained by CodeDead. You can find more about us using the following links:
* [Website](https://codedead.com/)
* [Twitter](https://twitter.com/C0DEDEAD/)
* [Facebook](https://facebook.com/deadlinecodedead/)

Copyright © 2022 CodeDead
