const express = require("express")

const bodyParser = require("body-parser");
const notifier = require("node-notifier");

const app = express()

const port = process.env.PORT || 9000;

app.use(bodyParser.json());

app.get("/health", (req, res) => res.status(200).send());
app.post("/notify", (req, res) => {
    notify(req.body, reply => res.send(reply))
});

app.listen(port, () => console.log(`server is up running on [port: ${port}]`));

const notify = ({ title, message }, cb) => {
    notifier.notify(
        {
            title: title || "unknown title",
            message: message || "unknown message",
            sound: true,
            wait: true,
            reply: true,
            closeLabel: "completed?",
            timeout: 15
        },
        (err, response, reply) => {
            cb(reply)
        }
    )
}

