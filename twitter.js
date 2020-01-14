const puppeteer = require("puppeteer");

const BASE_URL = "https://twitter.com";
const LOGIN_URL = "https://twitter.com/login";
const USERNAME_URL = username => `https://twitter.com/${username}`;

let browser = null;
let page = null;

const refactoringTwitter = {
  // INITIAL PAGE
  initialize: async () => {
    browser = await puppeteer.launch({
      headless: false,
      devtools: true,
      defaultViewport: {
        width: 1024,
        height: 768
      }
    });
    page = await browser.newPage();
    await page.goto(BASE_URL);
  },
  // LOGIN
  login: async (username, password) => {
    await page.goto(LOGIN_URL);
    await page.waitFor(1000);
    await page.type(
      'form[class="t1-form clearfix signin js-signin"] input[name="session[username_or_email]"]',
      username,
      { delay: 30 }
    );
    await page.type(
      "#page-container > div > div.signin-wrapper > form > fieldset > div:nth-child(3) > input",
      password,
      { delay: 30 }
    );
    await page.click(
      "#page-container > div > div.signin-wrapper > form > div.clearfix > button"
    );
    await page.waitFor(2000);
  },

  // POST TWEET
  postTweet: async message => {
    let url = await page.url();

    if (url != BASE_URL) {
      await page.goto(BASE_URL);
    }

    await page.waitFor(1000);
    await page.click(
      "div.css-1dbjc4n.r-14lw9ot.r-1tlfku8.r-1ljd8xs.r-13l2t4g.r-1phboty.r-1jgb5lz.r-11wrixw.r-61z16t.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div.css-1dbjc4n.r-14lw9ot.r-184en5c > div.css-1dbjc4n.r-156q2ks > div:nth-child(1) > div > div > div.css-1dbjc4n.r-1iusvr4.r-16y2uox.r-15d164r.r-5f2r5o.r-1bylmt5.r-13tjlyg.r-7qyjyx.r-1ftll1t > div.css-1dbjc4n.r-184en5c > div > div > div > div > div > div > div"
    );
    await page.waitFor(500);
    await page.keyboard.type(message, { delay: 50 });
    await page.click(
      "div.css-1dbjc4n.r-14lw9ot.r-1tlfku8.r-1ljd8xs.r-13l2t4g.r-1phboty.r-1jgb5lz.r-11wrixw.r-61z16t.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div.css-1dbjc4n.r-14lw9ot.r-184en5c > div.css-1dbjc4n.r-156q2ks > div:nth-child(1) > div > div > div.css-1dbjc4n.r-1iusvr4.r-16y2uox.r-15d164r.r-5f2r5o.r-1bylmt5.r-13tjlyg.r-7qyjyx.r-1ftll1t > div:nth-child(2) > div > div > div:nth-child(2) > div.css-18t94o4.css-1dbjc4n.r-urgr8i.r-42olwf.r-sdzlij.r-1phboty.r-rs99b7.r-1w2pmg.r-1n0xq6e.r-1vuscfd.r-1dhvaqw.r-1fneopy.r-o7ynqc.r-6416eg.r-lrvibr > div > span > span"
    );
    },

  // CLOSE
  end: async () => {
    await browser.close();
  }
};

module.exports = refactoringTwitter;
