$(function () {

    var motoNumber = "";
    var date = "";
    var range = "";

    var handle = $("#custom-handle");
    $("#slider").slider({
        create: function () {
            handle.text($(this).slider("value"));
        },
        slide: function (event, ui) {
            handle.text(ui.value)
            motoNumber = ui.value + " мотоциклів\n";
            changeTextarea();
        }
    });

    var dateFormat = "mm/dd/yy";
    from = $("#from").datepicker({
        defaultValue: "+1w",
        changeMonth: true,
        numberOfMonths: 1
    }).on("change", function () {
        to.datepicker("option", "minDate", getDate(this));
        changeTextarea();
    }),
        to = $("#to").datepicker({
            defaultValue: "+1w",
            changeMonth: true,
            numberOfMonths: 1
        }).on("change", function () {
            to.datepicker("option", "maxDate", getDate(this));
            changeTextarea();
        });

    $("#slider-range").slider({
        range: true,
        min: 10,
        max: 400,
        values: [50, 400],
        slide: function (event, ui) {
            $("#amount").val(ui.values[0] + ' - ' + ui.values[1] + ' км');
            range = $("#amount").val();
            changeTextarea();
        }
    });
    $("#amount").val($("#slider-range").slider("values", 0) + ' - ' + $("#slider-range").slider("values", 1) + ' км');

    $("#progressbar").progressbar({max: 5});
    $('.tests input[type="radio"]').click(function () {
        const answers = $('.tests input[type="radio"]').map(function () {
            if ($(this).is(":checked")) return true;
        });
        $("#progressbar").progressbar({value: answers.length});
        if (answers.length <= 2) $("#progressbar > div").css({background: "Red"});
        else if (answers.length <= 4) $("#progressbar > div").css({background: "Orange"});
        else if (answers.length === 5) $("#progressbar > div").css({background: "Green"});
        $("#answers-result span").text(`${answers.length} з 5`);
    });

    function getDate(element) {
        var date;
        try {
            date = $.datepicker.parseDate(dateFormat, element.value);
        } catch (error) {
            date = null;
        }
        return date;

    }

    function changeTextarea() {
        var Date1 = new Date($('#from').val());
        var Date2 = new Date($('#to').val());
        console.log(Date1.toDateString());
        if (Date1.toDateString() !== "Invalid Date"
            && Date2.toDateString() !== "Invalid Date") {
            console.log(Date1);
            console.log(Date2)
            date = Math.floor(((Date2.getTime() - Date1.getTime()) / (1000 * 60 * 60 * 24)) + 1) + " днів\n";
        } else
            date = "";
        $("#textarea").text(motoNumber + date + range);

    }

});
