function compareSecondColumn(a, b) {
    if (a[1] == b[1]) {
        return 0;
    }
    else {
        return ((a[1] < b[1])) ? -1 : 1;
    }
}

function getAndUpdate() {
    let task = document.getElementById("inputTitle").value;
    let timeH = document.getElementById("inputTimeH").value;
    let timeM = document.getElementById("inputTimeM").value;


    if (timeM.length == 1) {
        timeM = "0" + timeM;
    }

    let zone = document.getElementById("zone").value;
    if (zone == "PM") {
        timeH = Number.parseInt(timeH);
        if (timeH != 12) { timeH += 12; }
        timeH = timeH.toString();
    }
    else {
        if (timeH.length == 1) {
            timeH = "0" + timeH;
        }
        if(timeH=="12")
        {
            timeH="00";
        }
    }
    let time = timeH + " : " + timeM;
    timeM = Number.parseInt(timeM);


    if (task == '') {
        alert("It's not cool to do nothing !\nPlease add a task to do.");
    }
    else if (timeH > 24 || timeM >= 60) {
        alert("Please add valid time in 12-hour format.")

    }
    else if (localStorage.getItem("Items") == null) {
        console.log("GaU1");
        arr = [];
        arr.push([task, time]);
        localStorage.setItem('Items', JSON.stringify(arr));
    }
    else {

        console.log("GaU2");
        arrstr = localStorage.getItem('Items');
        arr = JSON.parse(arrstr);    //make array with already present elements
        arr.push([task, time]);   //add new elements
        localStorage.setItem('Items', JSON.stringify(arr));  //push to local storage
    }
    update();

}

function update() {

    if (localStorage.getItem("Items") == null) {
        console.log("up1");
        let str = "";
        let tableBody = document.getElementById("table");
        tableBody.innerHTML = (str);

    }
    else {

        console.log("up2");
        arrstr = localStorage.getItem('Items');
        arr = JSON.parse(arrstr);
        arr.sort(compareSecondColumn);
        localStorage.setItem('Items', JSON.stringify(arr));
        let tableBody = document.getElementById("table");
        let str = "";
        arr.forEach((element, index) => {
            str +=
                `
        <tr>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td style="border-right:none;"><button class="button1" id="del" onclick="deleted(${index})" style="margin: auto;">Done</button></td>
            <td style="border-left:none;"><button class="button1" id="mod" onclick="modified(${index})" style="margin: auto;">Modify</button></td>
        </tr>
        `
            tableBody.innerHTML = (str);
        });
    }
    document.getElementById("inputTitle").value = "";
    document.getElementById("inputTimeH").value = "";
    document.getElementById("inputTimeM").value = "";
    document.getElementById("zone").value = "";
}

update();
let add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);

function deleted(itemIndex) {

    console.log("deleted", itemIndex);
    arrstr = localStorage.getItem('Items');
    arr = JSON.parse(arrstr);    //make array with already present elements
    if (arr.length == 1) {
        window.localStorage.clear();
    }
    else {
        arr.splice(itemIndex, 1);
        localStorage.setItem('Items', JSON.stringify(arr));
    }
    update();
}

function modified(itemIndex) {
    console.log("modified", itemIndex);
    arrstr = localStorage.getItem('Items');
    arr = JSON.parse(arrstr);
    let newtask = prompt("Enter the new task-")
    if (newtask == null || newtask == '') { return; }
    let newTime = prompt("Enter the new time-")
    if (newTime == null || newTime == '') { newTime = arr[itemIndex][1] }
    arr[itemIndex] = [newtask, newTime];
    arr.sort(compareSecondColumn);
    localStorage.setItem('Items', JSON.stringify(arr));
    update();

}




