export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const TOTAL_SCORE = 'TOTAL_SCORE';
export const USER_IMAGE = 'TOTAL_SCORE';

export const updateEmail = (email) => ({
  type: UPDATE_EMAIL,
  email,
});

export const updateUsername = (userName) => ({
  type: UPDATE_USERNAME,
  userName,
});

export const updateScore = (score) => ({
  type: UPDATE_SCORE,
  score,
});

export const totalScore = (assertions) => ({
  type: TOTAL_SCORE,
  assertions,
});
export const gravatarImage = (image) => ({
  type: USER_IMAGE,
  image,
});
