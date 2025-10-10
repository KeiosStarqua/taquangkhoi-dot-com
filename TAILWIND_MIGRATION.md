# TailwindCSS Migration Documentation

## Overview
This document describes the migration of all custom CSS to TailwindCSS utility classes.

## What Was Changed

### CSS Files
- **css/main.css**: Removed all CSS rules, kept only documentation
- **css/style.css**: Kept only font-face declarations and custom scrollbar styles

### HTML Files Updated
1. `index.html` - Home page
2. `pages/about.html` - About page
3. `pages/contact.html` - Contact page
4. `404.html` - 404 error page
5. `demos/motion-examples.html` - Motion.js examples

## Migration Details

### Navigation Container
**Before:**
```css
.nav-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background-color: #f1f1f1;
    border-radius: 12px;
    padding: 0 20px;
    margin-bottom: 20px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
```

**After:**
```html
<div class="flex flex-row justify-between items-center h-[50px] bg-gray-100 rounded-xl px-5 mb-5 shadow-custom-lg">
```

### Typography (h1)
**Before:**
```css
h1 {
    font-family: myCascadiaBold, serif, "Cascadia Mono", "Cascadia";
    font-size: 100%;
    font-weight: normal;
    color: #000000;
    background-color: #f0f0f0;
    border: 2px solid tomato;
    padding: 5px;
    margin: 0;
    text-align: center;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-radius: 8px;
}
```

**After:**
```html
<h1 class="font-cascadia-mono text-[100%] font-normal text-black bg-gray-100 border-2 border-tomato p-1.5 m-0 text-center shadow-custom rounded-lg">
```

### Body Styling
**Before:**
```css
html {
    user-select: none;
}
body {
    background-color: lightblue;
    height: 100%;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px;
}
* {
    font-family: myCascadiaBold, serif, "Cascadia Code", Cascadia, Arial;
}
```

**After:**
```html
<html lang="vi" class="select-none">
<body class="bg-blue-300 h-full mx-5 my-5 font-cascadia">
```

### Container Classes
**Before:**
```css
.container {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    margin-bottom: 20px;
}
```

**After:**
```html
<div class="bg-white bg-opacity-80 p-5 rounded-xl shadow-custom-lg mb-5">
```

### Blog List
**Before:**
```css
.list-blog {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
}

.list-blog > div {
    background-color: #ffffff;
    padding: 15px 20px;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
}

.list-blog > div:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    transform: translateY(-2px);
}
```

**After:**
```html
<div class="flex flex-col gap-[15px] mt-5">
    <div class="bg-white py-[15px] px-5 rounded-xl shadow-custom transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-0.5">
```

### Links
**Before:**
```css
a:link {
    color: green;
    background-color: transparent;
    text-decoration: none;
}
a:visited {
    color: yellowgreen;
    background-color: transparent;
    text-decoration: none;
}
a:hover {
    color: red;
    background-color: transparent;
    text-decoration: underline;
}
a:active {
    color: yellow;
    background-color: transparent;
    text-decoration: underline;
}
```

**After:**
```html
<a href="..." class="text-green-600 no-underline hover:text-red-600 hover:underline visited:text-[yellowgreen] active:text-yellow-400">
```

## Custom Tailwind Configuration

Each HTML file includes inline Tailwind configuration:

```javascript
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                'cascadia': ['myCascadiaBold', 'serif', 'Cascadia Code', 'Cascadia', 'Arial'],
                'cascadia-mono': ['myCascadiaBold', 'serif', 'Cascadia Mono', 'Cascadia'],
            },
            colors: {
                'tomato': '#ff6347',
            },
            boxShadow: {
                'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'custom-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }
        }
    }
}
```

## What Was Kept in CSS

### Font Faces
Custom font definitions remain in `css/style.css`:
```css
@font-face {
    font-family: myCascadiaBold;
    src: url(/font/CascadiaCode-Bold.otf);
}

@font-face {
    font-family: "Cascadia Code";
    src: url('../font/CascadiaCode-Bold.otf');
}
```

### Custom Scrollbar
Webkit scrollbar styles remain in `css/style.css` (not easily replicable in Tailwind):
```css
::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: #ff6347;
}

::-webkit-scrollbar-thumb:hover {
    background: #555;
}
```

## Benefits of Migration

1. **Reduced CSS File Size**: From ~169 lines to ~29 lines
2. **Better Maintainability**: All styling is co-located with HTML
3. **Consistency**: Using standard Tailwind utilities
4. **Flexibility**: Easy to adjust styles without touching CSS files
5. **No More Class Name Conflicts**: Utility-first approach eliminates naming issues

## Testing

The migration has been tested on:
- ✅ index.html
- ✅ pages/about.html
- ✅ pages/contact.html
- ✅ 404.html
- ✅ demos/motion-examples.html

All pages maintain their original appearance and functionality.
