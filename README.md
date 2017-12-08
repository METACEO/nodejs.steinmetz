![Stonemason](https://cdn.rawgit.com/METACEO/nodejs.steinmetz/e004721e/steinmetz.png)

# steinmetz

Steinmetz (german for stonemason) is a tile generator for mapping applications.

Find [a full example here](https://github.com/METACEO/nodejs.steinmetz-example) to run yourself.

## Installation & Use

For programmatic usage (use in your Node.js application) install via NPM.

```
npm install --save steinmetz
```

## Objectives

- [ ] Prioritize objectives.
- [x] Render points.
- [ ] Render polylines.
- [ ] Render polygons.
- [ ] Render better.
- [ ] Render tiles other than 256px squares.
- [ ] Research into replacing the `canvas` dependency with something better, or with something that does not have so many other dependencies (Cairo specifically.)
- [ ] Complete writing documentation.
- [ ] Complete examples/wiki.
- [ ] Support streaming in JSON objects.
- [ ] Support an internal HTTP service with a REST API.
- [ ] Support configuration files.
- [ ] Support CLI interaction.
- [ ] Support WebHooks and events for rendering lifecycle.
- [ ] Support exporting a manifest that would include all rendered tiles, E-Tags, labels, etc.

## Dependencies

- Using `typescript` for source code.
- Using `JSONStream` for non-blocking JSON reading/writing.
- Using `sharp` for overlapping PNG files.
- Using `canvas` for HTML5-like canvas interaction (this includes following the `canvas` instructions to install [Cairo](https://www.cairographics.org/), too.)
- Using `upng-js` for PNG encoding/decoding.
- Using `pako` for zlib-like inflation/deflation.
