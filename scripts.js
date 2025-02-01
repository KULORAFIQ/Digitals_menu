document.getElementById("orderButton").addEventListener("click", function() {
    const roomNumber = document.getElementById("roomNumber").value.trim();

    if (!roomNumber) {
        alert("Harap masukkan nomor kamar Anda.");
        return;
    }

    // Ganti dengan nomor WhatsApp yang sesuai (gunakan format internasional tanpa tanda plus)
    const whatsappNumber = "6281280734718";  // Jangan gunakan tanda '+' pada nomor
    const message = `Halo, saya ingin memesan menu. Nomor kamar saya: ${roomNumber}`;
    const encodedMessage = encodeURIComponent(message); // Encode pesan dengan benar
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Membuka WhatsApp di tab baru dengan pesan otomatis
    window.location.href = whatsappURL;  // Gunakan window.location.href untuk membuka WhatsApp di tab yang sama

});

// Menambahkan fungsi kembali menggunakan JavaScript
document.getElementById("backButton").addEventListener("click", function() {
    window.history.back();  // Kembali ke halaman sebelumnya
});

function limitInput(input) {
    // Memotong input menjadi maksimal 3 angka
    if (input.value.length > 3) {
        input.value = input.value.slice(0, 3);
    }
}
