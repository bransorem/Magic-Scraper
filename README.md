Gatherer Scraper
================

Introduction
------------

Magic the Gathering card database scraper.  Uses magicripper2 code to get card ID's.
After you have the card ID's you can run the Nodejs app to get the card details into
a MongoDB instance.

Please be patient - I'll add better comments/documentation as soon as I can (I know, developer promises).


Requirements
------------

* Node.js - [http://nodejs.org/] (nodejs.org)
* MongoDB - [http://www.mongodb.org/display/DOCS/Quickstart] (mongodb.org)
* Request - npm install request
* Mongoose - npm install mongoose
* Cheerio - npm install cheerio
* Python 2.x


How to Use
----------

Get the ID's:  

    $ python getall.py

Wait a bit...
until you see "Completely Finished........"

Then, load MongoDB (in a separate terminal window) and run the Node app: 

    $ mkdir data
    $ mongod --dbpath ./data/
    $ node app.js

When it's done, just ctrl-c to get out of the Node app (for now - I'm lazy).
I've noticed it stops at around 99.37% - probably something I should figure out eventually.

It's that easy!


Viewing a database entry
------------------------

Make sure you have MongoDB running:

    $ mongod --dbpath ./data/

Try logging into the MongoDB instance and running: 

    $ mongo
    > use magic
    > db.cards.findOne().pretty()

You'll see the basic structure of the object.  It should look something like:

    {
        "setname" : "10E",
        "front" : {
            "artist" : "Kev Walker",
            "pt" : "4 / 4",
            "othersets" : {
                "0" : "Limited Edition Alpha (Uncommon)",
                "1" : "Limited Edition Beta (Uncommon)",
                "2" : "Unlimited Edition (Uncommon)",
                "3" : "Revised Edition (Uncommon)",
                "4" : "Fourth Edition (Uncommon)",
                "5" : "Fifth Edition (Uncommon)",
                "6" : "Classic Sixth Edition (Uncommon)",
                "7" : "Seventh Edition (Uncommon)",
                "8" : "Eighth Edition (Uncommon)",
                "9" : "Ninth Edition (Uncommon)",
                "10" : "Tenth Edition (Uncommon)",
                "11" : "Magic 2010 (Uncommon)",
                "12" : "Starter 1999 (Uncommon)",
                "13" : "Battle Royale Box Set (Uncommon)",
                "14" : "Beatdown Box Set (Uncommon)",
                "15" : "Portal Second Age (Uncommon)",
                "16" : "Duel Decks: Jace vs. Chandra (Uncommon)",
                "17" : "Masters Edition IV (Uncommon)"
            },
            "colors" : [
                "Blue"
            ],
            "number" : "64",
            "rarity" : "Uncommon",
            "converted" : 5,
            "flavor" : {
                "0" : "\"The East Wind, an interloper in the dominions of Westerly Weather, is an impassive-faced tyrant with a sharp poniard held behind his back for a treacherous stab.\"",
                "1" : "—Joseph Conrad, The Mirror of the Sea"
            },
            "set" : "Tenth Edition",
            "text" : {
                "0" : "Flying"
            },
            "type" : "Creature  — Elemental",
            "mana" : {
                "0" : "3",
                "1" : "Blue",
                "2" : "Blue"
            },
            "name" : "Air Elemental"
        },
        "id" : 129459,
        "_id" : ObjectId("4fe1757a2367d0db7500000a")
    }

Looks like you have a populated database!

To find a specific card by name (for instance):

    > db.cards.find({ 'front.name' : 'Launch Party' }).pretty()

    {
        "setname" : "RTR",
        "front" : {
            "artist" : "Lucas Graciano",
            "pt" : "None",
            "othersets" : "None",
            "colors" : [
                "Black"
            ],
            "number" : "69",
            "rarity" : "Common",
            "converted" : 4,
            "flavor" : {
                "0" : "Life's too short to not do the things you love."
            },
            "set" : "Return to Ravnica",
            "text" : {
                "0" : "As an additional cost to cast Launch Party, sacrifice a creature.",
                "1" : "Destroy target creature. Its controller loses 2 life."
            },
            "type" : "Instant",
            "mana" : {
                "0" : "3",
                "1" : "Black"
            },
            "name" : "Launch Party"
        },
        "id" : 270781,
        "_id" : ObjectId("50949863484b4a000000008c")
    }



License
-------

MIT License

Copyright (C) 2012 Bran Sorem

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.