This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Instructions for how to run the program

npm install, then:

`npm start` or `yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### An overview of design decisions

Given the requirements for user input, selecting/creating, it made sense to me to build a UI interface even though it wasn't required. My solution for having the user construct their own message was obviously not ideal, and since I am not throwing an error if the constructedMessage is not the right format, I added the extra step of constructing the message before sending it. I think this extra step would be valuable whether you were selecting or constructing your own message, to ensure everything is correct before you send it to the guest.

### What language you picked and why

I went with React because I hadn't done any UI/React work inawhile so thought it'd be good for a refresher. And using Create React App you can have a fully functioning app very quickly.

### Your process for verifying the correctness of your program

I ran through a few scenarios as a user to ensure everything was functioning as expected. This was how I found that if you created a message with a selectedMessage and then tried to create a new message with a constructedMessage it didn't work. That's why I setState to '' for both of those in the log change functions and did an if check before sending either to the template function.

### What didn't you get to, or what else might you do with more time?

For the text field for the user constructing a message, I had the idea of maybe using react-draggable and creating divs for each of the placeholders and allowing the user to move the placeholders into the text field where they wanted them so they wouldn't have to worry about them being in the right format. A change I'd like to make for the dropdowns is using react-select instead of html5 select and resetting the dropdowns after the user sends the message.