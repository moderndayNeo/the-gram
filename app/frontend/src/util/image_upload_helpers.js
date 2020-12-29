export const fetchImageFromFile = (file) => {
    return new Promise((resolve, reject) => {
        const fr = new FileReader();

        fr.onload = () => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject({ fileError: ["Upload failed: Only images may be posted"] });
            img.src = fr.result; // fr.result = base64 url
        };
        fr.readAsDataURL(file); // converts image to base64 url
    });
}