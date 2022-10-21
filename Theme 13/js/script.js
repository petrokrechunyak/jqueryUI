$(function() {
    $('#tabs').tabs({
        active: false,
        collapsible: true
    });

    $("#dialog").dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 1000
        },
        hide: {
            effect: "explode",
            duration: 1000
        }
    });

    $("#slider-range").slider({
        min: 10,
        max: 400,
        range: true,
        change: function () {
            $("#amount").val(
                `${$(this).slider("values", 0) + " - " + $(this).slider("values", 1)} км`
            );
        },
    });

    $("#my_button").on("click", function () {
        slider();
        const answers = $('.tests input[type="radio"]').map(function () {
            if ($(this).is(":checked")) return true;
        });
        if (answers.length === 5) {
            $("#dialog p").html(selectedMoto() + checkboxes() + radio()
                + slider() + getDate() + region() + amount() + wishes());
            $("#dialog").dialog("open");
        } else {
            alert("Необхідно пройти обов'язкове анкетування!");
        }
    });

    function checkboxes() {
        let str = "";
        let elements = $("#format input[type=checkbox]");
        for (let i = 0; i < elements.length; i++) {
            if ($(elements[i]).is(":checked")) {
                str += $("#format label[for=" + elements[i].id + "]").text();
                str += ": Так<br>";
            }
        }
        return str;
    }


    function radio() {
        let res = $('#inch_yes:checked').val();
        if (res === "yes")
            return "Страховка: Так<br>";
        else
            return "";
    }

    function selectedMoto() {
        let moto = $("#motoSelect").find(":selected").val();
        return $("option[value=" + moto + "]").text() + "<br>";
    }

    function slider() {
        if($("#custom-handle").text() != "0")
            return $("#custom-handle").text() + " мотоциклів<br>";
        return "";
    }

    function getDate() {
        const from = new Date($("#from").datepicker("getDate"));
        const to = new Date($("#to").datepicker("getDate"));
        const days = new Date(to - from) / 1000 / 60 / 60 / 24 + 1;
        return days + " днів<br>";
    }

    function region() {
        let reg = $("#region").val();
        if(reg != "")
            return "Область: " + reg + "<br>";
        return "";
    }

    function amount() {
        return $("#amount").val() + "<br>";
    }

    function wishes() {
        let wish = $("textarea").val();
        if(wish.trim().length !== 0)
            return "Побажання: " + wish;
        return "";
    }
});