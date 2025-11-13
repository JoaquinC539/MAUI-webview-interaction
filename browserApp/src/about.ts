import { renderMain } from "./main";

const abouthtml = `
    <div>
      <h1>About Page</h1>
      <a href="#" id="backhomea">Back to Home</a>
    </div>
  `
export function renderAboutPage() {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = abouthtml;
    console.log("about")
    function setupLink() {
        const navigateIndex = () => {
            console.log("navigate index");
            history.pushState({}, '', '/');

            renderMain();
        }
        const element = document.querySelector<HTMLAnchorElement>('#backhomea')!;
        element.addEventListener('click', () => {
            navigateIndex();
        })
    }

    setupLink();
}