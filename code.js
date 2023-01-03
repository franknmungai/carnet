function birthdayCakeCandles(candles) {
  let max = candles[0];
  for (let candle of candles) {
    if (candle > max) {
      max = candle;
    }
  }

  return candles.filter((can) => can === max).length;
}

// console.log(birthdayCakeCandles([3, 2, 1, 3]));

function timeConversion(s) {
  const tokens = s.split(':');
  const hours = Number(tokens[0]);
  let hours24;

  if (s.toUpperCase().endsWith('PM')) {
    if (hours === 12) {
      hours24 = '12';
    } else {
      hours24 = (hours + 12).toString();
    }
  } else {
    //AM
    if (hours === 12) {
      hours24 = '00';
    } else {
      hours24 = hours.toString();
    }
  }

  const convertedTime = [hours24, ...tokens.slice(1)].join(':');
  return convertedTime.replace(/[am,AM|pm,PM]/g, '');
}
console.log(timeConversion('12:15:00pm'));
