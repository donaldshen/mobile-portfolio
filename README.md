# Website Performance Optimization portfolio project
The completely-optimized project was built inside `./build`  

Search `opt` then you can locate all optimizations I made.

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
#### Inside `DOMContentLoaded` event listener:
- Reduced pizza number from 200 to 40. Five rows can cover a screen with 1080px height.

- Replaced querySelector by getElementById.
  > getElementsById returns a live NodeList while querySelector returns a static NodeList, which means it must query the dom for changes. That result in forced-synchronous-layout.

#### Inside `updatePositions`
- Used getElementsByClassName instead of querySelectorAll.

- Used `transform: translateX()` instead of directly modifying left property. Then add `will-change: transform` to pizza.
  > CSS3 hardware acceleration can reduce re-layout.

- Added `backface-visibility: hidden` to pizza
  > FYI: I got this idea from this [video](https://classroom.udacity.com/nanodegrees/nd001/parts/00113454012/modules/273584856175462/lessons/5988439100/concepts/68776485930923). Since we only have 2D-transform here I didn't know why we should put this on. There weren't visible changes in the dev tools.
