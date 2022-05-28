import type { RubyVM } from "ruby-head-wasm-wasi";
import { events } from "./event";
import { createVM } from "./vm";

async function launch(vm: RubyVM): Promise<RubyVM> {
  // Add event listeners
  function addEventListener(target: HTMLElement): void {
    for (const event of events) {
      for (const element of [target, ...target.querySelectorAll<HTMLElement>(`*[data-rb-on${event}]`)]) {
        const method = element.dataset[`rbOn${event}`];
        if (method) {
          element.addEventListener(event, () => {
            vm.eval(`send(:${method})`);
          });
        }
      }
    }
  }

  addEventListener(document.body);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node instanceof HTMLElement) {
          addEventListener(node);
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Execute Ruby codes
  for (const element of document.querySelectorAll<HTMLScriptElement>("script[type*='text/ruby']")) {
    if (element.src) {
      const response = await fetch(element.src);
      const content = await response.text();
      vm.eval(content);
    } else if (element.textContent) {
      vm.eval(element.textContent);
    }
  }

  return vm;
}

export const loadedVM: Promise<RubyVM> = createVM().then(launch);
