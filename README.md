<h1 align="center">سامانه‌ی مدیریت کتاب‌خانه - HellLib</h1>

این سامانه که فناوری‌های Django ،NextJs و Docker را به‌کار می‌گیرد توسط شماری از هنرجویان آموزشگاه علامه حلی ۷ (ورودی ۱۴۰۱-۱۴۰۲) برای استفاده‌ی این آموزشگاه طراحی شده است.

## پیش‌نیازها
- Docker
- Python >=3.11
## شیوه‌ی راه‌اندازی
- پرونده‌ی `env.example.` را کپی کرده و آن را با نام `env.` در پوشه‌ی برنامه بگذارید.
- وارد پوشه‌ی `backend‍‍‍` شده و دستور `pip install -r requirements.txt` را اجرا کنید.
- دستور `docker-compose build` را اجرا کنید، این دستور سرویس‌های برنامه را با استفاده از docker می‌سازد (با ایجاد تغییراتی همچون نصب بسته‌های npm یا python این دستور باید دوباره اجرا شود)
- با به‌کارگیری دستور ‍‍‍‍‍‍`docker-compose up -d` سرویس‌های برنامه اجرا می‌شوند (d- باعث اجرای سرویس‌ها در حالت پس‌زمینه می‌شود)، می‌توان با دستور `docker-compose down` سرویس‌های درحال اجرا را خاموش کرد

## نکته‌های مهم
برای اجرای دستورات Django مانند `python manage.py migrate` می‌بایست دستور زیر را به‌کار گرفت:
```bash
docker-compose exec backend <your_command_here>‍‍
```
