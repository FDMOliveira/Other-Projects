(function() {
    $(document).ready(function() {
        $('.initial-screen#title').addClass('in');
        $('.ask').on('click', function() {
            var id = $(this).data("id");
            $('.name').removeClass('in-name');
            $('.quote').removeClass('in-quote');
            $('.initial-screen#title').removeClass('in');
            setTimeout(() => {
                getData(id);
            }, 500);
        });
        $.ajaxSetup({ cache: false });
        function getData (id) {
            $.get({
                url: "https://cdn.rawgit.com/FDMOliveira/Other-Projects/219a7a8/AjaxRequests/assets/data/musicians.json",
                context: document.body,
                dataType:'json',
                success: function(data){  
                    $('.pic').addClass('in');
                    $('.name').addClass('in-name');
                    $('.quote').addClass('in-quote');
                    var jsonObj = data[id];
                    console.log(jsonObj);
                    var img = new Image(); 
                    img.onload = function() {
                        document.querySelector('.pic').style.backgroundImage = "url("+jsonObj.pic+")";
                        if (jsonObj.name == "Dave Grohl")
                            document.querySelector('.pic').style.backgroundPosition="62%";                          
                        document.querySelector('.name').innerHTML= jsonObj.name;
                        document.querySelector('#quote').innerHTML= jsonObj.quote; 
                    }; 
                    img.src = jsonObj.pic;
                },
                error: function(request,error) {
                    console.log("Request: "+JSON.stringify(request)+", error: "+error);
                }
            });
        }
    });
})();