import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
import { renderAboutPage } from './about.ts'

const indexhtml = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
      <br>
    </a>
      <a href="/about">About Page (traditional)</a>
  <br>
    <!-- Enlace con onclick (NO activará Navigating) -->
    <a href="#" id="aSpa">About (SPA style)</a>
    <br>
    <!-- Enlace externo -->
    <a href="https://google.com">Google (external)</a>
    <h1>Vite + TypeScripts</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
    <hr>
    <h3>Hola?</h3>
  </div>
  
  

`

export function renderMain() {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = indexhtml;
  function setupToAbout() {
    const navigateToAbout = () => {
      console.log("navigate about");
      history.pushState({}, '', '/about');
      renderAboutPage();
    }
    const element = document.querySelector<HTMLAnchorElement>('#aSpa')!;
    element.addEventListener('click', () => {
        navigateToAbout();
      })
  }
  setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
  setupToAbout();
}
renderMain();



