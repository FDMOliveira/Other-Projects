(function() {
    $(document).ready(function() {
        var httpRequest,
            response,
            isUpdated = false,
            isValid;
        $('.initial-screen#title').addClass('in');
        $('.ask').on('click', function() {
            var id = $(this).data("id");
            $('.name').removeClass('in-name');
            $('.quote').removeClass('in-quote');
            $('.initial-screen#title').removeClass('in');
            $('.submit-player .title').removeClass('in');
            $('.submit-player input').removeClass('in');
            $('.submit-player').removeClass('in');  
            if ((id !== null) && (id !== undefined)) { 
                if (id !== 3)        
                    getDataWait(id);
                else {
                    if (isUpdated === false) {
                        $('.submit-player').addClass('in');
                        $('.submit-player .title').addClass('in');
                        $('.submit-player input').addClass('in');
                        $('.submit-player .submit').on('click', writeData);
                    } 
                    else
                    getDataWait(id);
                }
            }
        });
        function getDataWait (id) {
            setTimeout(() => {
                getData(id);
            }, 1000);
        }
        $.ajaxSetup({ cache: false });
        function getData (id) {
            $.get({
                url: "https://cdn.rawgit.com/FDMOliveira/Other-Projects/master/AjaxRequests/assets/data/musicians.json",
                context: document.body,
                dataType:'json',
                success: function(data){
                    $('.pic').addClass('in');
                    $('.name').addClass('in-name');
                    $('.quote').addClass('in-quote');
                    var jsonObj = data[id];
                    document.querySelector('.pic').style.backgroundImage = "url("+jsonObj.pic+")";
                    document.querySelector('.name').innerHTML= jsonObj.name;
                    document.querySelector('#quote').innerHTML= jsonObj.quote; 
                },
                error: function(request,error) {
                    console.log("Request: "+JSON.stringify(request)+", error: "+error);
                }
            });
        }
        function writeData() {
            isValid=1;
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
                    url: "https://cdn.rawgit.com/FDMOliveira/Other-Projects/14c26c4/AjaxRequests/save.php",
                    crossDomain: true,
                    contentType: 'application/json',
                    dataType:"json",
                    data: {name: nameValue , quote: quoteValue},
                    success: function(){
                        isUpdated=true;
                        console.log("sucess");
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