# Shared Hosting Deployment Guide
### Laravel 12 + Inertia.js + React (Vite)

> [!IMPORTANT]
> Your shared host **must** support **PHP 8.2+** and **MySQL**. Most cPanel hosts (Hostinger, Namecheap, SiteGround, etc.) meet these requirements. SSH access is strongly recommended — without it, setup is painful.

---

## Step 1 — Build Frontend Assets Locally

Run this on your **local machine** before uploading anything. This compiles all React/Vite assets into static files.

```bash
cd c:\Project\landingpage-cms\laravel_temp
npm run build
```

This produces a `public/build/` folder. **You must upload this.**  
You do **not** need to upload `node_modules/`.

---

## Step 2 — Prepare Files to Upload

Upload **everything except** these folders (they're unneeded on the server):

| Exclude | Reason |
|---|---|
| `node_modules/` | Too large; not needed on server |
| `.env` | Contains local secrets; you'll create a new one |
| `storage/logs/*.log` | Local dev logs |

> [!TIP]
> Zip the entire project locally first, upload the zip, then extract on the server via cPanel File Manager. This is much faster than FTP file-by-file.

---

## Step 3 — Set Up the Folder Structure on the Host

Shared hosting has a `public_html` folder as the web root. Laravel's web root is `public/`.  
**Do NOT put the entire Laravel project inside `public_html`** — that exposes your source code.

### Recommended layout on the server:

```
/home/yourusername/
├── laravel_temp/          ← Upload the full app here (outside public_html)
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── resources/
│   ├── routes/
│   ├── storage/
│   ├── vendor/
│   ├── public/            ← Contents of this go into public_html
│   └── ...
└── public_html/           ← Your domain's web root
    ├── index.php          ← Modified to point to laravel_temp
    ├── .htaccess
    └── build/             ← Copy public/build/ here
```

### Modify `public_html/index.php`

Replace the paths to point to your app folder:

```php
<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Point to your vendor autoload
require __DIR__.'/../laravel_temp/vendor/autoload.php';

// Bootstrap the application
$app = require_once __DIR__.'/../laravel_temp/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Request::capture()
)->send();

$kernel->terminate($request, $response);
```

### Copy `.htaccess` from `public/` to `public_html/`

```
# Copy public/.htaccess → public_html/.htaccess
```

---

## Step 4 — Install Composer Dependencies on the Server

Via **SSH**:
```bash
cd ~/laravel_temp
composer install --optimize-autoloader --no-dev
```

> [!NOTE]
> If your host doesn't have `composer` in PATH, try `php composer.phar install ...` or upload a `composer.phar` manually.

---

## Step 5 — Create the `.env` File on the Server

Copy your local `.env` and update it for production. Create it via SSH or cPanel file editor:

```dotenv
APP_NAME="Your App Name"
APP_ENV=production
APP_KEY=                        # Leave blank — generate below
APP_DEBUG=false
APP_URL=https://yourdomain.com

LOG_CHANNEL=stack
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=localhost               # Usually localhost on shared hosting
DB_PORT=3306
DB_DATABASE=your_cpanel_db_name
DB_USERNAME=your_cpanel_db_user
DB_PASSWORD=your_db_password

CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120
```

Then generate the app key:
```bash
php artisan key:generate
```

---

## Step 6 — Set Storage & Cache Permissions

```bash
cd ~/laravel_temp
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

Then create the storage symlink (so uploaded files are publicly accessible):
```bash
php artisan storage:link
```

> [!WARNING]
> This creates `public/storage → storage/app/public`. Since you're using a custom `public_html` setup, you may need to manually create a symlink:
> ```bash
> ln -s ~/laravel_temp/storage/app/public ~/public_html/storage
> ```

---

## Step 7 — Run Migrations

```bash
cd ~/laravel_temp
php artisan migrate --force
```

---

## Step 8 — Optimize for Production

```bash
cd ~/laravel_temp
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
```

---

## Step 9 — Point Vite Assets Correctly

Since `public/build/` lives inside `public_html/build/`, Vite's manifest should work automatically.

Double-check `vite.config.js` has no hardcoded paths, and that your blade/inertia layout includes:
```php
@vite(['resources/js/app.tsx'])
```
This reads `public/build/manifest.json` automatically.

---

## Common Gotchas

| Problem | Fix |
|---|---|
| `500 Server Error` | Enable `APP_DEBUG=true` temporarily, check `storage/logs/laravel.log` |
| `No application encryption key` | Run `php artisan key:generate` |
| Blank page / JS not loading | Check browser console; verify `public_html/build/` exists |
| `php artisan` not found | Use full path: `php8.2 artisan` or `php81 artisan` depending on host |
| `.htaccess` not working | Enable `mod_rewrite` in cPanel or contact host |
| `composer: command not found` | Download composer.phar: `curl -sS https://getcomposer.org/installer \| php` |

---

## Checklist

- `[ ]` Run `npm run build` locally
- `[ ]` Upload all files except `node_modules/`, `.env`
- `[ ]` Place app outside `public_html`, only `public/` contents in `public_html/`
- `[ ]` Modify `public_html/index.php` paths
- `[ ]` Run `composer install --no-dev` on server
- `[ ]` Create `.env` with production values
- `[ ]` Run `php artisan key:generate`
- `[ ]` Set permissions on `storage/` and `bootstrap/cache/`
- `[ ]` Run `php artisan migrate --force`
- `[ ]` Run optimization commands (`config:cache`, `route:cache`, etc.)
- `[ ]` Test the site in browser
