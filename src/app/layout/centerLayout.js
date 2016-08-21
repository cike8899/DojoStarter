define([
    'require', 'dojo/_base/declare', "dijit/layout/ContentPane",
    "dojo/on", "dojo/topic", "dojo/dom-construct", "dojo/dom", "dijit/form/Button",
    "dijit/registry", "dojo/Deferred"
], function (require, declare, ContentPane, on, topic, domConstruct, dom, Button, Register, Deferred) {
    return declare(ContentPane, {
        btnPane: null,
        btnCount: 0,
        constructor() {

        },
        render: function () {
            this.addChild(this.createButtonPane());
            this.addChild(this.createDefrredPane());
            this.addEventHandler();
        },
        createButtonPane: function () {
            this.btnPane = new ContentPane({
                style: ""
            });
            var alertButton = new Button({
                label: "Alert the user",
                id: "alertButton"
            });
            var createAlertBtn = new Button({
                label: "Create another alert button",
                id: "createAlert"
            });
            this.btnPane.addChild(alertButton);
            this.btnPane.addChild(createAlertBtn);
            return this.btnPane;
        },

        createDefrredPane: function () {
            var deferredPane = new ContentPane();
            var h1 = domConstruct.create("h1", { innerHTML: "Output:" });
            var div = domConstruct.create("div", { id: "output", innerHTML: "Not yet started." });
            var button = new Button({
                type: "button",
                id: "startButton",
                label: "start"
            });
            deferredPane.domNode.appendChild(h1);
            deferredPane.domNode.appendChild(div);
            deferredPane.addChild(button);

            return deferredPane;
        },

        addEventHandler: function () {
            var alertButton = Register.byId("alertButton");
            var createAlert = Register.byId("createAlert");

            on(alertButton.domNode, "click", function () {
                // When this button is clicked,
                // publish to the "alertUser" topic
                topic.publish("alertUser", "I am alerting you.");
            });

            on(createAlert.domNode, "click", function (evt) {
                console.info(evt);
                // Create another button
                var anotherButton = domConstruct.create("button", {
                    innerHTML: "Another alert button",
                    'data-count': this.btnCount
                }, createAlert, "after");
                this.btnPane.domNode.appendChild(anotherButton);
                // When the other button is clicked,
                // publish to the "alertUser" topic
                this.btnCount++;
                on(anotherButton, "click", function (evt) {
                    console.info(this);
                    var count = this.getAttribute("data-count");
                    topic.publish("alertUser", "I am also alerting you:" + count);
                });
            }.bind(this));

            // Register the alerting routine with the "alertUser" topic.
            topic.subscribe("alertUser", function (text) {
                alert(text);
            });

            var startButton = Register.byId("startButton");
            var that = this;
            startButton.on("click", function (e) {
                var process = that.asyncProcess();
                process.then(function (results) {
                    dom.byId("output").innerHTML = "I'm finished, and the result was: " + results;
                });
            });
        },

        asyncProcess: function () {
            var deferred = new Deferred();
            dom.byId("output").innerHTML = "I'm running...";

            setTimeout(function () {
                deferred.resolve("success");
            }, 1000);
            return deferred.promise;
        }
    });
});