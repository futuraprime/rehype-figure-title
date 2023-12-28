import { unified } from "unified";
import remark from "remark-parse";
import remark2rehype from "remark-rehype";
import stringify from "rehype-stringify";

import rehypeFigureTitle from "./index";

function compile(string, opt = {}) {
  return unified()
    .use(remark)
    .use(remark2rehype)
    .use(rehypeFigureTitle, opt)
    .use(stringify)
    .processSync(string)
    .toString();
}

test("make a figure with a title as caption", () => {
  const raw = `![A figure](./img.jpg "A caption")`;
  const cooked = `<figure class="rehype-figure-title"><img src="./img.jpg" alt="A figure"><figcaption>A caption</figcaption></figure>`;
  expect(compile(raw)).toEqual(cooked);
});

test("don't add a caption if it's not specified", () => {
  const raw = `![A figure](./img.jpg)`;
  const cooked = `<figure class="rehype-figure-title"><img src="./img.jpg" alt="A figure"></figure>`;
  expect(compile(raw)).toEqual(cooked);
});

test("take a custom class", () => {
  const raw = `![A figure](./img.jpg "A caption")`;
  const cooked = `<figure class="my-class"><img src="./img.jpg" alt="A figure"><figcaption>A caption</figcaption></figure>`;
  expect(compile(raw, { className: "my-class" })).toEqual(cooked);
});

test("don't gang these together", () => {
  const raw = `![A figure](./img.jpg "A caption")![Another figure](./img2.jpg "Another caption")`;
  const cooked = `<div class="rehype-figure-title-container"><figure class="rehype-figure-title"><img src="./img.jpg" alt="A figure"><figcaption>A caption</figcaption></figure><figure class="rehype-figure-title"><img src="./img2.jpg" alt="Another figure"><figcaption>Another caption</figcaption></figure></div>`;
  expect(compile(raw)).toEqual(cooked);
});
