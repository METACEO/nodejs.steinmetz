![Stonemason](https://cdn.rawgit.com/METACEO/nodejs.steinmetz/e004721e/steinmetz.png)

# steinmetz

Steinmetz (german for stonemason) is a tile generator for mapping applications.

This repository contains the core code that powers derived applications (you can find the completed and planned applications in [the README file](https://github.com/METACEO/nodejs.steinmetz#derivatives) below.)

Find [a full example here](https://github.com/METACEO/nodejs.steinmetz-example) to run yourself.

## Installation & Use

For programmatic usage (use in your Node.js application) install via NPM.

```
npm install --save steinmetz
```

## Objectives

- [x] Prioritize objectives.
- [ ] Utilize GeoJSON for data objects.
- [ ] Provide a stream of rendered tiles, instead of writing files.
- [x] Render points. ([3d1c44e](https://github.com/METACEO/nodejs.steinmetz/commit/3d1c44e6deb7641e2fd4c74890b0c10b1d83404d))
- [ ] Render polylines.
- [ ] Render polygons.
- [ ] Optimize object rendering.
- [ ] Complete writing documentation.
- [ ] Complete examples/wiki.
- [ ] Support configuration files.
- [ ] Support WebHooks and/or events for rendering lifecycle.
- [ ] Support exporting a manifest that would include all rendered tiles, E-Tags, labels, etc.
- [ ] Research into replacing the `canvas` dependency with something better, or with something that does not have so many other dependencies (Cairo specifically.)
- [ ] Render tiles other than 256px squares.

## Derivatives

- [ ] A file writer.
- [ ] A configurable HTTP server.
- [ ] A CLI application.

## Dependencies

- Using `typescript` for source code.
- Using `JSONStream` for non-blocking JSON reading/writing.
- Using `sharp` for overlapping PNG files.
- Using `canvas` for HTML5-like canvas interaction (this includes following the `canvas` instructions to install [Cairo](https://www.cairographics.org/), too.)
- Using `upng-js` for PNG encoding/decoding.
- Using `pako` for zlib-like inflation/deflation.
