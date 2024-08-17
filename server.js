const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const generateFibonacci = (n) => {
  let a = 0, b = 1, result = [];
  while (n > 0) {
    result.push(a);
    [a, b] = [b, a + b];
    n--;
  }
  return result;
};


const isPrime = (num) => {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const generatePrimes = (limit) => {
  let primes = [];
  for (let i = 2; i <= limit; i++) {
    if (isPrime(i)) primes.push(i);
  }
  return primes;
};

const generateRandomNumbers = (count, min = 0, max = 100) => {
  let numbers = [];
  for (let i = 0; i < count; i++) {
    numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return numbers;
};


app.post('/numbers/fibo', jsonParser, (req, res) => {
  const { count } = req.body;

  if (typeof count === 'number' && count > 0) {
    const fibonacciNumbers = generateFibonacci(count);
    res.json({ numbers: fibonacciNumbers });
  } else {
    res.status(400).json({ error: 'Invalid input. Please provide a positive number as count.' });
  }
});

app.post('/numbers/even', jsonParser, (req, res) => {
  const { numbers } = req.body;

  if (Array.isArray(numbers)) {
    const evenNumbers = numbers.filter(num => num % 2 === 0);
    res.json({ numbers: evenNumbers });
  } else {
    res.status(400).json({ error: 'Invalid input. Please provide an array of numbers.' });
  }
});

app.post('/numbers/primes', jsonParser, (req, res) => {
  const { limit } = req.body;

  if (typeof limit === 'number' && limit > 0) {
    const primes = generatePrimes(limit);
    res.json({ numbers: primes });
  } else {
    res.status(400).json({ error: 'Invalid input. Please provide a positive number as limit.' });
  }
});

app.post('/numbers/rand', jsonParser, (req, res) => {
  const { count, min, max } = req.body;

  if (typeof count === 'number' && count > 0) {
    const randomNumbers = generateRandomNumbers(count, min || 0, max || 100);
    res.json({ numbers: randomNumbers });
  } else {
    res.status(400).json({ error: 'Invalid input. Please provide a positive number as count.' });
  }
});


app.listen(9876, () => {
  console.log('Server is running on port 9876');
});
