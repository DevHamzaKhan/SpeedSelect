import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const Jobs = () => {
    const [pdfs, setPdfs] = useState([]);

    useEffect(() => {
        const fetchPdfs = async () => {
            try {
                const userDocRef = doc(db, "Data", auth.currentUser.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setPdfs(userData.pdfs || []);
                }
            } catch (error) {
                console.error("Error fetching PDFs:", error);
            }
        };

        fetchPdfs();
    }, []);

    return (
        <div className={`flex-1`}>
            <h1>Jobs Page</h1>
            {pdfs.length > 0 ? (
                <ul>
                    {pdfs}
                </ul>
            ) : (
                <p>No PDFs uploaded.</p>
            )}
        </div>
    );
};

export default Jobs;
