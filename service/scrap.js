const scrapeIt = require("scrape-it")
 
// Promise interface
scrapeIt(process.env.URL, {
   episodes: {
       episode: ".ListEpisodios.li"
   }
}).then(({ data, response }) => {
    console.log(`Status Code: ${response.statusCode}`)
    console.log(data)
})