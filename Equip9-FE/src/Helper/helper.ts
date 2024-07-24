export const getIndianTime=()=> {
 const date = new Date();
 const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
 const istOffset = 5.5 * 60 * 60000;
 const istDate = new Date(utcTime + istOffset);
 return istDate.getHours();
}

export const createUsernameValidation = (name:string) => ({
  required: {
    value: true,
    message: name+' is required!',
  },
  pattern: {
    value: /^\S*$/,
    message: 'Invalid Username',
  },
});

export const createMobileValidation = () => ({
  required: {
    value: true,
    message: 'Mobile Number is required!',
  },
  pattern: {
    value: /^[0-9]{10}$/,
    message: 'Invalid Mobile Number',
  },
});


export const passwordValidation = {
  required: {
    value: true,
    message: 'Password is required!',
  },
  minLength: {
    value: 6,
    message: 'Password must be at least 6 characters long!',
  },
};

export const confirmPasswordValidation = (password:string) => ({
  required: {
    value: true,
    message: 'Confirm Password is required!',
  },
  validate: {
    matches: (value:string) => {
      return value === password || 'Passwords do not match';
    }
  }
});

export const emailValidation={
  required: {
    value: true,
    message: 'Email is required!',
  },
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Invalid email address!',
  },
}
export const phoneValidation= {
  required: {
    value: true,
    message: 'Phone number is required!',
  },
  pattern: {
    value: /^[0-9]{10}$/,
    message: 'Invalid phone number!',
  },
}
