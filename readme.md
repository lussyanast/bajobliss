## Dokumentasi API

### Deskripsi

API ini menyediakan layanan untuk mengelola berbagai data, seperti user, transaction, shipment, products, dan lain-lain.

### Endpoint

*Auth*

- *Login*
  - *Method:* GET
  - *Path:* /auth/login
  - *Parameters:*
    - username: Username pengguna (required)
    - password: Password pengguna (required)
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
      - Body:
        json
        {
          "token": "token_akses" 
        }
        
    - Jika gagal:
      - Status code: 401 Unauthorized
      - Body:
        json
        {
          "message": "Username atau password salah."
        }
        
- *Register*
  - *Method:* POST
  - *Path:* /auth/register
  - *Parameters:*
    - username: Username pengguna (required)
    - password: Password pengguna (required)
    - email: Email pengguna (required)
    - nama: Nama pengguna (required)
  - *Response:*
    - Jika berhasil:
      - Status code: 201 Created
    - Jika gagal:
      - Status code: 400 Bad Request
      - Body:
        json
        {
          "message": "Username sudah terdaftar."
        }
        

*Users*

- *Get User*
  - *Method:* GET
  - *Path:* /users/{userId}
  - *Parameters:*
    - userId: ID pengguna (required)
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
      - Body:
        json
        {
          "id": "userId",
          "username": "username",
          "email": "email",
          "nama": "nama",
          // ... (data user lainnya)
        }
        
    - Jika gagal:
      - Status code: 404 Not Found
      - Body:
        json
        {
          "message": "Pengguna tidak ditemukan."
        }
        
- *Update User*
  - *Method:* PUT
  - *Path:* /users/{userId}
  - *Parameters:*
    - userId: ID pengguna (required)
  - *Body:*
    json
    {
      "username": "username",
      "email": "email",
      "nama": "nama",
      // ... (data user yang ingin diubah)
    }
    
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
    - Jika gagal:
      - Status code: 400 Bad Request
      - Body:
        json
        {
          "message": "Username sudah terdaftar."
        }
        
- *Delete User*
  - *Method:* DELETE
  - *Path:* /users/{userId}
  - *Parameters:*
    - userId: ID pengguna (required)
  - *Response:*
    - Jika berhasil:
      - Status code: 204 No Content
    - Jika gagal:
      - Status code: 404 Not Found
      - Body:
        json
        {
          "message": "Pengguna tidak ditemukan."
        }
        

*User Addresses*

- *Get User Addresses*
  - *Method:* GET
  - *Path:* /users/{userId}/addresses
  - *Parameters:*
    - userId: ID pengguna (required)
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
      - Body:
        json
        [
          {
            "id": "addressId",
            "alamat": "alamat",
            "kota": "kota",
            "provinsi": "provinsi",
            "negara": "negara",
            "kode_pos": "kodePos"
          },
          // ... (alamat lainnya)
        ]
        
    - Jika gagal:
      - Status code: 404 Not Found
      - Body:
        json
        {
          "message": "Pengguna tidak ditemukan."
        }
        
- *Add User Address*
  - *Method:* POST
  - *Path:* /users/{userId}/addresses
  - *Parameters:*
    - userId: ID pengguna (required)
  - *Body:*
    json
    {
      "alamat": "alamat",
      "kota": "kota",
      "provinsi": "provinsi",
      "negara": "negara",
      "kode_pos": "kodePos"
    }
    
  - *Response:*
    - Jika berhasil:
      - Status code: 201 Created
      - Body:
        json
        {
          "id": "addressId"
        }
        
    - Jika gagal:
      - Status code: 400 Bad Request
      - Body:
        json
        {
          "message": "Data alamat tidak valid."
        }
        
- *Update User Address*
  - *Method:* PUT
  - *Path:* /users/{userId}/addresses/{addressId}
  - *Parameters:*
    - userId: ID pengguna (required)
    - addressId: ID alamat (required)
  - *Body:*
    json
    {
      "alamat": "alamat",
      "kota": "kota",
      "provinsi": "provinsi",
      "negara": "negara",
      "kode_pos": "kodePos"
    }
    
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
    - Jika gagal:
      - Status code: 400 Bad Request
      - Body:
        json
        {
          "message": "Data alamat tidak valid."
        }
        
