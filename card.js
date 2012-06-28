var cheerio = require('cheerio')
  , request = require('request');

var Card = (function() {

  var $;  // share context throughout
  var search_url = 'http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=';

  function Card(id, part_name){
    this.card = {};
    this.card.id = parseInt(id);
    if (part_name) this.page_string = search_url + this.card.id + '&part=' + part_name;
    else this.page_string = search_url + this.card.id;
  }

  Card.prototype.get = function(callback){
    var self = this;

    getHTML(self, function(card){
      // It's either a 2-part card...
      if (card.partA){
        var parts = [card.partA, card.partB];
        getParts(self.card.id, parts, callback);
      }
      // ... or it's not
      else {
        callback(card);
      }
    });
  };

  // Only run if there are multiple parts to the card.
  // For instance:  Hit // Run
  var getParts = function(id, parts, callback){
    var cardA = new Card(id, parts[0]);
    var cardB = new Card(id, parts[1]);

    // I'm an idiot, fixes recursion (line 80)
    // TODO: be less of an idiot
    cardA.partA = cardB.partA = true;

    getHTML(cardA, function(card_a){
      getHTML(cardB, function(card_b){
        var card = new Card(id);
        
        card.card.front = { 'partA': card_a.front, 'partB': card_b.front };
        callback(card.card);
      });
    });
  }


  var getElement = function(element_string){
    //try {
    if ($(element_string).html()) return $(element_string).html().trim();
    return 'None';
    //} catch (err) {}
  }

  var format = function(name, side){
    return '[id$="cardComponent' + side + '"] [id$="' + name + '"]';
  }

  var getHTML = function(s, callback){
    var self = s;

    request({uri: self.page_string}, function(err, response, body){
      $ = cheerio.load(body);

      var card = DOM(err, body, self);
      callback(card);
    })
  }

  var DOM = function(err, window, s){
    var self = s;

    // Are there multiple parts?
    var part = getElement('[id$="subtitleDisplay"]');
    if (part && part.indexOf('//') !== -1 && !self.partA && !self.partB){
      var parts = part.replace(' ', '').replace(' ', '').split('//');
      if (!self.partA) self.partA = parts[0];
      if (!self.partB) self.partB = parts[1];

      return self;
    }
    else {      
      // Have you set the front attributes yet?
      if (!self.card.front){
        self.card.front = details(0, self);
      }

      // What about the back attributes?
      if (!self.card.back){
        var back = details(1, self);
        if (back.name !== 'None') self.card.back = back;
      }

      return self.card;
    }
  }

  var details = function(side, s){

    var self = s;

    var colors = [];
    var name =      getElement( format('nameRow',        side) + ' .value');
    var type =      getElement( format('typeRow',        side) + ' .value');
    var set =       getElement( format('setRow',         side) + ' .value a:last-child');
    var converted = getElement( format('cmcRow',         side) + ' .value');
    var rarity =    getElement( format('rarityRow',      side) + ' .value span');
    var number =    getElement( format('numberRow',      side) + ' .value');
    var pt =        getElement( format('ptRow',          side) + ' .value');
    var artist =    getElement( format('ArtistCredit',   side) + ' a');
    var othersets = getSets(    format('otherSetsValue', side));
    var text =      getText(    format('textRow',        side) + ' .value .cardtextbox');
    var flavor =    getFlavor(  format('FlavorText',     side) + ' .cardtextbox');

    if (converted !== 'None') converted = parseInt(converted);

    mana = getMana( format('manaRow', side) + ' .value', colors);

    if (colors.length === 0 && format('colorIndicatorRow', side) !== 'None') {
      var tmp = getElement(format('colorIndicatorRow', side) + ' .value');
      if (tmp !== 'None') colors.push(tmp);
    }

    // Create card object to return
    var _Card = {
      name:      name, 
      mana:      mana,
      type:      type, 
      text:      text, 
      set:       set,
      flavor:    flavor,
      converted: converted,
      rarity:    rarity,
      number:    number,
      colors:    colors,
      othersets: othersets,
      pt:        pt,
      artist:    artist
    };

    return _Card;
  }


  // Set colors of card ==============================================================
  var checkColor = function(color, elm, colors){
    var color_in_array = false;
    if (colors.length === 0 && elm.indexOf(color) != -1){  // if no colors are in the array, then this one should be
      colors.push(color);
    }
    else {
      if (elm.indexOf(color) != -1){  // is color in element? (such as 'White or Green' mana - contains both White and Green)
        for (var a = 0; a < colors.length; a++){  // go through entire array to see if it's in there
          if (colors[a] === color){
            color_in_array = true;  // it is!  then don't repeat
          }
        }
        if (!color_in_array){  // if color not in array, add it!
          colors.push(color);
        }
      }
    }
  }

  // Get mana from img tags ===========================================================
  var getMana = function(id, colors){
    //try {
    var arr = {};
    if ($(id).html()){
      $(id + ' img').each(function(ind, elm){
        if ($(elm).attr('alt')) elm = $(elm).attr('alt');
        checkColor('White', elm, colors);
        checkColor('Blue', elm, colors);
        checkColor('Black', elm, colors);
        checkColor('Green', elm, colors);
        checkColor('Red', elm, colors);
        arr[ind] = elm;
      });
      return arr;
    }
    return 'None';
    //} catch(e) {}
  }


  // Get text property of card =======================================================
  var getText = function(id){
    //try {
    var arr = {};
    if ($(id).html()){
      $(id).each(function(index, elm){
        var imgArr = $(id + ' img');
        // Get icons first (like Tap, or mana)
        $(imgArr).each(function(img_index, img_element){
          var icon = $(img_element).attr('alt');
          if (icon) {
            $(img_element).replaceWith('{{' + icon + '}}');
          }
        });
        var temp = $(elm).html();
        // Then remove emphasis'
        temp = temp.replace('<i>', '');
        temp = temp.replace('</i>', '');
        arr[index] = temp;
      });
      return arr;
    }
    return 'None';
    //} catch(e) {}
  }

  // Get flavor property of card =====================================================
  var getFlavor = function(id){
    //try {
    var arr = {};
    if ($(id).html()){
      $(id).each(function(index, elm){
        var temp = $(elm).html();
        var cmp = $(id + ' i').html();
        var cmp2 = $(elm).children().html();
        if (cmp === cmp2) temp = cmp;
        arr[index] = temp;
      });
      return arr;
    }
    return 'None';
    //} catch(e) {}
  }


  // Get other sets of card ===========================================================
  var getSets = function(id){
    //try {
    var arr = {};
    if ($(id).html()){
      $(id + ' a img').each(function(ind, elm){
        if ($(elm).attr('alt')) arr[ind] = $(elm).attr('alt');
      });
      return arr;
    }
    return 'None';
    //} catch(e) {}
  }


  return Card;
})();



exports.Card = Card;