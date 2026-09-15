# Assets

This directory contains local website images. Keeping assets local avoids third-party loading failures and works well in both mainland China and international networks.

## Profile image

The homepage currently uses a text-first Hero and intentionally displays no profile image. `avatar-placeholder.svg` remains available as a neutral temporary asset if a portrait is reintroduced later. To add a real profile photo:

1. Add an optimized square image such as `avatar.jpg` (recommended: 800–1200 px, under 400 KB).
2. Add a semantic `<figure>` to the Hero in `index.html` and reference `assets/avatar.jpg`.
3. Give the image concise `alt` text that describes the real photo.

## WeChat QR code

The cropped QR image is stored as:

`assets/wechat-qr.png`

The Hero and Contact buttons open the same accessible modal. If the image is removed, the modal falls back to a clean placeholder message.

Do not commit private or temporary images to a public repository.