- *Delete User Address*
  - *Method:* DELETE
  - *Path:* /users/{userId}/addresses/{addressId}
  - *Parameters:*
    - userId: ID pengguna (required)
    - addressId: ID alamat (required)
  - *Response:*
    - Jika berhasil:
      - Status code: 204 No Content
    - Jika gagal:
      - Status code: 404 Not Found
      - Body:
        json
        {
          "message": "Alamat tidak ditemukan."
        }
        

*Transactions*

- *Get Transactions*
  - *Method:* GET
  - *Path:* /transactions
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
      - Body:
        json
        [
          {
            "id": "transactionId",
            "total": "totalHarga",
            "status": "statusTransaksi",
            // ... (data transaksi lainnya)
          },
          // ... (transaksi lainnya)
        ]
        
- *Create Transaction*
  - *Method:* POST
  - *Path:* /transactions
  - *Body:*
    json
    {
      "items": [
        {
          "productId": "productId",
          "qty": "jumlah"
        }
        // ... (item lainnya)
      ],
      "addressId": "addressId",
      "paymentMethod": "metodePembayaran",
      "voucherId": "voucherId"
    }
    
  - *Response:*
    - Jika berhasil:
      - Status code: 201 Created
      - Body:
        json
        {
          "id": "transactionId"
        }
        
    - Jika gagal:
      - Status code: 400 Bad Request
      - Body:
        json
        {
          "message": "Data transaksi tidak valid."
        }
        
- *Get Transaction*
  - *Method:* GET
  - *Path:* /transactions/{transactionId}
  - *Parameters:*
    - transactionId: ID transaksi (required)
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
      - Body:
        json
        {
          "id": "transactionId",
          "total": "totalHarga",
          "status": "statusTransaksi",
          // ... (data transaksi lainnya)
        }
        
    - Jika gagal:
      - Status code: 404 Not Found
      - Body:
        json
        {
          "message": "Transaksi tidak ditemukan."
        }
        
- *Update Transaction*
  - *Method:* PUT
  - *Path:* /transactions/{transactionId}
  - *Parameters:*
    - transactionId: ID transaksi (required)
  - *Body:*
    json
    {
      "status": "statusTransaksi"
    }
    
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
    - Jika gagal:
      - Status code: 400 Bad Request
      - Body:
        json
        {
          "message": "Data transaksi tidak valid."
        }
        
- *Delete Transaction*
  - *Method:* DELETE
  - *Path:* /transactions/{transactionId}
  - *Parameters:*
    - transactionId: ID transaksi (required)
  - *Response:*
    - Jika berhasil:
      - Status code: 204 No Content
    - Jika gagal:
      - Status code: 404 Not Found
      - Body:
        json
        {
          "message": "Transaksi tidak ditemukan."
        }
        

*Shipments*

- *Get Shipments*
  - *Method:* GET
  - *Path:* /shipments
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
      - Body:
        json
        [
          {
            "id": "shipmentId",
            "transactionId": "transactionId",
            "status": "statusPengiriman",
            // ... (data pengiriman lainnya)
          },
          // ... (pengiriman lainnya)
        ]
        
- *Create Shipment*
  - *Method:* POST
  - *Path:* /shipments
  - *Body:*
    json
    {
      "transactionId": "transactionId",
      "addressId": "addressId",
      "shipmentMethod": "metodePengiriman",
      "courier": "kurir",
      "trackingNumber": "nomorResi"
    }
    
  - *Response:*
    - Jika berhasil:
      - Status code: 201 Created
      - Body:
        json
        {
          "id": "shipmentId"
        }
        
    - Jika gagal:
      - Status code: 400 Bad Request
      - Body:
        json
        {
          "message": "Data pengiriman tidak valid."
        }
        
