export const inputOTPfocus = (clearErrors) => {

    clearErrors("emailOtp1");
    const inputs = document.querySelectorAll("#otp-field > *[id]");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("keydown", function (event) {
        if (event.key === "Backspace" || event.key === "Delete") {
          inputs[i].value = "";
          if (i !== 0) inputs[i - 1].focus();
        } else {
          if (
            (event.keyCode > 47 && event.keyCode < 58) ||
            (event.keyCode > 95 && event.keyCode < 106)
          ) {
            inputs[i].value = event.key;
            if (i !== inputs.length - 1) inputs[i + 1].focus();
            event.preventDefault();
          } else if (event.keyCode > 64 && event.keyCode < 91) {
            event.preventDefault();
          } else if (i === inputs.length - 1 && inputs[i].value !== "") {
            return true;
          }
        }
      });
    }
};

export const hideEmail = (email) => {
  let [name, domain] = email.split('@');
  let hiddenName = name.length > 3 ? name.slice(0, -3) + '***' : '*'.repeat(name.length);
  return `${hiddenName}@${domain}`;
}

export const hidePhoneNumber = (email) => {
  let [name, domain] = email.split('@');
  let hiddenName = name.length > 3 ? name.slice(0, -3) + '***' : '*'.repeat(name.length);
  return `${hiddenName}`;
}

export const getFileName = (url) => {
  let mainFileName = "";
  if(url){
    const urleArr = url.split("/");
    const fileName = urleArr?.length ? urleArr[urleArr.length-1] : "";
    if(fileName){
      const fileNameArr = fileName.split("-");

      mainFileName = fileNameArr?.length ? fileNameArr[fileNameArr.length-1] : "";
    }
  }
  return mainFileName;
}

export const addSpaceAfterFourChars = (str) => {
  return str.match(/.{1,4}/g).join(' '); 
}

export const replaceWithXExceptLast4 = (str) => {
  if (str.length <= 4) {
      return str;
  }

  const maskedPart = 'X'.repeat(str.length - 4);
  const last4Chars = str.slice(-4);  
  
  return maskedPart + last4Chars;
}

export const arraysAreEqual = (arr1, arr2) => {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}
