function getAndUpdate() {
    let task = document.getElementById("inputTitle").value;
    let time = document.getElementById("inputTime").value;

    if(task=='' )
    {
        alert("It's not cool to do nothing !\nPlease add a task to do.");
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
        let tableBody = document.getElementById("table");
        let str = "";
        arr.forEach((element, index) => {
            str +=
                `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button class="button"  onclick="deleted(${index})">Done</button></td>
            <td><button class="button">Modify</button></td>
        </tr>
        `
            tableBody.innerHTML = (str);
        });
    }


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