- *Get Shipment*
  - *Method:* GET
  - *Path:* /shipments/{shipmentId}
  - *Parameters:*
    - shipmentId: ID pengiriman (required)
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
      - Body:
        json
        {
          "id": "shipmentId",
          "transactionId": "transactionId",
          "status": "statusPengiriman",
          // ... (data pengiriman lainnya)
        }
        
    - Jika gagal:
      - Status code: 404 Not Found
      - Body:
        json
        {
          "message": "Pengiriman tidak ditemukan."
        }
        
- *Update Shipment*
  - *Method:* PUT
  - *Path:* /shipments/{shipmentId}
  - *Parameters:*
    - shipmentId: ID pengiriman (required)
  - *Body:*
    json
    {
      "status": "statusPengiriman",
      "trackingNumber": "nomorResi"
    }
    
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
    - Jika gagal:
      - Status code: 400 Bad Request
      - Body:
        json
        {
          "message": "Data pengiriman tidak valid."
        }
        
- *Delete Shipment*
  - *Method:* DELETE
  - *Path:* /shipments/{shipmentId}
  - *Parameters:*
    - shipmentId: ID pengiriman (required)
  - *Response:*
    - Jika berhasil:
      - Status code: 204 No Content
    - Jika gagal:
      - Status code: 404 Not Found
      - Body:
        json
        {
          "message": "Pengiriman tidak ditemukan."
        }
        

*Products*

- *Get Products*
  - *Method:* GET
  - *Path:* /products
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
      - Body:
        json
        [
          {
            "id": "productId",
            "nama": "namaProduk",
            "harga": "harga",
            "gambar": "urlGambar",
            "categoryId": "categoryId",
            "deskripsi": "deskripsiProduk"
          },
          // ... (produk lainnya)
        ]
        
- *Create Product*
  - *Method:* POST
  - *Path:* /products
  - *Body:*
    json
    {
      "nama": "namaProduk",
      "harga": "harga",
      "gambar": "urlGambar",
      "categoryId": "categoryId",
      "deskripsi": "deskripsiProduk"
    }
    
  - *Response:*
    - Jika berhasil:
      - Status code: 201 Created
      - Body:
        json
        {
          "id": "productId"
        }
        
    - Jika gagal:
      - Status code: 400 Bad Request
      - Body:
        json
        {
          "message": "Data produk tidak valid."
        }
        
- *Get Product*
  - *Method:* GET
  - *Path:* /products/{productId}
  - *Parameters:*
    - productId: ID produk (required)
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
      - Body:
        json
        {
          "id": "productId",
          "nama": "namaProduk",
          "harga": "harga",
          "gambar": "urlGambar",
          "categoryId": "categoryId",
          "deskripsi": "deskripsiProduk"
        }
        
    - Jika gagal:
      - Status code: 404 Not Found
      - Body:
        json
        {
          "message": "Produk tidak ditemukan."
        }
        
- *Update Product*
  - *Method:* PUT
  - *Path:* /products/{productId}
  - *Parameters:*
    - productId: ID produk (required)
  - *Body:*
    json
    {
      "nama": "namaProduk",
      "harga": "harga",
      "gambar": "urlGambar",
      "categoryId": "categoryId",
      "deskripsi": "deskripsiProduk"
    }
    
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
    - Jika gagal:
      - Status code: 400 Bad Request
      - Body:
        json
        {
          "message": "Data produk tidak valid."
        }
        
- *Delete Product*
  - *Method:* DELETE
  - *Path:* /products/{productId}
  - *Parameters:*
    - productId: ID produk (required)
  - *Response:*
    - Jika berhasil:
      - Status code: 204 No Content
    - Jika gagal:
      - Status code: 404 Not Found
      - Body:
        json
        {
          "message": "Produk tidak ditemukan."
        }
        

*Categories*

- *Get Categories*
  - *Method:* GET
  - *Path:* /products/categories
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
      - Body:
        json
        [
          {
            "id": "categoryId",
            "nama": "namaKategori"
          },
          // ... (kategori lainnya)
        ]
        
