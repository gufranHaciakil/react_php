<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Headers: *");

$methods = $_SERVER['REQUEST_METHOD'];
$conn = mysqli_connect("localhost", "root", "", "abc");


// echo $methods;

switch ($methods) {
    case 'GET':
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $userId = $path[3];
            $sql_code = "SELECT * FROM users WHERE id = $userId";
            $result = mysqli_query($conn, $sql_code);
            $data = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $data[] = $row;
                echo json_encode(['result' => $data]);
            }
        } else {
            $sql_code = "SELECT * FROM users";
            $result = mysqli_query($conn, $sql_code);
            $data = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $data[] = $row;
            }
            echo json_encode(['result' => $data]);
        }
        break;
    case 'POST':
        $userpostdata = json_decode(file_get_contents('php://input'));
        $name = $userpostdata->name;
        $email = $userpostdata->email;
        $password = md5(md5($userpostdata->password));
        $state = $userpostdata->state;
        $check_email = "SELECT * FROM users WHERE u_email = '$email'";
        $result_email = mysqli_query($conn, $check_email);
        $count = mysqli_num_rows($result_email);
        if ($count > 0) {
            echo json_encode(['result' => 'email already exists']);
            return;
        } else {
            $sql_code = "INSERT INTO users (u_name, u_email, u_password, u_stat) VALUES ('$name', '$email', '$password', '$state')";
            $result = mysqli_query($conn, $sql_code);
            if ($result) {
                echo json_encode(['result' => 'user added successfully']);
            } else {
                echo json_encode(['result' => 'error when adding user']);
            }
        }

        break;
    case 'PUT':
        $userpostdata = json_decode(file_get_contents('php://input'));
        $id = $userpostdata->id;
        $name = $userpostdata->name;
        $email = $userpostdata->email;
        $state = $userpostdata->state;
        $sql_code = "UPDATE users SET u_name = '$name', u_email = '$email', u_stat = '$state' WHERE id = $id";
        $result = mysqli_query($conn, $sql_code);
        if ($result) {
            echo json_encode(['result' => 'user updated successfully']);
        } else {
            echo json_encode(['result' => 'error when updating user']);
        }
        // print_r($userpostdata);
        break;
    case 'DELETE':
        //عم نتحقق من اللبنك اللي اجاه الريكويست اذا فيو سلاش بالمنطقه التالته
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $userId = $path[3];
            $sql_code = "DELETE FROM users WHERE id = $userId";
            $result = mysqli_query($conn, $sql_code);
            if ($result) {
                echo json_encode(['result' => 'user deleted successfully']);
            } else {
                echo json_encode(['result' => 'error when deleting user']);
            }
        }
        break;
    default:
        echo json_encode(['result' => 'error  ']);
        break;
}
