# The Odin Project - Calculator

This is a simple calculator app built for [The Odin Project](https://www.theodinproject.com) foundations course.

## Assignment

Create a calculator app with UI _(buttons and screen)_ that will have all of the basic math operations _(addition, subtraction, multiplication and division)_. Calculator should not evaluate more then a single pair of numbers at a time. Do not use built-in **eval()** function.

**ADDITIONAL**

Calculator should have keyboard support (with 'Backspace' for delete and 'DEL' for clear) and users should be able to add decimal point.

## Links

[Live app preview](https://hammerztein.github.io/calculator/)

## Things I Used

- `data-*` attributes
- Flex box layout
- Event delegation
- Functional programming

## What I Learned

- Parsing float numbers to certain decimal places
- Functional programming
- Using different event types
- How to de-focus an element

## Acknowledgments

Used this [Stack Overflow question](https://stackoverflow.com/questions/7312468/javascript-round-to-a-number-of-decimal-places-but-strip-extra-zeros) to find out how to round up float point numbers correctly.

Used this [MDN Event documentation](https://developer.mozilla.org/en-US/docs/Web/API/Event/type) to figure out why I needed to use `event.blur` and check for `event.type` before assigning either `event.dataset.value` or `event.key`
