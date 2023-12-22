import * as types from '../constants/actionTypes';
import { baseUrl } from "../apiRoutes";
import { formatClues } from '../utils';


const initialState = {
  userId: null,
  username: '',
  name: '',
  gameId: '',
  categories: [],
  clues: [],
  players: [],
  playerName: '',
  activePlayer: '',
  activeClue: false,
  activeClueValue: 0,
  correctResponse: false,
  buzzersActive: false,
  canAnswer: true,
  answerVisible: false,
  userGames: [],
  activeGames: [],
  currentQuestion: '',
  currentAnswer: '',
  currentMediaURL: '',
  currentIndex: null,
  password: '',
  roomID: '',
  timer: false
}

const gameReducer = (state = initialState, action) => {
  let numCat;
  let newState;
  let newPlayers;
  
  switch (action.type) {
    case types.SET_USERID:
      return Object.assign({}, state, {
        userId: action.payload
      })

    case types.SET_USERNAME:
      return Object.assign({}, state, {
        username: action.payload
      })

    case types.SET_GAME_NAME:
      return Object.assign({}, state, {
        name: action.payload
      })

    case types.SET_GAME_ID:
      return Object.assign({}, state, {
        gameId: action.payload
      })

    case types.SET_GAME_PW:
      return Object.assign({}, state, {
        password: action.payload
      })

    case types.SET_CAT_NAME:
      const [ catName, index] = action.payload;
      const copyState = {...state};
      copyState.categories[index] = catName;
      return Object.assign({}, state, copyState)


    case types.SET_NUM_CATEGORIES:
      // change the categories to an array of payload length
      numCat = action.payload;

      return Object.assign({}, state, {
        categories: Array(+numCat).fill('Category')
      })

    case types.SET_NUM_QUESTIONS:
      numCat = state.categories.length;
      const numQ = action.payload;
      const arr = [...Array(+numCat)]
                    .map(e => Array(+numQ)
                    .fill({question: 'Question goes here', answer: 'Answer goes here'}))

      return Object.assign({}, state, {
        clues: arr
      });

    case types.SET_CURRENT_Q:
      return Object.assign({}, state, {
        currentQuestion: action.payload
      })

    case types.SET_CURRENT_A:
      return Object.assign({}, state, {
        currentAnswer: action.payload
      })
    
      case types.SET_CURRENT_MEDIA_URL:
        return Object.assign({}, state, {
          currentMediaURL: action.payload
        })

    case types.SET_ACTIVE_CLUE_VALUE:
      return Object.assign({}, state, {
        activeClueValue: action.payload
      })

    case types.SET_CAN_ANSWER:
      return Object.assign({}, state, {
        canAnswer: action.payload
      })

    case types.SET_CORRECT_RESPONSE:
      return Object.assign({}, state, {
        correctResponse: action.payload
      })

    case types.SET_BUZZERS_ACTIVE:
      return Object.assign({}, state, {
        buzzersActive: action.payload
      })

    case types.SET_CURRENT_INDEX:
      return Object.assign({}, state, {
        currentIndex: action.payload
      })

    case types.UPDATE_CLUE:
      const [column, row, clue] = action.payload;

      newState = {...state};
      newState.clues[column][row] = clue;
      return Object.assign({}, state, newState)

    case types.SET_GAME:
      const { name, clues, _id, answered, players } = action.payload;
      const newCategories = clues.map(clue => clue.category);
      const newClues = [];
      clues.forEach(clue => {
        const subArr = [];
        clue.questions.forEach((q, i) => {
          const newClue = {}
          newClue.question = q;
          newClue.answer = clue.answers[i];
          if (clue.urls) newClue.medaURL = clue.urls[i]
          subArr.push(newClue)
        });
        
        newClues.push(subArr)
      })
      answered?.forEach(coord => {
        newClues[coord[0]][coord[1]].answered = true 
      })
      newState = {...state};
      newState.name = name;
      newState.categories = newCategories;
      newState.clues = newClues;
      newState.gameId = _id;
      if (players) newState.players = players;

      return Object.assign({}, state, newState)

    case types.LOAD_GAMES:
      return Object.assign({}, state, {
        userGames: action.payload
      }) 

    case types.LOAD_ACTIVE_GAMES:
      return Object.assign({}, state, {
        activeGames: action.payload
      })

    case types.SET_ACTIVE_PLAYER: 
      return Object.assign({}, state, {
        activePlayer: action.payload
      })
    
    case types.SET_ACTIVE_CLUE:
      // payload: boolean to hide/display ActiveClue
      return Object.assign({}, state, {
        activeClue: action.payload
      })

    case types.SET_SHOW_ANSWER:
      return Object.assign({}, state, {
        answerVisible: action.payload
      })

    case types.SET_TIMER:
      // payload: boolean to hide/display timer
      return Object.assign({}, state, {
        timer: action.payload
      })

    case types.SET_PLAYER_NAME:
      // payload: player name (string), for non-hosts
      return Object.assign({}, state, {
        playerName: action.payload
      })

    case types.ADD_PLAYER:
      newPlayers = [];
      newPlayers.push(action.payload);
      return Object.assign({}, state, {
        players: newPlayers
      })

    case types.UPDATE_PLAYERS:
      // payload: updated array of player names
      return Object.assign({}, state, {
        players: action.payload
    })  

    case types.REMOVE_PLAYER:
      // payload: name of player to remove
      newPlayers = state.players.filter(p => p !== action.payload);
      return Object.assign({}, state, {
        players: newPlayers
      })

    case types.SET_ROOM_ID:
      return Object.assign({}, state, {
        roomID: action.payload
      })

    case types.UPDATE_GAME:
      newState = {...state};
      newState.players = action.payload.players;
      newState.clues = action.payload.clues;

      return Object.assign({}, state, newState);


    case types.CLEAR_GAME:
      return Object.assign({}, state, {
        name: '',
        gameId: '',
        categories: [],
        clues: [],
        players: [],
        playerName: '',
        activePlayer: '',
        activeClue: false,
        activeClueValue: 0,
        correctResponse: false,
        buzzersActive: false,
        canAnswer: true,
        currentQuestion: '',
        currentAnswer: '',
        currentIndex: null,
        password: '',
        roomID: '',
        timer: false
      })

    case types.CREATE_USER:
      return {...state, userId: action.payload}

    default:
      return state;
  }
}

