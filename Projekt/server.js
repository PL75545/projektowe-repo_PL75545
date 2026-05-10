const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post("/send", (req, res) => {
    const newData = req.body;

    fs.readFile("messages.json", "utf8", (err, data) => {
        let messages = [];

        if (!err && data) {
            messages = JSON.parse(data);
        }

        messages.push(newData);

        fs.writeFile(
            "messages.json",
            JSON.stringify(messages, null, 2),
            (err) => {
                if (err) {
                    return res.status(500).send("Error");
                }

                res.send("OK zapisane");
            }
        );
    });
});

app.listen(3000, () => {
    console.log("Server działa na http://localhost:3000");
});