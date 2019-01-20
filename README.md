This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Instructions for how to run the program

npm install, then:

`npm start` or `yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


#### What I changed from the previous submission (https://github.com/tmnewberry/code_challenge)

#### Updated to ES6
  I made this change just because I am accustomed now with using it, and prefer it.
#### Restructured files
  Before I had all the app's files under /src. Adding components in /components and the JSON files in /data makes it easier to understand where everything is and makes it more meaningful for what the files are for.
#### Renamed variables/refactored UI
  Previously my variable names where too generic and/or obtuse, so I renamed them to be more meaningful and understandable. I also refactored the UI a little, like what things were named and when to display certain things.
#### Covered edge cases
  This was a big flaw from the previous submission, I didn't have anything in place to deal with edge cases. For example, what happens if they don't select a guest, company or message? I resolved this by adding if checks to ensure that the state has those values set if we are doing a select message vs construct message. If not, I am displaying error message to the user.
#### Changed construct message feature
  Going back over the instructions, I realized that I likely misinterpreted what you were looking for with the construct message feature. Given the complexity involved in being able to populate a user constructed message with the values selected from the drop downs, you were probably just wanting the ability to have the user enter a message not containing those values. So I made that change and displayed a note to end user stating that the constructed message would not contain those values.
#### Creating additional components
  Previously I had all the functionality in one component, MessageComponent, which kind of defeats the whole purpose of using React. Given that we are dealing with 3 sources of data, I thought it made sense to have 3 components based on that data. Also, refactored how I was setting the selected guest and company, changing it from a for loop to .find because it is cleaner.
#### Refactor handleMessage function in MessageComponent
  Previously there was a lot going on in that one function, so I pulled out all the time/greeting related logic to its own function. Also, refactored how I was determining time of day based on timezone, using switch case instead of if/else if/else because it looks cleaner and easier to understand, and used Moment Js Timezone instead of Js Date object.
