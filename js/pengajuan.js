// pengajuan.js
import { db, auth } from "./firebase-init.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";

const pengajuanForm = document.getElementById("pengajuan-form");

pengajuanForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const namaProyek = pengajuanForm.namaProyek.value;
    const deskripsiProyek = pengajuanForm.deskripsiProyek.value;
    const dokumen = pengajuanForm.dokumen.files[0];

    try {
        const docRef = await addDoc(collection(db, "pengajuan"), {
            namaProyek,
            deskripsiProyek,
            status: "Pending",
            dokumenURL: "uploading...",
        });
        const storageRef = ref(storage, `dokumen/${docRef.id}/${dokumen.name}`);
        await uploadBytes(storageRef, dokumen);
        const downloadURL = await getDownloadURL(storageRef);

        await updateDoc(docRef, { dokumenURL: downloadURL });
        alert("Pengajuan berhasil!");
    } catch (error) {
        console.error("Error submitting form: ", error);
    }
});
