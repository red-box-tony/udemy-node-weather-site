console.log("clientside javascript file is loaded");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.querySelector("#errorMsg");
const msg2 = document.querySelector("#weather");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevents form refreshing page

  msg1.textContent = "Loading....";

  const location = search.value;

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      msg1.textContent = "";
      if (data.error) {
        msg1.textContent = data.error;
      } else {
        //   console.log(data.temperature);
        //     console.log(data.address);
        msg2.textContent =
          "Temperature: " + data.temperature + " degrees at " + data.address;
      }
    });
  });
});
