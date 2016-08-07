define(['dojo/_base/declare', 'dijit/Dialog', "dijit/layout/BorderContainer", "dijit/layout/ContentPane"
], function (declare, Dialog, BorderContainer, ContentPane) {
    return declare(BorderContainer, {
        constructor: function (args) {
            console.info(args);
        },
        title: 'Hello World',
        liveSplitters: true,
        render: function () {
            var cp0 = new ContentPane({
                region: "top",
                style: "width: 100%;height:50px;",
                content: "hello world"
            });
            this.addChild(cp0);
            var cp1 = new ContentPane({
                region: "left",
                style: "width: 100px",
                content: "hello world",
                splitter: true
            });
            this.addChild(cp1);
            var cp2 = new ContentPane({
                region: "center",
                content: "how are you?"
            });
            this.addChild(cp2);
            var cp3 = new ContentPane({
                region: "right",
                content: "how are you?"
            });
            this.addChild(cp3);
            var cp4 = new ContentPane({
                style: 'height:50px',
                region: "bottom",
                content: "how are you?"
            });
            this.addChild(cp4);
            this.startup();
        }
    });
});