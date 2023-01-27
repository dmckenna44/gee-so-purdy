

const apiURL = 'https://api.api-ninjas.com/v1/trivia?category=sportsleisure&limit=5'
const apiKey = '9Rbb1WK7TcmSnqfbod1z+g==X3Oe21LmDSY26HOF'
  
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


// getTrivia();

export default getTrivia;