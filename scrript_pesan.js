let totalHargaMakanan = 0;
let food = [
    {
        name: `Rawon`,
        harga: 20000,
        kategori: 'makanan',
        image: './assets/img/menu/rawon.jpg'
    },
    {
        name: `Soto Betawi`,
        harga: 60000,
        kategori: 'makanan',
        image: './assets/img/menu/sotobetawi.jpg'
    },
    {
        name: `Krupuk`,
        harga: 2500,
        kategori: 'makanan',
        image: './assets/img/menu/kerupuk_putih.jpg'
    },
    {
        name: `Telur Asin`,
        harga: 70000,
        kategori: 'makanan',
        image: './assets/img/menu/telor_asin.jpg'
    },
    {
        name: `Es Teh Manis`,
        harga: 20000,
        kategori: 'minuman',
        image: './assets/img/menu/es_teh_manis.jpg'
    }
];

let cart = [];
let pembelian = [];
let customerDetails = {
    name: '',
    room: ''
};

// Function to convert numbers into Rupiah format
function toRupiah(harga) {
    return harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Add an item to the cart
function addtoCart(index) {
    let selectedFood = food[index];
    let hasExist = false;

    // Check if the item is already in the cart
    cart.forEach(item => {
        if (item.name === selectedFood.name) {
            item.jumlah++; // If exists, increase the quantity
            totalHargaMakanan += item.harga; // Update total
            hasExist = true;
        }
    });

    // If it's a new item, add it to the cart
    if (!hasExist) {
        cart.push({
            name: selectedFood.name,
            harga: selectedFood.harga,
            jumlah: 1,
            image: selectedFood.image
        });
        totalHargaMakanan += selectedFood.harga;
    }

    // Update the data display
    generateData();
    document.getElementById('cartList').style.display = 'inline-block'; // Show cart
}

// Remove an item from the cart
function removeFood(value) {
    if (cart[value].jumlah > 1) {
        cart[value].jumlah--; // Reduce quantity
        totalHargaMakanan -= cart[value].harga; // Adjust total
    } else {
        totalHargaMakanan -= cart[value].harga; // Remove the item fully
        cart.splice(value, 1);
    }

    // Update the cart display after removing
    generateData();
    if (cart.length === 0) {
        document.getElementById('cartList').style.display = 'none'; // Hide cart if empty
    }
}

// Get customer name and room number
function getCustomerDetails() {
    customerDetails.name = document.getElementById('customerName').value;
    customerDetails.room = document.getElementById('roomNumber').value;
}

// Order function that handles the completion of the order
// Fungsi untuk memesan makanan
function orderFood() {
    getCustomerDetails(); // Mengambil informasi pelanggan

    // Memastikan nama dan nomor kamar telah diisi
    if (customerDetails.name === '' || customerDetails.room === '') {
        alert('Nama dan No Kamar harus diisi sebelum melakukan pesanan!');
        return;
    }

    // Nomor WhatsApp tujuan (gunakan format internasional tanpa tanda '+')
    const whatsappNumber = "6281280734718";

    // Membuat pesan WhatsApp dengan format menggunakan \n untuk baris baru
    let message = `📦 PESANAN BARU 📦\n\n`;
    message += `📝 Nama: ${customerDetails.name}\n`;
    message += `🚪 No Kamar: ${customerDetails.room}\n\n`;

    if (cart.length > 0) {
        message += `🍽️ Detail Pesanan:\n`;
        cart.forEach(item => {
            message += `- ${item.name} x${item.jumlah} = Rp${toRupiah(item.harga * item.jumlah)}\n`;
        });
    } else {
        message += `🚫 Tidak ada item yang dipesan.\n`;
    }

    message += `\n💰 Total Harga: Rp${toRupiah(totalHargaMakanan)},00\n\n`;
    message += `Terima kasih telah memesan! 🙏`;

    // Encode pesan dengan encodeURIComponent
    const encodedMessage = encodeURIComponent(message);

    // Membuat URL WhatsApp dengan teks yang telah di-encode
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Membuka WhatsApp di tab yang sama
    window.location.href = whatsappURL;

    // Menyimpan pesanan, mengosongkan keranjang, dan memperbarui tampilan
    pembelian.push([...cart]);
    totalHargaMakanan = 0;
    cart = [];
    generateData();
}




// Function to generate the dynamic data for both food list and cart
function generateData() {
    const foodList = document.getElementById('foodList');
    const cartList = document.getElementById('cartList');
    foodList.innerHTML = ''; // Clear food list
    cartList.innerHTML = ''; // Clear cart list

    const makananList = document.createElement('div');
    makananList.innerHTML = '<h2>Makanan</h2>';

    const minumanList = document.createElement('div');
    minumanList.innerHTML = '<h2>Minuman</h2>';

    // Loop over the food items and create a visual representation
    food.forEach((item, index) => {
        let divCard = document.createElement('div');
        divCard.classList.add('card');

        let imageData = document.createElement('img');
        imageData.setAttribute("src", item.image);
        divCard.appendChild(imageData);

        let title = document.createElement('p');
        title.innerHTML = item.name;
        divCard.appendChild(title);

        let divAction = document.createElement('div');
        divAction.classList.add('action');

        let spanData = document.createElement('span');
        spanData.innerHTML = `Rp ${toRupiah(item.harga)},00`;
        divAction.appendChild(spanData);

        let buttonAdd = document.createElement('button');
        buttonAdd.innerHTML = 'Pesan';
        buttonAdd.setAttribute('onclick', `addtoCart(${index})`);
        divAction.appendChild(buttonAdd);

        divCard.appendChild(divAction);

        if (item.kategori === 'makanan') {
            makananList.appendChild(divCard);
        } else if (item.kategori === 'minuman') {
            minumanList.appendChild(divCard);
        }
    });

    foodList.appendChild(makananList);
    foodList.appendChild(minumanList);

    // Display the cart content if there are any items
    if (cart.length > 0) {
        cart.forEach((item, index) => {
            let divCard = document.createElement('div');
            divCard.classList.add('card-order');

            let detailDiv = document.createElement('div');
            detailDiv.classList.add('detail');

            let image = document.createElement('img');
            image.setAttribute("src", item.image);
            detailDiv.appendChild(image);

            let foodName = document.createElement('p');
            foodName.textContent = item.name;
            detailDiv.appendChild(foodName);

            let jumlah = document.createElement('span');
            jumlah.textContent = ` x${item.jumlah}`;
            detailDiv.appendChild(jumlah);

            divCard.appendChild(detailDiv);

            let buttonRemove = document.createElement('button');
            buttonRemove.setAttribute('onclick', `removeFood(${index})`);
            buttonRemove.innerHTML = 'Hapus';
            divCard.appendChild(buttonRemove);

            cartList.appendChild(divCard);
        });
    }

    // Display the total price
    let totalDiv = document.createElement('div');
    totalDiv.classList.add('total');

    let totalh1 = document.createElement('h1');
    totalh1.textContent = `TOTAL: Rp${toRupiah(totalHargaMakanan)},00`;
    totalDiv.appendChild(totalh1);

    let divbutton = document.createElement('div');
    divbutton.classList.add("card-finish");

    cartList.appendChild(totalDiv);

    // Create customer name and room input fields
    let inputDiv = document.createElement('div');
    inputDiv.classList.add('input-fields');

    let nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('placeholder', 'Nama Anda');
    nameInput.setAttribute('id', 'customerName');
    nameInput.addEventListener('input', () => {
        nameInput.value = nameInput.value.replace(/[^a-zA-Z\s]/g, '');
    });
    inputDiv.appendChild(nameInput);

    let roomInput = document.createElement('input');
    roomInput.setAttribute('type', 'text');
    roomInput.setAttribute('placeholder', 'No Kamar');
    roomInput.setAttribute('id', 'roomNumber');
    roomInput.addEventListener('input', () => {
        roomInput.value = roomInput.value.replace(/[^0-9]/g, '').slice(0, 3);
    });
    inputDiv.appendChild(roomInput);


    cartList.appendChild(inputDiv);

    // Create the "Order Now" button
    let buttonOrder = document.createElement('button');
    buttonOrder.setAttribute('onclick', 'orderFood()');
    buttonOrder.innerHTML = 'ORDER SEKARANG';
    divbutton.appendChild(buttonOrder);

    cartList.appendChild(divbutton);
}

// Initial call to display the food items and cart
generateData();
