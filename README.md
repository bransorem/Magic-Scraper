Magic Gatherer Scraper
======================

Introduction
------------

Magic the Gathering card database scraper.  Uses magicripper2 code to get card ID's.
After you have the card ID's you can run the Nodejs app to get the card details into
a MongoDB instance.

Please be patient - I'll add better comments/documentation as soon as I can (I know, developer promises).


Requirements
------------

* Node.js - [http://nodejs.org/] (nodejs.org)
* Cheerio - npm install cheerio
* Python 2.x


How to Use
----------

Get the ID's:  

    $ python getall.py

Wait a bit...
until you see "Completely finished......."

Then, load MongoDB (in a separate terminal window) and run the Node app: 

    $ mongod --dpath ./data/

    $ node app.js

It's that easy!


Viewing a database entry
------------------------

Make sure you have MongoDB running:

    $ mongod --dbpath ./data/

Try logging into the MongoDB instance and running: 

    > use magic
    > db.cards.findOne()

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



License
-------

This work is licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License. To view a copy of this license, visit <http://creativecommons.org/licenses/by-sa/3.0/> or send a letter to Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.

*Some portions of code may be subject to different licensing agreements.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.