import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
import { renderAboutPage } from './about.ts'
import { apiConfig } from './apiConfig.ts'

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
    <hr>
    <div class="card">
      <button id="getRequest" type="button">Make a get request</button>
      <p id="resRequest" hidden></p>
    </div>
    <hr>
    <div class="card">
      <button id="postRequest" type="button">Make a post request</button>
      <p id="resPostRequest" hidden></p>
    </div>
    <hr>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
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
  function setupGetRequest(){
    let reqCounter=1;
    const makeGetRequest=async ()=>{
      try {

        const response = await fetch(apiConfig.statusUrl)
        if(!response.ok){
          throw new Error('Response status is not ok: '+response.status)
        }

        const result= await response.json();
        const pelement=document.querySelector<HTMLButtonElement>("#resRequest")!;
        pelement.innerHTML="";
        const spanEleC=document.createElement("span");
        spanEleC.textContent="Response from server: "+ reqCounter +" - "+result.Message;
        pelement.appendChild(spanEleC);
        pelement.removeAttribute("hidden");
        reqCounter++;
        console.log(result)
      } catch (error) {
        const pelement=document.querySelector<HTMLButtonElement>("#resRequest")!;
        pelement.innerHTML="";
        const spanEleC=document.createElement("span");
        spanEleC.textContent=`An error ocurred ${error}`;
        pelement.appendChild(spanEleC);
        pelement.removeAttribute("hidden");
        console.error( error)
      }
    }
    const getButtonelement=document.querySelector<HTMLButtonElement>("#getRequest")!;
    getButtonelement.addEventListener("click",()=>{
      makeGetRequest();
    })

  }
  function setupPostRequest(){
    let reqCounter=1;
    const makePostRequest=async ()=>{
      try {
        const response = await fetch(apiConfig.postUrl,{
          method:"POST",
          body:JSON.stringify({Message:"Hola desde JS",Error:false})
        })
        if(!response.ok){
          throw new Error('Response status is not ok: '+response.status)
        }
        const result= await response.json();
        const pelement=document.querySelector<HTMLButtonElement>("#resPostRequest")!;
        pelement.innerHTML="";
        const spanEleC=document.createElement("span");
        spanEleC.textContent="Response from server: "+ reqCounter +" - "+result.Message;
        pelement.appendChild(spanEleC);
        pelement.removeAttribute("hidden");
        reqCounter++;
        console.log(result)
      } catch (error) {
        const pelement=document.querySelector<HTMLButtonElement>("#resPostRequest")!;
        pelement.innerHTML="";
        const spanEleC=document.createElement("span");
        spanEleC.textContent=`An error ocurred ${error}`;
        pelement.appendChild(spanEleC);
        pelement.removeAttribute("hidden");
        console.error( error)
      }
    }
    const getButtonelement=document.querySelector<HTMLButtonElement>("#postRequest")!;
    getButtonelement.addEventListener("click",()=>{
      makePostRequest();
    });

  }
  setupPostRequest();
  setupGetRequest();
  setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
  setupToAbout();
}
renderMain();



