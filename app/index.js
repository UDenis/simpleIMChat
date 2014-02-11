<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>simpleIMChat</title>
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
    <body>
        <div class="container">
            <div class="header">
                <h3 class="text-info text-center">Реализация IM клиента</h3>
            </div>

            <div class="row">
                <div class="col-md-4 chat-container">
                    <h4 class="text-muted text-center">Клиент 1</h4>
                    <iframe src="Chat.html?v=1" class='fill chat-frame' ></iframe>
                </div>
                <div class="col-md-4">
                    <h4 class="text-muted text-center">Имитация сервера</h4>
                    <h5 class='text-muted'>
                        Лог:
                    </h5>
                    <div class='log-table'>
                        <table class='table' id='logTable'>
                            <tbody data-bind="foreach : logs"> 
                                    <tr  data-bind='css : cssClass'>    
                                        <td data-bind='text:text'> 

                                        </td>
                                        <td data-bind='text:time'> 

                                        </td>
                                    </tr>
                            </tbody> 
                        </table>
                    </div>
                </div>
                <div class="col-md-4 chat-container">
                    <h4 class="text-muted text-center">Клиент 2</h4>
                    <iframe src="Chat.html" class='fill chat-frame' ></iframe>
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
        <script src="scripts/server.js"></script>
        <script src="scripts/main.js"></script>
        <!-- endbuild -->
</body>
</html>
