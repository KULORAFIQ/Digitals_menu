
// Ambil elemen hamburger dan navbar
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active'); // Tambahkan kelas active untuk tanda silang
    navMenu.classList.toggle('show'); // Tampilkan atau sembunyikan menu
});

//untuk slider
let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    // Hide all slides
    slides.forEach((slide, i) => {
        slide.style.display = (i === index) ? 'flex' : 'none';
    });

    // Increment index for next slide
    currentIndex = (index + 1) % totalSlides; // Loop back to first slide
}

// Show the first slide initially
showSlide(currentIndex);

// Change slides every 3 seconds
setInterval(() => {
    showSlide(currentIndex);
}, 3000);

//untuk gulir slide
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Mencegah perilaku default anchor

        const targetId = this.getAttribute('href'); // Mendapatkan id target dari href
        const targetElement = document.querySelector(targetId); // Menemukan elemen target

        if (targetElement) {
            // Menghitung jarak gulir
            const offsetTop = targetElement.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth' // Gulir halus
            });
        }
    });
});


function searchMenu() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const menuItems = document.querySelectorAll('.menu-item');
  const searchResults = document.getElementById('searchResults');

  // Kosongkan hasil pencarian sebelumnya
  searchResults.innerHTML = '';

  let found = false; // Menandai apakah ada hasil yang ditemukan

  menuItems.forEach(item => {
      const title = item.querySelector('h3').textContent.toLowerCase();
      if (title.includes(input) && input.trim() !== '') {
          found = true; // Menandai bahwa kita menemukan item
          const clonedItem = item.cloneNode(true); // Mengkloning item menu yang ditemukan
          searchResults.appendChild(clonedItem); // Menambahkan ke hasil pencarian
      }
  });

  // Jika tidak ada hasil yang ditemukan
  if (!found && input.trim() !== '') {
      searchResults.innerHTML = '<p>Menu tidak ditemukan.</p>';
  }
}

function showPopup(imageSrc, title, description) {
  const popup = document.getElementById("popup");
  const popupImage = document.getElementById("popupImage");
  const popupTitle = document.getElementById("popupTitle");
  const popupDescription = document.getElementById("popupDescription");

  popupImage.src = imageSrc; // Set gambar pop-up
  popupTitle.textContent = title; // Set judul pop-up
  popupDescription.textContent = description; // Set deskripsi pop-up

  popup.style.display = "flex"; // Tampilkan pop-up
}

function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none"; // Sembunyikan pop-up
}

// Script Pencarian untuk Makanan
const searchInput = document.getElementById("searchInput");
    const placeholderTexts = ["Soto", "Spaghetti", "Salad", "Pizza", "Nasi Goreng"];



    function typeAnimation() {
        let currentText = placeholderTexts[currentIndex];
        searchInput.placeholder = currentText.substring(0, currentChar);

        if (currentChar < currentText.length) {
            currentChar++;
        } else {
            // Pause for a while before deleting the text
            setTimeout(() => {
                currentChar = 0;
                currentIndex = (currentIndex + 1) % placeholderTexts.length;
            }, 1000);
        }

        setTimeout(typeAnimation, 150); // Speed of typing effect
    }

    typeAnimation();

    window.onscroll = function () {
        const scrollButton = document.getElementById("scrollToTop");
        if (document.documentElement.scrollTop > 200) {
          scrollButton.style.display = "block";
        } else {
          scrollButton.style.display = "none";
        }
      };
      
      function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
    
      // Array untuk menyimpan item yang ditambahkan ke keranjang
let cart = [];

// Fungsi untuk menambahkan item ke keranjang
function addToCart(itemName, price) {
    const item = { name: itemName, price: price };
    cart.push(item);

    // Update jumlah item di keranjang
    updateCartCount();
    
    alert(`${itemName} telah ditambahkan ke keranjang!`);
}

// Fungsi untuk memperbarui jumlah item di ikon keranjang
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

// Fungsi untuk membuka keranjang (tampilkan popup keranjang)
function openCart() {
    let cartContent = "Keranjang Anda:\n\n";
    cart.forEach((item, index) => {
        cartContent += `${index + 1}. ${item.name} - Rp.${item.price}\n`;
    });

    if (cart.length === 0) {
        cartContent = "Keranjang Anda kosong.";
    }

    alert(cartContent);
}

      
      // Fungsi untuk menghapus item dari keranjang
      function removeFromCart(itemName) {
          cart = cart.filter(item => item.name !== itemName);
          updateCartDisplay();
      }
      
      // Fungsi untuk toggle tampilan keranjang
      function toggleCartDetails() {
          const cartDetails = document.getElementById("cart-details");
          cartDetails.style.display = cartDetails.style.display === "block" ? "none" : "block";
      }
      

      // Ambil elemen DOM
const toggleForm = document.getElementById("toggleForm");
const popupForm = document.getElementById("popup-form");
const closeForm = document.getElementById("closeForm");
const overlay = document.getElementById("overlay");

// Event: Tampilkan pop-up
toggleForm.addEventListener("click", () => {
    popupForm.style.display = "block"; // Tampilkan pop-up
    overlay.style.display = "block"; // Tampilkan overlay
});

// Event: Tutup pop-up
closeForm.addEventListener("click", () => {
    popupForm.style.display = "none"; // Sembunyikan pop-up
    overlay.style.display = "none"; // Sembunyikan overlay
});

overlay.addEventListener("click", () => {
    popupForm.style.display = "none"; // Sembunyikan pop-up
    overlay.style.display = "none"; // Sembunyikan overlay
});

// Event: Kirim pesan WhatsApp
document.getElementById("orderButton").addEventListener("click", function() {
    const roomNumber = document.getElementById("roomNumber").value.trim();

    if (!roomNumber) {
        alert("Harap masukkan nomor kamar Anda.");
        return;
    }

    const whatsappNumber = "+6281280734718";
    const message = `Halo, saya ingin memesan menu. Nomor kamar saya: ${roomNumber}`;
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank"); // Buka WhatsApp
    popupForm.style.display = "none"; // Sembunyikan pop-up
    overlay.style.display = "none"; // Sembunyikan overlay
});


function redirectToPage() {
    var currentDate = new Date();
    var currentHour = currentDate.getHours();  // Mendapatkan jam saat ini

    if (currentHour >= 7 && currentHour < 21) {
        // Jam 7 pagi sampai jam 9 malam
        window.location.href = "pesan.html";  // Redirect ke pesan.html
    } else {
        // Jam 9 malam sampai jam 7 pagi
        window.location.href = "tutup.html";  // Redirect ke tutup.html
    }
}

// Set link sesuai waktu saat halaman dimuat
function checkTime() {
    var currentDate = new Date();
    var currentHour = currentDate.getHours();  // Mendapatkan jam saat ini
    var link = document.getElementById("pesanLink");

    if (currentHour >= 7 && currentHour < 21) {
        link.innerHTML = "Pesan Sekarang";  // Mengubah teks tombol
    } else {
        link.innerHTML = "tutup";  // Mengubah teks tombol
    }
}

window.onload = function() {
    checkTime();  // Set teks tombol berdasarkan waktu saat halaman dimuat
};