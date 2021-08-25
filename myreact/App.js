import { Counter } from "./components/Counter.js";

export function App () {
  return `
    <div>
      Counter App
      ${Counter()}
    </div>
  `;
}