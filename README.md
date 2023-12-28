# rehype-figure-title

This is a simple rehype plugin to transform images into figures while using the _title_ (not the alt text) as a caption. It draws _heavily_ on [rehype-figure](https://github.com/josestg/rehype-figure)

## Install

```sh
npm install rehype-figure-title
```

## What it does

This plugin will transform all your images into `<figure>` tags. So...

```md
![Alt Text](./img.jpg)
```

...becomes...

```html
<figure class="rehype-figure-title">
  <img src="./img.jpg" alt="A figure" />
</figure>
```

All well and good. But what if you want captions? It's poor practice to just use alt tags—those should be descriptions of the image for people who can't see it. But there's another standard way to associate text with an image in markdown: the title. Titles are relatively useless on images (they provide a browser-based tooltip that appears fitfully on hover, _also_ gets read out by some screen readers, and is basically useful only for [XKCD](https://xkcd.com/)). So this hijacks the title field:

```md
![Alt text](./img.jpg "The caption")
```

...becomes...

```html
<figure class="rehype-figure-title">
  <img src="./img.jpg" alt="A figure" />
  <figcaption>The caption</figcaption>
</figure>
```

That's pretty much it.

## How to use it

Insert it into your toolchain like any other rehype plugin:

```js
import rehypeFigureTitle from 'rehype-figure-title';

function compile(markdownIn) {
  return unified()
    .use(remark)
    .use(remark2rehype)
    .use(rehypeFigureTitle, { className: /* optional class name for figures */ ""})
    .process(...);
}
```
