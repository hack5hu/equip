export const getTimeAgo = (date: string) => {
  const now = new Date();
  const timestamp = new Date(date);
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  }
};

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
