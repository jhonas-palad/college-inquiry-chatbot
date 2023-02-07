import React from 'react';

const wsClientEndpoint = "wss://chatbotapi.site/chat";

type Props = {
  onopen?: Function ,
  onmessage?: Function ,
  onerror?: Function ,
  onclose?: Function
}

export const useSocket = () : WebSocket | null => {
  const [ws, setWs] = React.useState<WebSocket | null>(null);

  React.useEffect(() => {
    const socket = new WebSocket(wsClientEndpoint);

    socket.onopen = () => {
      setWs(socket);
      console.log("WebSocket connected");
    };

    socket.onmessage = (e) => {

      console.log(`Received: ${e.data}`);
    };

    socket.onerror = (e) => {
      console.log(`WebSocket Error: ${e.message}`);
    };

    socket.onclose = () => {
      console.log('WebSocket Closed');
 
    };

    return () => {
      socket.close();
    };
  }, []);

  return ws;
};

