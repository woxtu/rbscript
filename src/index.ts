import { createVM } from "./vm";

createVM().then((vm) => {
  vm.eval("puts 'Hello, world!'");
});
