

export const newGamePW = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let pw = '';
  for (let i = 0; i < 4; i++) {
    pw += letters[(Math.floor(Math.random() * letters.length))]; 
  }
  return pw;
}