export const saveGame = () => async (dispatch, getState) => {
  const game = getState().game;

  const formattedClues = formatClues(game.clues, game.categories);

  const formattedGame = {
    user_id: game.userId,
    name: game.name,
    clues: formattedClues
  }

  try {
    const addedGame = await fetch(`${baseUrl}/api/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedGame)
    })
    const returnedGame = await addedGame.json();
    console.log('save game successful!');
    return returnedGame;
  } catch (err) {
    console.log('error in save game thunk', err)
  }
}

export const saveGameProgress = () => async (dispatch, getState) => {
  const game = getState().game;

  const answered = [];

  const timeSaved = new Date().toLocaleString();
  
  game.clues.forEach((clueArr, column) => {
    clueArr.forEach((clue, row) => {
      if (clue.answered) answered.push([column, row])
    })
  })

  const formattedClues = formatClues(game.clues, game.categories);

  const gameData = {
    userId: game.userId,
    gameId: game.gameId,
    name: game.name,
    players: game.players,
    clues: formattedClues,
    answered: answered,
    date: timeSaved
  }

  try {
    const options = {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(gameData)
    }
    fetch(`${baseUrl}/api/activegames`, options)
      .then(res => res.json())
      .then(data => console.log('response from save active game ', data))
  } catch (err) {
    console.log(err)
  }
}

export const updateGame = () => async (dispatch, getState) => {
  const game = getState().game;
  const currentGame = game.userGames.find(g => g._id === game.gameId);
  const formattedClues = formatClues(game.clues, game.categories);

  const formattedGame = {
    user_id: game.userId,
    game_id: currentGame?._id,
    name: game.name,
    clues: formattedClues
  }

  try {
    const options = {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedGame)
    }
    fetch(`${baseUrl}/api/games`, options)
      .then(res => res.json())
      .then(data => console.log('response from update ', data))
  } catch (err) {
    console.log('Error when updating game: ', err)
  }
}

export const loadActiveGames = (userid) => async (dispatch, getState) => {
  try {
    const response = await fetch(`${baseUrl}/api/activegames/${userid}`);
    const activeGames = await response.json();
    dispatch({type: types.LOAD_ACTIVE_GAMES, payload: activeGames})
  } catch (err) {
    console.log('error getting active games', err)
  }
}

export const loadGames = (userid) => async (dispatch, getState) => {
  try {
    const response = await fetch(`${baseUrl}/api/games/${userid}`);
    const games = await response.json();
    dispatch({type: types.LOAD_GAMES, payload: games});
  } catch (err) {
    console.log('error loading games', err)
  }
} 

export const randomGame = (numCat, numQ) => async (dispatch, getState) => {
  const game = getState().game;
  
  const finalClues = [];
  const categoryChoices = {
    'artliterature': 'Art & Literature',
    'language': 'Language',
    'sciencenature': 'Science & Nature',
    'general': 'General Knowledge',
    'fooddrink': 'Food & Drink', 
    'peopleplaces': 'People & Places',
    'geography': 'Geography',
    'historyholidays': 'History',
    'entertainment': 'Entertainment',
    'toysgames': 'Toys & Games',
    'music': 'Music',
    'mathematics': 'Mathematics',
    'religionmythology': 'Religion & Myth',
    'sportsleisure': 'Sports & Leisure'
  }
  
  function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele != value;
    });
  }
  
  const createNameList = function () {
    let cats = Object.keys(categoryChoices);
    const choiceList = [];
    for (let i = 0; i < numCat; i++) {
      const cat = cats[Math.floor(Math.random() * cats.length)];
      choiceList.push(cat);
      cats = arrayRemove(cats, cat);
    }
    // shuffleArray(choiceList);
    return choiceList;
  };
  
  
  const getTrivia = async () => {
   const catChoices = createNameList();
   for (let i = 0; i < catChoices.length; i++) {
     const category = catChoices[i]
     const clueObj = {};
     clueObj['category'] = categoryChoices[category];
     const qArr = [];
     const aArr = [];
     const response = await fetch(`https://api.api-ninjas.com/v1/trivia?category=${category}&limit=${numQ}`, {
       method: 'GET',
       headers: {
         'X-Api-Key': '9Rbb1WK7TcmSnqfbod1z+g==X3Oe21LmDSY26HOF'
       }
     })
     const data = await response.json();
    //  console.log(data)
     data.forEach(clue => {
       qArr.push(clue.question);
       aArr.push(clue.answer)
     })
     clueObj['questions'] = qArr;
     clueObj['answers'] = aArr;
     finalClues.push(clueObj);
   }
  
   return finalClues;
  }

  const randGame = await getTrivia();

  try {
    const addedGame = await fetch(`${baseUrl}/api/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user_id: game.userId, name: game.name, clues: randGame})
    })
    const returnedGame = await addedGame.json();
    await dispatch(loadGames(game.userId))
    return returnedGame;
  } catch (err) {
    console.log('error in save game thunk', err)
  }
}


export default gameReducer;
