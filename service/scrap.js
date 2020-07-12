const scrapeIt = require("scrape-it");
const scrape = () => {
    return scrapeIt(process.env.URL, {
        episodes: {
           listItem: "ul.ListEpisodios > li",
           data: {
               title: '.Title',
               number: '.Capi',
               image: {
                   selector: '.Image > img',
                   attr: "data-cfsrc"
               },
               url: {
                   selector: "a",
                   attr: "href"
               }
           }
        }
     })
}

module.exports.scrape = scrape;