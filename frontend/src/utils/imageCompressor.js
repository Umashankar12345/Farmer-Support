/**
 * Resizes and compresses image files on client-side before sending to server
 * @param {File} file - Raw File object from <input type="file">
 * @param {number} maxWidth - Max pixel width (default 800)
 * @param {number} quality - Compression quality (0.1 to 1.0)
 * @returns {Promise<{blob: Blob, originalSizeKB: number, compressedSizeKB: number}>}
 */
export function compressLeafImage(file, maxWidth = 800, quality = 0.75) {
  return new Promise((resolve, reject) => {
    const originalSizeKB = (file.size / 1024).toFixed(1);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return reject(new Error("Canvas to Blob conversion failed."));
            }
            const compressedSizeKB = (blob.size / 1024).toFixed(1);
            resolve({
              blob,
              originalSizeKB: Number(originalSizeKB),
              compressedSizeKB: Number(compressedSizeKB)
            });
          },
          "image/jpeg",
          quality
        );
      };

      img.onerror = (err) => reject(err);
    };

    reader.onerror = (err) => reject(err);
  });
}
