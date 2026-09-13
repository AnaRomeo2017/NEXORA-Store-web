# مجلد ملفات التحميل

ضع هنا مثبّت NEXORA Store ليُخدَم من الموقع مباشرة:

```
public/downloads/NEXORA-Store-Setup-0.1.0.exe
```

المصدر في هذا المستودع:

```
F:\smart-pos-erp\dist-installers\NEXORA-Store-Setup-0.1.0.exe   (~129 MB)
```

بديل مُفضّل للإنتاج: ارفع المثبّت على تخزين خارجي (CDN / Release)
واضبط الرابط في `.env.local`:

```
NEXT_PUBLIC_NEXORA_WINDOWS_URL=https://example.com/NEXORA-Store-Setup-0.1.0.exe
```

> ملفات `.exe` و `.apk` مستثناة من Git (راجع `.gitignore`) لتجنّب رفع ملفات ضخمة.
