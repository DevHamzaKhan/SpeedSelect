import { storage } from "../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import convertPdfToImages from "../utils/PDFConverter";

/**
 * Fetches all jobs from the storage and converts PDF files to images.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of job objects.
 * @throws {Error} If there is an error fetching or converting the jobs.
 */
const fetchAllJobs = async () => {
    const rootRef = ref(storage, "R");

    const newJobs = [];

    try {
        const rootSnapshot = await listAll(rootRef);

        for (const folderRef of rootSnapshot.prefixes) {
            const folderSnapshot = await listAll(folderRef);

            for (const fileRef of folderSnapshot.items) {
                const fileUrl = await getDownloadURL(fileRef);
                const imageUrls = await convertPdfToImages(fileUrl);

                if (imageUrls.length > 0) {
                    newJobs.push({
                        pdfUrl: fileUrl,
                        pdfName: fileRef.name,
                        imageUrls: imageUrls,
                    });
                }
            }
        }
    } catch (err) {
        console.error("Error fetching jobs:", err);
        throw new Error("Failed to load jobs.");
    }

    return newJobs;
};

export default fetchAllJobs;
