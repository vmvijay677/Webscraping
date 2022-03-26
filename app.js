import axios from "axios";
import cheerio from "cheerio";
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

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
                name: name, 
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
