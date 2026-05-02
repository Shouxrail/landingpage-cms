<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="mytheme">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        @php
            $settings = \App\Models\SiteSetting::first();
        @endphp
        @if($settings && $settings->favicon_url)
            <link rel="icon" href="{{ $settings->favicon_url }}">
        @endif

        @inertiaHead
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    </head>
    <body class="antialiased">
        @inertia
    </body>
</html>
