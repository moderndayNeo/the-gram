import * as U from './upload_utils.js'

export function cropFitToSquareImg(img) {
    if (U.isSquare(img)) return img

    const difX = U.isLandscape(img) ? (img.width - img.height) / 2 : 0
    const difY = U.isPortrate(img) ? (img.height - img.width) / 2 : 0
    const size = U.isPortrate(img) ? img.width : img.height

    const canvas = document.createElement('canvas');
    const context = canvas.getContext("2d")

    canvas.width = size
    canvas.height = size
    context.drawImage(img, difX, difY, size, size, 0, 0, size, size);
    return canvas
}

export function cropImageBetweenRatios(img, minAspectRatio, maxAspectRatio) {
    const aspect = U.aspectRatio(img)

    if (aspect < minAspectRatio) {
        return cropImage(img, minAspectRatio)
    }
    if (aspect > maxAspectRatio) {
        return cropImage(img, maxAspectRatio)
    }
    return img
}

export function cropImage(img, aspect) {
    const toWide = img.width > U.calcWidth(img.height, aspect)
    
    const height = toWide ? img.height : U.calcHeight(img.width, aspect)
    const width = toWide ? U.calcWidth(img.height, aspect) : img.width
    const difX = toWide ? (img.width - width) / 2 : 0
    const difY = toWide ? 0 : (img.height - height) / 2

    const canvas = document.createElement('canvas');
    const context = canvas.getContext("2d")

    canvas.width = width
    canvas.height = height
    context.drawImage(img, difX, difY, width, height, 0, 0, width, height);
    return canvas
}

export function rotateImg(img, rotation) {
    if (!U.isRotated(rotation)) return img

    const canvas = document.createElement('canvas');
    const context = canvas.getContext("2d")

    canvas.width = U.isRotatedRightAngle(rotation) ? img.height : img.width
    canvas.height = U.isRotatedRightAngle(rotation) ? img.width : img.height

    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(rotation * Math.PI / 180);

    context.drawImage(img, -img.width / 2, -img.height / 2);

    context.restore();

    return canvas
}

export function scaleImg(img, maxWidth) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext("2d")
    const aspect = U.aspectRatio(img)
    const scaleX = img.width
    const scaleY = (img.width / aspect)

    maxWidth = maxWidth > img.width ? img.width : maxWidth

    canvas.width = maxWidth
    canvas.height = (maxWidth / aspect)

    context.drawImage(img, 0, 0, scaleX, scaleY, 0, 0, canvas.width, canvas.height);
    return canvas
}

export function centerImg(img, containerSize) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext("2d")
    const aspect = U.aspectRatio(img)
    const sizeX = U.isPortrate(img) ? U.calcWidth(containerSize, aspect) : containerSize
    const sizeY = U.isLandscape(img) ? U.calcHeight(containerSize, aspect) : containerSize
    const difX = U.isPortrate(img) ? (containerSize - sizeX) / 2 : 0
    const difY = U.isLandscape(img) ? (containerSize - sizeY) / 2 : 0

    canvas.height = canvas.width = containerSize
    context.drawImage(img, 0, 0, img.width, img.height, difX, difY, sizeX, sizeY);
    return canvas
}