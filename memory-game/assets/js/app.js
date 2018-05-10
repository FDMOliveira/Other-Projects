(function() {
    $('body').addClass('fade-in');
    function gameStart () {
        var imageArray = [
            'icon-brush','icon-burger','icon-rocket','icon-cup','icon-diamond',
            'icon-flash','icon-gamepad','icon-heart','icon-lamp','icon-send'
        ];
        var newImageArray = [],
            selectedImage,
            length = imageArray.length,
            lastChild, 
            sumPaired=0,
            pairedElementID=100;

        for (var i=0;i<length;i++) {
            imageArray.push(imageArray[i]);
        }
        for (var i=0; i<20; i++) {
            newImageArray[i]=imageArray[Math.floor(Math.random() * imageArray.length)];
            var index = imageArray.indexOf(newImageArray[i]);
            imageArray.splice(index, 1);
        }
        $('.game-container .game-piece').each(function() {
            $(this).on('click', function() {
                var index = $(this).attr('id');
                $(this).addClass('move');
                if (selectedImage) {
                    if ((selectedImage == newImageArray[index]) && (lastChild.attr('id') !== $(this).attr('id'))) {
                        pairedElementID=$(this).attr('id');
                        $(this).css("pointer-events", "none");
                        lastChild.css("pointer-events", "none");
                        sumPaired++;
                    }   
                    else
                    if (lastChild.attr('id') !== pairedElementID)
                        $(lastChild).removeClass('move');
                }
                selectedImage = newImageArray[index];
                $('#'+index+' .back').addClass(selectedImage);
                lastChild=$(this);
                if(sumPaired === (newImageArray.length/2)) {
                    setTimeout(() => {
                        $('.game-over').addClass('on');
                        $('.game-container').addClass('fade-out');      
                    }, 700);
                }
            })
        });
    }
    function resetGame() {
        newImageArray = [];
        sumPaired=100;
        selectedImage="";
        pairedElementID=100;
        lastChild ="";
        $('.game-container .game-piece').each(function() {
            $(this).off('click');
            $(this).css("pointer-events", "auto");
        });
    }

    gameStart();
    $('.game-over .play-again').on('click', function() {
        $('.game-over').removeClass('on');
        setTimeout(() => {
            $('.game-container').removeClass('fade-out');
            $('.game-container .game-piece').each(function() {
                $(this).removeClass('move');
            });
            resetGame();
            gameStart();
        }, 500);
    });
})();