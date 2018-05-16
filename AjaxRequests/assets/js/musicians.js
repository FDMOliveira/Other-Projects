(function() {
    $(document).ready(function() {
        var httpRequest,
            response,
            id,
            isUpdated = false,
            isValid;
        $('.ask').on('click', function() {
            id = $(this).data("id");
            $('.name').removeClass('in-name');
            $('.quote').removeClass('in-quote');
            $('.submit-player .title').removeClass('in');
            $('.submit-player input').removeClass('in');
            $('.submit-player').removeClass('in');  
            if ((id !== null) && (id !== undefined)) { 
                if (id !== 3) {          
                    setTimeout(() => {
                        getData(id);
                    }, 1000);
                }
                else {
                    setTimeout(() => {
                        if (isUpdated === false) {
                            $('.submit-player').addClass('in');
                            $('.submit-player .title').addClass('in');
                            $('.submit-player input').addClass('in');
                            $('.submit-player .submit').on('click', writeData);
                        } 
                        else
                            getData(id);
                    }, 1000);
                }
            }
        });
        $.ajaxSetup({ cache: false });
        function getData (id) {
            $.get({
                url:"./assets/data/musicians.json",
                context: document.body,
                dataType: 'json',
                success: function(data){
                    var jsonObj = data[id];
                    document.querySelector('.pic').style.backgroundImage = "url("+jsonObj.pic+")";
                    document.querySelector('.name').innerHTML= jsonObj.name;
                    document.querySelector('#quote').innerHTML= jsonObj.quote; 
                    $('.pic').addClass('in');
                    $('.name').addClass('in-name');
                    $('.quote').addClass('in-quote');
                },
                error: function(request,error) {
                    console.log("Request: "+JSON.stringify(request)+", error: "+error);
                }
            });
        }
        
        function writeData() {
            isUpdated=true;
            var nameValue = document.querySelector('input[name="name"]').value;
            var quoteValue = document.querySelector('input[name="quote"]').value;
            var picUrlValue = document.querySelector('input[name="pic-url"]');
            $('input').each(function() {
                $(this).removeClass('error-placehold');
                if (($(this).val().length < 1) || (/^[a-zA-Z]/.test($(this).val()) == false)) {
                    $(this).addClass('error-placehold'); 
                    var element=this;
                    var newelement = element.cloneNode(true);
                    element.parentNode.replaceChild(newelement, element);
                    isValid=0;
                }
                else 
                // Check all the parts of the URL including the format extension
                if ((/^https:\/\/.+\.(gif|png|jpg|jpeg|webp)$/i.test(picUrlValue.value)==false))  {
                    $(picUrlValue).addClass('error-placehold');
                    var element=this;
                    var newelement = element.cloneNode(true);
                    element.parentNode.replaceChild(newelement, element);
                    isValid=0;
                } 
            }) 
            if (isValid==0)
                return false;
            else {
                $.post({
                    url: "https://cdn.rawgit.com/FDMOliveira/Other-Projects/master/AjaxRequests/save.php",
                    crossDomain: true,
                    dataType: 'jsonp',
                    context: document.body,
                    data: 'name='+ nameValue + '&quote=' + quoteValue + '&pic=' + picUrlValue.value,
                    success: function(){
                        $('ul li.ask[data-id="3"]').addClass('no-pseudo');
                        $('ul li.ask[data-id="3"]').addClass("resize");
                        $('ul li.ask[data-id="3"]').css('background','url('+picUrlValue.value+')0%/cover no-repeat');
                        setTimeout(() => {
                            $('ul li.ask[data-id="3"]').removeClass('resize');
                        }, 400);
                    },
                    error: function(request,error) {
                        console.log("Error! Request: "+JSON.stringify(request)+", error: "+error);
                    }
                });       
            }                         
        }
    });
})();