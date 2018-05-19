(function() {
    $(document).ready(function() {
        $('.initial-screen#title').addClass('in');
        $('.ask').on('click', function() {
            var id = $(this).data("id");
            $('.name').removeClass('in-name');
            $('.quote').removeClass('in-quote');
            $('.initial-screen#title').removeClass('in');
            if (id) {    
                setTimeout(() => {
                    getData(id);
                }, 500);
            }
        });
        $.ajaxSetup({ cache: false });
        function getData (id) {
            $.get({
                url: "https://cdn.rawgit.com/FDMOliveira/Other-Projects/b51a3dd816226c2c3944683a0c2d35b18efd7f75/AjaxRequests/assets/data/musicians.json",
                context: document.body,
                dataType:'json',
                success: function(data){
                    $('.pic').addClass('in');
                    $('.name').addClass('in-name');
                    $('.quote').addClass('in-quote');
                    var jsonObj = data[id];
                    if (jsonObj.name == "Dave Grohl")
                        document.querySelector('.pic').style.backgroundPosition="62%";                          
                    document.querySelector('.pic').style.backgroundImage = "url(data:image/jpg;base64,"+jsonObj.pic+")";
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