// for the spinner to render waiting on All html content to be fully loaded
document.onreadystatechange = function () {
    const body = document.querySelector('body');
    const projectLayout = document.getElementById('projectLayout');
    const nav = document.querySelector('nav');
    const sideNav = document.getElementById('sideNav');
    const pageLoader = document.querySelector('#portfolioLoader');
    if (document.readyState !== 'complete') {
        body.style.visibility = 'hidden';
        // project layout 
        projectLayout.style.display = 'none';
        // the navbar
        nav.style.display = 'none';
        sideNav.style.display = 'none';
        // page loader
        pageLoader.style.visibility = 'visible';
    } else {
        setTimeout(() => {
            pageLoader.style.visibility = 'hidden';
            nav.style.display = 'flex';
            body.style.visibility = 'visible';
            sideNav.style.display = 'flex';
            // footer.style.display = 'block';
            // project layout 
            projectLayout.style.display = 'block';
        }, 2000);
    }
};

const projects = [
    {
        id: 14,
        name: 'Lynn&#8217;s Auto Repair',
        link: 'https://lynnsautorepairmagnolia.com',
        imageName: 'lynns.jpg',
        techStack: ['All Projects', 'Wordpress', 'PHP'],
        desc: 'Service Website for Auto shop in Magnolia, TX.',
        client: true,
    },
    {
        id: 13,
        name: 'Update With Cait',
        link: 'https://updatewithcait.com',
        imageName: 'uwc.png',
        techStack: ['All Projects', 'React', 'JavaScript', 'Express', 'MongoDB', 'CSS', 'Node', 'React-Quill'],
        desc: 'Multipurpose Blog Website for Personal Client.',
        client: true,
    },
    {
        id: 12,
        name: 'Jay&#8217;s Iron Works',
        link: 'https://jays-ironworks.com',
        imageName: 'jaysironworks.png',
        techStack: ['All Projects', 'HTML5', 'CSS', 'JavaScript', 'PHP'],
        desc: 'Service Website for Commercial Business specializing in wrought iron fence painting and repairs.',
        client: true,
        for: 'me'
    },
    {
        id: 11,
        name: 'Topline',
        link: 'https://toplinedumpsters.com',
        imageName: 'topline.jpeg',
        techStack: ['All Projects', 'HTML5', 'CSS', 'JavaScript', 'Bootstrap', 'PHP'],
        desc: 'Dumpster Rental Website for Commercial Business.',
        client: true,
    },
    {
        id: 10,
        name: 'React Graph',
        link: 'https://jmichael96.github.io/Graphs/',
        imageName: 'graph.png',
        techStack: ['All Projects', 'React', 'GraphQL', 'Apollo', 'MaterialUI', 'Plotly', 'CSS'],
        desc: 'Visual representation of live oil and gas data.',
        client: false,
    },
    {
        id: 9,
        name: 'Snake Game',
        link: 'https://slithery-snake96.herokuapp.com/',
        imageName: 'snake.jpg',
        techStack: ['All Projects', 'HTML5', 'JavaScript', 'MongoDB', 'Express', 'Bootstrap', 'CSS', 'Node'],
        desc: 'Classic Snake Game. Click to play and beat the high score!',
        client: false,
    },
    {
        id: 8,
        name: 'Google Books',
        link: 'https://google-books96.herokuapp.com/',
        imageName: 'bookbg.jpg',
        techStack: ['All Projects', 'React', 'MongoDB', 'Express', 'Bootstrap', 'Node', 'CSS'],
        desc: 'Online platform to find and save novels and short stories.',
        client: false,
    },
    {
        id: 7,
        name: 'Mongo-Scraper',
        link: 'https://mongo-scraper-jvh.herokuapp.com/',
        imageName: 'mongo-scraper.png',
        techStack: ['All Projects', 'HTML5', 'JavaScript', 'Handlebars', 'Cheerio', 'MongoDB', 'Bootstrap', 'Express', 'CSS', 'Node'],
        desc: 'Web scraper used to gather data about supercross and render it as a pleasing UI.',
        client: false,
    },
    {
        id: 6,
        name: 'Giphy-API',
        link: 'https://jmichael96.github.io/Giphy-API/',
        imageName: 'giphy-api.png',
        techStack: ['All Projects', 'HTML5', 'JavaScript', 'Bootstrap', 'CSS'],
        desc: 'Online platform to search and view animal gifs.',
        client: false,
    },
    {
        id: 5,
        name: 'Clicky Game',
        link: 'https://clicky-game-jvh.herokuapp.com/',
        imageName: 'clickyGame.png',
        techStack: ['All Projects', 'React', 'Materialize', 'CSS', 'JavaScript'],
        desc: 'Classic shuffle game designed to test players&#8217; memory.',
        client: false,
    },
    {
        id: 15,
        name: 'Portfolio',
        link: 'https://codevh.com/',
        imageName: 'portfolio.png',
        techStack: ['All Projects', 'HTML5', 'CSS', 'JavaScript', 'PHP'],
        desc: 'Personal portfolio built from scratch.',
        client: false,
    },
    {
        id: 4,
        name: 'Rock Paper Scissors',
        link: 'https://jmichael96.github.io/RPS-MULTIPLAYER/',
        imageName: 'rock-paper-scissors.png',
        techStack: ['All Projects', 'HTML5', 'JavaScript', 'Firebase', 'Bootstrap', 'CSS'],
        desc: 'Rock beats scissors, scissors beats paper, paper beats rock...',
        client: false,
    },
    {
        id: 3,
        name: 'Sequelize Burger',
        link: 'https://sequelized-burger-jvh.herokuapp.com/',
        imageName: 'sequelizeBurger.jpg',
        techStack: ['All Projects', 'HTML5', 'CSS', 'Bootstrap', 'Express', 'JavaScript', 'Node', 'MySQL', 'Handlebars'],
        desc: 'Hungry? Build your own burger!',
        client: false,
    },
    {
        id: 2,
        name: 'Star Wars RPG',
        link: 'https://jmichael96.github.io/Unit4-StarWarsRPG/',
        imageName: 'starwars.png',
        techStack: ['All Projects', 'HTML5', 'CSS', 'Bootstrap', 'JavaScript'],
        desc: 'Luck-based battle game against computer-opponent.',
        client: false,
    },
    {
        id: 1,
        name: 'Supercross Trivia',
        link: 'https://jmichael96.github.io/TriviaGame/',
        imageName: 'dirtbike.jpg',
        techStack: ['All Projects', 'HTML5', 'CSS', 'Bootstrap', 'JavaScript'],
        desc: 'Test your knowledge on how much you know about supercross!',
        client: false,
    }
];
$(window).on('load', function () {
    // make a copy of the projects array
    for (let obj in projects) {
        filteredArr.push(projects[obj]);
    }
    renderProjects();
    // once window is refreshed show the message stating that all projects are rendered
    renderAmount(projects.length);
    resizeNavHandler();
    window.onscroll = () => {
        //  ! FADE IN EFFECT
        let windowBottom = $(this).scrollTop() + $(this).innerHeight();
        $(".fade").each(function () {
            /* Check the location of each desired element */
            let objectBottom = $(this).offset().top + $(this).outerHeight();
            /* If the element is completely within bounds of the window, fade it in */
            if (objectBottom < windowBottom + 200) {
                //object comes into view (scrolling down)
                if ($(this).css("opacity") == 0) { $(this).fadeTo(500, 1); }
            } else { //object goes out of view (scrolling up)
                if ($(this).css("opacity") == 1) { $(this).fadeTo(500, 0); }
            }
        });
        // ! NAVBAR
        const nav = document.getElementById('nav');
        const scrollBtn = document.getElementById('scrollTopIcon');
        // navbar image
        const navImg = document.getElementById('desktopJackAttack');
        if (this.scrollY <= 100) {
            nav.style.height = '4rem';
            nav.style.backgroundColor = '#000000b0'
            scrollBtn.style.display = 'none';
            navImg.style.height = '4rem';
        }
        else {
            nav.style.height = '3rem';
            nav.style.backgroundColor = 'black';
            scrollBtn.style.display = 'block';
            navImg.style.height = '3rem';
        };
        scrollProgressBar();
    };
    // footer date
    document.getElementById('footerDate').innerHTML = `${new Date().getFullYear()}`;
});

