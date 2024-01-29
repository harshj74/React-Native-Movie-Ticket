export const handleEmail = (text: string) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  if (text.length === 0) {
    return 'E-mail should not be empty';
  } else if (reg.test(text) === false) {
    return 'Enter valid E-mail';
  } else if (reg.test(text) === true) {
    return undefined;
  }
};

export const handlePassword = (pass: string) => {
  let conditioncheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).*$/g;

  if (pass.length === 0) {
    return 'Password should not be empty';
  } else if (pass.length < 8) {
    return 'Password length should not be less than 8';
  } else if (conditioncheck.test(pass) === false) {
    return 'Password should contain atleast one uppercase, lowercase and special character';
  } else if (pass.length >= 8) {
    return undefined;
  }
};

export const handleUsername = (user: string) => {
  let expr = /^[a-z_]+[0-9]+[a-z_0-9]*$/g;

  if (user.length === 0) {
    return 'Username should not be empty';
  } else if (expr.test(user) === false) {
    return 'Username should contain small case letters,one underscore, and atleast one number';
  } else if (expr.test(user) === true) {
    return undefined;
  }
};

export const handleMobileno = (mob: string) => {
  let expr = /^[\d \-()]*$/;

  if(mob.length === 0) {
    return 'Mobile No should not be empty';
  } else if (expr.test(mob) === false) {
    return'Mobile No should not contain letters';
  } else if (mob.length < 10) {
    return 'Mobile No should not be less than 10';
  } else if (mob.length > 10) {
    return 'Mobile No should not be more than 10';
  } else if (expr.test(mob) === true) {
    return undefined;
  } 
};
