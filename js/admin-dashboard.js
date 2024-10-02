// admin-dashboard.js
import { db, auth } from "./firebase-init.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const pengajuanList = document.getElementById("pengajuan-list");

onAuthStateChanged(auth, (user) => {
    if (user) {
        getDocs(collection(db, "pengajuan"))
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    pengajuanList.innerHTML += `
                        <div>
                            <h3>${data.namaProyek}</h3>
                            <p>${data.deskripsiProyek}</p>
                            <p>Status: ${data.status}</p>
                            <a href="${data.dokumenURL}" target="_blank">Lihat Dokumen</a>
                        </div>
                    `;
                });
            })
            .catch((error) => {
                console.error("Error getting documents: ", error);
            });
    } else {
        window.location.href = "login.html";
    }
});

const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "login.html";
    });
});
