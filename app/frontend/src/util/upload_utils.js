export function isRotated(rotation) {
    return rotation !== 0 || (rotation / 360) % 2 !== 1
}

export function isRotatedRightAngle(rotation) {
    return (rotation / 90) % 2 === 1
}

export function isLandscape(img) {
    return img.width > img.height
}

export function isPortrate(img) {
    return img.width < img.height
}

export function isSquare(img) {
    return img.width === img.height
}

export function aspectRatio(img) {
    return img.width / img.height
}

export function calcHeight(width, aspectRatio) {
    return width / aspectRatio
}

export function calcWidth(height, aspectRatio) {
    return height * aspectRatio
}

export function fetchImageFromFile(file) {
    return new Promise((resolve, reject) => {
        const fr = new FileReader();

        fr.onload = () => {
            const img = new Image()
            img.onload = () => resolve(img)
            img.onerror = () => reject({fileError: ["Upload failed: Only images may be posted"]})
            img.src = fr.result; // fr.result = base64 url
        }
        fr.readAsDataURL(file); // converts image to base64 url
    });
}

export function createFileWithImage(img) {
    return new Promise((resolve, reject) => {
        img.toBlob((blob)=>{
            resolve(blob)
        }, "image/jpeg", 1);
    });

}1