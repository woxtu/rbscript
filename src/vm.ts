import type { RubyVM } from "ruby-head-wasm-wasi";
// @ts-ignore
import { DefaultRubyVM } from "ruby-head-wasm-wasi/dist/browser.esm.js";

export async function createVM(): Promise<RubyVM> {
  const response = await fetch(
    "https://cdn.jsdelivr.net/npm/ruby-head-wasm-wasi@0.3.0-2022-06-04-a/dist/ruby+stdlib.wasm"
  );
  const buffer = await response.arrayBuffer();
  const module = await WebAssembly.compile(buffer);
  const { vm } = await DefaultRubyVM(module);
  return vm;
}
