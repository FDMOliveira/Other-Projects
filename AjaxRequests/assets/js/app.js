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
                setTimeout(() => {
                    getData(id);
                }, 1000);
            }
        });
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
    });
})();