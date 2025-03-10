let hr = document.getElementById("hour");
let min = document.getElementById("min");
let sec = document.getElementById("sec");

function displayTime() {
  let date = new Date();

  let dateDisplay = document.getElementById("date");
  let timeDisplay = document.getElementById("time");

  // Getting hour, mins, secs from date
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  let hRotation = 30 * hh + mm / 2;
  let mRotation = 6 * mm;
  let sRotation = 6 * ss;

  hr.style.transform = `rotate(${hRotation}deg)`;
  min.style.transform = `rotate(${mRotation}deg)`;
  sec.style.transform = `rotate(${sRotation}deg)`;

  // Getting Date
  let day = date.getDate();
  let month = date.getMonth() + 1; // Months are 0-based, so add 1
  let year = date.getFullYear();

  dateDisplay.innerText = `${day} - ${month} - ${year}`;

  // Getting Time in HH:MM:SS Format
  let ampm = hh >= 12 ? "PM" : "AM";
  hh = hh % 12 || 12; // Convert 24-hour format to 12-hour format

  timeDisplay.innerText = `${hh.toString().padStart(2, "0")} : ${mm
    .toString()
    .padStart(2, "0")} : ${ss.toString().padStart(2, "0")} ${ampm}`;
}

setInterval(displayTime, 1000);
displayTime();
