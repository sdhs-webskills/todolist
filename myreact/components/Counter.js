import {useState} from "../core/MyReact.js";

export function Counter () {
  const [count, setCount] = useState(1);
  const [meow, setMeow] = useState('야옹!');

  window.increment = () => {
    setCount(count + 1);
    setMeow("야옹! ".repeat(count + 1));
  }

  return `
    <div>
      <p>고양이가 ${count}번 울면 : ${meow}</p>
      <p><button onclick="increment();">증가</button></p>
    </div>
  `
}
