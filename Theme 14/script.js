$(function () {
    // $("#draggable1, #draggable2, #draggable3, #draggable4").draggable();
    //
    //
    // $(".koshik-wrapper").droppable({
    //     drop: function (event, ui) {
    //         $(".koshik-wrapper").addClass("ui-state-highlight");
    //     },
    //     out: function (event, ui) {
    //         $(".koshik-wrapper").removeClass("ui-state-highlight");
    //     }
    // });

    // exercise 2

    var helmetsCount = 0;
    var summa = 0;

    $("#draggable1").draggable({helper: "clone"});
    $("#draggable2").draggable({helper: "clone"});
    $("#draggable3").draggable({helper: "clone"});
    $("#draggable4").draggable({helper: "clone"});

    var $gallery = $(".features-grids");
    var $trash = $(".koshik-wrapper");

    $trash.droppable({
        accept: ".features-grids > div",
        classes: {
            "ui-droppable-active": "ui-state-highlight"
        },
        drop: function (event, ui) {
            helmetsCount++;
            if (helmetsCount > 0) {
                $("#myclear").show()
            }
            $("#helmetsCount strong").text(helmetsCount);
            var helmet = $(ui.draggable).children();
            summa += parseInt(helmet.attr("price"));
            $("#helmetsSumm strong").text(summa);

            deleteImage(ui.draggable);

        }
    });

    $gallery.droppable({
        accept: ".koshik-wrapper div",
        classes: {
            "ui-droppable-active": "custom-state-active"
        },
        drop: function (event, ui) {
            helmetsCount--;
            if (helmetsCount == 0) {
                $("#myclear").hide();
            }
            $("#helmetsCount strong").text(helmetsCount);
            var helmet2 = $(ui.draggable).children();
            summa -= parseInt(helmet2.attr("price"));
            $("#helmetsSumm strong").text(summa);
            recycleImage(ui.draggable);
        }
    });

    function deleteImage($item) {
        $item.fadeOut(function () {
            var $list = $("ul", $trash).length ?
                $("ul", $trash) :
                $("<ul class='gallery ui-helper-reset'/>").appendTo($trash);

            $item.appendTo($list).fadeIn(function () {
                $item
                    .animate({width: "100px"})
                    .find("img")
                    .animate({height: "63px", width: "80px"});
                $item
                    .find("h3")
                    .animate({fontSize: "8px"});
            });
        });
    }

    function recycleImage($item) {
        $item.fadeOut(function () {
            $item
                .css("width", "25%")
                .find("img")
                .css({height: "125px", width: "160px"})
                .end()
                .find("h3")
                .animate({fontSize: "24px"})
                .end()
                .appendTo($gallery)
                .fadeIn();
        });
    }

    // 14.3

    $("#sortable").sortable({
        placeholder: "ui-state-highlight"
    });


    // 14.4

    $("#clear").button().click(function () {
        $("#selectable li").removeClass("ui-selected");
    });

    $(".ui-state-default").button().click(function() {
        var e = $(this);
        e.addClass("ui-selected");
    });
});