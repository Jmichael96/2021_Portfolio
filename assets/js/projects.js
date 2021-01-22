// for the spinner to render waiting on All html content to be fully loaded
document.onreadystatechange = function () {
    const body = document.querySelector('body');
    const projectLayout = document.getElementById('projectLayout');
    const nav = document.querySelector('nav');
    const sideNav = document.getElementById('sideNav');
    const pageLoader = document.querySelector('#loader');
    // const footer = document.querySelector('footer');

    if (document.readyState !== 'complete') {
        body.style.visibility = 'hidden';
        // project layout 
        projectLayout.style.display = 'none';
        // the navbar
        nav.style.display = 'none';
        sideNav.style.display = 'none';
        // page loader
        pageLoader.style.visibility = 'visible';
        // footer
        // footer.style.display = 'none';
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
        name: 'Lynns Auto Repair',
        link: 'https://lynnsautorepairmagnolia.com',
        imageName: 'lynnsautorepair.jpeg',
        techStack: ['All Projects', 'Wordpress', 'PHP'],
        desc: 'Auto shop in Magnolia, TX.',
        client: true,
    },
    {
        id: 13,
        name: 'Update With Cait',
        link: 'https://updatewithcait.com',
        imageName: 'update_with_cait.png',
        techStack: ['All Projects', 'React', 'JavaScript', 'Express', 'MongoDB', 'CSS', 'Node', 'React-Quill'],
        desc: 'Blog website for a personal client',
        client: true,
    },
    {
        id: 12,
        name: 'Jays Iron Works',
        link: 'https://jays-ironworks.com',
        imageName: 'jaysironworks.png',
        techStack: ['All Projects', 'HTML5', 'CSS', 'JavaScript', 'PHP'],
        desc: 'Commercial company that does wrought iron fence painting and repairs.',
        client: true,
        for: 'me'
    },
    {
        id: 11,
        name: 'Topline',
        link: 'https://toplinedumpsters.com',
        imageName: 'topline.jpeg',
        techStack: ['All Projects', 'HTML5', 'CSS', 'JavaScript', 'Bootstrap', 'PHP'],
        desc: 'Commercial business for dumpster rentals',
        client: true,
    },
    {
        id: 10,
        name: 'React Graph',
        link: 'https://jmichael96.github.io/Graphs/',
        imageName: 'graph.jpg',
        techStack: ['All Projects', 'React', 'GraphQL', 'Apollo', 'MaterialUI', 'Plotly', 'CSS'],
        desc: 'Giving a visual representation from live oil and gas data',
        client: false,
    },
    {
        id: 9,
        name: 'Snake Game',
        link: 'https://slithery-snake96.herokuapp.com/',
        imageName: 'snake.gif',
        techStack: ['All Projects', 'HTML5', 'JavaScript', 'MongoDB', 'Express', 'Bootstrap', 'CSS', 'Node'],
        desc: 'A classic snake game. Try and beat your high score!',
        client: false,
    },
    {
        id: 8,
        name: 'Google Books',
        link: 'https://google-books96.herokuapp.com/',
        imageName: 'bookbg.jpg',
        techStack: ['All Projects', 'React', 'MongoDB', 'Express', 'Bootstrap', 'Node', 'CSS'],
        desc: 'Search for a book to buy or save it for later.',
        client: false,
    },
    {
        id: 7,
        name: 'Mongo-Scraper',
        link: 'https://mongo-scraper-jvh.herokuapp.com/',
        imageName: 'mongoScraper.jpg',
        techStack: ['All Projects', 'HTML5', 'JavaScript', 'Handlebars', 'Cheerio', 'MongoDB', 'Bootstrap', 'Express', 'CSS', 'Node'],
        desc: 'A web scraper used to gather data about supercross and render it as a pleasing UI.',
        client: false,
    },
    {
        id: 6,
        name: 'Giphy-API',
        link: 'https://jmichael96.github.io/Giphy-API/',
        imageName: 'giphyApi.jpg',
        techStack: ['All Projects', 'HTML5', 'JavaScript', 'Bootstrap', 'CSS'],
        desc: 'Search and watch any animal gif you want!',
        client: false,
    },
    {
        id: 5,
        name: 'Clicky Game',
        link: 'https://lit-wildwood-52008.herokuapp.com/',
        imageName: 'clickygame.gif',
        techStack: ['All Projects', 'React', 'Materialize', 'CSS', 'JavaScript'],
        desc: 'A game of memory!',
        client: false,
    },
    {
        id: 4,
        name: 'Rock Paper Scissors',
        link: 'https://jmichael96.github.io/RPS-MULTIPLAYER/',
        imageName: 'rock.jpg',
        techStack: ['All Projects', 'HTML5', 'JavaScript', 'Firebase', 'Bootstrap', 'CSS'],
        desc: 'Rock beats scissors, scissors beats paper, paper beats rock...',
        client: false,
    },
    {
        id: 3,
        name: 'Sequelize Burger',
        link: 'https://sequelized-burger-jvh.herokuapp.com/',
        imageName: 'sequelizeBurger.gif',
        techStack: ['All Projects', 'HTML5', 'CSS', 'Bootstrap', 'Express', 'JavaScript', 'Node', 'MySQL', 'Handlebars'],
        desc: 'Build your own burger.',
        client: false,
    },
    {
        id: 2,
        name: 'Star Wars RPG',
        link: 'https://jmichael96.github.io/Unit4-StarWarsRPG/',
        imageName: 'starwars.png',
        techStack: ['All Projects', 'HTML5', 'CSS', 'Bootstrap', 'JavaScript'],
        desc: 'Try and eliminate your components!',
        client: false,
    },
    {
        id: 1,
        name: 'Supercross Trivia',
        link: 'https://jmichael96.github.io/TriviaGame/',
        imageName: 'supercross.png',
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
    renderAmount(projects.length)
});

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
const totalProjects = 14;

// render the projects function
const renderProjects = () => {
    projLocation.innerHTML = filteredArr.map((item, i) => {
        return `
                <a key="${i + 1}" style="outline: none;" class="projLink fade" href="${item.link}" rel="noreferrer noopener"target="_blank">
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

    var className = ' ' + selectInput.className + ' ';

    this.className = ~className.indexOf(' active ') ?
        className.replace(' active ', ' ') :
        this.className + ' active';
}

$('.selectValue').on('click', (e) => {
    // change the value of the custom input select label
    document.getElementById('selectTitle').innerHTML = `${e.target.textContent} <span class="arrow"></span>`;
    // initiate filtering the projects
    filterProj(e.target.textContent);
})