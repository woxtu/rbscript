import type { RubyVM } from "ruby-head-wasm-wasi";
// @ts-ignore
import { DefaultRubyVM } from "ruby-head-wasm-wasi/dist/browser.umd.js";

export async function createVM(): Promise<RubyVM> {
  const response = await fetch(
    // The latest version available at this time
    "https://cdn.jsdelivr.net/npm/ruby-head-wasm-wasi@0.3.0-2022-05-10-a/dist/ruby+stdlib.wasm"
  );
  const buffer = await response.arrayBuffer();
  const module = await WebAssembly.compile(buffer);
  const { vm } = await DefaultRubyVM(module);
  return vm;
}
