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
