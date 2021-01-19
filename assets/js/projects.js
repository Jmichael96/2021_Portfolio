$(window).on('load', function () {
    filterProjects();
});

const projects = [
    {// ! ADD APOSTROPHE
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
// getting location where projects will be rendered
const projLocation = document.getElementById('projectRender');
// getting location for project amount being rendered
const amountLocation = document.getElementById('projectAmountRender');

// render the projects function
const renderProject = (proj) => {
    projLocation.innerHTML = proj.map((item, i) => {
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

// the search and filter projects function
const filterProjects = (searchName) => {
    let filteredProjects = [];
    // filtering through projects array with the given parameter
    for (let obj in projects) {
        let str = JSON.stringify(projects[obj]);
        if (str.indexOf(searchName)) {
            filteredProjects.push(projects[obj]);
        }
    }

    switch (searchName) {
        case 'AllProjects':
            renderAmount.innerHTML = '';
            document.getElementById('allProjectsBtn').className += ' selectedBtn'
            renderProject(projects);
            renderAmount(projects.length, 'all projects');
            break;
        case 'HTML5':
            renderAmount.innerHTML = '';
            document.getElementById('htmlBtn').className += ' selectedBtn'
            renderProject(filteredProjects);
            renderAmount(filteredProjects.length, 'HTML5');
            break;
        case 'React.Js':
            renderAmount.innerHTML = '';
            // document.getElementById('reactBtn').className += ' selectedBtn';
            renderProject(filteredProjects);
            renderAmount(filteredProjects.length, 'React.Js');
            break;
        case 'JavaScript':
            renderAmount.innerHTML = '';
            document.getElementById('jsBtn').className += ' selectedBtn';
            renderProject(filteredProjects);
            renderAmount(filteredProjects.length, 'JavaScript');
            break;
        case 'PHP':
            renderAmount.innerHTML = '';
            document.getElementById('phpBtn').className += ' selectedBtn';
            renderProject(filteredProjects);
            renderAmount(filteredProjects.length, 'PHP');
            break;
        case 'Node.Js':
            renderAmount.innerHTML = '';
            document.getElementById('nodeBtn').className += ' selectedBtn';
            renderProject(filteredProjects);
            renderAmount(filteredProjects.length, 'Node.Js');
            break;
        case 'MongoDB':
            renderAmount.innerHTML = '';
            document.getElementById('mongoBtn').className += ' selectedBtn';
            renderProject(filteredProjects);
            renderAmount(filteredProjects.length, 'MongoDB');
            break;
        case 'Firebase':
            renderAmount.innerHTML = '';
            document.getElementById('firebaseBtn').className += ' selectedBtn';
            renderProject(filteredProjects);
            renderAmount(filteredProjects.length, 'Firebase');
            break;
        case 'MySQL':
            renderAmount.innerHTML = '';
            document.getElementById('mysqlBtn').className += ' selectedBtn';
            renderProject(filteredProjects);
            renderAmount(filteredProjects.length, 'MySQL');
            break;
        case 'Bootstrap':
            renderAmount.innerHTML = '';
            document.getElementById('bootstrapBtn').className += ' selectedBtn';
            renderProject(filteredProjects);
            renderAmount(filteredProjects.length, 'Bootstrap');
            break;
        case 'Materialize':
            renderAmount.innerHTML = '';
            document.getElementById('materializeBtn').className += ' selectedBtn';
            renderProject(filteredProjects);
            renderAmount(filteredProjects.length, 'Materialize');
            break;
        case 'MaterialUI':
            renderAmount.innerHTML = '';
            document.getElementById('materialUIBtn').className += ' selectedBtn';
            renderProject(filteredProjects);
            renderAmount(filteredProjects.length, 'MaterialUI');
            break;
        case 'CSS3':
            renderAmount.innerHTML = '';
            document.getElementById('cssBtn').className += ' selectedBtn';
            renderProject(filteredProjects);
            renderAmount(filteredProjects.length, 'CSS3');
            break;
        // true if there are professional work projects to return
        case true:
            renderAmount.innerHTML = '';
            document.getElementById('proWork').className += ' selectedBtn';
            renderProject(filteredProjects);
            renderAmount(filteredProjects.length, 'my Professional Work');
            break;
        // false to render all side projects
        case false:
            renderAmount.innerHTML = '';
            document.getElementById('funProjects').className += ' selectedBtn';
            renderProject(filteredProjects);
            renderAmount(filteredProjects.length, 'Side Projects');
            break;
        default:
            filterProjects('React.Js')
    }
};