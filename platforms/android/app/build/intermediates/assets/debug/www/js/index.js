var urlServer = "";

function callAPI()
{   
    setInterval(function()
    {    
        $.ajax(
        {
            "crossDomain": true,
            "url": "http://"+urlServer+"/mahm",
            "method": "POST",
            "headers": {
                "Authorization": "Basic " + btoa("MSIAfterburner:17cc95b4017d496f82"),
                "Access-Control-Allow-Origin": "*"}
        }).done(function(event)
        {
            var xmlTags = $.parseXML(event);
            var nos = xmlTags.getElementsByTagName("HardwareMonitorEntry");
            for(var i=0; i<nos.length; i++)
            {
                var childNodes = nos[i].childNodes;
                var elemento = $("#"+childNodes[10].innerHTML);
                var percent = 100 * parseFloat(childNodes[5].innerHTML) / parseFloat(childNodes[7].innerHTML);
                var lastPercent = elemento.val();
                elemento.removeClass("p"+lastPercent).addClass("p"+percent.toFixed(0));
                elemento.val(percent.toFixed(0));
                elemento.find(".data").text(parseFloat(childNodes[5].innerHTML).toFixed(1));
            }
        }).fail(function(error) 
        {
            console.log(error);
        });
    }, 1000);
}

function connectServer()
{
    urlServer = $("#inputIpServer").val();

    $(".divInformation").css("display", "none");
    $(".divComponent").css("display", "block");
    callAPI();
}