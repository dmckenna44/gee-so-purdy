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

export const setGameNameActionCreator = name => ({
  type: types.SET_GAME_NAME,
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

export const updatePlayersActionCreator = players => ({
  type: types.UPDATE_PLAYERS,
  payload: players
})

export const setActivePlayerActionCreator = player => ({
  type: types.SET_ACTIVE_PLAYER,
  payload: player
})

export const setRoomIDActionCreator = id => ({
  type: types.SET_ROOM_ID,
  payload: id
})

export const setClueValueActionCreator = value => ({
  type: types.SET_ACTIVE_CLUE_VALUE,
  payload: value
})

export const setPlayerNameActionCreator = name => ({
  type: types.SET_PLAYER_NAME,
  payload: name
})

export const setCorrectResponseActionCreator = bool => ({
  type: types.SET_CORRECT_RESPONSE,
  payload: bool
})

export const setBuzzersActiveActionCreator = bool => ({
  type: types.SET_BUZZERS_ACTIVE,
  payload: bool
})

export const setTimerActionCreator = bool => ({
  type: types.SET_TIMER,
  payload: bool
})

export const setActiveClueActionCreator = bool => ({
  type: types.SET_ACTIVE_CLUE,
  payload: bool
})

export const setCanAnswerActionCreator = bool => ({
  type: types.SET_CAN_ANSWER,
  payload: bool
})

export const setGameIdActionCreator = id => ({
  type: types.SET_GAME_ID,
  payload: id
})

export const clearGameActionCreator = () => ({
  type: types.CLEAR_GAME,
})

export const setShowAnswerActionCreator = (bool) => ({
  type: types.SET_SHOW_ANSWER,
  payload: bool
})

export const updateGameActionCreator = (game) => ({
  type: types.UPDATE_GAME,
  payload: game
})

export const loadActiveGamesActionCreator = (games) => ({
  type: types.LOAD_ACTIVE_GAMES,
  payload: games
})