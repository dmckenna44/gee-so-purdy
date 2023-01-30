import * as types from '../constants/actionTypes.js';

export const setNumCatActionCreator = num => ({
  type: types.SET_NUM_CATEGORIES,
  payload: num
});

export const setNumQActionCreator = num => ({
  type: types.SET_NUM_QUESTIONS,
  payload: num
});

export const setCatNameActionCreator = (catName, index) => ({
  type: types.SET_CAT_NAME,
  payload: [catName, index]
})

export const updateClueActionCreator = (column, row, clue) => ({
  type: types.UPDATE_CLUE,
  payload: [column, row, clue]
});

export const setGameActionCreator = game => ({
  type: types.SET_GAME,
  payload: game
});

export const loadGamesActionCreator = games => ({
  type: types.LOAD_GAMES,
  payload: games
})

export const setNameActionCreator = name => ({
  type: types.SET_NAME,
  payload: name
})

export const createUserActionCreator = user => ({
  type: types.CREATE_USER,
  payload: user
})

export const setUserIdActionCreator = id => ({
  type: types.SET_USERID,
  payload: id
})

export const setCurrentQuestionActionCreator = question => ({
  type: types.SET_CURRENT_Q,
  payload: question
})

export const setCurrentAnswerActionCreator = answer => ({
  type: types.SET_CURRENT_A,
  payload: answer
})

export const setCurrentIndexActionCreator = (column, row) => ({
  type: types.SET_CURRENT_A,
  payload: [column, row]
})

export const setUsernameActionCreator = username => ({
  type: types.SET_USERNAME,
  payload: username
})

export const setRandomGameActionCreator = clues => ({
  type: types.SET_RAND_GAME,
  payload: clues
})

export const setGamePasswordActionCreator = pw => ({
  type: types.SET_GAME_PW,
  payload: pw
})

export const addPlayerActionCreator = name => ({
  type: types.ADD_PLAYER,
  payload: name
})

export const removePlayerActionCreator = name => ({
  type: types.REMOVE_PLAYER,
  payload: name
})

// export const SET_NUM_CATEGORIES = 'SET_NUM_CATEGORIES';
// export const SET_NUM_QUESTIONS = 'SET_NUM_QUESTIONS';
// export const UDPATE_CLUE = 'UPDATE_CLUE';
// export const SAVE_GAME = 'SAVE_GAME';
