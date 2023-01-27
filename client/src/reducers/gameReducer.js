import * as types from '../constants/actionTypes';
import getTrivia from '../random';

const initialState = {
  userId: null,
  username: '',
  name: '',
  categories: [],
  clues: [],
  players: [],
  userGames: [],
  currentQuestion: '',
  currentAnswer: '',
  currentIndex: null
}

const gameReducer = (state = initialState, action) => {
  let numCat;
  
  switch (action.type) {
    case types.SET_USERID:
      return Object.assign({}, state, {
        userId: action.payload
      })

    case types.SET_USERNAME:
      return Object.assign({}, state, {
        username: action.payload
      })

    case types.SET_NAME:
      return Object.assign({}, state, {
        name: action.payload
      })

    case types.SET_CAT_NAME:
      const [name, index] = action.payload;
      const copyState = {...state};
      copyState.categories[index] = name;
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
      
      console.log('clues array from reducer', arr)

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

    case types.SET_CURRENT_INDEX:
      return Object.assign({}, state, {
        currentIndex: action.payload
      })


    case types.UDPATE_CLUE:
      const [column, row, clue] = action.payload;
      console.log(column, row, clue);
      console.log('update payload', action.payload);
      const newState = {...state};
      console.log('copy of state', newState);
      newState.clues[column][row] = clue;

      return Object.assign({}, state, newState)

    case types.SAVE_GAME:
      return state;

    case types.LOAD_GAMES:
      return Object.assign({}, state, {
        userGames: action.payload
      }) 
    
    case types.SET_RAND_GAME:
      return Object.assign({}, state, {
        clues: action.payload
      })

    case types.CREATE_USER:
      return {...state, userId: action.payload}

    default:
      return state;
  }
}

export const saveGame = () => async (dispatch, getState) => {
  const game = getState().game;
  console.log('state from saveGame thunk', game)

  const formattedClues = game.clues.map((clueArr, i) => {
    const questions = clueArr.map(clue => clue.question);
    const answers = clueArr.map(clue => clue.answer);

    return {
      category: game.categories[i],
      questions: questions,
      answers: answers
    }
  })
  console.log(formattedClues);

  const formattedGame = {
    user_id: game.userId,
    name: game.name,
    clues: formattedClues
  }

  try {
    const addedGame = await fetch('http://localhost:3001/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedGame)
    })
    const returnedGame = await addedGame.json();
    console.log('response from save game POST', returnedGame);

  } catch (err) {
    console.log('error in save game thunk', err)
  }
}

export const loadGames = (userid) => async (dispatch, getState) => {
  const response = await fetch(`http://localhost:3001/games/${userid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  const games = await response.json();
  // console.log('games from api', games);
  dispatch({type: 'LOAD_GAMES', payload: games});
  // console.log('games from state', getState().game.userGames);
}

export const randomGame = () => async (dispatch, getState) => {
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
    for (let i = 0; i < 5; i++) {
      const cat = cats[Math.floor(Math.random() * cats.length)];
      choiceList.push(cat);
      cats = arrayRemove(cats, cat);
    }
    // shuffleArray(choiceList);
    return choiceList;
  };
  
  const finalClues = [];
  
  const getTrivia = async () => {
   const catChoices = createNameList();
    console.log('choicelength', catChoices.length)
   for (let i = 0; i < catChoices.length; i++) {
     const category = catChoices[i]
     const clueObj = {};
     clueObj['category'] = categoryChoices[category];
     const qArr = [];
     const aArr = [];
     const response = await fetch(`https://api.api-ninjas.com/v1/trivia?category=${category}&limit=5`, {
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
   console.log('final clues', finalClues);
   return finalClues;
  }
  const randGame = await getTrivia();
  
  console.log('randGame', randGame);
  dispatch({type: types.SET_RAND_GAME, payload: randGame});
  console.log('game after random func', getState().game);
}

// export const createUser = () => async (dispatch, getState) => {
//   const userId = getState().game.user;

//   await fetch('http://localhost:3000/users'), {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: 
//   }
// }

export default gameReducer;
