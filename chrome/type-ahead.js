jQuery.fn.getPath = function () {
    if (this.length != 1) throw 'Requires one element.';

    var path, node = this;
    while (node.length) {
        var realNode = node[0], name = realNode.localName;
        if (!name) break;
        name = name.toLowerCase();

        var parent = node.parent();

        var siblings = parent.children(name);
        if (siblings.length > 1) { 
            name += ':eq(' + siblings.index(realNode) + ')';
        }

        path = name + (path ? '>' + path : '');
        node = parent;
    }
    return path;
};

$("body").click(function (event){
    element = $(event.srcElement);
    console.log(element.getPath());
    chrome.extension.sendRequest(element.getPath());
});

var selectedElement;

chrome.extension.onRequest.addListener(function(request, sender) {
    console.log("mainpage : " + request);
    if(request.hasOwnProperty("jquerypath")) {

        if (selectedElement) {
            $(selectedElement['e']).css('backgroundColor',selectedElement['b']);
        }
        selectedElement = {'e': request.jquerypath, 'b': $(request.jquerypath).css('backgroundColor')};

        $("body").animate({
            scrollTop:$(request.jquerypath).offset().top - 100}, 500
        );

        $(request.jquerypath).css('backgroundColor','orange');
    }
});