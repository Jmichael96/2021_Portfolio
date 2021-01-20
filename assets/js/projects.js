// for the spinner to render waiting on all html content to be fully loaded
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
        techStack: ['Wordpress', 'PHP'],
        desc: '',
        client: true,
    },
    {
        id: 11,
        name: 'Topline',
        link: 'https://toplinedumpsters.com',
        imageName: 'topline.jpeg',
        techStack: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'PHP'],
        desc: 'Commercial business for dumpster rentals',
        client: true,
    },
    {
        id: 5,
        name: 'Update With Cait',
        link: 'updatewithcait.com',
        imageName: 'update_with_cait.png',
        techStack: ['React.Js', 'JavaScript', 'MongoDB', 'CSS3', 'Node.Js', 'React-Quill'],
        desc: '',
        client: true,
    },
    {
        id: 1,
        name: 'Jays Iron Works',
        link: 'https://jays-ironworks.com',
        imageName: 'jaysironworks.png',
        techStack: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
        desc: 'Commercial company that does wrought iron fence painting and repairs.',
        client: true,
        for: 'me'
    },
    {
        id: 2,
        name: 'React Graph',
        link: 'https://jmichael96.github.io/Graphs/',
        imageName: 'graph.jpg',
        techStack: ['React.Js', 'GraphQL', 'Apollo', 'MaterialUI', 'Plotly.Js', 'CSS3'],
        desc: '',
        client: false,
    },
    {
        id: 3,
        name: 'Google Books',
        link: 'https://google-books96.herokuapp.com/',
        imageName: 'bookbg.jpg',
        techStack: ['React.Js', 'MongoDB', 'Bootstrap', 'Node.Js', 'CSS3'],
        desc: '',
        client: false,
    },
    {
        id: 4,
        name: 'Snake Game',
        link: 'https://slithery-snake96.herokuapp.com/',
        imageName: 'snake.gif',
        techStack: ['HTML5', 'JavaScript', 'MongoDB', 'Bootstrap', 'CSS3', 'Node.Js'],
        desc: '',
        client: false,
    },
    {
        id: 6,
        name: 'Rock Paper Scissors',
        link: 'https://jmichael96.github.io/RPS-MULTIPLAYER/',
        imageName: 'rock.jpg',
        techStack: ['HTML5', 'JavaScript', 'Firebase', 'Bootstrap', 'CSS3'],
        desc: '',
        client: false,
    },
    {
        id: 7,
        name: 'Clicky Game',
        link: 'https://lit-wildwood-52008.herokuapp.com/',
        imageName: 'clickygame.gif',
        techStack: ['React.Js', 'Materialize', 'CSS3', 'JavaScript'],
        desc: '',
        client: false,
    },
    {
        id: 8,
        name: 'Sequelize Burger',
        link: 'https://sequelized-burger-jvh.herokuapp.com/',
        imageName: 'sequelizeBurger.gif',
        techStack: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'Node.Js', 'MySQL', 'Handlebars'],
        desc: '',
        client: false,
    },
    {
        id: 9,
        name: 'Star Wars RPG',
        link: 'https://jmichael96.github.io/Unit4-StarWarsRPG/',
        imageName: 'starwars.png',
        techStack: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript'],
        desc: '',
        client: false,
    },
    {
        id: 10,
        name: 'Supercross Trivia',
        link: 'https://jmichael96.github.io/TriviaGame/',
        imageName: 'supercross.png',
        techStack: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript'],
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
    amountLocation.innerHTML = `Showing ${num} projects for your search ${text}`;
};

// filter the array of projects
const filterProj = (filterName) => {
    // replacing contents of the array and inserting the temporary filtered elements
    filteredArr.splice(0, filteredArr.length, ...filteredArr.filter((obj) => (obj.techStack.indexOf(filterName)) >= 0));
    renderProjects();
};

// the search and filter projects function
// const filterProjects = (searchName) => {
//     let filteredProjects = [];
//     // filtering through projects array with the given parameter
//     for (let obj in projects) {
//         let str = JSON.stringify(projects[obj]);
//         if (str.indexOf(searchName)) {
//             filteredProjects.push(projects[obj]);
//         }
//     }
    // switch (searchName) {
    //     case 'AllProjects':
    //         renderAmount.innerHTML = '';
    //         renderProject(projects);
    //         renderAmount(projects.length, 'all projects');
    //     case 'HTML5':
    //         renderAmount.innerHTML = '';
    //         renderProject(filteredProjects);
    //         renderAmount(filteredProjects.length, 'HTML5');
    //     case 'React.Js':
    //         renderAmount.innerHTML = '';
    //         renderProject(filteredProjects);
    //         renderAmount(filteredProjects.length, 'React.Js');
    //     case 'JavaScript':
    //         renderAmount.innerHTML = '';
    //         renderProject(filteredProjects);
    //         renderAmount(filteredProjects.length, 'JavaScript');
    //     case 'PHP':
    //         renderAmount.innerHTML = '';
    //         renderProject(filteredProjects);
    //         renderAmount(filteredProjects.length, 'PHP');
    //     case 'Node.Js':
    //         renderAmount.innerHTML = '';
    //         renderProject(filteredProjects);
    //         renderAmount(filteredProjects.length, 'Node.Js');
    //     case 'MongoDB':
    //         renderAmount.innerHTML = '';
    //         renderProject(filteredProjects);
    //         renderAmount(filteredProjects.length, 'MongoDB');
    //     case 'Firebase':
    //         renderAmount.innerHTML = '';
    //         renderProject(filteredProjects);
    //         renderAmount(filteredProjects.length, 'Firebase');
    //     case 'MySQL':
    //         renderAmount.innerHTML = '';
    //         renderProject(filteredProjects);
    //         renderAmount(filteredProjects.length, 'MySQL');
    //     case 'Bootstrap':
    //         renderAmount.innerHTML = '';
    //         renderProject(filteredProjects);
    //         renderAmount(filteredProjects.length, 'Bootstrap');
    //     case 'Materialize':
    //         renderAmount.innerHTML = '';
    //         renderProject(filteredProjects);
    //         renderAmount(filteredProjects.length, 'Materialize');
    //     case 'MaterialUI':
    //         renderAmount.innerHTML = '';
    //         renderProject(filteredProjects);
    //         renderAmount(filteredProjects.length, 'MaterialUI');
    //     case 'CSS3':
    //         renderAmount.innerHTML = '';
    //         renderProject(filteredProjects);
    //         renderAmount(filteredProjects.length, 'CSS3');
    //     // true if there are professional work projects to return
    //     case true:
    //         renderAmount.innerHTML = '';
    //         renderProject(filteredProjects);
    //         renderAmount(filteredProjects.length, 'my Professional Work');
    //     // false to render all side projects
    //     case false:
    //         renderAmount.innerHTML = '';
    //         renderProject(filteredProjects);
    //         renderAmount(filteredProjects.length, 'Side Projects');
    //     default:
    //         filterProjects('AllProjects')
    // }
// };