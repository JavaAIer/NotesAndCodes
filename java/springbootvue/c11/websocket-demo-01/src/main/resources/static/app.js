var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
        $("#chat").show();
    } else {
        $("#conversation").hide();
        $("#chat").hide();
    }
    $("#greetings").html("");
}

/**
 * 建立一个websocket连接,在建立 websocket连接时,用户必须先输入用户名,然后才能连接.
 */
function connect() {
    if (!$("#name").val()) {
        return;
    }
    //首先使用SockJs建立连接,然后创建一个stomp实例发起请求,
    //在连接成功的回调方法中,首先调用setConnected(true)方法进行页面的设置
    //然后调用stomp的subscribe方法来订阅服务端发送回来的消息.
    //并将服务端发送回来的消息展示出来(showGreeting方法)
    var socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        stompClient.subscribe('/topic/greetings', function (greeting) {
            showGreeting(JSON.parse(greeting.body));
        });
    });
}

/**
 * 断开一个websocket连接
 */
function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
}

function sendName() {
    stompClient.send("/app/hello",
        {},
        JSON.stringify({'name': $("#name").val(), 'content': $("#content").val()}));
}

function showGreeting(message) {
    $("#greetings")
        .append("<div>" + message.name + ":" + message.content + "</div>");
}

$(function () {
    $("#connect").click(function () {
        connect();
    });
    $("#disconnect").click(function () {
        disconnect();
    });
    $("#send").click(function () {
        sendName();
    });
});