- *Create Category*
  - *Method:* POST
  - *Path:* /products/categories
  - *Body:*
    json
    {
      "nama": "namaKategori"
    }
    
  - *Response:*
    - Jika berhasil:
      - Status code: 201 Created
      - Body:
        json
        {
          "id": "categoryId"
        }
        
    - Jika gagal:
      - Status code: 400 Bad Request
      - Body:
        json
        {
          "message": "Data kategori tidak valid."
        }
        
- *Get Category*
  - *Method:* GET
  - *Path:* /products/categories/{categoryId}
  - *Parameters:*
    - categoryId: ID kategori (required)
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
      - Body:
        json
        {
          "id": "categoryId",
          "nama": "namaKategori"
        }
        
    - Jika gagal:
      - Status code: 404 Not Found
      - Body:
        json
        {
          "message": "Kategori tidak ditemukan."
        }
        
- *Update Category*
  - *Method:* PUT
  - *Path:* /products/categories/{categoryId}
  - *Parameters:*
    - categoryId: ID kategori (required)
  - *Body:*
    json
    {
      "nama": "namaKategori"
    }
    
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
    - Jika gagal:
      - Status code: 400 Bad Request
      - Body:
        json
        {
          "message": "Data kategori tidak valid."
        }
        
- *Delete Category*
  - *Method:* DELETE
  - *Path:* /products/categories/{categoryId}
  - *Parameters:*
    - categoryId: ID kategori (required)
  - *Response:*
    - Jika berhasil:
      - Status code: 204 No Content
    - Jika gagal:
      - Status code: 404 Not Found
      - Body:
        json
        {
          "message": "Kategori tidak ditemukan."
        }
        
- *Get Products By Category*
  - *Method:* GET
  - *Path:* /products/categories/{categoryId}/products
  - *Parameters:*
    - categoryId: ID kategori (required)
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
      - Body:
        json
        [
          {
            "id": "productId",
            "nama": "namaProduk",
            "harga": "harga",
            "gambar": "urlGambar",
            "categoryId": "categoryId",
            "deskripsi": "deskripsiProduk"
          },
          // ... (produk lainnya)
        ]
        
    - Jika gagal:
      - Status code: 404 Not Found
      - Body:
        json
        {
          "message": "Kategori tidak ditemukan."
        }
        

*Wishlists*

- *Get User Wishlist*
  - *Method:* GET
  - *Path:* /users/{userId}/wishlist
  - *Parameters:*
    - userId: ID pengguna (required)
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
      - Body:
        json
        [
          {
            "productId": "productId" 
          },
          // ... (produk wishlist lainnya)
        ]
        
    - Jika gagal:
      - Status code: 404 Not Found
      - Body:
        json
        {
          "message": "Pengguna tidak ditemukan."
        }
        
- *Add To Wishlist*
  - *Method:* POST
  - *Path:* /users/{userId}/wishlist
  - *Parameters:*
    - userId: ID pengguna (required)
  - *Body:*
    json
    {
      "productId": "productId" 
    }
    
  - *Response:*
    - Jika berhasil:
      - Status code: 201 Created
    - Jika gagal:
      - Status code: 400 Bad Request
      - Body:
        json
        {
          "message": "Data produk tidak valid."
        }
        
- *Remove From Wishlist*
  - *Method:* DELETE
  - *Path:* /users/{userId}/wishlist/{productId}
  - *Parameters:*
    - userId: ID pengguna (required)
    - productId: ID produk (required)
  - *Response:*
    - Jika berhasil:
      - Status code: 204 No Content
    - Jika gagal:
      - Status code: 404 Not Found
      - Body:
        json
        {
          "message": "Produk tidak ditemukan di wishlist."
        }
        

*Vouchers*

- *Get Vouchers*
  - *Method:* GET
  - *Path:* /vouchers
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
      - Body:
        json
        [
          {
            "id": "voucherId",
            "kode": "kodeVoucher",
            "diskon": "nilaiDiskon",
            "minimal_pembelian": "minimalPembelian"
          },
          // ... (voucher lainnya)
        ]
        
