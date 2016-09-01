import request from "request";
import express from "express";
import __ from "underscore";
import cheerio from "cheerio";
import builder from "xmlbuilder";





function extractEmails(text) {
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

request('http://handsome.is', function(error, response, body) {
    if (!error && response.statusCode == 200) {
        // get name site 
        let $ = cheerio.load(body);
        let titlesite = $("title").text();

        // console.log(titlesite);


        // find emails 
        let arrayemails = __.values(extractEmails(body));
        //  console.log(__.uniq(arrayemails)) // Show the HTML for the Google homepage. 
        let xml = builder.create('root')
            .ele("arrayemails")
            .att('name', titlesite);

        __.each(__.uniq(arrayemails), (emails) => {
            console.log(emails);
            //xml.ele('item', { 'name': 'email' }, emails);
            let item = xml.ele('item');

            item.att('name', 'email').ele(emails);



        });
        // xml.end({ pretty: true });

        console.log(xml);


    }
})