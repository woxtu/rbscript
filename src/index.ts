import type { RubyVM } from "ruby-head-wasm-wasi";
import { createVM } from "./vm";

async function launch(vm: RubyVM): Promise<RubyVM> {
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
