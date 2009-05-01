<?php
$time = microtime(true);
$cl = '
/** version 0.1 2009-04-30
 * @author      Andrea Giammarchi
 * @license     Mit Style License
 * @project     http://code.google.com/p/css2xpath/
 */
';
$name = 'css2xpath';
$output = array(
    'css2xpath'
);
// -- simple build
$file = 'build/'.$name.'.js';
$filemin = str_replace('.js', '.min.js', $file);
if(!function_exists('file_put_contents')){
    function file_put_contents($file, $content){
        $fp = fopen($file, 'wb');
        fwrite($fp, $content);
        fclose($fp);
    }
}
$nl = "\n";
foreach($output as $key => $value)
    $output[$key] = file_get_contents('src/'.$value.'.js');
$output = implode($nl, $output);
$output = ($cl=trim($cl)).$nl.$nl.$output;
if(file_exists($file))
    unlink($file);
if(file_exists($filemin))
    unlink($filemin);
file_put_contents($file, $output);
exec('java -jar yuicompressor-2.4.2.jar --nomunge '.$file.' -o '.$filemin);
$min = $cl.file_get_contents($filemin);
file_put_contents($filemin, $min);
ob_start('ob_gzhandler');
header('Content-Type: text/javascript');
header('X-Served-In: '.(microtime(true) - $time));
exit($min);
?>