

export const newGamePW = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let pw = '';
  for (let i = 0; i < 4; i++) {
    pw += letters[(Math.floor(Math.random() * letters.length))]; 
  }
  return pw;
}

export const formatClues = (clues, categories) => {
  const formattedClues = clues.map((clueArr, i) => {
    const questions = clueArr.map(clue => clue.question);
    const answers = clueArr.map(clue => clue.answer);

    return {
      category: categories[i],
      questions: questions,
      answers: answers
    }
  })

  return formattedClues;
}