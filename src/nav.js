function goToPage(page) {
    const pages = ['index', 'quiz', 'draw'];
    if (pages.includes(page)) {
      window.location.replace(`${page}.html`);
    } else {
      console.error(`Page "${page}" does not exist!`);
    }
  }
  
  document.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const page = link.dataset.page;
      goToPage(page);
    });
  });
  