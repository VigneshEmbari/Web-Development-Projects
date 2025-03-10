function generatePassword() {
  const length = document.getElementById("length").value;
  const includeUppercase = document.getElementById("uppercase").checked;
  const includeNumbers = document.getElementById("numbers").checked;
  const includeSpecial = document.getElementById("special").checked;

  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const specialChars = "!@#$%^&*()_+{}[]<>?";

  let availableChars = lowercaseChars;
  if (includeUppercase) availableChars += uppercaseChars;
  if (includeNumbers) availableChars += numberChars;
  if (includeSpecial) availableChars += specialChars;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    password += availableChars[randomIndex];
  }

  document.getElementById("password").textContent = password;

  const copyBtn = document.getElementById("copy");
  copyBtn.disabled = !password;
}

document.getElementById("copy").addEventListener("click", function () {
  const password = document.getElementById("password").textContent;
  if (password) {
    navigator.clipboard.writeText(password);
  }
});

document.getElementById("copy").disabled = true;

document.getElementById("generate").addEventListener("click", generatePassword);
