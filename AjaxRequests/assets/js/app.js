(function() {
    $(document).ready(function() {
        $('.ask').on('click', ajaxRequest);
        $('.list .ask').each(function() {
            $(this).on('click', function() {
                var id = $(this).data("id");
                var name = document.querySelector('.name');
                var quote = document.querySelector('#quote');
                
                var id = $(this).data("id");
                $('.pic').addClass('in');
                
                name.parentNode.removeChild(name);
                var newName = document.createElement("DIV");
                newName.setAttribute('class', 'name');
                
                quote.parentNode.removeChild(quote);
                var newQuote = document.createElement("DIV");
                newQuote.setAttribute('id', 'quote');

                document.querySelector('.player-container').appendChild(newName);
                document.querySelector('.player-container .quote').appendChild(newQuote);
                
                $('.pic').addClass('in');
                $('.name').addClass('in-name');
                $('.quote').addClass('in-quote');
                ajaxRequest(id);
            });
        });
        function ajaxRequest (id) {
            // IE6 and older compatibility
            if (window.XMLHttpRequest)
                var httpRequest = new XMLHttpRequest;
            else if (window.ActiveXObject) {
                httpRequest = new ActiveXObject;
            }

            httpRequest.onreadystatechange = processData;
            httpRequest.open('GET', './assets/data/musicians.json', true);
            httpRequest.setRequestHeader('Content-Type','application/json');
            httpRequest.send();
            
            function processData () {
                try {
                    if (httpRequest.readyState === XMLHttpRequest.DONE) {
                        if (httpRequest.status === 200) {
                            var jsonObj = JSON.parse(httpRequest.responseText)[id];
                            document.querySelector('.pic').style.backgroundImage = "url("+jsonObj.pic+")";
                            document.querySelector('.name').innerHTML= jsonObj.name;
                            document.querySelector('#quote').innerHTML= jsonObj.quote;
                        }
                        else {
                            console.log('Ups.... not yet folk');
                        }
                    } 
                }
                catch(e) {
                    console.log('error: '+ e);
                }
            }
        }
    });
})();