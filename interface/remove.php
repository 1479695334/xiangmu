<?php
    include('./conn.php');

    $id = $_REQUEST['id'];

    $sql = "delete from  where wq_id=$id";

    $res = $mysqli->query($sql);

    if($res==1){
        echo '{"msg":"删除成功"}';
    }else{
        echo '{"msg":"删除失败"}';
    }

    $mysqli->close();
?>