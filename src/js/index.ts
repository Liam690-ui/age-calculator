import { getCurrentDate } from "../utils/date.js";
const button = document.querySelector(".button")! as HTMLButtonElement;

function handleInputSubmit(e: Event) {
  e.preventDefault();
  const yearInput = document.getElementById("year")! as HTMLInputElement;
  const monthInput = document.getElementById("month")! as HTMLInputElement;
  const dayInput = document.getElementById("day")! as HTMLInputElement;
  const dayError = document.getElementById("dayError")! as HTMLDivElement;

  const birthDay = handleBirthDate();
  const birthMonth = handleBirthMonth();
  const birthYear = handlebirthYear();
  if (birthDay === 0 || birthMonth === 0 || birthYear === 0) {
    return;
  }

  if (!isValidBirthDate(birthYear, birthMonth, birthDay)) {
    dayError.innerText = "Invalid Date, Check credentials...";
    return;
  }
  yearsPast();
  monthsPast();
  daysPast();
  yearInput.value = "";
  monthInput.value = "";
  dayInput.value = "";
}

function yearsPast(): number {
  const displayYears = document.getElementById(
    "yearsDisplay"
  )! as HTMLSpanElement;
  const birthYear = handlebirthYear();
  const { currentYear } = getCurrentDate();
  if (birthYear === 0) {
    return 0;
  }
  const age = currentYear - birthYear;
  displayYears.textContent = String(age);
  return age;
}
function monthsPast(): number {
  const displayMonths = document.getElementById(
    "monthsDisplay"
  )! as HTMLSpanElement;
  const { currentMonth, currentYear } = getCurrentDate();
  const birthMonth = handleBirthMonth();
  const birthYear = handlebirthYear();
  if (birthMonth === 0 || birthYear === 0) {
    return 0;
  }
  const totalMonths =
    currentYear * 12 + currentMonth - (birthYear * 12 + birthMonth);
  const months = totalMonths % 12;
  displayMonths.textContent = String(months);
  return months;
}
function daysPast() {
  const displayDays = document.getElementById(
    "daysDisplay"
  )! as HTMLSpanElement;
  const birthDay = handleBirthDate();
  const birthMonth = handleBirthMonth();
  const birthYear = handlebirthYear();
  if (birthDay === 0 || birthMonth === 0 || birthYear === 0) {
    return 0;
  }
  const today = new Date();
  const currentYear = today.getFullYear();
  let birthDate = new Date(currentYear, birthMonth - 1, birthDay);
  if (today < birthDate) {
    birthDate = new Date(currentYear - 1, birthMonth - 1, birthDay);
  }
  const diffTime = today.getTime() - birthDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  displayDays.textContent = String(diffDays);
  return diffDays;
}

function handlebirthYear(): number {
  const yearInput = document.getElementById("year")! as HTMLInputElement;
  const yearError = document.getElementById("yearError")! as HTMLDivElement;
  const birthYear = yearInput.value.trim();
  const numericYear = Number(birthYear);
  const { currentYear } = getCurrentDate();
  if (birthYear === "") {
    yearError.innerText = "This is a required field";
    return 0;
  }
  if (!/^\d{4}$/.test(birthYear)) {
    yearError.innerText = "Year must be a four digit number";
    return 0;
  }

  if (numericYear > currentYear) {
    yearError.innerText = "Enter a valid birthYear(can not be in the future)";
    return 0;
  }
  if (numericYear < 1900 || numericYear > 2100) {
    yearError.innerText = "year should  range between 1900 and 2100";
    return 0;
  }
  yearError.innerText = "";
  return numericYear;
}

function handleBirthMonth(): number {
  const monthError = document.getElementById("monthError")! as HTMLDivElement;
  const monthInput = document.getElementById("month")! as HTMLInputElement;
  const birthMonth = monthInput.value.trim();
  const numericMonth = Number(birthMonth);

  if (birthMonth == "") {
    monthError.innerText = "This is a required field";
    return 0;
  }
  if (numericMonth < 1 || numericMonth > 12) {
    monthError.innerText = "Month must be between 1 and 12";
    return 0;
  }
  monthError.innerText = "";
  return numericMonth;
}
function handleBirthDate(): number {
  const dayError = document.getElementById("dayError")! as HTMLDivElement;
  const dayInput = document.getElementById("day")! as HTMLInputElement;
  const bitrhDate = dayInput.value.trim();
  const numericDate = Number(bitrhDate);

  if (bitrhDate === "") {
    dayError.innerText = "This is a required field";
    return 0;
  }
  if (numericDate < 1 || numericDate > 31) {
    dayError.innerText = "Day must be between 1 and 31";
    return 0;
  }
  dayError.innerText = "";
  return numericDate;
}

function isValidBirthDate(
  birthYear: number,
  birthMonth: number,
  birthDay: number
): boolean {
  const testDate = new Date(birthYear, birthMonth - 1, birthDay);
  return (
    testDate.getFullYear() === birthYear &&
    testDate.getMonth() === birthMonth - 1 &&
    testDate.getDate() === birthDay
  );
}

button.addEventListener("click", handleInputSubmit);
