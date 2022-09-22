<?php

class firstClassName {
    public $property1; // Public can be Reached outside the Class
    protected $property2; // Protected can only be Reached inside the Class and descended Classes
    private $property3; // Protected can only be Reached inside the Class
    //...

    public function method1($parameter1, $parameter2) {
        // ...
    }
    protected function method2($parameter1, $parameter2) {
        // ...
    }
    private function method2($parameter1, $parameter2) {
        // ...
    }

    public $name;

    public static function numberOfUsers() {
        return count(self::$allUsers);
    }




}
