const button = document.getElementById("arrow");
const inputs = document.querySelectorAll("input");
function getInfo(year, day, month) {
  const today = new Date();
 
  
  // Calculate the difference in years
  let years = today.getFullYear() -year;

  // Adjust the year if the birthday hasn't occurred yet this year
  if (
    today.getMonth() < month ||
    (today.getMonth() === month && today.getDate() <day)
  ) {
    years--;
  }

  // Calculate months
  let months = today.getMonth() - month;
  if (months < 0) {
    months += 12;
  }

  // Adjust the month if the birthday day hasn't occurred yet this month
  if (today.getDate() <day) {
    months--;
    if (months < 0) {
      months += 12;
      years--;
    }
  }

  // Calculate days
  let days = today.getDate() -day;
  if (days < 0) {
    const previousMonth = (today.getMonth() - 1 + 12) % 12;
    const daysInPreviousMonth = new Date(today.getFullYear(), previousMonth + 1, 0).getDate();
    days += daysInPreviousMonth;
  }

  document.getElementById("yearResult").innerText = years;
  document.getElementById("monthResult").innerText = months;
  document.getElementById("dayResult").innerText = days;
}
function validate() {
  const bDay = document.getElementById("day");
  const bMonth = document.getElementById("month");
  const bYear = document.getElementById("year");
  const inputs = document.querySelectorAll("input");
  let validator = true;

  inputs.forEach((i) => {
    if (!i.value) {
      i.parentElement.querySelector("p").innerText = "this field is required";
      i.parentElement.querySelector("input").style.borderColor = "red";
      validator = false;
    } else {
      i.parentElement.querySelector("p").innerText = "";
    }
  });
  if (bMonth.value > 12) {
    bMonth.parentElement.querySelector("p").innerText =
      "must be a valid month";
    validator = false;
  }
  if (bYear.value > 2024) {
    bYear.parentElement.querySelector("p").innerText = "must be in the past";
    inputs.forEach((i) => {
      i.style.borderColor = "red";
    });
    validator = false;
    return;
  }
  if (bDay.value > 31) {
    bDay.parentElement.querySelector("p").innerText =
      "must be a valid day";
    inputs.forEach((i) => {
      i.style.borderColor = "red";
    });
    validator = false;
  }

  if (validator) {
    // if all inputs are valid, call the function to calculate the age
    getInfo(bYear.value, bDay.value, bMonth.value);
    inputs.forEach((i) => {
      i.style.borderColor = "initial";
    });
  }
}

button.addEventListener("click", () => {
  validate();
});
