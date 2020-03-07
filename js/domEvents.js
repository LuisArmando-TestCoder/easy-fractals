const songIframe = document.getElementById('songIframe');

songIframe.style.display = 'none';
songIframe.addEventListener('load', () => {
    songIframe.style.display = 'block';
    window.addEventListener('blur', () => songIframe.style.zIndex = -1);
});
