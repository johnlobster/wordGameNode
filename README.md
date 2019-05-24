# wordGameNode
Letter guessing game running on bash terminal using node.js

#### Technologies and node modules
* typescript 
* javascript
* GitHub
* lodash
* terminal-kit (cursor movement, text and key input)
* gulp (to automate Typescript compilation)
* node.js

#### Github repository
<https://github.com/johnlobster/wordGameNode.git>

#### Deploying
clone the master repo

`npm install` will install all the node modules

`node run` will run the program, instructions are on screen

The file `run.js` is a javascript wrapper that will call the main program `wordGameNode.js`

If you wish to edit typescript files, start gulp by using

`npx gulp watch`

This will then compile the typescript files in the background. This also adds sourcemap information to the
generated javascript that will allow debugging of the typescript source

#### Results
Results can be found in the results sub-directory.
`results/README.txt` has details

#### Design notes

I used `terminal-kit` to move the cursor around and have an output that stayed in the same place. The problem is that 
you can't then use `console.log()` to debug. So I got all the logic working without `terminal-kit` and then added the `terminal-kit` functions. 

I had some difficulties getting some simple things working

1. Using typescript I ended up using the javascript es6 syntax for importing and exporting modules. Unfortunately,     Node.js does not support this. Using the `esm` module, I was able to overcome this using file `run.js`
   ```
   // node.js does not understand the es6 export/import
   // This hack allows imports and exports to work
   require = require("esm")(module);
   module.exports = require("./wordGameNode.js");
   ```
   This directly loads wordGameNode.js, which is created by gulp running the typescript compiler

2. terminal-kit has a terminal raw input mode where a .on("key") event handler can intercewpt any key press. The 
   problem was that I could not find a way to disable this event handler, which was  a problem with entering the word or the yes/no terminal-kit method. I solved this by using a global boolean variable tha makes the event
   handler do nothing if true, so it does not interfere with other entryu methods.

3. There is still a bug in the program. The cursor should move to a different location when reading a word. It goes    back to the location where single keys are typed. I have no idea why this is happening, as there is an explicit 
   call of `term.moveTo()` immediately before the word is entered, and it used to work properly ......

Other design notes

* Gulp was reasonably easy to use. It reads gulpfile.js and creates a compile pipeline for typescript. It doesn't     understand dependencies so just compiles all the typescript files. Overkill for such a simple project. make would   understand the dependencies better but cannot be run as a background process that watches files for changes

* Typescript. Adding type information to variables and functions was easy after a while. I started with javascript    constructor functions at first but the typing was very confusing so I converted to classes. The class syntax is     supported by javascript es6, and es6 is (mostly) supported by Node.js, so the typescript compiler doesn't change    much. I didn't explore replacing the VSCode typescript compiler with the node versions and using it's error
  checking. The inline error detection and hints worked very well with the existing typescript setup. Inspect 
  debugger didn't work in conjunction with terminal-kit, as could not provide inputs to program.

* Lodash. I only used two methods from lodash, could possibly have used more to replace some of the for loops


