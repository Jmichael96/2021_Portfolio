// for the spinner to render waiting on All html content to be fully loaded
document.onreadystatechange = function () {
    if (document.readyState !== 'complete') {
        document.querySelector('body').style.visibility = 'hidden';
        // the navbar
        document.querySelector('nav').style.display = 'none';
        // page loader
        document.querySelector('#loader').style.visibility = 'visible';
    } else {
        setTimeout(() => {
            document.querySelector('#loader').style.display = 'none';
            document.querySelector('nav').style.display = 'flex';
            document.querySelector('body').style.visibility = 'visible';
        }, 2000);
    }
};

const projects = [
    {
        id: 12,
        name: 'Lynns Auto Repair',
        link: 'https://lynnsautorepairmagnolia.com',
        imageName: 'lynnsautorepair.jpeg',
        techStack: ['All', 'Wordpress', 'PHP'],
        desc: '',
        client: true,
    },
    {
        id: 11,
        name: 'Topline',
        link: 'https://toplinedumpsters.com',
        imageName: 'topline.jpeg',
        techStack: ['All', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'PHP'],
        desc: 'Commercial business for dumpster rentals',
        client: true,
    },
    {
        id: 5,
        name: 'Update With Cait',
        link: 'https://updatewithcait.com',
        imageName: 'update_with_cait.png',
        techStack: ['All', 'React.Js', 'JavaScript', 'MongoDB', 'CSS3', 'Node.Js', 'React-Quill'],
        desc: '',
        client: true,
    },
    {
        id: 1,
        name: 'Jays Iron Works',
        link: 'https://jays-ironworks.com',
        imageName: 'jaysironworks.png',
        techStack: ['All', 'HTML5', 'CSS3', 'JavaScript', 'PHP'],
        desc: 'Commercial company that does wrought iron fence painting and repairs.',
        client: true,
        for: 'me'
    },
    {
        id: 2,
        name: 'React Graph',
        link: 'https://jmichael96.github.io/Graphs/',
        imageName: 'graph.jpg',
        techStack: ['All', 'React.Js', 'GraphQL', 'Apollo', 'MaterialUI', 'Plotly.Js', 'CSS3'],
        desc: '',
        client: false,
    },
    {
        id: 3,
        name: 'Google Books',
        link: 'https://google-books96.herokuapp.com/',
        imageName: 'bookbg.jpg',
        techStack: ['All', 'React.Js', 'MongoDB', 'Bootstrap', 'Node.Js', 'CSS3'],
        desc: '',
        client: false,
    },
    {
        id: 4,
        name: 'Snake Game',
        link: 'https://slithery-snake96.herokuapp.com/',
        imageName: 'snake.gif',
        techStack: ['All', 'HTML5', 'JavaScript', 'MongoDB', 'Bootstrap', 'CSS3', 'Node.Js'],
        desc: '',
        client: false,
    },
    {
        id: 6,
        name: 'Rock Paper Scissors',
        link: 'https://jmichael96.github.io/RPS-MULTIPLAYER/',
        imageName: 'rock.jpg',
        techStack: ['All', 'HTML5', 'JavaScript', 'Firebase', 'Bootstrap', 'CSS3'],
        desc: '',
        client: false,
    },
    {
        id: 7,
        name: 'Clicky Game',
        link: 'https://lit-wildwood-52008.herokuapp.com/',
        imageName: 'clickygame.gif',
        techStack: ['All', 'React.Js', 'Materialize', 'CSS3', 'JavaScript'],
        desc: '',
        client: false,
    },
    {
        id: 8,
        name: 'Sequelize Burger',
        link: 'https://sequelized-burger-jvh.herokuapp.com/',
        imageName: 'sequelizeBurger.gif',
        techStack: ['All', 'HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'Node.Js', 'MySQL', 'Handlebars'],
        desc: '',
        client: false,
    },
    {
        id: 9,
        name: 'Star Wars RPG',
        link: 'https://jmichael96.github.io/Unit4-StarWarsRPG/',
        imageName: 'starwars.png',
        techStack: ['All', 'HTML5', 'CSS3', 'Bootstrap', 'JavaScript'],
        desc: '',
        client: false,
    },
    {
        id: 10,
        name: 'Supercross Trivia',
        link: 'https://jmichael96.github.io/TriviaGame/',
        imageName: 'supercross.png',
        techStack: ['All', 'HTML5', 'CSS3', 'Bootstrap', 'JavaScript'],
        desc: '',
        client: false,
    }
];

$(window).on('load', function () {
    // make a copy of the projects array
    for (let obj in projects) {
        filteredArr.push(projects[obj]);
    }
    renderProjects();
});

// ! CONSTANTS
// getting location where projects will be rendered
const projLocation = document.getElementById('projectRender');
// getting location for project amount being rendered
const amountLocation = document.getElementById('projectAmountRender');
// assigning an empty array
let filteredArr = [];
// to search for the newest to oldest of projects
let isLatest = true;
// set truthy or falsey according to if a filter is being selected or searched for
let isFiltering = false;

// render the projects function
const renderProjects = () => {
    projLocation.innerHTML = filteredArr.map((item, i) => {
        return `
                <a key="${i + 1}" style="outline: none;" class="fade" href="${item.link}" rel="noreferrer noopener"target="_blank">
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
    // ! ADD APOSTROPHE
    if (num <= 0) {
        amountLocation.innerHTML = 'Oops! couldnt find any projects!';
        return;
    }
    if (num === 1) {
        amountLocation.innerHTML = `Showing ${num} project filtered by ${text}`;
        return;
    }
    amountLocation.innerHTML = `Showing ${num} projects filtered by ${text}`;
};

// filter the array of projects
const filterProj = (filterName) => {
    isFiltering = true;
    // replacing contents of the array and inserting the temporary filtered elements
    filteredArr.splice(0, filteredArr.length, ...filteredArr.filter((obj) => (obj.techStack.indexOf(filterName)) >= 0));
    renderAmount(filteredArr.length, filterName);
    renderProjects();
};

// handle animations and data when is filtering is set to true
const isFilteringHandler = () => {
    
};

setTimeout(() => {
    filterProj('React.Js');
}, 4000);