# 📚 LibraryWeb

Bu proje, kitap yönetimini kolaylaştırmak için geliştirilmiş bir web uygulamasıdır. Projede **Dotnet Framework** ile backend, **React** ile frontend geliştirilmiş ve temiz kod ilkeleriyle yapılandırılmıştır.

---

## 🚀 Proje Gelişim Süreci

### 1️⃣ Veritabanı Tasarımı

İlk adım olarak veritabanı şeması tasarlanmıştır.

**İlişkiler:**
- `Book – Author`: Bire çok (1:N)
- `Book – Publisher`: Bire çok (1:N)
- `Book – BookType`: Çoka çok (N:M)

Bu yapı sayesinde tablolar, alanlar ve ilişkiler net bir şekilde planlanmıştır.

![Veritabanı Şeması](https://github.com/user-attachments/assets/616ce9b9-e0b6-4e3d-bb0f-5b8049a7ad2e)

---

### 2️⃣ Backend Geliştirme

Backend geliştirme süreci **Dotnet Framework** kullanılarak tamamlanmıştır.

**🔗 Veritabanı Bağlantısı:**
- `appsettings.json` dosyasında bağlantı bilgileri tanımlandı.
- Docker üzerinde bir **SQL Container** kullanıldı.
- `Program.cs` içinde yapılandırmalar yapıldı.

**📂 Klasör Yapısı:**
- **Services:** Veritabanı işlemleri (`AppDbContext.cs`), şifreleme (`PasswordHasher.cs`)
- **Models:** Tablolar ve ilişkileri
- **Dtos:** Veri transfer nesneleri (ör. `BookBookTypeDto.cs`)
- **Controllers:** HTTP istekleri ve yetkilendirme işlemleri

**⚙️ Özel Yapılar:**
- **CORS:** HTTP isteklerini yönetir.
- **JWT Authentication:** Kimlik doğrulama sağlar.
- **[Authorize]:** Yalnızca admin yetkisi gerektiren işlemler için kullanılır.

**🧩 Swagger:**  
Backend işlemleri Swagger üzerinden test edilip veri girişleri yapılmıştır.

**🔑 Authentication:**
- Kullanıcılar `Register`, `Login` ve `Logout` işlemlerini gerçekleştirebilir.
- Admin yetkilendirmesi `isAdmin = true` ile sağlanmıştır.

---

### 3️⃣ Frontend Geliştirme

Frontend kısmı **React** ile hazırlanmıştır.

**📁 Yapı:**
- `src/components` içinde tüm bileşenler yer almaktadır.
- `public/images` klasöründe tüm görseller saklanmaktadır.

**🌐 Routing:**
- `App.tsx` içinde `React Router` ile yönlendirmeler yapılmıştır.

**🔗 API Entegrasyonu:**
- Backend verileri `fetch` fonksiyonları ile alınmıştır.
- `POST`, `DELETE` gibi HTTP metodları kullanılmıştır.

**⚙️ Kullanılan Hook/Fonksiyonlar:**
- `useState` & `useEffect`: Veri akışı yönetimi
- `handleSubmit`: Form verisi gönderimi
- `handleFetch`: API işlemleri
- `handleClose`: Kullanıcı etkileşimi

---

## 👥 Kullanıcı ve Admin Arayüzü

Yeni kullanıcılar **Sign In** sayfasından kayıt olabilir:

![Sign In](https://github.com/user-attachments/assets/a8ae8f38-9843-49cc-9bd7-1d8be9b1b5ce)

![Register](https://github.com/user-attachments/assets/d4f88cd9-5af2-4ff8-b8a8-0bfd269ee4a6)

Giriş yapan kullanıcılar anasayfaya yönlendirilir:

![Anasayfa](https://github.com/user-attachments/assets/0f2e529c-7980-4539-b8d9-0038db2e9c77)

Admin, yeni kitap ekleyebilir veya kitapları düzenleyip silebilir:

![Admin Kitap Ekle](https://github.com/user-attachments/assets/b55b8e6a-c588-4f4a-97b3-fdfb3e6157f6)
![Admin Kitap Düzenle](https://github.com/user-attachments/assets/c557000e-ad06-4291-b040-4ff4eed4cc6f)

Silme işleminde admin uyarı alır:

![Silme Uyarı](https://github.com/user-attachments/assets/e3b158bf-850d-4a4f-ae15-dee1ddb852e9)

Normal kullanıcılar yalnızca kitapları görüntüler:

![Kitap Liste](https://github.com/user-attachments/assets/1b756b01-55b4-4b19-8104-1596d690f038)

---
## 📌 Genel Bilgilendirme

LibraryWeb, temiz kod, modern mimari ve kullanıcı dostu arayüzüyle kitap yönetimini kolaylaştırmayı amaçlar.

---

**Teşekkürler! ✨**
