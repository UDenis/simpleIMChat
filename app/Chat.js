<!doctype html>

<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js fill"> <!--<![endif]-->
    <head >
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Chat</title>
        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
        <!-- build:css styles/vendor.css -->
        <!-- bower:css -->
        <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css">
        <!-- endbower -->
        <!-- endbuild -->
        <!-- build:css(.tmp) styles/main.css -->
        <link rel="stylesheet" href="styles/main.css">
        <!-- endbuild -->
    </head>
    <body >
        
        <div class="container " id="chat">
            <div class="row chat-msgs padding5" >
                <div class="col-md-12">
                    <div id='chatMsgsList' data-bind="foreach : messages">
                        <div data-bind='css:cssClass'>
                            [<span data-bind="text:time"></span>]
                            <span data-bind="text:name"></span> :
                            <span data-bind="html:message"></span>
                        </div>

                    </div>
                </div>
            </div>
            <div class="row" data-bind='visible:isJoined()'>
                <div class="col-md-12">
                    <textarea class="form-control" rows="3" data-bind='value: message'></textarea>
                </div>
                 <div class="padding5">
                    <button type="button" class="btn btn-primary pull-right" data-bind='click:sendMsg'>Отправить</button>
                </div>
            </div>
             <div class="row" data-bind='visible:isNotJoined()'>
                <div class="col-md-12">
                    <input type='text' class="form-control" rows="3" data-bind='value: name'></input>
                </div>
                 <div class="padding5">
                    <button type="button" class="btn center-block btn-primary" data-bind='click:join'>Присоедениться</button>
                </div>
            </div>
            
        </div>


        <!-- build:js scripts/vendor.js -->
        <!-- bower:js -->
        <script src="bower_components/jquery/jquery.js"></script>
        <script src="bower_components/knockout/knockout.js"></script>
        <!-- endbower -->
        <!-- endbuild -->

        <!-- build:js scripts/plugins.js -->
        <script src="bower_components/bootstrap/js/affix.js"></script>
        <script src="bower_components/bootstrap/js/alert.js"></script>
        <script src="bower_components/bootstrap/js/dropdown.js"></script>
        <script src="bower_components/bootstrap/js/tooltip.js"></script>
        <script src="bower_components/bootstrap/js/modal.js"></script>
        <script src="bower_components/bootstrap/js/transition.js"></script>
        <script src="bower_components/bootstrap/js/button.js"></script>
        <script src="bower_components/bootstrap/js/popover.js"></script>
        <script src="bower_components/bootstrap/js/carousel.js"></script>
        <script src="bower_components/bootstrap/js/scrollspy.js"></script>
        <script src="bower_components/bootstrap/js/collapse.js"></script>
        <script src="bower_components/bootstrap/js/tab.js"></script>
        <!-- endbuild -->

        <script type="text/javascript">
            window.IM = {};
        </script>
        <!-- build:js({app,.tmp}) scripts/main.js -->
        <script src="scripts/util.js"></script>
        <script src="scripts/transport.js"></script>
        <script src="scripts/service.js"></script>
        <script src="scripts/client.js"></script>
        <script src="scripts/chat.js"></script>
        
</body>
</html>
