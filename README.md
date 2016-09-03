# Website Performance Optimization portfolio project
The completely-optimized project was built inside `./build`  

Search `opt` then you can locate all the optimizations I made.

## Part 1: Optimize PageSpeed Insights score for index.html
- Used html tag like `async` and attribute `media` as many as I could. Check them in index.html. I added comments with 'opt:' above them.

- Used gulp to inline css, minify js/html/image files.
  > Be careful, we should only inline some small css files into index.html. Attempt to inline some huge css files like Bootstrap will cause serious bugs.

- Used local font instead of google font.
- Added class to index.html using BEM and refined style.css.

My `PageSpeed` score achieves at 96 for mobile.

#### How to use gulp to build this project?
Run the following commands in this repo's path in your computer:
```
npm install

gulp
```

## Part 2: Optimize Frames per Second in pizza.html
#### Overall
- Replaced all querySelector(all) by getElementBy(Id/ClassName) accordingly.
  > getElementsByClassName returns a live NodeList while querySelectorAll returns a static NodeList, which means it must query the dom for changes. That result in forced-synchronous-layout.

#### Inside `DOMContentLoaded` event listener:
- Reduced pizzas in background from 200 to 40. Five rows can cover a screen with 1080px height.



- ~~Rendered all pizzas in their own layer.~~
  > Sometimes it made frame-rate better but sometimes it don't. And this opt will increase scripting&composite time for sure. So I decided to deprecate it.

#### Inside `updatePositions`
- Used getElementsByClassName instead of querySelectorAll.

- Used `transform: translateX()` instead of directly modifying left property. Then add `will-change: transform` to pizza.
  > CSS3 hardware acceleration can reduce re-layout.


### Inside `resizePizzas`
- Used new technique to calculate pizza's `newwidth`.
