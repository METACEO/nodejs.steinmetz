# steinmetz

Steinmetz (german for stonemason) is a tile generator for mapping applications.

## Installation & Use

For programmatic usage (use in your Node.js application) install via NPM.

```
npm install --save steinmetz
```

## Objectives

- [x] Render points.
- [ ] Render points better.
- [ ] Render polylines.
- [ ] Render polygons.
- [ ] Render tiles other than 256px squares.
- [ ] Complete writing documentation.
- [ ] Get a cool logo.
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
