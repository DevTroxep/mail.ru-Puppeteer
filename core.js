const puppeteer = require('puppeteer'),
      BASE_URL = "https://mail.ru/";

const mail = {
    browser: null,
    page: null,

    initialize: async () => {
        mail.browser = await puppeteer.launch({
            headless: true // false = open browser
        });
        mail.page = await mail.browser.newPage();
    },

    main: async (email, password, to, subject, text) => {

        try {

            await mail.page.goto(BASE_URL, {
                waitUntil: 'domcontentloaded'
            });

            await mail.page.waitForSelector('input[name="login"]');
            await mail.page.type('input[name="login"]', email, {
                delay: 20
            });

            const submit = await mail.page.$x(`//*[@id="mailbox:submit-button"]`);
            await submit[0].click();

            await mail.page.waitFor(4000)

            await mail.page.waitForSelector('input[name="password"]');
            await mail.page.type('input[name="password"]', password, {
                delay: 20
            });

            const button2 = await mail.page.$x(`//*[@id="mailbox:submit-button"]/input`);
            await button2[0].click();

            await mail.page.waitFor(4000)

            await mail.page.goto("http://e.mail.ru/compose/");

            await mail.page.waitFor(1000)

            await mail.page.waitForSelector('input[class="container--H9L5q size_s_compressed--2c-eV"]');
            await mail.page.type('input[class="container--H9L5q size_s_compressed--2c-eV"]', to, {
                delay: 20
            });

            await mail.page.waitForSelector('input[name="Subject"]');
            await mail.page.type('input[name="Subject"]', subject, {
                delay: 20
            });

            await mail.page.type('.container--2Rl8H .cke_editable', text, {
                delay: 20
            });

            await mail.page.click('.button2.button2_base.button2_primary')

            console.log("Sent!")


            mail.page.close();

        } catch (e) {
            console.log(e);
        }

    },

}

module.exports = mail;