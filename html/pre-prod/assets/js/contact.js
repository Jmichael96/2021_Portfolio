const SERVER_HOST = "https://portfolioemailserver-j4n5cd7baq-uc.a.run.app";
$(window).on("load", function () {
  let hasReached = false;
  $(window).on("scroll", function () {
    let windowBottom = $(this).scrollTop() + $(this).innerHeight();
    $("#formTitle").each(function () {
      /* Check the location of each desired element */
      let objectBottom = $(this).offset().top + $(this).outerHeight();
      /* If the element is completely within bounds of the window, fade it in */
      if (objectBottom < windowBottom - 100 && !hasReached) {
        // image.style.display = 'block';
        let p = document.getElementById("formTitle");
        p.innerHTML = "";
        let n = 0;
        let str = "Send A Message";
        let typeSpecialty = setInterval(function () {
          n = n + 1;
          p.innerHTML =
            str.slice(0, n) +
            ' <span style="color: #c75000; font-size: 2.2rem;">|</span>';
          if (n === str.length) {
            clearInterval(typeSpecialty);
            p.innerHTML = str;
            n = 0;
            setInterval(function () {
              if (n === 0) {
                p.innerHTML =
                  str +
                  '<span style="color: #c75000; font-size: 2.2rem;">|</span>';
                n = 1;
              } else {
                p.innerHTML =
                  str +
                  '<span style="color: transparent; font-size: 2.2rem;">|</span>';
                n = 0;
              }
            }, 500);
          }
        }, 40);
        hasReached = true;
      }
    });
  });
  // adding these to keep bots away
  let email1 = "jeffrey.";
  let email2 = "vanhorn";
  let email3 = "@yahoo.com";

  $(".locationEmail").attr("href", `mailto:${email1}${email2}${email3}`);
  document.getElementById("mapImg").style.display = "block";
  document.getElementById("map").style.display = "none";
  // if there is not a mobile device being used render the tom tom map. else render an image
  if (
    !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    // map styles and initiation
    // let map = tt.map({
    //     key: 'idwJh8J0x9cq7vGdT0SgaIkuv0Gdb1pM',
    //     container: 'map',
    //     basePath: '/',
    //     style: '/custommap.json',
    //     source: 'vector',
    //     center: [-97, 29],
    //     zoom: 4
    // });
    // // adding a marker to the tom tom map
    // function createMarker(position, color) {
    //     let markerElement = document.createElement('div');
    //     markerElement.className = 'marker';
    //     let markerContentElement = document.createElement('div');
    //     markerContentElement.className = 'marker-content';
    //     markerContentElement.style.backgroundColor = color;
    //     markerElement.appendChild(markerContentElement);
    //     // add marker to map
    //     new tt.Marker({ scale: 1.3 })
    //         .setLngLat(position)
    //         .addTo(map);
    // };
    // createMarker([-95.461195, 30.168032], '#3b4e74', 'The Woodlands, TX');
  } else {
    // display the map image and remove the map api
    document.getElementById("mapImg").style.display = "block";
    document.getElementById("map").style.display = "none";
  }
});

// on form submit
document.getElementById("submitFormBtn").onclick = (e) => {
  let name = $("#nameInput").val();
  let email = $("#emailInput").val().trim().toLowerCase();
  let message = $("#messageInput").val();
  if (!name && !email && !message) {
    // openErrModal('Please fill out each input');
    renderAlert("Fill out each field", true);
    return;
  }
  if (!name) {
    renderAlert("Add a name", true);
    return;
  }
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email || !emailRegex.test(email)) {
    renderAlert("Enter a valid email", true);
    return;
  }
  if (!message) {
    renderAlert("Enter a message", true);
    return;
  }
  openRobotModal();
};

// on complete form submit
document.getElementById("submitForm").onclick = async (e) => {
  e.preventDefault();

  let name = $("#nameInput").val();
  let email = $("#emailInput").val().trim().toLowerCase();
  let message = $("#messageInput").val();
  let question = $("#question").val().trim();

  if (+question === 0 || +question === 13 || +question === -2) {
    renderAlert("Wrong answer, robot!", true);
    return;
  } else if (+question === -3) {
    document
      .getElementById("robotModalOverlay")
      .classList.remove("is-robot-modal-visible");
    document
      .getElementById("robotModal")
      .classList.remove("is-robot-modal-visible");
    
    const newKey = await fetchKey();
    const formData = {
      "api-key": newKey,
      from: "Code VH",
      message: message,
      subject: "Contact Form",
      template: "codevh",
      to: "jeffrey.vanhorn@yahoo.com, jeffreymvanhorn@gmail.com",
      variables: {
        name: name,
        email: email,
        message: message,
      },
    };
    await initiateMail(formData, (err, data) => {
      console.log(data);
      if (err || data.status !== 200) {
        renderAlert(
          "There was an error. Please try again later",
          true
        );
        return;
      }
      renderAlert('Message Sent!', false);
      clearForm();
    });
  }
};

// send the mail function
const initiateMail = async (formData, callback) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(formData),
  };

  await fetch(`${SERVER_HOST}/api/nodemailer/send`, requestOptions)
    .then((response) => response.json())
    .then((result) => callback(null, result))
    .catch((error) => callback(error, null));
};

// fetch key for the server mail api
const fetchKey = async () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return await fetch(`${SERVER_HOST}/api/key/fetch_key`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
};

const clearForm = () => {
  document.getElementById("nameInput").value = "";
  document.getElementById("emailInput").value = "";
  document.getElementById("messageInput").value = "";
  document.getElementById("question").value = "0";
};

// ! ANTI-ROBOT MODAL
const openRobotModal = () => {
  document
    .getElementById("robotModalOverlay")
    .classList.add("is-robot-modal-visible");
  document.getElementById("robotModal").classList.add("is-robot-modal-visible");
};
// the x button inside the robot modal to close it
document
  .getElementById("robotModalCloseBtn")
  .addEventListener("click", function () {
    document
      .getElementById("robotModalOverlay")
      .classList.remove("is-robot-modal-visible");
    document
      .getElementById("robotModal")
      .classList.remove("is-robot-modal-visible");
  });
// for if the user clicks anywhere outside the  robot modal modal it will close the modal
document
  .getElementById("robotModalOverlay")
  .addEventListener("click", function () {
    document
      .getElementById("robotModalOverlay")
      .classList.remove("is-robot-modal-visible");
    document
      .getElementById("robotModal")
      .classList.remove("is-robot-modal-visible");
  });

const renderAlert = (msg, isErr) => {
  const alert = document.getElementById("formAlert");
  const iconWrap = document.getElementById("alertIconWrap");
  // message section to display whats inside the alert
  const message = document.getElementById("alertText");
  alert.style.display = "block";
  message.innerHTML = msg;

  // if there is no error and is for a successful message
  if (!isErr) {
    iconWrap.innerHTML = '<i class="fa fa-check"></i>';
  } else if (isErr) {
    // if the alert is for errors
    iconWrap.innerHTML = '<i class="fas fa-times"></i>';
  }

  setTimeout(() => {
    alert.style.display = "none";
  }, 5000);
};
