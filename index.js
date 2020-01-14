const puppeteer = require("puppeteer");
require("dotenv").config();
const refactoringTwitter = require("./twitter");

const twitter = async () => {
  const USER = process.env.USER_TWITTER;
  const PASSWORD = process.env.USER_TWITTER_PASSWORD;

  await refactoringTwitter.initialize();
  await refactoringTwitter.login(USER, PASSWORD);
  await refactoringTwitter.postTweet("Hello World, this is another test message...")
  // debugger;

  // await browser.close();
};

twitter();
