// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                performInitialSetup(args);
            } else {
                performRestore(args);
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {
        performSuspend(args);
    };

    app.start();

    function performInitialSetup(args) {

        WinJS.Utilities.query('button').listen("click", function (e) {
            if (this.id == "addItemButton") {
                ViewModel.UserData.addItem("Ice Cream", 1, "Vanilla", "Walmart");
            } else {
                ViewModel.UserData.getItems().pop();
            }
        });

        var setValue = function () {
            var list = ViewModel.UserData.getItems();
            document.getElementById("listInfo").innerText = list.getAt(list.length - 1).item;
        };

        var eventTypes = ["itemchanged", "iteminserted", "itemmoved", "itemremoved"];
        eventTypes.forEach(function (type) {
            ViewModel.UserData.getItems().addEventListener(type, setValue);
        });
        setValue();
    }

    function performRestore(args) {
        // TODO
    }

    function performSuspend(args) {
        // TODO
    }

})();
