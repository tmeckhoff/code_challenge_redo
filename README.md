This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Instructions for how to run the program

npm install, then:

`npm start` or `yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### What I changed from previous submission

1. Updated to ES6
  I made this change just because I am accustomed now with using it, and prefer it.
2. Restructured files
  Before I had all the app files under /src. Adding components in /components and the JSON files in /data makes it easier to understand where everything is and makes the files more meaningful.
3. Renamed variables
  Previously my variable names where too generic and/or obtuse, so I renamed them to be more meaningful and understandable.
4. Covered edge cases
  This was my biggest flaw from the previous submission, I didn't have anything in place to deal with edge cases.
5. Changed construct message feature
  Going back over the instructions, I realized that I likely misinterpreted what you were looking for with the construct message feature. Given that the complexity involved in being able to populate a user constructed message with the values selected from the dropdown, you were probably just wanting the ability to have the user enter a message without those values.
6. Creating additional components
  Previously I had all the functionality in one component, MessageComponent, which kind of defeats the whole purpose of using React. Given that we are dealing with 3 sources of data, I thought it made sense to have 3 components based on that data.
7. Refactor handleMessage function in MessageComponent
  Previously there was a lot going on in that one function, so I pulled out all the time/greeting related logic to its own function and also refactored how I was determining time of day based on timezone, using switch case instead of if/else if/else and it looks cleaner and easier to understand.
