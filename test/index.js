<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Mocha Spec Runner</title>
    <link rel="stylesheet" href="bower_components/mocha/mocha.css">
</head>
<body>
    <div id="mocha"></div>
    <script src="bower_components/mocha/mocha.js"></script>
    <script>mocha.setup('bdd')</script>
    <script src="bower_components/chai/chai.js"></script>
    <script>
        var assert = chai.assert;
        var expect = chai.expect;
        var should = chai.should();
    </script>

    <!-- include source files here... -->

    <!-- include spec files here... -->
    <script src="spec/test.js"></script>

    <script>mocha.run()</script>
</body>
</html>
