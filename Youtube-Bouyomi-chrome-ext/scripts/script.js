function process() {
  const iframe = document.getElementById("live-chat-iframe");
  const card = iframe.contentWindow.document.getElementById("card");

  // 「チャットへようこそ！」カードが表示されていなかったらチャット欄が初期化されていないものとみなす
  if (card == null) {
    setTimeout(process, 1000);
    return;
  }

  const chatElements = getChatElements();
  let readChatIds = chatElements.map(element => element.getAttribute("id"));

  try {
    const ws = new WebSocket("ws://localhost:38100/ws");

    setInterval(() => {
      const chatElements = getChatElements();
      const unReadList = chatElements.filter(element =>
        readChatIds.every(id => id !== element.getAttribute("id"))
      );
      if (unReadList.length !== 0) {
        unReadList.forEach(element => {
          const text = element.innerText;
          const content = text.substring(text.indexOf("\n") + 1);
          console.log(content);
          ws.send(content);
        });

        const chatIds = unReadList.map(element => element.getAttribute("id"));

        readChatIds = readChatIds.concat(chatIds);
      }
    }, 100);
  } catch (e) {}
}

function getChatElements(iframe) {
  const chatIframe = document.getElementById("live-chat-iframe");
  return Array.from(
    chatIframe.contentWindow.document.querySelectorAll(
      "#items > .yt-live-chat-item-list-renderer:not(yt-live-chat-viewer-engagement-message-renderer)"
    )
  );
}

process();
