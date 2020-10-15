const core = require('./core.js');
const reader = require('readline-sync'); 

(async () => {

    const email = reader.question('Email: ');
    const password = reader.question('Password: ',{ hideEchoBack: true });
    const to = reader.question('To: ');
    const subject = reader.question('Title: ');
    const text = reader.question('Text: ');


    await core.initialize();
    await core.main(email, password, to, subject, text);

})();