# Website Performance Optimization portfolio project
The completely-optimized project was built inside `./build`  

Search `opt` then you can locate all optimizations I made.

## Part 1: Optimize PageSpeed Insights score for index.html
- Used html tag like `async` and attribute `media` as many as I could. Check them in index.html. I added comments with 'opt:' above them.

- Used gulp to inline css, minify js/html/image files.
  > Be careful, we should only inline some small css files in index.html. Attempt to inline some huge css files like Bootstrap will cause serious bugs.

- Used local font instead of google font.

My `PageSpeed` score achieves at 96 for mobile.

#### How to use gulp to build this project?
Run the following commands in this repo's path in your computer:
```
npm install

gulp
```

## Part 2: Optimize Frames per Second in pizza.html
- Reduce pizza number from 200 to 20
- ~~Use getElementsByClassName instead of querySelectorAll~~
  > ~~getElementsByClassName returns a live NodeList while querySelectorAll returns a static NodeList, which means it must query the dom for changes. That result in forced-synchronous-layout.~~  

  > This tip is introduced by this [webcast record](https://classroom.udacity.com/nanodegrees/nd001/parts/00113454012/modules/273584856175462/lessons/5988439100/concepts/68776485930923#). It bring in a bug that the pizzas in background won't move when scrolling.
