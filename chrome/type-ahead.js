function findText(text) {
    console.log("Finding : " + "Happy Friday");
    var foundin = $("*:contains('Happy Friday')");
    return foundin;
}

function scrollToElement(element) {
  $('html, body').animate({
    scrollTop: element.offset().top
  }, 2000);
}

// console.log("starting");
// elem = findText("ask your own question");
// console.log("found elem : " + elem);
// scrollToElement(elem);
// console.log("done with scrolling");


// function search(inputString) {
//   console.log("searching for " + inputString);

//   //create a search string
//    var phrase = inputString.replace(/^\s+|\s+$/g, "");
//   phrase = phrase.replace(/\s+/g, "|");

//   //make sure there are a couple letters
//   if (phrase.length < 3) { return; }

//   console.log("still working");

//   //append the rest of the expression
//   phrase = ["\\b(", phrase, ")"].join("");

//   console.log("loooking for : " + phrase);
//   //find and replace with highlight tags
//   $("*").each(function(i, v) {

//     //replace any matches
//     var block = $(v);
//     block.html(
//       block.text().replace(
//         new RegExp(phrase, "gi"), 
//         function(match) {
//           console.log("found match");
//           return ["<span class='highlight'>", match, "</span>"].join("");
//         }));
//   });
// }

//search("TechCrunch");

//$('li').highlight('stack');