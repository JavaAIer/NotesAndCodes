var stompClient = null;

/**
 * 连接成功后,订阅的地址为"/user/queue/chat",该地址比服务端配置的地址多了"/user"前缀
 * 这是因为SimpMessagingTemplate类中自动添加了路径前缀
 */
function connect() {
    var socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        stompClient.subscribe('/user/queue/chat', function (chat) {
            showGreeting(JSON.parse(chat.body));
        });
    });
}

/**
 * 聊天消息发送路径 为"/app/chat"
 * 发送的消息内容中有一个to字段,该字段用来描述消息的目标用户.
 */
function sendMsg() {
    stompClient.send("/app/chat", {},
        JSON.stringify({
            'content': $("#content").val(),
            'to': $("#to").val()
        }));
}

function showGreeting(message) {
    $("#chatsContent")
        .append("<div>" + message.from + ":" + message.content + "</div>");
}

$(function () {
    connect();
    $("#send").click(function () {
        sendMsg();
    });
});