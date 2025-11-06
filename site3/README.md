# site3 — BePay Presentation Site (static)

Bu klasörü vcard repo'sunun köküne `site3` adıyla koy. Örnek repo yapısı:
- vcard/
  - site3/
    - index.html
    - assets/
    - i18n/
    - README.md

Nasıl yayınlanır (GitHub Pages):
1. Repository ayarlarına (Settings → Pages) git.
2. Source olarak "main" branch ve "root" (ya da branch'in adı ne ise root) seçili olduğundan emin ol. (GitHub Pages şu anda only root veya /docs folder seçeneklerini destekler; eğer repo Pages root olarak ayarlanmışsa `site3` klasöründeki dosyalar `https://<kullanici>.github.io/Vcard/site3/` ile ulaşılabilir.)
3. Değişiklikleri push et ve birkaç dakika bekle. Site `https://serdarulu.github.io/Vcard/site3/` adresinde çalışacaktır.

Önemli notlar:
- `assets/logo.png`, `assets/hero.jpg`, `assets/favicon.png` gibi görselleri `site3/assets/` içine ekleyin.
- İletişim formu Formspree ile örnek konfigüre edilmiştir. Kendi form endpoint'inizi `index.html` form action içine koyun veya alternatif bir form servisi kullanın.
- PDF içeriğini otomatik olarak metin haline getirip sayfalara yerleştirmemi isterseniz, PDF metnini paylaş veya bu repo içine `site3/assets/BePayPresentation.pdf` olarak yükle; ben içeriği çıkarıp metin ve çeviriler ile güncellerim.
- Çeviriler şu anda makine çevirisi taslağıdır. Son düzenleme için lütfen kontrol edin.
