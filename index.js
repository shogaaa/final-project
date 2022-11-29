let json= [{
    "id": "d3ff0c68892",
    "name": "Amazon.com",
    "email": "contact@amazon.com",
    "boxes": "6.8,7.9,3.6,8.8,4.8,9.4"
  },
  {
    "id": "ad8b78578",
    "name": "American Express",
    "email": "contact@americanexpress.com",
    "boxes": "9.8"
  },
  {
    "id": "e40b72",
    "name": "Walmart",
    "email": "contact@walmart.com",
    "boxes": "3.3,3,3.2,1.6,5.4,2.1,2.7,4.6"
  },
  {
    "id": "34554e30e6ac1a4",
    "name": "Apple",
    "email": "contact@apple.com",
    "boxes": "9.6,3.5"
  }]

const pressbut = document.getElementsByTagName("button");
const input = document.getElementById("boxes");

class dataItem {
    constructor(id,name,email,boxes){
        this.id = id;
        this.name = name;
        this.email = email;
        this.boxes = boxes;
    }
    addToScreenData () {
        const h3Tag = document.getElementById("Name");
        const aTag = document.getElementById("Email");
        const boxesinput = document.getElementById("boxes");
        const spanTag = document.getElementById("result");

        h3Tag.innerText = this.name;
        aTag.innerText = this.email;
        boxesinput.value = this.boxes;
        spanTag.innerText = this.calculateRequiredCargo();
    }
    calculateRequiredCargo () {
        let newArr = this.boxes.split(",");
        console.log(newArr);
        let result = 0;
        for(i=0; i < newArr.length; i++){
            result += Number(newArr[i]);
        }
        return Math.ceil(result / 10);
    }
}
let activeButton = "Amazon.com";
function setActive(button){
    activeButton = button.id;
    let htmlbut = document.getElementById(activeButton);
    for(i=0;i<pressbut.length; i++){
        pressbut[i].className = 'notActive';
        htmlbut.className = "active";};
    

    fetch("https://bitbucket.org/hpstore/spacex-cargo-planner/raw/204125d74487b1423bbf0453f4dcb53a2161353b/shipments.json")
    .then(responseObj => responseObj.json(responseObj))
    .then(responseObjData => {
        const foundEl = responseObjData.find((el) => el.name === activeButton);
        let dataClass = new dataItem(foundEl.id,foundEl.name,foundEl.email,foundEl.boxes);
        dataClass.addToScreenData();
    })
    .catch(fetchError => console.log(fetchError));
}


input.addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
        let newArr = input.value.split(",");
        let result = 0;
        for(i=0; i < newArr.length; i++){
            result += Number(newArr[i]);
        }
        document.getElementById("result").innerText = Math.ceil(result / 10);
    }
});
window.onload(setActive(document.getElementById("Amazon.com")));

