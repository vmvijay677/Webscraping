import axios from "axios";
import cheerio from "cheerio";
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send('<h1>Hello world</h1>')
})

const info = [];

app.get("/flipkart", async (req, res) => {
    // const {data} = await axios.get("https://www.flipkart.com/search?q=samsung&as=on&as-show=on&otracker=AS_Query_HistoryAutoSuggest_1_3_na_na_na&otracker1=AS_Query_HistoryAutoSuggest_1_3_na_na_na&as-pos=1&as-type=HISTORY&suggestionId=samsung&requestId=b1d4b121-db5b-4032-b384-9449e81e0765&as-backfill=on");
    // const $ = cheerio.load(data);
    // return res.send($('div._2kHMtA').html());
    try {
        const url = "https://www.flipkart.com/search?q=iphone%2013&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off";
    
        const { data } = await axios.get(url)
        const $ = cheerio.load(data);
    
        const name = $('div._4rR01T').get().map(val => $(val).text());
        const price = $('div._25b18c > div:nth-child(1)').get().map(val => $(val).text());
        const rating = $('span._2_R_DZ').get().map(val => $(val).text());
        const spec1 = $('ul._1xgFaf > li:nth-child(1)').get().map(val => $(val).text());
        const spec2 = $('ul._1xgFaf > li:nth-child(2)').get().map(val => $(val).text());
        const spec3 = $('ul._1xgFaf > li:nth-child(3)').get().map(val => $(val).text());
        const spec4 = $('ul._1xgFaf > li:nth-child(4)').get().map(val => $(val).text());
        const spec5 = $('ul._1xgFaf > li:nth-child(5)').get().map(val => $(val).text());
        const off = $('div._3Ay6Sb').get().map(val => $(val).text());
        const exchange = $('div._3xFhiH').get().map(val => $(val).text());
        info.push(
            {
                name: name[0], 
                price: price, 
                rating: rating,
                spec1: spec1,
                spec2: spec2,
                spec3: spec3,
                spec4: spec4,
                spec5: spec5,
                off: off,
                exchange: exchange
            }
        );
        res.send(info);
    } catch (error) {
        res.status(400).send({message: error.message});    
    }
})







app.listen(port, () => {
    console.log(`Server started in ${port}`);
})



















// // const MONGO_URL = process.env.MONGO_URL;
// const MONGO_URL = "mongodb+srv://vigneshr:Welcome123@cluster0.cda5v.mongodb.net";

// async function createConnection() {
//     const client = new MongoClient(MONGO_URL);
//     await client.connect();
//     console.log("Mongo is connected 👍");
//     return client;
// }
// const client = await createConnection();

// const URL = "https://www.flipkart.com/search?q=samsung&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off";
// // const URL = "https://www.amazon.in/s?k=iphone&crid=3BI2XXEYMCN96&sprefix=iphone%2Caps%2C346&ref=nb_sb_noss_2";

// let info = [];

// axios.get(URL)
//     .then(res => {
//         const $ = cheerio.load(res.data);
//         $('div._2kHMtA').each((i, element) => {
//             const title = $(element)
//                 .find('div._4rR01T')
//                 .text()
//                 .replace(/\s\s+/g, '');

//             const image = $(element)
//                 .find('div.CXW8mj').attr('src');

//             const rating = $(element)
//                 .find('span._2_R_DZ').text();
            
//             const spec1 = $(element)
//                 .find('ul._1xgFaf').text();

//             const price = $(element)
//                 .find('div._30jeq3 _1_WHN1').text();
            
//             const off = $(element)
//                 .find('div._3Ay6Sb').text();

//             const exchange = $(element)
//                 .find('div._3xFhiH').text();

//             info.push({
//                 "title": title,
//                 "image": image,
//                 "rating": rating,
//                 "spec1": spec1,
//                 "price": price,
//                 "off": off,
//                 "exchange": exchange
//             })
//             console.log(info);
//         });
//     }).catch(err => console.log(err));

//     // app.get("/flipkart", async function (request, response) {
//     //     //db.flipkart.find({})
//     //     const flipkart = await client
//     //         .db("b30wd")
//     //         .collection("flipkart")
//     //         .find({})
//     //         .toArray();
//     //     response.send(flipkart);
//     // });

//     app.post("/flipkart", async function (request, response) {
//         //db.flipkart.insertMany(data)
//         const data = request.body;
//         //console.log(data);
//         const result = await client
//             .db("b30wd")
//             .collection("flipkart")
//             .insertMany(info);
//         response.send(result);
//     });

// // axios.get(URL)
// //     .then((response) => {
// //         const $ = cheerio.load(response.data);

// //         let title = $("._4rR01T").text();
// //         let price = $("._30jeq3 _1_WHN1").text();
// //         let image = $("img._396cs4 _3exPp9").attr('src');
// //         // const collection = [
// //         //     {
// //         //         title: title,
// //         //         price: price
// //         //     }
// //         // ]
// //         data.push(title);
// //         console.log(data);
// //         app.get("/", function (request, response) {
// //             response.send(`${title}`);
// //         })
// //     }).catch(err => console.log(err));
