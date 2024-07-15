import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import * as pdfjsLib from '../../node_modules/pdfjs-dist/build/pdf.mjs';
pdfjsLib.GlobalWorkerOptions.workerSrc = "../../node_modules/pdfjs-dist/build/pdf.worker.mjs";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a PDF file to an array of image URLs.
 * @param {string} pdfUrl - The URL of the PDF file.
 * @returns {Promise<string[]>} - A promise that resolves to an array of image URLs.
 */
export async function convertPdfToImages(pdfUrl) {
  const imageUrls = [];

  // Fetch the PDF file and read as a blob using XMLHttpRequest
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  const blob = await new Promise((resolve, reject) => {
      xhr.onload = () => resolve(xhr.response);
      xhr.onerror = reject;
      xhr.open('GET', pdfUrl);
      xhr.send();
  });

  const reader = new FileReader();

  // Read the blob as data URL
  await new Promise((resolve, reject) => {
      reader.onload = () => resolve();
      reader.onerror = reject;
      reader.readAsDataURL(blob);
  });

  // Decode base64 PDF data
  const data = atob(reader.result.replace(/.*base64,/, ""));
  const pdf = await pdfjsLib.getDocument({ data }).promise;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Loop through each PDF page and convert to image
  for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1.5 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const render_context = {
          canvasContext: context,
          viewport: viewport,
      };
      await page.render(render_context).promise;
      const img = canvas.toDataURL("image/png");
      imageUrls.push(img);
  }

  return imageUrls;
}
