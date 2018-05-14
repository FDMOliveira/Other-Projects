(function() {
    $(document).ready(function() {
        var httpRequest;
        $('.ask').on('click', function() {
            var id = $(this).data("id");
            $('.name').removeClass('in-name');
            $('.quote').removeClass('in-quote');  
            if(id!==3) {          
                setTimeout(() => {
                    $('.pic').addClass('in');
                    $('.name').addClass('in-name');
                    $('.quote').addClass('in-quote');
                    getData(id);
                }, 1000);
            }
            else {
                $('.submit-player').addClass('in');
                $('.submit').on('click', writeData);
            }
        });
        function ajaxValidation () {
            // IE6 and older compatibility
            if (window.XMLHttpRequest)
                httpRequest = new XMLHttpRequest;
            else if (window.ActiveXObject) {
                httpRequest = new ActiveXObject;
            }
        }
        function getData (id) {
            ajaxValidation();
            httpRequest.onreadystatechange = processData;
            httpRequest.open('GET', './assets/data/musicians.json', true);
            httpRequest.setRequestHeader('Content-Type','application/json');
            httpRequest.setRequestHeader('Cache-control','no-cache');
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
        function writeData() {
            var nameValue = document.querySelector('input[name="name"]').value;
            var quoteValue = document.querySelector('input[name="quote"]').value;
            var picUrlValue = document.querySelector('input[name="pic-url"]').value; 
            ajaxValidation();

            httpRequest.onreadystatechange = writeSomeData;
            httpRequest.open('POST','./assets/data/musicians.json', true);
            httpRequest.setRequestHeader('Content-Type','application/json');
            httpRequest.setRequestHeader('Data-Type','application/json');
            httpRequest.setRequestHeader('Cache-control','no-cache');
            httpRequest.send(JSON.stringify({pic:picUrlValue, name:nameValue, quote:quoteValue}));

            function writeSomeData() {
                try {
                    if (httpRequest.readyState === XMLHttpRequest.DONE) {
                      if (httpRequest.status === 200) {
                            var response = JSON.parse(httpRequest.response);
                            alert(response);
                      } else {
                        alert('There was a problem with the request.');
                      }
                    }
                  }
                  catch( e ) {
                    alert('Caught Exception: ' + e.description);
                  }
            }
        }
    });
})();