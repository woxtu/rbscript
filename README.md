# RbScript

Run Ruby in your HTML.

```html
<script type="text/ruby">
  puts 'Hello, world!'
</script>
```

This library is built using [ruby.wasm](https://github.com/ruby/ruby.wasm), and greatly inspired by [PyScript](https://pyscript.net/).

## Installation

Import the RbScript file to your HTML:

```html
<script defer src="rbscript.umd.js"></script>
```

## Feature

### Ruby code execution

You can execute Ruby codes written in the `<script>` tag with `text/ruby` type.

```html
<script type="text/ruby" src="./greeting.rb"></script>
```

```html
<script type="text/ruby">
  puts 'Hi!'
</script>
```

### Event handling

You can specify callback functions using data attributes whose name starts with `rb-`.

```html
<button data-rb-onclick="greeting">Hi!</button>

<script type="text/ruby">
  def greeting
    puts 'Hi!'
  end
</script>
```

## License

Licensed under the MIT license.
