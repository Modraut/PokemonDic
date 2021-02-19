const showThreeDigits = (number) => {
  let newNumber;
  if(number<10){ newNumber = `#00${number}`}
  if(number>=10 && number<100){ newNumber = `#0${number}`}
  if(number>=100){ newNumber = `#${number}`}
  return newNumber
}