- *Create Voucher*
  - *Method:* POST
  - *Path:* /vouchers
  - *Body:*
    json
    {
      "kode": "kodeVoucher",
      "diskon": "nilaiDiskon",
      "minimal_pembelian": "minimalPembelian"
    }
    
  - *Response:*
    - Jika berhasil:
      - Status code: 201 Created
      - Body:
        json
        {
          "id": "voucherId"
        }
        
    - Jika gagal:
      - Status code: 400 Bad Request
      - Body:
        json
        {
          "message": "Data voucher tidak valid."
        }
        
- *Get Voucher*
  - *Method:* GET
  - *Path:* /vouchers/{voucherId}
  - *Parameters:*
    - voucherId: ID voucher (required)
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
      - Body:
        json
        {
          "id": "voucherId",
          "kode": "kodeVoucher",
          "diskon": "nilaiDiskon",
          "minimal_pembelian": "minimalPembelian"
        }
        
    - Jika gagal:
      - Status code: 404 Not Found
      - Body:
        json
        {
          "message": "Voucher tidak ditemukan."
        }
        

*Reviews*

- *Get Product Reviews*
  - *Method:* GET
  - *Path:* /products/{productId}/reviews
  - *Parameters:*
    - productId: ID produk (required)
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
      - Body:
        json
        [
          {
            "id": "reviewId",
            "userId": "userId",
            "rating": "nilaiRating",
            "komentar": "komentarReview"
          },
          // ... (review lainnya)
        ]
        
    - Jika gagal:
      - Status code: 404 Not Found
      - Body:
        json
        {
          "message": "Produk tidak ditemukan."
        }
        
- *Create Review*
  - *Method:* POST
  - *Path:* /products/{productId}/reviews
  - *Parameters:*
    - productId: ID produk (required)
  - *Body:*
    json
    {
      "rating": "nilaiRating",
      "komentar": "komentarReview"
    }
    
  - *Response:*
    - Jika berhasil:
      - Status code: 201 Created
      - Body:
        json
        {
          "id": "reviewId"
        }
        
    - Jika gagal:
      - Status code: 400 Bad Request
      - Body:
        json
        {
          "message": "Data review tidak valid."
        }
        
- *Get Review*
  - *Method:* GET
  - *Path:* /reviews/{reviewId}
  - *Parameters:*
    - reviewId: ID review (required)
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
      - Body:
        json
        {
          "id": "reviewId",
          "userId": "userId",
          "rating": "nilaiRating",
          "komentar": "komentarReview"
        }
        
    - Jika gagal:
      - Status code: 404 Not Found
      - Body:
        json
        {
          "message": "Review tidak ditemukan."
        }
        
- *Update Review*
  - *Method:* PUT
  - *Path:* /reviews/{reviewId}
  - *Parameters:*
    - reviewId: ID review (required)
  - *Body:*
    json
    {
      "rating": "nilaiRating",
      "komentar": "komentarReview"
    }
    
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
    - Jika gagal:
      - Status code: 400 Bad Request
      - Body:
        json
        {
          "message": "Data review tidak valid."
        }
        
- *Delete Review*
  - *Method:* DELETE
  - *Path:* /reviews/{reviewId}
  - *Parameters:*
    - reviewId: ID review (required)
  - *Response:*
    - Jika berhasil:
      - Status code: 204 No Content
    - Jika gagal:
      - Status code: 404 Not Found
      - Body:
        json
        {
          "message": "Review tidak ditemukan."
        }
        

*Feedback*

- *Get Feedbacks*
  - *Method:* GET
  - *Path:* /feedbacks
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
      - Body:
        json
        [
          {
            "id": "feedbackId",
            "userId": "userId",
            "komentar": "komentarFeedback"
          },
          // ... (feedback lainnya)
        ]
        
- *Create Feedback*
  - *Method:* POST
  - *Path:* /feedbacks
  - *Body:*
    json
    {
      "komentar": "komentarFeedback"
    }
    
  - *Response:*
    - Jika berhasil:
      - Status code: 201 Created
      - Body:
        json
        {
          "id": "feedbackId"
        }
        
    - Jika gagal:
      - Status code: 400 Bad Request
      - Body:
        json
        {
          "message": "Data feedback tidak valid."
        }
        

