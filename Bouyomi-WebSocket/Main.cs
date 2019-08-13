using System;

using WebSocketSharp;
using WebSocketSharp.Server;

using FNF.BouyomiChanApp;
using FNF.XmlSerializerSetting;

namespace Plugin
{

    class Server : WebSocketBehavior
    {
        protected override void OnMessage(MessageEventArgs e)
        {
            base.OnMessage(e);
            Pub.AddTalkTask(e.Data);
        }
    }

    public class Plugin_WebSocketServer : IPlugin
    {
        string IPlugin.Name => "WebSocket Server";

        string IPlugin.Version => "2019/08/13版";

        string IPlugin.Caption => "WebSocketから棒読みちゃんを制御します";

        ISettingFormData IPlugin.SettingFormData => null;

        WebSocketServer wsServer = null;
        void IPlugin.Begin()
        {
            wsServer = new WebSocketServer("ws://localhost:38100");
            wsServer.AddWebSocketService<Server>("/ws");
            wsServer.Start();
        }


        void IPlugin.End()
        {
            if (wsServer != null)
            {
                wsServer.Stop();
            }
        }
    }
}