// call this function when the window is resizing
window.onresize = function () {
    // resizing the nav to the appropriate specs
    resizeNavHandler();
}

// navbar on window resize
function resizeNavHandler() {
    let desktopNav = document.getElementById('desktopNav');
    let mobileNav = document.getElementById('mobileNav');
    if (window.innerWidth >= 1025) {
        desktopNav.style.display = 'flex';
        mobileNav.style.display = 'none';
    } else if (window.innerWidth <= 1024) {
        desktopNav.style.display = 'none';
        mobileNav.style.display = 'flex';
    }
};
// toggle the mobile menu button
$('#mobileNavBtn').click(function () {
    $(this).toggleClass('open');
});
// toggle the side nav sliding in
$('#mobileNavBtn').click(function () {
    $('#sideNav').toggleClass('activeNav');
});
// toggle the nav and mobile menu button when clicking on a button inside the side nav
$('.mobileLink').click(function () {
    $('#mobileNavBtn').toggleClass('open');
    $('#sideNav').toggleClass('activeNav');
});

// progress bar handler
const scrollProgressBar = () => {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById('progressBar').style.width = scrolled + '%';
};
// CONSTANTS
// getting location where projects will be rendered
const projLocation = document.getElementById('projectRender');
// getting location for project amount being rendered
const amountLocation = document.getElementById('projectAmountRender');
// assigning an empty array
let filteredArr = [];
// to search for the newest to oldest of projects
let isLatest = true;
// assigning the total amount of projects as an integer to render the filtered text accordingly
// ! MUST CHANGE EVERY TIME A PROJECT IS ADDED ===========================
const totalProjects = 15;
// render the projects function
const renderProjects = () => {
    projLocation.innerHTML = filteredArr.map((item, i) => {
        return `
                <a key="${i + 1}" style="outline: none; z-index: 3;" class="projLink fade" href="${item.link}" rel="noreferrer noopener"target="_blank">
                    <div class="projectCard">
                        <div class="cardCover">
                            <div class="projectCardHeader" style="background-image: url(./assets/images/projects/${item.imageName})">
                                <div class="projectCardSlant">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 200">
                                        <path class="polygon" d="M-20,200,1000,0V200Z" />
                                    </svg>
                                </div>
                            </div>
                            <div class="projectCardBody">
                                <h2 class="cardTitle">${item.name}</h2>
                                <div class="cardDesc">${item.desc}</div>
                            </div>
                        </div>
                    </div>
                </a>
                `;
    }).join('');
};
// render the number of projects selected through the filter
const renderAmount = (num, text) => {
    if (num <= 0) {
        amountLocation.innerHTML = 'Oops! couldn&#8217;t find any projects!';
        return;
    }
    if (num === 1) {
        amountLocation.innerHTML = `Displaying ${num} project filtered by <span class="techName">${text}</span>`;
        return;
    }
    if (num === totalProjects) {
        amountLocation.innerHTML = 'Displaying all projects';
        return;
    }
    amountLocation.innerHTML = `Displaying ${num} projects filtered by <span class="techName">${text}</span>`;
};
// filter the array of projects
const filterProj = (filterName) => {
    // handle the filter loading screen
    isFilteringHandler(filterName);
    // make sure all elements are added back into the copied array
    filteredArr.splice(0, filteredArr.length, ...projects);
    // replacing contents of the array and inserting the temporary filtered elements
    filteredArr.splice(0, filteredArr.length, ...filteredArr.filter((obj) => (obj.techStack.indexOf(filterName)) >= 0));
    // render the amount of projects and the filter name
    renderAmount(filteredArr.length, filterName);
    // render the projects
    renderProjects();

};
// handle animations and data when is filtering is set to true
const isFilteringHandler = (filterName) => {
    // the whole filter loading section from "article" tag
    const filterSection = document.getElementById('filterLoading');
    // where the text is going to be rendered in order to tell user whats being searched for
    const searchingFor = document.getElementById('searchingForRender');
    // select the project section
    const projectSection = document.getElementById('projectLayout');
    // set the filter section to display the contents 
    filterSection.style.display = 'block';
    // remove the project section momentarily 
    projectSection.style.display = 'none';
    // assign a text value to the filter loading section
    searchingFor.innerHTML = `Analyzing Filter`;

    setTimeout(() => {
        // removing  filter loading section
        filterSection.style.display = 'none';
        // rendering project section
        projectSection.style.display = 'block';
    }, 3200);
};
// the animation for the custom select input
document.getElementById('selectInput').onclick = function () {
    let className = ' ' + selectInput.className + ' ';
    this.className = ~className.indexOf(' active ') ? className.replace(' active ', ' ') : this.className + ' active';
};
$('.selectValue').on('click', (e) => {
    // change the value of the custom input select label
    document.getElementById('selectTitle').innerHTML = `${e.target.textContent} <span class="arrow"></span>`;
    // initiate filtering the projects
    filterProj(e.target.textContent);
});
// smooth scroll function
$('.js-link').click(function (e) {
    e.preventDefault();
    let target = $($(this).attr('href'));
    if (target.length) {
        let scrollTo = target.offset().top - 30;
        $('body, html').animate({ scrollTop: scrollTo + 'px' }, 1500);
    }
});

document.getElementById('desktopNavLink').onclick = () => {
    window.location.href = '/index.html';
};

document.getElementById('mobileNavLink').onclick = () => {
    console.log('redirecting')
    window.location.href = '/index.html';
};