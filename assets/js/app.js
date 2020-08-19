if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById('desktop-site').style.display = 'none';
} else {
    document.getElementById('mobile-site').style.display = 'none';
}
// calling all functions that need to load on window load
window.onload = function () {
    setSVG();
}

// functionality for the svg name 'jeffrey vanhorn'
function setSVG() {
    let windowWidth = window.innerWidth;
    let svg = document.getElementById('svg');

    if (windowWidth === 1920) {
        svg.setAttribute('viewBox', '0 0 2520 300')
    }
    else if (windowWidth === 1600) {
        svg.setAttribute('viewBox', '0 0 2520 300')
    }
    else if (windowWidth === 768) {
        svg.setAttribute('viewBox', '0 0 1320 300')
    }
    else if (windowWidth < 768) {
        svg.setAttribute('viewBox', '0 0 1320 300')
    }
}

