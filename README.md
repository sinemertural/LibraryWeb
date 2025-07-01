<img width="523" alt="Ekran Resmi 2025-07-01 09 19 22" src="https://github.com/user-attachments/assets/616ce9b9-e0b6-4e3d-bb0f-5b8049a7ad2e" />📚 LibraryWeb - Proje Gelişim Süreci

Bu projeyi geliştirirken belirlediğim yol haritası sayesinde, süreci planlı ve düzenli bir şekilde ilerlettim. Aşamalarım şu şekildedir:

1️⃣ Veritabanı Tasarımı
İlk adım olarak, projemin temelini oluşturan veritabanı tasarımını gerçekleştirdim.
📌 Veritabanı İlişkileri:

Book – Author: Bire çok (1:N) ilişki
Book – Publisher: Bire çok (1:N) ilişki
Book – BookType: Çoka çok (N:M) ilişki
Bu şema sayesinde, kaç tablo olduğunu, tabloların alanlarını ve aralarındaki ilişkileri net bir şekilde görebildim.
(Bu kısmı tablo şeması görseliyle destekleyebilirsin)

2️⃣ Backend Geliştirme
Backend geliştirmeyi Dotnet Framework kullanarak gerçekleştirdim.
✅ Veritabanı Bağlantısı:

appsettings.json dosyasında bağlantı bilgilerini tanımladım.
Docker üzerinde kurduğum SQL container üzerinden veritabanına erişim sağladım.
Program.cs dosyasında gerekli bağlantı yapılandırmalarını yaptım.
✅ Temiz Kod Mimarisi:
Projede okunabilirliği artırmak için aşağıdaki klasör yapılarını oluşturdum:

Services: Veritabanı işlemleri (AppDbContext.cs), şifre güvenliği (PasswordHasher.cs)
Models: Veritabanı tablolarını ve ilişkilerini barındıran sınıflar
Dtos: Yalnızca taşınacak verilerin tanımlı olduğu veri transfer nesneleri (ör. BookBookTypeDto.cs)
Controllers: HTTP istekleri ve yetkilendirme işlemlerinin yönetildiği denetleyiciler
✅ Özel Yapılar:

CORS: HTTP isteklerini kabul edebilmek için yapılandırıldı.
JWT Authentication: Kullanıcı doğrulama ve yetkilendirme sağlandı.
[Authorize] Attribute: Yalnızca admin yetkisi olan işlemler için kullanıldı.
✅ Swagger:
Tüm backend işlemlerini test etmek ve veri girişi yapmak için Swagger arayüzünden faydalandım.

✅ Authentication:

Kullanıcılar Register, Login ve Logout işlemleri gerçekleştirebilir.
isAdmin = true ile admin rolü atayıp, admin yetkilendirmesini sağladım.
3️⃣ Frontend Geliştirme
Kullanıcı arayüzünü React Framework ile oluşturdum.
📌 Proje Yapısı:

src/components klasöründe tüm bileşenleri oluşturdum.
public/images klasöründe projeye ait görselleri sakladım.
📌 Routing:
App.tsx dosyasında React Router ile sayfa yönlendirmelerini tanımladım.

📌 API Entegrasyonu:
Swagger API’sinden veri çekmek için fetch fonksiyonlarını yazdım.

POST, DELETE vb. HTTP metodları ile işlemleri yönettim.
📌 Kullandığım Hook ve Fonksiyonlar:

useState & useEffect: Veri akışı ve bileşen davranışlarını yönetti.
handleSubmit: Form verilerini backend’e gönderdi.
handleFetch: API verilerini güncel tuttu.
handleClose: Kullanıcı etkileşimini kolaylaştırdı.
🖥️ Kullanıcı ve Admin Arayüzü
Yeni kullanıcılar Sign In sayfasından kayıt oluşturabilir.
<img width="523" alt="Ekran Resmi 2025-07-01 09 19 22" src="https://github.com/user-attachments/assets/a8ae8f38-9843-49cc-9bd7-1d8be9b1b5ce" />
<img width="524" alt="Ekran Resmi 2025-07-01 09 19 37" src="https://github.com/user-attachments/assets/d4f88cd9-5af2-4ff8-b8a8-0bfd269ee4a6" />


Giriş yapan kullanıcılar anasayfaya yönlendirilir.
<img width="525" alt="Ekran Resmi 2025-07-01 09 19 44" src="https://github.com/user-attachments/assets/0f2e529c-7980-4539-b8d9-0038db2e9c77" />


Admin, ek olarak yeni kitap ekleyebilir, kitapları düzenleyebilir veya silebilir.
<img width="525" alt="Ekran Resmi 2025-07-01 09 19 52" src="https://github.com/user-attachments/assets/b55b8e6a-c588-4f4a-97b3-fdfb3e6157f6" />
<img width="521" alt="Ekran Resmi 2025-07-01 09 19 59" src="https://github.com/user-attachments/assets/c557000e-ad06-4291-b040-4ff4eed4cc6f" />


Admin silme işleminde uyarı mesajı alır.
<img width="524" alt="Ekran Resmi 2025-07-01 09 20 06" src="https://github.com/user-attachments/assets/e3b158bf-850d-4a4f-ae15-dee1ddb852e9" />

Normal kullanıcılar kitap listesini sadece görüntüler; ekleme, silme veya düzenleme yetkisi yoktur.
<img width="524" alt="Ekran Resmi 2025-07-01 09 20 06 kopyası" src="https://github.com/user-attachments/assets/1b756b01-55b4-4b19-8104-1596d690f038" />