*Carts*

- *Get User Carts*
  - *Method:* GET
  - *Path:* /users/{userId}/carts
  - *Parameters:*
    - userId: ID pengguna (required)
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
      - Body:
        json
        [
          {
            "productId": "productId",
            "qty": "jumlah"
          },
          // ... (item cart lainnya)
        ]
        
    - Jika gagal:
      - Status code: 404 Not Found
      - Body:
        json
        {
          "message": "Pengguna tidak ditemukan."
        }
        
- *Add To Cart*
  - *Method:* POST
  - *Path:* /users/{userId}/carts
  - *Parameters:*
    - userId: ID pengguna (required)
  - *Body:*
    json
    {
      "productId": "productId",
      "qty": "jumlah"
    }
    
  - *Response:*
    - Jika berhasil:
      - Status code: 201 Created
    - Jika gagal:
      - Status code: 400 Bad Request
      - Body:
        json
        {
          "message": "Data produk tidak valid."
        }
        
- *Update Cart Item*
  - *Method:* PUT
  - *Path:* /users/{userId}/carts/{productId}
  - *Parameters:*
    - userId: ID pengguna (required)
    - productId: ID produk (required)
  - *Body:*
    json
    {
      "qty": "jumlah"
    }
    
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
    - Jika gagal:
      - Status code: 400 Bad Request
      - Body:
        json
        {
          "message": "Data produk tidak valid."
        }
        
- *Remove From Cart*
  - *Method:* DELETE
  - *Path:* /users/{userId}/carts/{productId}
  - *Parameters:*
    - userId: ID pengguna (required)
    - productId: ID produk (required)
  - *Response:*
    - Jika berhasil:
      - Status code: 204 No Content
    - Jika gagal:
      - Status code: 404 Not Found
      - Body:
        json
        {
          "message": "Produk tidak ditemukan di cart."
        }
        

*Channels*

- *Get Channels*
  - *Method:* GET
  - *Path:* /channels
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
      - Body:
        json
        [
          {
            "id": "channelId",
            "nama": "namaChannel"
          },
          // ... (channel lainnya)
        ]
        

*Shipment Masters*

- *Get Shipment Masters*
  - *Method:* GET
  - *Path:* /shipment-masters
  - *Response:*
    - Jika berhasil:
      - Status code: 200 OK
      - Body:
        json
        [
          {
            "id": "shipmentMasterId",
            "nama": "namaMasterPengiriman"
          },
          // ... (shipment master lainnya)
        ]
        
- *Create Shipment Master*
  - *Method:* POST
  - *Path:* /shipment-masters
  - *Body:*
    json
    {
      "nama": "namaMasterPengiriman"
    }
    
  - *Response:*
    - Jika berhasil:
      - Status code: 201 Created
      - Body:
        json
        {
          "id": "shipmentMasterId"
        }
        
    - Jika gagal:
      - Status code: 400 Bad Request
      - Body:
        json
        {
          "message": "Data shipment master tidak valid."
        }
        

### Contoh Penggunaan

bash
# Login
curl -X GET "http://localhost:3000/auth/login?username=user1&password=password"

# Get User
curl -X GET "http://localhost:3000/users/1"

# Create Transaction
curl -X POST "http://localhost:3000/transactions" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "productId": "1",
        "qty": 2
      },
      {
        "productId": "2",
        "qty": 1
      }
    ],
    "addressId": "1",
    "paymentMethod": "credit_card",
    "voucherId": "1"
  }'


### Catatan

-  *Authentication:*  API ini menggunakan JWT (JSON Web Token) untuk autentikasi. Token akses harus dikirimkan di header Authorization dengan format Bearer token.
-  *Error Handling:*  API ini mengembalikan status code HTTP untuk menunjukkan hasil request. Status code 200 OK menunjukkan request berhasil, sedangkan status code 400 Bad Request atau 404 Not Found menunjukkan request gagal.